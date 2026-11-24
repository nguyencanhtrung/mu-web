// Integration test against the built server: node src/server/test_gm_commands.cjs
const assert = require('node:assert/strict');
const path = require('node:path');
const createMuServer = require('./build/muserver.js');

async function main() {
    const packets = [];
    const server = await createMuServer({
        locateFile: file => path.join(__dirname, 'build', file),
        print: () => {},
        printErr: text => console.error(text)
    });
    const callback = server.addFunction((ptr, size) => {
        packets.push(Buffer.from(server.HEAPU8.subarray(ptr, ptr + size)));
    }, 'vii');
    server._SoloServer_SetSendCallback(callback);
    const reallocate = process.argv.includes('--reallocate');
    const resetTable = process.argv.includes('--reset-table');
    if (reallocate) {
        const file = '/Data/GameServerInfo - Command.dat';
        const config = server.FS.readFile(file, { encoding: 'utf8' });
        server.FS.writeFile(file, config.replace(/CommandResetStat_AL([0-3])=0/g, 'CommandResetStat_AL$1=1'));
    }
    if (resetTable) {
        server.FS.writeFile('/Data/Util/ResetTable.txt',
            '1 1 -1 -1 -1 -1 -1 -1 -1 -1 700 700 700 700\n' +
            '2 2 -1 -1 -1 -1 -1 -1 -1 -1 900 900 900 900\nend\n');
    }
    assert.equal(server.ccall('SoloServer_Init', 'number', ['string', 'string'], ['/Data', '/gm-test-saves']), 1);
    const realm = Number((process.argv.find(arg => arg.startsWith('--realm=')) || '--realm=0').split('=')[1]);
    server._SoloServer_SetDifficulty(realm);
    const xor = [0xE7, 0x6D, 0x3A, 0x89, 0xBC, 0xB2, 0x9F, 0x73,
        0x23, 0xA8, 0xFE, 0xB6, 0x49, 0x5D, 0x39, 0x5D,
        0x8A, 0xCB, 0x63, 0x8D, 0xEA, 0x7D, 0x2B, 0x5F,
        0xC3, 0xB1, 0xE9, 0x83, 0x29, 0x51, 0xE8, 0x56];
    // Chain XOR matches PacketManager.cpp; exercise the same protocol as the client.
    function send(data) {
        const bytes = Buffer.from(data);
        for (let i = 3; i < bytes.length; i++) bytes[i] ^= bytes[i - 1] ^ xor[i & 31];
        const ptr = server._malloc(bytes.length);
        server.HEAPU8.set(bytes, ptr);
        server._SoloServer_ReceiveClientPacket(ptr, bytes.length);
        server._free(ptr);
    }
    const name = 'GMTester';
    function login() {
        const index = server.ccall('SoloServer_ConnectPlayer', 'number', ['string'], ['127.0.0.1']);
        assert.ok(index >= 0);
        const data = Buffer.alloc(49);
        data.set([0xC1, 49, 0xF1, 1]);
        for (const offset of [4, 14]) {
            const credentials = Buffer.alloc(10);
            credentials.write('gmtest');
            for (let i = 0; i < 10; i++) data[offset + i] = credentials[i] ^ [0xFC, 0xCF, 0xAB][i % 3];
        }
        data.write('09711', 28);
        data.write('TbYehR2hFUPBKgZj', 33);
        send(data);
        assert.ok(packets.some(p => p[2] === 0xF1 && p[3] === 1 && p[4] === 1), 'login succeeded');
        return index;
    }
    function select() {
        const data = Buffer.alloc(14);
        data.set([0xC1, 14, 0xF3, 3]);
        data.write(name, 4);
        send(data);
    }
    function info() {
        const packet = packets.findLast(p => p[2] === 0xF3 && p[3] === 0xE0);
        assert.ok(packet, 'received character information; notices: ' + packets.filter(p => p[2] === 0x0D).map(p => p.subarray(4).toString().replace(/\0.*$/s, '')).join('; '));
        const fields = ['level', 'points', 'experience', 'nextExperience', 'str', 'agi', 'vit', 'ene',
            'hp', 'maxHp', 'mp', 'maxMp', 'bp', 'maxBp', 'fruit', 'maxFruit', 'reset', 'grandReset'];
        return Object.fromEntries(fields.map((field, i) => [field, packet.readUInt32LE(4 + 4 * i)]));
    }
    function chat(command) {
        packets.length = 0;
        const data = Buffer.alloc(73);
        data.set([0xC1, 73, 0]);
        data.write(name, 3);
        data.write(command, 13);
        send(data);
    }
    function set(command, field, value) {
        chat(`${command} ${value}`);
        const state = info();
        assert.equal(state[field], value);
        assert.equal(state.points, initial.points, 'unallocated points unchanged');
        return state;
    }
    function save() { return Buffer.from(server.FS.readFile(`/gm-test-saves/char_${name}.dat`)); }

    let index = login();
    const create = Buffer.alloc(15);
    create.set([0xC1, 15, 0xF3, 1]);
    create.write(name, 4);
    send(create);
    select();
    const initial = info();
    const initialSave = save();
    if (process.argv.includes('--reset')) {
        chat('/gm on');
        set('/setlevel', 'level', 400);
        chat('/reset');
        const after = info();
        const reward = resetTable ? 700 : 500;
        assert.equal(after.reset, initial.reset + 1, 'reset count increases');
        assert.equal(after.level, 1, 'reset returns character to level 1');
        assert.equal(after.points, reward, 'reset awards unallocated points');
        chat('/str 100');
        const allocated = info();
        assert.equal(allocated.points, reward - 100);
        assert.equal(allocated.str, initial.str + 100);
        // Reconnect after the safe-zone transfer, as the real client does after loading the map.
        server._SoloServer_SaveAll();
        server._SoloServer_DisconnectPlayer(index);
        packets.length = 0;
        index = login();
        select();
        assert.equal(info().points, allocated.points, 'allocated points persist after first reset');
        chat('/gm on');
        chat('/setlevel 400');
        assert.equal(info().points, allocated.points, 'GM setter preserves earned points');
        chat('/reset');
        const second = info();
        const nextReward = resetTable ? 900 : 500;
        assert.equal(second.points, reward + nextReward - (reallocate ? 0 : 100), 'second reset grants only its reward in keep-stats mode');
        assert.equal(second.str, reallocate ? initial.str : allocated.str, 'respect configured stat reset mode');
        assert.equal(second.reset, 2);
        server._SoloServer_SaveAll();
        server._SoloServer_DisconnectPlayer(index);
        packets.length = 0;
        login();
        select();
        const restoredReset = info();
        for (const field of ['points', 'str', 'agi', 'vit', 'ene', 'reset', 'level', 'experience']) {
            assert.equal(restoredReset[field], second[field], `${field} persists after reset and relogin`);
        }
        console.log(`PASS: reset points, allocation, repeated reset, save/relogin (realm=${realm}, reallocate=${reallocate}, table=${resetTable}).`);
        return;
    }
    for (const command of ['/setstr 32000', '/setene 32000', '/setagi 32000', '/setvit 32000', '/setreset 100', '/setlevel 400']) {
        chat(command);
        assert.deepEqual(save(), initialSave, 'non-GM cannot change saved data');
        assert.ok(!packets.some(p => p[2] === 0xF3 && p[3] === 0xE0));
    }
    chat('/gm on');
    set('/setstr', 'str', 32000);
    set('/setagi', 'agi', 32000);
    assert.ok(set('/setvit', 'vit', 32000).maxHp > initial.maxHp, 'VIT updates maximum HP');
    assert.ok(set('/setene', 'ene', 32000).maxMp > initial.maxMp);
    set('/setreset', 'reset', 100);
    const high = set('/setlevel', 'level', 400);
    assert.ok(high.experience > initial.experience);
    assert.ok(high.maxHp > initial.maxHp);
    set('/setstr', 'str', 100);
    set('/setagi', 'agi', 100);
    set('/setvit', 'vit', 100);
    set('/setene', 'ene', 100);
    set('/setreset', 'reset', 0);
    const low = set('/setlevel', 'level', 1);
    assert.equal(low.experience, initial.experience);
    set('/setstr', 'str', 32767);
    set('/setagi', 'agi', 32767);
    set('/setvit', 'vit', 32767);
    set('/setene', 'ene', 32767);
    set('/setreset', 'reset', 10000);
    const validSave = save();
    for (const command of ['/setagi', '/setagi 32768', '/setagi -1', '/setvit 0', '/setvit abc', '/setvit 32768', '/setstr', '/setene abc', '/setreset -1', '/setlevel 0', '/setlevel 401',
        '/setstr 32768', '/setene 0', '/setreset 10001', '/setreset 1x', '/setreset 1 2',
        '/setstr 99999999999999999999999999999999999999999999999999']) {
        chat(command);
        assert.deepEqual(save(), validSave, `invalid input leaves save unchanged: ${command}`);
        assert.ok(packets.some(p => p[2] === 0x0D && p.toString().includes('Usage:')), command);
    }
    set('/setlevel', 'level', 400);
    set('/setreset', 'reset', 100);
    server._SoloServer_SaveAll();
    server._SoloServer_DisconnectPlayer(index);
    packets.length = 0;
    index = login();
    select();
    const restored = info();
    assert.equal(restored.str, 32767);
    assert.equal(restored.agi, 32767);
    assert.equal(restored.vit, 32767);
    assert.equal(restored.ene, 32767);
    assert.equal(restored.level, 400);
    assert.equal(restored.reset, 100);
    assert.equal(restored.points, initial.points);
    chat('/gm off');
    const before = save();
    chat('/setreset 50');
    assert.deepEqual(save(), before, 'GM off revokes permission');
    console.log('PASS: GM permissions, direct values, derived stats, input bounds, unchanged points, save/relogin.');
}
main().then(() => process.exit(0), error => { console.error(error); process.exit(1); });
