// Validate the map placements needed to render buildings, walls and decorations.
// Run before packaging: node src/client/test-assets.cjs --source-only
// Check the shipped bundle: node src/client/test-assets.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const required = Array.from({length: 12}, (_, i) => `/Data/World${i + 1}/EncTerrain${i + 1}.obj`);
const sourceOnly = process.argv.includes('--source-only');
const errors = [];
let entries;
let bundle;
if (!sourceOnly) {
    const web = path.resolve(__dirname, '../../web');
    const js = fs.readFileSync(path.join(web, 'shell_login.js'), 'utf8');
    const metadata = /loadPackage\((\{[\s\S]*?\})\);/.exec(js);
    assert.ok(metadata, 'client preload manifest exists');
    entries = new Map(JSON.parse(metadata[1]).files.map(file => [file.filename, file]));
    bundle = fs.readFileSync(path.join(web, 'shell_login.data'));
}
for (const filename of required) {
    const source = path.join(__dirname, 'Client', filename.slice(1));
    if (!fs.existsSync(source)) errors.push(`missing source: ${filename}`);
    if (sourceOnly) continue;
    const entry = entries.get(filename);
    if (!entry) {
        errors.push(`missing from bundle: ${filename}`);
    } else if (fs.existsSync(source)) {
        const expected = fs.readFileSync(source);
        if (expected.length < 4 || !bundle.subarray(entry.start, entry.end).equals(expected)) {
            errors.push(`invalid placement data: ${filename}`);
        }
    }
}
assert.equal(errors.length, 0, 'Map placements must be present:\n' + errors.join('\n'));
console.log(`PASS: all ${required.length} map placement files verified (${sourceOnly ? 'source' : 'source and shipped bundle'}).`);
