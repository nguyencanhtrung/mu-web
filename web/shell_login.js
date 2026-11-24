// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module != 'undefined' ? Module : {};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != 'undefined';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && process.versions?.node && process.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)

  Module['expectedDataFileDownloads'] ??= 0;
  Module['expectedDataFileDownloads']++;
  (() => {
    // Do not attempt to redownload the virtual filesystem data when in a pthread or a Wasm Worker context.
    var isPthread = typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD;
    var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER;
    if (isPthread || isWasmWorker) return;
    var isNode = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
    function loadPackage(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = '/home/mars/workspace/studio/mu-web/src/client/out/shell_login.data';
      var REMOTE_PACKAGE_BASE = 'shell_login.data';
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (isNode) {
          require('fs').readFile(packageName, (err, contents) => {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        Module['dataFileDownloads'] ??= {};
        fetch(packageName)
          .catch((cause) => Promise.reject(new Error(`Network Error: ${packageName}`, {cause}))) // If fetch fails, rewrite the error to include the failing URL & the cause.
          .then((response) => {
            if (!response.ok) {
              return Promise.reject(new Error(`${response.status}: ${response.url}`));
            }

            if (!response.body && response.arrayBuffer) { // If we're using the polyfill, readers won't be available...
              return response.arrayBuffer().then(callback);
            }

            const reader = response.body.getReader();
            const iterate = () => reader.read().then(handleChunk).catch((cause) => {
              return Promise.reject(new Error(`Unexpected error while handling : ${response.url} ${cause}`, {cause}));
            });

            const chunks = [];
            const headers = response.headers;
            const total = Number(headers.get('Content-Length')) || Number(packageSize);
            const uncompressedTotal = Number(packageSize) || total || 1;
            let loaded = 0;

            const handleChunk = ({done, value}) => {
              if (!done) {
                chunks.push(value);
                loaded += value.length;
                Module['dataFileDownloads'][packageName] = {loaded: Math.min(total, Math.round(loaded * total / uncompressedTotal)), total};

                let totalLoaded = 0;
                let totalSize = 0;

                for (const download of Object.values(Module['dataFileDownloads'])) {
                  totalLoaded += download.loaded;
                  totalSize += download.total;
                }

                Module['setStatus']?.(`Downloading data... (${totalLoaded}/${totalSize})`);
                return iterate();
              } else {
                const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
                let offset = 0;
                for (const chunk of chunks) {
                  packageData.set(chunk, offset);
                  offset += chunk.length;
                }
                callback(packageData.buffer);
              }
            };

            Module['setStatus']?.('Downloading data...');
            return iterate();
          });
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, (data) => {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS(Module) {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "Data", true, true);
Module['FS_createPath']("/Data", "Effect", true, true);
Module['FS_createPath']("/Data", "Interface", true, true);
Module['FS_createPath']("/Data", "Item", true, true);
Module['FS_createPath']("/Data/Item", "Custom", true, true);
Module['FS_createPath']("/Data/Item/Custom", "20", true, true);
Module['FS_createPath']("/Data/Item/Custom", "72", true, true);
Module['FS_createPath']("/Data/Item/Custom", "Rudolph", true, true);
Module['FS_createPath']("/Data", "Local", true, true);
Module['FS_createPath']("/Data", "Logo", true, true);
Module['FS_createPath']("/Data", "Monster", true, true);
Module['FS_createPath']("/Data/Monster", "Karane", true, true);
Module['FS_createPath']("/Data/Monster", "Pichula", true, true);
Module['FS_createPath']("/Data", "Music", true, true);
Module['FS_createPath']("/Data", "NPC", true, true);
Module['FS_createPath']("/Data", "Object1", true, true);
Module['FS_createPath']("/Data", "Object10", true, true);
Module['FS_createPath']("/Data", "Object11", true, true);
Module['FS_createPath']("/Data", "Object12", true, true);
Module['FS_createPath']("/Data", "Object2", true, true);
Module['FS_createPath']("/Data", "Object3", true, true);
Module['FS_createPath']("/Data", "Object4", true, true);
Module['FS_createPath']("/Data", "Object5", true, true);
Module['FS_createPath']("/Data", "Object6", true, true);
Module['FS_createPath']("/Data", "Object7", true, true);
Module['FS_createPath']("/Data", "Object8", true, true);
Module['FS_createPath']("/Data", "Object9", true, true);
Module['FS_createPath']("/Data", "Player", true, true);
Module['FS_createPath']("/Data/Player", "Custom", true, true);
Module['FS_createPath']("/Data/Player/Custom", "21", true, true);
Module['FS_createPath']("/Data", "Skill", true, true);
Module['FS_createPath']("/Data", "Sound", true, true);
Module['FS_createPath']("/Data", "World1", true, true);
Module['FS_createPath']("/Data", "World10", true, true);
Module['FS_createPath']("/Data", "World11", true, true);
Module['FS_createPath']("/Data", "World12", true, true);
Module['FS_createPath']("/Data", "World2", true, true);
Module['FS_createPath']("/Data", "World3", true, true);
Module['FS_createPath']("/Data", "World4", true, true);
Module['FS_createPath']("/Data", "World5", true, true);
Module['FS_createPath']("/Data", "World6", true, true);
Module['FS_createPath']("/Data", "World7", true, true);
Module['FS_createPath']("/Data", "World8", true, true);
Module['FS_createPath']("/Data", "World9", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency'](`fp ${this.name}`);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency'](`fp ${that.name}`);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_/home/mars/workspace/studio/mu-web/src/client/out/shell_login.data');

      };
      Module['addRunDependency']('datafile_/home/mars/workspace/studio/mu-web/src/client/out/shell_login.data');

      Module['preloadResults'] ??= {};

      Module['preloadResults'][PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS(Module);
    } else {
      (Module['preRun'] ??= []).push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/Data/Dec2.dat", "start": 0, "end": 54}, {"filename": "/Data/Effect/Chrome01.OZJ", "start": 54, "end": 9058}, {"filename": "/Data/Effect/Chrome02.OZJ", "start": 9058, "end": 15349}, {"filename": "/Data/Effect/DinoE.OZJ", "start": 15349, "end": 27677}, {"filename": "/Data/Effect/Explotion01.OZJ", "start": 27677, "end": 69591}, {"filename": "/Data/Effect/Fire01.OZJ", "start": 69591, "end": 83871}, {"filename": "/Data/Effect/Fire02.OZJ", "start": 83871, "end": 93374}, {"filename": "/Data/Effect/Fire03.OZJ", "start": 93374, "end": 107099}, {"filename": "/Data/Effect/Fire04.OZJ", "start": 107099, "end": 116508}, {"filename": "/Data/Effect/Flame01.OZJ", "start": 116508, "end": 125987}, {"filename": "/Data/Effect/Flare.OZJ", "start": 125987, "end": 137190}, {"filename": "/Data/Effect/JointEnergy01.OZJ", "start": 137190, "end": 142044}, {"filename": "/Data/Effect/JointLaser01.OZJ", "start": 142044, "end": 147741}, {"filename": "/Data/Effect/JointLaser02.OZJ", "start": 147741, "end": 156207}, {"filename": "/Data/Effect/JointSpirit01.OZJ", "start": 156207, "end": 166383}, {"filename": "/Data/Effect/JointThunder01.OZJ", "start": 166383, "end": 178222}, {"filename": "/Data/Effect/Magic_Circle1.OZJ", "start": 178222, "end": 185145}, {"filename": "/Data/Effect/Magic_Ground1.OZJ", "start": 185145, "end": 198830}, {"filename": "/Data/Effect/Magic_Ground2.OZJ", "start": 198830, "end": 212768}, {"filename": "/Data/Effect/NSkill.OZJ", "start": 212768, "end": 216646}, {"filename": "/Data/Effect/PoundingBall.OZJ", "start": 216646, "end": 222215}, {"filename": "/Data/Effect/Shiny01.OZJ", "start": 222215, "end": 227150}, {"filename": "/Data/Effect/Shiny02.OZJ", "start": 227150, "end": 233739}, {"filename": "/Data/Effect/Shiny03.OZJ", "start": 233739, "end": 237258}, {"filename": "/Data/Effect/Spark01.OZJ", "start": 237258, "end": 242166}, {"filename": "/Data/Effect/Spark02.OZJ", "start": 242166, "end": 247050}, {"filename": "/Data/Effect/Spark03.OZJ", "start": 247050, "end": 252781}, {"filename": "/Data/Effect/Thunder01.OZJ", "start": 252781, "end": 261625}, {"filename": "/Data/Effect/bab2.OZJ", "start": 261625, "end": 267318}, {"filename": "/Data/Effect/blood.OZT", "start": 267318, "end": 332902}, {"filename": "/Data/Effect/blood01.OZT", "start": 332902, "end": 349334}, {"filename": "/Data/Effect/blur01.OZJ", "start": 349334, "end": 354638}, {"filename": "/Data/Effect/cloudLight.OZJ", "start": 354638, "end": 372372}, {"filename": "/Data/Effect/clouds.OZJ", "start": 372372, "end": 402036}, {"filename": "/Data/Effect/eye01.OZJ", "start": 402036, "end": 407166}, {"filename": "/Data/Effect/fi01.OZJ", "start": 407166, "end": 419685}, {"filename": "/Data/Effect/fi02.OZT", "start": 419685, "end": 681877}, {"filename": "/Data/Effect/flare01.OZJ", "start": 681877, "end": 687728}, {"filename": "/Data/Effect/flare02.OZJ", "start": 687728, "end": 691398}, {"filename": "/Data/Effect/flareBlue.OZJ", "start": 691398, "end": 696031}, {"filename": "/Data/Effect/lightning.OZJ", "start": 696031, "end": 754597}, {"filename": "/Data/Effect/lightning2.OZJ", "start": 754597, "end": 773981}, {"filename": "/Data/Effect/motion_blur.OZJ", "start": 773981, "end": 782715}, {"filename": "/Data/Effect/motion_blur_r.OZJ", "start": 782715, "end": 790085}, {"filename": "/Data/Effect/motion_blur_r2.OZJ", "start": 790085, "end": 802471}, {"filename": "/Data/Effect/ring.OZJ", "start": 802471, "end": 811559}, {"filename": "/Data/Effect/smoke01.OZJ", "start": 811559, "end": 818377}, {"filename": "/Data/Effect/smoke02.OZT", "start": 818377, "end": 834809}, {"filename": "/Data/Effect/spark.OZJ", "start": 834809, "end": 845280}, {"filename": "/Data/Enc1.dat", "start": 845280, "end": 845334}, {"filename": "/Data/Gate.bmd", "start": 845334, "end": 846234}, {"filename": "/Data/Interface/Accept_box01.OZJ", "start": 846234, "end": 852229}, {"filename": "/Data/Interface/Accept_box02.OZJ", "start": 852229, "end": 858400}, {"filename": "/Data/Interface/Back1.OZJ", "start": 858400, "end": 864417}, {"filename": "/Data/Interface/Back2.OZJ", "start": 864417, "end": 871038}, {"filename": "/Data/Interface/Back3.OZJ", "start": 871038, "end": 877610}, {"filename": "/Data/Interface/Bar.OZJ", "start": 877610, "end": 883380}, {"filename": "/Data/Interface/Buy_01.OZJ", "start": 883380, "end": 889312}, {"filename": "/Data/Interface/Buy_02.OZJ", "start": 889312, "end": 895200}, {"filename": "/Data/Interface/Cancel.OZJ", "start": 895200, "end": 902123}, {"filename": "/Data/Interface/Cancel2.OZJ", "start": 902123, "end": 909820}, {"filename": "/Data/Interface/Cursor.OZT", "start": 909820, "end": 913964}, {"filename": "/Data/Interface/Cursorattack.OZT", "start": 913964, "end": 918108}, {"filename": "/Data/Interface/Cursordontmove.OZT", "start": 918108, "end": 922252}, {"filename": "/Data/Interface/Cursoreye.OZT", "start": 922252, "end": 938684}, {"filename": "/Data/Interface/Cursorget.OZT", "start": 938684, "end": 942828}, {"filename": "/Data/Interface/Cursorleanagainst.OZT", "start": 942828, "end": 946972}, {"filename": "/Data/Interface/Cursorpush.OZT", "start": 946972, "end": 951116}, {"filename": "/Data/Interface/Cursorrepair.OZT", "start": 951116, "end": 955260}, {"filename": "/Data/Interface/Cursorsitdown.OZT", "start": 955260, "end": 959404}, {"filename": "/Data/Interface/Cursortalk.OZT", "start": 959404, "end": 975836}, {"filename": "/Data/Interface/Dialogue1.OZJ", "start": 975836, "end": 985884}, {"filename": "/Data/Interface/Dialogue2.OZJ", "start": 985884, "end": 995662}, {"filename": "/Data/Interface/Dialogue2_1.OZJ", "start": 995662, "end": 1000892}, {"filename": "/Data/Interface/Exit_01.OZJ", "start": 1000892, "end": 1006846}, {"filename": "/Data/Interface/Exit_02.OZJ", "start": 1006846, "end": 1012912}, {"filename": "/Data/Interface/Font.OZT", "start": 1012912, "end": 1275104}, {"filename": "/Data/Interface/Fontinput.OZT", "start": 1275104, "end": 1307920}, {"filename": "/Data/Interface/Fonttest.OZT", "start": 1307920, "end": 1340736}, {"filename": "/Data/Interface/Guild.OZJ", "start": 1340736, "end": 1347057}, {"filename": "/Data/Interface/Guild.OZT", "start": 1347057, "end": 1347361}, {"filename": "/Data/Interface/Inventorybox2.OZJ", "start": 1347361, "end": 1353231}, {"filename": "/Data/Interface/Item_Back02.OZJ", "start": 1353231, "end": 1387301}, {"filename": "/Data/Interface/Item_back01.OZJ", "start": 1387301, "end": 1434499}, {"filename": "/Data/Interface/Item_boots.OZJ", "start": 1434499, "end": 1440792}, {"filename": "/Data/Interface/Item_box.OZJ", "start": 1440792, "end": 1446292}, {"filename": "/Data/Interface/Item_cap.OZJ", "start": 1446292, "end": 1452604}, {"filename": "/Data/Interface/Item_fairy.OZJ", "start": 1452604, "end": 1458999}, {"filename": "/Data/Interface/Item_gloves.OZJ", "start": 1458999, "end": 1465440}, {"filename": "/Data/Interface/Item_lower.OZJ", "start": 1465440, "end": 1471919}, {"filename": "/Data/Interface/Item_money.OZJ", "start": 1471919, "end": 1478678}, {"filename": "/Data/Interface/Item_necklace.OZJ", "start": 1478678, "end": 1483929}, {"filename": "/Data/Interface/Item_ring.OZJ", "start": 1483929, "end": 1489159}, {"filename": "/Data/Interface/Item_upper.OZJ", "start": 1489159, "end": 1496572}, {"filename": "/Data/Interface/Item_weapon01.OZJ", "start": 1496572, "end": 1503953}, {"filename": "/Data/Interface/Item_weapon02.OZJ", "start": 1503953, "end": 1511205}, {"filename": "/Data/Interface/Item_wing.OZJ", "start": 1511205, "end": 1518182}, {"filename": "/Data/Interface/Level01.OZJ", "start": 1518182, "end": 1523229}, {"filename": "/Data/Interface/Level_01.OZJ", "start": 1523229, "end": 1529473}, {"filename": "/Data/Interface/Level_02.OZJ", "start": 1529473, "end": 1535695}, {"filename": "/Data/Interface/Level_box.OZJ", "start": 1535695, "end": 1542807}, {"filename": "/Data/Interface/Lock_01.OZJ", "start": 1542807, "end": 1548981}, {"filename": "/Data/Interface/Lock_02.OZJ", "start": 1548981, "end": 1555295}, {"filename": "/Data/Interface/Lock_03.OZJ", "start": 1555295, "end": 1561525}, {"filename": "/Data/Interface/Lock_04.OZJ", "start": 1561525, "end": 1567876}, {"filename": "/Data/Interface/Menu01_new.OZJ", "start": 1567876, "end": 1584577}, {"filename": "/Data/Interface/Menu02.OZJ", "start": 1584577, "end": 1599484}, {"filename": "/Data/Interface/Menu03_new.OZJ", "start": 1599484, "end": 1618522}, {"filename": "/Data/Interface/Menu03_new_ag.OZJ", "start": 1618522, "end": 1621397}, {"filename": "/Data/Interface/Menu04.OZT", "start": 1621397, "end": 1640885}, {"filename": "/Data/Interface/Menu_blue.OZJ", "start": 1640885, "end": 1651154}, {"filename": "/Data/Interface/Menu_character.OZJ", "start": 1651154, "end": 1656798}, {"filename": "/Data/Interface/Menu_green.OZJ", "start": 1656798, "end": 1666738}, {"filename": "/Data/Interface/Menu_inventory.OZJ", "start": 1666738, "end": 1672549}, {"filename": "/Data/Interface/Menu_party.OZJ", "start": 1672549, "end": 1678347}, {"filename": "/Data/Interface/Menu_red.OZJ", "start": 1678347, "end": 1688239}, {"filename": "/Data/Interface/Message_box.OZJ", "start": 1688239, "end": 1707054}, {"filename": "/Data/Interface/Message_box1.OZJ", "start": 1707054, "end": 1714847}, {"filename": "/Data/Interface/Message_box2.OZJ", "start": 1714847, "end": 1719759}, {"filename": "/Data/Interface/MiniMap.OZT", "start": 1719759, "end": 1824299}, {"filename": "/Data/Interface/Mix_button1.OZJ", "start": 1824299, "end": 1829339}, {"filename": "/Data/Interface/Mix_button2.OZJ", "start": 1829339, "end": 1834852}, {"filename": "/Data/Interface/Money_01.OZJ", "start": 1834852, "end": 1840736}, {"filename": "/Data/Interface/Money_02.OZJ", "start": 1840736, "end": 1846694}, {"filename": "/Data/Interface/Nis_back.OZJ", "start": 1846694, "end": 1848460}, {"filename": "/Data/Interface/Nis_bar.OZJ", "start": 1848460, "end": 1850223}, {"filename": "/Data/Interface/Nis_btnalpha.OZJ", "start": 1850223, "end": 1852615}, {"filename": "/Data/Interface/Nis_btnarrow.OZJ", "start": 1852615, "end": 1854984}, {"filename": "/Data/Interface/Nis_btnchat.OZJ", "start": 1854984, "end": 1857395}, {"filename": "/Data/Interface/Nis_btnend.OZJ", "start": 1857395, "end": 1859767}, {"filename": "/Data/Interface/Nis_btnmax.OZJ", "start": 1859767, "end": 1861827}, {"filename": "/Data/Interface/Nis_btnmin.OZJ", "start": 1861827, "end": 1863906}, {"filename": "/Data/Interface/Nis_btnsize.OZJ", "start": 1863906, "end": 1866306}, {"filename": "/Data/Interface/Nis_hframe.OZJ", "start": 1866306, "end": 1871548}, {"filename": "/Data/Interface/Nis_rsframe.OZJ", "start": 1871548, "end": 1874526}, {"filename": "/Data/Interface/Nis_rsframe.OZT", "start": 1874526, "end": 1875630}, {"filename": "/Data/Interface/Nis_vframe.OZJ", "start": 1875630, "end": 1878055}, {"filename": "/Data/Interface/Ok.OZJ", "start": 1878055, "end": 1884769}, {"filename": "/Data/Interface/Ok2.OZJ", "start": 1884769, "end": 1892121}, {"filename": "/Data/Interface/Progress.OZJ", "start": 1892121, "end": 1895763}, {"filename": "/Data/Interface/Progress_back.OZJ", "start": 1895763, "end": 1900137}, {"filename": "/Data/Interface/Repair_01.OZJ", "start": 1900137, "end": 1906096}, {"filename": "/Data/Interface/Repair_02.OZJ", "start": 1906096, "end": 1912096}, {"filename": "/Data/Interface/Sell_01.OZJ", "start": 1912096, "end": 1917949}, {"filename": "/Data/Interface/Sell_02.OZJ", "start": 1917949, "end": 1923794}, {"filename": "/Data/Interface/Skill.OZJ", "start": 1923794, "end": 2021659}, {"filename": "/Data/Interface/Trading_line.OZJ", "start": 2021659, "end": 2030467}, {"filename": "/Data/Item/Antidote01.bmd", "start": 2030467, "end": 2039031}, {"filename": "/Data/Item/Arrows01.bmd", "start": 2039031, "end": 2043188}, {"filename": "/Data/Item/Arrows02.bmd", "start": 2043188, "end": 2050718}, {"filename": "/Data/Item/Axe01.bmd", "start": 2050718, "end": 2055440}, {"filename": "/Data/Item/Axe02.bmd", "start": 2055440, "end": 2061294}, {"filename": "/Data/Item/Axe03.bmd", "start": 2061294, "end": 2067732}, {"filename": "/Data/Item/Axe04.bmd", "start": 2067732, "end": 2073566}, {"filename": "/Data/Item/Axe05.bmd", "start": 2073566, "end": 2077234}, {"filename": "/Data/Item/Axe06.bmd", "start": 2077234, "end": 2082736}, {"filename": "/Data/Item/Axe07.bmd", "start": 2082736, "end": 2089182}, {"filename": "/Data/Item/Axe08.bmd", "start": 2089182, "end": 2096404}, {"filename": "/Data/Item/Axe09.bmd", "start": 2096404, "end": 2106893}, {"filename": "/Data/Item/Axes02.OZJ", "start": 2106893, "end": 2113044}, {"filename": "/Data/Item/Axes03.OZJ", "start": 2113044, "end": 2119285}, {"filename": "/Data/Item/Axes04.OZJ", "start": 2119285, "end": 2130438}, {"filename": "/Data/Item/Axes05.OZJ", "start": 2130438, "end": 2141357}, {"filename": "/Data/Item/Axes06.OZJ", "start": 2141357, "end": 2146749}, {"filename": "/Data/Item/Axes06.OZT", "start": 2146749, "end": 2163181}, {"filename": "/Data/Item/Axes07.OZJ", "start": 2163181, "end": 2173949}, {"filename": "/Data/Item/Axes08.OZJ", "start": 2173949, "end": 2185030}, {"filename": "/Data/Item/Axes09.OZJ", "start": 2185030, "end": 2197242}, {"filename": "/Data/Item/Axes10.OZJ", "start": 2197242, "end": 2207992}, {"filename": "/Data/Item/Beer01.bmd", "start": 2207992, "end": 2211402}, {"filename": "/Data/Item/Beer02.bmd", "start": 2211402, "end": 2223912}, {"filename": "/Data/Item/Book01.bmd", "start": 2223912, "end": 2225574}, {"filename": "/Data/Item/Book02.bmd", "start": 2225574, "end": 2227236}, {"filename": "/Data/Item/Book03.bmd", "start": 2227236, "end": 2228898}, {"filename": "/Data/Item/Book04.bmd", "start": 2228898, "end": 2230560}, {"filename": "/Data/Item/Book05.bmd", "start": 2230560, "end": 2232222}, {"filename": "/Data/Item/Book06.bmd", "start": 2232222, "end": 2233884}, {"filename": "/Data/Item/Book07.bmd", "start": 2233884, "end": 2235546}, {"filename": "/Data/Item/Book08.bmd", "start": 2235546, "end": 2237208}, {"filename": "/Data/Item/Book09.bmd", "start": 2237208, "end": 2238870}, {"filename": "/Data/Item/Book10.bmd", "start": 2238870, "end": 2240532}, {"filename": "/Data/Item/Book11.bmd", "start": 2240532, "end": 2242194}, {"filename": "/Data/Item/Book12.bmd", "start": 2242194, "end": 2243856}, {"filename": "/Data/Item/Book13.bmd", "start": 2243856, "end": 2245518}, {"filename": "/Data/Item/Book14.bmd", "start": 2245518, "end": 2247180}, {"filename": "/Data/Item/Book15.bmd", "start": 2247180, "end": 2248842}, {"filename": "/Data/Item/Book16.bmd", "start": 2248842, "end": 2250504}, {"filename": "/Data/Item/Book17.bmd", "start": 2250504, "end": 2252166}, {"filename": "/Data/Item/Book18.bmd", "start": 2252166, "end": 2253828}, {"filename": "/Data/Item/Book19.bmd", "start": 2253828, "end": 2255490}, {"filename": "/Data/Item/Bow01.bmd", "start": 2255490, "end": 2263714}, {"filename": "/Data/Item/Bow02.bmd", "start": 2263714, "end": 2273888}, {"filename": "/Data/Item/Bow03.bmd", "start": 2273888, "end": 2284698}, {"filename": "/Data/Item/Bow04.bmd", "start": 2284698, "end": 2296864}, {"filename": "/Data/Item/Bow05.bmd", "start": 2296864, "end": 2318310}, {"filename": "/Data/Item/Bow06.bmd", "start": 2318310, "end": 2331202}, {"filename": "/Data/Item/Bow07.bmd", "start": 2331202, "end": 2362398}, {"filename": "/Data/Item/Bow18.bmd", "start": 2362398, "end": 2432796}, {"filename": "/Data/Item/Bow19.bmd", "start": 2432796, "end": 2453944}, {"filename": "/Data/Item/Bow20.bmd", "start": 2453944, "end": 2514311}, {"filename": "/Data/Item/ConChip00.bmd", "start": 2514311, "end": 2518513}, {"filename": "/Data/Item/CrossBow01.bmd", "start": 2518513, "end": 2530650}, {"filename": "/Data/Item/CrossBow02.bmd", "start": 2530650, "end": 2543015}, {"filename": "/Data/Item/CrossBow03.bmd", "start": 2543015, "end": 2558800}, {"filename": "/Data/Item/CrossBow04.bmd", "start": 2558800, "end": 2571133}, {"filename": "/Data/Item/CrossBow05.bmd", "start": 2571133, "end": 2589966}, {"filename": "/Data/Item/CrossBow06.bmd", "start": 2589966, "end": 2610466}, {"filename": "/Data/Item/CrossBow07.bmd", "start": 2610466, "end": 2631966}, {"filename": "/Data/Item/CrossBow17.bmd", "start": 2631966, "end": 2664318}, {"filename": "/Data/Item/CrossBow20.bmd", "start": 2664318, "end": 2695907}, {"filename": "/Data/Item/Custom/20/nks01.OZJ", "start": 2695907, "end": 2706686}, {"filename": "/Data/Item/Custom/20/nks02.OZJ", "start": 2706686, "end": 2724156}, {"filename": "/Data/Item/Custom/20/nks03.OZJ", "start": 2724156, "end": 2733452}, {"filename": "/Data/Item/Custom/20/nks04.OZJ", "start": 2733452, "end": 2744327}, {"filename": "/Data/Item/Custom/20/sword21.bmd", "start": 2744327, "end": 2767045}, {"filename": "/Data/Item/Custom/72/Mace72.bmd", "start": 2767045, "end": 2805814}, {"filename": "/Data/Item/Custom/72/nfm01.OZJ", "start": 2805814, "end": 2835905}, {"filename": "/Data/Item/Custom/72/nfm02.OZT", "start": 2835905, "end": 2868721}, {"filename": "/Data/Item/Custom/72/nfm03.OZJ", "start": 2868721, "end": 2877470}, {"filename": "/Data/Item/Custom/Rudolph/flareRed.OZJ", "start": 2877470, "end": 2887841}, {"filename": "/Data/Item/Custom/Rudolph/gold_tree.OZJ", "start": 2887841, "end": 2901100}, {"filename": "/Data/Item/Custom/Rudolph/xmas_deer.bmd", "start": 2901100, "end": 2993289}, {"filename": "/Data/Item/Custom/Rudolph/xmassasum02.OZJ", "start": 2993289, "end": 3011714}, {"filename": "/Data/Item/DarkHorseHorn.bmd", "start": 3011714, "end": 3014886}, {"filename": "/Data/Item/DarkHorseSoul.bmd", "start": 3014886, "end": 3019032}, {"filename": "/Data/Item/DarkLordRobe.OZT", "start": 3019032, "end": 3150152}, {"filename": "/Data/Item/DarkLordRobe.bmd", "start": 3150152, "end": 3151986}, {"filename": "/Data/Item/DarkLordSign.OZJ", "start": 3151986, "end": 3163421}, {"filename": "/Data/Item/DarkLordSleeve.OZT", "start": 3163421, "end": 3171661}, {"filename": "/Data/Item/DarkLordSleeve.bmd", "start": 3171661, "end": 3172507}, {"filename": "/Data/Item/Devil00.bmd", "start": 3172507, "end": 3178259}, {"filename": "/Data/Item/Devil01.bmd", "start": 3178259, "end": 3185671}, {"filename": "/Data/Item/Devil02.bmd", "start": 3185671, "end": 3202881}, {"filename": "/Data/Item/Drax.OZJ", "start": 3202881, "end": 3217118}, {"filename": "/Data/Item/Drax_N.OZJ", "start": 3217118, "end": 3220148}, {"filename": "/Data/Item/Drax_R.OZJ", "start": 3220148, "end": 3226766}, {"filename": "/Data/Item/Drink00.bmd", "start": 3226766, "end": 3239856}, {"filename": "/Data/Item/Ds_B.OZJ", "start": 3239856, "end": 3241868}, {"filename": "/Data/Item/Ds_R.OZJ", "start": 3241868, "end": 3243880}, {"filename": "/Data/Item/Dstic.OZJ", "start": 3243880, "end": 3259980}, {"filename": "/Data/Item/Ebow4.OZJ", "start": 3259980, "end": 3273404}, {"filename": "/Data/Item/Ebow_R.OZJ", "start": 3273404, "end": 3275890}, {"filename": "/Data/Item/Eccross.OZJ", "start": 3275890, "end": 3315256}, {"filename": "/Data/Item/Eccross.OZT", "start": 3315256, "end": 3446376}, {"filename": "/Data/Item/Eldobox.OZJ", "start": 3446376, "end": 3450550}, {"filename": "/Data/Item/Elf_E.OZJ", "start": 3450550, "end": 3455762}, {"filename": "/Data/Item/Esh.OZJ", "start": 3455762, "end": 3462458}, {"filename": "/Data/Item/Esh.OZT", "start": 3462458, "end": 3470698}, {"filename": "/Data/Item/Esh2.OZJ", "start": 3470698, "end": 3474055}, {"filename": "/Data/Item/Estic.OZJ", "start": 3474055, "end": 3478194}, {"filename": "/Data/Item/Estic2.OZJ", "start": 3478194, "end": 3481300}, {"filename": "/Data/Item/Estic2_R.OZJ", "start": 3481300, "end": 3488785}, {"filename": "/Data/Item/Event01.bmd", "start": 3488785, "end": 3497082}, {"filename": "/Data/Item/Event02.bmd", "start": 3497082, "end": 3500076}, {"filename": "/Data/Item/Event03.bmd", "start": 3500076, "end": 3512742}, {"filename": "/Data/Item/EventBloodCastle00.bmd", "start": 3512742, "end": 3514635}, {"filename": "/Data/Item/EventBloodCastle01.bmd", "start": 3514635, "end": 3518269}, {"filename": "/Data/Item/EventBloodCastle02.bmd", "start": 3518269, "end": 3526963}, {"filename": "/Data/Item/EventBloodCastle03.bmd", "start": 3526963, "end": 3529057}, {"filename": "/Data/Item/EventBloodCastle04.bmd", "start": 3529057, "end": 3534690}, {"filename": "/Data/Item/EventBloodCastle05.bmd", "start": 3534690, "end": 3540323}, {"filename": "/Data/Item/EventBloodCastle06.bmd", "start": 3540323, "end": 3545956}, {"filename": "/Data/Item/EventChaosCastle.bmd", "start": 3545956, "end": 3565958}, {"filename": "/Data/Item/Gem01.bmd", "start": 3565958, "end": 3570456}, {"filename": "/Data/Item/Gem02.bmd", "start": 3570456, "end": 3574954}, {"filename": "/Data/Item/Gem03.bmd", "start": 3574954, "end": 3579452}, {"filename": "/Data/Item/Gem04.bmd", "start": 3579452, "end": 3583950}, {"filename": "/Data/Item/Gem05.bmd", "start": 3583950, "end": 3588448}, {"filename": "/Data/Item/Gem06.bmd", "start": 3588448, "end": 3592946}, {"filename": "/Data/Item/Gem07.bmd", "start": 3592946, "end": 3597444}, {"filename": "/Data/Item/Gem08.bmd", "start": 3597444, "end": 3601942}, {"filename": "/Data/Item/Gem10.bmd", "start": 3601942, "end": 3606440}, {"filename": "/Data/Item/Gem11.bmd", "start": 3606440, "end": 3610938}, {"filename": "/Data/Item/Gem12.bmd", "start": 3610938, "end": 3615436}, {"filename": "/Data/Item/Gem13.bmd", "start": 3615436, "end": 3619934}, {"filename": "/Data/Item/Gem14.bmd", "start": 3619934, "end": 3624432}, {"filename": "/Data/Item/Gold01.bmd", "start": 3624432, "end": 3627426}, {"filename": "/Data/Item/HELLASITEM00.bmd", "start": 3627426, "end": 3640262}, {"filename": "/Data/Item/HELLASITEM01.bmd", "start": 3640262, "end": 3648272}, {"filename": "/Data/Item/Javelins01.OZJ", "start": 3648272, "end": 3654737}, {"filename": "/Data/Item/Javelins03.OZJ", "start": 3654737, "end": 3660658}, {"filename": "/Data/Item/Javelins04.OZJ", "start": 3660658, "end": 3666865}, {"filename": "/Data/Item/Javelins05.OZJ", "start": 3666865, "end": 3678447}, {"filename": "/Data/Item/Jewel01.bmd", "start": 3678447, "end": 3679761}, {"filename": "/Data/Item/Jewel02.bmd", "start": 3679761, "end": 3681863}, {"filename": "/Data/Item/Jewel03.bmd", "start": 3681863, "end": 3685985}, {"filename": "/Data/Item/Jewel15.bmd", "start": 3685985, "end": 3688827}, {"filename": "/Data/Item/Ksword.OZJ", "start": 3688827, "end": 3703634}, {"filename": "/Data/Item/Ksword2.OZJ", "start": 3703634, "end": 3706029}, {"filename": "/Data/Item/Ktext.OZJ", "start": 3706029, "end": 3719575}, {"filename": "/Data/Item/MMsS.OZJ", "start": 3719575, "end": 3722245}, {"filename": "/Data/Item/MMsS2.OZJ", "start": 3722245, "end": 3727208}, {"filename": "/Data/Item/MMsS_r.OZJ", "start": 3727208, "end": 3730398}, {"filename": "/Data/Item/MMsSs_r.OZJ", "start": 3730398, "end": 3743103}, {"filename": "/Data/Item/Mace01.bmd", "start": 3743103, "end": 3746893}, {"filename": "/Data/Item/Mace02.bmd", "start": 3746893, "end": 3758183}, {"filename": "/Data/Item/Mace03.bmd", "start": 3758183, "end": 3772745}, {"filename": "/Data/Item/Mace04.bmd", "start": 3772745, "end": 3778015}, {"filename": "/Data/Item/Mace05.bmd", "start": 3778015, "end": 3797295}, {"filename": "/Data/Item/Mace06.bmd", "start": 3797295, "end": 3814461}, {"filename": "/Data/Item/Mace07.bmd", "start": 3814461, "end": 3828257}, {"filename": "/Data/Item/Mace08.bmd", "start": 3828257, "end": 3853858}, {"filename": "/Data/Item/Mace09.bmd", "start": 3853858, "end": 3890641}, {"filename": "/Data/Item/Mace10.bmd", "start": 3890641, "end": 3926668}, {"filename": "/Data/Item/Mace11.bmd", "start": 3926668, "end": 3963660}, {"filename": "/Data/Item/Mace12.bmd", "start": 3963660, "end": 4010916}, {"filename": "/Data/Item/Mace13.bmd", "start": 4010916, "end": 4067923}, {"filename": "/Data/Item/Mace14.bmd", "start": 4067923, "end": 4106692}, {"filename": "/Data/Item/MagicBox01.bmd", "start": 4106692, "end": 4112524}, {"filename": "/Data/Item/MagicBox02.bmd", "start": 4112524, "end": 4114958}, {"filename": "/Data/Item/MagicBox03.bmd", "start": 4114958, "end": 4117312}, {"filename": "/Data/Item/MagicBox04.bmd", "start": 4117312, "end": 4129283}, {"filename": "/Data/Item/MagicBox05.bmd", "start": 4129283, "end": 4137580}, {"filename": "/Data/Item/MagicBox06.bmd", "start": 4137580, "end": 4145220}, {"filename": "/Data/Item/MagicBox07.bmd", "start": 4145220, "end": 4152860}, {"filename": "/Data/Item/MagicBox08.bmd", "start": 4152860, "end": 4157302}, {"filename": "/Data/Item/MagicRing.OZJ", "start": 4157302, "end": 4165869}, {"filename": "/Data/Item/MagicRing00.bmd", "start": 4165869, "end": 4171517}, {"filename": "/Data/Item/MagicRingPendant.OZJ", "start": 4171517, "end": 4179895}, {"filename": "/Data/Item/Msword.OZJ", "start": 4179895, "end": 4214390}, {"filename": "/Data/Item/NDEE.OZJ", "start": 4214390, "end": 4217207}, {"filename": "/Data/Item/NDEE.OZT", "start": 4217207, "end": 4225447}, {"filename": "/Data/Item/NDW.OZJ", "start": 4225447, "end": 4234821}, {"filename": "/Data/Item/NDW_R.OZJ", "start": 4234821, "end": 4241546}, {"filename": "/Data/Item/NEWWW.OZJ", "start": 4241546, "end": 4252353}, {"filename": "/Data/Item/NEWW_R.OZJ", "start": 4252353, "end": 4264248}, {"filename": "/Data/Item/Necklace01.bmd", "start": 4264248, "end": 4271370}, {"filename": "/Data/Item/Necklace02.bmd", "start": 4271370, "end": 4279180}, {"filename": "/Data/Item/NewingEl.OZJ", "start": 4279180, "end": 4298346}, {"filename": "/Data/Item/Polearms02.OZJ", "start": 4298346, "end": 4308444}, {"filename": "/Data/Item/Polearms03.OZJ", "start": 4308444, "end": 4318886}, {"filename": "/Data/Item/Polearms04.OZJ", "start": 4318886, "end": 4328783}, {"filename": "/Data/Item/Polearms05.OZJ", "start": 4328783, "end": 4340416}, {"filename": "/Data/Item/Potion01.bmd", "start": 4340416, "end": 4345096}, {"filename": "/Data/Item/Potion02.bmd", "start": 4345096, "end": 4347996}, {"filename": "/Data/Item/Potion03.bmd", "start": 4347996, "end": 4351776}, {"filename": "/Data/Item/Potion04.bmd", "start": 4351776, "end": 4358532}, {"filename": "/Data/Item/Potion05.bmd", "start": 4358532, "end": 4361432}, {"filename": "/Data/Item/Potion06.bmd", "start": 4361432, "end": 4365212}, {"filename": "/Data/Item/Potion07.bmd", "start": 4365212, "end": 4371976}, {"filename": "/Data/Item/Quest00.bmd", "start": 4371976, "end": 4377609}, {"filename": "/Data/Item/Quest01.bmd", "start": 4377609, "end": 4389002}, {"filename": "/Data/Item/Quest02.bmd", "start": 4389002, "end": 4394887}, {"filename": "/Data/Item/Quest03.bmd", "start": 4394887, "end": 4407596}, {"filename": "/Data/Item/Quest04.bmd", "start": 4407596, "end": 4409070}, {"filename": "/Data/Item/Quest05.bmd", "start": 4409070, "end": 4419812}, {"filename": "/Data/Item/QuestItem3rd00.bmd", "start": 4419812, "end": 4426213}, {"filename": "/Data/Item/QuestItem3rd01.bmd", "start": 4426213, "end": 4434359}, {"filename": "/Data/Item/RedDragonT.OZJ", "start": 4434359, "end": 4456438}, {"filename": "/Data/Item/Ring01.bmd", "start": 4456438, "end": 4461196}, {"filename": "/Data/Item/Ring02.bmd", "start": 4461196, "end": 4465694}, {"filename": "/Data/Item/RingOfLordEvent.OZJ", "start": 4465694, "end": 4474241}, {"filename": "/Data/Item/RingOfLordEvent00.bmd", "start": 4474241, "end": 4484601}, {"filename": "/Data/Item/RingPenOfLordEvent.OZJ", "start": 4484601, "end": 4493481}, {"filename": "/Data/Item/Scroll01.bmd", "start": 4493481, "end": 4500891}, {"filename": "/Data/Item/Shield01.bmd", "start": 4500891, "end": 4502861}, {"filename": "/Data/Item/Shield02.bmd", "start": 4502861, "end": 4505763}, {"filename": "/Data/Item/Shield03.bmd", "start": 4505763, "end": 4508305}, {"filename": "/Data/Item/Shield04.bmd", "start": 4508305, "end": 4512641}, {"filename": "/Data/Item/Shield05.bmd", "start": 4512641, "end": 4514883}, {"filename": "/Data/Item/Shield06.bmd", "start": 4514883, "end": 4517319}, {"filename": "/Data/Item/Shield07.bmd", "start": 4517319, "end": 4527439}, {"filename": "/Data/Item/Shield08.bmd", "start": 4527439, "end": 4532877}, {"filename": "/Data/Item/Shield09.bmd", "start": 4532877, "end": 4535283}, {"filename": "/Data/Item/Shield10.bmd", "start": 4535283, "end": 4537509}, {"filename": "/Data/Item/Shield11.bmd", "start": 4537509, "end": 4540831}, {"filename": "/Data/Item/Shield12.bmd", "start": 4540831, "end": 4548046}, {"filename": "/Data/Item/Shield13.bmd", "start": 4548046, "end": 4558945}, {"filename": "/Data/Item/Shield14.bmd", "start": 4558945, "end": 4575176}, {"filename": "/Data/Item/Shield15.bmd", "start": 4575176, "end": 4590251}, {"filename": "/Data/Item/SkillScroll01.bmd", "start": 4590251, "end": 4591913}, {"filename": "/Data/Item/SkillScroll02.bmd", "start": 4591913, "end": 4593575}, {"filename": "/Data/Item/SkillScroll03.bmd", "start": 4593575, "end": 4595237}, {"filename": "/Data/Item/SkillScroll04.bmd", "start": 4595237, "end": 4596899}, {"filename": "/Data/Item/Spear01.bmd", "start": 4596899, "end": 4608085}, {"filename": "/Data/Item/Spear02.bmd", "start": 4608085, "end": 4617501}, {"filename": "/Data/Item/Spear03.bmd", "start": 4617501, "end": 4621759}, {"filename": "/Data/Item/Spear04.bmd", "start": 4621759, "end": 4627729}, {"filename": "/Data/Item/Spear05.bmd", "start": 4627729, "end": 4638679}, {"filename": "/Data/Item/Spear06.bmd", "start": 4638679, "end": 4644833}, {"filename": "/Data/Item/Spear07.bmd", "start": 4644833, "end": 4650031}, {"filename": "/Data/Item/Spear08.bmd", "start": 4650031, "end": 4660485}, {"filename": "/Data/Item/Spear09.bmd", "start": 4660485, "end": 4673819}, {"filename": "/Data/Item/Spear10.bmd", "start": 4673819, "end": 4687393}, {"filename": "/Data/Item/Spear11.bmd", "start": 4687393, "end": 4703830}, {"filename": "/Data/Item/Staff01.bmd", "start": 4703830, "end": 4717144}, {"filename": "/Data/Item/Staff02.bmd", "start": 4717144, "end": 4721944}, {"filename": "/Data/Item/Staff03.bmd", "start": 4721944, "end": 4728466}, {"filename": "/Data/Item/Staff04.bmd", "start": 4728466, "end": 4738588}, {"filename": "/Data/Item/Staff05.bmd", "start": 4738588, "end": 4759530}, {"filename": "/Data/Item/Staff06.bmd", "start": 4759530, "end": 4787341}, {"filename": "/Data/Item/Staff07.bmd", "start": 4787341, "end": 4837673}, {"filename": "/Data/Item/Staff08.bmd", "start": 4837673, "end": 4888048}, {"filename": "/Data/Item/Staff09.bmd", "start": 4888048, "end": 4893789}, {"filename": "/Data/Item/Staff10.bmd", "start": 4893789, "end": 4934369}, {"filename": "/Data/Item/Staff11.bmd", "start": 4934369, "end": 4970709}, {"filename": "/Data/Item/Staff12.bmd", "start": 4970709, "end": 5051067}, {"filename": "/Data/Item/Stts.OZJ", "start": 5051067, "end": 5053305}, {"filename": "/Data/Item/Sword01.bmd", "start": 5053305, "end": 5060171}, {"filename": "/Data/Item/Sword02.bmd", "start": 5060171, "end": 5064821}, {"filename": "/Data/Item/Sword03.bmd", "start": 5064821, "end": 5069579}, {"filename": "/Data/Item/Sword04.bmd", "start": 5069579, "end": 5079269}, {"filename": "/Data/Item/Sword05.bmd", "start": 5079269, "end": 5085495}, {"filename": "/Data/Item/Sword06.bmd", "start": 5085495, "end": 5094939}, {"filename": "/Data/Item/Sword07.bmd", "start": 5094939, "end": 5101101}, {"filename": "/Data/Item/Sword08.bmd", "start": 5101101, "end": 5110371}, {"filename": "/Data/Item/Sword09.bmd", "start": 5110371, "end": 5118113}, {"filename": "/Data/Item/Sword10.bmd", "start": 5118113, "end": 5125809}, {"filename": "/Data/Item/Sword11.bmd", "start": 5125809, "end": 5131987}, {"filename": "/Data/Item/Sword12.bmd", "start": 5131987, "end": 5145489}, {"filename": "/Data/Item/Sword13.bmd", "start": 5145489, "end": 5163932}, {"filename": "/Data/Item/Sword14.bmd", "start": 5163932, "end": 5179972}, {"filename": "/Data/Item/Sword15.bmd", "start": 5179972, "end": 5188982}, {"filename": "/Data/Item/Sword16.bmd", "start": 5188982, "end": 5191540}, {"filename": "/Data/Item/Sword17.bmd", "start": 5191540, "end": 5214210}, {"filename": "/Data/Item/Sword18.bmd", "start": 5214210, "end": 5233742}, {"filename": "/Data/Item/Sword19.bmd", "start": 5233742, "end": 5250624}, {"filename": "/Data/Item/Sword20.bmd", "start": 5250624, "end": 5278332}, {"filename": "/Data/Item/Sword32.bmd", "start": 5278332, "end": 5312819}, {"filename": "/Data/Item/WDNN.OZJ", "start": 5312819, "end": 5317362}, {"filename": "/Data/Item/WD_R.OZJ", "start": 5317362, "end": 5319743}, {"filename": "/Data/Item/WD_a.OZJ", "start": 5319743, "end": 5325254}, {"filename": "/Data/Item/WD_t.OZJ", "start": 5325254, "end": 5327384}, {"filename": "/Data/Item/WDn.OZJ", "start": 5327384, "end": 5329428}, {"filename": "/Data/Item/WDn.OZT", "start": 5329428, "end": 5362244}, {"filename": "/Data/Item/W_S.OZJ", "start": 5362244, "end": 5367463}, {"filename": "/Data/Item/Wing01.bmd", "start": 5367463, "end": 5371507}, {"filename": "/Data/Item/Wing02.bmd", "start": 5371507, "end": 5378014}, {"filename": "/Data/Item/Wing03.bmd", "start": 5378014, "end": 5383385}, {"filename": "/Data/Item/Wing04.bmd", "start": 5383385, "end": 5396760}, {"filename": "/Data/Item/Wing05.bmd", "start": 5396760, "end": 5501146}, {"filename": "/Data/Item/Wing06.bmd", "start": 5501146, "end": 5564155}, {"filename": "/Data/Item/Wing07.bmd", "start": 5564155, "end": 5598978}, {"filename": "/Data/Item/a9.OZJ", "start": 5598978, "end": 5607991}, {"filename": "/Data/Item/a_2.OZJ", "start": 5607991, "end": 5612932}, {"filename": "/Data/Item/a_a.OZJ", "start": 5612932, "end": 5618724}, {"filename": "/Data/Item/af.OZT", "start": 5618724, "end": 5651540}, {"filename": "/Data/Item/agnecklace.OZJ", "start": 5651540, "end": 5662023}, {"filename": "/Data/Item/agnecklace.bmd", "start": 5662023, "end": 5672243}, {"filename": "/Data/Item/angel_wing.OZT", "start": 5672243, "end": 5737827}, {"filename": "/Data/Item/angelscroll01.OZT", "start": 5737827, "end": 5754259}, {"filename": "/Data/Item/apple.OZJ", "start": 5754259, "end": 5759375}, {"filename": "/Data/Item/bloodbone02.OZJ", "start": 5759375, "end": 5768118}, {"filename": "/Data/Item/blue_jewel.OZJ", "start": 5768118, "end": 5773022}, {"filename": "/Data/Item/bone02.OZT", "start": 5773022, "end": 5789454}, {"filename": "/Data/Item/book.OZJ", "start": 5789454, "end": 5801137}, {"filename": "/Data/Item/bottle.OZT", "start": 5801137, "end": 5805281}, {"filename": "/Data/Item/bow01.OZJ", "start": 5805281, "end": 5811409}, {"filename": "/Data/Item/bow02.OZJ", "start": 5811409, "end": 5821187}, {"filename": "/Data/Item/bow03.OZJ", "start": 5821187, "end": 5832886}, {"filename": "/Data/Item/bow04.OZJ", "start": 5832886, "end": 5845608}, {"filename": "/Data/Item/bow05.OZJ", "start": 5845608, "end": 5858918}, {"filename": "/Data/Item/bow05.OZT", "start": 5858918, "end": 5863062}, {"filename": "/Data/Item/bow06.OZJ", "start": 5863062, "end": 5875290}, {"filename": "/Data/Item/bow77.OZJ", "start": 5875290, "end": 5894128}, {"filename": "/Data/Item/bowbox.OZJ", "start": 5894128, "end": 5904683}, {"filename": "/Data/Item/box.OZJ", "start": 5904683, "end": 5911087}, {"filename": "/Data/Item/change.OZJ", "start": 5911087, "end": 5919798}, {"filename": "/Data/Item/chip.OZJ", "start": 5919798, "end": 5922227}, {"filename": "/Data/Item/crossbow01.OZJ", "start": 5922227, "end": 5928092}, {"filename": "/Data/Item/crossbow02.OZJ", "start": 5928092, "end": 5937303}, {"filename": "/Data/Item/crossbow03.OZJ", "start": 5937303, "end": 5947180}, {"filename": "/Data/Item/crossbow04.OZJ", "start": 5947180, "end": 5958593}, {"filename": "/Data/Item/crossbow05.OZJ", "start": 5958593, "end": 5985005}, {"filename": "/Data/Item/crossbow06.OZJ", "start": 5985005, "end": 5992510}, {"filename": "/Data/Item/crossbow06_2.OZJ", "start": 5992510, "end": 6000002}, {"filename": "/Data/Item/crossbow06_2.OZT", "start": 6000002, "end": 6008242}, {"filename": "/Data/Item/crossbow06_R.OZJ", "start": 6008242, "end": 6015645}, {"filename": "/Data/Item/crossbow_box.OZJ", "start": 6015645, "end": 6022004}, {"filename": "/Data/Item/darkhorn.OZJ", "start": 6022004, "end": 6033225}, {"filename": "/Data/Item/darksoul_r.OZJ", "start": 6033225, "end": 6042274}, {"filename": "/Data/Item/darkstone8.OZJ", "start": 6042274, "end": 6051046}, {"filename": "/Data/Item/darkstonered.OZJ", "start": 6051046, "end": 6059485}, {"filename": "/Data/Item/devil_wing.OZT", "start": 6059485, "end": 6125069}, {"filename": "/Data/Item/devileye.OZJ", "start": 6125069, "end": 6129625}, {"filename": "/Data/Item/devileye2.OZJ", "start": 6129625, "end": 6132370}, {"filename": "/Data/Item/devilkey.OZJ", "start": 6132370, "end": 6139011}, {"filename": "/Data/Item/dkScroll.OZJ", "start": 6139011, "end": 6145935}, {"filename": "/Data/Item/dkScroll2_R.OZJ", "start": 6145935, "end": 6150814}, {"filename": "/Data/Item/dkScroll_R.OZJ", "start": 6150814, "end": 6159287}, {"filename": "/Data/Item/du_shield1.OZJ", "start": 6159287, "end": 6166148}, {"filename": "/Data/Item/du_shield2.OZJ", "start": 6166148, "end": 6172621}, {"filename": "/Data/Item/elfin_wing.OZJ", "start": 6172621, "end": 6182303}, {"filename": "/Data/Item/etcring.OZJ", "start": 6182303, "end": 6194206}, {"filename": "/Data/Item/fairy.OZJ", "start": 6194206, "end": 6199200}, {"filename": "/Data/Item/fairy2.OZJ", "start": 6199200, "end": 6204714}, {"filename": "/Data/Item/firecracker.OZJ", "start": 6204714, "end": 6208162}, {"filename": "/Data/Item/firering.OZJ", "start": 6208162, "end": 6217239}, {"filename": "/Data/Item/firering.bmd", "start": 6217239, "end": 6224523}, {"filename": "/Data/Item/flail00.OZT", "start": 6224523, "end": 6225595}, {"filename": "/Data/Item/flail02.OZJ", "start": 6225595, "end": 6231862}, {"filename": "/Data/Item/ft6.OZJ", "start": 6231862, "end": 6249323}, {"filename": "/Data/Item/ft72.OZJ", "start": 6249323, "end": 6255133}, {"filename": "/Data/Item/gloryring.OZJ", "start": 6255133, "end": 6265812}, {"filename": "/Data/Item/godest01.OZJ", "start": 6265812, "end": 6276043}, {"filename": "/Data/Item/godest02.OZJ", "start": 6276043, "end": 6284552}, {"filename": "/Data/Item/godest03.OZJ", "start": 6284552, "end": 6293061}, {"filename": "/Data/Item/godesteel.bmd", "start": 6293061, "end": 6301387}, {"filename": "/Data/Item/godesteel.smd", "start": 6301387, "end": 6320796}, {"filename": "/Data/Item/gold.OZJ", "start": 6320796, "end": 6326042}, {"filename": "/Data/Item/goldmedal.OZJ", "start": 6326042, "end": 6331720}, {"filename": "/Data/Item/groundring.OZJ", "start": 6331720, "end": 6340363}, {"filename": "/Data/Item/groundring.bmd", "start": 6340363, "end": 6345887}, {"filename": "/Data/Item/hellasmap.OZT", "start": 6345887, "end": 6350031}, {"filename": "/Data/Item/hhj.OZJ", "start": 6350031, "end": 6354995}, {"filename": "/Data/Item/hound_shield1.OZT", "start": 6354995, "end": 6363235}, {"filename": "/Data/Item/hound_shield2.OZJ", "start": 6363235, "end": 6375466}, {"filename": "/Data/Item/hound_sword1.OZJ", "start": 6375466, "end": 6384954}, {"filename": "/Data/Item/icenecklace.OZJ", "start": 6384954, "end": 6395252}, {"filename": "/Data/Item/icenecklace.bmd", "start": 6395252, "end": 6404984}, {"filename": "/Data/Item/item.bmd", "start": 6404984, "end": 6433144}, {"filename": "/Data/Item/items.OZJ", "start": 6433144, "end": 6440530}, {"filename": "/Data/Item/jewel22.bmd", "start": 6440530, "end": 6444230}, {"filename": "/Data/Item/jh01.OZJ", "start": 6444230, "end": 6458717}, {"filename": "/Data/Item/jh02.OZJ", "start": 6458717, "end": 6465707}, {"filename": "/Data/Item/jh03.OZT", "start": 6465707, "end": 6498523}, {"filename": "/Data/Item/jk00.OZJ", "start": 6498523, "end": 6513585}, {"filename": "/Data/Item/jk01.OZJ", "start": 6513585, "end": 6520236}, {"filename": "/Data/Item/jo00.OZJ", "start": 6520236, "end": 6534817}, {"filename": "/Data/Item/jo01.OZJ", "start": 6534817, "end": 6542286}, {"filename": "/Data/Item/kmap.OZJ", "start": 6542286, "end": 6552871}, {"filename": "/Data/Item/kmap02.OZJ", "start": 6552871, "end": 6561628}, {"filename": "/Data/Item/ksing01.OZJ", "start": 6561628, "end": 6573300}, {"filename": "/Data/Item/ksing02.OZJ", "start": 6573300, "end": 6584985}, {"filename": "/Data/Item/ksing02.OZT", "start": 6584985, "end": 6589129}, {"filename": "/Data/Item/ksing03.OZJ", "start": 6589129, "end": 6597983}, {"filename": "/Data/Item/kundunStic.OZJ", "start": 6597983, "end": 6610890}, {"filename": "/Data/Item/kundunStic2.OZJ", "start": 6610890, "end": 6623540}, {"filename": "/Data/Item/kundunStic_R.OZJ", "start": 6623540, "end": 6629244}, {"filename": "/Data/Item/lopi00.OZJ", "start": 6629244, "end": 6635366}, {"filename": "/Data/Item/loveB.OZJ", "start": 6635366, "end": 6638402}, {"filename": "/Data/Item/lower_14m.OZT", "start": 6638402, "end": 6654834}, {"filename": "/Data/Item/mace.OZJ", "start": 6654834, "end": 6662634}, {"filename": "/Data/Item/mace02.OZJ", "start": 6662634, "end": 6668333}, {"filename": "/Data/Item/mace03.OZJ", "start": 6668333, "end": 6673327}, {"filename": "/Data/Item/maceB.OZJ", "start": 6673327, "end": 6677323}, {"filename": "/Data/Item/magictext.OZJ", "start": 6677323, "end": 6683704}, {"filename": "/Data/Item/manaring.OZJ", "start": 6683704, "end": 6692231}, {"filename": "/Data/Item/manaring.bmd", "start": 6692231, "end": 6698787}, {"filename": "/Data/Item/mangto04.OZJ", "start": 6698787, "end": 6714720}, {"filename": "/Data/Item/maul.OZJ", "start": 6714720, "end": 6735925}, {"filename": "/Data/Item/maul03.OZJ", "start": 6735925, "end": 6742928}, {"filename": "/Data/Item/maulB.OZJ", "start": 6742928, "end": 6760883}, {"filename": "/Data/Item/medal.OZJ", "start": 6760883, "end": 6767045}, {"filename": "/Data/Item/medal1.OZJ", "start": 6767045, "end": 6770480}, {"filename": "/Data/Item/medal2.OZJ", "start": 6770480, "end": 6775099}, {"filename": "/Data/Item/medicine1.OZJ", "start": 6775099, "end": 6781024}, {"filename": "/Data/Item/medicine2.OZJ", "start": 6781024, "end": 6786047}, {"filename": "/Data/Item/nds01.OZJ", "start": 6786047, "end": 6801732}, {"filename": "/Data/Item/nds02.OZJ", "start": 6801732, "end": 6814943}, {"filename": "/Data/Item/nds03.OZJ", "start": 6814943, "end": 6823737}, {"filename": "/Data/Item/nfb.OZJ", "start": 6823737, "end": 6858389}, {"filename": "/Data/Item/nfb01.OZJ", "start": 6858389, "end": 6890184}, {"filename": "/Data/Item/nfb02.OZJ", "start": 6890184, "end": 6911054}, {"filename": "/Data/Item/nfb2_R.OZJ", "start": 6911054, "end": 6923009}, {"filename": "/Data/Item/nfb4.OZT", "start": 6923009, "end": 6939441}, {"filename": "/Data/Item/nfb_R.OZJ", "start": 6939441, "end": 6947730}, {"filename": "/Data/Item/nfm01.OZJ", "start": 6947730, "end": 6977821}, {"filename": "/Data/Item/nfm02.OZT", "start": 6977821, "end": 7010637}, {"filename": "/Data/Item/nfm03.OZJ", "start": 7010637, "end": 7019386}, {"filename": "/Data/Item/ni99.OZJ", "start": 7019386, "end": 7035414}, {"filename": "/Data/Item/nks01.OZJ", "start": 7035414, "end": 7046193}, {"filename": "/Data/Item/nks02.OZJ", "start": 7046193, "end": 7063663}, {"filename": "/Data/Item/nks03.OZJ", "start": 7063663, "end": 7072959}, {"filename": "/Data/Item/nks04.OZJ", "start": 7072959, "end": 7083834}, {"filename": "/Data/Item/olive.OZJ", "start": 7083834, "end": 7086306}, {"filename": "/Data/Item/pe.OZJ", "start": 7086306, "end": 7092951}, {"filename": "/Data/Item/pearl.OZJ", "start": 7092951, "end": 7099023}, {"filename": "/Data/Item/poket.OZJ", "start": 7099023, "end": 7106261}, {"filename": "/Data/Item/pot3.OZT", "start": 7106261, "end": 7110405}, {"filename": "/Data/Item/power_a.OZT", "start": 7110405, "end": 7143221}, {"filename": "/Data/Item/power_a3.OZT", "start": 7143221, "end": 7159653}, {"filename": "/Data/Item/red.OZJ", "start": 7159653, "end": 7164548}, {"filename": "/Data/Item/red_jewel.OZJ", "start": 7164548, "end": 7169485}, {"filename": "/Data/Item/ring.OZJ", "start": 7169485, "end": 7181388}, {"filename": "/Data/Item/rok.OZT", "start": 7181388, "end": 7183484}, {"filename": "/Data/Item/satan.OZJ", "start": 7183484, "end": 7188590}, {"filename": "/Data/Item/satan2.OZT", "start": 7188590, "end": 7192734}, {"filename": "/Data/Item/sep01.OZJ", "start": 7192734, "end": 7204459}, {"filename": "/Data/Item/sep011.OZJ", "start": 7204459, "end": 7215464}, {"filename": "/Data/Item/sep02.OZJ", "start": 7215464, "end": 7237985}, {"filename": "/Data/Item/sep0202.OZJ", "start": 7237985, "end": 7259569}, {"filename": "/Data/Item/sep03.OZJ", "start": 7259569, "end": 7281745}, {"filename": "/Data/Item/sep0303.OZJ", "start": 7281745, "end": 7294235}, {"filename": "/Data/Item/sep03030303.OZJ", "start": 7294235, "end": 7303167}, {"filename": "/Data/Item/sep03_R.OZJ", "start": 7303167, "end": 7311636}, {"filename": "/Data/Item/sep04.OZJ", "start": 7311636, "end": 7323574}, {"filename": "/Data/Item/sep0404.OZJ", "start": 7323574, "end": 7335182}, {"filename": "/Data/Item/sep05.OZJ", "start": 7335182, "end": 7355368}, {"filename": "/Data/Item/sep055.OZJ", "start": 7355368, "end": 7365847}, {"filename": "/Data/Item/sep06.OZJ", "start": 7365847, "end": 7430735}, {"filename": "/Data/Item/sep0606.OZJ", "start": 7430735, "end": 7455795}, {"filename": "/Data/Item/sep062.OZJ", "start": 7455795, "end": 7478587}, {"filename": "/Data/Item/sep063.OZJ", "start": 7478587, "end": 7511151}, {"filename": "/Data/Item/sep064.OZJ", "start": 7511151, "end": 7520727}, {"filename": "/Data/Item/sep065.OZJ", "start": 7520727, "end": 7528993}, {"filename": "/Data/Item/sep06e_R.OZJ", "start": 7528993, "end": 7538500}, {"filename": "/Data/Item/sep06effe.OZJ", "start": 7538500, "end": 7548002}, {"filename": "/Data/Item/shield02.OZJ", "start": 7548002, "end": 7561732}, {"filename": "/Data/Item/shield03.OZJ", "start": 7561732, "end": 7573216}, {"filename": "/Data/Item/shield04.OZJ", "start": 7573216, "end": 7580183}, {"filename": "/Data/Item/shield04.OZT", "start": 7580183, "end": 7588423}, {"filename": "/Data/Item/shield05.OZJ", "start": 7588423, "end": 7600639}, {"filename": "/Data/Item/shield06.OZJ", "start": 7600639, "end": 7625396}, {"filename": "/Data/Item/shield07.OZJ", "start": 7625396, "end": 7633121}, {"filename": "/Data/Item/shield07.OZT", "start": 7633121, "end": 7641361}, {"filename": "/Data/Item/shield08.OZJ", "start": 7641361, "end": 7661041}, {"filename": "/Data/Item/shield082.OZJ", "start": 7661041, "end": 7665586}, {"filename": "/Data/Item/shield09.OZJ", "start": 7665586, "end": 7674772}, {"filename": "/Data/Item/shield092.OZJ", "start": 7674772, "end": 7679432}, {"filename": "/Data/Item/shield10.OZJ", "start": 7679432, "end": 7688430}, {"filename": "/Data/Item/shield102.OZJ", "start": 7688430, "end": 7693092}, {"filename": "/Data/Item/shield11.OZT", "start": 7693092, "end": 7709524}, {"filename": "/Data/Item/shield11_a.OZJ", "start": 7709524, "end": 7714986}, {"filename": "/Data/Item/shield16.bmd", "start": 7714986, "end": 7725031}, {"filename": "/Data/Item/shield17.bmd", "start": 7725031, "end": 7747279}, {"filename": "/Data/Item/shield_a_01.OZJ", "start": 7747279, "end": 7756161}, {"filename": "/Data/Item/shield_a_02.OZJ", "start": 7756161, "end": 7763979}, {"filename": "/Data/Item/skillScroll.bmd", "start": 7763979, "end": 7771516}, {"filename": "/Data/Item/spiritbill.bmd", "start": 7771516, "end": 7781486}, {"filename": "/Data/Item/star.OZJ", "start": 7781486, "end": 7783484}, {"filename": "/Data/Item/stone02.OZJ", "start": 7783484, "end": 7793903}, {"filename": "/Data/Item/sword015.OZJ", "start": 7793903, "end": 7807564}, {"filename": "/Data/Item/sword015_2.OZJ", "start": 7807564, "end": 7813798}, {"filename": "/Data/Item/sword02.OZJ", "start": 7813798, "end": 7820114}, {"filename": "/Data/Item/sword03.OZJ", "start": 7820114, "end": 7828973}, {"filename": "/Data/Item/sword04.OZJ", "start": 7828973, "end": 7835551}, {"filename": "/Data/Item/sword05.OZJ", "start": 7835551, "end": 7841899}, {"filename": "/Data/Item/sword05.OZT", "start": 7841899, "end": 7841963}, {"filename": "/Data/Item/sword06.OZJ", "start": 7841963, "end": 7849892}, {"filename": "/Data/Item/sword07.OZJ", "start": 7849892, "end": 7862943}, {"filename": "/Data/Item/sword077.OZJ", "start": 7862943, "end": 7870193}, {"filename": "/Data/Item/sword07_2.OZJ", "start": 7870193, "end": 7876537}, {"filename": "/Data/Item/sword08.OZJ", "start": 7876537, "end": 7885919}, {"filename": "/Data/Item/sword09.OZJ", "start": 7885919, "end": 7898902}, {"filename": "/Data/Item/sword11.OZJ", "start": 7898902, "end": 7905719}, {"filename": "/Data/Item/sword11.OZT", "start": 7905719, "end": 7907815}, {"filename": "/Data/Item/sword12.OZJ", "start": 7907815, "end": 7913392}, {"filename": "/Data/Item/sword12_2.OZJ", "start": 7913392, "end": 7918774}, {"filename": "/Data/Item/sword12_3.OZJ", "start": 7918774, "end": 7924267}, {"filename": "/Data/Item/sword13.OZJ", "start": 7924267, "end": 7937783}, {"filename": "/Data/Item/sword14.OZJ", "start": 7937783, "end": 7947119}, {"filename": "/Data/Item/sword14.OZT", "start": 7947119, "end": 7951263}, {"filename": "/Data/Item/sword15.OZJ", "start": 7951263, "end": 7964345}, {"filename": "/Data/Item/sword15_2.OZJ", "start": 7964345, "end": 7976725}, {"filename": "/Data/Item/sword16.OZJ", "start": 7976725, "end": 7983155}, {"filename": "/Data/Item/sword16_2.OZJ", "start": 7983155, "end": 7990290}, {"filename": "/Data/Item/sword17.OZJ", "start": 7990290, "end": 7997855}, {"filename": "/Data/Item/sword22.bmd", "start": 7997855, "end": 8034112}, {"filename": "/Data/Item/sword442.OZJ", "start": 8034112, "end": 8041329}, {"filename": "/Data/Item/sword44_R.OZJ", "start": 8041329, "end": 8047442}, {"filename": "/Data/Item/t_lower_14m.OZT", "start": 8047442, "end": 8063874}, {"filename": "/Data/Item/u2u.OZJ", "start": 8063874, "end": 8072943}, {"filename": "/Data/Item/u2u2.OZJ", "start": 8072943, "end": 8078088}, {"filename": "/Data/Item/u2u3.OZJ", "start": 8078088, "end": 8083201}, {"filename": "/Data/Item/unicon.OZJ", "start": 8083201, "end": 8110225}, {"filename": "/Data/Item/unicon01.OZT", "start": 8110225, "end": 8114369}, {"filename": "/Data/Item/visitor.OZJ", "start": 8114369, "end": 8121549}, {"filename": "/Data/Item/visitor2.OZJ", "start": 8121549, "end": 8124149}, {"filename": "/Data/Item/wand01.OZJ", "start": 8124149, "end": 8131071}, {"filename": "/Data/Item/wand02.OZJ", "start": 8131071, "end": 8145589}, {"filename": "/Data/Item/wand03.OZJ", "start": 8145589, "end": 8152297}, {"filename": "/Data/Item/wand03.OZT", "start": 8152297, "end": 8153369}, {"filename": "/Data/Item/wand04.OZJ", "start": 8153369, "end": 8164644}, {"filename": "/Data/Item/wand05.OZJ", "start": 8164644, "end": 8174644}, {"filename": "/Data/Item/wand06.OZJ", "start": 8174644, "end": 8186919}, {"filename": "/Data/Item/wand10.OZJ", "start": 8186919, "end": 8194044}, {"filename": "/Data/Item/wand10.OZT", "start": 8194044, "end": 8202284}, {"filename": "/Data/Item/wand10_2.OZJ", "start": 8202284, "end": 8208589}, {"filename": "/Data/Item/wand44.OZJ", "start": 8208589, "end": 8215988}, {"filename": "/Data/Item/wand44_R.OZJ", "start": 8215988, "end": 8223577}, {"filename": "/Data/Item/waternecklace.OZJ", "start": 8223577, "end": 8233613}, {"filename": "/Data/Item/waternecklace.bmd", "start": 8233613, "end": 8243393}, {"filename": "/Data/Item/waterring.bmd", "start": 8243393, "end": 8250677}, {"filename": "/Data/Item/wdn_R.OZJ", "start": 8250677, "end": 8253040}, {"filename": "/Data/Item/windnecklace.OZJ", "start": 8253040, "end": 8263218}, {"filename": "/Data/Item/windnecklace.bmd", "start": 8263218, "end": 8273866}, {"filename": "/Data/Item/windring.OZJ", "start": 8273866, "end": 8282972}, {"filename": "/Data/Item/windring.bmd", "start": 8282972, "end": 8289920}, {"filename": "/Data/Item/wolf02.OZJ", "start": 8289920, "end": 8294796}, {"filename": "/Data/Item/wwa.OZJ", "start": 8294796, "end": 8300057}, {"filename": "/Data/Item/wwe.OZJ", "start": 8300057, "end": 8311474}, {"filename": "/Data/Item/wwe00.OZJ", "start": 8311474, "end": 8319567}, {"filename": "/Data/Item/yellow_jewel.OZJ", "start": 8319567, "end": 8324508}, {"filename": "/Data/Local/Dialog.bmd", "start": 8324508, "end": 8529308}, {"filename": "/Data/Local/Dialog_Eng.bmd", "start": 8529308, "end": 8734108}, {"filename": "/Data/Local/Dialog_Por.bmd", "start": 8734108, "end": 8938908}, {"filename": "/Data/Local/Dialog_Spn.bmd", "start": 8938908, "end": 9143708}, {"filename": "/Data/Local/Everyone.OZJ", "start": 9143708, "end": 9169897}, {"filename": "/Data/Local/Filter.bmd", "start": 9169897, "end": 9189901}, {"filename": "/Data/Local/FilterName.bmd", "start": 9189901, "end": 9209905}, {"filename": "/Data/Local/Item.bmd", "start": 9209905, "end": 9242677}, {"filename": "/Data/Local/Loading01.OZJ", "start": 9242677, "end": 9268359}, {"filename": "/Data/Local/Loading02.OZJ", "start": 9268359, "end": 9320887}, {"filename": "/Data/Local/Loading03.OZJ", "start": 9320887, "end": 9346869}, {"filename": "/Data/Local/NPCName(kor).txt", "start": 9346869, "end": 9350178}, {"filename": "/Data/Local/NPCName.txt", "start": 9350178, "end": 9353502}, {"filename": "/Data/Local/Quest.bmd", "start": 9353502, "end": 9470302}, {"filename": "/Data/Local/Skill.bmd", "start": 9470302, "end": 9472866}, {"filename": "/Data/Local/Text.bmd", "start": 9472866, "end": 9772866}, {"filename": "/Data/Local/Text_Eng.bmd", "start": 9772866, "end": 10072866}, {"filename": "/Data/Local/Text_Por.bmd", "start": 10072866, "end": 10372866}, {"filename": "/Data/Local/Text_Spn.bmd", "start": 10372866, "end": 10672866}, {"filename": "/Data/Local/Webzenlogo.OZJ", "start": 10672866, "end": 10724254}, {"filename": "/Data/Logo/0account.OZT", "start": 10724254, "end": 10940302}, {"filename": "/Data/Logo/0account_new.OZT", "start": 10940302, "end": 11156350}, {"filename": "/Data/Logo/0box.OZJ", "start": 11156350, "end": 11165148}, {"filename": "/Data/Logo/0new_account01.OZT", "start": 11165148, "end": 11427340}, {"filename": "/Data/Logo/0new_account02.OZT", "start": 11427340, "end": 11506236}, {"filename": "/Data/Logo/0on_botton.OZJ", "start": 11506236, "end": 11512222}, {"filename": "/Data/Logo/0on_botton2.OZJ", "start": 11512222, "end": 11518440}, {"filename": "/Data/Logo/0text_box.OZJ", "start": 11518440, "end": 11524578}, {"filename": "/Data/Logo/Cface01.OZJ", "start": 11524578, "end": 11561389}, {"filename": "/Data/Logo/Cface02.OZJ", "start": 11561389, "end": 11574199}, {"filename": "/Data/Logo/Cface04.OZT", "start": 11574199, "end": 11575271}, {"filename": "/Data/Logo/Cface09.OZT", "start": 11575271, "end": 11583511}, {"filename": "/Data/Logo/Delete01.OZT", "start": 11583511, "end": 11655719}, {"filename": "/Data/Logo/Delete02.OZJ", "start": 11655719, "end": 11662987}, {"filename": "/Data/Logo/Face01.bmd", "start": 11662987, "end": 11802311}, {"filename": "/Data/Logo/Face02.bmd", "start": 11802311, "end": 11948171}, {"filename": "/Data/Logo/Face03.bmd", "start": 11948171, "end": 12125358}, {"filename": "/Data/Logo/Face04.bmd", "start": 12125358, "end": 12310850}, {"filename": "/Data/Logo/Fairy_back.OZJ", "start": 12310850, "end": 12323257}, {"filename": "/Data/Logo/Interface01.OZT", "start": 12323257, "end": 12411369}, {"filename": "/Data/Logo/Interface02.OZT", "start": 12411369, "end": 12476953}, {"filename": "/Data/Logo/Interface03.OZT", "start": 12476953, "end": 12534345}, {"filename": "/Data/Logo/Interface04.OZT", "start": 12534345, "end": 12567161}, {"filename": "/Data/Logo/Logo.OZJ", "start": 12567161, "end": 12601104}, {"filename": "/Data/Logo/Logo01.bmd", "start": 12601104, "end": 12603069}, {"filename": "/Data/Logo/Logo02.bmd", "start": 12603069, "end": 12608883}, {"filename": "/Data/Logo/Logo03.bmd", "start": 12608883, "end": 12682602}, {"filename": "/Data/Logo/Logo04.bmd", "start": 12682602, "end": 12689785}, {"filename": "/Data/Logo/Logo05.bmd", "start": 12689785, "end": 12841879}, {"filename": "/Data/Logo/Logo2.OZJ", "start": 12841879, "end": 12865584}, {"filename": "/Data/Logo/Magic_01.OZJ", "start": 12865584, "end": 12892531}, {"filename": "/Data/Logo/Magic_02.OZT", "start": 12892531, "end": 13023651}, {"filename": "/Data/Logo/Magic_03.OZJ", "start": 13023651, "end": 13036061}, {"filename": "/Data/Logo/Magic_09.OZJ", "start": 13036061, "end": 13072431}, {"filename": "/Data/Logo/Magic_09_2.OZJ", "start": 13072431, "end": 13083717}, {"filename": "/Data/Logo/Main_earth.OZJ", "start": 13083717, "end": 13161266}, {"filename": "/Data/Logo/Main_stone.OZJ", "start": 13161266, "end": 13170557}, {"filename": "/Data/Logo/Main_wood1.OZJ", "start": 13170557, "end": 13194872}, {"filename": "/Data/Logo/Main_wood2.OZJ", "start": 13194872, "end": 13205880}, {"filename": "/Data/Logo/Main_wood3.OZT", "start": 13205880, "end": 13222312}, {"filename": "/Data/Logo/Main_wood4.OZT", "start": 13222312, "end": 13226456}, {"filename": "/Data/Logo/Main_wood5.OZT", "start": 13226456, "end": 13242888}, {"filename": "/Data/Logo/Main_wood6.OZJ", "start": 13242888, "end": 13248156}, {"filename": "/Data/Logo/Main_wood6.OZT", "start": 13248156, "end": 13264588}, {"filename": "/Data/Logo/Mulogo_01.OZJ", "start": 13264588, "end": 13291959}, {"filename": "/Data/Logo/New_character001.OZJ", "start": 13291959, "end": 13297737}, {"filename": "/Data/Logo/New_character002.OZJ", "start": 13297737, "end": 13303550}, {"filename": "/Data/Logo/New_character003.OZJ", "start": 13303550, "end": 13309369}, {"filename": "/Data/Logo/New_character004.OZJ", "start": 13309369, "end": 13315187}, {"filename": "/Data/Logo/New_character01.OZT", "start": 13315187, "end": 13533347}, {"filename": "/Data/Logo/New_character02.OZT", "start": 13533347, "end": 13634783}, {"filename": "/Data/Logo/New_character201.OZT", "start": 13634783, "end": 13721595}, {"filename": "/Data/Logo/New_character202.OZJ", "start": 13721595, "end": 13730023}, {"filename": "/Data/Logo/New_character_cancel.OZJ", "start": 13730023, "end": 13737630}, {"filename": "/Data/Logo/New_character_ok.OZJ", "start": 13737630, "end": 13744990}, {"filename": "/Data/Logo/Ok01.OZT", "start": 13744990, "end": 13817198}, {"filename": "/Data/Logo/Ok02.OZJ", "start": 13817198, "end": 13824131}, {"filename": "/Data/Logo/Sky0.OZJ", "start": 13824131, "end": 13904496}, {"filename": "/Data/Logo/Sky2.OZJ", "start": 13904496, "end": 13911804}, {"filename": "/Data/Logo/Sky3.OZJ", "start": 13911804, "end": 13926595}, {"filename": "/Data/Logo/Sky4.OZJ", "start": 13926595, "end": 13933456}, {"filename": "/Data/Logo/Sky5.OZJ", "start": 13933456, "end": 13997267}, {"filename": "/Data/Logo/Titel01.OZJ", "start": 13997267, "end": 14004354}, {"filename": "/Data/Logo/Titel02.OZJ", "start": 14004354, "end": 14013934}, {"filename": "/Data/Logo/Warrior.OZJ", "start": 14013934, "end": 14040846}, {"filename": "/Data/Logo/Warrior02.OZJ", "start": 14040846, "end": 14053280}, {"filename": "/Data/Logo/Warrior03.OZT", "start": 14053280, "end": 14061520}, {"filename": "/Data/Logo/Warrior_back.OZJ", "start": 14061520, "end": 14070245}, {"filename": "/Data/Logo/Wave.OZJ", "start": 14070245, "end": 14088849}, {"filename": "/Data/Logo/back1.OZJ", "start": 14088849, "end": 14125551}, {"filename": "/Data/Logo/back2.OZJ", "start": 14125551, "end": 14168512}, {"filename": "/Data/Macro.txt", "start": 14168512, "end": 14168522}, {"filename": "/Data/Monster/BGcl.OZT", "start": 14168522, "end": 14184954}, {"filename": "/Data/Monster/Karane/Boss_Karane_body.OZJ", "start": 14184954, "end": 14194849}, {"filename": "/Data/Monster/Karane/Boss_Karane_cloth.OZT", "start": 14194849, "end": 14325969}, {"filename": "/Data/Monster/Karane/Boss_Karane_head.OZJ", "start": 14325969, "end": 14328582}, {"filename": "/Data/Monster/Karane/Boss_Karane_pants.OZJ", "start": 14328582, "end": 14336802}, {"filename": "/Data/Monster/Karane/Boss_Karane_r.OZJ", "start": 14336802, "end": 14337821}, {"filename": "/Data/Monster/Karane/Karane.bmd", "start": 14337821, "end": 14818358}, {"filename": "/Data/Monster/King11.OZJ", "start": 14818358, "end": 14884886}, {"filename": "/Data/Monster/Kni000.OZJ", "start": 14884886, "end": 14921789}, {"filename": "/Data/Monster/Kni011.OZJ", "start": 14921789, "end": 14941775}, {"filename": "/Data/Monster/Kni022.OZJ", "start": 14941775, "end": 14951783}, {"filename": "/Data/Monster/Ktutl.OZJ", "start": 14951783, "end": 15029836}, {"filename": "/Data/Monster/Monster01.bmd", "start": 15029836, "end": 15188392}, {"filename": "/Data/Monster/Monster02.bmd", "start": 15188392, "end": 15301781}, {"filename": "/Data/Monster/Monster03.bmd", "start": 15301781, "end": 15389775}, {"filename": "/Data/Monster/Monster04.bmd", "start": 15389775, "end": 15555840}, {"filename": "/Data/Monster/Monster05.bmd", "start": 15555840, "end": 15715385}, {"filename": "/Data/Monster/Monster06.bmd", "start": 15715385, "end": 15879660}, {"filename": "/Data/Monster/Monster07.bmd", "start": 15879660, "end": 15919832}, {"filename": "/Data/Monster/Monster08.bmd", "start": 15919832, "end": 15982014}, {"filename": "/Data/Monster/Monster09.bmd", "start": 15982014, "end": 16085701}, {"filename": "/Data/Monster/Monster10.bmd", "start": 16085701, "end": 16137377}, {"filename": "/Data/Monster/Monster11.bmd", "start": 16137377, "end": 16278064}, {"filename": "/Data/Monster/Monster12.bmd", "start": 16278064, "end": 16433208}, {"filename": "/Data/Monster/Monster13.bmd", "start": 16433208, "end": 16579389}, {"filename": "/Data/Monster/Monster14.bmd", "start": 16579389, "end": 16764657}, {"filename": "/Data/Monster/Monster15.bmd", "start": 16764657, "end": 16881283}, {"filename": "/Data/Monster/Monster16.bmd", "start": 16881283, "end": 16963884}, {"filename": "/Data/Monster/Monster17.bmd", "start": 16963884, "end": 17090518}, {"filename": "/Data/Monster/Monster18.bmd", "start": 17090518, "end": 17148295}, {"filename": "/Data/Monster/Monster19.bmd", "start": 17148295, "end": 17370807}, {"filename": "/Data/Monster/Monster20.bmd", "start": 17370807, "end": 17460921}, {"filename": "/Data/Monster/Monster21.bmd", "start": 17460921, "end": 17492933}, {"filename": "/Data/Monster/Monster22.bmd", "start": 17492933, "end": 17614072}, {"filename": "/Data/Monster/Monster23.bmd", "start": 17614072, "end": 17715606}, {"filename": "/Data/Monster/Monster24.bmd", "start": 17715606, "end": 17846152}, {"filename": "/Data/Monster/Monster25.bmd", "start": 17846152, "end": 17963470}, {"filename": "/Data/Monster/Monster26.bmd", "start": 17963470, "end": 18052378}, {"filename": "/Data/Monster/Monster27.bmd", "start": 18052378, "end": 18167436}, {"filename": "/Data/Monster/Monster28.bmd", "start": 18167436, "end": 18397493}, {"filename": "/Data/Monster/Monster29.bmd", "start": 18397493, "end": 18507248}, {"filename": "/Data/Monster/Monster30.bmd", "start": 18507248, "end": 18693984}, {"filename": "/Data/Monster/Monster31.bmd", "start": 18693984, "end": 18883538}, {"filename": "/Data/Monster/Monster32.bmd", "start": 18883538, "end": 19211988}, {"filename": "/Data/Monster/Monster33.bmd", "start": 19211988, "end": 19375052}, {"filename": "/Data/Monster/Monster34.bmd", "start": 19375052, "end": 19506902}, {"filename": "/Data/Monster/Monster35.bmd", "start": 19506902, "end": 19615502}, {"filename": "/Data/Monster/Monster36.bmd", "start": 19615502, "end": 19733050}, {"filename": "/Data/Monster/Monster37.bmd", "start": 19733050, "end": 19909664}, {"filename": "/Data/Monster/Monster38.bmd", "start": 19909664, "end": 20185316}, {"filename": "/Data/Monster/Monster39.bmd", "start": 20185316, "end": 20229089}, {"filename": "/Data/Monster/Monster40.bmd", "start": 20229089, "end": 20454661}, {"filename": "/Data/Monster/Monster41.bmd", "start": 20454661, "end": 20605076}, {"filename": "/Data/Monster/Monster42.bmd", "start": 20605076, "end": 20753974}, {"filename": "/Data/Monster/Monster43.bmd", "start": 20753974, "end": 20962939}, {"filename": "/Data/Monster/Monster44.bmd", "start": 20962939, "end": 21082985}, {"filename": "/Data/Monster/Monster45.bmd", "start": 21082985, "end": 21293602}, {"filename": "/Data/Monster/Monster46.bmd", "start": 21293602, "end": 21413581}, {"filename": "/Data/Monster/Monster47.bmd", "start": 21413581, "end": 21510188}, {"filename": "/Data/Monster/Monster48.bmd", "start": 21510188, "end": 21619882}, {"filename": "/Data/Monster/Monster49.bmd", "start": 21619882, "end": 21782575}, {"filename": "/Data/Monster/Monster51.bmd", "start": 21782575, "end": 21927271}, {"filename": "/Data/Monster/Monster52.bmd", "start": 21927271, "end": 22069357}, {"filename": "/Data/Monster/Monster53.bmd", "start": 22069357, "end": 22209483}, {"filename": "/Data/Monster/Monster54.bmd", "start": 22209483, "end": 22389063}, {"filename": "/Data/Monster/Monster55.bmd", "start": 22389063, "end": 22657949}, {"filename": "/Data/Monster/Monster56.bmd", "start": 22657949, "end": 22838145}, {"filename": "/Data/Monster/Monster57.bmd", "start": 22838145, "end": 22959010}, {"filename": "/Data/Monster/Monster58.bmd", "start": 22959010, "end": 23106154}, {"filename": "/Data/Monster/Monster59.bmd", "start": 23106154, "end": 23347946}, {"filename": "/Data/Monster/Monster60.bmd", "start": 23347946, "end": 23478377}, {"filename": "/Data/Monster/Monster61.bmd", "start": 23478377, "end": 23521204}, {"filename": "/Data/Monster/Monster62.bmd", "start": 23521204, "end": 23536871}, {"filename": "/Data/Monster/Monster63.bmd", "start": 23536871, "end": 23683033}, {"filename": "/Data/Monster/Monster64.bmd", "start": 23683033, "end": 23861811}, {"filename": "/Data/Monster/Monster66.bmd", "start": 23861811, "end": 24072880}, {"filename": "/Data/Monster/Monster67.bmd", "start": 24072880, "end": 24269986}, {"filename": "/Data/Monster/Monster70.bmd", "start": 24269986, "end": 24616195}, {"filename": "/Data/Monster/Monster71.bmd", "start": 24616195, "end": 24735383}, {"filename": "/Data/Monster/Monster72.bmd", "start": 24735383, "end": 24852411}, {"filename": "/Data/Monster/Monster73.bmd", "start": 24852411, "end": 24976999}, {"filename": "/Data/Monster/Monster74.bmd", "start": 24976999, "end": 24986255}, {"filename": "/Data/Monster/Pichula/Boss_Karane_body.OZJ", "start": 24986255, "end": 24996150}, {"filename": "/Data/Monster/Pichula/Boss_Karane_cloth.OZT", "start": 24996150, "end": 25127270}, {"filename": "/Data/Monster/Pichula/Boss_Karane_head.OZJ", "start": 25127270, "end": 25129883}, {"filename": "/Data/Monster/Pichula/Boss_Karane_pants.OZJ", "start": 25129883, "end": 25138103}, {"filename": "/Data/Monster/Pichula/Boss_Karane_r.OZJ", "start": 25138103, "end": 25139122}, {"filename": "/Data/Monster/Pichula/Pichula.bmd", "start": 25139122, "end": 25619659}, {"filename": "/Data/Monster/Pnix.OZJ", "start": 25619659, "end": 25743897}, {"filename": "/Data/Monster/Polearms03.OZJ", "start": 25743897, "end": 25754339}, {"filename": "/Data/Monster/Tamachan.bmd", "start": 25754339, "end": 25900501}, {"filename": "/Data/Monster/ar1.OZJ", "start": 25900501, "end": 25937511}, {"filename": "/Data/Monster/armor_lower2.OZJ", "start": 25937511, "end": 25962690}, {"filename": "/Data/Monster/armor_up2.OZJ", "start": 25962690, "end": 25990414}, {"filename": "/Data/Monster/as.OZJ", "start": 25990414, "end": 26074258}, {"filename": "/Data/Monster/as_1.OZJ", "start": 26074258, "end": 26081117}, {"filename": "/Data/Monster/b4.OZJ", "start": 26081117, "end": 26186699}, {"filename": "/Data/Monster/baron.OZT", "start": 26186699, "end": 26203131}, {"filename": "/Data/Monster/baron01.OZJ", "start": 26203131, "end": 26244366}, {"filename": "/Data/Monster/bbb01.OZT", "start": 26244366, "end": 26309950}, {"filename": "/Data/Monster/bbb02.OZT", "start": 26309950, "end": 26318190}, {"filename": "/Data/Monster/bbbb.OZJ", "start": 26318190, "end": 26362347}, {"filename": "/Data/Monster/bbbb00.OZJ", "start": 26362347, "end": 26414140}, {"filename": "/Data/Monster/bbbb02.OZJ", "start": 26414140, "end": 26419800}, {"filename": "/Data/Monster/bbbb03.OZJ", "start": 26419800, "end": 26424789}, {"filename": "/Data/Monster/bee03_r.OZJ", "start": 26424789, "end": 26438380}, {"filename": "/Data/Monster/big_spider.OZJ", "start": 26438380, "end": 26468567}, {"filename": "/Data/Monster/blast_r.OZJ", "start": 26468567, "end": 26488808}, {"filename": "/Data/Monster/bons.OZJ", "start": 26488808, "end": 26516607}, {"filename": "/Data/Monster/boots2.OZJ", "start": 26516607, "end": 26526496}, {"filename": "/Data/Monster/boss.OZJ", "start": 26526496, "end": 26610849}, {"filename": "/Data/Monster/boss_eye.OZJ", "start": 26610849, "end": 26616026}, {"filename": "/Data/Monster/boss_pattern1.OZJ", "start": 26616026, "end": 26634010}, {"filename": "/Data/Monster/boss_pattern2.OZJ", "start": 26634010, "end": 26648122}, {"filename": "/Data/Monster/bossblack.OZJ", "start": 26648122, "end": 26656376}, {"filename": "/Data/Monster/bossmap1.OZJ", "start": 26656376, "end": 26723456}, {"filename": "/Data/Monster/bossmap1_r.OZJ", "start": 26723456, "end": 26741734}, {"filename": "/Data/Monster/bossmap2.OZJ", "start": 26741734, "end": 26812775}, {"filename": "/Data/Monster/bossseptormap2.OZJ", "start": 26812775, "end": 26871492}, {"filename": "/Data/Monster/bosswing.OZJ", "start": 26871492, "end": 26876120}, {"filename": "/Data/Monster/bosswing.OZT", "start": 26876120, "end": 26892552}, {"filename": "/Data/Monster/bosswingbone.OZJ", "start": 26892552, "end": 26911675}, {"filename": "/Data/Monster/bow01.OZJ", "start": 26911675, "end": 26917803}, {"filename": "/Data/Monster/bow05.OZT", "start": 26917803, "end": 26921947}, {"filename": "/Data/Monster/branch.OZJ", "start": 26921947, "end": 26938575}, {"filename": "/Data/Monster/bsh01.OZJ", "start": 26938575, "end": 26976498}, {"filename": "/Data/Monster/bsh02.OZT", "start": 26976498, "end": 26984738}, {"filename": "/Data/Monster/bsh03.OZT", "start": 26984738, "end": 26988882}, {"filename": "/Data/Monster/bug.OZJ", "start": 26988882, "end": 27017157}, {"filename": "/Data/Monster/bug2.OZJ", "start": 27017157, "end": 27024017}, {"filename": "/Data/Monster/bug3.OZJ", "start": 27024017, "end": 27032645}, {"filename": "/Data/Monster/bulldug.OZJ", "start": 27032645, "end": 27091567}, {"filename": "/Data/Monster/bulldughair.OZT", "start": 27091567, "end": 27095711}, {"filename": "/Data/Monster/bv01.OZJ", "start": 27095711, "end": 27120856}, {"filename": "/Data/Monster/bv01_2.OZJ", "start": 27120856, "end": 27131436}, {"filename": "/Data/Monster/bv02.OZJ", "start": 27131436, "end": 27171999}, {"filename": "/Data/Monster/bv02_2.OZJ", "start": 27171999, "end": 27194776}, {"filename": "/Data/Monster/bv03.OZJ", "start": 27194776, "end": 27199608}, {"filename": "/Data/Monster/cannon.OZJ", "start": 27199608, "end": 27278368}, {"filename": "/Data/Monster/cd71a.bmd", "start": 27278368, "end": 27291038}, {"filename": "/Data/Monster/cd71b.bmd", "start": 27291038, "end": 27303708}, {"filename": "/Data/Monster/cd71c.bmd", "start": 27303708, "end": 27329364}, {"filename": "/Data/Monster/cd71d.bmd", "start": 27329364, "end": 27356332}, {"filename": "/Data/Monster/cd71e.bmd", "start": 27356332, "end": 27383300}, {"filename": "/Data/Monster/cd71f.bmd", "start": 27383300, "end": 27488765}, {"filename": "/Data/Monster/cd71g.bmd", "start": 27488765, "end": 27525267}, {"filename": "/Data/Monster/cd71h.bmd", "start": 27525267, "end": 27558965}, {"filename": "/Data/Monster/chain.OZT", "start": 27558965, "end": 27560037}, {"filename": "/Data/Monster/chest.OZJ", "start": 27560037, "end": 27587785}, {"filename": "/Data/Monster/chest_R.OZJ", "start": 27587785, "end": 27603458}, {"filename": "/Data/Monster/cloak.OZT", "start": 27603458, "end": 27734578}, {"filename": "/Data/Monster/cloak_R.OZJ", "start": 27734578, "end": 27746994}, {"filename": "/Data/Monster/cr_balgass.OZT", "start": 27746994, "end": 27878114}, {"filename": "/Data/Monster/cr_balgass02.OZT", "start": 27878114, "end": 28009234}, {"filename": "/Data/Monster/cr_werewolf01.OZJ", "start": 28009234, "end": 28120478}, {"filename": "/Data/Monster/cr_werewolf02.OZJ", "start": 28120478, "end": 28230007}, {"filename": "/Data/Monster/cundun1.OZJ", "start": 28230007, "end": 28296832}, {"filename": "/Data/Monster/cundun2.OZJ", "start": 28296832, "end": 28309324}, {"filename": "/Data/Monster/cundun3.OZJ", "start": 28309324, "end": 28347997}, {"filename": "/Data/Monster/cundun4.OZJ", "start": 28347997, "end": 28362136}, {"filename": "/Data/Monster/cundun4.OZT", "start": 28362136, "end": 28362696}, {"filename": "/Data/Monster/cundun5.OZJ", "start": 28362696, "end": 28382969}, {"filename": "/Data/Monster/cundunHead.OZJ", "start": 28382969, "end": 28411450}, {"filename": "/Data/Monster/cundun_gone.bmd", "start": 28411450, "end": 28615190}, {"filename": "/Data/Monster/cundunend.OZJ", "start": 28615190, "end": 28619864}, {"filename": "/Data/Monster/cundunend.OZT", "start": 28619864, "end": 28624008}, {"filename": "/Data/Monster/cundunskin.OZJ", "start": 28624008, "end": 28630230}, {"filename": "/Data/Monster/defencenpc_1_head.OZJ", "start": 28630230, "end": 28650774}, {"filename": "/Data/Monster/defencenpc_1_should.OZJ", "start": 28650774, "end": 28655105}, {"filename": "/Data/Monster/defencenpc_2_food.OZJ", "start": 28655105, "end": 28673526}, {"filename": "/Data/Monster/defencenpc_2_head.OZJ", "start": 28673526, "end": 28691824}, {"filename": "/Data/Monster/defencenpc_2_should.OZJ", "start": 28691824, "end": 28712595}, {"filename": "/Data/Monster/defencenpc_body.OZJ", "start": 28712595, "end": 28816710}, {"filename": "/Data/Monster/defencenpc_weapon.OZJ", "start": 28816710, "end": 28829065}, {"filename": "/Data/Monster/devil.OZJ", "start": 28829065, "end": 28883930}, {"filename": "/Data/Monster/devilhair.OZT", "start": 28883930, "end": 28888074}, {"filename": "/Data/Monster/devilwing.OZJ", "start": 28888074, "end": 28913047}, {"filename": "/Data/Monster/doorc01.OZJ", "start": 28913047, "end": 28955662}, {"filename": "/Data/Monster/drr_01.OZJ", "start": 28955662, "end": 29044737}, {"filename": "/Data/Monster/drr_02.OZJ", "start": 29044737, "end": 29116618}, {"filename": "/Data/Monster/drr_03.OZJ", "start": 29116618, "end": 29193804}, {"filename": "/Data/Monster/drt00.OZJ", "start": 29193804, "end": 29203780}, {"filename": "/Data/Monster/drt01.OZJ", "start": 29203780, "end": 29268451}, {"filename": "/Data/Monster/drt02.OZJ", "start": 29268451, "end": 29315110}, {"filename": "/Data/Monster/drt02.OZT", "start": 29315110, "end": 29331542}, {"filename": "/Data/Monster/drt03.OZJ", "start": 29331542, "end": 29338287}, {"filename": "/Data/Monster/drt03.OZT", "start": 29338287, "end": 29354719}, {"filename": "/Data/Monster/drt05.OZJ", "start": 29354719, "end": 29360148}, {"filename": "/Data/Monster/eagle.OZT", "start": 29360148, "end": 29368388}, {"filename": "/Data/Monster/eagle01.OZJ", "start": 29368388, "end": 29376920}, {"filename": "/Data/Monster/epiboss_armor.OZJ", "start": 29376920, "end": 29459357}, {"filename": "/Data/Monster/epibossskin.OZJ", "start": 29459357, "end": 29534013}, {"filename": "/Data/Monster/epibosswing.OZJ", "start": 29534013, "end": 29555489}, {"filename": "/Data/Monster/fireeffect.OZJ", "start": 29555489, "end": 29616262}, {"filename": "/Data/Monster/fmammor.OZJ", "start": 29616262, "end": 29722177}, {"filename": "/Data/Monster/fmbody_r.OZJ", "start": 29722177, "end": 29761672}, {"filename": "/Data/Monster/forestgost.OZJ", "start": 29761672, "end": 29899928}, {"filename": "/Data/Monster/forestgost_should.OZJ", "start": 29899928, "end": 29938544}, {"filename": "/Data/Monster/fr00.OZJ", "start": 29938544, "end": 30004765}, {"filename": "/Data/Monster/fs00.OZJ", "start": 30004765, "end": 30055577}, {"filename": "/Data/Monster/fs01.OZT", "start": 30055577, "end": 30121161}, {"filename": "/Data/Monster/fs02.OZJ", "start": 30121161, "end": 30125954}, {"filename": "/Data/Monster/garp.OZJ", "start": 30125954, "end": 30136533}, {"filename": "/Data/Monster/gate.OZJ", "start": 30136533, "end": 30178636}, {"filename": "/Data/Monster/gh1.OZJ", "start": 30178636, "end": 30243223}, {"filename": "/Data/Monster/gh2.OZJ", "start": 30243223, "end": 30313130}, {"filename": "/Data/Monster/gh3.OZJ", "start": 30313130, "end": 30318259}, {"filename": "/Data/Monster/gloves2.OZJ", "start": 30318259, "end": 30338465}, {"filename": "/Data/Monster/gp01.OZJ", "start": 30338465, "end": 30394022}, {"filename": "/Data/Monster/gp02.OZT", "start": 30394022, "end": 30410454}, {"filename": "/Data/Monster/h_r.OZT", "start": 30410454, "end": 30443270}, {"filename": "/Data/Monster/head.OZJ", "start": 30443270, "end": 30452849}, {"filename": "/Data/Monster/helmat_01.OZJ", "start": 30452849, "end": 30458636}, {"filename": "/Data/Monster/helmat_02.OZJ", "start": 30458636, "end": 30463828}, {"filename": "/Data/Monster/helmet2.OZJ", "start": 30463828, "end": 30473881}, {"filename": "/Data/Monster/ho9_11.OZJ", "start": 30473881, "end": 30580933}, {"filename": "/Data/Monster/ho9_2.OZJ", "start": 30580933, "end": 30592256}, {"filename": "/Data/Monster/hop01.OZJ", "start": 30592256, "end": 30665063}, {"filename": "/Data/Monster/hound_head01.OZJ", "start": 30665063, "end": 30676770}, {"filename": "/Data/Monster/hound_head02.OZJ", "start": 30676770, "end": 30688447}, {"filename": "/Data/Monster/hound_lower.OZJ", "start": 30688447, "end": 30720023}, {"filename": "/Data/Monster/hp00.OZJ", "start": 30720023, "end": 30756116}, {"filename": "/Data/Monster/hp01.OZT", "start": 30756116, "end": 30821700}, {"filename": "/Data/Monster/ice_m.OZJ", "start": 30821700, "end": 30843099}, {"filename": "/Data/Monster/it.OZJ", "start": 30843099, "end": 30871970}, {"filename": "/Data/Monster/iui01.OZT", "start": 30871970, "end": 31134162}, {"filename": "/Data/Monster/iui02.OZJ", "start": 31134162, "end": 31145988}, {"filename": "/Data/Monster/iui02.OZT", "start": 31145988, "end": 31154228}, {"filename": "/Data/Monster/iui03.OZJ", "start": 31154228, "end": 31178648}, {"filename": "/Data/Monster/iui03.OZT", "start": 31178648, "end": 31186888}, {"filename": "/Data/Monster/iui06.OZJ", "start": 31186888, "end": 31189495}, {"filename": "/Data/Monster/king01.OZJ", "start": 31189495, "end": 31209603}, {"filename": "/Data/Monster/king08.OZT", "start": 31209603, "end": 31211699}, {"filename": "/Data/Monster/king09.OZJ", "start": 31211699, "end": 31271701}, {"filename": "/Data/Monster/kni00.OZJ", "start": 31271701, "end": 31314161}, {"filename": "/Data/Monster/kni01.OZJ", "start": 31314161, "end": 31338195}, {"filename": "/Data/Monster/kni02.OZJ", "start": 31338195, "end": 31348264}, {"filename": "/Data/Monster/kuo00.OZJ", "start": 31348264, "end": 31408875}, {"filename": "/Data/Monster/kuo01.OZJ", "start": 31408875, "end": 31422315}, {"filename": "/Data/Monster/kuo02.OZJ", "start": 31422315, "end": 31450050}, {"filename": "/Data/Monster/leaves.OZT", "start": 31450050, "end": 31466482}, {"filename": "/Data/Monster/legs.OZJ", "start": 31466482, "end": 31490433}, {"filename": "/Data/Monster/legs_R.OZJ", "start": 31490433, "end": 31507058}, {"filename": "/Data/Monster/lobfur.OZT", "start": 31507058, "end": 31511202}, {"filename": "/Data/Monster/lobster.OZJ", "start": 31511202, "end": 31561676}, {"filename": "/Data/Monster/lpo01.OZT", "start": 31561676, "end": 31823868}, {"filename": "/Data/Monster/m1.OZT", "start": 31823868, "end": 31954988}, {"filename": "/Data/Monster/ma001.OZT", "start": 31954988, "end": 31963228}, {"filename": "/Data/Monster/ma002.OZJ", "start": 31963228, "end": 31964025}, {"filename": "/Data/Monster/ma1.OZJ", "start": 31964025, "end": 31978622}, {"filename": "/Data/Monster/ma2.OZJ", "start": 31978622, "end": 31979294}, {"filename": "/Data/Monster/ma_1.OZJ", "start": 31979294, "end": 32019195}, {"filename": "/Data/Monster/magic_BB.OZT", "start": 32019195, "end": 32035627}, {"filename": "/Data/Monster/magic_H.OZT", "start": 32035627, "end": 32039771}, {"filename": "/Data/Monster/manto.OZT", "start": 32039771, "end": 32170891}, {"filename": "/Data/Monster/mon2_01.OZJ", "start": 32170891, "end": 32254230}, {"filename": "/Data/Monster/mon2_02.OZJ", "start": 32254230, "end": 32298689}, {"filename": "/Data/Monster/mon3_03.OZJ", "start": 32298689, "end": 32333634}, {"filename": "/Data/Monster/mon_01.OZJ", "start": 32333634, "end": 32363264}, {"filename": "/Data/Monster/mon_05.OZJ", "start": 32363264, "end": 32374459}, {"filename": "/Data/Monster/mono3.OZJ", "start": 32374459, "end": 32471542}, {"filename": "/Data/Monster/mono3eye.OZJ", "start": 32471542, "end": 32482041}, {"filename": "/Data/Monster/monster(1).bmd", "start": 32482041, "end": 32723131}, {"filename": "/Data/Monster/monster.bmd", "start": 32723131, "end": 32894818}, {"filename": "/Data/Monster/monster101.bmd", "start": 32894818, "end": 33197065}, {"filename": "/Data/Monster/monster102.bmd", "start": 33197065, "end": 33373737}, {"filename": "/Data/Monster/monster103.bmd", "start": 33373737, "end": 33607883}, {"filename": "/Data/Monster/monster104.bmd", "start": 33607883, "end": 33810809}, {"filename": "/Data/Monster/monster105.bmd", "start": 33810809, "end": 33986610}, {"filename": "/Data/Monster/monster106.bmd", "start": 33986610, "end": 34353934}, {"filename": "/Data/Monster/monster65.bmd", "start": 34353934, "end": 34868610}, {"filename": "/Data/Monster/monster68.bmd", "start": 34868610, "end": 35045103}, {"filename": "/Data/Monster/monster69.bmd", "start": 35045103, "end": 35212066}, {"filename": "/Data/Monster/monster75.bmd", "start": 35212066, "end": 35292423}, {"filename": "/Data/Monster/monster77.bmd", "start": 35292423, "end": 35441160}, {"filename": "/Data/Monster/monster78.bmd", "start": 35441160, "end": 35593908}, {"filename": "/Data/Monster/monster79.bmd", "start": 35593908, "end": 35601500}, {"filename": "/Data/Monster/monster80.bmd", "start": 35601500, "end": 35675438}, {"filename": "/Data/Monster/monster81.OZJ", "start": 35675438, "end": 35689860}, {"filename": "/Data/Monster/monster81_r.OZJ", "start": 35689860, "end": 35702298}, {"filename": "/Data/Monster/monster81_r2.OZJ", "start": 35702298, "end": 35714368}, {"filename": "/Data/Monster/monster82.bmd", "start": 35714368, "end": 35889007}, {"filename": "/Data/Monster/monster83.bmd", "start": 35889007, "end": 36094148}, {"filename": "/Data/Monster/monster84.bmd", "start": 36094148, "end": 36290776}, {"filename": "/Data/Monster/monster85.bmd", "start": 36290776, "end": 36523703}, {"filename": "/Data/Monster/monster86.bmd", "start": 36523703, "end": 36680560}, {"filename": "/Data/Monster/monster87.bmd", "start": 36680560, "end": 36701777}, {"filename": "/Data/Monster/monster88.bmd", "start": 36701777, "end": 37084628}, {"filename": "/Data/Monster/monster90.bmd", "start": 37084628, "end": 37304684}, {"filename": "/Data/Monster/monster91.bmd", "start": 37304684, "end": 37537966}, {"filename": "/Data/Monster/monster92.bmd", "start": 37537966, "end": 37803688}, {"filename": "/Data/Monster/monster93.bmd", "start": 37803688, "end": 37997229}, {"filename": "/Data/Monster/monster94.bmd", "start": 37997229, "end": 38197338}, {"filename": "/Data/Monster/monster95.bmd", "start": 38197338, "end": 38385352}, {"filename": "/Data/Monster/monster96.bmd", "start": 38385352, "end": 38633148}, {"filename": "/Data/Monster/monster97.bmd", "start": 38633148, "end": 38843024}, {"filename": "/Data/Monster/monster98.bmd", "start": 38843024, "end": 39035218}, {"filename": "/Data/Monster/monster99.bmd", "start": 39035218, "end": 39267828}, {"filename": "/Data/Monster/monster_wolf_weapon.OZJ", "start": 39267828, "end": 39307128}, {"filename": "/Data/Monster/monster_worlf.OZJ", "start": 39307128, "end": 39395699}, {"filename": "/Data/Monster/monx01.OZJ", "start": 39395699, "end": 39497192}, {"filename": "/Data/Monster/monx02.OZT", "start": 39497192, "end": 39562776}, {"filename": "/Data/Monster/mop01.OZJ", "start": 39562776, "end": 39602687}, {"filename": "/Data/Monster/mop02.OZJ", "start": 39602687, "end": 39685829}, {"filename": "/Data/Monster/mop03.OZJ", "start": 39685829, "end": 39695649}, {"filename": "/Data/Monster/mop03.OZT", "start": 39695649, "end": 39728465}, {"filename": "/Data/Monster/mopmop.OZJ", "start": 39728465, "end": 39755088}, {"filename": "/Data/Monster/mopmop.OZT", "start": 39755088, "end": 39787904}, {"filename": "/Data/Monster/mopmop02.OZJ", "start": 39787904, "end": 39812707}, {"filename": "/Data/Monster/mopmop03.OZJ", "start": 39812707, "end": 39826353}, {"filename": "/Data/Monster/npc_a_01.OZJ", "start": 39826353, "end": 39837102}, {"filename": "/Data/Monster/npc_a_02.OZJ", "start": 39837102, "end": 39847496}, {"filename": "/Data/Monster/npc_a_03.OZJ", "start": 39847496, "end": 39853443}, {"filename": "/Data/Monster/npc_a_04.OZJ", "start": 39853443, "end": 39861331}, {"filename": "/Data/Monster/npc_a_05.OZJ", "start": 39861331, "end": 39868767}, {"filename": "/Data/Monster/npc_a_06.OZJ", "start": 39868767, "end": 39874118}, {"filename": "/Data/Monster/npc_a_07.OZJ", "start": 39874118, "end": 39880534}, {"filename": "/Data/Monster/npc_a_08_01.OZJ", "start": 39880534, "end": 39890692}, {"filename": "/Data/Monster/npc_a_08_02.OZJ", "start": 39890692, "end": 39900838}, {"filename": "/Data/Monster/npc_a_09_01.OZJ", "start": 39900838, "end": 39911127}, {"filename": "/Data/Monster/npc_a_09_02.OZJ", "start": 39911127, "end": 39921441}, {"filename": "/Data/Monster/npc_a_clothes.OZT", "start": 39921441, "end": 39925585}, {"filename": "/Data/Monster/npc_b1.OZJ", "start": 39925585, "end": 39951870}, {"filename": "/Data/Monster/npc_g.OZJ", "start": 39951870, "end": 39979049}, {"filename": "/Data/Monster/ob2.OZJ", "start": 39979049, "end": 40003649}, {"filename": "/Data/Monster/ogre.OZJ", "start": 40003649, "end": 40032032}, {"filename": "/Data/Monster/p_d.OZJ", "start": 40032032, "end": 40059078}, {"filename": "/Data/Monster/p_d.OZT", "start": 40059078, "end": 40075510}, {"filename": "/Data/Monster/poisongolem.OZT", "start": 40075510, "end": 40337702}, {"filename": "/Data/Monster/poisongolem01.OZJ", "start": 40337702, "end": 40349536}, {"filename": "/Data/Monster/prizm.OZJ", "start": 40349536, "end": 40363944}, {"filename": "/Data/Monster/pt.OZJ", "start": 40363944, "end": 40407678}, {"filename": "/Data/Monster/pt2.OZJ", "start": 40407678, "end": 40450907}, {"filename": "/Data/Monster/pt3.OZJ", "start": 40450907, "end": 40482876}, {"filename": "/Data/Monster/remonelf.OZJ", "start": 40482876, "end": 40590805}, {"filename": "/Data/Monster/rt03.OZJ", "start": 40590805, "end": 40670336}, {"filename": "/Data/Monster/sander.OZJ", "start": 40670336, "end": 40718008}, {"filename": "/Data/Monster/sander.OZT", "start": 40718008, "end": 40722152}, {"filename": "/Data/Monster/sander2.OZJ", "start": 40722152, "end": 40737754}, {"filename": "/Data/Monster/satan_a.OZT", "start": 40737754, "end": 40999946}, {"filename": "/Data/Monster/seta.OZJ", "start": 40999946, "end": 41100389}, {"filename": "/Data/Monster/setb.OZT", "start": 41100389, "end": 41165973}, {"filename": "/Data/Monster/shadow_a.OZJ", "start": 41165973, "end": 41173480}, {"filename": "/Data/Monster/shadow_b.OZJ", "start": 41173480, "end": 41178762}, {"filename": "/Data/Monster/shadow_c.OZJ", "start": 41178762, "end": 41188013}, {"filename": "/Data/Monster/skR.OZJ", "start": 41188013, "end": 41228652}, {"filename": "/Data/Monster/smoke04.OZJ", "start": 41228652, "end": 41240019}, {"filename": "/Data/Monster/snake.OZJ", "start": 41240019, "end": 41247488}, {"filename": "/Data/Monster/snake02.OZT", "start": 41247488, "end": 41251632}, {"filename": "/Data/Monster/snow_queen01.OZJ", "start": 41251632, "end": 41272665}, {"filename": "/Data/Monster/snow_queen02.OZJ", "start": 41272665, "end": 41280336}, {"filename": "/Data/Monster/snow_queen03.OZJ", "start": 41280336, "end": 41286263}, {"filename": "/Data/Monster/snowking.OZJ", "start": 41286263, "end": 41307524}, {"filename": "/Data/Monster/snowman.OZJ", "start": 41307524, "end": 41332789}, {"filename": "/Data/Monster/snowman02.OZJ", "start": 41332789, "end": 41359332}, {"filename": "/Data/Monster/soram01.OZJ", "start": 41359332, "end": 41474543}, {"filename": "/Data/Monster/soram02.OZJ", "start": 41474543, "end": 41515251}, {"filename": "/Data/Monster/spider01.OZT", "start": 41515251, "end": 41523491}, {"filename": "/Data/Monster/spider02.OZJ", "start": 41523491, "end": 41533087}, {"filename": "/Data/Monster/st091.OZJ", "start": 41533087, "end": 41572889}, {"filename": "/Data/Monster/starp00.OZJ", "start": 41572889, "end": 41634727}, {"filename": "/Data/Monster/stmop01.OZJ", "start": 41634727, "end": 41711893}, {"filename": "/Data/Monster/stmop02.OZJ", "start": 41711893, "end": 41733258}, {"filename": "/Data/Monster/stmop03.OZJ", "start": 41733258, "end": 41748882}, {"filename": "/Data/Monster/ston1.OZJ", "start": 41748882, "end": 41761426}, {"filename": "/Data/Monster/stonegolem.OZJ", "start": 41761426, "end": 41892354}, {"filename": "/Data/Monster/sword05.OZJ", "start": 41892354, "end": 41898702}, {"filename": "/Data/Monster/tgh03.OZT", "start": 41898702, "end": 41906942}, {"filename": "/Data/Monster/towergate_r.OZJ", "start": 41906942, "end": 41909584}, {"filename": "/Data/Monster/treemonster01.OZT", "start": 41909584, "end": 41975168}, {"filename": "/Data/Monster/treemonster02.OZJ", "start": 41975168, "end": 42096704}, {"filename": "/Data/Monster/uo00.OZJ", "start": 42096704, "end": 42111839}, {"filename": "/Data/Monster/uo01.OZT", "start": 42111839, "end": 42120079}, {"filename": "/Data/Monster/w.OZJ", "start": 42120079, "end": 42179332}, {"filename": "/Data/Monster/w_merchant_a.OZJ", "start": 42179332, "end": 42213660}, {"filename": "/Data/Monster/wa1.OZJ", "start": 42213660, "end": 42249755}, {"filename": "/Data/Monster/wa2.OZJ", "start": 42249755, "end": 42290162}, {"filename": "/Data/Monster/wa3.OZJ", "start": 42290162, "end": 42335014}, {"filename": "/Data/Monster/weapon64.bmd", "start": 42335014, "end": 42366564}, {"filename": "/Data/Monster/wheel.OZJ", "start": 42366564, "end": 42436144}, {"filename": "/Data/Monster/wizard_gloves_02.OZJ", "start": 42436144, "end": 42444550}, {"filename": "/Data/Monster/wizard_head_02.OZJ", "start": 42444550, "end": 42456840}, {"filename": "/Data/Monster/wizard_lower_02.OZJ", "start": 42456840, "end": 42468677}, {"filename": "/Data/Monster/wizard_upper_02.OZJ", "start": 42468677, "end": 42477885}, {"filename": "/Data/Monster/wolf01.OZJ", "start": 42477885, "end": 42521109}, {"filename": "/Data/Monster/wolf03.OZT", "start": 42521109, "end": 42586693}, {"filename": "/Data/Monster/wolfa01.OZJ", "start": 42586693, "end": 42626595}, {"filename": "/Data/Monster/wolfa02.OZJ", "start": 42626595, "end": 42665912}, {"filename": "/Data/Monster/wolfa02.OZT", "start": 42665912, "end": 42715112}, {"filename": "/Data/Monster/wolfbody.OZJ", "start": 42715112, "end": 42755994}, {"filename": "/Data/Monster/wwo.OZJ", "start": 42755994, "end": 42784901}, {"filename": "/Data/Music/Atlans.mp3", "start": 42784901, "end": 47311297, "audio": 1}, {"filename": "/Data/Music/Cathedral.mp3", "start": 47311297, "end": 52330697, "audio": 1}, {"filename": "/Data/Music/Devias.mp3", "start": 52330697, "end": 58620275, "audio": 1}, {"filename": "/Data/Music/DuelArena.mp3", "start": 58620275, "end": 59506247, "audio": 1}, {"filename": "/Data/Music/Dungeon.mp3", "start": 59506247, "end": 65336279, "audio": 1}, {"filename": "/Data/Music/Icarus.mp3", "start": 65336279, "end": 68629278, "audio": 1}, {"filename": "/Data/Music/Lorencia.mp3", "start": 68629278, "end": 73657455, "audio": 1}, {"filename": "/Data/Music/MuTheme.mp3", "start": 73657455, "end": 78685632, "audio": 1}, {"filename": "/Data/Music/Noria.mp3", "start": 78685632, "end": 83222032, "audio": 1}, {"filename": "/Data/Music/PK_Field.mp3", "start": 83222032, "end": 84054505, "audio": 1}, {"filename": "/Data/Music/Pub.mp3", "start": 84054505, "end": 87347059, "audio": 1}, {"filename": "/Data/Music/devil_square_intro.mp3", "start": 87347059, "end": 88277334, "audio": 1}, {"filename": "/Data/Music/devil_square_outro.mp3", "start": 88277334, "end": 90125030, "audio": 1}, {"filename": "/Data/Music/login_theme.mp3", "start": 90125030, "end": 92944662, "audio": 1}, {"filename": "/Data/Music/lost_tower_a.mp3", "start": 92944662, "end": 96979538, "audio": 1}, {"filename": "/Data/Music/lost_tower_b.mp3", "start": 96979538, "end": 100067319, "audio": 1}, {"filename": "/Data/Music/main_theme.mp3", "start": 100067319, "end": 102217617, "audio": 1}, {"filename": "/Data/Music/tarkan.mp3", "start": 102217617, "end": 105266945, "audio": 1}, {"filename": "/Data/NPC/BloodCastle01.bmd", "start": 105266945, "end": 105352451}, {"filename": "/Data/NPC/BloodCastle02.bmd", "start": 105352451, "end": 105441186}, {"filename": "/Data/NPC/Breeder.bmd", "start": 105441186, "end": 105568402}, {"filename": "/Data/NPC/DeviasTrader01.bmd", "start": 105568402, "end": 105663658}, {"filename": "/Data/NPC/DevilNpc01.bmd", "start": 105663658, "end": 105712950}, {"filename": "/Data/NPC/Elf01.bmd", "start": 105712950, "end": 105780382}, {"filename": "/Data/NPC/ElfMerchant01.bmd", "start": 105780382, "end": 105847814}, {"filename": "/Data/NPC/ElfWizard01.bmd", "start": 105847814, "end": 105942009}, {"filename": "/Data/NPC/Female01.bmd", "start": 105942009, "end": 105984827}, {"filename": "/Data/NPC/FemaleBoots01.bmd", "start": 105984827, "end": 105999051}, {"filename": "/Data/NPC/FemaleBoots02.bmd", "start": 105999051, "end": 106011843}, {"filename": "/Data/NPC/FemaleHead01.bmd", "start": 106011843, "end": 106023475}, {"filename": "/Data/NPC/FemaleHead02.bmd", "start": 106023475, "end": 106035107}, {"filename": "/Data/NPC/FemaleLower01.bmd", "start": 106035107, "end": 106045801}, {"filename": "/Data/NPC/FemaleLower02.bmd", "start": 106045801, "end": 106059015}, {"filename": "/Data/NPC/FemaleUpper01.bmd", "start": 106059015, "end": 106084253}, {"filename": "/Data/NPC/FemaleUpper02.bmd", "start": 106084253, "end": 106107937}, {"filename": "/Data/NPC/Girl01.bmd", "start": 106107937, "end": 106141366}, {"filename": "/Data/NPC/GirlHead01.bmd", "start": 106141366, "end": 106151476}, {"filename": "/Data/NPC/GirlHead02.bmd", "start": 106151476, "end": 106161586}, {"filename": "/Data/NPC/GirlLower01.bmd", "start": 106161586, "end": 106179356}, {"filename": "/Data/NPC/GirlLower02.bmd", "start": 106179356, "end": 106187638}, {"filename": "/Data/NPC/GirlUpper01.bmd", "start": 106187638, "end": 106210590}, {"filename": "/Data/NPC/GirlUpper02.bmd", "start": 106210590, "end": 106232228}, {"filename": "/Data/NPC/Man01.bmd", "start": 106232228, "end": 106252763}, {"filename": "/Data/NPC/ManBoots01.bmd", "start": 106252763, "end": 106264621}, {"filename": "/Data/NPC/ManBoots02.bmd", "start": 106264621, "end": 106277007}, {"filename": "/Data/NPC/ManGloves01.bmd", "start": 106277007, "end": 106291012}, {"filename": "/Data/NPC/ManGloves02.bmd", "start": 106291012, "end": 106304969}, {"filename": "/Data/NPC/ManHead01.bmd", "start": 106304969, "end": 106315427}, {"filename": "/Data/NPC/ManHead02.bmd", "start": 106315427, "end": 106326089}, {"filename": "/Data/NPC/ManUpper01.bmd", "start": 106326089, "end": 106350931}, {"filename": "/Data/NPC/ManUpper02.bmd", "start": 106350931, "end": 106378325}, {"filename": "/Data/NPC/Master01.bmd", "start": 106378325, "end": 106479628}, {"filename": "/Data/NPC/MixNpc01.bmd", "start": 106479628, "end": 106544765}, {"filename": "/Data/NPC/Sevina01.bmd", "start": 106544765, "end": 106627473}, {"filename": "/Data/NPC/Smith01.bmd", "start": 106627473, "end": 106742925}, {"filename": "/Data/NPC/SnowMerchant01.bmd", "start": 106742925, "end": 106835941}, {"filename": "/Data/NPC/SnowSmith01.bmd", "start": 106835941, "end": 106936566}, {"filename": "/Data/NPC/SnowWizard01.bmd", "start": 106936566, "end": 107015473}, {"filename": "/Data/NPC/Storage01.bmd", "start": 107015473, "end": 107183908}, {"filename": "/Data/NPC/Tournament01.bmd", "start": 107183908, "end": 107301054}, {"filename": "/Data/NPC/Wizard01.bmd", "start": 107301054, "end": 107401570}, {"filename": "/Data/NPC/agic_shop01.OZT", "start": 107401570, "end": 107409810}, {"filename": "/Data/NPC/birdnpc.OZJ", "start": 107409810, "end": 107450038}, {"filename": "/Data/NPC/blackhole.OZJ", "start": 107450038, "end": 107469320}, {"filename": "/Data/NPC/bnpc01.OZT", "start": 107469320, "end": 107502136}, {"filename": "/Data/NPC/bnpc02.OZT", "start": 107502136, "end": 107506280}, {"filename": "/Data/NPC/boots_07.OZJ", "start": 107506280, "end": 107515771}, {"filename": "/Data/NPC/boots_12.OZJ", "start": 107515771, "end": 107526349}, {"filename": "/Data/NPC/caterf.OZJ", "start": 107526349, "end": 107598650}, {"filename": "/Data/NPC/caterf2.OZJ", "start": 107598650, "end": 107677078}, {"filename": "/Data/NPC/crown.OZJ", "start": 107677078, "end": 107685341}, {"filename": "/Data/NPC/dksbody.OZT", "start": 107685341, "end": 107750925}, {"filename": "/Data/NPC/dkshelmet.OZJ", "start": 107750925, "end": 107761226}, {"filename": "/Data/NPC/dkswing.OZJ", "start": 107761226, "end": 107773370}, {"filename": "/Data/NPC/elder.OZJ", "start": 107773370, "end": 107869032}, {"filename": "/Data/NPC/fire_02.OZJ", "start": 107869032, "end": 107874871}, {"filename": "/Data/NPC/fire_03.OZJ", "start": 107874871, "end": 107882391}, {"filename": "/Data/NPC/foot.OZJ", "start": 107882391, "end": 107892206}, {"filename": "/Data/NPC/gggi01.OZJ", "start": 107892206, "end": 107908847}, {"filename": "/Data/NPC/gggi02.OZJ", "start": 107908847, "end": 107952411}, {"filename": "/Data/NPC/girl_a.OZJ", "start": 107952411, "end": 107975789}, {"filename": "/Data/NPC/girl_b.OZJ", "start": 107975789, "end": 108005306}, {"filename": "/Data/NPC/gloves_07.OZJ", "start": 108005306, "end": 108015457}, {"filename": "/Data/NPC/gloves_12.OZJ", "start": 108015457, "end": 108026977}, {"filename": "/Data/NPC/guard_gold2.OZJ", "start": 108026977, "end": 108093513}, {"filename": "/Data/NPC/guard_hair.OZT", "start": 108093513, "end": 108097657}, {"filename": "/Data/NPC/head_02.OZJ", "start": 108097657, "end": 108109941}, {"filename": "/Data/NPC/head_07.OZJ", "start": 108109941, "end": 108118892}, {"filename": "/Data/NPC/head_12.OZJ", "start": 108118892, "end": 108128666}, {"filename": "/Data/NPC/hide.OZJ", "start": 108128666, "end": 108133206}, {"filename": "/Data/NPC/hound_sword1.OZJ", "start": 108133206, "end": 108142694}, {"filename": "/Data/NPC/hpp.OZJ", "start": 108142694, "end": 108183181}, {"filename": "/Data/NPC/hugerock02.OZJ", "start": 108183181, "end": 108212575}, {"filename": "/Data/NPC/ju01_R.OZJ", "start": 108212575, "end": 108226984}, {"filename": "/Data/NPC/knifestone.OZJ", "start": 108226984, "end": 108246196}, {"filename": "/Data/NPC/lnn01.OZT", "start": 108246196, "end": 108279012}, {"filename": "/Data/NPC/lower_12.OZJ", "start": 108279012, "end": 108307425}, {"filename": "/Data/NPC/lplower.OZJ", "start": 108307425, "end": 108322287}, {"filename": "/Data/NPC/lptgq.OZT", "start": 108322287, "end": 108355103}, {"filename": "/Data/NPC/lpwing.OZJ", "start": 108355103, "end": 108365649}, {"filename": "/Data/NPC/magic_shop012.OZT", "start": 108365649, "end": 108373889}, {"filename": "/Data/NPC/magic_shop01a.OZJ", "start": 108373889, "end": 108398873}, {"filename": "/Data/NPC/magic_shop01b.OZJ", "start": 108398873, "end": 108424030}, {"filename": "/Data/NPC/magic_shop02.OZT", "start": 108424030, "end": 108428174}, {"filename": "/Data/NPC/magic_shop022.OZT", "start": 108428174, "end": 108432318}, {"filename": "/Data/NPC/man.OZJ", "start": 108432318, "end": 108473875}, {"filename": "/Data/NPC/merchant_moster_b01.OZJ", "start": 108473875, "end": 108514359}, {"filename": "/Data/NPC/model_npc_catapult_att.bmd", "start": 108514359, "end": 108773080}, {"filename": "/Data/NPC/model_npc_catapult_def.bmd", "start": 108773080, "end": 109035612}, {"filename": "/Data/NPC/mon_01.OZJ", "start": 109035612, "end": 109097680}, {"filename": "/Data/NPC/mon_011.OZJ", "start": 109097680, "end": 109155686}, {"filename": "/Data/NPC/mon_02.OZJ", "start": 109155686, "end": 109170406}, {"filename": "/Data/NPC/mon_022.OZJ", "start": 109170406, "end": 109184663}, {"filename": "/Data/NPC/ng01.OZJ", "start": 109184663, "end": 109265315}, {"filename": "/Data/NPC/npc.OZJ", "start": 109265315, "end": 109310199}, {"filename": "/Data/NPC/npc_mulyak.bmd", "start": 109310199, "end": 109374173}, {"filename": "/Data/NPC/npc_mulyak01.OZJ", "start": 109374173, "end": 109478459}, {"filename": "/Data/NPC/npcbarrier.bmd", "start": 109478459, "end": 109481909}, {"filename": "/Data/NPC/npccheckfloor.OZJ", "start": 109481909, "end": 109507324}, {"filename": "/Data/NPC/npccheckfloor.bmd", "start": 109507324, "end": 109539796}, {"filename": "/Data/NPC/npccheckfloor_r.OZJ", "start": 109539796, "end": 109547972}, {"filename": "/Data/NPC/npcclerk.bmd", "start": 109547972, "end": 109672999}, {"filename": "/Data/NPC/npccrown.bmd", "start": 109672999, "end": 109693525}, {"filename": "/Data/NPC/npcgateswitch.OZJ", "start": 109693525, "end": 109717762}, {"filename": "/Data/NPC/npcgateswitch.bmd", "start": 109717762, "end": 109733208}, {"filename": "/Data/NPC/npcsenatus.bmd", "start": 109733208, "end": 109864061}, {"filename": "/Data/NPC/ob.OZJ", "start": 109864061, "end": 109888724}, {"filename": "/Data/NPC/ob3.OZJ", "start": 109888724, "end": 109916836}, {"filename": "/Data/NPC/obj_donkey.bmd", "start": 109916836, "end": 110004264}, {"filename": "/Data/NPC/obj_flag.bmd", "start": 110004264, "end": 110009018}, {"filename": "/Data/NPC/receiptnpc_1.OZJ", "start": 110009018, "end": 110112988}, {"filename": "/Data/NPC/receiptnpc_2.OZT", "start": 110112988, "end": 110145804}, {"filename": "/Data/NPC/science.OZJ", "start": 110145804, "end": 110171690}, {"filename": "/Data/NPC/science02.OZT", "start": 110171690, "end": 110175834}, {"filename": "/Data/NPC/sebina.OZJ", "start": 110175834, "end": 110204846}, {"filename": "/Data/NPC/skin_barbarian_01.OZJ", "start": 110204846, "end": 110263136}, {"filename": "/Data/NPC/skin_special_01.OZJ", "start": 110263136, "end": 110337315}, {"filename": "/Data/NPC/smith.OZJ", "start": 110337315, "end": 110363262}, {"filename": "/Data/NPC/snow_girl.OZJ", "start": 110363262, "end": 110396855}, {"filename": "/Data/NPC/snow_girl02.OZT", "start": 110396855, "end": 110400999}, {"filename": "/Data/NPC/snows.OZJ", "start": 110400999, "end": 110426454}, {"filename": "/Data/NPC/tile_02.OZJ", "start": 110426454, "end": 110436826}, {"filename": "/Data/NPC/tile_03.OZJ", "start": 110436826, "end": 110446574}, {"filename": "/Data/NPC/towergate_r2.OZJ", "start": 110446574, "end": 110454837}, {"filename": "/Data/NPC/treasure_chest.OZJ", "start": 110454837, "end": 110484594}, {"filename": "/Data/NPC/twlight.OZJ", "start": 110484594, "end": 110527874}, {"filename": "/Data/NPC/twlight2.OZJ", "start": 110527874, "end": 110581502}, {"filename": "/Data/NPC/upper_02_m.OZJ", "start": 110581502, "end": 110603909}, {"filename": "/Data/NPC/upper_02b_m.OZT", "start": 110603909, "end": 110608053}, {"filename": "/Data/NPC/upper_12.OZJ", "start": 110608053, "end": 110633510}, {"filename": "/Data/NPC/w_merchant_a.OZJ", "start": 110633510, "end": 110665268}, {"filename": "/Data/NPC/w_merchant_b.OZJ", "start": 110665268, "end": 110695460}, {"filename": "/Data/NPC/warp01.bmd", "start": 110695460, "end": 110704390}, {"filename": "/Data/NPC/warp02.bmd", "start": 110704390, "end": 110713320}, {"filename": "/Data/NPC/warp03.bmd", "start": 110713320, "end": 110713714}, {"filename": "/Data/NPC/yellow_jewel.OZJ", "start": 110713714, "end": 110718655}, {"filename": "/Data/Object1/Beer01.bmd", "start": 110718655, "end": 110739721}, {"filename": "/Data/Object1/Beer02.bmd", "start": 110739721, "end": 110761034}, {"filename": "/Data/Object1/Beer03.bmd", "start": 110761034, "end": 110770784}, {"filename": "/Data/Object1/Bird01.bmd", "start": 110770784, "end": 110784026}, {"filename": "/Data/Object1/Bonfire01.bmd", "start": 110784026, "end": 110795531}, {"filename": "/Data/Object1/Bridge01.bmd", "start": 110795531, "end": 110813042}, {"filename": "/Data/Object1/BridgeStone01.bmd", "start": 110813042, "end": 110820817}, {"filename": "/Data/Object1/Butterfly.OZT", "start": 110820817, "end": 110824961}, {"filename": "/Data/Object1/Butterfly01.bmd", "start": 110824961, "end": 110828369}, {"filename": "/Data/Object1/Candle01.bmd", "start": 110828369, "end": 110841085}, {"filename": "/Data/Object1/Cannon01.bmd", "start": 110841085, "end": 110856935}, {"filename": "/Data/Object1/Cannon02.bmd", "start": 110856935, "end": 110870785}, {"filename": "/Data/Object1/Cannon03.bmd", "start": 110870785, "end": 110877731}, {"filename": "/Data/Object1/Carriage01.bmd", "start": 110877731, "end": 110910598}, {"filename": "/Data/Object1/Carriage02.bmd", "start": 110910598, "end": 110934215}, {"filename": "/Data/Object1/Carriage03.bmd", "start": 110934215, "end": 110965568}, {"filename": "/Data/Object1/Carriage04.bmd", "start": 110965568, "end": 111000204}, {"filename": "/Data/Object1/Curtain01.bmd", "start": 111000204, "end": 111011426}, {"filename": "/Data/Object1/DoungeonGate01.bmd", "start": 111011426, "end": 111041962}, {"filename": "/Data/Object1/Fence01.bmd", "start": 111041962, "end": 111045552}, {"filename": "/Data/Object1/Fence02.bmd", "start": 111045552, "end": 111047246}, {"filename": "/Data/Object1/Fence03.bmd", "start": 111047246, "end": 111048356}, {"filename": "/Data/Object1/Fence04.bmd", "start": 111048356, "end": 111049466}, {"filename": "/Data/Object1/FireLight01.bmd", "start": 111049466, "end": 111054676}, {"filename": "/Data/Object1/FireLight02.bmd", "start": 111054676, "end": 111058353}, {"filename": "/Data/Object1/Fish01.bmd", "start": 111058353, "end": 111070702}, {"filename": "/Data/Object1/Furniture01.bmd", "start": 111070702, "end": 111095317}, {"filename": "/Data/Object1/Furniture02.bmd", "start": 111095317, "end": 111133713}, {"filename": "/Data/Object1/Furniture03.bmd", "start": 111133713, "end": 111137671}, {"filename": "/Data/Object1/Furniture04.bmd", "start": 111137671, "end": 111141625}, {"filename": "/Data/Object1/Furniture05.bmd", "start": 111141625, "end": 111144823}, {"filename": "/Data/Object1/Furniture06.bmd", "start": 111144823, "end": 111149899}, {"filename": "/Data/Object1/Furniture07.bmd", "start": 111149899, "end": 111154377}, {"filename": "/Data/Object1/Grass01.bmd", "start": 111154377, "end": 111167591}, {"filename": "/Data/Object1/Grass02.bmd", "start": 111167591, "end": 111180805}, {"filename": "/Data/Object1/Grass03.bmd", "start": 111180805, "end": 111195466}, {"filename": "/Data/Object1/Grass04.bmd", "start": 111195466, "end": 111210127}, {"filename": "/Data/Object1/Grass05.bmd", "start": 111210127, "end": 111222846}, {"filename": "/Data/Object1/Grass06.bmd", "start": 111222846, "end": 111235565}, {"filename": "/Data/Object1/Grass07.bmd", "start": 111235565, "end": 111249141}, {"filename": "/Data/Object1/Grass08.bmd", "start": 111249141, "end": 111255081}, {"filename": "/Data/Object1/Hanging01.bmd", "start": 111255081, "end": 111272320}, {"filename": "/Data/Object1/House01.bmd", "start": 111272320, "end": 111287695}, {"filename": "/Data/Object1/House02.bmd", "start": 111287695, "end": 111303095}, {"filename": "/Data/Object1/House03.bmd", "start": 111303095, "end": 111328119}, {"filename": "/Data/Object1/House04.bmd", "start": 111328119, "end": 111371789}, {"filename": "/Data/Object1/House05.bmd", "start": 111371789, "end": 111405866}, {"filename": "/Data/Object1/HouseEtc01.bmd", "start": 111405866, "end": 111409250}, {"filename": "/Data/Object1/HouseEtc02.bmd", "start": 111409250, "end": 111430616}, {"filename": "/Data/Object1/HouseEtc03.bmd", "start": 111430616, "end": 111432320}, {"filename": "/Data/Object1/HouseWall01.bmd", "start": 111432320, "end": 111436010}, {"filename": "/Data/Object1/HouseWall02.bmd", "start": 111436010, "end": 111442962}, {"filename": "/Data/Object1/HouseWall03.bmd", "start": 111442962, "end": 111444840}, {"filename": "/Data/Object1/HouseWall04.bmd", "start": 111444840, "end": 111450646}, {"filename": "/Data/Object1/HouseWall05.bmd", "start": 111450646, "end": 111453718}, {"filename": "/Data/Object1/HouseWall06.bmd", "start": 111453718, "end": 111456546}, {"filename": "/Data/Object1/Light01.bmd", "start": 111456546, "end": 111457740}, {"filename": "/Data/Object1/Light02.bmd", "start": 111457740, "end": 111458934}, {"filename": "/Data/Object1/Light03.bmd", "start": 111458934, "end": 111460128}, {"filename": "/Data/Object1/MerchantAnimal01.bmd", "start": 111460128, "end": 111597413}, {"filename": "/Data/Object1/MerchantAnimal02.bmd", "start": 111597413, "end": 111668453}, {"filename": "/Data/Object1/PoseBox01.bmd", "start": 111668453, "end": 111669255}, {"filename": "/Data/Object1/Ship01.bmd", "start": 111669255, "end": 111756686}, {"filename": "/Data/Object1/Sign01.bmd", "start": 111756686, "end": 111762129}, {"filename": "/Data/Object1/Sign02.bmd", "start": 111762129, "end": 111764955}, {"filename": "/Data/Object1/Stair01.bmd", "start": 111764955, "end": 111771597}, {"filename": "/Data/Object1/SteelDoor01.bmd", "start": 111771597, "end": 111777205}, {"filename": "/Data/Object1/SteelStatue01.bmd", "start": 111777205, "end": 111783339}, {"filename": "/Data/Object1/SteelWall01.bmd", "start": 111783339, "end": 111788699}, {"filename": "/Data/Object1/SteelWall02.bmd", "start": 111788699, "end": 111795260}, {"filename": "/Data/Object1/SteelWall03.bmd", "start": 111795260, "end": 111797228}, {"filename": "/Data/Object1/Stone01.bmd", "start": 111797228, "end": 111813352}, {"filename": "/Data/Object1/Stone02.bmd", "start": 111813352, "end": 111829408}, {"filename": "/Data/Object1/Stone03.bmd", "start": 111829408, "end": 111836522}, {"filename": "/Data/Object1/Stone04.bmd", "start": 111836522, "end": 111840824}, {"filename": "/Data/Object1/Stone05.bmd", "start": 111840824, "end": 111851906}, {"filename": "/Data/Object1/StoneMuWall01.bmd", "start": 111851906, "end": 111880016}, {"filename": "/Data/Object1/StoneMuWall02.bmd", "start": 111880016, "end": 111885378}, {"filename": "/Data/Object1/StoneMuWall03.bmd", "start": 111885378, "end": 111891018}, {"filename": "/Data/Object1/StoneMuWall04.bmd", "start": 111891018, "end": 111917266}, {"filename": "/Data/Object1/StoneStatue01.bmd", "start": 111917266, "end": 111925788}, {"filename": "/Data/Object1/StoneStatue02.bmd", "start": 111925788, "end": 111935494}, {"filename": "/Data/Object1/StoneStatue03.bmd", "start": 111935494, "end": 111958022}, {"filename": "/Data/Object1/StoneWall01.bmd", "start": 111958022, "end": 111985166}, {"filename": "/Data/Object1/StoneWall02.bmd", "start": 111985166, "end": 112012310}, {"filename": "/Data/Object1/StoneWall03.bmd", "start": 112012310, "end": 112038649}, {"filename": "/Data/Object1/StoneWall04.bmd", "start": 112038649, "end": 112047514}, {"filename": "/Data/Object1/StoneWall05.bmd", "start": 112047514, "end": 112053245}, {"filename": "/Data/Object1/StoneWall06.bmd", "start": 112053245, "end": 112064615}, {"filename": "/Data/Object1/Straw01.bmd", "start": 112064615, "end": 112075679}, {"filename": "/Data/Object1/Straw02.bmd", "start": 112075679, "end": 112106878}, {"filename": "/Data/Object1/StreetLight01.bmd", "start": 112106878, "end": 112119402}, {"filename": "/Data/Object1/Tent01.bmd", "start": 112119402, "end": 112128851}, {"filename": "/Data/Object1/TileGround03.OZJ", "start": 112128851, "end": 112154185}, {"filename": "/Data/Object1/Tomb01.bmd", "start": 112154185, "end": 112158490}, {"filename": "/Data/Object1/Tomb02.bmd", "start": 112158490, "end": 112162292}, {"filename": "/Data/Object1/Tomb03.bmd", "start": 112162292, "end": 112165246}, {"filename": "/Data/Object1/TreasureChest01.bmd", "start": 112165246, "end": 112172305}, {"filename": "/Data/Object1/TreasureDrum01.bmd", "start": 112172305, "end": 112177899}, {"filename": "/Data/Object1/Tree01.bmd", "start": 112177899, "end": 112227990}, {"filename": "/Data/Object1/Tree02.bmd", "start": 112227990, "end": 112318623}, {"filename": "/Data/Object1/Tree03.bmd", "start": 112318623, "end": 112344453}, {"filename": "/Data/Object1/Tree04.bmd", "start": 112344453, "end": 112370643}, {"filename": "/Data/Object1/Tree05.bmd", "start": 112370643, "end": 112378961}, {"filename": "/Data/Object1/Tree06.bmd", "start": 112378961, "end": 112388399}, {"filename": "/Data/Object1/Tree07.bmd", "start": 112388399, "end": 112397135}, {"filename": "/Data/Object1/Tree08.bmd", "start": 112397135, "end": 112413593}, {"filename": "/Data/Object1/Tree09.bmd", "start": 112413593, "end": 112436039}, {"filename": "/Data/Object1/Tree10.bmd", "start": 112436039, "end": 112477020}, {"filename": "/Data/Object1/Tree11.bmd", "start": 112477020, "end": 112500299}, {"filename": "/Data/Object1/Tree12.bmd", "start": 112500299, "end": 112546499}, {"filename": "/Data/Object1/Tree13.bmd", "start": 112546499, "end": 112593518}, {"filename": "/Data/Object1/Tree_a.OZT", "start": 112593518, "end": 112659102}, {"filename": "/Data/Object1/Waterspout01.bmd", "start": 112659102, "end": 112722248}, {"filename": "/Data/Object1/Well01.bmd", "start": 112722248, "end": 112759918}, {"filename": "/Data/Object1/Well02.bmd", "start": 112759918, "end": 112771608}, {"filename": "/Data/Object1/Well03.bmd", "start": 112771608, "end": 112789855}, {"filename": "/Data/Object1/Well04.bmd", "start": 112789855, "end": 112825034}, {"filename": "/Data/Object1/angel_stone_statue.OZJ", "start": 112825034, "end": 112844270}, {"filename": "/Data/Object1/apple.OZJ", "start": 112844270, "end": 112849386}, {"filename": "/Data/Object1/badge_01.OZJ", "start": 112849386, "end": 112855021}, {"filename": "/Data/Object1/badge_02.OZT", "start": 112855021, "end": 112863261}, {"filename": "/Data/Object1/badge_03.OZT", "start": 112863261, "end": 112879693}, {"filename": "/Data/Object1/bird.OZT", "start": 112879693, "end": 112887933}, {"filename": "/Data/Object1/bookshelf.OZJ", "start": 112887933, "end": 112926319}, {"filename": "/Data/Object1/bottle.OZT", "start": 112926319, "end": 112930463}, {"filename": "/Data/Object1/bridge_01.OZJ", "start": 112930463, "end": 112976818}, {"filename": "/Data/Object1/bridge_shadow01.OZT", "start": 112976818, "end": 112977122}, {"filename": "/Data/Object1/c_wall04.OZJ", "start": 112977122, "end": 113004920}, {"filename": "/Data/Object1/c_wall05.OZJ", "start": 113004920, "end": 113037481}, {"filename": "/Data/Object1/c_wall06.OZJ", "start": 113037481, "end": 113070526}, {"filename": "/Data/Object1/candle.OZJ", "start": 113070526, "end": 113078154}, {"filename": "/Data/Object1/candle2.OZJ", "start": 113078154, "end": 113083567}, {"filename": "/Data/Object1/chair2.OZT", "start": 113083567, "end": 113087711}, {"filename": "/Data/Object1/copra_gate.OZJ", "start": 113087711, "end": 113108604}, {"filename": "/Data/Object1/desk_big.OZJ", "start": 113108604, "end": 113148632}, {"filename": "/Data/Object1/doorknob.OZT", "start": 113148632, "end": 113149704}, {"filename": "/Data/Object1/drum.OZJ", "start": 113149704, "end": 113174757}, {"filename": "/Data/Object1/fire_01.OZJ", "start": 113174757, "end": 113180970}, {"filename": "/Data/Object1/fire_02.OZJ", "start": 113180970, "end": 113186809}, {"filename": "/Data/Object1/fire_light_01.OZT", "start": 113186809, "end": 113189161}, {"filename": "/Data/Object1/fish.OZT", "start": 113189161, "end": 113197401}, {"filename": "/Data/Object1/grass_01.OZT", "start": 113197401, "end": 113205641}, {"filename": "/Data/Object1/grave_01.OZJ", "start": 113205641, "end": 113227960}, {"filename": "/Data/Object1/grave_02.OZJ", "start": 113227960, "end": 113256677}, {"filename": "/Data/Object1/horse_drawn_01.OZJ", "start": 113256677, "end": 113329733}, {"filename": "/Data/Object1/horse_drawn_02.OZT", "start": 113329733, "end": 113333877}, {"filename": "/Data/Object1/horse_drawn_03.OZJ", "start": 113333877, "end": 113343012}, {"filename": "/Data/Object1/jar_01.OZJ", "start": 113343012, "end": 113362064}, {"filename": "/Data/Object1/joint.OZJ", "start": 113362064, "end": 113368606}, {"filename": "/Data/Object1/light.OZT", "start": 113368606, "end": 113385038}, {"filename": "/Data/Object1/light2.OZJ", "start": 113385038, "end": 113390507}, {"filename": "/Data/Object1/light3.OZJ", "start": 113390507, "end": 113396085}, {"filename": "/Data/Object1/light_02.OZJ", "start": 113396085, "end": 113401095}, {"filename": "/Data/Object1/merchant_moster_a01.OZJ", "start": 113401095, "end": 113445380}, {"filename": "/Data/Object1/merchant_moster_a02.OZT", "start": 113445380, "end": 113461812}, {"filename": "/Data/Object1/merchant_moster_b01.OZJ", "start": 113461812, "end": 113489041}, {"filename": "/Data/Object1/mushroom.OZJ", "start": 113489041, "end": 113495303}, {"filename": "/Data/Object1/notice.OZJ", "start": 113495303, "end": 113507175}, {"filename": "/Data/Object1/plate.OZJ", "start": 113507175, "end": 113513571}, {"filename": "/Data/Object1/plate2.OZJ", "start": 113513571, "end": 113520368}, {"filename": "/Data/Object1/pot.OZJ", "start": 113520368, "end": 113527626}, {"filename": "/Data/Object1/pot2.OZJ", "start": 113527626, "end": 113534650}, {"filename": "/Data/Object1/pot3.OZT", "start": 113534650, "end": 113538794}, {"filename": "/Data/Object1/reagon_waterspout.OZJ", "start": 113538794, "end": 113558002}, {"filename": "/Data/Object1/ship01.OZJ", "start": 113558002, "end": 113591110}, {"filename": "/Data/Object1/ship03.OZJ", "start": 113591110, "end": 113600897}, {"filename": "/Data/Object1/ship04.OZJ", "start": 113600897, "end": 113616911}, {"filename": "/Data/Object1/ship05.OZJ", "start": 113616911, "end": 113622965}, {"filename": "/Data/Object1/ship05.OZT", "start": 113622965, "end": 113631205}, {"filename": "/Data/Object1/ship06.OZJ", "start": 113631205, "end": 113636492}, {"filename": "/Data/Object1/ship06.OZT", "start": 113636492, "end": 113636796}, {"filename": "/Data/Object1/ship07.OZJ", "start": 113636796, "end": 113676821}, {"filename": "/Data/Object1/ship07.OZT", "start": 113676821, "end": 113677893}, {"filename": "/Data/Object1/signboard.OZT", "start": 113677893, "end": 113686133}, {"filename": "/Data/Object1/steel.OZJ", "start": 113686133, "end": 113691238}, {"filename": "/Data/Object1/steel_barred_a.OZT", "start": 113691238, "end": 113724054}, {"filename": "/Data/Object1/steel_barred_b.OZJ", "start": 113724054, "end": 113730414}, {"filename": "/Data/Object1/steel_barred_door.OZT", "start": 113730414, "end": 113763230}, {"filename": "/Data/Object1/ston01.OZJ", "start": 113763230, "end": 113785557}, {"filename": "/Data/Object1/ston02.OZJ", "start": 113785557, "end": 113816182}, {"filename": "/Data/Object1/ston02.OZT", "start": 113816182, "end": 113820326}, {"filename": "/Data/Object1/ston03.OZJ", "start": 113820326, "end": 113824866}, {"filename": "/Data/Object1/stone_statue01.OZJ", "start": 113824866, "end": 113842780}, {"filename": "/Data/Object1/stone_statue02.OZJ", "start": 113842780, "end": 113862544}, {"filename": "/Data/Object1/streetlight.OZJ", "start": 113862544, "end": 113876304}, {"filename": "/Data/Object1/streetlight_brightness2.OZJ", "start": 113876304, "end": 113882177}, {"filename": "/Data/Object1/tile_01.OZJ", "start": 113882177, "end": 113891975}, {"filename": "/Data/Object1/tile_02.OZJ", "start": 113891975, "end": 113902347}, {"filename": "/Data/Object1/tile_03.OZJ", "start": 113902347, "end": 113912095}, {"filename": "/Data/Object1/tile_house01.OZJ", "start": 113912095, "end": 113950227}, {"filename": "/Data/Object1/tile_space01.OZJ", "start": 113950227, "end": 113956325}, {"filename": "/Data/Object1/tile_ston01.OZJ", "start": 113956325, "end": 113983152}, {"filename": "/Data/Object1/tile_ston04.OZJ", "start": 113983152, "end": 114008786}, {"filename": "/Data/Object1/tile_ston05.OZJ", "start": 114008786, "end": 114032276}, {"filename": "/Data/Object1/tile_ston06.OZJ", "start": 114032276, "end": 114068539}, {"filename": "/Data/Object1/tile_ston07.OZT", "start": 114068539, "end": 114134123}, {"filename": "/Data/Object1/tile_windows01.OZJ", "start": 114134123, "end": 114146191}, {"filename": "/Data/Object1/tile_wood01.OZJ", "start": 114146191, "end": 114179932}, {"filename": "/Data/Object1/tile_wood02.OZJ", "start": 114179932, "end": 114210786}, {"filename": "/Data/Object1/tile_wood03.OZJ", "start": 114210786, "end": 114232962}, {"filename": "/Data/Object1/tombstone.OZJ", "start": 114232962, "end": 114255143}, {"filename": "/Data/Object1/tombstone_big.OZJ", "start": 114255143, "end": 114280991}, {"filename": "/Data/Object1/treasure_chest.OZJ", "start": 114280991, "end": 114310748}, {"filename": "/Data/Object1/tree.OZJ", "start": 114310748, "end": 114326078}, {"filename": "/Data/Object1/tree_01.OZJ", "start": 114326078, "end": 114341979}, {"filename": "/Data/Object1/tree_01.OZT", "start": 114341979, "end": 114346123}, {"filename": "/Data/Object1/tree_02.OZJ", "start": 114346123, "end": 114367338}, {"filename": "/Data/Object1/tree_02.OZT", "start": 114367338, "end": 114371482}, {"filename": "/Data/Object1/tree_03.OZJ", "start": 114371482, "end": 114386191}, {"filename": "/Data/Object1/tree_04.OZJ", "start": 114386191, "end": 114392330}, {"filename": "/Data/Object1/tree_04.OZT", "start": 114392330, "end": 114408762}, {"filename": "/Data/Object1/tree_05.OZT", "start": 114408762, "end": 114425194}, {"filename": "/Data/Object1/tree_06.OZT", "start": 114425194, "end": 114490778}, {"filename": "/Data/Object1/tree_07.OZT", "start": 114490778, "end": 114494922}, {"filename": "/Data/Object1/tree_08.OZT", "start": 114494922, "end": 114499066}, {"filename": "/Data/Object1/tree_09.OZT", "start": 114499066, "end": 114507306}, {"filename": "/Data/Object1/tub.OZJ", "start": 114507306, "end": 114522085}, {"filename": "/Data/Object1/well.OZJ", "start": 114522085, "end": 114558358}, {"filename": "/Data/Object1/winecup.OZJ", "start": 114558358, "end": 114564706}, {"filename": "/Data/Object10/Javelins03.OZJ", "start": 114564706, "end": 114570627}, {"filename": "/Data/Object10/Object01.bmd", "start": 114570627, "end": 114594713}, {"filename": "/Data/Object10/Object02.bmd", "start": 114594713, "end": 114604823}, {"filename": "/Data/Object10/Object03.bmd", "start": 114604823, "end": 114664252}, {"filename": "/Data/Object10/Object04.bmd", "start": 114664252, "end": 114740222}, {"filename": "/Data/Object10/Object05.bmd", "start": 114740222, "end": 114741488}, {"filename": "/Data/Object10/Object06.bmd", "start": 114741488, "end": 114744512}, {"filename": "/Data/Object10/Object07.bmd", "start": 114744512, "end": 114746240}, {"filename": "/Data/Object10/bacc00.OZJ", "start": 114746240, "end": 114808432}, {"filename": "/Data/Object10/bacc01.OZJ", "start": 114808432, "end": 114832058}, {"filename": "/Data/Object10/boots_11.OZJ", "start": 114832058, "end": 114845202}, {"filename": "/Data/Object10/gloves_11.OZJ", "start": 114845202, "end": 114859170}, {"filename": "/Data/Object10/guard_hair.OZT", "start": 114859170, "end": 114863314}, {"filename": "/Data/Object10/head_11.OZJ", "start": 114863314, "end": 114874396}, {"filename": "/Data/Object10/hide.OZJ", "start": 114874396, "end": 114878936}, {"filename": "/Data/Object10/kni00.OZJ", "start": 114878936, "end": 114919779}, {"filename": "/Data/Object10/kni01.OZJ", "start": 114919779, "end": 114943597}, {"filename": "/Data/Object10/lower_11.OZJ", "start": 114943597, "end": 114978444}, {"filename": "/Data/Object10/shield06.OZJ", "start": 114978444, "end": 115003201}, {"filename": "/Data/Object10/upper_11.OZJ", "start": 115003201, "end": 115040108}, {"filename": "/Data/Object11/Object01.bmd", "start": 115040108, "end": 115041302}, {"filename": "/Data/Object11/Object02.bmd", "start": 115041302, "end": 115042496}, {"filename": "/Data/Object11/Object03.bmd", "start": 115042496, "end": 115043690}, {"filename": "/Data/Object11/Object04.bmd", "start": 115043690, "end": 115044884}, {"filename": "/Data/Object11/Object05.bmd", "start": 115044884, "end": 115046078}, {"filename": "/Data/Object11/Object06.bmd", "start": 115046078, "end": 115047272}, {"filename": "/Data/Object11/Object07.bmd", "start": 115047272, "end": 115048350}, {"filename": "/Data/Object11/Object08.bmd", "start": 115048350, "end": 115053346}, {"filename": "/Data/Object11/Object09.bmd", "start": 115053346, "end": 115059206}, {"filename": "/Data/Object11/Object10.bmd", "start": 115059206, "end": 115065066}, {"filename": "/Data/Object11/Object11.bmd", "start": 115065066, "end": 115081357}, {"filename": "/Data/Object11/Object13.bmd", "start": 115081357, "end": 115115991}, {"filename": "/Data/Object11/Object14.bmd", "start": 115115991, "end": 115125625}, {"filename": "/Data/Object11/Object15.bmd", "start": 115125625, "end": 115174952}, {"filename": "/Data/Object11/Object16.bmd", "start": 115174952, "end": 115176030}, {"filename": "/Data/Object11/cloud.OZJ", "start": 115176030, "end": 115185294}, {"filename": "/Data/Object11/cloud.bmd", "start": 115185294, "end": 115188108}, {"filename": "/Data/Object11/gyg_R.OZJ", "start": 115188108, "end": 115229844}, {"filename": "/Data/Object11/test12_H.OZJ", "start": 115229844, "end": 115231760}, {"filename": "/Data/Object11/top02_R.OZJ", "start": 115231760, "end": 115254767}, {"filename": "/Data/Object11/top03_B.OZJ", "start": 115254767, "end": 115266134}, {"filename": "/Data/Object11/top04_B.OZJ", "start": 115266134, "end": 115278139}, {"filename": "/Data/Object12/Crow01.bmd", "start": 115278139, "end": 115285717}, {"filename": "/Data/Object12/Gate01.bmd", "start": 115285717, "end": 115291243}, {"filename": "/Data/Object12/Gate02.bmd", "start": 115291243, "end": 115294237}, {"filename": "/Data/Object12/Object01.bmd", "start": 115294237, "end": 115299735}, {"filename": "/Data/Object12/Object02.bmd", "start": 115299735, "end": 115304801}, {"filename": "/Data/Object12/Object03.bmd", "start": 115304801, "end": 115309515}, {"filename": "/Data/Object12/Object04.bmd", "start": 115309515, "end": 115314581}, {"filename": "/Data/Object12/Object05.bmd", "start": 115314581, "end": 115320079}, {"filename": "/Data/Object12/Object06.bmd", "start": 115320079, "end": 115320469}, {"filename": "/Data/Object12/Object07.bmd", "start": 115320469, "end": 115321079}, {"filename": "/Data/Object12/Object08.bmd", "start": 115321079, "end": 115322011}, {"filename": "/Data/Object12/Object09.bmd", "start": 115322011, "end": 115356595}, {"filename": "/Data/Object12/Object10.bmd", "start": 115356595, "end": 115357785}, {"filename": "/Data/Object12/Object11.bmd", "start": 115357785, "end": 115429408}, {"filename": "/Data/Object12/Object12.bmd", "start": 115429408, "end": 115436243}, {"filename": "/Data/Object12/Object13.bmd", "start": 115436243, "end": 115438018}, {"filename": "/Data/Object12/Object14.bmd", "start": 115438018, "end": 115476892}, {"filename": "/Data/Object12/Object15.bmd", "start": 115476892, "end": 115490392}, {"filename": "/Data/Object12/Object16.bmd", "start": 115490392, "end": 115513348}, {"filename": "/Data/Object12/Object17.bmd", "start": 115513348, "end": 115640940}, {"filename": "/Data/Object12/Object18.bmd", "start": 115640940, "end": 115646046}, {"filename": "/Data/Object12/Object19.bmd", "start": 115646046, "end": 115647704}, {"filename": "/Data/Object12/Object20.bmd", "start": 115647704, "end": 115648878}, {"filename": "/Data/Object12/Object21.bmd", "start": 115648878, "end": 115651725}, {"filename": "/Data/Object12/Object22.bmd", "start": 115651725, "end": 115658867}, {"filename": "/Data/Object12/Object23.bmd", "start": 115658867, "end": 115661729}, {"filename": "/Data/Object12/Object24.bmd", "start": 115661729, "end": 115668673}, {"filename": "/Data/Object12/Object25.bmd", "start": 115668673, "end": 115669605}, {"filename": "/Data/Object12/Object26.bmd", "start": 115669605, "end": 115676702}, {"filename": "/Data/Object12/Object27.bmd", "start": 115676702, "end": 115710604}, {"filename": "/Data/Object12/Object28.bmd", "start": 115710604, "end": 115716006}, {"filename": "/Data/Object12/Object29.bmd", "start": 115716006, "end": 115800496}, {"filename": "/Data/Object12/Object30.bmd", "start": 115800496, "end": 115878540}, {"filename": "/Data/Object12/Object31.bmd", "start": 115878540, "end": 115943199}, {"filename": "/Data/Object12/Object32.bmd", "start": 115943199, "end": 116013495}, {"filename": "/Data/Object12/Object33.bmd", "start": 116013495, "end": 116014427}, {"filename": "/Data/Object12/Object34.bmd", "start": 116014427, "end": 116016301}, {"filename": "/Data/Object12/Object35.bmd", "start": 116016301, "end": 116017083}, {"filename": "/Data/Object12/Object36.bmd", "start": 116017083, "end": 116020701}, {"filename": "/Data/Object12/Object37.bmd", "start": 116020701, "end": 116028999}, {"filename": "/Data/Object12/Shine01.bmd", "start": 116028999, "end": 116029389}, {"filename": "/Data/Object12/StoneCoffin01.bmd", "start": 116029389, "end": 116032399}, {"filename": "/Data/Object12/StoneCoffin02.bmd", "start": 116032399, "end": 116033953}, {"filename": "/Data/Object12/bird.OZT", "start": 116033953, "end": 116050385}, {"filename": "/Data/Object12/br001.OZJ", "start": 116050385, "end": 116120037}, {"filename": "/Data/Object12/br002.OZT", "start": 116120037, "end": 116120341}, {"filename": "/Data/Object12/bro01.OZJ", "start": 116120341, "end": 116189891}, {"filename": "/Data/Object12/cs001.OZJ", "start": 116189891, "end": 116253036}, {"filename": "/Data/Object12/doorc01.OZJ", "start": 116253036, "end": 116295651}, {"filename": "/Data/Object12/hop01.OZJ", "start": 116295651, "end": 116368458}, {"filename": "/Data/Object12/ju01.OZJ", "start": 116368458, "end": 116447815}, {"filename": "/Data/Object12/ju01_R.OZJ", "start": 116447815, "end": 116462224}, {"filename": "/Data/Object12/king01.OZJ", "start": 116462224, "end": 116482332}, {"filename": "/Data/Object12/light01.OZJ", "start": 116482332, "end": 116488074}, {"filename": "/Data/Object12/light2_R.OZJ", "start": 116488074, "end": 116495918}, {"filename": "/Data/Object12/light_R.OZJ", "start": 116495918, "end": 116502108}, {"filename": "/Data/Object12/lnn01.OZT", "start": 116502108, "end": 116534924}, {"filename": "/Data/Object12/ng01.OZJ", "start": 116534924, "end": 116615576}, {"filename": "/Data/Object12/pan01_B.OZJ", "start": 116615576, "end": 116620990}, {"filename": "/Data/Object12/pan_B.OZJ", "start": 116620990, "end": 116626404}, {"filename": "/Data/Object12/pan_R.OZJ", "start": 116626404, "end": 116631891}, {"filename": "/Data/Object12/pant01.OZJ", "start": 116631891, "end": 116701992}, {"filename": "/Data/Object12/pant01_R.OZJ", "start": 116701992, "end": 116710718}, {"filename": "/Data/Object12/ses.OZJ", "start": 116710718, "end": 116715710}, {"filename": "/Data/Object12/st09.OZJ", "start": 116715710, "end": 116755512}, {"filename": "/Data/Object12/wcd.OZJ", "start": 116755512, "end": 116781083}, {"filename": "/Data/Object12/woodc01.OZJ", "start": 116781083, "end": 116810596}, {"filename": "/Data/Object2/Bat01.bmd", "start": 116810596, "end": 116815533}, {"filename": "/Data/Object2/DungeonStone01.bmd", "start": 116815533, "end": 116816543}, {"filename": "/Data/Object2/Object01.bmd", "start": 116816543, "end": 116821859}, {"filename": "/Data/Object2/Object02.bmd", "start": 116821859, "end": 116822913}, {"filename": "/Data/Object2/Object03.bmd", "start": 116822913, "end": 116835569}, {"filename": "/Data/Object2/Object04.bmd", "start": 116835569, "end": 116844233}, {"filename": "/Data/Object2/Object05.bmd", "start": 116844233, "end": 116849559}, {"filename": "/Data/Object2/Object06.bmd", "start": 116849559, "end": 116854993}, {"filename": "/Data/Object2/Object07.bmd", "start": 116854993, "end": 116861869}, {"filename": "/Data/Object2/Object08.bmd", "start": 116861869, "end": 116870117}, {"filename": "/Data/Object2/Object09.bmd", "start": 116870117, "end": 116877377}, {"filename": "/Data/Object2/Object10.bmd", "start": 116877377, "end": 116890681}, {"filename": "/Data/Object2/Object11.bmd", "start": 116890681, "end": 116903159}, {"filename": "/Data/Object2/Object12.bmd", "start": 116903159, "end": 116923290}, {"filename": "/Data/Object2/Object13.bmd", "start": 116923290, "end": 116929010}, {"filename": "/Data/Object2/Object14.bmd", "start": 116929010, "end": 116932862}, {"filename": "/Data/Object2/Object15.bmd", "start": 116932862, "end": 116933980}, {"filename": "/Data/Object2/Object16.bmd", "start": 116933980, "end": 116973584}, {"filename": "/Data/Object2/Object17.bmd", "start": 116973584, "end": 117012537}, {"filename": "/Data/Object2/Object18.bmd", "start": 117012537, "end": 117013591}, {"filename": "/Data/Object2/Object19.bmd", "start": 117013591, "end": 117076046}, {"filename": "/Data/Object2/Object20.bmd", "start": 117076046, "end": 117095976}, {"filename": "/Data/Object2/Object21.bmd", "start": 117095976, "end": 117099886}, {"filename": "/Data/Object2/Object22.bmd", "start": 117099886, "end": 117102032}, {"filename": "/Data/Object2/Object23.bmd", "start": 117102032, "end": 117122418}, {"filename": "/Data/Object2/Object24.bmd", "start": 117122418, "end": 117142804}, {"filename": "/Data/Object2/Object25.bmd", "start": 117142804, "end": 117167258}, {"filename": "/Data/Object2/Object26.bmd", "start": 117167258, "end": 117170166}, {"filename": "/Data/Object2/Object27.bmd", "start": 117170166, "end": 117173058}, {"filename": "/Data/Object2/Object28.bmd", "start": 117173058, "end": 117218810}, {"filename": "/Data/Object2/Object29.bmd", "start": 117218810, "end": 117226214}, {"filename": "/Data/Object2/Object30.bmd", "start": 117226214, "end": 117252966}, {"filename": "/Data/Object2/Object31.bmd", "start": 117252966, "end": 117257350}, {"filename": "/Data/Object2/Object32.bmd", "start": 117257350, "end": 117299940}, {"filename": "/Data/Object2/Object33.bmd", "start": 117299940, "end": 117342510}, {"filename": "/Data/Object2/Object34.bmd", "start": 117342510, "end": 117343752}, {"filename": "/Data/Object2/Object35.bmd", "start": 117343752, "end": 117350898}, {"filename": "/Data/Object2/Object36.bmd", "start": 117350898, "end": 117360173}, {"filename": "/Data/Object2/Object37.bmd", "start": 117360173, "end": 117368663}, {"filename": "/Data/Object2/Object38.bmd", "start": 117368663, "end": 117371895}, {"filename": "/Data/Object2/Object39.bmd", "start": 117371895, "end": 117390421}, {"filename": "/Data/Object2/Object40.bmd", "start": 117390421, "end": 117392707}, {"filename": "/Data/Object2/Object41.bmd", "start": 117392707, "end": 117396627}, {"filename": "/Data/Object2/Object42.bmd", "start": 117396627, "end": 117401103}, {"filename": "/Data/Object2/Object43.bmd", "start": 117401103, "end": 117407711}, {"filename": "/Data/Object2/Object44.bmd", "start": 117407711, "end": 117458958}, {"filename": "/Data/Object2/Object45.bmd", "start": 117458958, "end": 117501548}, {"filename": "/Data/Object2/Object46.bmd", "start": 117501548, "end": 117544138}, {"filename": "/Data/Object2/Object47.bmd", "start": 117544138, "end": 117583692}, {"filename": "/Data/Object2/Object48.bmd", "start": 117583692, "end": 117608310}, {"filename": "/Data/Object2/Object49.bmd", "start": 117608310, "end": 117643460}, {"filename": "/Data/Object2/Object50.bmd", "start": 117643460, "end": 117678610}, {"filename": "/Data/Object2/Object51.bmd", "start": 117678610, "end": 117683700}, {"filename": "/Data/Object2/Object52.bmd", "start": 117683700, "end": 117689678}, {"filename": "/Data/Object2/Object53.bmd", "start": 117689678, "end": 117690324}, {"filename": "/Data/Object2/Object54.bmd", "start": 117690324, "end": 117753696}, {"filename": "/Data/Object2/Object55.bmd", "start": 117753696, "end": 117768996}, {"filename": "/Data/Object2/Object56.bmd", "start": 117768996, "end": 117783232}, {"filename": "/Data/Object2/Object57.bmd", "start": 117783232, "end": 117784342}, {"filename": "/Data/Object2/Object58.bmd", "start": 117784342, "end": 117787732}, {"filename": "/Data/Object2/Object59.bmd", "start": 117787732, "end": 117788842}, {"filename": "/Data/Object2/Object60.bmd", "start": 117788842, "end": 117789952}, {"filename": "/Data/Object2/Rat01.bmd", "start": 117789952, "end": 117794201}, {"filename": "/Data/Object2/TileRock01.OZJ", "start": 117794201, "end": 117866156}, {"filename": "/Data/Object2/bat01.OZJ", "start": 117866156, "end": 117873137}, {"filename": "/Data/Object2/bat02.OZT", "start": 117873137, "end": 117881377}, {"filename": "/Data/Object2/bons.OZJ", "start": 117881377, "end": 117909176}, {"filename": "/Data/Object2/cobweb.OZJ", "start": 117909176, "end": 117930311}, {"filename": "/Data/Object2/cobweb.OZT", "start": 117930311, "end": 117995895}, {"filename": "/Data/Object2/deep_dragon.OZJ", "start": 117995895, "end": 118014453}, {"filename": "/Data/Object2/deep_wall01.OZJ", "start": 118014453, "end": 118050486}, {"filename": "/Data/Object2/deep_wall02.OZJ", "start": 118050486, "end": 118095080}, {"filename": "/Data/Object2/deep_wall03.OZJ", "start": 118095080, "end": 118119088}, {"filename": "/Data/Object2/deep_wall04.OZJ", "start": 118119088, "end": 118147872}, {"filename": "/Data/Object2/deep_wall05.OZJ", "start": 118147872, "end": 118179372}, {"filename": "/Data/Object2/deep_wall06.OZJ", "start": 118179372, "end": 118203945}, {"filename": "/Data/Object2/deep_wall07.OZJ", "start": 118203945, "end": 118235088}, {"filename": "/Data/Object2/deep_wall08.OZJ", "start": 118235088, "end": 118253633}, {"filename": "/Data/Object2/deep_wall09.OZJ", "start": 118253633, "end": 118281763}, {"filename": "/Data/Object2/deep_wall10.OZJ", "start": 118281763, "end": 118310537}, {"filename": "/Data/Object2/deep_wall11.OZJ", "start": 118310537, "end": 118323343}, {"filename": "/Data/Object2/deep_wall12.OZJ", "start": 118323343, "end": 118401005}, {"filename": "/Data/Object2/fire0a.OZJ", "start": 118401005, "end": 118406911}, {"filename": "/Data/Object2/flower_vase.OZJ", "start": 118406911, "end": 118416094}, {"filename": "/Data/Object2/logo01.OZT", "start": 118416094, "end": 118448910}, {"filename": "/Data/Object2/mouse.OZJ", "start": 118448910, "end": 118455896}, {"filename": "/Data/Object2/squid01.OZJ", "start": 118455896, "end": 118489796}, {"filename": "/Data/Object2/squid02.OZJ", "start": 118489796, "end": 118496510}, {"filename": "/Data/Object2/steel_01.OZT", "start": 118496510, "end": 118504750}, {"filename": "/Data/Object2/steel_02.OZT", "start": 118504750, "end": 118570334}, {"filename": "/Data/Object2/wire_netting01.OZJ", "start": 118570334, "end": 118580943}, {"filename": "/Data/Object2/wood01.OZJ", "start": 118580943, "end": 118645418}, {"filename": "/Data/Object3/Javelins03.OZJ", "start": 118645418, "end": 118651339}, {"filename": "/Data/Object3/Object01.bmd", "start": 118651339, "end": 118674676}, {"filename": "/Data/Object3/Object02.bmd", "start": 118674676, "end": 118678848}, {"filename": "/Data/Object3/Object03.bmd", "start": 118678848, "end": 118709466}, {"filename": "/Data/Object3/Object04.bmd", "start": 118709466, "end": 118715020}, {"filename": "/Data/Object3/Object05.bmd", "start": 118715020, "end": 118730446}, {"filename": "/Data/Object3/Object06.bmd", "start": 118730446, "end": 118733107}, {"filename": "/Data/Object3/Object07.bmd", "start": 118733107, "end": 118734972}, {"filename": "/Data/Object3/Object08.bmd", "start": 118734972, "end": 118737958}, {"filename": "/Data/Object3/Object09.bmd", "start": 118737958, "end": 118739872}, {"filename": "/Data/Object3/Object10.bmd", "start": 118739872, "end": 118744628}, {"filename": "/Data/Object3/Object100.bmd", "start": 118744628, "end": 118752108}, {"filename": "/Data/Object3/Object101.bmd", "start": 118752108, "end": 118752794}, {"filename": "/Data/Object3/Object102.bmd", "start": 118752794, "end": 118833950}, {"filename": "/Data/Object3/Object103.bmd", "start": 118833950, "end": 118840340}, {"filename": "/Data/Object3/Object104.bmd", "start": 118840340, "end": 118901321}, {"filename": "/Data/Object3/Object106.bmd", "start": 118901321, "end": 118905431}, {"filename": "/Data/Object3/Object107.bmd", "start": 118905431, "end": 118984895}, {"filename": "/Data/Object3/Object108.bmd", "start": 118984895, "end": 119014827}, {"filename": "/Data/Object3/Object109.bmd", "start": 119014827, "end": 119044759}, {"filename": "/Data/Object3/Object11.bmd", "start": 119044759, "end": 119049587}, {"filename": "/Data/Object3/Object110.bmd", "start": 119049587, "end": 119062383}, {"filename": "/Data/Object3/Object111.bmd", "start": 119062383, "end": 119092315}, {"filename": "/Data/Object3/Object112.bmd", "start": 119092315, "end": 119098624}, {"filename": "/Data/Object3/Object113.bmd", "start": 119098624, "end": 119107108}, {"filename": "/Data/Object3/Object12.bmd", "start": 119107108, "end": 119122534}, {"filename": "/Data/Object3/Object13.bmd", "start": 119122534, "end": 119136576}, {"filename": "/Data/Object3/Object14.bmd", "start": 119136576, "end": 119142754}, {"filename": "/Data/Object3/Object15.bmd", "start": 119142754, "end": 119147388}, {"filename": "/Data/Object3/Object16.bmd", "start": 119147388, "end": 119151372}, {"filename": "/Data/Object3/Object17.bmd", "start": 119151372, "end": 119157504}, {"filename": "/Data/Object3/Object18.bmd", "start": 119157504, "end": 119164264}, {"filename": "/Data/Object3/Object19.bmd", "start": 119164264, "end": 119171648}, {"filename": "/Data/Object3/Object20.bmd", "start": 119171648, "end": 119178364}, {"filename": "/Data/Object3/Object21.bmd", "start": 119178364, "end": 119196411}, {"filename": "/Data/Object3/Object22.bmd", "start": 119196411, "end": 119202873}, {"filename": "/Data/Object3/Object23.bmd", "start": 119202873, "end": 119211051}, {"filename": "/Data/Object3/Object24.bmd", "start": 119211051, "end": 119214249}, {"filename": "/Data/Object3/Object25.bmd", "start": 119214249, "end": 119214291}, {"filename": "/Data/Object3/Object26.bmd", "start": 119214291, "end": 119220921}, {"filename": "/Data/Object3/Object27.bmd", "start": 119220921, "end": 119220963}, {"filename": "/Data/Object3/Object28.bmd", "start": 119220963, "end": 119224709}, {"filename": "/Data/Object3/Object29.bmd", "start": 119224709, "end": 119231015}, {"filename": "/Data/Object3/Object30.bmd", "start": 119231015, "end": 119236609}, {"filename": "/Data/Object3/Object31.bmd", "start": 119236609, "end": 119241819}, {"filename": "/Data/Object3/Object32.bmd", "start": 119241819, "end": 119249149}, {"filename": "/Data/Object3/Object33.bmd", "start": 119249149, "end": 119249191}, {"filename": "/Data/Object3/Object34.bmd", "start": 119249191, "end": 119253297}, {"filename": "/Data/Object3/Object35.bmd", "start": 119253297, "end": 119259535}, {"filename": "/Data/Object3/Object36.bmd", "start": 119259535, "end": 119265593}, {"filename": "/Data/Object3/Object37.bmd", "start": 119265593, "end": 119274214}, {"filename": "/Data/Object3/Object38.bmd", "start": 119274214, "end": 119284868}, {"filename": "/Data/Object3/Object39.bmd", "start": 119284868, "end": 119295924}, {"filename": "/Data/Object3/Object40.bmd", "start": 119295924, "end": 119302407}, {"filename": "/Data/Object3/Object41.bmd", "start": 119302407, "end": 119307499}, {"filename": "/Data/Object3/Object42.bmd", "start": 119307499, "end": 119311457}, {"filename": "/Data/Object3/Object43.bmd", "start": 119311457, "end": 119314113}, {"filename": "/Data/Object3/Object44.bmd", "start": 119314113, "end": 119317523}, {"filename": "/Data/Object3/Object45.bmd", "start": 119317523, "end": 119321225}, {"filename": "/Data/Object3/Object46.bmd", "start": 119321225, "end": 119325687}, {"filename": "/Data/Object3/Object47.bmd", "start": 119325687, "end": 119329641}, {"filename": "/Data/Object3/Object48.bmd", "start": 119329641, "end": 119350707}, {"filename": "/Data/Object3/Object49.bmd", "start": 119350707, "end": 119372020}, {"filename": "/Data/Object3/Object50.bmd", "start": 119372020, "end": 119381770}, {"filename": "/Data/Object3/Object51.bmd", "start": 119381770, "end": 119421892}, {"filename": "/Data/Object3/Object52.bmd", "start": 119421892, "end": 119460288}, {"filename": "/Data/Object3/Object53.bmd", "start": 119460288, "end": 119484903}, {"filename": "/Data/Object3/Object54.bmd", "start": 119484903, "end": 119487092}, {"filename": "/Data/Object3/Object55.bmd", "start": 119487092, "end": 119499808}, {"filename": "/Data/Object3/Object56.bmd", "start": 119499808, "end": 119504900}, {"filename": "/Data/Object3/Object57.bmd", "start": 119504900, "end": 119517640}, {"filename": "/Data/Object3/Object58.bmd", "start": 119517640, "end": 119528635}, {"filename": "/Data/Object3/Object59.bmd", "start": 119528635, "end": 119533567}, {"filename": "/Data/Object3/Object60.bmd", "start": 119533567, "end": 119538499}, {"filename": "/Data/Object3/Object61.bmd", "start": 119538499, "end": 119543625}, {"filename": "/Data/Object3/Object62.bmd", "start": 119543625, "end": 119551611}, {"filename": "/Data/Object3/Object63.bmd", "start": 119551611, "end": 119558557}, {"filename": "/Data/Object3/Object64.bmd", "start": 119558557, "end": 119566047}, {"filename": "/Data/Object3/Object65.bmd", "start": 119566047, "end": 119572501}, {"filename": "/Data/Object3/Object66.bmd", "start": 119572501, "end": 119590548}, {"filename": "/Data/Object3/Object67.bmd", "start": 119590548, "end": 119602053}, {"filename": "/Data/Object3/Object68.bmd", "start": 119602053, "end": 119622166}, {"filename": "/Data/Object3/Object69.bmd", "start": 119622166, "end": 119631155}, {"filename": "/Data/Object3/Object70.bmd", "start": 119631155, "end": 119639008}, {"filename": "/Data/Object3/Object71.bmd", "start": 119639008, "end": 119646130}, {"filename": "/Data/Object3/Object72.bmd", "start": 119646130, "end": 119650018}, {"filename": "/Data/Object3/Object73.bmd", "start": 119650018, "end": 119680274}, {"filename": "/Data/Object3/Object74.bmd", "start": 119680274, "end": 119682876}, {"filename": "/Data/Object3/Object75.bmd", "start": 119682876, "end": 119708726}, {"filename": "/Data/Object3/Object76.bmd", "start": 119708726, "end": 119732043}, {"filename": "/Data/Object3/Object77.bmd", "start": 119732043, "end": 119737671}, {"filename": "/Data/Object3/Object78.bmd", "start": 119737671, "end": 119741259}, {"filename": "/Data/Object3/Object79.bmd", "start": 119741259, "end": 119748089}, {"filename": "/Data/Object3/Object80.bmd", "start": 119748089, "end": 119750047}, {"filename": "/Data/Object3/Object81.bmd", "start": 119750047, "end": 119756766}, {"filename": "/Data/Object3/Object82.bmd", "start": 119756766, "end": 119759974}, {"filename": "/Data/Object3/Object83.bmd", "start": 119759974, "end": 119762962}, {"filename": "/Data/Object3/Object84.bmd", "start": 119762962, "end": 119772191}, {"filename": "/Data/Object3/Object85.bmd", "start": 119772191, "end": 119781228}, {"filename": "/Data/Object3/Object86.bmd", "start": 119781228, "end": 119790265}, {"filename": "/Data/Object3/Object87.bmd", "start": 119790265, "end": 119799543}, {"filename": "/Data/Object3/Object88.bmd", "start": 119799543, "end": 119871111}, {"filename": "/Data/Object3/Object89.bmd", "start": 119871111, "end": 119889158}, {"filename": "/Data/Object3/Object90.bmd", "start": 119889158, "end": 119889200}, {"filename": "/Data/Object3/Object91.bmd", "start": 119889200, "end": 119897744}, {"filename": "/Data/Object3/Object92.bmd", "start": 119897744, "end": 119898430}, {"filename": "/Data/Object3/Object93.bmd", "start": 119898430, "end": 119919502}, {"filename": "/Data/Object3/Object94.bmd", "start": 119919502, "end": 119933771}, {"filename": "/Data/Object3/Object95.bmd", "start": 119933771, "end": 119941233}, {"filename": "/Data/Object3/Object96.bmd", "start": 119941233, "end": 119953580}, {"filename": "/Data/Object3/Object97.bmd", "start": 119953580, "end": 119956690}, {"filename": "/Data/Object3/Object98.bmd", "start": 119956690, "end": 119958690}, {"filename": "/Data/Object3/Object99.bmd", "start": 119958690, "end": 119966170}, {"filename": "/Data/Object3/apple.OZJ", "start": 119966170, "end": 119971286}, {"filename": "/Data/Object3/art.OZJ", "start": 119971286, "end": 119984841}, {"filename": "/Data/Object3/aurora.OZJ", "start": 119984841, "end": 119997201}, {"filename": "/Data/Object3/badge_01.OZT", "start": 119997201, "end": 120013633}, {"filename": "/Data/Object3/badge_02.OZT", "start": 120013633, "end": 120030065}, {"filename": "/Data/Object3/badge_03.OZT", "start": 120030065, "end": 120046497}, {"filename": "/Data/Object3/blockhead.OZJ", "start": 120046497, "end": 120053869}, {"filename": "/Data/Object3/books.OZJ", "start": 120053869, "end": 120061264}, {"filename": "/Data/Object3/bookshelf.OZJ", "start": 120061264, "end": 120093027}, {"filename": "/Data/Object3/boots_11.OZJ", "start": 120093027, "end": 120106171}, {"filename": "/Data/Object3/bottle.OZT", "start": 120106171, "end": 120110315}, {"filename": "/Data/Object3/bridge01.OZJ", "start": 120110315, "end": 120118059}, {"filename": "/Data/Object3/candle.OZJ", "start": 120118059, "end": 120125687}, {"filename": "/Data/Object3/candle2.OZJ", "start": 120125687, "end": 120131100}, {"filename": "/Data/Object3/chair.OZJ", "start": 120131100, "end": 120142690}, {"filename": "/Data/Object3/chair2.OZT", "start": 120142690, "end": 120146834}, {"filename": "/Data/Object3/deer.OZJ", "start": 120146834, "end": 120165090}, {"filename": "/Data/Object3/desk.OZJ", "start": 120165090, "end": 120192977}, {"filename": "/Data/Object3/desk_big.OZJ", "start": 120192977, "end": 120221161}, {"filename": "/Data/Object3/dog_g99.OZJ", "start": 120221161, "end": 120242649}, {"filename": "/Data/Object3/dog_g991.OZJ", "start": 120242649, "end": 120273410}, {"filename": "/Data/Object3/drum.OZJ", "start": 120273410, "end": 120297863}, {"filename": "/Data/Object3/drum2.OZJ", "start": 120297863, "end": 120317675}, {"filename": "/Data/Object3/drums.OZJ", "start": 120317675, "end": 120342698}, {"filename": "/Data/Object3/feather.OZT", "start": 120342698, "end": 120343770}, {"filename": "/Data/Object3/fire_01.OZJ", "start": 120343770, "end": 120353383}, {"filename": "/Data/Object3/fire_02.OZJ", "start": 120353383, "end": 120359224}, {"filename": "/Data/Object3/fireplace.OZT", "start": 120359224, "end": 120375656}, {"filename": "/Data/Object3/fireplace_down.OZT", "start": 120375656, "end": 120441240}, {"filename": "/Data/Object3/giftbox_blue.OZJ", "start": 120441240, "end": 120479064}, {"filename": "/Data/Object3/giftbox_green.OZJ", "start": 120479064, "end": 120519404}, {"filename": "/Data/Object3/giftbox_red.OZJ", "start": 120519404, "end": 120564469}, {"filename": "/Data/Object3/gloves_11.OZJ", "start": 120564469, "end": 120578437}, {"filename": "/Data/Object3/gold.OZJ", "start": 120578437, "end": 120589216}, {"filename": "/Data/Object3/guard_hair.OZT", "start": 120589216, "end": 120593360}, {"filename": "/Data/Object3/han_ax1.OZJ", "start": 120593360, "end": 120608401}, {"filename": "/Data/Object3/han_ax2.OZT", "start": 120608401, "end": 120641217}, {"filename": "/Data/Object3/han_ctreeax2.OZJ", "start": 120641217, "end": 120658633}, {"filename": "/Data/Object3/han_ctreeax4.OZT", "start": 120658633, "end": 120724217}, {"filename": "/Data/Object3/han_misle.OZT", "start": 120724217, "end": 120789801}, {"filename": "/Data/Object3/han_mistl2.OZJ", "start": 120789801, "end": 120813512}, {"filename": "/Data/Object3/han_xtree.OZT", "start": 120813512, "end": 121075704}, {"filename": "/Data/Object3/head_11.OZJ", "start": 121075704, "end": 121086786}, {"filename": "/Data/Object3/hide.OZJ", "start": 121086786, "end": 121091326}, {"filename": "/Data/Object3/house_stone_out.OZJ", "start": 121091326, "end": 121123529}, {"filename": "/Data/Object3/ice.OZJ", "start": 121123529, "end": 121152411}, {"filename": "/Data/Object3/ice01.OZJ", "start": 121152411, "end": 121167782}, {"filename": "/Data/Object3/ice_block01.OZJ", "start": 121167782, "end": 121250247}, {"filename": "/Data/Object3/ice_block07.OZJ", "start": 121250247, "end": 121328236}, {"filename": "/Data/Object3/leaf.OZT", "start": 121328236, "end": 121344668}, {"filename": "/Data/Object3/light.OZT", "start": 121344668, "end": 121361100}, {"filename": "/Data/Object3/light2.OZJ", "start": 121361100, "end": 121366569}, {"filename": "/Data/Object3/light3.OZJ", "start": 121366569, "end": 121372147}, {"filename": "/Data/Object3/light_02.OZJ", "start": 121372147, "end": 121377157}, {"filename": "/Data/Object3/lower_11.OZJ", "start": 121377157, "end": 121412004}, {"filename": "/Data/Object3/plate.OZJ", "start": 121412004, "end": 121421016}, {"filename": "/Data/Object3/plate2.OZJ", "start": 121421016, "end": 121433163}, {"filename": "/Data/Object3/pot.OZJ", "start": 121433163, "end": 121440421}, {"filename": "/Data/Object3/pot2.OZJ", "start": 121440421, "end": 121447445}, {"filename": "/Data/Object3/pot3.OZT", "start": 121447445, "end": 121451589}, {"filename": "/Data/Object3/sdoorknob.OZT", "start": 121451589, "end": 121452661}, {"filename": "/Data/Object3/shield02.OZJ", "start": 121452661, "end": 121466391}, {"filename": "/Data/Object3/shield03.OZJ", "start": 121466391, "end": 121477875}, {"filename": "/Data/Object3/show_ston01.OZJ", "start": 121477875, "end": 121499995}, {"filename": "/Data/Object3/sky.OZJ", "start": 121499995, "end": 121522632}, {"filename": "/Data/Object3/sky.OZT", "start": 121522632, "end": 121524728}, {"filename": "/Data/Object3/snotice.OZJ", "start": 121524728, "end": 121536862}, {"filename": "/Data/Object3/snotice02.OZJ", "start": 121536862, "end": 121548684}, {"filename": "/Data/Object3/snotice03.OZJ", "start": 121548684, "end": 121556568}, {"filename": "/Data/Object3/snow_ston.OZJ", "start": 121556568, "end": 121575646}, {"filename": "/Data/Object3/snowmachine2.OZJ", "start": 121575646, "end": 121610147}, {"filename": "/Data/Object3/ssignboard.OZT", "start": 121610147, "end": 121618387}, {"filename": "/Data/Object3/sston.OZJ", "start": 121618387, "end": 121642440}, {"filename": "/Data/Object3/sston2.OZJ", "start": 121642440, "end": 121647247}, {"filename": "/Data/Object3/stree.OZJ", "start": 121647247, "end": 121654769}, {"filename": "/Data/Object3/stree.OZT", "start": 121654769, "end": 121720353}, {"filename": "/Data/Object3/sword04.OZJ", "start": 121720353, "end": 121726931}, {"filename": "/Data/Object3/sword08.OZJ", "start": 121726931, "end": 121736313}, {"filename": "/Data/Object3/ti01.OZJ", "start": 121736313, "end": 121757688}, {"filename": "/Data/Object3/ti02.OZJ", "start": 121757688, "end": 121772012}, {"filename": "/Data/Object3/ti03.OZJ", "start": 121772012, "end": 121778697}, {"filename": "/Data/Object3/ti05.OZJ", "start": 121778697, "end": 121800518}, {"filename": "/Data/Object3/ti06.OZJ", "start": 121800518, "end": 121811965}, {"filename": "/Data/Object3/tile_02.OZJ", "start": 121811965, "end": 121822337}, {"filename": "/Data/Object3/tile_wood04.OZJ", "start": 121822337, "end": 121845631}, {"filename": "/Data/Object3/titel_a03.OZJ", "start": 121845631, "end": 121866454}, {"filename": "/Data/Object3/titel_a04.OZJ", "start": 121866454, "end": 121889097}, {"filename": "/Data/Object3/titel_a05.OZJ", "start": 121889097, "end": 121908070}, {"filename": "/Data/Object3/titel_a06.OZJ", "start": 121908070, "end": 121917894}, {"filename": "/Data/Object3/titel_b01.OZJ", "start": 121917894, "end": 121923794}, {"filename": "/Data/Object3/titel_b03.OZJ", "start": 121923794, "end": 121944585}, {"filename": "/Data/Object3/titel_b04.OZJ", "start": 121944585, "end": 121965814}, {"filename": "/Data/Object3/titel_b05.OZJ", "start": 121965814, "end": 121988927}, {"filename": "/Data/Object3/titel_b06.OZJ", "start": 121988927, "end": 122012671}, {"filename": "/Data/Object3/treasure_chest.OZJ", "start": 122012671, "end": 122025264}, {"filename": "/Data/Object3/tree_03.OZJ", "start": 122025264, "end": 122040908}, {"filename": "/Data/Object3/upper_11.OZJ", "start": 122040908, "end": 122077815}, {"filename": "/Data/Object3/wall_door01.OZJ", "start": 122077815, "end": 122099310}, {"filename": "/Data/Object3/wall_door02.OZJ", "start": 122099310, "end": 122109220}, {"filename": "/Data/Object3/wall_door03.OZJ", "start": 122109220, "end": 122131837}, {"filename": "/Data/Object3/winecup.OZJ", "start": 122131837, "end": 122138185}, {"filename": "/Data/Object4/Object01.bmd", "start": 122138185, "end": 122155425}, {"filename": "/Data/Object4/Object02.bmd", "start": 122155425, "end": 122167766}, {"filename": "/Data/Object4/Object03.bmd", "start": 122167766, "end": 122191532}, {"filename": "/Data/Object4/Object04.bmd", "start": 122191532, "end": 122205452}, {"filename": "/Data/Object4/Object05.bmd", "start": 122205452, "end": 122224604}, {"filename": "/Data/Object4/Object06.bmd", "start": 122224604, "end": 122238164}, {"filename": "/Data/Object4/Object07.bmd", "start": 122238164, "end": 122242508}, {"filename": "/Data/Object4/Object08.bmd", "start": 122242508, "end": 122246350}, {"filename": "/Data/Object4/Object09.bmd", "start": 122246350, "end": 122249532}, {"filename": "/Data/Object4/Object10.bmd", "start": 122249532, "end": 122263553}, {"filename": "/Data/Object4/Object11.bmd", "start": 122263553, "end": 122268597}, {"filename": "/Data/Object4/Object12.bmd", "start": 122268597, "end": 122281006}, {"filename": "/Data/Object4/Object13.bmd", "start": 122281006, "end": 122289586}, {"filename": "/Data/Object4/Object14.bmd", "start": 122289586, "end": 122298206}, {"filename": "/Data/Object4/Object15.bmd", "start": 122298206, "end": 122304098}, {"filename": "/Data/Object4/Object16.bmd", "start": 122304098, "end": 122311374}, {"filename": "/Data/Object4/Object17.bmd", "start": 122311374, "end": 122319954}, {"filename": "/Data/Object4/Object18.bmd", "start": 122319954, "end": 122460138}, {"filename": "/Data/Object4/Object19.bmd", "start": 122460138, "end": 122546497}, {"filename": "/Data/Object4/Object20.bmd", "start": 122546497, "end": 122557219}, {"filename": "/Data/Object4/Object21.bmd", "start": 122557219, "end": 122618869}, {"filename": "/Data/Object4/Object22.bmd", "start": 122618869, "end": 122624053}, {"filename": "/Data/Object4/Object23.bmd", "start": 122624053, "end": 122666166}, {"filename": "/Data/Object4/Object24.bmd", "start": 122666166, "end": 122708559}, {"filename": "/Data/Object4/Object25.bmd", "start": 122708559, "end": 122763209}, {"filename": "/Data/Object4/Object26.bmd", "start": 122763209, "end": 122837351}, {"filename": "/Data/Object4/Object27.bmd", "start": 122837351, "end": 122886770}, {"filename": "/Data/Object4/Object28.bmd", "start": 122886770, "end": 122915474}, {"filename": "/Data/Object4/Object29.bmd", "start": 122915474, "end": 122952144}, {"filename": "/Data/Object4/Object30.bmd", "start": 122952144, "end": 122971814}, {"filename": "/Data/Object4/Object31.bmd", "start": 122971814, "end": 123001642}, {"filename": "/Data/Object4/Object32.bmd", "start": 123001642, "end": 123009068}, {"filename": "/Data/Object4/Object33.bmd", "start": 123009068, "end": 123016502}, {"filename": "/Data/Object4/Object34.bmd", "start": 123016502, "end": 123018600}, {"filename": "/Data/Object4/Object35.bmd", "start": 123018600, "end": 123025905}, {"filename": "/Data/Object4/Object36.bmd", "start": 123025905, "end": 123036409}, {"filename": "/Data/Object4/Object37.bmd", "start": 123036409, "end": 123059524}, {"filename": "/Data/Object4/Object38.bmd", "start": 123059524, "end": 123060456}, {"filename": "/Data/Object4/Object39.bmd", "start": 123060456, "end": 123061142}, {"filename": "/Data/Object4/Object40.bmd", "start": 123061142, "end": 123192108}, {"filename": "/Data/Object4/Object41.bmd", "start": 123192108, "end": 123234120}, {"filename": "/Data/Object4/Object42.bmd", "start": 123234120, "end": 123250416}, {"filename": "/Data/Object4/Object43.bmd", "start": 123250416, "end": 123255376}, {"filename": "/Data/Object4/filling_up02.OZJ", "start": 123255376, "end": 123260167}, {"filename": "/Data/Object4/filling_up03.OZJ", "start": 123260167, "end": 123266250}, {"filename": "/Data/Object4/filling_up04.OZT", "start": 123266250, "end": 123270394}, {"filename": "/Data/Object4/filling_up05.OZT", "start": 123270394, "end": 123278634}, {"filename": "/Data/Object4/flower.OZT", "start": 123278634, "end": 123295066}, {"filename": "/Data/Object4/flower02.OZT", "start": 123295066, "end": 123311498}, {"filename": "/Data/Object4/flower03.OZT", "start": 123311498, "end": 123327930}, {"filename": "/Data/Object4/flower05.OZT", "start": 123327930, "end": 123332074}, {"filename": "/Data/Object4/flower10.OZJ", "start": 123332074, "end": 123338255}, {"filename": "/Data/Object4/flower2.OZJ", "start": 123338255, "end": 123368035}, {"filename": "/Data/Object4/flower3.OZJ", "start": 123368035, "end": 123375669}, {"filename": "/Data/Object4/flower4.OZJ", "start": 123375669, "end": 123384899}, {"filename": "/Data/Object4/flower5.OZJ", "start": 123384899, "end": 123394021}, {"filename": "/Data/Object4/flower6.OZJ", "start": 123394021, "end": 123417577}, {"filename": "/Data/Object4/flower7.OZJ", "start": 123417577, "end": 123447706}, {"filename": "/Data/Object4/flower9.OZJ", "start": 123447706, "end": 123482281}, {"filename": "/Data/Object4/htht01.OZJ", "start": 123482281, "end": 123550279}, {"filename": "/Data/Object4/itp01.OZT", "start": 123550279, "end": 123552375}, {"filename": "/Data/Object4/itp02.OZT", "start": 123552375, "end": 123554471}, {"filename": "/Data/Object4/light01.OZJ", "start": 123554471, "end": 123560408}, {"filename": "/Data/Object4/metal01.OZJ", "start": 123560408, "end": 123566709}, {"filename": "/Data/Object4/ob3.OZJ", "start": 123566709, "end": 123594821}, {"filename": "/Data/Object4/ston001.OZJ", "start": 123594821, "end": 123629674}, {"filename": "/Data/Object4/treea00.OZJ", "start": 123629674, "end": 123666037}, {"filename": "/Data/Object4/treea01.OZT", "start": 123666037, "end": 123674277}, {"filename": "/Data/Object4/treea02.OZJ", "start": 123674277, "end": 123690645}, {"filename": "/Data/Object4/treea03.OZJ", "start": 123690645, "end": 123734262}, {"filename": "/Data/Object4/u2u3.OZJ", "start": 123734262, "end": 123739375}, {"filename": "/Data/Object4/wd.OZJ", "start": 123739375, "end": 123750413}, {"filename": "/Data/Object4/wood001.OZJ", "start": 123750413, "end": 123785317}, {"filename": "/Data/Object4/wood002.OZJ", "start": 123785317, "end": 123821092}, {"filename": "/Data/Object4/wood01.OZJ", "start": 123821092, "end": 123838353}, {"filename": "/Data/Object4/wood02.OZJ", "start": 123838353, "end": 123844293}, {"filename": "/Data/Object4/wood03.OZJ", "start": 123844293, "end": 123861837}, {"filename": "/Data/Object4/yellow_jewel.OZJ", "start": 123861837, "end": 123866778}, {"filename": "/Data/Object5/Bug01.bmd", "start": 123866778, "end": 123882221}, {"filename": "/Data/Object5/Object01.bmd", "start": 123882221, "end": 123913835}, {"filename": "/Data/Object5/Object02.bmd", "start": 123913835, "end": 123932881}, {"filename": "/Data/Object5/Object03.bmd", "start": 123932881, "end": 123969699}, {"filename": "/Data/Object5/Object04.bmd", "start": 123969699, "end": 123983465}, {"filename": "/Data/Object5/Object05.bmd", "start": 123983465, "end": 123988701}, {"filename": "/Data/Object5/Object06.bmd", "start": 123988701, "end": 124001663}, {"filename": "/Data/Object5/Object07.bmd", "start": 124001663, "end": 124007333}, {"filename": "/Data/Object5/Object08.bmd", "start": 124007333, "end": 124015502}, {"filename": "/Data/Object5/Object09.bmd", "start": 124015502, "end": 124019055}, {"filename": "/Data/Object5/Object10.bmd", "start": 124019055, "end": 124021313}, {"filename": "/Data/Object5/Object11.bmd", "start": 124021313, "end": 124088532}, {"filename": "/Data/Object5/Object12.bmd", "start": 124088532, "end": 124160178}, {"filename": "/Data/Object5/Object13.bmd", "start": 124160178, "end": 124220053}, {"filename": "/Data/Object5/Object14.bmd", "start": 124220053, "end": 124225499}, {"filename": "/Data/Object5/Object15.bmd", "start": 124225499, "end": 124229829}, {"filename": "/Data/Object5/Object16.bmd", "start": 124229829, "end": 124234343}, {"filename": "/Data/Object5/Object17.bmd", "start": 124234343, "end": 124273897}, {"filename": "/Data/Object5/Object18.bmd", "start": 124273897, "end": 124298515}, {"filename": "/Data/Object5/Object19.bmd", "start": 124298515, "end": 124319625}, {"filename": "/Data/Object5/Object20.bmd", "start": 124319625, "end": 124360462}, {"filename": "/Data/Object5/Object21.bmd", "start": 124360462, "end": 124401299}, {"filename": "/Data/Object5/Object22.bmd", "start": 124401299, "end": 124407845}, {"filename": "/Data/Object5/Object23.bmd", "start": 124407845, "end": 124414391}, {"filename": "/Data/Object5/Object24.bmd", "start": 124414391, "end": 124425224}, {"filename": "/Data/Object5/Object25.bmd", "start": 124425224, "end": 124426418}, {"filename": "/Data/Object5/Object26.bmd", "start": 124426418, "end": 124427028}, {"filename": "/Data/Object5/Object27.bmd", "start": 124427028, "end": 124491158}, {"filename": "/Data/Object5/Object28.bmd", "start": 124491158, "end": 124626120}, {"filename": "/Data/Object5/Object29.bmd", "start": 124626120, "end": 124684602}, {"filename": "/Data/Object5/Object30.bmd", "start": 124684602, "end": 124766188}, {"filename": "/Data/Object5/Object31.bmd", "start": 124766188, "end": 124775710}, {"filename": "/Data/Object5/Object32.bmd", "start": 124775710, "end": 124785232}, {"filename": "/Data/Object5/Object33.bmd", "start": 124785232, "end": 124798242}, {"filename": "/Data/Object5/Object34.bmd", "start": 124798242, "end": 124807764}, {"filename": "/Data/Object5/Object35.bmd", "start": 124807764, "end": 124858539}, {"filename": "/Data/Object5/Object36.bmd", "start": 124858539, "end": 124909314}, {"filename": "/Data/Object5/Object37.bmd", "start": 124909314, "end": 124960089}, {"filename": "/Data/Object5/Object38.bmd", "start": 124960089, "end": 125010864}, {"filename": "/Data/Object5/Object39.bmd", "start": 125010864, "end": 125018058}, {"filename": "/Data/Object5/Object40.bmd", "start": 125018058, "end": 125019316}, {"filename": "/Data/Object5/bons.OZJ", "start": 125019316, "end": 125047115}, {"filename": "/Data/Object5/d_003.OZJ", "start": 125047115, "end": 125126526}, {"filename": "/Data/Object5/guard_gold2.OZJ", "start": 125126526, "end": 125195958}, {"filename": "/Data/Object5/light01.OZJ", "start": 125195958, "end": 125203538}, {"filename": "/Data/Object5/re02.OZT", "start": 125203538, "end": 125236354}, {"filename": "/Data/Object5/re_008.OZJ", "start": 125236354, "end": 125245539}, {"filename": "/Data/Object5/re_02.OZJ", "start": 125245539, "end": 125291685}, {"filename": "/Data/Object5/re_04.OZJ", "start": 125291685, "end": 125308150}, {"filename": "/Data/Object5/re_05.OZJ", "start": 125308150, "end": 125331163}, {"filename": "/Data/Object5/re_06_2.OZJ", "start": 125331163, "end": 125337129}, {"filename": "/Data/Object5/re_06_3.OZJ", "start": 125337129, "end": 125341921}, {"filename": "/Data/Object5/re_07.OZJ", "start": 125341921, "end": 125377071}, {"filename": "/Data/Object5/re_08.OZJ", "start": 125377071, "end": 125387390}, {"filename": "/Data/Object5/t17.OZJ", "start": 125387390, "end": 125397150}, {"filename": "/Data/Object5/t18.OZJ", "start": 125397150, "end": 125404697}, {"filename": "/Data/Object5/t19.OZJ", "start": 125404697, "end": 125410894}, {"filename": "/Data/Object5/t20.OZJ", "start": 125410894, "end": 125417274}, {"filename": "/Data/Object5/taa01.OZT", "start": 125417274, "end": 125482858}, {"filename": "/Data/Object5/taa02.OZT", "start": 125482858, "end": 125548442}, {"filename": "/Data/Object5/taa03.OZT", "start": 125548442, "end": 125552586}, {"filename": "/Data/Object5/worm.OZT", "start": 125552586, "end": 125556730}, {"filename": "/Data/Object6/Object04.bmd", "start": 125556730, "end": 125561136}, {"filename": "/Data/Object6/Object05.bmd", "start": 125561136, "end": 125572202}, {"filename": "/Data/Object6/Object07.bmd", "start": 125572202, "end": 125635574}, {"filename": "/Data/Object6/Object10.bmd", "start": 125635574, "end": 125640852}, {"filename": "/Data/Object6/Object17.bmd", "start": 125640852, "end": 125648542}, {"filename": "/Data/Object6/Object19.bmd", "start": 125648542, "end": 125668673}, {"filename": "/Data/Object6/Object20.bmd", "start": 125668673, "end": 125682647}, {"filename": "/Data/Object6/Object21.bmd", "start": 125682647, "end": 125716413}, {"filename": "/Data/Object6/Object25.bmd", "start": 125716413, "end": 125754891}, {"filename": "/Data/Object6/Object26.bmd", "start": 125754891, "end": 125768157}, {"filename": "/Data/Object6/Object28.bmd", "start": 125768157, "end": 125777295}, {"filename": "/Data/Object6/Object29.bmd", "start": 125777295, "end": 125785643}, {"filename": "/Data/Object6/Object30.bmd", "start": 125785643, "end": 125794781}, {"filename": "/Data/Object6/Object31.bmd", "start": 125794781, "end": 125882212}, {"filename": "/Data/Object6/Object32.bmd", "start": 125882212, "end": 125889638}, {"filename": "/Data/Object6/Object33.bmd", "start": 125889638, "end": 125897072}, {"filename": "/Data/Object6/Object34.bmd", "start": 125897072, "end": 125899170}, {"filename": "/Data/Object6/Object40.bmd", "start": 125899170, "end": 125993833}, {"filename": "/Data/Object6/Object41.bmd", "start": 125993833, "end": 126073822}, {"filename": "/Data/Object6/TileGround03.OZJ", "start": 126073822, "end": 126099156}, {"filename": "/Data/Object6/bfish07.OZJ", "start": 126099156, "end": 126169827}, {"filename": "/Data/Object6/bfish072.OZJ", "start": 126169827, "end": 126252788}, {"filename": "/Data/Object6/bfish073.OZJ", "start": 126252788, "end": 126330056}, {"filename": "/Data/Object6/hh.OZJ", "start": 126330056, "end": 126342665}, {"filename": "/Data/Object6/ship01.OZJ", "start": 126342665, "end": 126375773}, {"filename": "/Data/Object6/ship03.OZJ", "start": 126375773, "end": 126385560}, {"filename": "/Data/Object6/ship04.OZJ", "start": 126385560, "end": 126401574}, {"filename": "/Data/Object6/ship05.OZJ", "start": 126401574, "end": 126407628}, {"filename": "/Data/Object6/ship05.OZT", "start": 126407628, "end": 126415868}, {"filename": "/Data/Object6/ship06.OZJ", "start": 126415868, "end": 126421155}, {"filename": "/Data/Object6/ship06.OZT", "start": 126421155, "end": 126421459}, {"filename": "/Data/Object6/ship07.OZJ", "start": 126421459, "end": 126461484}, {"filename": "/Data/Object6/ship07.OZT", "start": 126461484, "end": 126462556}, {"filename": "/Data/Object6/sou01.OZJ", "start": 126462556, "end": 126476524}, {"filename": "/Data/Object6/sou02.OZJ", "start": 126476524, "end": 126487606}, {"filename": "/Data/Object6/squid01.OZJ", "start": 126487606, "end": 126521506}, {"filename": "/Data/Object6/squid02.OZJ", "start": 126521506, "end": 126528220}, {"filename": "/Data/Object6/star01.OZJ", "start": 126528220, "end": 126540114}, {"filename": "/Data/Object6/ston00.OZJ", "start": 126540114, "end": 126610619}, {"filename": "/Data/Object6/ston03.OZJ", "start": 126610619, "end": 126707284}, {"filename": "/Data/Object6/ston033.OZJ", "start": 126707284, "end": 126803949}, {"filename": "/Data/Object6/wood00.OZJ", "start": 126803949, "end": 126811228}, {"filename": "/Data/Object6/wood01.OZJ", "start": 126811228, "end": 126823623}, {"filename": "/Data/Object6/wood02.OZJ", "start": 126823623, "end": 126851795}, {"filename": "/Data/Object6/wood03.OZJ", "start": 126851795, "end": 126873288}, {"filename": "/Data/Object6/wood04.OZJ", "start": 126873288, "end": 126910273}, {"filename": "/Data/Object6/wood05.OZJ", "start": 126910273, "end": 127001532}, {"filename": "/Data/Object6/wood052.OZJ", "start": 127001532, "end": 127023456}, {"filename": "/Data/Object6/wooda.OZJ", "start": 127023456, "end": 127048810}, {"filename": "/Data/Object7/Bug01.bmd", "start": 127048810, "end": 127057011}, {"filename": "/Data/Object7/Object01.bmd", "start": 127057011, "end": 127125468}, {"filename": "/Data/Object7/Object02.bmd", "start": 127125468, "end": 127193925}, {"filename": "/Data/Object7/Object03.bmd", "start": 127193925, "end": 127223315}, {"filename": "/Data/Object7/Object04.bmd", "start": 127223315, "end": 127229628}, {"filename": "/Data/Object7/Object05.bmd", "start": 127229628, "end": 127259018}, {"filename": "/Data/Object7/Object06.bmd", "start": 127259018, "end": 127290103}, {"filename": "/Data/Object7/Object07.bmd", "start": 127290103, "end": 127321188}, {"filename": "/Data/Object7/Object08.bmd", "start": 127321188, "end": 127352273}, {"filename": "/Data/Object7/Object09.bmd", "start": 127352273, "end": 127359574}, {"filename": "/Data/Object7/Object10.bmd", "start": 127359574, "end": 127365589}, {"filename": "/Data/Object7/Object11.bmd", "start": 127365589, "end": 127367927}, {"filename": "/Data/Object7/Object12.bmd", "start": 127367927, "end": 127377400}, {"filename": "/Data/Object7/Object13.bmd", "start": 127377400, "end": 127400284}, {"filename": "/Data/Object7/Object14.bmd", "start": 127400284, "end": 127423168}, {"filename": "/Data/Object7/Object15.bmd", "start": 127423168, "end": 127431531}, {"filename": "/Data/Object7/Object16.bmd", "start": 127431531, "end": 127436325}, {"filename": "/Data/Object7/Object17.bmd", "start": 127436325, "end": 127452649}, {"filename": "/Data/Object7/Object18.bmd", "start": 127452649, "end": 127466808}, {"filename": "/Data/Object7/Object19.bmd", "start": 127466808, "end": 127492460}, {"filename": "/Data/Object7/Object20.bmd", "start": 127492460, "end": 127518072}, {"filename": "/Data/Object7/Object21.bmd", "start": 127518072, "end": 127520636}, {"filename": "/Data/Object7/Object22.bmd", "start": 127520636, "end": 127544893}, {"filename": "/Data/Object7/Object23.bmd", "start": 127544893, "end": 127550321}, {"filename": "/Data/Object7/Object24.bmd", "start": 127550321, "end": 127557225}, {"filename": "/Data/Object7/Object25.bmd", "start": 127557225, "end": 127628055}, {"filename": "/Data/Object7/Object26.bmd", "start": 127628055, "end": 127711358}, {"filename": "/Data/Object7/Object27.bmd", "start": 127711358, "end": 127720092}, {"filename": "/Data/Object7/Object28.bmd", "start": 127720092, "end": 127734293}, {"filename": "/Data/Object7/Object29.bmd", "start": 127734293, "end": 127748494}, {"filename": "/Data/Object7/Object30.bmd", "start": 127748494, "end": 127762695}, {"filename": "/Data/Object7/Object31.bmd", "start": 127762695, "end": 127776896}, {"filename": "/Data/Object7/Object32.bmd", "start": 127776896, "end": 127790110}, {"filename": "/Data/Object7/Object33.bmd", "start": 127790110, "end": 127803324}, {"filename": "/Data/Object7/Object34.bmd", "start": 127803324, "end": 127817985}, {"filename": "/Data/Object7/Object35.bmd", "start": 127817985, "end": 127832646}, {"filename": "/Data/Object7/Object36.bmd", "start": 127832646, "end": 127845365}, {"filename": "/Data/Object7/Object37.bmd", "start": 127845365, "end": 127858084}, {"filename": "/Data/Object7/Object38.bmd", "start": 127858084, "end": 127860910}, {"filename": "/Data/Object7/Object39.bmd", "start": 127860910, "end": 127861712}, {"filename": "/Data/Object7/Object40.bmd", "start": 127861712, "end": 127876214}, {"filename": "/Data/Object7/Object41.bmd", "start": 127876214, "end": 127890716}, {"filename": "/Data/Object7/au_01.OZJ", "start": 127890716, "end": 127955552}, {"filename": "/Data/Object7/au_02.OZJ", "start": 127955552, "end": 128019638}, {"filename": "/Data/Object7/au_02.OZT", "start": 128019638, "end": 128020710}, {"filename": "/Data/Object7/au_03.OZJ", "start": 128020710, "end": 128107195}, {"filename": "/Data/Object7/au_03.OZT", "start": 128107195, "end": 128109291}, {"filename": "/Data/Object7/au_04.OZJ", "start": 128109291, "end": 128212196}, {"filename": "/Data/Object7/au_04.OZT", "start": 128212196, "end": 128212756}, {"filename": "/Data/Object7/au_05.OZJ", "start": 128212756, "end": 128310071}, {"filename": "/Data/Object7/au_07.OZJ", "start": 128310071, "end": 128390263}, {"filename": "/Data/Object7/au_09.OZJ", "start": 128390263, "end": 128431052}, {"filename": "/Data/Object7/au_10.OZJ", "start": 128431052, "end": 128533996}, {"filename": "/Data/Object7/au_11.OZJ", "start": 128533996, "end": 128627983}, {"filename": "/Data/Object7/au_12.OZJ", "start": 128627983, "end": 128652944}, {"filename": "/Data/Object7/au_5.OZT", "start": 128652944, "end": 128657088}, {"filename": "/Data/Object7/au_6.OZT", "start": 128657088, "end": 128661232}, {"filename": "/Data/Object7/gggd01.OZT", "start": 128661232, "end": 128665376}, {"filename": "/Data/Object7/gggi01.OZJ", "start": 128665376, "end": 128682017}, {"filename": "/Data/Object7/gggi02.OZJ", "start": 128682017, "end": 128725581}, {"filename": "/Data/Object7/gggi04.OZJ", "start": 128725581, "end": 128765704}, {"filename": "/Data/Object7/gggi05.OZJ", "start": 128765704, "end": 128771642}, {"filename": "/Data/Object7/notice.OZJ", "start": 128771642, "end": 128783514}, {"filename": "/Data/Object7/tree_01.OZT", "start": 128783514, "end": 128787658}, {"filename": "/Data/Object7/tree_02.OZT", "start": 128787658, "end": 128791802}, {"filename": "/Data/Object7/tree_08.OZT", "start": 128791802, "end": 128795946}, {"filename": "/Data/Object7/tree_09.OZT", "start": 128795946, "end": 128804186}, {"filename": "/Data/Object7/water.OZJ", "start": 128804186, "end": 128834758}, {"filename": "/Data/Object8/Fish02.bmd", "start": 128834758, "end": 128839052}, {"filename": "/Data/Object8/Fish03.bmd", "start": 128839052, "end": 128843346}, {"filename": "/Data/Object8/Fish04.bmd", "start": 128843346, "end": 128848248}, {"filename": "/Data/Object8/Fish05.bmd", "start": 128848248, "end": 128853150}, {"filename": "/Data/Object8/Fish06.bmd", "start": 128853150, "end": 128861053}, {"filename": "/Data/Object8/Fish07.bmd", "start": 128861053, "end": 128868956}, {"filename": "/Data/Object8/Fish08.bmd", "start": 128868956, "end": 128886879}, {"filename": "/Data/Object8/Fish09.bmd", "start": 128886879, "end": 128906158}, {"filename": "/Data/Object8/Object01.bmd", "start": 128906158, "end": 129007880}, {"filename": "/Data/Object8/Object02.bmd", "start": 129007880, "end": 129042458}, {"filename": "/Data/Object8/Object03.bmd", "start": 129042458, "end": 129074000}, {"filename": "/Data/Object8/Object04.bmd", "start": 129074000, "end": 129078406}, {"filename": "/Data/Object8/Object05.bmd", "start": 129078406, "end": 129089472}, {"filename": "/Data/Object8/Object06.bmd", "start": 129089472, "end": 129092794}, {"filename": "/Data/Object8/Object07.bmd", "start": 129092794, "end": 129095080}, {"filename": "/Data/Object8/Object08.bmd", "start": 129095080, "end": 129175069}, {"filename": "/Data/Object8/Object09.bmd", "start": 129175069, "end": 129261155}, {"filename": "/Data/Object8/Object10.bmd", "start": 129261155, "end": 129355818}, {"filename": "/Data/Object8/Object11.bmd", "start": 129355818, "end": 129450628}, {"filename": "/Data/Object8/Object12.bmd", "start": 129450628, "end": 129489106}, {"filename": "/Data/Object8/Object13.bmd", "start": 129489106, "end": 129514688}, {"filename": "/Data/Object8/Object14.bmd", "start": 129514688, "end": 129527954}, {"filename": "/Data/Object8/Object15.bmd", "start": 129527954, "end": 129561720}, {"filename": "/Data/Object8/Object16.bmd", "start": 129561720, "end": 129575694}, {"filename": "/Data/Object8/Object17.bmd", "start": 129575694, "end": 129583384}, {"filename": "/Data/Object8/Object18.bmd", "start": 129583384, "end": 129589350}, {"filename": "/Data/Object8/Object19.bmd", "start": 129589350, "end": 129598416}, {"filename": "/Data/Object8/Object20.bmd", "start": 129598416, "end": 129603694}, {"filename": "/Data/Object8/Object21.bmd", "start": 129603694, "end": 129627200}, {"filename": "/Data/Object8/Object22.bmd", "start": 129627200, "end": 129627590}, {"filename": "/Data/Object8/Object23.bmd", "start": 129627590, "end": 129628784}, {"filename": "/Data/Object8/Object24.bmd", "start": 129628784, "end": 129629878}, {"filename": "/Data/Object8/Object25.bmd", "start": 129629878, "end": 129654865}, {"filename": "/Data/Object8/Object26.bmd", "start": 129654865, "end": 129729492}, {"filename": "/Data/Object8/Object27.bmd", "start": 129729492, "end": 129737294}, {"filename": "/Data/Object8/Object28.bmd", "start": 129737294, "end": 129844252}, {"filename": "/Data/Object8/Object29.bmd", "start": 129844252, "end": 129958304}, {"filename": "/Data/Object8/Object30.bmd", "start": 129958304, "end": 129967442}, {"filename": "/Data/Object8/Object31.bmd", "start": 129967442, "end": 129976580}, {"filename": "/Data/Object8/Object32.bmd", "start": 129976580, "end": 129979946}, {"filename": "/Data/Object8/Object33.bmd", "start": 129979946, "end": 129988294}, {"filename": "/Data/Object8/Object34.bmd", "start": 129988294, "end": 129991900}, {"filename": "/Data/Object8/Object35.bmd", "start": 129991900, "end": 130138184}, {"filename": "/Data/Object8/Object36.bmd", "start": 130138184, "end": 130162802}, {"filename": "/Data/Object8/Object37.bmd", "start": 130162802, "end": 130182460}, {"filename": "/Data/Object8/Object38.bmd", "start": 130182460, "end": 130238266}, {"filename": "/Data/Object8/Object39.bmd", "start": 130238266, "end": 130239198}, {"filename": "/Data/Object8/Object40.bmd", "start": 130239198, "end": 130240000}, {"filename": "/Data/Object8/Object41.bmd", "start": 130240000, "end": 130241453}, {"filename": "/Data/Object8/bfish01.OZJ", "start": 130241453, "end": 130253346}, {"filename": "/Data/Object8/bfish02.OZJ", "start": 130253346, "end": 130265087}, {"filename": "/Data/Object8/bfish04.OZJ", "start": 130265087, "end": 130277323}, {"filename": "/Data/Object8/bfish05.OZJ", "start": 130277323, "end": 130290215}, {"filename": "/Data/Object8/bfish06.OZJ", "start": 130290215, "end": 130298916}, {"filename": "/Data/Object8/bfish07.OZJ", "start": 130298916, "end": 130369587}, {"filename": "/Data/Object8/bfish072.OZJ", "start": 130369587, "end": 130452548}, {"filename": "/Data/Object8/bfish073.OZJ", "start": 130452548, "end": 130529816}, {"filename": "/Data/Object8/bfish08.OZJ", "start": 130529816, "end": 130550915}, {"filename": "/Data/Object8/bfish09.OZJ", "start": 130550915, "end": 130571322}, {"filename": "/Data/Object8/bfish10.OZJ", "start": 130571322, "end": 130579531}, {"filename": "/Data/Object8/bons.OZJ", "start": 130579531, "end": 130607330}, {"filename": "/Data/Object8/bu0.OZT", "start": 130607330, "end": 130672914}, {"filename": "/Data/Object8/bu01.OZT", "start": 130672914, "end": 130689346}, {"filename": "/Data/Object8/bu02.OZT", "start": 130689346, "end": 130754930}, {"filename": "/Data/Object8/bu03.OZT", "start": 130754930, "end": 130771362}, {"filename": "/Data/Object8/bu04.OZT", "start": 130771362, "end": 130775506}, {"filename": "/Data/Object8/drop01.OZJ", "start": 130775506, "end": 130782785}, {"filename": "/Data/Object8/ioi01.OZJ", "start": 130782785, "end": 130817914}, {"filename": "/Data/Object8/light01.OZJ", "start": 130817914, "end": 130823851}, {"filename": "/Data/Object8/sea01.OZJ", "start": 130823851, "end": 130895010}, {"filename": "/Data/Object8/star01.OZJ", "start": 130895010, "end": 130906904}, {"filename": "/Data/Object8/ston00.OZJ", "start": 130906904, "end": 130977409}, {"filename": "/Data/Object8/ston033.OZJ", "start": 130977409, "end": 131074074}, {"filename": "/Data/Object8/wood00.OZJ", "start": 131074074, "end": 131081353}, {"filename": "/Data/Object8/wood01.OZJ", "start": 131081353, "end": 131093748}, {"filename": "/Data/Object8/wood02.OZJ", "start": 131093748, "end": 131121920}, {"filename": "/Data/Object8/wood03.OZJ", "start": 131121920, "end": 131143413}, {"filename": "/Data/Object8/wood04.OZJ", "start": 131143413, "end": 131180398}, {"filename": "/Data/Object8/wood05.OZJ", "start": 131180398, "end": 131271657}, {"filename": "/Data/Object8/wood052.OZJ", "start": 131271657, "end": 131293581}, {"filename": "/Data/Object8/wooda.OZJ", "start": 131293581, "end": 131318935}, {"filename": "/Data/Object8/wt00.OZJ", "start": 131318935, "end": 131326555}, {"filename": "/Data/Object8/wt01.OZJ", "start": 131326555, "end": 131334626}, {"filename": "/Data/Object8/wt02.OZJ", "start": 131334626, "end": 131342724}, {"filename": "/Data/Object8/wt03.OZJ", "start": 131342724, "end": 131350877}, {"filename": "/Data/Object8/wt04.OZJ", "start": 131350877, "end": 131358990}, {"filename": "/Data/Object8/wt05.OZJ", "start": 131358990, "end": 131367069}, {"filename": "/Data/Object8/wt06.OZJ", "start": 131367069, "end": 131375163}, {"filename": "/Data/Object8/wt07.OZJ", "start": 131375163, "end": 131383280}, {"filename": "/Data/Object8/wt08.OZJ", "start": 131383280, "end": 131391403}, {"filename": "/Data/Object8/wt09.OZJ", "start": 131391403, "end": 131399537}, {"filename": "/Data/Object8/wt10.OZJ", "start": 131399537, "end": 131407640}, {"filename": "/Data/Object8/wt11.OZJ", "start": 131407640, "end": 131415701}, {"filename": "/Data/Object8/wt12.OZJ", "start": 131415701, "end": 131423794}, {"filename": "/Data/Object8/wt13.OZJ", "start": 131423794, "end": 131431822}, {"filename": "/Data/Object8/wt14.OZJ", "start": 131431822, "end": 131439884}, {"filename": "/Data/Object8/wt15.OZJ", "start": 131439884, "end": 131447928}, {"filename": "/Data/Object8/wt16.OZJ", "start": 131447928, "end": 131455972}, {"filename": "/Data/Object8/wt17.OZJ", "start": 131455972, "end": 131463995}, {"filename": "/Data/Object8/wt18.OZJ", "start": 131463995, "end": 131472050}, {"filename": "/Data/Object8/wt19.OZJ", "start": 131472050, "end": 131480094}, {"filename": "/Data/Object8/wt20.OZJ", "start": 131480094, "end": 131488131}, {"filename": "/Data/Object8/wt21.OZJ", "start": 131488131, "end": 131496209}, {"filename": "/Data/Object8/wt22.OZJ", "start": 131496209, "end": 131504268}, {"filename": "/Data/Object8/wt23.OZJ", "start": 131504268, "end": 131512295}, {"filename": "/Data/Object8/wt24.OZJ", "start": 131512295, "end": 131520317}, {"filename": "/Data/Object8/wt25.OZJ", "start": 131520317, "end": 131528339}, {"filename": "/Data/Object8/wt26.OZJ", "start": 131528339, "end": 131536385}, {"filename": "/Data/Object8/wt27.OZJ", "start": 131536385, "end": 131544437}, {"filename": "/Data/Object8/wt28.OZJ", "start": 131544437, "end": 131552472}, {"filename": "/Data/Object8/wt29.OZJ", "start": 131552472, "end": 131560520}, {"filename": "/Data/Object8/wt30.OZJ", "start": 131560520, "end": 131568591}, {"filename": "/Data/Object8/wt31.OZJ", "start": 131568591, "end": 131576678}, {"filename": "/Data/Object9/Bug02.bmd", "start": 131576678, "end": 131579491}, {"filename": "/Data/Object9/DDD.OZJ", "start": 131579491, "end": 131583500}, {"filename": "/Data/Object9/Df.OZT", "start": 131583500, "end": 131616316}, {"filename": "/Data/Object9/Dr.OZT", "start": 131616316, "end": 131620460}, {"filename": "/Data/Object9/Impack03.OZJ", "start": 131620460, "end": 131631750}, {"filename": "/Data/Object9/Object02.bmd", "start": 131631750, "end": 131675236}, {"filename": "/Data/Object9/Object03.bmd", "start": 131675236, "end": 131682790}, {"filename": "/Data/Object9/Object06.bmd", "start": 131682790, "end": 131726256}, {"filename": "/Data/Object9/Object07.bmd", "start": 131726256, "end": 131729940}, {"filename": "/Data/Object9/Object08.bmd", "start": 131729940, "end": 131730330}, {"filename": "/Data/Object9/Object09.bmd", "start": 131730330, "end": 131735734}, {"filename": "/Data/Object9/Object10.bmd", "start": 131735734, "end": 131757716}, {"filename": "/Data/Object9/Object11.bmd", "start": 131757716, "end": 131767974}, {"filename": "/Data/Object9/Object12.bmd", "start": 131767974, "end": 131778176}, {"filename": "/Data/Object9/Object13.bmd", "start": 131778176, "end": 131786092}, {"filename": "/Data/Object9/Object14.bmd", "start": 131786092, "end": 131796294}, {"filename": "/Data/Object9/Object15.bmd", "start": 131796294, "end": 131811710}, {"filename": "/Data/Object9/Object16.bmd", "start": 131811710, "end": 131824924}, {"filename": "/Data/Object9/Object17.bmd", "start": 131824924, "end": 131838138}, {"filename": "/Data/Object9/Object18.bmd", "start": 131838138, "end": 131852799}, {"filename": "/Data/Object9/Object19.bmd", "start": 131852799, "end": 131867460}, {"filename": "/Data/Object9/Object20.bmd", "start": 131867460, "end": 131880179}, {"filename": "/Data/Object9/Object21.bmd", "start": 131880179, "end": 131890717}, {"filename": "/Data/Object9/Object22.bmd", "start": 131890717, "end": 131902347}, {"filename": "/Data/Object9/Object23.bmd", "start": 131902347, "end": 131907581}, {"filename": "/Data/Object9/Object24.bmd", "start": 131907581, "end": 131912191}, {"filename": "/Data/Object9/Object25.bmd", "start": 131912191, "end": 131925701}, {"filename": "/Data/Object9/Object26.bmd", "start": 131925701, "end": 131935435}, {"filename": "/Data/Object9/Object27.bmd", "start": 131935435, "end": 131939457}, {"filename": "/Data/Object9/Object28.bmd", "start": 131939457, "end": 131944019}, {"filename": "/Data/Object9/Object29.bmd", "start": 131944019, "end": 131947985}, {"filename": "/Data/Object9/Object30.bmd", "start": 131947985, "end": 132000411}, {"filename": "/Data/Object9/Object31.bmd", "start": 132000411, "end": 132003994}, {"filename": "/Data/Object9/Object32.bmd", "start": 132003994, "end": 132021232}, {"filename": "/Data/Object9/Object33.bmd", "start": 132021232, "end": 132038470}, {"filename": "/Data/Object9/Object34.bmd", "start": 132038470, "end": 132074706}, {"filename": "/Data/Object9/Object37.bmd", "start": 132074706, "end": 132095944}, {"filename": "/Data/Object9/Object38.bmd", "start": 132095944, "end": 132106310}, {"filename": "/Data/Object9/Object40.bmd", "start": 132106310, "end": 132110624}, {"filename": "/Data/Object9/Object41.bmd", "start": 132110624, "end": 132122534}, {"filename": "/Data/Object9/Object42.bmd", "start": 132122534, "end": 132129024}, {"filename": "/Data/Object9/Object43.bmd", "start": 132129024, "end": 132137086}, {"filename": "/Data/Object9/Object44.bmd", "start": 132137086, "end": 132142252}, {"filename": "/Data/Object9/Object45.bmd", "start": 132142252, "end": 132156254}, {"filename": "/Data/Object9/Object46.bmd", "start": 132156254, "end": 132164084}, {"filename": "/Data/Object9/Object47.bmd", "start": 132164084, "end": 132179850}, {"filename": "/Data/Object9/Object48.bmd", "start": 132179850, "end": 132187712}, {"filename": "/Data/Object9/Object49.bmd", "start": 132187712, "end": 132231002}, {"filename": "/Data/Object9/Object50.bmd", "start": 132231002, "end": 132262032}, {"filename": "/Data/Object9/Object51.bmd", "start": 132262032, "end": 132383891}, {"filename": "/Data/Object9/Object52.bmd", "start": 132383891, "end": 132403705}, {"filename": "/Data/Object9/Object53.bmd", "start": 132403705, "end": 132410943}, {"filename": "/Data/Object9/Object54.bmd", "start": 132410943, "end": 132412393}, {"filename": "/Data/Object9/Object55.bmd", "start": 132412393, "end": 132427805}, {"filename": "/Data/Object9/Object56.bmd", "start": 132427805, "end": 132432035}, {"filename": "/Data/Object9/Object57.bmd", "start": 132432035, "end": 132443289}, {"filename": "/Data/Object9/Object58.bmd", "start": 132443289, "end": 132622781}, {"filename": "/Data/Object9/Object59.bmd", "start": 132622781, "end": 132629279}, {"filename": "/Data/Object9/Object60.bmd", "start": 132629279, "end": 132637394}, {"filename": "/Data/Object9/Object61.bmd", "start": 132637394, "end": 132638588}, {"filename": "/Data/Object9/Object62.bmd", "start": 132638588, "end": 132650864}, {"filename": "/Data/Object9/Object63.bmd", "start": 132650864, "end": 132661302}, {"filename": "/Data/Object9/Object64.bmd", "start": 132661302, "end": 132662614}, {"filename": "/Data/Object9/Object66.bmd", "start": 132662614, "end": 132676396}, {"filename": "/Data/Object9/Object67.bmd", "start": 132676396, "end": 132690178}, {"filename": "/Data/Object9/Object68.bmd", "start": 132690178, "end": 132703960}, {"filename": "/Data/Object9/Object69.bmd", "start": 132703960, "end": 132771814}, {"filename": "/Data/Object9/Object70.bmd", "start": 132771814, "end": 132835500}, {"filename": "/Data/Object9/Object71.bmd", "start": 132835500, "end": 132836694}, {"filename": "/Data/Object9/Object72.bmd", "start": 132836694, "end": 132927412}, {"filename": "/Data/Object9/Object73.bmd", "start": 132927412, "end": 132937614}, {"filename": "/Data/Object9/Object74.bmd", "start": 132937614, "end": 132947816}, {"filename": "/Data/Object9/Object75.bmd", "start": 132947816, "end": 133015670}, {"filename": "/Data/Object9/Object76.bmd", "start": 133015670, "end": 133025872}, {"filename": "/Data/Object9/Object77.bmd", "start": 133025872, "end": 133027066}, {"filename": "/Data/Object9/Object78.bmd", "start": 133027066, "end": 133028260}, {"filename": "/Data/Object9/Object79.bmd", "start": 133028260, "end": 133049498}, {"filename": "/Data/Object9/Object80.bmd", "start": 133049498, "end": 133059700}, {"filename": "/Data/Object9/Object81.bmd", "start": 133059700, "end": 133064366}, {"filename": "/Data/Object9/Object82.bmd", "start": 133064366, "end": 133067100}, {"filename": "/Data/Object9/Object83.bmd", "start": 133067100, "end": 133068032}, {"filename": "/Data/Object9/Object84.bmd", "start": 133068032, "end": 133069226}, {"filename": "/Data/Object9/R.OZJ", "start": 133069226, "end": 133071817}, {"filename": "/Data/Object9/arrow.OZT", "start": 133071817, "end": 133072121}, {"filename": "/Data/Object9/bug.OZJ", "start": 133072121, "end": 133074212}, {"filename": "/Data/Object9/casket.OZJ", "start": 133074212, "end": 133087495}, {"filename": "/Data/Object9/cl.OZT", "start": 133087495, "end": 133091639}, {"filename": "/Data/Object9/col.OZJ", "start": 133091639, "end": 133129754}, {"filename": "/Data/Object9/col2.OZJ", "start": 133129754, "end": 133137400}, {"filename": "/Data/Object9/face.OZJ", "start": 133137400, "end": 133205290}, {"filename": "/Data/Object9/face2.OZJ", "start": 133205290, "end": 133264092}, {"filename": "/Data/Object9/finger.OZJ", "start": 133264092, "end": 133274774}, {"filename": "/Data/Object9/finger1.OZJ", "start": 133274774, "end": 133285429}, {"filename": "/Data/Object9/flag.OZJ", "start": 133285429, "end": 133290530}, {"filename": "/Data/Object9/flag.OZT", "start": 133290530, "end": 133323346}, {"filename": "/Data/Object9/gaer.OZJ", "start": 133323346, "end": 133350728}, {"filename": "/Data/Object9/gear.OZT", "start": 133350728, "end": 133612920}, {"filename": "/Data/Object9/gearB.OZJ", "start": 133612920, "end": 133615769}, {"filename": "/Data/Object9/hand1.OZJ", "start": 133615769, "end": 133648181}, {"filename": "/Data/Object9/light01.OZJ", "start": 133648181, "end": 133654118}, {"filename": "/Data/Object9/p.OZT", "start": 133654118, "end": 133658262}, {"filename": "/Data/Object9/redB.OZJ", "start": 133658262, "end": 133685676}, {"filename": "/Data/Object9/sand01.OZJ", "start": 133685676, "end": 133707028}, {"filename": "/Data/Object9/sand02.OZJ", "start": 133707028, "end": 133757046}, {"filename": "/Data/Object9/sf.OZJ", "start": 133757046, "end": 133788451}, {"filename": "/Data/Object9/sf2.OZJ", "start": 133788451, "end": 133847788}, {"filename": "/Data/Object9/sf3.OZJ", "start": 133847788, "end": 133871513}, {"filename": "/Data/Object9/sf4.OZJ", "start": 133871513, "end": 133889867}, {"filename": "/Data/Object9/statue.OZJ", "start": 133889867, "end": 133910123}, {"filename": "/Data/Object9/statue2.OZJ", "start": 133910123, "end": 133930024}, {"filename": "/Data/Object9/ston.OZJ", "start": 133930024, "end": 133993589}, {"filename": "/Data/Object9/ston2.OZJ", "start": 133993589, "end": 134027059}, {"filename": "/Data/Object9/stonD.OZJ", "start": 134027059, "end": 134042693}, {"filename": "/Data/Object9/test1.OZT", "start": 134042693, "end": 134050933}, {"filename": "/Data/Object9/test12.OZJ", "start": 134050933, "end": 134077196}, {"filename": "/Data/Object9/test15.OZT", "start": 134077196, "end": 134085436}, {"filename": "/Data/Object9/test16.OZJ", "start": 134085436, "end": 134119083}, {"filename": "/Data/Object9/test17.OZJ", "start": 134119083, "end": 134154808}, {"filename": "/Data/Object9/test18.OZJ", "start": 134154808, "end": 134205812}, {"filename": "/Data/Object9/test2.OZJ", "start": 134205812, "end": 134221963}, {"filename": "/Data/Object9/test2.OZT", "start": 134221963, "end": 134287547}, {"filename": "/Data/Object9/test20.OZJ", "start": 134287547, "end": 134310433}, {"filename": "/Data/Object9/test22.OZJ", "start": 134310433, "end": 134418122}, {"filename": "/Data/Object9/test23.OZJ", "start": 134418122, "end": 134521420}, {"filename": "/Data/Object9/test24.OZJ", "start": 134521420, "end": 134623768}, {"filename": "/Data/Object9/test3.OZJ", "start": 134623768, "end": 134639322}, {"filename": "/Data/Object9/test37.OZJ", "start": 134639322, "end": 134648306}, {"filename": "/Data/Object9/test4.OZJ", "start": 134648306, "end": 134665469}, {"filename": "/Data/Object9/tree_01.OZT", "start": 134665469, "end": 134669613}, {"filename": "/Data/Object9/tree_02.OZT", "start": 134669613, "end": 134673757}, {"filename": "/Data/Object9/tree_08.OZT", "start": 134673757, "end": 134677901}, {"filename": "/Data/Object9/tree_09.OZT", "start": 134677901, "end": 134686141}, {"filename": "/Data/Player/Angel.bmd", "start": 134686141, "end": 134753387}, {"filename": "/Data/Player/ArmorClass01.bmd", "start": 134753387, "end": 134770150}, {"filename": "/Data/Player/ArmorClass02.bmd", "start": 134770150, "end": 134783913}, {"filename": "/Data/Player/ArmorClass03.bmd", "start": 134783913, "end": 134797676}, {"filename": "/Data/Player/ArmorClass04.bmd", "start": 134797676, "end": 134814439}, {"filename": "/Data/Player/ArmorClass05.bmd", "start": 134814439, "end": 134842979}, {"filename": "/Data/Player/ArmorClass201.bmd", "start": 134842979, "end": 134859679}, {"filename": "/Data/Player/ArmorClass202.bmd", "start": 134859679, "end": 134873379}, {"filename": "/Data/Player/ArmorClass203.bmd", "start": 134873379, "end": 134886751}, {"filename": "/Data/Player/ArmorElf01.bmd", "start": 134886751, "end": 134905230}, {"filename": "/Data/Player/ArmorElf02.bmd", "start": 134905230, "end": 134923277}, {"filename": "/Data/Player/ArmorElf03.bmd", "start": 134923277, "end": 134948396}, {"filename": "/Data/Player/ArmorElf04.bmd", "start": 134948396, "end": 134969333}, {"filename": "/Data/Player/ArmorElf05.bmd", "start": 134969333, "end": 134994988}, {"filename": "/Data/Player/ArmorMale01.bmd", "start": 134994988, "end": 135013713}, {"filename": "/Data/Player/ArmorMale02.bmd", "start": 135013713, "end": 135041328}, {"filename": "/Data/Player/ArmorMale03.bmd", "start": 135041328, "end": 135059047}, {"filename": "/Data/Player/ArmorMale04.bmd", "start": 135059047, "end": 135077960}, {"filename": "/Data/Player/ArmorMale05.bmd", "start": 135077960, "end": 135097833}, {"filename": "/Data/Player/ArmorMale06.bmd", "start": 135097833, "end": 135118454}, {"filename": "/Data/Player/ArmorMale07.bmd", "start": 135118454, "end": 135138547}, {"filename": "/Data/Player/ArmorMale08.bmd", "start": 135138547, "end": 135164682}, {"filename": "/Data/Player/ArmorMale09.bmd", "start": 135164682, "end": 135184633}, {"filename": "/Data/Player/ArmorMale10.bmd", "start": 135184633, "end": 135207046}, {"filename": "/Data/Player/ArmorMale16.bmd", "start": 135207046, "end": 135232091}, {"filename": "/Data/Player/ArmorMale17.bmd", "start": 135232091, "end": 135259366}, {"filename": "/Data/Player/ArmorMale18.bmd", "start": 135259366, "end": 135299689}, {"filename": "/Data/Player/ArmorMale19.bmd", "start": 135299689, "end": 135320490}, {"filename": "/Data/Player/ArmorMale20.bmd", "start": 135320490, "end": 135358545}, {"filename": "/Data/Player/ArmorMale21.bmd", "start": 135358545, "end": 135396551}, {"filename": "/Data/Player/ArmorMale22.bmd", "start": 135396551, "end": 135435925}, {"filename": "/Data/Player/ArmorMale23.bmd", "start": 135435925, "end": 135463909}, {"filename": "/Data/Player/ArmorMale24.bmd", "start": 135463909, "end": 135507379}, {"filename": "/Data/Player/ArmorMale25.bmd", "start": 135507379, "end": 135551869}, {"filename": "/Data/Player/ArmorMale26.bmd", "start": 135551869, "end": 135582527}, {"filename": "/Data/Player/ArmorMale27.bmd", "start": 135582527, "end": 135628807}, {"filename": "/Data/Player/ArmorMale28.bmd", "start": 135628807, "end": 135665303}, {"filename": "/Data/Player/ArmorMale29.bmd", "start": 135665303, "end": 135719343}, {"filename": "/Data/Player/BootClass01.bmd", "start": 135719343, "end": 135733146}, {"filename": "/Data/Player/BootClass02.bmd", "start": 135733146, "end": 135746949}, {"filename": "/Data/Player/BootClass03.bmd", "start": 135746949, "end": 135759104}, {"filename": "/Data/Player/BootClass04.bmd", "start": 135759104, "end": 135773819}, {"filename": "/Data/Player/BootClass05.bmd", "start": 135773819, "end": 135791471}, {"filename": "/Data/Player/BootClass201.bmd", "start": 135791471, "end": 135811643}, {"filename": "/Data/Player/BootClass202.bmd", "start": 135811643, "end": 135824615}, {"filename": "/Data/Player/BootClass203.bmd", "start": 135824615, "end": 135838819}, {"filename": "/Data/Player/BootElf01.bmd", "start": 135838819, "end": 135853434}, {"filename": "/Data/Player/BootElf02.bmd", "start": 135853434, "end": 135867471}, {"filename": "/Data/Player/BootElf03.bmd", "start": 135867471, "end": 135881156}, {"filename": "/Data/Player/BootElf04.bmd", "start": 135881156, "end": 135897331}, {"filename": "/Data/Player/BootElf05.bmd", "start": 135897331, "end": 135913246}, {"filename": "/Data/Player/BootMale01.bmd", "start": 135913246, "end": 135930993}, {"filename": "/Data/Player/BootMale02.bmd", "start": 135930993, "end": 135946876}, {"filename": "/Data/Player/BootMale03.bmd", "start": 135946876, "end": 135961883}, {"filename": "/Data/Player/BootMale04.bmd", "start": 135961883, "end": 135976708}, {"filename": "/Data/Player/BootMale05.bmd", "start": 135976708, "end": 135990697}, {"filename": "/Data/Player/BootMale06.bmd", "start": 135990697, "end": 136004718}, {"filename": "/Data/Player/BootMale07.bmd", "start": 136004718, "end": 136020931}, {"filename": "/Data/Player/BootMale08.bmd", "start": 136020931, "end": 136034560}, {"filename": "/Data/Player/BootMale09.bmd", "start": 136034560, "end": 136050373}, {"filename": "/Data/Player/BootMale10.bmd", "start": 136050373, "end": 136069744}, {"filename": "/Data/Player/BootMale16.bmd", "start": 136069744, "end": 136087527}, {"filename": "/Data/Player/BootMale17.bmd", "start": 136087527, "end": 136105942}, {"filename": "/Data/Player/BootMale18.bmd", "start": 136105942, "end": 136127083}, {"filename": "/Data/Player/BootMale19.bmd", "start": 136127083, "end": 136143508}, {"filename": "/Data/Player/BootMale20.bmd", "start": 136143508, "end": 136170379}, {"filename": "/Data/Player/BootMale21.bmd", "start": 136170379, "end": 136191245}, {"filename": "/Data/Player/BootMale22.bmd", "start": 136191245, "end": 136219557}, {"filename": "/Data/Player/BootMale23.bmd", "start": 136219557, "end": 136237349}, {"filename": "/Data/Player/BootMale24.bmd", "start": 136237349, "end": 136259397}, {"filename": "/Data/Player/BootMale25.bmd", "start": 136259397, "end": 136280863}, {"filename": "/Data/Player/BootMale26.bmd", "start": 136280863, "end": 136296535}, {"filename": "/Data/Player/BootMale27.bmd", "start": 136296535, "end": 136324455}, {"filename": "/Data/Player/BootMale28.bmd", "start": 136324455, "end": 136347813}, {"filename": "/Data/Player/BootMale29.bmd", "start": 136347813, "end": 136372645}, {"filename": "/Data/Player/Custom/21/ArmorMale22.bmd", "start": 136372645, "end": 136412019}, {"filename": "/Data/Player/Custom/21/BootMale22.bmd", "start": 136412019, "end": 136440331}, {"filename": "/Data/Player/Custom/21/GloveMale22.bmd", "start": 136440331, "end": 136460757}, {"filename": "/Data/Player/Custom/21/HelmMale22.bmd", "start": 136460757, "end": 136485269}, {"filename": "/Data/Player/Custom/21/PantMale22.bmd", "start": 136485269, "end": 136500331}, {"filename": "/Data/Player/Custom/21/boots22.OZJ", "start": 136500331, "end": 136519417}, {"filename": "/Data/Player/Custom/21/glove22.OZJ", "start": 136519417, "end": 136536262}, {"filename": "/Data/Player/Custom/21/head22.OZJ", "start": 136536262, "end": 136553849}, {"filename": "/Data/Player/Custom/21/hide.OZJ", "start": 136553849, "end": 136558405}, {"filename": "/Data/Player/Custom/21/level_man01.OZJ", "start": 136558405, "end": 136635219}, {"filename": "/Data/Player/Custom/21/pants22.OZJ", "start": 136635219, "end": 136669664}, {"filename": "/Data/Player/Custom/21/pants22.OZT", "start": 136669664, "end": 136686096}, {"filename": "/Data/Player/Custom/21/upper22.OZJ", "start": 136686096, "end": 136730713}, {"filename": "/Data/Player/DarklordRobe.OZT", "start": 136730713, "end": 136861833}, {"filename": "/Data/Player/E_head.OZT", "start": 136861833, "end": 136870073}, {"filename": "/Data/Player/FArmor.OZJ", "start": 136870073, "end": 136912411}, {"filename": "/Data/Player/FBoots.OZJ", "start": 136912411, "end": 136929215}, {"filename": "/Data/Player/FGlove.OZJ", "start": 136929215, "end": 136946395}, {"filename": "/Data/Player/FHelm.OZJ", "start": 136946395, "end": 136965189}, {"filename": "/Data/Player/FPants01.OZJ", "start": 136965189, "end": 136989173}, {"filename": "/Data/Player/FPants02.OZJ", "start": 136989173, "end": 137013561}, {"filename": "/Data/Player/FShoots.OZT", "start": 137013561, "end": 137021801}, {"filename": "/Data/Player/FShoots02.OZT", "start": 137021801, "end": 137030041}, {"filename": "/Data/Player/FShoots_R.OZJ", "start": 137030041, "end": 137040602}, {"filename": "/Data/Player/GloveClass01.bmd", "start": 137040602, "end": 137054781}, {"filename": "/Data/Player/GloveClass02.bmd", "start": 137054781, "end": 137068960}, {"filename": "/Data/Player/GloveClass03.bmd", "start": 137068960, "end": 137083107}, {"filename": "/Data/Player/GloveClass04.bmd", "start": 137083107, "end": 137097286}, {"filename": "/Data/Player/GloveClass05.bmd", "start": 137097286, "end": 137116342}, {"filename": "/Data/Player/GloveClass201.bmd", "start": 137116342, "end": 137130458}, {"filename": "/Data/Player/GloveClass202.bmd", "start": 137130458, "end": 137144574}, {"filename": "/Data/Player/GloveClass203.bmd", "start": 137144574, "end": 137158658}, {"filename": "/Data/Player/GloveElf01.bmd", "start": 137158658, "end": 137175127}, {"filename": "/Data/Player/GloveElf02.bmd", "start": 137175127, "end": 137191016}, {"filename": "/Data/Player/GloveElf03.bmd", "start": 137191016, "end": 137207061}, {"filename": "/Data/Player/GloveElf04.bmd", "start": 137207061, "end": 137224256}, {"filename": "/Data/Player/GloveElf05.bmd", "start": 137224256, "end": 137240827}, {"filename": "/Data/Player/GloveMale01.bmd", "start": 137240827, "end": 137260718}, {"filename": "/Data/Player/GloveMale02.bmd", "start": 137260718, "end": 137277257}, {"filename": "/Data/Player/GloveMale03.bmd", "start": 137277257, "end": 137293750}, {"filename": "/Data/Player/GloveMale04.bmd", "start": 137293750, "end": 137311859}, {"filename": "/Data/Player/GloveMale05.bmd", "start": 137311859, "end": 137328592}, {"filename": "/Data/Player/GloveMale06.bmd", "start": 137328592, "end": 137344645}, {"filename": "/Data/Player/GloveMale07.bmd", "start": 137344645, "end": 137362922}, {"filename": "/Data/Player/GloveMale08.bmd", "start": 137362922, "end": 137378967}, {"filename": "/Data/Player/GloveMale09.bmd", "start": 137378967, "end": 137395414}, {"filename": "/Data/Player/GloveMale10.bmd", "start": 137395414, "end": 137413857}, {"filename": "/Data/Player/GloveMale16.bmd", "start": 137413857, "end": 137430692}, {"filename": "/Data/Player/GloveMale17.bmd", "start": 137430692, "end": 137448201}, {"filename": "/Data/Player/GloveMale18.bmd", "start": 137448201, "end": 137476022}, {"filename": "/Data/Player/GloveMale19.bmd", "start": 137476022, "end": 137495419}, {"filename": "/Data/Player/GloveMale20.bmd", "start": 137495419, "end": 137516362}, {"filename": "/Data/Player/GloveMale21.bmd", "start": 137516362, "end": 137535304}, {"filename": "/Data/Player/GloveMale22.bmd", "start": 137535304, "end": 137555730}, {"filename": "/Data/Player/GloveMale23.bmd", "start": 137555730, "end": 137580698}, {"filename": "/Data/Player/GloveMale24.bmd", "start": 137580698, "end": 137599506}, {"filename": "/Data/Player/GloveMale25.bmd", "start": 137599506, "end": 137619908}, {"filename": "/Data/Player/GloveMale26.bmd", "start": 137619908, "end": 137636564}, {"filename": "/Data/Player/GloveMale27.bmd", "start": 137636564, "end": 137657628}, {"filename": "/Data/Player/GloveMale28.bmd", "start": 137657628, "end": 137675854}, {"filename": "/Data/Player/GloveMale29.bmd", "start": 137675854, "end": 137692254}, {"filename": "/Data/Player/HelmClass01.bmd", "start": 137692254, "end": 137705385}, {"filename": "/Data/Player/HelmClass02.bmd", "start": 137705385, "end": 137719416}, {"filename": "/Data/Player/HelmClass03.bmd", "start": 137719416, "end": 137733991}, {"filename": "/Data/Player/HelmClass04.bmd", "start": 137733991, "end": 137751394}, {"filename": "/Data/Player/HelmClass05.bmd", "start": 137751394, "end": 137770536}, {"filename": "/Data/Player/HelmClass201.bmd", "start": 137770536, "end": 137783644}, {"filename": "/Data/Player/HelmClass202.bmd", "start": 137783644, "end": 137797504}, {"filename": "/Data/Player/HelmClass203.bmd", "start": 137797504, "end": 137813936}, {"filename": "/Data/Player/HelmElf01.bmd", "start": 137813936, "end": 137822791}, {"filename": "/Data/Player/HelmElf02.bmd", "start": 137822791, "end": 137829714}, {"filename": "/Data/Player/HelmElf03.bmd", "start": 137829714, "end": 137836429}, {"filename": "/Data/Player/HelmElf04.bmd", "start": 137836429, "end": 137845868}, {"filename": "/Data/Player/HelmElf05.bmd", "start": 137845868, "end": 137864097}, {"filename": "/Data/Player/HelmMale01.bmd", "start": 137864097, "end": 137873662}, {"filename": "/Data/Player/HelmMale02.bmd", "start": 137873662, "end": 137893995}, {"filename": "/Data/Player/HelmMale03.bmd", "start": 137893995, "end": 137905856}, {"filename": "/Data/Player/HelmMale04.bmd", "start": 137905856, "end": 137918901}, {"filename": "/Data/Player/HelmMale05.bmd", "start": 137918901, "end": 137932722}, {"filename": "/Data/Player/HelmMale06.bmd", "start": 137932722, "end": 137946365}, {"filename": "/Data/Player/HelmMale07.bmd", "start": 137946365, "end": 137962780}, {"filename": "/Data/Player/HelmMale08.bmd", "start": 137962780, "end": 137980101}, {"filename": "/Data/Player/HelmMale09.bmd", "start": 137980101, "end": 137989740}, {"filename": "/Data/Player/HelmMale10.bmd", "start": 137989740, "end": 137996663}, {"filename": "/Data/Player/HelmMale17.bmd", "start": 137996663, "end": 138017124}, {"filename": "/Data/Player/HelmMale18.bmd", "start": 138017124, "end": 138042729}, {"filename": "/Data/Player/HelmMale19.bmd", "start": 138042729, "end": 138057158}, {"filename": "/Data/Player/HelmMale20.bmd", "start": 138057158, "end": 138089501}, {"filename": "/Data/Player/HelmMale22.bmd", "start": 138089501, "end": 138114013}, {"filename": "/Data/Player/HelmMale23.bmd", "start": 138114013, "end": 138128877}, {"filename": "/Data/Player/HelmMale25.bmd", "start": 138128877, "end": 138176771}, {"filename": "/Data/Player/HelmMale26.bmd", "start": 138176771, "end": 138200719}, {"filename": "/Data/Player/HelmMale27.bmd", "start": 138200719, "end": 138231783}, {"filename": "/Data/Player/HelmMale28.bmd", "start": 138231783, "end": 138255363}, {"filename": "/Data/Player/HelmMale29.bmd", "start": 138255363, "end": 138281319}, {"filename": "/Data/Player/Helper01.bmd", "start": 138281319, "end": 138287572}, {"filename": "/Data/Player/Helper02.bmd", "start": 138287572, "end": 138294469}, {"filename": "/Data/Player/Helper03.bmd", "start": 138294469, "end": 138299376}, {"filename": "/Data/Player/Helper04.bmd", "start": 138299376, "end": 138303445}, {"filename": "/Data/Player/KSbp.OZJ", "start": 138303445, "end": 138317746}, {"filename": "/Data/Player/KSgp.OZJ", "start": 138317746, "end": 138325371}, {"filename": "/Data/Player/KShp.OZJ", "start": 138325371, "end": 138333717}, {"filename": "/Data/Player/KSlp.OZJ", "start": 138333717, "end": 138359645}, {"filename": "/Data/Player/KSup.OZJ", "start": 138359645, "end": 138389493}, {"filename": "/Data/Player/KSup2.OZT", "start": 138389493, "end": 138405925}, {"filename": "/Data/Player/Kbpp.OZJ", "start": 138405925, "end": 138419420}, {"filename": "/Data/Player/Kgpp.OZJ", "start": 138419420, "end": 138427473}, {"filename": "/Data/Player/Klpp.OZJ", "start": 138427473, "end": 138453231}, {"filename": "/Data/Player/Kmpp.OZJ", "start": 138453231, "end": 138461381}, {"filename": "/Data/Player/Kupp.OZJ", "start": 138461381, "end": 138489499}, {"filename": "/Data/Player/MaskHelmMale01.bmd", "start": 138489499, "end": 138515500}, {"filename": "/Data/Player/MaskHelmMale06.bmd", "start": 138515500, "end": 138538171}, {"filename": "/Data/Player/MaskHelmMale07.bmd", "start": 138538171, "end": 138565412}, {"filename": "/Data/Player/MaskHelmMale09.bmd", "start": 138565412, "end": 138580007}, {"filename": "/Data/Player/MaskHelmMale10.bmd", "start": 138580007, "end": 138602484}, {"filename": "/Data/Player/PantClass01.bmd", "start": 138602484, "end": 138616439}, {"filename": "/Data/Player/PantClass02.bmd", "start": 138616439, "end": 138628670}, {"filename": "/Data/Player/PantClass03.bmd", "start": 138628670, "end": 138641677}, {"filename": "/Data/Player/PantClass04.bmd", "start": 138641677, "end": 138653028}, {"filename": "/Data/Player/PantClass05.bmd", "start": 138653028, "end": 138666016}, {"filename": "/Data/Player/PantClass201.bmd", "start": 138666016, "end": 138679908}, {"filename": "/Data/Player/PantClass202.bmd", "start": 138679908, "end": 138692076}, {"filename": "/Data/Player/PantClass203.bmd", "start": 138692076, "end": 138705020}, {"filename": "/Data/Player/PantElf01.bmd", "start": 138705020, "end": 138720989}, {"filename": "/Data/Player/PantElf02.bmd", "start": 138720989, "end": 138736370}, {"filename": "/Data/Player/PantElf03.bmd", "start": 138736370, "end": 138754859}, {"filename": "/Data/Player/PantElf04.bmd", "start": 138754859, "end": 138767956}, {"filename": "/Data/Player/PantElf05.bmd", "start": 138767956, "end": 138783903}, {"filename": "/Data/Player/PantMale01.bmd", "start": 138783903, "end": 138798112}, {"filename": "/Data/Player/PantMale02.bmd", "start": 138798112, "end": 138812185}, {"filename": "/Data/Player/PantMale03.bmd", "start": 138812185, "end": 138828174}, {"filename": "/Data/Player/PantMale04.bmd", "start": 138828174, "end": 138842921}, {"filename": "/Data/Player/PantMale05.bmd", "start": 138842921, "end": 138857552}, {"filename": "/Data/Player/PantMale06.bmd", "start": 138857552, "end": 138871937}, {"filename": "/Data/Player/PantMale07.bmd", "start": 138871937, "end": 138885454}, {"filename": "/Data/Player/PantMale08.bmd", "start": 138885454, "end": 138901825}, {"filename": "/Data/Player/PantMale09.bmd", "start": 138901825, "end": 138916332}, {"filename": "/Data/Player/PantMale10.bmd", "start": 138916332, "end": 138928309}, {"filename": "/Data/Player/PantMale16.bmd", "start": 138928309, "end": 138940286}, {"filename": "/Data/Player/PantMale17.bmd", "start": 138940286, "end": 138954767}, {"filename": "/Data/Player/PantMale18.bmd", "start": 138954767, "end": 138976232}, {"filename": "/Data/Player/PantMale19.bmd", "start": 138976232, "end": 138989689}, {"filename": "/Data/Player/PantMale20.bmd", "start": 138989689, "end": 139033454}, {"filename": "/Data/Player/PantMale21.bmd", "start": 139033454, "end": 139054274}, {"filename": "/Data/Player/PantMale22.bmd", "start": 139054274, "end": 139069336}, {"filename": "/Data/Player/PantMale23.bmd", "start": 139069336, "end": 139089663}, {"filename": "/Data/Player/PantMale24.bmd", "start": 139089663, "end": 139112225}, {"filename": "/Data/Player/PantMale25.bmd", "start": 139112225, "end": 139136375}, {"filename": "/Data/Player/PantMale26.bmd", "start": 139136375, "end": 139147943}, {"filename": "/Data/Player/PantMale27.bmd", "start": 139147943, "end": 139158183}, {"filename": "/Data/Player/PantMale28.bmd", "start": 139158183, "end": 139169065}, {"filename": "/Data/Player/PantMale29.bmd", "start": 139169065, "end": 139179353}, {"filename": "/Data/Player/Robe01.OZJ", "start": 139179353, "end": 139191422}, {"filename": "/Data/Player/Robe02.OZJ", "start": 139191422, "end": 139198667}, {"filename": "/Data/Player/Robe03.OZT", "start": 139198667, "end": 139264251}, {"filename": "/Data/Player/Shadow01.bmd", "start": 139264251, "end": 139275922}, {"filename": "/Data/Player/Wing02.bmd", "start": 139275922, "end": 139282429}, {"filename": "/Data/Player/Wing03.bmd", "start": 139282429, "end": 139287800}, {"filename": "/Data/Player/Wing04.bmd", "start": 139287800, "end": 139291844}, {"filename": "/Data/Player/boot_10c.OZJ", "start": 139291844, "end": 139305347}, {"filename": "/Data/Player/boots.OZJ", "start": 139305347, "end": 139324433}, {"filename": "/Data/Player/boots22.OZJ", "start": 139324433, "end": 139343519}, {"filename": "/Data/Player/boots_02.OZJ", "start": 139343519, "end": 139355561}, {"filename": "/Data/Player/boots_03.OZJ", "start": 139355561, "end": 139369579}, {"filename": "/Data/Player/boots_03b.OZJ", "start": 139369579, "end": 139384416}, {"filename": "/Data/Player/boots_04.OZJ", "start": 139384416, "end": 139395842}, {"filename": "/Data/Player/boots_04b.OZT", "start": 139395842, "end": 139399986}, {"filename": "/Data/Player/boots_04c.OZJ", "start": 139399986, "end": 139410751}, {"filename": "/Data/Player/boots_06.OZJ", "start": 139410751, "end": 139420226}, {"filename": "/Data/Player/boots_07.OZJ", "start": 139420226, "end": 139429717}, {"filename": "/Data/Player/boots_08.OZJ", "start": 139429717, "end": 139441551}, {"filename": "/Data/Player/boots_09.OZJ", "start": 139441551, "end": 139451808}, {"filename": "/Data/Player/boots_09c.OZJ", "start": 139451808, "end": 139463917}, {"filename": "/Data/Player/boots_10.OZJ", "start": 139463917, "end": 139476755}, {"filename": "/Data/Player/boots_10b.OZT", "start": 139476755, "end": 139480899}, {"filename": "/Data/Player/boots_11.OZJ", "start": 139480899, "end": 139494043}, {"filename": "/Data/Player/boots_13m.OZJ", "start": 139494043, "end": 139506016}, {"filename": "/Data/Player/boots_14.OZT", "start": 139506016, "end": 139522448}, {"filename": "/Data/Player/boots_14m.OZJ", "start": 139522448, "end": 139533083}, {"filename": "/Data/Player/boots_15.OZT", "start": 139533083, "end": 139549515}, {"filename": "/Data/Player/boots_15m.OZJ", "start": 139549515, "end": 139563495}, {"filename": "/Data/Player/boots_17.OZJ", "start": 139563495, "end": 139574741}, {"filename": "/Data/Player/boots_18.OZJ", "start": 139574741, "end": 139583271}, {"filename": "/Data/Player/boots_E1.OZJ", "start": 139583271, "end": 139593565}, {"filename": "/Data/Player/boots_E1Test.OZJ", "start": 139593565, "end": 139610346}, {"filename": "/Data/Player/boots_bd.OZJ", "start": 139610346, "end": 139622267}, {"filename": "/Data/Player/boots_bld.OZJ", "start": 139622267, "end": 139631465}, {"filename": "/Data/Player/boots_c07.OZJ", "start": 139631465, "end": 139642702}, {"filename": "/Data/Player/devil_wing.OZT", "start": 139642702, "end": 139708286}, {"filename": "/Data/Player/elfin_wing.OZJ", "start": 139708286, "end": 139717968}, {"filename": "/Data/Player/glove.OZJ", "start": 139717968, "end": 139734813}, {"filename": "/Data/Player/glove22.OZJ", "start": 139734813, "end": 139751658}, {"filename": "/Data/Player/gloves_02.OZJ", "start": 139751658, "end": 139764522}, {"filename": "/Data/Player/gloves_03.OZJ", "start": 139764522, "end": 139777698}, {"filename": "/Data/Player/gloves_03b.OZJ", "start": 139777698, "end": 139791733}, {"filename": "/Data/Player/gloves_04.OZJ", "start": 139791733, "end": 139805424}, {"filename": "/Data/Player/gloves_04c.OZJ", "start": 139805424, "end": 139817863}, {"filename": "/Data/Player/gloves_06.OZJ", "start": 139817863, "end": 139829472}, {"filename": "/Data/Player/gloves_07.OZJ", "start": 139829472, "end": 139839623}, {"filename": "/Data/Player/gloves_08.OZJ", "start": 139839623, "end": 139850993}, {"filename": "/Data/Player/gloves_09.OZJ", "start": 139850993, "end": 139862557}, {"filename": "/Data/Player/gloves_09c.OZJ", "start": 139862557, "end": 139875180}, {"filename": "/Data/Player/gloves_10.OZJ", "start": 139875180, "end": 139888812}, {"filename": "/Data/Player/gloves_10c.OZJ", "start": 139888812, "end": 139902951}, {"filename": "/Data/Player/gloves_11.OZJ", "start": 139902951, "end": 139916919}, {"filename": "/Data/Player/gloves_13m.OZJ", "start": 139916919, "end": 139927737}, {"filename": "/Data/Player/gloves_14.OZT", "start": 139927737, "end": 139944169}, {"filename": "/Data/Player/gloves_14m.OZJ", "start": 139944169, "end": 139954425}, {"filename": "/Data/Player/gloves_15.OZT", "start": 139954425, "end": 139970857}, {"filename": "/Data/Player/gloves_15m.OZJ", "start": 139970857, "end": 139979315}, {"filename": "/Data/Player/gloves_17.OZJ", "start": 139979315, "end": 139989852}, {"filename": "/Data/Player/gloves_18.OZJ", "start": 139989852, "end": 139997597}, {"filename": "/Data/Player/gloves_E1.OZJ", "start": 139997597, "end": 140007953}, {"filename": "/Data/Player/gloves_E1Test.OZJ", "start": 140007953, "end": 140018636}, {"filename": "/Data/Player/gloves_bd.OZJ", "start": 140018636, "end": 140032487}, {"filename": "/Data/Player/gloves_bld.OZJ", "start": 140032487, "end": 140041226}, {"filename": "/Data/Player/gloves_c07.OZJ", "start": 140041226, "end": 140052940}, {"filename": "/Data/Player/guard_hair.OZT", "start": 140052940, "end": 140057084}, {"filename": "/Data/Player/hair_R.OZJ", "start": 140057084, "end": 140060663}, {"filename": "/Data/Player/head.OZJ", "start": 140060663, "end": 140078250}, {"filename": "/Data/Player/head22.OZJ", "start": 140078250, "end": 140095837}, {"filename": "/Data/Player/head_02.OZJ", "start": 140095837, "end": 140108121}, {"filename": "/Data/Player/head_03.OZJ", "start": 140108121, "end": 140121848}, {"filename": "/Data/Player/head_04.OZJ", "start": 140121848, "end": 140133731}, {"filename": "/Data/Player/head_06.OZJ", "start": 140133731, "end": 140143290}, {"filename": "/Data/Player/head_07.OZJ", "start": 140143290, "end": 140152241}, {"filename": "/Data/Player/head_08.OZJ", "start": 140152241, "end": 140162993}, {"filename": "/Data/Player/head_09.OZJ", "start": 140162993, "end": 140173438}, {"filename": "/Data/Player/head_09b.OZT", "start": 140173438, "end": 140189870}, {"filename": "/Data/Player/head_10.OZJ", "start": 140189870, "end": 140202326}, {"filename": "/Data/Player/head_11.OZJ", "start": 140202326, "end": 140213408}, {"filename": "/Data/Player/head_13m.OZJ", "start": 140213408, "end": 140225690}, {"filename": "/Data/Player/head_13m.OZT", "start": 140225690, "end": 140227786}, {"filename": "/Data/Player/head_14m.OZJ", "start": 140227786, "end": 140235084}, {"filename": "/Data/Player/head_15m.OZJ", "start": 140235084, "end": 140243716}, {"filename": "/Data/Player/head_17.OZJ", "start": 140243716, "end": 140255409}, {"filename": "/Data/Player/head_18.OZJ", "start": 140255409, "end": 140264249}, {"filename": "/Data/Player/head_E1.OZJ", "start": 140264249, "end": 140272757}, {"filename": "/Data/Player/head_E1Test.OZJ", "start": 140272757, "end": 140282425}, {"filename": "/Data/Player/head_a01.OZJ", "start": 140282425, "end": 140290700}, {"filename": "/Data/Player/head_a02.OZJ", "start": 140290700, "end": 140302205}, {"filename": "/Data/Player/head_a03.OZJ", "start": 140302205, "end": 140314675}, {"filename": "/Data/Player/head_a04.OZJ", "start": 140314675, "end": 140328503}, {"filename": "/Data/Player/head_a05.OZJ", "start": 140328503, "end": 140341025}, {"filename": "/Data/Player/head_a06.OZT", "start": 140341025, "end": 140345169}, {"filename": "/Data/Player/head_bd.OZJ", "start": 140345169, "end": 140356218}, {"filename": "/Data/Player/head_bld.OZJ", "start": 140356218, "end": 140363946}, {"filename": "/Data/Player/hide.OZJ", "start": 140363946, "end": 140368502}, {"filename": "/Data/Player/hide22.OZJ", "start": 140368502, "end": 140373058}, {"filename": "/Data/Player/hide_m.OZJ", "start": 140373058, "end": 140377598}, {"filename": "/Data/Player/kaa.OZT", "start": 140377598, "end": 140394030}, {"filename": "/Data/Player/khair.OZT", "start": 140394030, "end": 140459614}, {"filename": "/Data/Player/level_man01.OZJ", "start": 140459614, "end": 140536428}, {"filename": "/Data/Player/level_man02.OZJ", "start": 140536428, "end": 140593046}, {"filename": "/Data/Player/level_man022.OZJ", "start": 140593046, "end": 140658826}, {"filename": "/Data/Player/level_man033.OZJ", "start": 140658826, "end": 140759162}, {"filename": "/Data/Player/lower2_15m.OZT", "start": 140759162, "end": 140775594}, {"filename": "/Data/Player/lowerTest2_R.OZJ", "start": 140775594, "end": 140780834}, {"filename": "/Data/Player/lowerTest_R.OZJ", "start": 140780834, "end": 140787382}, {"filename": "/Data/Player/lower_02_m.OZJ", "start": 140787382, "end": 140822886}, {"filename": "/Data/Player/lower_03.OZJ", "start": 140822886, "end": 140859705}, {"filename": "/Data/Player/lower_03_m.OZJ", "start": 140859705, "end": 140899541}, {"filename": "/Data/Player/lower_03b.OZT", "start": 140899541, "end": 140915973}, {"filename": "/Data/Player/lower_03b_m.OZT", "start": 140915973, "end": 140932405}, {"filename": "/Data/Player/lower_04.OZJ", "start": 140932405, "end": 140942965}, {"filename": "/Data/Player/lower_04_m.OZJ", "start": 140942965, "end": 140978864}, {"filename": "/Data/Player/lower_04b.OZT", "start": 140978864, "end": 140983008}, {"filename": "/Data/Player/lower_04b_m.OZT", "start": 140983008, "end": 140987152}, {"filename": "/Data/Player/lower_04c.OZT", "start": 140987152, "end": 140991296}, {"filename": "/Data/Player/lower_06.OZJ", "start": 140991296, "end": 141021289}, {"filename": "/Data/Player/lower_07.OZJ", "start": 141021289, "end": 141049702}, {"filename": "/Data/Player/lower_07.OZT", "start": 141049702, "end": 141066134}, {"filename": "/Data/Player/lower_07_m.OZJ", "start": 141066134, "end": 141087973}, {"filename": "/Data/Player/lower_07c.OZT", "start": 141087973, "end": 141104405}, {"filename": "/Data/Player/lower_08_m.OZJ", "start": 141104405, "end": 141137940}, {"filename": "/Data/Player/lower_09.OZJ", "start": 141137940, "end": 141163403}, {"filename": "/Data/Player/lower_09_m.OZJ", "start": 141163403, "end": 141199082}, {"filename": "/Data/Player/lower_09b.OZT", "start": 141199082, "end": 141215514}, {"filename": "/Data/Player/lower_09c.OZT", "start": 141215514, "end": 141219658}, {"filename": "/Data/Player/lower_10_m.OZJ", "start": 141219658, "end": 141248521}, {"filename": "/Data/Player/lower_10b.OZT", "start": 141248521, "end": 141252665}, {"filename": "/Data/Player/lower_10c.OZJ", "start": 141252665, "end": 141291342}, {"filename": "/Data/Player/lower_11.OZJ", "start": 141291342, "end": 141326189}, {"filename": "/Data/Player/lower_13m.OZJ", "start": 141326189, "end": 141346736}, {"filename": "/Data/Player/lower_13m.OZT", "start": 141346736, "end": 141354976}, {"filename": "/Data/Player/lower_14.OZT", "start": 141354976, "end": 141387792}, {"filename": "/Data/Player/lower_14m.OZJ", "start": 141387792, "end": 141404700}, {"filename": "/Data/Player/lower_15.OZT", "start": 141404700, "end": 141437516}, {"filename": "/Data/Player/lower_15m.OZJ", "start": 141437516, "end": 141463703}, {"filename": "/Data/Player/lower_17.OZJ", "start": 141463703, "end": 141483409}, {"filename": "/Data/Player/lower_18.OZJ", "start": 141483409, "end": 141494407}, {"filename": "/Data/Player/lower_E1.OZJ", "start": 141494407, "end": 141522331}, {"filename": "/Data/Player/lower_E1.OZT", "start": 141522331, "end": 141587915}, {"filename": "/Data/Player/lower_E1Test.OZJ", "start": 141587915, "end": 141604817}, {"filename": "/Data/Player/lower_a06.OZT", "start": 141604817, "end": 141608961}, {"filename": "/Data/Player/lower_bd.OZJ", "start": 141608961, "end": 141632242}, {"filename": "/Data/Player/lower_bd.OZT", "start": 141632242, "end": 141648674}, {"filename": "/Data/Player/lower_bld.OZJ", "start": 141648674, "end": 141669792}, {"filename": "/Data/Player/lower_bld.OZT", "start": 141669792, "end": 141686224}, {"filename": "/Data/Player/mg_arm.OZT", "start": 141686224, "end": 141702656}, {"filename": "/Data/Player/mg_boots.OZT", "start": 141702656, "end": 141768240}, {"filename": "/Data/Player/mg_jacket.OZT", "start": 141768240, "end": 141833824}, {"filename": "/Data/Player/mg_under.OZT", "start": 141833824, "end": 141866640}, {"filename": "/Data/Player/pants.OZJ", "start": 141866640, "end": 141901085}, {"filename": "/Data/Player/pants02.OZT", "start": 141901085, "end": 141917517}, {"filename": "/Data/Player/pants22.OZJ", "start": 141917517, "end": 141951962}, {"filename": "/Data/Player/pants22.OZT", "start": 141951962, "end": 141968394}, {"filename": "/Data/Player/player.bmd", "start": 141968394, "end": 143442507}, {"filename": "/Data/Player/skin_E1.OZJ", "start": 143442507, "end": 143447033}, {"filename": "/Data/Player/skin_archer_01.OZJ", "start": 143447033, "end": 143519665}, {"filename": "/Data/Player/skin_barbarian_01.OZJ", "start": 143519665, "end": 143577955}, {"filename": "/Data/Player/skin_ff.OZJ", "start": 143577955, "end": 143589789}, {"filename": "/Data/Player/skin_special_01.OZJ", "start": 143589789, "end": 143663968}, {"filename": "/Data/Player/skin_warrior_01.OZJ", "start": 143663968, "end": 143733989}, {"filename": "/Data/Player/skin_wizard_01.OZJ", "start": 143733989, "end": 143802841}, {"filename": "/Data/Player/upper.OZJ", "start": 143802841, "end": 143847458}, {"filename": "/Data/Player/upper22.OZJ", "start": 143847458, "end": 143892075}, {"filename": "/Data/Player/upper_02_m.OZJ", "start": 143892075, "end": 143914482}, {"filename": "/Data/Player/upper_02b_m.OZT", "start": 143914482, "end": 143918626}, {"filename": "/Data/Player/upper_03.OZJ", "start": 143918626, "end": 143955149}, {"filename": "/Data/Player/upper_03_m.OZJ", "start": 143955149, "end": 143998820}, {"filename": "/Data/Player/upper_04.OZJ", "start": 143998820, "end": 144021389}, {"filename": "/Data/Player/upper_04_m.OZJ", "start": 144021389, "end": 144050623}, {"filename": "/Data/Player/upper_06.OZJ", "start": 144050623, "end": 144074896}, {"filename": "/Data/Player/upper_07.OZJ", "start": 144074896, "end": 144106127}, {"filename": "/Data/Player/upper_07_m.OZJ", "start": 144106127, "end": 144125860}, {"filename": "/Data/Player/upper_07b_m.OZT", "start": 144125860, "end": 144130004}, {"filename": "/Data/Player/upper_08_m.OZJ", "start": 144130004, "end": 144164503}, {"filename": "/Data/Player/upper_09.OZJ", "start": 144164503, "end": 144197550}, {"filename": "/Data/Player/upper_09_m.OZJ", "start": 144197550, "end": 144225285}, {"filename": "/Data/Player/upper_09b_m.OZT", "start": 144225285, "end": 144229429}, {"filename": "/Data/Player/upper_09c.OZT", "start": 144229429, "end": 144233573}, {"filename": "/Data/Player/upper_10_m.OZJ", "start": 144233573, "end": 144268707}, {"filename": "/Data/Player/upper_10c.OZJ", "start": 144268707, "end": 144306720}, {"filename": "/Data/Player/upper_11.OZJ", "start": 144306720, "end": 144343627}, {"filename": "/Data/Player/upper_13m.OZJ", "start": 144343627, "end": 144375095}, {"filename": "/Data/Player/upper_14.OZT", "start": 144375095, "end": 144440679}, {"filename": "/Data/Player/upper_14m.OZJ", "start": 144440679, "end": 144472786}, {"filename": "/Data/Player/upper_15.OZT", "start": 144472786, "end": 144538370}, {"filename": "/Data/Player/upper_15m.OZJ", "start": 144538370, "end": 144566685}, {"filename": "/Data/Player/upper_17.OZJ", "start": 144566685, "end": 144591281}, {"filename": "/Data/Player/upper_18.OZJ", "start": 144591281, "end": 144618536}, {"filename": "/Data/Player/upper_E1.OZJ", "start": 144618536, "end": 144654093}, {"filename": "/Data/Player/upper_E1.OZT", "start": 144654093, "end": 144719677}, {"filename": "/Data/Player/upper_E1Test.OZJ", "start": 144719677, "end": 144747087}, {"filename": "/Data/Player/upper_bd.OZJ", "start": 144747087, "end": 144776410}, {"filename": "/Data/Player/upper_bld.OZJ", "start": 144776410, "end": 144801291}, {"filename": "/Data/Skill/Airforce.bmd", "start": 144801291, "end": 144806909}, {"filename": "/Data/Skill/Arrow.OZJ", "start": 144806909, "end": 144811865}, {"filename": "/Data/Skill/Arrow01.bmd", "start": 144811865, "end": 144816715}, {"filename": "/Data/Skill/Arrowbomb01.bmd", "start": 144816715, "end": 144819859}, {"filename": "/Data/Skill/Arrowdouble01.bmd", "start": 144819859, "end": 144830175}, {"filename": "/Data/Skill/Arrowlaser01.bmd", "start": 144830175, "end": 144830777}, {"filename": "/Data/Skill/Arrownature01.bmd", "start": 144830777, "end": 144856357}, {"filename": "/Data/Skill/Arrowsaw01.bmd", "start": 144856357, "end": 144866535}, {"filename": "/Data/Skill/Arrowsteel01.bmd", "start": 144866535, "end": 144869045}, {"filename": "/Data/Skill/Arrowthunder01.bmd", "start": 144869045, "end": 144871923}, {"filename": "/Data/Skill/Arrowv01.bmd", "start": 144871923, "end": 144873009}, {"filename": "/Data/Skill/Arrowwing01.bmd", "start": 144873009, "end": 144877691}, {"filename": "/Data/Skill/Ball01.bmd", "start": 144877691, "end": 144894890}, {"filename": "/Data/Skill/Bigstone01.bmd", "start": 144894890, "end": 144896996}, {"filename": "/Data/Skill/Bigstone02.bmd", "start": 144896996, "end": 144899102}, {"filename": "/Data/Skill/Blast01.bmd", "start": 144899102, "end": 144900128}, {"filename": "/Data/Skill/Blizzard.bmd", "start": 144900128, "end": 144901850}, {"filename": "/Data/Skill/Bone01.bmd", "start": 144901850, "end": 144909044}, {"filename": "/Data/Skill/Bone02.bmd", "start": 144909044, "end": 144912030}, {"filename": "/Data/Skill/Bons.OZJ", "start": 144912030, "end": 144939829}, {"filename": "/Data/Skill/Bons_a.OZJ", "start": 144939829, "end": 144974833}, {"filename": "/Data/Skill/Bons_a2.OZT", "start": 144974833, "end": 144976929}, {"filename": "/Data/Skill/Bons_b.OZJ", "start": 144976929, "end": 145004487}, {"filename": "/Data/Skill/Bons_particle.OZJ", "start": 145004487, "end": 145014970}, {"filename": "/Data/Skill/Bow_b.OZJ", "start": 145014970, "end": 145026429}, {"filename": "/Data/Skill/Bow_c.OZJ", "start": 145026429, "end": 145031917}, {"filename": "/Data/Skill/Bow_d.OZJ", "start": 145031917, "end": 145037546}, {"filename": "/Data/Skill/Bowtt.OZJ", "start": 145037546, "end": 145040411}, {"filename": "/Data/Skill/Bowtt2.OZJ", "start": 145040411, "end": 145043597}, {"filename": "/Data/Skill/Bu009.OZJ", "start": 145043597, "end": 145049923}, {"filename": "/Data/Skill/Carow.OZJ", "start": 145049923, "end": 145061732}, {"filename": "/Data/Skill/Carow.bmd", "start": 145061732, "end": 145066933}, {"filename": "/Data/Skill/Circle01.bmd", "start": 145066933, "end": 145067787}, {"filename": "/Data/Skill/Circle02.bmd", "start": 145067787, "end": 145077901}, {"filename": "/Data/Skill/Crossb.OZJ", "start": 145077901, "end": 145080077}, {"filename": "/Data/Skill/Ct10.OZJ", "start": 145080077, "end": 145127714}, {"filename": "/Data/Skill/Curer.OZJ", "start": 145127714, "end": 145135482}, {"filename": "/Data/Skill/Dhorss.OZJ", "start": 145135482, "end": 145157613}, {"filename": "/Data/Skill/Dhorss_r.OZJ", "start": 145157613, "end": 145160849}, {"filename": "/Data/Skill/Dragon02.OZJ", "start": 145160849, "end": 145179096}, {"filename": "/Data/Skill/Earow.OZJ", "start": 145179096, "end": 145192289}, {"filename": "/Data/Skill/Earthquake01.bmd", "start": 145192289, "end": 145192679}, {"filename": "/Data/Skill/Earthquake02.bmd", "start": 145192679, "end": 145194617}, {"filename": "/Data/Skill/Earthquake03.bmd", "start": 145194617, "end": 145195007}, {"filename": "/Data/Skill/Earthquake04.bmd", "start": 145195007, "end": 145195397}, {"filename": "/Data/Skill/Earthquake05.bmd", "start": 145195397, "end": 145197319}, {"filename": "/Data/Skill/Earthquake06.bmd", "start": 145197319, "end": 145197709}, {"filename": "/Data/Skill/Earthquake07.bmd", "start": 145197709, "end": 145198099}, {"filename": "/Data/Skill/Earthquake08.bmd", "start": 145198099, "end": 145200037}, {"filename": "/Data/Skill/Ffa1.OZJ", "start": 145200037, "end": 145205819}, {"filename": "/Data/Skill/Ffa2.OZJ", "start": 145205819, "end": 145211105}, {"filename": "/Data/Skill/Fire01.OZJ", "start": 145211105, "end": 145221616}, {"filename": "/Data/Skill/Fire01.bmd", "start": 145221616, "end": 145230711}, {"filename": "/Data/Skill/Fire02.OZJ", "start": 145230711, "end": 145243490}, {"filename": "/Data/Skill/Flashing.bmd", "start": 145243490, "end": 145244980}, {"filename": "/Data/Skill/Flower1.OZT", "start": 145244980, "end": 145249124}, {"filename": "/Data/Skill/Flower2.OZT", "start": 145249124, "end": 145253268}, {"filename": "/Data/Skill/Flower3.OZT", "start": 145253268, "end": 145257412}, {"filename": "/Data/Skill/Foot.OZJ", "start": 145257412, "end": 145267590}, {"filename": "/Data/Skill/Fury.OZJ", "start": 145267590, "end": 145279302}, {"filename": "/Data/Skill/Fury.OZT", "start": 145279302, "end": 145312118}, {"filename": "/Data/Skill/Ground.OZJ", "start": 145312118, "end": 145335795}, {"filename": "/Data/Skill/Groundeff.OZJ", "start": 145335795, "end": 145378915}, {"filename": "/Data/Skill/Groundstone.bmd", "start": 145378915, "end": 145385965}, {"filename": "/Data/Skill/Groundstone2.bmd", "start": 145385965, "end": 145396031}, {"filename": "/Data/Skill/Ice.OZJ", "start": 145396031, "end": 145424913}, {"filename": "/Data/Skill/Ice01.bmd", "start": 145424913, "end": 145454879}, {"filename": "/Data/Skill/Ice02.bmd", "start": 145454879, "end": 145455665}, {"filename": "/Data/Skill/Inferno01.bmd", "start": 145455665, "end": 145515153}, {"filename": "/Data/Skill/Kcross.bmd", "start": 145515153, "end": 145520915}, {"filename": "/Data/Skill/Kcrossb.OZJ", "start": 145520915, "end": 145522893}, {"filename": "/Data/Skill/Kcteil.OZJ", "start": 145522893, "end": 145533622}, {"filename": "/Data/Skill/Kings_r.OZJ", "start": 145533622, "end": 145554852}, {"filename": "/Data/Skill/Laser01.bmd", "start": 145554852, "end": 145561930}, {"filename": "/Data/Skill/M_piercing.OZJ", "start": 145561930, "end": 145573897}, {"filename": "/Data/Skill/M_piercing.OZT", "start": 145573897, "end": 145590329}, {"filename": "/Data/Skill/M_piercing.bmd", "start": 145590329, "end": 145593897}, {"filename": "/Data/Skill/M_piercing02.OZJ", "start": 145593897, "end": 145602635}, {"filename": "/Data/Skill/M_piercing02.OZT", "start": 145602635, "end": 145606779}, {"filename": "/Data/Skill/M_waves.bmd", "start": 145606779, "end": 145609809}, {"filename": "/Data/Skill/Magic01.bmd", "start": 145609809, "end": 145613495}, {"filename": "/Data/Skill/Magic02.bmd", "start": 145613495, "end": 145615449}, {"filename": "/Data/Skill/Magic2.OZJ", "start": 145615449, "end": 145618920}, {"filename": "/Data/Skill/Magic_a01.OZJ", "start": 145618920, "end": 145636843}, {"filename": "/Data/Skill/Magic_a02.OZJ", "start": 145636843, "end": 145649098}, {"filename": "/Data/Skill/Magic_b.OZJ", "start": 145649098, "end": 145662662}, {"filename": "/Data/Skill/Magic_g.OZJ", "start": 145662662, "end": 145677895}, {"filename": "/Data/Skill/Magiccircle01.bmd", "start": 145677895, "end": 145684254}, {"filename": "/Data/Skill/Mmn2.OZJ", "start": 145684254, "end": 145688130}, {"filename": "/Data/Skill/Part.OZT", "start": 145688130, "end": 145704562}, {"filename": "/Data/Skill/Part2.OZT", "start": 145704562, "end": 145720994}, {"filename": "/Data/Skill/Phoenixshield01.bmd", "start": 145720994, "end": 145755594}, {"filename": "/Data/Skill/Piercing.OZJ", "start": 145755594, "end": 145769798}, {"filename": "/Data/Skill/Piercing.bmd", "start": 145769798, "end": 145772228}, {"filename": "/Data/Skill/Pierpart.bmd", "start": 145772228, "end": 145784607}, {"filename": "/Data/Skill/Poison01.bmd", "start": 145784607, "end": 145824967}, {"filename": "/Data/Skill/Protect01.bmd", "start": 145824967, "end": 145829153}, {"filename": "/Data/Skill/Protect02.bmd", "start": 145829153, "end": 145837523}, {"filename": "/Data/Skill/Rdgon.OZJ", "start": 145837523, "end": 145926466}, {"filename": "/Data/Skill/Rdgonw.OZT", "start": 145926466, "end": 145959282}, {"filename": "/Data/Skill/Reddragon_n.OZJ", "start": 145959282, "end": 146042497}, {"filename": "/Data/Skill/Reddragon_n.OZT", "start": 146042497, "end": 146304689}, {"filename": "/Data/Skill/Reddragont.OZJ", "start": 146304689, "end": 146315065}, {"filename": "/Data/Skill/Rider01.bmd", "start": 146315065, "end": 146371605}, {"filename": "/Data/Skill/Rider02.bmd", "start": 146371605, "end": 146561618}, {"filename": "/Data/Skill/Ridingspear01.bmd", "start": 146561618, "end": 146562804}, {"filename": "/Data/Skill/Ring2.OZJ", "start": 146562804, "end": 146572748}, {"filename": "/Data/Skill/Ring3.OZJ", "start": 146572748, "end": 146582225}, {"filename": "/Data/Skill/Ring4.OZJ", "start": 146582225, "end": 146601924}, {"filename": "/Data/Skill/Saw01.bmd", "start": 146601924, "end": 146612102}, {"filename": "/Data/Skill/Skeleton01.bmd", "start": 146612102, "end": 146657357}, {"filename": "/Data/Skill/Skeleton02.bmd", "start": 146657357, "end": 146731190}, {"filename": "/Data/Skill/Skeleton03.bmd", "start": 146731190, "end": 146794058}, {"filename": "/Data/Skill/Skull.OZJ", "start": 146794058, "end": 146796334}, {"filename": "/Data/Skill/Snow01.bmd", "start": 146796334, "end": 146800832}, {"filename": "/Data/Skill/Snow02.bmd", "start": 146800832, "end": 146804486}, {"filename": "/Data/Skill/Snow03.bmd", "start": 146804486, "end": 146805668}, {"filename": "/Data/Skill/Snow_p.OZJ", "start": 146805668, "end": 146811339}, {"filename": "/Data/Skill/Sou01.OZJ", "start": 146811339, "end": 146822477}, {"filename": "/Data/Skill/Sou02.OZJ", "start": 146822477, "end": 146829752}, {"filename": "/Data/Skill/Soul_ba.OZJ", "start": 146829752, "end": 146837113}, {"filename": "/Data/Skill/Spie_r.OZJ", "start": 146837113, "end": 146843352}, {"filename": "/Data/Skill/Ston1.OZJ", "start": 146843352, "end": 146855896}, {"filename": "/Data/Skill/Stone01.bmd", "start": 146855896, "end": 146857078}, {"filename": "/Data/Skill/Stone02.bmd", "start": 146857078, "end": 146860732}, {"filename": "/Data/Skill/Storm01.bmd", "start": 146860732, "end": 146899392}, {"filename": "/Data/Skill/Tail.bmd", "start": 146899392, "end": 146899782}, {"filename": "/Data/Skill/Tama01.bmd", "start": 146899782, "end": 146933946}, {"filename": "/Data/Skill/Test2.OZJ", "start": 146933946, "end": 146942133}, {"filename": "/Data/Skill/Test2.OZT", "start": 146942133, "end": 146958565}, {"filename": "/Data/Skill/Test_2.OZJ", "start": 146958565, "end": 146966752}, {"filename": "/Data/Skill/Test_2.OZT", "start": 146966752, "end": 146983184}, {"filename": "/Data/Skill/Toothed_whee.OZJ", "start": 146983184, "end": 146989065}, {"filename": "/Data/Skill/Typhoon.OZJ", "start": 146989065, "end": 147000167}, {"filename": "/Data/Skill/V.OZJ", "start": 147000167, "end": 147004840}, {"filename": "/Data/Skill/Wall01.OZJ", "start": 147004840, "end": 147017176}, {"filename": "/Data/Skill/Wall02.OZJ", "start": 147017176, "end": 147024444}, {"filename": "/Data/Skill/Waveforce.bmd", "start": 147024444, "end": 147026069}, {"filename": "/Data/Skill/tama00.OZJ", "start": 147026069, "end": 147049115}, {"filename": "/Data/Skill/tama01.OZT", "start": 147049115, "end": 147057355}, {"filename": "/Data/Sound/Berserker.wav", "start": 147057355, "end": 147241967, "audio": 1}, {"filename": "/Data/Sound/aBat.wav", "start": 147241967, "end": 147351097, "audio": 1}, {"filename": "/Data/Sound/aBird1.WAV", "start": 147351097, "end": 147416195}, {"filename": "/Data/Sound/aBird2.WAV", "start": 147416195, "end": 147436041}, {"filename": "/Data/Sound/aCastleDoor.wav", "start": 147436041, "end": 147546821, "audio": 1}, {"filename": "/Data/Sound/aDoor.wav", "start": 147546821, "end": 147663031, "audio": 1}, {"filename": "/Data/Sound/aDungeon.wav", "start": 147663031, "end": 148396709, "audio": 1}, {"filename": "/Data/Sound/aForest.wav", "start": 148396709, "end": 149332481, "audio": 1}, {"filename": "/Data/Sound/aGrate.wav", "start": 149332481, "end": 149385735, "audio": 1}, {"filename": "/Data/Sound/aHeaven.wav", "start": 149385735, "end": 150574043, "audio": 1}, {"filename": "/Data/Sound/aMouse.WAV", "start": 150574043, "end": 150689761}, {"filename": "/Data/Sound/aRain.wav", "start": 150689761, "end": 152428019, "audio": 1}, {"filename": "/Data/Sound/aTamajjang1.wav", "start": 152428019, "end": 152432453, "audio": 1}, {"filename": "/Data/Sound/aTamajjang2.wav", "start": 152432453, "end": 152436931, "audio": 1}, {"filename": "/Data/Sound/aThunder01.wav", "start": 152436931, "end": 152501761, "audio": 1}, {"filename": "/Data/Sound/aThunder02.wav", "start": 152501761, "end": 152566591, "audio": 1}, {"filename": "/Data/Sound/aThunder03.wav", "start": 152566591, "end": 152631421, "audio": 1}, {"filename": "/Data/Sound/aTower.wav", "start": 152631421, "end": 153468759, "audio": 1}, {"filename": "/Data/Sound/aWater.wav", "start": 153468759, "end": 154637789, "audio": 1}, {"filename": "/Data/Sound/aWind.wav", "start": 154637789, "end": 155755177, "audio": 1}, {"filename": "/Data/Sound/beep.wav", "start": 155755177, "end": 155759145, "audio": 1}, {"filename": "/Data/Sound/blood1.wav", "start": 155759145, "end": 156007359, "audio": 1}, {"filename": "/Data/Sound/blood_attack1.wav", "start": 156007359, "end": 156115157, "audio": 1}, {"filename": "/Data/Sound/blood_attack2.wav", "start": 156115157, "end": 156249347, "audio": 1}, {"filename": "/Data/Sound/blood_die.wav", "start": 156249347, "end": 156541149, "audio": 1}, {"filename": "/Data/Sound/death1.wav", "start": 156541149, "end": 156800371, "audio": 1}, {"filename": "/Data/Sound/death_attack1.wav", "start": 156800371, "end": 157055393, "audio": 1}, {"filename": "/Data/Sound/death_die.wav", "start": 157055393, "end": 157617075, "audio": 1}, {"filename": "/Data/Sound/desert.wav", "start": 157617075, "end": 159050745, "audio": 1}, {"filename": "/Data/Sound/eBloodAttack.wav", "start": 159050745, "end": 159068627, "audio": 1}, {"filename": "/Data/Sound/eBlow.wav", "start": 159068627, "end": 159095319, "audio": 1}, {"filename": "/Data/Sound/eBlow1.wav", "start": 159095319, "end": 159109961, "audio": 1}, {"filename": "/Data/Sound/eBlow2.wav", "start": 159109961, "end": 159132183, "audio": 1}, {"filename": "/Data/Sound/eBlow3.wav", "start": 159132183, "end": 159149923, "audio": 1}, {"filename": "/Data/Sound/eBlow4.wav", "start": 159149923, "end": 159171295, "audio": 1}, {"filename": "/Data/Sound/eBow.wav", "start": 159171295, "end": 159213097, "audio": 1}, {"filename": "/Data/Sound/eBreak.wav", "start": 159213097, "end": 159239387, "audio": 1}, {"filename": "/Data/Sound/eCrossbow.wav", "start": 159239387, "end": 159268941, "audio": 1}, {"filename": "/Data/Sound/eCrow.wav", "start": 159268941, "end": 159276799, "audio": 1}, {"filename": "/Data/Sound/eDownGate.wav", "start": 159276799, "end": 159443907, "audio": 1}, {"filename": "/Data/Sound/eExplosion.wav", "start": 159443907, "end": 159489567, "audio": 1}, {"filename": "/Data/Sound/eFirecracker1.wav", "start": 159489567, "end": 159618725, "audio": 1}, {"filename": "/Data/Sound/eFirecracker2.wav", "start": 159618725, "end": 159751127, "audio": 1}, {"filename": "/Data/Sound/eGem.wav", "start": 159751127, "end": 159779909, "audio": 1}, {"filename": "/Data/Sound/eHitCristal.wav", "start": 159779909, "end": 159797733, "audio": 1}, {"filename": "/Data/Sound/eHitGate.wav", "start": 159797733, "end": 159832825, "audio": 1}, {"filename": "/Data/Sound/eHitGate2.wav", "start": 159832825, "end": 159883169, "audio": 1}, {"filename": "/Data/Sound/eIceArrow.wav", "start": 159883169, "end": 160028915, "audio": 1}, {"filename": "/Data/Sound/eMedal.wav", "start": 160028915, "end": 160049801, "audio": 1}, {"filename": "/Data/Sound/eMeteorite.wav", "start": 160049801, "end": 160120549, "audio": 1}, {"filename": "/Data/Sound/eMix.wav", "start": 160120549, "end": 160675947, "audio": 1}, {"filename": "/Data/Sound/ePhoenixExp.wav", "start": 160675947, "end": 160702217, "audio": 1}, {"filename": "/Data/Sound/ePiercing.wav", "start": 160702217, "end": 160742997, "audio": 1}, {"filename": "/Data/Sound/eRaidShoot.wav", "start": 160742997, "end": 160862475, "audio": 1}, {"filename": "/Data/Sound/eRidingSpear.wav", "start": 160862475, "end": 160927499, "audio": 1}, {"filename": "/Data/Sound/eShortBlow1.wav", "start": 160927499, "end": 160949917, "audio": 1}, {"filename": "/Data/Sound/eShortBlow2.wav", "start": 160949917, "end": 160958739, "audio": 1}, {"filename": "/Data/Sound/eShortBlow3.wav", "start": 160958739, "end": 160972269, "audio": 1}, {"filename": "/Data/Sound/eSoulBarrier.wav", "start": 160972269, "end": 161043443, "audio": 1}, {"filename": "/Data/Sound/eSwellLife.wav", "start": 161043443, "end": 161257597, "audio": 1}, {"filename": "/Data/Sound/eSwingLightSword.wav", "start": 161257597, "end": 161310593, "audio": 1}, {"filename": "/Data/Sound/eSwingWeapon1.wav", "start": 161310593, "end": 161332269, "audio": 1}, {"filename": "/Data/Sound/eSwingWeapon2.wav", "start": 161332269, "end": 161352571, "audio": 1}, {"filename": "/Data/Sound/eTelekinesis.wav", "start": 161352571, "end": 161490617, "audio": 1}, {"filename": "/Data/Sound/eThunder.wav", "start": 161490617, "end": 161555469, "audio": 1}, {"filename": "/Data/Sound/iAlert.wav", "start": 161555469, "end": 161685327, "audio": 1}, {"filename": "/Data/Sound/iBloodCastle.wav", "start": 161685327, "end": 166409941, "audio": 1}, {"filename": "/Data/Sound/iButtonClick.wav", "start": 166409941, "end": 166426001, "audio": 1}, {"filename": "/Data/Sound/iButtonError.wav", "start": 166426001, "end": 166443345, "audio": 1}, {"filename": "/Data/Sound/iButtonMove.wav", "start": 166443345, "end": 166490221, "audio": 1}, {"filename": "/Data/Sound/iCreateWindow.wav", "start": 166490221, "end": 166579007, "audio": 1}, {"filename": "/Data/Sound/iRepair.wav", "start": 166579007, "end": 166586789, "audio": 1}, {"filename": "/Data/Sound/iTitle.wav", "start": 166586789, "end": 166946915, "audio": 1}, {"filename": "/Data/Sound/iWhisper.wav", "start": 166946915, "end": 166973127, "audio": 1}, {"filename": "/Data/Sound/iron1.wav", "start": 166973127, "end": 167153193, "audio": 1}, {"filename": "/Data/Sound/iron_attack1.wav", "start": 167153193, "end": 167323875, "audio": 1}, {"filename": "/Data/Sound/jaikan1.wav", "start": 167323875, "end": 167652533, "audio": 1}, {"filename": "/Data/Sound/jaikan2.wav", "start": 167652533, "end": 167762971, "audio": 1}, {"filename": "/Data/Sound/jaikan_attack1.wav", "start": 167762971, "end": 167995673, "audio": 1}, {"filename": "/Data/Sound/jaikan_attack2.wav", "start": 167995673, "end": 168084771, "audio": 1}, {"filename": "/Data/Sound/jaikan_die.wav", "start": 168084771, "end": 168412649, "audio": 1}, {"filename": "/Data/Sound/mAlquamos1.wav", "start": 168412649, "end": 168613985, "audio": 1}, {"filename": "/Data/Sound/mAlquamosAttack1.wav", "start": 168613985, "end": 168762065, "audio": 1}, {"filename": "/Data/Sound/mAlquamosDie.wav", "start": 168762065, "end": 168899681, "audio": 1}, {"filename": "/Data/Sound/mArgon1.wav", "start": 168899681, "end": 169012135, "audio": 1}, {"filename": "/Data/Sound/mArgon2.wav", "start": 169012135, "end": 169110997, "audio": 1}, {"filename": "/Data/Sound/mArgonAttack1.wav", "start": 169110997, "end": 169216207, "audio": 1}, {"filename": "/Data/Sound/mArgonAttack2.wav", "start": 169216207, "end": 169369073, "audio": 1}, {"filename": "/Data/Sound/mArgonDie.wav", "start": 169369073, "end": 169489079, "audio": 1}, {"filename": "/Data/Sound/mAssassin1.wav", "start": 169489079, "end": 169609261, "audio": 1}, {"filename": "/Data/Sound/mAssassinAttack1.wav", "start": 169609261, "end": 169658229, "audio": 1}, {"filename": "/Data/Sound/mAssassinAttack2.wav", "start": 169658229, "end": 169706187, "audio": 1}, {"filename": "/Data/Sound/mAssassinDie.wav", "start": 169706187, "end": 169774419, "audio": 1}, {"filename": "/Data/Sound/mBahamut1.wav", "start": 169774419, "end": 170200997, "audio": 1}, {"filename": "/Data/Sound/mBali1.wav", "start": 170200997, "end": 170498427, "audio": 1}, {"filename": "/Data/Sound/mBali2.wav", "start": 170498427, "end": 170841173, "audio": 1}, {"filename": "/Data/Sound/mBaliAttack1.wav", "start": 170841173, "end": 170900507, "audio": 1}, {"filename": "/Data/Sound/mBaliAttack2.wav", "start": 170900507, "end": 170959685, "audio": 1}, {"filename": "/Data/Sound/mBalrog1.wav", "start": 170959685, "end": 171167027, "audio": 1}, {"filename": "/Data/Sound/mBalrog2.wav", "start": 171167027, "end": 171400499, "audio": 1}, {"filename": "/Data/Sound/mBalrogDie.wav", "start": 171400499, "end": 171544855, "audio": 1}, {"filename": "/Data/Sound/mBeetle1.wav", "start": 171544855, "end": 171591905, "audio": 1}, {"filename": "/Data/Sound/mBeetleAttack1.wav", "start": 171591905, "end": 171692607, "audio": 1}, {"filename": "/Data/Sound/mBeetleDie.wav", "start": 171692607, "end": 171801229, "audio": 1}, {"filename": "/Data/Sound/mBepar1.wav", "start": 171801229, "end": 171962911, "audio": 1}, {"filename": "/Data/Sound/mBepar2.wav", "start": 171962911, "end": 172074861, "audio": 1}, {"filename": "/Data/Sound/mBlackSkullAttack.wav", "start": 172074861, "end": 172133219, "audio": 1}, {"filename": "/Data/Sound/mBlackSkullDie.wav", "start": 172133219, "end": 172790857, "audio": 1}, {"filename": "/Data/Sound/mBone1.WAV", "start": 172790857, "end": 172804802}, {"filename": "/Data/Sound/mBone2.wav", "start": 172804802, "end": 172957040, "audio": 1}, {"filename": "/Data/Sound/mBudge1.wav", "start": 172957040, "end": 172994020, "audio": 1}, {"filename": "/Data/Sound/mBudgeAttack1.wav", "start": 172994020, "end": 172999774, "audio": 1}, {"filename": "/Data/Sound/mBudgeDie.wav", "start": 172999774, "end": 173034970, "audio": 1}, {"filename": "/Data/Sound/mBull1.wav", "start": 173034970, "end": 173071442, "audio": 1}, {"filename": "/Data/Sound/mBull2.wav", "start": 173071442, "end": 173113726, "audio": 1}, {"filename": "/Data/Sound/mBullAttack1.wav", "start": 173113726, "end": 173183026, "audio": 1}, {"filename": "/Data/Sound/mBullAttack2.wav", "start": 173183026, "end": 173196158, "audio": 1}, {"filename": "/Data/Sound/mBullDie.wav", "start": 173196158, "end": 173249416, "audio": 1}, {"filename": "/Data/Sound/mChangeup.wav", "start": 173249416, "end": 173414922, "audio": 1}, {"filename": "/Data/Sound/mCursedKing1.wav", "start": 173414922, "end": 174134010, "audio": 1}, {"filename": "/Data/Sound/mCursedKing2.wav", "start": 174134010, "end": 174742914, "audio": 1}, {"filename": "/Data/Sound/mCursedKingDie1.wav", "start": 174742914, "end": 174990172, "audio": 1}, {"filename": "/Data/Sound/mDarkKnight1.wav", "start": 174990172, "end": 175113068, "audio": 1}, {"filename": "/Data/Sound/mDarkKnight2.wav", "start": 175113068, "end": 175299856, "audio": 1}, {"filename": "/Data/Sound/mDarkKnightAttack1.wav", "start": 175299856, "end": 175377232, "audio": 1}, {"filename": "/Data/Sound/mDarkKnightAttack2.wav", "start": 175377232, "end": 175448180, "audio": 1}, {"filename": "/Data/Sound/mDarkKnightDie.wav", "start": 175448180, "end": 175498686, "audio": 1}, {"filename": "/Data/Sound/mDrakan1.wav", "start": 175498686, "end": 175561114, "audio": 1}, {"filename": "/Data/Sound/mDrakanAttack1.wav", "start": 175561114, "end": 175575206, "audio": 1}, {"filename": "/Data/Sound/mDrakanDie.wav", "start": 175575206, "end": 175804188, "audio": 1}, {"filename": "/Data/Sound/mGhaintOrgerDie.wav", "start": 175804188, "end": 175912302, "audio": 1}, {"filename": "/Data/Sound/mGhost1.wav", "start": 175912302, "end": 176083988, "audio": 1}, {"filename": "/Data/Sound/mGhost2.wav", "start": 176083988, "end": 176295974, "audio": 1}, {"filename": "/Data/Sound/mGhostAttack1.wav", "start": 176295974, "end": 176341196, "audio": 1}, {"filename": "/Data/Sound/mGhostAttack2.wav", "start": 176341196, "end": 176381112, "audio": 1}, {"filename": "/Data/Sound/mGhostDie.wav", "start": 176381112, "end": 176540128, "audio": 1}, {"filename": "/Data/Sound/mGiant1.wav", "start": 176540128, "end": 176649098, "audio": 1}, {"filename": "/Data/Sound/mGiant2.wav", "start": 176649098, "end": 176766360, "audio": 1}, {"filename": "/Data/Sound/mGiantAttack1.wav", "start": 176766360, "end": 176770370, "audio": 1}, {"filename": "/Data/Sound/mGiantAttack2.wav", "start": 176770370, "end": 176826610, "audio": 1}, {"filename": "/Data/Sound/mGiantDie.wav", "start": 176826610, "end": 176903612, "audio": 1}, {"filename": "/Data/Sound/mGiantWalk.wav", "start": 176903612, "end": 176915032, "audio": 1}, {"filename": "/Data/Sound/mGoblin1.wav", "start": 176915032, "end": 177028850, "audio": 1}, {"filename": "/Data/Sound/mGoblin2.wav", "start": 177028850, "end": 177203508, "audio": 1}, {"filename": "/Data/Sound/mGoblinAttack1.wav", "start": 177203508, "end": 177339838, "audio": 1}, {"filename": "/Data/Sound/mGoblinAttack2.wav", "start": 177339838, "end": 177457788, "audio": 1}, {"filename": "/Data/Sound/mGoblinDie.wav", "start": 177457788, "end": 177643526, "audio": 1}, {"filename": "/Data/Sound/mGolem1.wav", "start": 177643526, "end": 177840576, "audio": 1}, {"filename": "/Data/Sound/mGolem2.wav", "start": 177840576, "end": 178032870, "audio": 1}, {"filename": "/Data/Sound/mGolemAttack1.wav", "start": 178032870, "end": 178187412, "audio": 1}, {"filename": "/Data/Sound/mGolemAttack2.wav", "start": 178187412, "end": 178383674, "audio": 1}, {"filename": "/Data/Sound/mGolemDie.wav", "start": 178383674, "end": 178584140, "audio": 1}, {"filename": "/Data/Sound/mGorgon1.wav", "start": 178584140, "end": 179082790, "audio": 1}, {"filename": "/Data/Sound/mGorgon2.wav", "start": 179082790, "end": 179249564, "audio": 1}, {"filename": "/Data/Sound/mGorgonAttack1.wav", "start": 179249564, "end": 179353442, "audio": 1}, {"filename": "/Data/Sound/mGorgonAttack2.wav", "start": 179353442, "end": 179409140, "audio": 1}, {"filename": "/Data/Sound/mGorgonDie.wav", "start": 179409140, "end": 179498306, "audio": 1}, {"filename": "/Data/Sound/mHellSpider1.wav", "start": 179498306, "end": 179542648, "audio": 1}, {"filename": "/Data/Sound/mHellSpiderAttack1.wav", "start": 179542648, "end": 179580812, "audio": 1}, {"filename": "/Data/Sound/mHellSpiderDie.wav", "start": 179580812, "end": 179670340, "audio": 1}, {"filename": "/Data/Sound/mHomord1.wav", "start": 179670340, "end": 179854222, "audio": 1}, {"filename": "/Data/Sound/mHomord2.wav", "start": 179854222, "end": 180209620, "audio": 1}, {"filename": "/Data/Sound/mHomordAttack1.wav", "start": 180209620, "end": 180254018, "audio": 1}, {"filename": "/Data/Sound/mHomordDie.wav", "start": 180254018, "end": 180289718, "audio": 1}, {"filename": "/Data/Sound/mHound1.wav", "start": 180289718, "end": 180349500, "audio": 1}, {"filename": "/Data/Sound/mHound2.wav", "start": 180349500, "end": 180458382, "audio": 1}, {"filename": "/Data/Sound/mHoundAttack1.wav", "start": 180458382, "end": 180507534, "audio": 1}, {"filename": "/Data/Sound/mHoundAttack2.wav", "start": 180507534, "end": 180537486, "audio": 1}, {"filename": "/Data/Sound/mHoundDie.wav", "start": 180537486, "end": 180594058, "audio": 1}, {"filename": "/Data/Sound/mHunter1.wav", "start": 180594058, "end": 180771540, "audio": 1}, {"filename": "/Data/Sound/mHunter2.wav", "start": 180771540, "end": 180946082, "audio": 1}, {"filename": "/Data/Sound/mHunterAttack1.wav", "start": 180946082, "end": 181102048, "audio": 1}, {"filename": "/Data/Sound/mHunterAttack2.wav", "start": 181102048, "end": 181259418, "audio": 1}, {"filename": "/Data/Sound/mHunterDie.wav", "start": 181259418, "end": 181333020, "audio": 1}, {"filename": "/Data/Sound/mHydra1.wav", "start": 181333020, "end": 181691554, "audio": 1}, {"filename": "/Data/Sound/mHydraAttack1.wav", "start": 181691554, "end": 181844320, "audio": 1}, {"filename": "/Data/Sound/mIceMonster1.wav", "start": 181844320, "end": 182009812, "audio": 1}, {"filename": "/Data/Sound/mIceMonster2.wav", "start": 182009812, "end": 182113518, "audio": 1}, {"filename": "/Data/Sound/mIceMonsterDie.wav", "start": 182113518, "end": 182233248, "audio": 1}, {"filename": "/Data/Sound/mIceQueen1.wav", "start": 182233248, "end": 182418724, "audio": 1}, {"filename": "/Data/Sound/mIceQueen2.wav", "start": 182418724, "end": 182861462, "audio": 1}, {"filename": "/Data/Sound/mIceQueenAttack1.wav", "start": 182861462, "end": 183103888, "audio": 1}, {"filename": "/Data/Sound/mIceQueenAttack2.wav", "start": 183103888, "end": 183178514, "audio": 1}, {"filename": "/Data/Sound/mIceQueenDie.wav", "start": 183178514, "end": 183339412, "audio": 1}, {"filename": "/Data/Sound/mLarva1.wav", "start": 183339412, "end": 183358366, "audio": 1}, {"filename": "/Data/Sound/mLarva2.wav", "start": 183358366, "end": 183378988, "audio": 1}, {"filename": "/Data/Sound/mLizardKing1.wav", "start": 183378988, "end": 183550290, "audio": 1}, {"filename": "/Data/Sound/mLizardKing2.wav", "start": 183550290, "end": 183705068, "audio": 1}, {"filename": "/Data/Sound/mMagicSkull.wav", "start": 183705068, "end": 183886070, "audio": 1}, {"filename": "/Data/Sound/mMegaCrust1.wav", "start": 183886070, "end": 183908132, "audio": 1}, {"filename": "/Data/Sound/mMegaCrustAttack1.wav", "start": 183908132, "end": 183978120, "audio": 1}, {"filename": "/Data/Sound/mMegaCrustDie.wav", "start": 183978120, "end": 184026082, "audio": 1}, {"filename": "/Data/Sound/mMolt1.wav", "start": 184026082, "end": 184045136, "audio": 1}, {"filename": "/Data/Sound/mMoltAttack1.wav", "start": 184045136, "end": 184064190, "audio": 1}, {"filename": "/Data/Sound/mMoltDie.wav", "start": 184064190, "end": 184123236, "audio": 1}, {"filename": "/Data/Sound/mOgre1.wav", "start": 184123236, "end": 184215620, "audio": 1}, {"filename": "/Data/Sound/mOgre2.wav", "start": 184215620, "end": 184260854, "audio": 1}, {"filename": "/Data/Sound/mOgreAttack1.wav", "start": 184260854, "end": 184382644, "audio": 1}, {"filename": "/Data/Sound/mOgreAttack2.wav", "start": 184382644, "end": 184446194, "audio": 1}, {"filename": "/Data/Sound/mOgreDie.wav", "start": 184446194, "end": 184534512, "audio": 1}, {"filename": "/Data/Sound/mOrcArcherAttack1.wav", "start": 184534512, "end": 184557512, "audio": 1}, {"filename": "/Data/Sound/mOrcCapAttack1.wav", "start": 184557512, "end": 184675040, "audio": 1}, {"filename": "/Data/Sound/mPhantom1.wav", "start": 184675040, "end": 184680786, "audio": 1}, {"filename": "/Data/Sound/mPhantomAttack1.wav", "start": 184680786, "end": 184806324, "audio": 1}, {"filename": "/Data/Sound/mPhantomDie.wav", "start": 184806324, "end": 185117664, "audio": 1}, {"filename": "/Data/Sound/mPhoenix1.wav", "start": 185117664, "end": 185332978, "audio": 1}, {"filename": "/Data/Sound/mPhoenix2.wav", "start": 185332978, "end": 185429718, "audio": 1}, {"filename": "/Data/Sound/mPhoenixAttack1.wav", "start": 185429718, "end": 185561952, "audio": 1}, {"filename": "/Data/Sound/mQuest.wav", "start": 185561952, "end": 185739142, "audio": 1}, {"filename": "/Data/Sound/mRainner1.wav", "start": 185739142, "end": 186074978, "audio": 1}, {"filename": "/Data/Sound/mRainnerAttack1.wav", "start": 186074978, "end": 186095160, "audio": 1}, {"filename": "/Data/Sound/mRainnerDie.wav", "start": 186095160, "end": 186158230, "audio": 1}, {"filename": "/Data/Sound/mRedSkull.wav", "start": 186158230, "end": 186229178, "audio": 1}, {"filename": "/Data/Sound/mRedSkullAttack.wav", "start": 186229178, "end": 186335284, "audio": 1}, {"filename": "/Data/Sound/mRedSkullDie.wav", "start": 186335284, "end": 186443558, "audio": 1}, {"filename": "/Data/Sound/mSatanAttack1.wav", "start": 186443558, "end": 186504792, "audio": 1}, {"filename": "/Data/Sound/mScorpion1.wav", "start": 186504792, "end": 186577838, "audio": 1}, {"filename": "/Data/Sound/mScorpion2.wav", "start": 186577838, "end": 186698760, "audio": 1}, {"filename": "/Data/Sound/mScorpionAttack1.wav", "start": 186698760, "end": 186852326, "audio": 1}, {"filename": "/Data/Sound/mScorpionAttack2.wav", "start": 186852326, "end": 186970880, "audio": 1}, {"filename": "/Data/Sound/mScorpionDie.wav", "start": 186970880, "end": 187124214, "audio": 1}, {"filename": "/Data/Sound/mShadow1.wav", "start": 187124214, "end": 187243322, "audio": 1}, {"filename": "/Data/Sound/mShadow2.wav", "start": 187243322, "end": 187326194, "audio": 1}, {"filename": "/Data/Sound/mShadowAttack1.wav", "start": 187326194, "end": 187388734, "audio": 1}, {"filename": "/Data/Sound/mShadowAttack2.wav", "start": 187388734, "end": 187445318, "audio": 1}, {"filename": "/Data/Sound/mShadowDie.wav", "start": 187445318, "end": 187486624, "audio": 1}, {"filename": "/Data/Sound/mSpider1.wav", "start": 187486624, "end": 187491656, "audio": 1}, {"filename": "/Data/Sound/mValkyrie1.wav", "start": 187491656, "end": 187822782, "audio": 1}, {"filename": "/Data/Sound/mValkyrieDie.wav", "start": 187822782, "end": 188016992, "audio": 1}, {"filename": "/Data/Sound/mWizard1.wav", "start": 188016992, "end": 188165522, "audio": 1}, {"filename": "/Data/Sound/mWizard2.wav", "start": 188165522, "end": 188482868, "audio": 1}, {"filename": "/Data/Sound/mWizardAttack1.wav", "start": 188482868, "end": 188535736, "audio": 1}, {"filename": "/Data/Sound/mWizardAttack2.wav", "start": 188535736, "end": 188636286, "audio": 1}, {"filename": "/Data/Sound/mWizardDie.wav", "start": 188636286, "end": 188673682, "audio": 1}, {"filename": "/Data/Sound/mWoodMon1.wav", "start": 188673682, "end": 188778760, "audio": 1}, {"filename": "/Data/Sound/mWoodMon2.wav", "start": 188778760, "end": 188941774, "audio": 1}, {"filename": "/Data/Sound/mWoodMonAttack1.wav", "start": 188941774, "end": 189092840, "audio": 1}, {"filename": "/Data/Sound/mWoodMonAttack2.wav", "start": 189092840, "end": 189184818, "audio": 1}, {"filename": "/Data/Sound/mWoodMonDie.wav", "start": 189184818, "end": 189322220, "audio": 1}, {"filename": "/Data/Sound/mWorm1.wav", "start": 189322220, "end": 189443358, "audio": 1}, {"filename": "/Data/Sound/mWorm2.wav", "start": 189443358, "end": 189576084, "audio": 1}, {"filename": "/Data/Sound/mWormDie.wav", "start": 189576084, "end": 189633144, "audio": 1}, {"filename": "/Data/Sound/mYeti1.wav", "start": 189633144, "end": 189954318, "audio": 1}, {"filename": "/Data/Sound/mYeti2.wav", "start": 189954318, "end": 190292456, "audio": 1}, {"filename": "/Data/Sound/mYetiAttack1.wav", "start": 190292456, "end": 190429368, "audio": 1}, {"filename": "/Data/Sound/mYetiDie.wav", "start": 190429368, "end": 190520978, "audio": 1}, {"filename": "/Data/Sound/mutant1.wav", "start": 190520978, "end": 190840984, "audio": 1}, {"filename": "/Data/Sound/mutant2.wav", "start": 190840984, "end": 191186474, "audio": 1}, {"filename": "/Data/Sound/mutant_attack1.wav", "start": 191186474, "end": 191323672, "audio": 1}, {"filename": "/Data/Sound/nBlackSmith.wav", "start": 191323672, "end": 191353908, "audio": 1}, {"filename": "/Data/Sound/nHarp.wav", "start": 191353908, "end": 192163442, "audio": 1}, {"filename": "/Data/Sound/nMix.wav", "start": 192163442, "end": 192914884, "audio": 1}, {"filename": "/Data/Sound/pDrink.wav", "start": 192914884, "end": 192995522, "audio": 1}, {"filename": "/Data/Sound/pDropItem.wav", "start": 192995522, "end": 193018180, "audio": 1}, {"filename": "/Data/Sound/pDropMoney.wav", "start": 193018180, "end": 193187882, "audio": 1}, {"filename": "/Data/Sound/pEatApple.wav", "start": 193187882, "end": 193254816, "audio": 1}, {"filename": "/Data/Sound/pEnergy.wav", "start": 193254816, "end": 193315452, "audio": 1}, {"filename": "/Data/Sound/pFemaleScream1.wav", "start": 193315452, "end": 193404918, "audio": 1}, {"filename": "/Data/Sound/pFemaleScream2.wav", "start": 193404918, "end": 193515124, "audio": 1}, {"filename": "/Data/Sound/pGetItem.wav", "start": 193515124, "end": 193528092, "audio": 1}, {"filename": "/Data/Sound/pHeartBeat.wav", "start": 193528092, "end": 193858942, "audio": 1}, {"filename": "/Data/Sound/pLevelUp.wav", "start": 193858942, "end": 194121690, "audio": 1}, {"filename": "/Data/Sound/pMaleDie.wav", "start": 194121690, "end": 194199820, "audio": 1}, {"filename": "/Data/Sound/pMaleScream1.wav", "start": 194199820, "end": 194243462, "audio": 1}, {"filename": "/Data/Sound/pMaleScream2.wav", "start": 194243462, "end": 194296440, "audio": 1}, {"filename": "/Data/Sound/pMaleScream3.wav", "start": 194296440, "end": 194366538, "audio": 1}, {"filename": "/Data/Sound/pSwim.wav", "start": 194366538, "end": 194511264, "audio": 1}, {"filename": "/Data/Sound/pWalk(Grass).wav", "start": 194511264, "end": 194537264, "audio": 1}, {"filename": "/Data/Sound/pWalk(Snow).wav", "start": 194537264, "end": 194552924, "audio": 1}, {"filename": "/Data/Sound/pWalk(Soil).wav", "start": 194552924, "end": 194565798, "audio": 1}, {"filename": "/Data/Sound/sAquaFlash.wav", "start": 194565798, "end": 194739292, "audio": 1}, {"filename": "/Data/Sound/sEvil.wav", "start": 194739292, "end": 195033950, "audio": 1}, {"filename": "/Data/Sound/sFlame.wav", "start": 195033950, "end": 195156980, "audio": 1}, {"filename": "/Data/Sound/sHellFire.wav", "start": 195156980, "end": 195363262, "audio": 1}, {"filename": "/Data/Sound/sIce.wav", "start": 195363262, "end": 195492884, "audio": 1}, {"filename": "/Data/Sound/sKnightDefense.wav", "start": 195492884, "end": 195685670, "audio": 1}, {"filename": "/Data/Sound/sKnightSkill1.wav", "start": 195685670, "end": 195781238, "audio": 1}, {"filename": "/Data/Sound/sKnightSkill2.wav", "start": 195781238, "end": 195817682, "audio": 1}, {"filename": "/Data/Sound/sKnightSkill3.wav", "start": 195817682, "end": 195855406, "audio": 1}, {"filename": "/Data/Sound/sKnightSkill4.wav", "start": 195855406, "end": 195906346, "audio": 1}, {"filename": "/Data/Sound/sMagic.wav", "start": 195906346, "end": 195980532, "audio": 1}, {"filename": "/Data/Sound/sTornado.wav", "start": 195980532, "end": 196376250, "audio": 1}, {"filename": "/Data/World1/EncTerrain1.att", "start": 196376250, "end": 196507326}, {"filename": "/Data/World1/EncTerrain1.map", "start": 196507326, "end": 196703936}, {"filename": "/Data/World1/EncTerrain1.obj", "start": 196703936, "end": 196790040}, {"filename": "/Data/World1/Sky.bmp", "start": 196790040, "end": 197053264}, {"filename": "/Data/World1/Terrain1.att", "start": 197053264, "end": 197118803}, {"filename": "/Data/World1/TerrainHeight.OZB", "start": 197118803, "end": 197185423}, {"filename": "/Data/World1/TerrainLight.OZJ", "start": 197185423, "end": 197256266}, {"filename": "/Data/World1/TileGrass01.OZJ", "start": 197256266, "end": 197326698}, {"filename": "/Data/World1/TileGrass01.OZT", "start": 197326698, "end": 197392282}, {"filename": "/Data/World1/TileGrass02.OZJ", "start": 197392282, "end": 197423517}, {"filename": "/Data/World1/TileGround01.OZJ", "start": 197423517, "end": 197519799}, {"filename": "/Data/World1/TileGround02.OZJ", "start": 197519799, "end": 197543853}, {"filename": "/Data/World1/TileGround03.OZJ", "start": 197543853, "end": 197578415}, {"filename": "/Data/World1/TileRock01.OZJ", "start": 197578415, "end": 197678859}, {"filename": "/Data/World1/TileRock02.OZJ", "start": 197678859, "end": 197710432}, {"filename": "/Data/World1/TileWater01.OZJ", "start": 197710432, "end": 197773432}, {"filename": "/Data/World1/TileWood01.OZJ", "start": 197773432, "end": 197807825}, {"filename": "/Data/World1/leaf01.OZT", "start": 197807825, "end": 197808897}, {"filename": "/Data/World1/rain01.OZT", "start": 197808897, "end": 197809457}, {"filename": "/Data/World1/rain02.OZT", "start": 197809457, "end": 197811553}, {"filename": "/Data/World10/EncTerrain10.att", "start": 197811553, "end": 197877093}, {"filename": "/Data/World10/EncTerrain10.map", "start": 197877093, "end": 198073703}, {"filename": "/Data/World10/EncTerrain10.obj", "start": 198073703, "end": 198090627}, {"filename": "/Data/World10/Terrain10.att", "start": 198090627, "end": 198156166}, {"filename": "/Data/World10/TerrainHeight.OZB", "start": 198156166, "end": 198222786}, {"filename": "/Data/World10/TerrainLight.OZJ", "start": 198222786, "end": 198226939}, {"filename": "/Data/World10/TileGrass01.OZJ", "start": 198226939, "end": 198285598}, {"filename": "/Data/World10/TileGrass02.OZJ", "start": 198285598, "end": 198382074}, {"filename": "/Data/World10/TileGround01.OZJ", "start": 198382074, "end": 198417241}, {"filename": "/Data/World10/TileGround03.OZJ", "start": 198417241, "end": 198438061}, {"filename": "/Data/World10/TileRock01.OZJ", "start": 198438061, "end": 198462381}, {"filename": "/Data/World10/TileRock02.OZJ", "start": 198462381, "end": 198520555}, {"filename": "/Data/World10/TileRock03.OZJ", "start": 198520555, "end": 198589708}, {"filename": "/Data/World10/TileRock04.OZJ", "start": 198589708, "end": 198677723}, {"filename": "/Data/World10/TileWood01.OZJ", "start": 198677723, "end": 198718466}, {"filename": "/Data/World10/leaf02.OZJ", "start": 198718466, "end": 198722967}, {"filename": "/Data/World10/rain03.OZT", "start": 198722967, "end": 198727111}, {"filename": "/Data/World11/EncTerrain11.att", "start": 198727111, "end": 198792651}, {"filename": "/Data/World11/EncTerrain11.map", "start": 198792651, "end": 198989261}, {"filename": "/Data/World11/EncTerrain11.obj", "start": 198989261, "end": 199009365}, {"filename": "/Data/World11/Terrain11.att", "start": 199009365, "end": 199074904}, {"filename": "/Data/World11/TerrainHeight.OZB", "start": 199074904, "end": 199141524}, {"filename": "/Data/World11/TerrainLight.OZJ", "start": 199141524, "end": 199164223}, {"filename": "/Data/World11/TileGrass01.OZJ", "start": 199164223, "end": 199275621}, {"filename": "/Data/World11/leaf01.OZT", "start": 199275621, "end": 199276693}, {"filename": "/Data/World11/leaf02.OZJ", "start": 199276693, "end": 199281138}, {"filename": "/Data/World11/rain01.OZT", "start": 199281138, "end": 199281698}, {"filename": "/Data/World12/EncTerrain12.att", "start": 199281698, "end": 199347238}, {"filename": "/Data/World12/EncTerrain12.map", "start": 199347238, "end": 199543848}, {"filename": "/Data/World12/EncTerrain12.obj", "start": 199543848, "end": 199550152}, {"filename": "/Data/World12/Terrain12.att", "start": 199550152, "end": 199615691}, {"filename": "/Data/World12/TerrainHeight.OZB", "start": 199615691, "end": 199682311}, {"filename": "/Data/World12/TerrainLight.OZJ", "start": 199682311, "end": 199688299}, {"filename": "/Data/World12/TileGrass01.OZJ", "start": 199688299, "end": 199767925}, {"filename": "/Data/World12/TileGrass01.OZT", "start": 199767925, "end": 199833509}, {"filename": "/Data/World12/TileGrass02.OZJ", "start": 199833509, "end": 199914014}, {"filename": "/Data/World12/TileGrass03.OZT", "start": 199914014, "end": 200045134}, {"filename": "/Data/World12/TileGround02.OZJ", "start": 200045134, "end": 200114869}, {"filename": "/Data/World12/TileGround03.OZJ", "start": 200114869, "end": 200187814}, {"filename": "/Data/World12/TileRock01.OZJ", "start": 200187814, "end": 200300013}, {"filename": "/Data/World12/TileRock02.OZJ", "start": 200300013, "end": 200349822}, {"filename": "/Data/World12/TileRock03.OZJ", "start": 200349822, "end": 200383098}, {"filename": "/Data/World12/TileRock04.OZJ", "start": 200383098, "end": 200499630}, {"filename": "/Data/World12/TileWater01.OZJ", "start": 200499630, "end": 200559909}, {"filename": "/Data/World12/TileWood01.OZJ", "start": 200559909, "end": 200596797}, {"filename": "/Data/World12/leaf01.OZT", "start": 200596797, "end": 200597869}, {"filename": "/Data/World12/leaf02.OZJ", "start": 200597869, "end": 200602314}, {"filename": "/Data/World12/rain01.OZT", "start": 200602314, "end": 200602874}, {"filename": "/Data/World2/EncTerrain2.att", "start": 200602874, "end": 200668414}, {"filename": "/Data/World2/EncTerrain2.map", "start": 200668414, "end": 200865024}, {"filename": "/Data/World2/EncTerrain2.obj", "start": 200865024, "end": 200999668}, {"filename": "/Data/World2/Sky.bmp", "start": 200999668, "end": 202048300}, {"filename": "/Data/World2/Terrain2.att", "start": 202048300, "end": 202113839}, {"filename": "/Data/World2/TerrainHeight.OZB", "start": 202113839, "end": 202180459}, {"filename": "/Data/World2/TerrainLight.OZJ", "start": 202180459, "end": 202243885}, {"filename": "/Data/World2/TileGrass01.OZJ", "start": 202243885, "end": 202278282}, {"filename": "/Data/World2/TileGrass02.OZJ", "start": 202278282, "end": 202309517}, {"filename": "/Data/World2/TileGround01.OZJ", "start": 202309517, "end": 202419426}, {"filename": "/Data/World2/TileGround02.OZJ", "start": 202419426, "end": 202441855}, {"filename": "/Data/World2/TileGround03.OZJ", "start": 202441855, "end": 202478168}, {"filename": "/Data/World2/TileRock01.OZJ", "start": 202478168, "end": 202550123}, {"filename": "/Data/World2/TileRock02.OZJ", "start": 202550123, "end": 202582855}, {"filename": "/Data/World2/TileWater01.OZJ", "start": 202582855, "end": 202657740}, {"filename": "/Data/World2/TileWood01.OZJ", "start": 202657740, "end": 202690966}, {"filename": "/Data/World3/EncTerrain3.att", "start": 202690966, "end": 202756506}, {"filename": "/Data/World3/EncTerrain3.map", "start": 202756506, "end": 202953116}, {"filename": "/Data/World3/EncTerrain3.obj", "start": 202953116, "end": 203017440}, {"filename": "/Data/World3/Sky.bmp", "start": 203017440, "end": 204066072}, {"filename": "/Data/World3/Terrain3.att", "start": 204066072, "end": 204131611}, {"filename": "/Data/World3/TerrainHeight.OZB", "start": 204131611, "end": 204198231}, {"filename": "/Data/World3/TerrainLight.OZJ", "start": 204198231, "end": 204262413}, {"filename": "/Data/World3/TileGrass01.OZJ", "start": 204262413, "end": 204325362}, {"filename": "/Data/World3/TileGrass02.OZJ", "start": 204325362, "end": 204345073}, {"filename": "/Data/World3/TileGrass02.OZT", "start": 204345073, "end": 204410657}, {"filename": "/Data/World3/TileGround01.OZJ", "start": 204410657, "end": 204496051}, {"filename": "/Data/World3/TileGround02.OZJ", "start": 204496051, "end": 204519099}, {"filename": "/Data/World3/TileGround03.OZJ", "start": 204519099, "end": 204550198}, {"filename": "/Data/World3/TileRock01.OZJ", "start": 204550198, "end": 204607415}, {"filename": "/Data/World3/TileRock02.OZJ", "start": 204607415, "end": 204628151}, {"filename": "/Data/World3/TileRock03.OZJ", "start": 204628151, "end": 204650470}, {"filename": "/Data/World3/TileRock04.OZJ", "start": 204650470, "end": 204671718}, {"filename": "/Data/World3/TileRock05.OZJ", "start": 204671718, "end": 204760923}, {"filename": "/Data/World3/TileRock06.OZJ", "start": 204760923, "end": 204773270}, {"filename": "/Data/World3/TileRock07.OZJ", "start": 204773270, "end": 204865882}, {"filename": "/Data/World3/TileWater01.OZJ", "start": 204865882, "end": 204934329}, {"filename": "/Data/World3/TileWood01.OZJ", "start": 204934329, "end": 204963959}, {"filename": "/Data/World3/leaf01.OZJ", "start": 204963959, "end": 204966130}, {"filename": "/Data/World3/leaf01.OZT", "start": 204966130, "end": 204970274}, {"filename": "/Data/World3/leaf02.OZJ", "start": 204970274, "end": 204972514}, {"filename": "/Data/World4/EncTerrain4.att", "start": 204972514, "end": 205038054}, {"filename": "/Data/World4/EncTerrain4.map", "start": 205038054, "end": 205234664}, {"filename": "/Data/World4/EncTerrain4.obj", "start": 205234664, "end": 205516638}, {"filename": "/Data/World4/Sky.bmp", "start": 205516638, "end": 206565268}, {"filename": "/Data/World4/Terrain4.att", "start": 206565268, "end": 206630807}, {"filename": "/Data/World4/TerrainHeight.OZB", "start": 206630807, "end": 206697427}, {"filename": "/Data/World4/TerrainLight.OZJ", "start": 206697427, "end": 206734328}, {"filename": "/Data/World4/TileGrass01.OZJ", "start": 206734328, "end": 206841372}, {"filename": "/Data/World4/TileGrass01.OZT", "start": 206841372, "end": 206906956}, {"filename": "/Data/World4/TileGrass03.OZT", "start": 206906956, "end": 207038076}, {"filename": "/Data/World4/TileGround01.OZJ", "start": 207038076, "end": 207069375}, {"filename": "/Data/World4/TileGround03.OZJ", "start": 207069375, "end": 207100941}, {"filename": "/Data/World4/TileRock01.OZJ", "start": 207100941, "end": 207135438}, {"filename": "/Data/World4/TileRock02.OZJ", "start": 207135438, "end": 207204242}, {"filename": "/Data/World4/TileRock03.OZJ", "start": 207204242, "end": 207302384}, {"filename": "/Data/World4/TileRock04.OZJ", "start": 207302384, "end": 207393168}, {"filename": "/Data/World4/TileWater01.OZJ", "start": 207393168, "end": 207495693}, {"filename": "/Data/World4/TileWood01.OZJ", "start": 207495693, "end": 207528919}, {"filename": "/Data/World4/leaf01.OZT", "start": 207528919, "end": 207529991}, {"filename": "/Data/World5/EncTerrain5.att", "start": 207529991, "end": 207595531}, {"filename": "/Data/World5/EncTerrain5.map", "start": 207595531, "end": 207792141}, {"filename": "/Data/World5/EncTerrain5.obj", "start": 207792141, "end": 207953545}, {"filename": "/Data/World5/Sky.bmp", "start": 207953545, "end": 209002177}, {"filename": "/Data/World5/Terrain5.att", "start": 209002177, "end": 209067716}, {"filename": "/Data/World5/TerrainHeight.OZB", "start": 209067716, "end": 209134336}, {"filename": "/Data/World5/TerrainLight.OZJ", "start": 209134336, "end": 209201554}, {"filename": "/Data/World5/TileGrass01.OZJ", "start": 209201554, "end": 209275041}, {"filename": "/Data/World5/TileGrass02.OZJ", "start": 209275041, "end": 209345735}, {"filename": "/Data/World5/TileGround01.OZJ", "start": 209345735, "end": 209362919}, {"filename": "/Data/World5/TileGround02.OZJ", "start": 209362919, "end": 209483732}, {"filename": "/Data/World5/TileGround03.OZJ", "start": 209483732, "end": 209511115}, {"filename": "/Data/World5/TileRock01.OZJ", "start": 209511115, "end": 209539315}, {"filename": "/Data/World5/TileRock02.OZJ", "start": 209539315, "end": 209610140}, {"filename": "/Data/World5/TileRock03.OZJ", "start": 209610140, "end": 209675876}, {"filename": "/Data/World5/TileRock04.OZJ", "start": 209675876, "end": 209759270}, {"filename": "/Data/World5/TileWater01.OZJ", "start": 209759270, "end": 209878326}, {"filename": "/Data/World5/TileWood01.OZJ", "start": 209878326, "end": 209912959}, {"filename": "/Data/World5/leaf02.OZJ", "start": 209912959, "end": 209917404}, {"filename": "/Data/World6/EncTerrain6.att", "start": 209917404, "end": 209982944}, {"filename": "/Data/World6/EncTerrain6.map", "start": 209982944, "end": 210179554}, {"filename": "/Data/World6/EncTerrain6.obj", "start": 210179554, "end": 210179558}, {"filename": "/Data/World6/Terrain6.att", "start": 210179558, "end": 210245097}, {"filename": "/Data/World6/TerrainHeight.OZB", "start": 210245097, "end": 210311715}, {"filename": "/Data/World6/TerrainHeight0.OZB", "start": 210311715, "end": 210378335}, {"filename": "/Data/World6/TerrainLight.OZJ", "start": 210378335, "end": 210442517}, {"filename": "/Data/World6/TerrainLight0.OZJ", "start": 210442517, "end": 210479418}, {"filename": "/Data/World6/Terrainmap.OZB", "start": 210479418, "end": 210546038}, {"filename": "/Data/World6/TileGrass01.OZJ", "start": 210546038, "end": 210645908}, {"filename": "/Data/World6/TileGrass01.OZT", "start": 210645908, "end": 210711492}, {"filename": "/Data/World6/TileGrass012.OZJ", "start": 210711492, "end": 210819969}, {"filename": "/Data/World6/TileGrass013.OZJ", "start": 210819969, "end": 210922494}, {"filename": "/Data/World6/TileGrass02.OZJ", "start": 210922494, "end": 210967536}, {"filename": "/Data/World6/TileGrass021.OZJ", "start": 210967536, "end": 211054909}, {"filename": "/Data/World6/TileGrass023.OZJ", "start": 211054909, "end": 211177596}, {"filename": "/Data/World6/TileGround01.OZJ", "start": 211177596, "end": 211252733}, {"filename": "/Data/World6/TileGround011.OZJ", "start": 211252733, "end": 211288165}, {"filename": "/Data/World6/TileGround012.OZJ", "start": 211288165, "end": 211395531}, {"filename": "/Data/World6/TileGround02.OZJ", "start": 211395531, "end": 211516344}, {"filename": "/Data/World6/TileGround03.OZJ", "start": 211516344, "end": 211648592}, {"filename": "/Data/World6/TileRock01.OZJ", "start": 211648592, "end": 211749545}, {"filename": "/Data/World6/TileRock012.OZJ", "start": 211749545, "end": 211784042}, {"filename": "/Data/World6/TileRock02.OZJ", "start": 211784042, "end": 211894409}, {"filename": "/Data/World6/TileRock021.OZJ", "start": 211894409, "end": 211981782}, {"filename": "/Data/World6/TileRock022.OZJ", "start": 211981782, "end": 212089148}, {"filename": "/Data/World6/TileRock03.OZJ", "start": 212089148, "end": 212159884}, {"filename": "/Data/World6/TileRock04.OZJ", "start": 212159884, "end": 212235191}, {"filename": "/Data/World6/TileWater01.OZJ", "start": 212235191, "end": 212331364}, {"filename": "/Data/World6/TileWood01.OZJ", "start": 212331364, "end": 212439523}, {"filename": "/Data/World6/leaf01.OZT", "start": 212439523, "end": 212440595}, {"filename": "/Data/World6/leaf02.OZJ", "start": 212440595, "end": 212445040}, {"filename": "/Data/World7/EncTerrain7.att", "start": 212445040, "end": 212510580}, {"filename": "/Data/World7/EncTerrain7.map", "start": 212510580, "end": 212707190}, {"filename": "/Data/World7/EncTerrain7.obj", "start": 212707190, "end": 212765454}, {"filename": "/Data/World7/Sky.bmp", "start": 212765454, "end": 213814086}, {"filename": "/Data/World7/Terrain7.att", "start": 213814086, "end": 213879625}, {"filename": "/Data/World7/TerrainHeight.OZB", "start": 213879625, "end": 213946245}, {"filename": "/Data/World7/TerrainLight.OZJ", "start": 213946245, "end": 213968960}, {"filename": "/Data/World7/TileGrass01.OZJ", "start": 213968960, "end": 214079588}, {"filename": "/Data/World7/TileGrass01.OZT", "start": 214079588, "end": 214145172}, {"filename": "/Data/World7/TileGrass02.OZJ", "start": 214145172, "end": 214263194}, {"filename": "/Data/World7/TileGround02.OZJ", "start": 214263194, "end": 214384007}, {"filename": "/Data/World7/TileGround03.OZJ", "start": 214384007, "end": 214420989}, {"filename": "/Data/World7/TileRock01.OZJ", "start": 214420989, "end": 214453209}, {"filename": "/Data/World7/TileRock02.OZJ", "start": 214453209, "end": 214540448}, {"filename": "/Data/World7/TileRock03.OZJ", "start": 214540448, "end": 214622434}, {"filename": "/Data/World7/TileRock04.OZJ", "start": 214622434, "end": 214719148}, {"filename": "/Data/World7/TileWater01.OZJ", "start": 214719148, "end": 214806521}, {"filename": "/Data/World7/TileWood01.OZJ", "start": 214806521, "end": 214847264}, {"filename": "/Data/World7/leaf01.OZT", "start": 214847264, "end": 214848336}, {"filename": "/Data/World7/leaf02.OZJ", "start": 214848336, "end": 214852781}, {"filename": "/Data/World8/EncTerrain8.att", "start": 214852781, "end": 214918321}, {"filename": "/Data/World8/EncTerrain8.map", "start": 214918321, "end": 215114931}, {"filename": "/Data/World8/EncTerrain8.obj", "start": 215114931, "end": 215271085}, {"filename": "/Data/World8/Sky.bmp", "start": 215271085, "end": 216319717}, {"filename": "/Data/World8/Terrain8.att", "start": 216319717, "end": 216385256}, {"filename": "/Data/World8/TerrainHeight.OZB", "start": 216385256, "end": 216451876}, {"filename": "/Data/World8/TerrainLight.OZJ", "start": 216451876, "end": 216517347}, {"filename": "/Data/World8/TileGrass01.OZJ", "start": 216517347, "end": 216625824}, {"filename": "/Data/World8/TileGrass02.OZJ", "start": 216625824, "end": 216748511}, {"filename": "/Data/World8/TileGround01.OZJ", "start": 216748511, "end": 216783678}, {"filename": "/Data/World8/TileGround03.OZJ", "start": 216783678, "end": 216819110}, {"filename": "/Data/World8/TileRock01.OZJ", "start": 216819110, "end": 216849353}, {"filename": "/Data/World8/TileRock02.OZJ", "start": 216849353, "end": 216956719}, {"filename": "/Data/World8/TileRock03.OZJ", "start": 216956719, "end": 217025872}, {"filename": "/Data/World8/TileRock04.OZJ", "start": 217025872, "end": 217118756}, {"filename": "/Data/World8/TileWood01.OZJ", "start": 217118756, "end": 217159499}, {"filename": "/Data/World8/leaf01.OZJ", "start": 217159499, "end": 217164000}, {"filename": "/Data/World8/leaf02.OZJ", "start": 217164000, "end": 217168501}, {"filename": "/Data/World9/EncTerrain9.att", "start": 217168501, "end": 217234041}, {"filename": "/Data/World9/EncTerrain9.map", "start": 217234041, "end": 217430651}, {"filename": "/Data/World9/EncTerrain9.obj", "start": 217430651, "end": 217530465}, {"filename": "/Data/World9/Sky.bmp", "start": 217530465, "end": 218579097}, {"filename": "/Data/World9/Terrain9.att", "start": 218579097, "end": 218644636}, {"filename": "/Data/World9/TerrainHeight.OZB", "start": 218644636, "end": 218711256}, {"filename": "/Data/World9/TerrainLight.OZJ", "start": 218711256, "end": 218790275}, {"filename": "/Data/World9/TileGrass01.OZJ", "start": 218790275, "end": 218901673}, {"filename": "/Data/World9/TileGrass01.OZT", "start": 218901673, "end": 218967257}, {"filename": "/Data/World9/TileGrass02.OZJ", "start": 218967257, "end": 219085279}, {"filename": "/Data/World9/TileGrass03.OZT", "start": 219085279, "end": 219216399}, {"filename": "/Data/World9/TileGround01.OZJ", "start": 219216399, "end": 219251566}, {"filename": "/Data/World9/TileGround02.OZJ", "start": 219251566, "end": 219321691}, {"filename": "/Data/World9/TileGround03.OZJ", "start": 219321691, "end": 219354057}, {"filename": "/Data/World9/TileRock01.OZJ", "start": 219354057, "end": 219465958}, {"filename": "/Data/World9/TileRock02.OZJ", "start": 219465958, "end": 219549707}, {"filename": "/Data/World9/TileRock03.OZJ", "start": 219549707, "end": 219582983}, {"filename": "/Data/World9/TileRock04.OZJ", "start": 219582983, "end": 219699260}, {"filename": "/Data/World9/TileWater01.OZJ", "start": 219699260, "end": 219759539}, {"filename": "/Data/World9/TileWood01.OZJ", "start": 219759539, "end": 219796427}, {"filename": "/config.ini", "start": 219796427, "end": 219797302}], "remote_package_size": 219797302});

  })();

    // All the pre-js content up to here must remain later on, we need to run
    // it.
    if ((typeof ENVIRONMENT_IS_WASM_WORKER != 'undefined' && ENVIRONMENT_IS_WASM_WORKER) || (typeof ENVIRONMENT_IS_PTHREAD != 'undefined' && ENVIRONMENT_IS_PTHREAD) || (typeof ENVIRONMENT_IS_AUDIO_WORKLET != 'undefined' && ENVIRONMENT_IS_AUDIO_WORKLET)) Module['preRun'] = [];
    var necessaryPreJSTasks = Module['preRun'].slice();

    if (!Module['preRun']) throw 'Module.preRun should exist because file support used it; did a pre-js delete it?';
    necessaryPreJSTasks.forEach((task) => {
      if (Module['preRun'].indexOf(task) < 0) throw 'All preRun tasks that exist before user pre-js code should remain after; did you replace Module or modify Module.preRun?';
    });


var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// In MODULARIZE mode _scriptName needs to be captured already at the very top of the page immediately when the page is parsed, so it is generated there
// before the page load. In non-MODULARIZE modes generate it here.
var _scriptName = typeof document != 'undefined' ? document.currentScript?.src : undefined;

if (typeof __filename != 'undefined') { // Node
  _scriptName = __filename;
} else
if (ENVIRONMENT_IS_WORKER) {
  _scriptName = self.location.href;
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  const isNode = typeof process == 'object' && process.versions?.node && process.type != 'renderer';
  if (!isNode) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');

  scriptDirectory = __dirname + '/';

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename);
  assert(Buffer.isBuffer(ret));
  return ret;
};

readAsync = async (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : filename;
  var ret = fs.readFileSync(filename, binary ? undefined : 'utf8');
  assert(binary ? Buffer.isBuffer(ret) : typeof ret == 'string');
  return ret;
};
// end include: node_shell_read.js
  if (process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here
  if (typeof module != 'undefined') {
    module['exports'] = Module;
  }

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  const isNode = typeof process == 'object' && process.versions?.node && process.type != 'renderer';
  if (isNode || typeof window == 'object' || typeof WorkerGlobalScope != 'undefined') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL('.', _scriptName).href; // includes trailing slash
  } catch {
    // Must be a `blob:` or `data:` URL (e.g. `blob:http://site.com/etc/etc`), we cannot
    // infer anything from them.
  }

  if (!(typeof window == 'object' || typeof WorkerGlobalScope != 'undefined')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = async (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    var response = await fetch(url, { credentials: 'same-origin' });
    if (response.ok) {
      return response.arrayBuffer();
    }
    throw new Error(response.status + ' : ' + response.url);
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = console.log.bind(console);
var err = console.error.bind(console);

var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

// perform assertions in shell.js after we set up out() and err(), as otherwise
// if an assertion fails it cannot print the message

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// Wasm globals

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
function _free() {
  // Show a helpful error since we used to include free by default in the past.
  abort('free() called but not included in the build - add `_free` to EXPORTED_FUNCTIONS');
}

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');

// include: runtime_common.js
// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
// include: runtime_exceptions.js
// end include: runtime_exceptions.js
// include: runtime_debug.js
var runtimeDebug = true; // Switch to false at runtime to disable logging at the right times

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  if (!runtimeDebug && typeof runtimeDebug != 'undefined') return;
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}

// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

function consumedModuleProp(prop) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      set() {
        abort(`Attempt to set \`Module.${prop}\` after it has already been processed.  This can happen, for example, when code is injected via '--post-js' rather than '--pre-js'`);

      }
    });
  }
}

function makeInvalidEarlyAccess(name) {
  return () => assert(false, `call to '${name}' via reference taken before Wasm module initialization`);

}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */
function hookGlobalSymbolAccess(sym, func) {
  if (typeof globalThis != 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        func();
        return undefined;
      }
    });
  }
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith('_')) {
      librarySymbol = '$' + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
    }
    warnOnce(msg);
  });

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// end include: runtime_debug.js
// Memory management

var wasmMemory;

var
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// BigInt64Array type is not correctly defined in closure
var
/** not-@type {!BigInt64Array} */
  HEAP64,
/* BigUint64Array type is not correctly defined in closure
/** not-@type {!BigUint64Array} */
  HEAPU64;

var runtimeInitialized = false;



function updateMemoryViews() {
  var b = wasmMemory.buffer;
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
  HEAP64 = new BigInt64Array(b);
  HEAPU64 = new BigUint64Array(b);
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// end include: runtime_common.js
assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  consumedModuleProp('preRun');
  // Begin ATPRERUNS hooks
  callRuntimeCallbacks(onPreRuns);
  // End ATPRERUNS hooks
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  // Begin ATINITS hooks
  if (!Module['noFSInit'] && !FS.initialized) FS.init();
TTY.init();
  // End ATINITS hooks

  wasmExports['__wasm_call_ctors']();

  // Begin ATPOSTCTORS hooks
  FS.ignorePermissions = false;
  // End ATPOSTCTORS hooks
}

function preMain() {
  checkStackCookie();
  // No ATMAINS hooks
}

function postRun() {
  checkStackCookie();
   // PThreads reuse the runtime from the main thread.

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  consumedModuleProp('postRun');

  // Begin ATPOSTRUNS hooks
  callRuntimeCallbacks(onPostRuns);
  // End ATPOSTRUNS hooks
}

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};
var runDependencyWatcher = null;

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

var wasmBinaryFile;

function findWasmBinary() {
    return locateFile('shell_login.wasm');
}

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

async function getWasmBinary(binaryFile) {
  // If we don't have the binary yet, load it asynchronously using readAsync.
  if (!wasmBinary) {
    // Fetch the binary using readAsync
    try {
      var response = await readAsync(binaryFile);
      return new Uint8Array(response);
    } catch {
      // Fall back to getBinarySync below;
    }
  }

  // Otherwise, getBinarySync should be able to get it synchronously
  return getBinarySync(binaryFile);
}

async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  }
}

async function instantiateAsync(binary, binaryFile, imports) {
  if (!binary && typeof WebAssembly.instantiateStreaming == 'function'
      // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
      && !isFileURI(binaryFile)
      // Avoid instantiateStreaming() on Node.js environment for now, as while
      // Node.js v18.1.0 implements it, it does not have a full fetch()
      // implementation yet.
      //
      // Reference:
      //   https://github.com/emscripten-core/emscripten/pull/16917
      && !ENVIRONMENT_IS_NODE
     ) {
    try {
      var response = fetch(binaryFile, { credentials: 'same-origin' });
      var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
      return instantiationResult;
    } catch (reason) {
      // We expect the most common failure cause to be a bad MIME type for the binary,
      // in which case falling back to ArrayBuffer instantiation should work.
      err(`wasm streaming compile failed: ${reason}`);
      err('falling back to ArrayBuffer instantiation');
      // fall back of instantiateArrayBuffer below
    };
  }
  return instantiateArrayBuffer(binaryFile, imports);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
async function createWasm() {
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    assignWasmExports(wasmExports);
    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    return receiveInstance(result['instance']);
  }

  var info = getWasmImports();

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    return new Promise((resolve, reject) => {
      try {
        Module['instantiateWasm'](info, (mod, inst) => {
          resolve(receiveInstance(mod, inst));
        });
      } catch(e) {
        err(`Module.instantiateWasm callback failed with error: ${e}`);
        reject(e);
      }
    });
  }

  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}

// end include: preamble.js

// Begin JS library code


  class ExitStatus {
      name = 'ExitStatus';
      constructor(status) {
        this.message = `Program terminated with exit(${status})`;
        this.status = status;
      }
    }

  var callRuntimeCallbacks = (callbacks) => {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    };
  var onPostRuns = [];
  var addOnPostRun = (cb) => onPostRuns.push(cb);

  var onPreRuns = [];
  var addOnPreRun = (cb) => onPreRuns.push(cb);


  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP64[((ptr)>>3)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': HEAP64[((ptr)>>3)] = BigInt(value); break;
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined/NaN means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      // When using conditional TextDecoder, skip it for short strings as the overhead of the native call is not worth it.
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) =>
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);

  class ExceptionInfo {
      // excPtr - Thrown object pointer to wrap. Metadata pointer is calculated from it.
      constructor(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
      }
  
      set_type(type) {
        HEAPU32[(((this.ptr)+(4))>>2)] = type;
      }
  
      get_type() {
        return HEAPU32[(((this.ptr)+(4))>>2)];
      }
  
      set_destructor(destructor) {
        HEAPU32[(((this.ptr)+(8))>>2)] = destructor;
      }
  
      get_destructor() {
        return HEAPU32[(((this.ptr)+(8))>>2)];
      }
  
      set_caught(caught) {
        caught = caught ? 1 : 0;
        HEAP8[(this.ptr)+(12)] = caught;
      }
  
      get_caught() {
        return HEAP8[(this.ptr)+(12)] != 0;
      }
  
      set_rethrown(rethrown) {
        rethrown = rethrown ? 1 : 0;
        HEAP8[(this.ptr)+(13)] = rethrown;
      }
  
      get_rethrown() {
        return HEAP8[(this.ptr)+(13)] != 0;
      }
  
      // Initialize native structure fields. Should be called once after allocated.
      init(type, destructor) {
        this.set_adjusted_ptr(0);
        this.set_type(type);
        this.set_destructor(destructor);
      }
  
      set_adjusted_ptr(adjustedPtr) {
        HEAPU32[(((this.ptr)+(16))>>2)] = adjustedPtr;
      }
  
      get_adjusted_ptr() {
        return HEAPU32[(((this.ptr)+(16))>>2)];
      }
    }
  
  var exceptionLast = 0;
  
  var uncaughtExceptionCount = 0;
  var ___cxa_throw = (ptr, type, destructor) => {
      var info = new ExceptionInfo(ptr);
      // Initialize ExceptionInfo content after it was allocated in __cxa_allocate_exception.
      info.init(type, destructor);
      exceptionLast = ptr;
      uncaughtExceptionCount++;
      assert(false, 'Exception thrown, but exception catching is not enabled. Compile with -sNO_DISABLE_EXCEPTION_CATCHING or -sEXCEPTION_CATCHING_ALLOWED=[..] to catch.');
    };

  /** @suppress {duplicate } */
  var syscallGetVarargI = () => {
      assert(SYSCALLS.varargs != undefined);
      // the `+` prepended here is necessary to convince the JSCompiler that varargs is indeed a number.
      var ret = HEAP32[((+SYSCALLS.varargs)>>2)];
      SYSCALLS.varargs += 4;
      return ret;
    };
  var syscallGetVarargP = syscallGetVarargI;
  
  
  var PATH = {
  isAbs:(path) => path.charAt(0) === '/',
  splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },
  normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },
  normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.slice(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },
  dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.slice(0, -1);
        }
        return root + dir;
      },
  basename:(path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
  join:(...paths) => PATH.normalize(paths.join('/')),
  join2:(l, r) => PATH.normalize(l + '/' + r),
  };
  
  var initRandomFill = () => {
      // This block is not needed on v19+ since crypto.getRandomValues is builtin
      if (ENVIRONMENT_IS_NODE) {
        var nodeCrypto = require('crypto');
        return (view) => nodeCrypto.randomFillSync(view);
      }
  
      return (view) => crypto.getRandomValues(view);
    };
  var randomFill = (view) => {
      // Lazily init on the first invocation.
      (randomFill = initRandomFill())(view);
    };
  
  
  
  var PATH_FS = {
  resolve:(...args) => {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? args[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },
  relative:(from, to) => {
        from = PATH_FS.resolve(from).slice(1);
        to = PATH_FS.resolve(to).slice(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      },
  };
  
  
  
  var FS_stdin_getChar_buffer = [];
  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.codePointAt(i);
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
          // Gotcha: if codePoint is over 0xFFFF, it is represented as a surrogate pair in UTF-16.
          // We need to manually skip over the second code unit for correct iteration.
          i++;
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  /** @type {function(string, boolean=, number=)} */
  var intArrayFromString = (stringy, dontAddNull, length) => {
      var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
      var u8array = new Array(len);
      var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
      if (dontAddNull) u8array.length = numBytesWritten;
      return u8array;
    };
  var FS_stdin_getChar = () => {
      if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
          // we will read data by chunks of BUFSIZE
          var BUFSIZE = 256;
          var buf = Buffer.alloc(BUFSIZE);
          var bytesRead = 0;
  
          // For some reason we must suppress a closure warning here, even though
          // fd definitely exists on process.stdin, and is even the proper way to
          // get the fd of stdin,
          // https://github.com/nodejs/help/issues/2136#issuecomment-523649904
          // This started to happen after moving this logic out of library_tty.js,
          // so it is related to the surrounding code in some unclear manner.
          /** @suppress {missingProperties} */
          var fd = process.stdin.fd;
  
          try {
            bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
          } catch(e) {
            // Cross-platform differences: on Windows, reading EOF throws an
            // exception, but on other OSes, reading EOF returns 0. Uniformize
            // behavior by treating the EOF exception to return 0.
            if (e.toString().includes('EOF')) bytesRead = 0;
            else throw e;
          }
  
          if (bytesRead > 0) {
            result = buf.slice(0, bytesRead).toString('utf-8');
          }
        } else
        if (typeof window != 'undefined' &&
          typeof window.prompt == 'function') {
          // Browser.
          result = window.prompt('Input: ');  // returns null on cancel
          if (result !== null) {
            result += '\n';
          }
        } else
        {}
        if (!result) {
          return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
      }
      return FS_stdin_getChar_buffer.shift();
    };
  var TTY = {
  ttys:[],
  init() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },
  shutdown() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },
  register(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },
  stream_ops:{
  open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },
  close(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },
  fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        },
  read(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.atime = Date.now();
          }
          return bytesRead;
        },
  write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.mtime = stream.node.ctime = Date.now();
          }
          return i;
        },
  },
  default_tty_ops:{
  get_char(tty) {
          return FS_stdin_getChar();
        },
  put_char(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },
  fsync(tty) {
          if (tty.output?.length > 0) {
            out(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        },
  ioctl_tcgets(tty) {
          // typical setting
          return {
            c_iflag: 25856,
            c_oflag: 5,
            c_cflag: 191,
            c_lflag: 35387,
            c_cc: [
              0x03, 0x1c, 0x7f, 0x15, 0x04, 0x00, 0x01, 0x00, 0x11, 0x13, 0x1a, 0x00,
              0x12, 0x0f, 0x17, 0x16, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
              0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
            ]
          };
        },
  ioctl_tcsets(tty, optional_actions, data) {
          // currently just ignore
          return 0;
        },
  ioctl_tiocgwinsz(tty) {
          return [24, 80];
        },
  },
  default_tty1_ops:{
  put_char(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },
  fsync(tty) {
          if (tty.output?.length > 0) {
            err(UTF8ArrayToString(tty.output));
            tty.output = [];
          }
        },
  },
  };
  
  
  var mmapAlloc = (size) => {
      abort('internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported');
    };
  var MEMFS = {
  ops_table:null,
  mount(mount) {
        return MEMFS.createNode(null, '/', 16895, 0);
      },
  createNode(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        MEMFS.ops_table ||= {
          dir: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              lookup: MEMFS.node_ops.lookup,
              mknod: MEMFS.node_ops.mknod,
              rename: MEMFS.node_ops.rename,
              unlink: MEMFS.node_ops.unlink,
              rmdir: MEMFS.node_ops.rmdir,
              readdir: MEMFS.node_ops.readdir,
              symlink: MEMFS.node_ops.symlink
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek
            }
          },
          file: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: {
              llseek: MEMFS.stream_ops.llseek,
              read: MEMFS.stream_ops.read,
              write: MEMFS.stream_ops.write,
              mmap: MEMFS.stream_ops.mmap,
              msync: MEMFS.stream_ops.msync
            }
          },
          link: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr,
              readlink: MEMFS.node_ops.readlink
            },
            stream: {}
          },
          chrdev: {
            node: {
              getattr: MEMFS.node_ops.getattr,
              setattr: MEMFS.node_ops.setattr
            },
            stream: FS.chrdev_stream_ops
          }
        };
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.atime = node.mtime = node.ctime = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.atime = parent.mtime = parent.ctime = node.atime;
        }
        return node;
      },
  getFileDataAsTypedArray(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },
  expandFileStorage(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },
  resizeFileStorage(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },
  node_ops:{
  getattr(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.atime);
          attr.mtime = new Date(node.mtime);
          attr.ctime = new Date(node.ctime);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },
  setattr(node, attr) {
          for (const key of ["mode", "atime", "mtime", "ctime"]) {
            if (attr[key] != null) {
              node[key] = attr[key];
            }
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },
  lookup(parent, name) {
          throw new FS.ErrnoError(44);
        },
  mknod(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },
  rename(old_node, new_dir, new_name) {
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {}
          if (new_node) {
            if (FS.isDir(old_node.mode)) {
              // if we're overwriting a directory at new_name, make sure it's empty.
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
            FS.hashRemoveNode(new_node);
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          new_dir.contents[new_name] = old_node;
          old_node.name = new_name;
          new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
        },
  unlink(parent, name) {
          delete parent.contents[name];
          parent.ctime = parent.mtime = Date.now();
        },
  rmdir(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.ctime = parent.mtime = Date.now();
        },
  readdir(node) {
          return ['.', '..', ...Object.keys(node.contents)];
        },
  symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 0o777 | 40960, 0);
          node.link = oldpath;
          return node;
        },
  readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        },
  },
  stream_ops:{
  read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },
  write(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
  
          if (!length) return 0;
          var node = stream.node;
          node.mtime = node.ctime = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },
  llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },
  mmap(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              // Try to avoid unnecessary slices.
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP8.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        },
  msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        },
  },
  };
  
  var asyncLoad = async (url) => {
      var arrayBuffer = await readAsync(url);
      assert(arrayBuffer, `Loading data file "${url}" failed (no arrayBuffer).`);
      return new Uint8Array(arrayBuffer);
    };
  
  
  var FS_createDataFile = (...args) => FS.createDataFile(...args);
  
  var getUniqueRunDependency = (id) => {
      var orig = id;
      while (1) {
        if (!runDependencyTracking[id]) return id;
        id = orig + Math.random();
      }
    };
  
  var preloadPlugins = [];
  var FS_handledByPreloadPlugin = (byteArray, fullname, finish, onerror) => {
      // Ensure plugins are ready.
      if (typeof Browser != 'undefined') Browser.init();
  
      var handled = false;
      preloadPlugins.forEach((plugin) => {
        if (handled) return;
        if (plugin['canHandle'](fullname)) {
          plugin['handle'](byteArray, fullname, finish, onerror);
          handled = true;
        }
      });
      return handled;
    };
  var FS_createPreloadedFile = (parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
      // TODO we should allow people to just pass in a complete filename instead
      // of parent and name being that we just join them anyways
      var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
      var dep = getUniqueRunDependency(`cp ${fullname}`); // might have several active requests for the same fullname
      function processData(byteArray) {
        function finish(byteArray) {
          preFinish?.();
          if (!dontCreateFile) {
            FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
          }
          onload?.();
          removeRunDependency(dep);
        }
        if (FS_handledByPreloadPlugin(byteArray, fullname, finish, () => {
          onerror?.();
          removeRunDependency(dep);
        })) {
          return;
        }
        finish(byteArray);
      }
      addRunDependency(dep);
      if (typeof url == 'string') {
        asyncLoad(url).then(processData, onerror);
      } else {
        processData(url);
      }
    };
  
  var FS_modeStringToFlags = (str) => {
      var flagModes = {
        'r': 0,
        'r+': 2,
        'w': 512 | 64 | 1,
        'w+': 512 | 64 | 2,
        'a': 1024 | 64 | 1,
        'a+': 1024 | 64 | 2,
      };
      var flags = flagModes[str];
      if (typeof flags == 'undefined') {
        throw new Error(`Unknown file open mode: ${str}`);
      }
      return flags;
    };
  
  var FS_getMode = (canRead, canWrite) => {
      var mode = 0;
      if (canRead) mode |= 292 | 73;
      if (canWrite) mode |= 146;
      return mode;
    };
  
  
  
  
  var strError = (errno) => UTF8ToString(_strerror(errno));
  
  var ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };
  var FS = {
  root:null,
  mounts:[],
  devices:{
  },
  streams:[],
  nextInode:1,
  nameTable:null,
  currentPath:"/",
  initialized:false,
  ignorePermissions:true,
  filesystems:null,
  syncFSRequests:0,
  readFiles:{
  },
  ErrnoError:class extends Error {
        name = 'ErrnoError';
        // We set the `name` property to be able to identify `FS.ErrnoError`
        // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
        // - when using PROXYFS, an error can come from an underlying FS
        // as different FS objects have their own FS.ErrnoError each,
        // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
        // we'll use the reliable test `err.name == "ErrnoError"` instead
        constructor(errno) {
          super(runtimeInitialized ? strError(errno) : '');
          this.errno = errno;
          for (var key in ERRNO_CODES) {
            if (ERRNO_CODES[key] === errno) {
              this.code = key;
              break;
            }
          }
        }
      },
  FSStream:class {
        shared = {};
        get object() {
          return this.node;
        }
        set object(val) {
          this.node = val;
        }
        get isRead() {
          return (this.flags & 2097155) !== 1;
        }
        get isWrite() {
          return (this.flags & 2097155) !== 0;
        }
        get isAppend() {
          return (this.flags & 1024);
        }
        get flags() {
          return this.shared.flags;
        }
        set flags(val) {
          this.shared.flags = val;
        }
        get position() {
          return this.shared.position;
        }
        set position(val) {
          this.shared.position = val;
        }
      },
  FSNode:class {
        node_ops = {};
        stream_ops = {};
        readMode = 292 | 73;
        writeMode = 146;
        mounted = null;
        constructor(parent, name, mode, rdev) {
          if (!parent) {
            parent = this;  // root node sets parent to itself
          }
          this.parent = parent;
          this.mount = parent.mount;
          this.id = FS.nextInode++;
          this.name = name;
          this.mode = mode;
          this.rdev = rdev;
          this.atime = this.mtime = this.ctime = Date.now();
        }
        get read() {
          return (this.mode & this.readMode) === this.readMode;
        }
        set read(val) {
          val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
        }
        get write() {
          return (this.mode & this.writeMode) === this.writeMode;
        }
        set write(val) {
          val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
        }
        get isFolder() {
          return FS.isDir(this.mode);
        }
        get isDevice() {
          return FS.isChrdev(this.mode);
        }
      },
  lookupPath(path, opts = {}) {
        if (!path) {
          throw new FS.ErrnoError(44);
        }
        opts.follow_mount ??= true
  
        if (!PATH.isAbs(path)) {
          path = FS.cwd() + '/' + path;
        }
  
        // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
        linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
          // split the absolute path
          var parts = path.split('/').filter((p) => !!p);
  
          // start at the root
          var current = FS.root;
          var current_path = '/';
  
          for (var i = 0; i < parts.length; i++) {
            var islast = (i === parts.length-1);
            if (islast && opts.parent) {
              // stop resolving
              break;
            }
  
            if (parts[i] === '.') {
              continue;
            }
  
            if (parts[i] === '..') {
              current_path = PATH.dirname(current_path);
              if (FS.isRoot(current)) {
                path = current_path + '/' + parts.slice(i + 1).join('/');
                continue linkloop;
              } else {
                current = current.parent;
              }
              continue;
            }
  
            current_path = PATH.join2(current_path, parts[i]);
            try {
              current = FS.lookupNode(current, parts[i]);
            } catch (e) {
              // if noent_okay is true, suppress a ENOENT in the last component
              // and return an object with an undefined node. This is needed for
              // resolving symlinks in the path when creating a file.
              if ((e?.errno === 44) && islast && opts.noent_okay) {
                return { path: current_path };
              }
              throw e;
            }
  
            // jump to the mount's root node if this is a mountpoint
            if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
              current = current.mounted.root;
            }
  
            // by default, lookupPath will not follow a symlink if it is the final path component.
            // setting opts.follow = true will override this behavior.
            if (FS.isLink(current.mode) && (!islast || opts.follow)) {
              if (!current.node_ops.readlink) {
                throw new FS.ErrnoError(52);
              }
              var link = current.node_ops.readlink(current);
              if (!PATH.isAbs(link)) {
                link = PATH.dirname(current_path) + '/' + link;
              }
              path = link + '/' + parts.slice(i + 1).join('/');
              continue linkloop;
            }
          }
          return { path: current_path, node: current };
        }
        throw new FS.ErrnoError(32);
      },
  getPath(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? `${mount}/${path}` : mount + path;
          }
          path = path ? `${node.name}/${path}` : node.name;
          node = node.parent;
        }
      },
  hashName(parentid, name) {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },
  hashAddNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },
  hashRemoveNode(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },
  lookupNode(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },
  createNode(parent, name, mode, rdev) {
        assert(typeof parent == 'object')
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },
  destroyNode(node) {
        FS.hashRemoveNode(node);
      },
  isRoot(node) {
        return node === node.parent;
      },
  isMountpoint(node) {
        return !!node.mounted;
      },
  isFile(mode) {
        return (mode & 61440) === 32768;
      },
  isDir(mode) {
        return (mode & 61440) === 16384;
      },
  isLink(mode) {
        return (mode & 61440) === 40960;
      },
  isChrdev(mode) {
        return (mode & 61440) === 8192;
      },
  isBlkdev(mode) {
        return (mode & 61440) === 24576;
      },
  isFIFO(mode) {
        return (mode & 61440) === 4096;
      },
  isSocket(mode) {
        return (mode & 49152) === 49152;
      },
  flagsToPermissionString(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },
  nodePermissions(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },
  mayLookup(dir) {
        if (!FS.isDir(dir.mode)) return 54;
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },
  mayCreate(dir, name) {
        if (!FS.isDir(dir.mode)) {
          return 54;
        }
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },
  mayDelete(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },
  mayOpen(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' // opening for write
              || (flags & (512 | 64))) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },
  checkOpExists(op, err) {
        if (!op) {
          throw new FS.ErrnoError(err);
        }
        return op;
      },
  MAX_OPEN_FDS:4096,
  nextfd() {
        for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },
  getStreamChecked(fd) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        return stream;
      },
  getStream:(fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
        assert(fd >= -1);
  
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        if (fd == -1) {
          fd = FS.nextfd();
        }
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },
  closeStream(fd) {
        FS.streams[fd] = null;
      },
  dupStream(origStream, fd = -1) {
        var stream = FS.createStream(origStream, fd);
        stream.stream_ops?.dup?.(stream);
        return stream;
      },
  doSetAttr(stream, node, attr) {
        var setattr = stream?.stream_ops.setattr;
        var arg = setattr ? stream : node;
        setattr ??= node.node_ops.setattr;
        FS.checkOpExists(setattr, 63)
        setattr(arg, attr);
      },
  chrdev_stream_ops:{
  open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          stream.stream_ops.open?.(stream);
        },
  llseek() {
          throw new FS.ErrnoError(70);
        },
  },
  major:(dev) => ((dev) >> 8),
  minor:(dev) => ((dev) & 0xff),
  makedev:(ma, mi) => ((ma) << 8 | (mi)),
  registerDevice(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },
  getDevice:(dev) => FS.devices[dev],
  getMounts(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push(...m.mounts);
        }
  
        return mounts;
      },
  syncfs(populate, callback) {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },
  mount(type, opts, mountpoint) {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type,
          opts,
          mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },
  unmount(mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },
  lookup(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },
  mknod(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name) {
          throw new FS.ErrnoError(28);
        }
        if (name === '.' || name === '..') {
          throw new FS.ErrnoError(20);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },
  statfs(path) {
        return FS.statfsNode(FS.lookupPath(path, {follow: true}).node);
      },
  statfsStream(stream) {
        // We keep a separate statfsStream function because noderawfs overrides
        // it. In noderawfs, stream.node is sometimes null. Instead, we need to
        // look at stream.path.
        return FS.statfsNode(stream.node);
      },
  statfsNode(node) {
        // NOTE: None of the defaults here are true. We're just returning safe and
        //       sane values. Currently nodefs and rawfs replace these defaults,
        //       other file systems leave them alone.
        var rtn = {
          bsize: 4096,
          frsize: 4096,
          blocks: 1e6,
          bfree: 5e5,
          bavail: 5e5,
          files: FS.nextInode,
          ffree: FS.nextInode - 1,
          fsid: 42,
          flags: 2,
          namelen: 255,
        };
  
        if (node.node_ops.statfs) {
          Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
        }
        return rtn;
      },
  create(path, mode = 0o666) {
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },
  mkdir(path, mode = 0o777) {
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },
  mkdirTree(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var dir of dirs) {
          if (!dir) continue;
          if (d || PATH.isAbs(path)) d += '/';
          d += dir;
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },
  mkdev(path, mode, dev) {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 0o666;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },
  symlink(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },
  rename(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existent directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
          // update old node (we do this here to avoid each backend
          // needing to)
          old_node.parent = new_dir;
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },
  rmdir(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },
  readdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
        return readdir(node);
      },
  unlink(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },
  readlink(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return link.node_ops.readlink(link);
      },
  stat(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
        return getattr(node);
      },
  fstat(fd) {
        var stream = FS.getStreamChecked(fd);
        var node = stream.node;
        var getattr = stream.stream_ops.getattr;
        var arg = getattr ? stream : node;
        getattr ??= node.node_ops.getattr;
        FS.checkOpExists(getattr, 63)
        return getattr(arg);
      },
  lstat(path) {
        return FS.stat(path, true);
      },
  doChmod(stream, node, mode, dontFollow) {
        FS.doSetAttr(stream, node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          ctime: Date.now(),
          dontFollow
        });
      },
  chmod(path, mode, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        FS.doChmod(null, node, mode, dontFollow);
      },
  lchmod(path, mode) {
        FS.chmod(path, mode, true);
      },
  fchmod(fd, mode) {
        var stream = FS.getStreamChecked(fd);
        FS.doChmod(stream, stream.node, mode, false);
      },
  doChown(stream, node, dontFollow) {
        FS.doSetAttr(stream, node, {
          timestamp: Date.now(),
          dontFollow
          // we ignore the uid / gid for now
        });
      },
  chown(path, uid, gid, dontFollow) {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        FS.doChown(null, node, dontFollow);
      },
  lchown(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },
  fchown(fd, uid, gid) {
        var stream = FS.getStreamChecked(fd);
        FS.doChown(stream, stream.node, false);
      },
  doTruncate(stream, node, len) {
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.doSetAttr(stream, node, {
          size: len,
          timestamp: Date.now()
        });
      },
  truncate(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        FS.doTruncate(null, node, len);
      },
  ftruncate(fd, len) {
        var stream = FS.getStreamChecked(fd);
        if (len < 0 || (stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.doTruncate(stream, stream.node, len);
      },
  utime(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
        setattr(node, {
          atime: atime,
          mtime: mtime
        });
      },
  open(path, flags, mode = 0o666) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS_modeStringToFlags(flags) : flags;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        var isDirPath;
        if (typeof path == 'object') {
          node = path;
        } else {
          isDirPath = path.endsWith("/");
          // noent_okay makes it so that if the final component of the path
          // doesn't exist, lookupPath returns `node: undefined`. `path` will be
          // updated to point to the target of all symlinks.
          var lookup = FS.lookupPath(path, {
            follow: !(flags & 131072),
            noent_okay: true
          });
          node = lookup.node;
          path = lookup.path;
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else if (isDirPath) {
            throw new FS.ErrnoError(31);
          } else {
            // node doesn't exist, try to create it
            // Ignore the permission bits here to ensure we can `open` this new
            // file below. We use chmod below the apply the permissions once the
            // file is open.
            node = FS.mknod(path, mode | 0o777, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (created) {
          FS.chmod(node, mode & 0o777);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },
  close(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },
  isClosed(stream) {
        return stream.fd === null;
      },
  llseek(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },
  read(stream, buffer, offset, length, position) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },
  write(stream, buffer, offset, length, position, canOwn) {
        assert(offset >= 0);
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },
  mmap(stream, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        if (!length) {
          throw new FS.ErrnoError(28);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },
  msync(stream, buffer, offset, length, mmapFlags) {
        assert(offset >= 0);
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },
  ioctl(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },
  readFile(path, opts = {}) {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error(`Invalid encoding type "${opts.encoding}"`);
        }
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          buf = UTF8ArrayToString(buf);
        }
        FS.close(stream);
        return buf;
      },
  writeFile(path, data, opts = {}) {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          data = new Uint8Array(intArrayFromString(data, true));
        }
        if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },
  cwd:() => FS.currentPath,
  chdir(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },
  createDefaultDirectories() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },
  createDefaultDevices() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
          llseek: () => 0,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomFill(randomBuffer);
            randomLeft = randomBuffer.byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },
  createSpecialDirectories() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount() {
            var node = FS.createNode(proc_self, 'fd', 16895, 73);
            node.stream_ops = {
              llseek: MEMFS.stream_ops.llseek,
            };
            node.node_ops = {
              lookup(parent, name) {
                var fd = +name;
                var stream = FS.getStreamChecked(fd);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                  id: fd + 1,
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              },
              readdir() {
                return Array.from(FS.streams.entries())
                  .filter(([k, v]) => v)
                  .map(([k, v]) => k.toString());
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },
  createStandardStreams(input, output, error) {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (input) {
          FS.createDevice('/dev', 'stdin', input);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (output) {
          FS.createDevice('/dev', 'stdout', null, output);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (error) {
          FS.createDevice('/dev', 'stderr', null, error);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, `invalid handle for stdin (${stdin.fd})`);
        assert(stdout.fd === 1, `invalid handle for stdout (${stdout.fd})`);
        assert(stderr.fd === 2, `invalid handle for stderr (${stderr.fd})`);
      },
  staticInit() {
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },
  init(input, output, error) {
        assert(!FS.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.initialized = true;
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        input ??= Module['stdin'];
        output ??= Module['stdout'];
        error ??= Module['stderr'];
  
        FS.createStandardStreams(input, output, error);
      },
  quit() {
        FS.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var stream of FS.streams) {
          if (stream) {
            FS.close(stream);
          }
        }
      },
  findObject(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },
  analyzePath(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },
  createPath(parent, path, canRead, canWrite) {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            if (e.errno != 20) throw e;
          }
          parent = current;
        }
        return current;
      },
  createFile(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(canRead, canWrite);
        return FS.create(path, mode);
      },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS_getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
      },
  createDevice(parent, name, input, output) {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS_getMode(!!input, !!output);
        FS.createDevice.major ??= 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open(stream) {
            stream.seekable = false;
          },
          close(stream) {
            // flush any pending line data
            if (output?.buffer?.length) {
              output(10);
            }
          },
          read(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.atime = Date.now();
            }
            return bytesRead;
          },
          write(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.mtime = stream.node.ctime = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },
  forceLoadFile(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else { // Command-line.
          try {
            obj.contents = readBinary(obj.url);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
      },
  createLazyFile(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array).
        // Actual getting is abstracted away for eventual reuse.
        class LazyUint8Array {
          lengthKnown = false;
          chunks = []; // Loaded chunks. Index is the chunk number
          get(idx) {
            if (idx > this.length-1 || idx < 0) {
              return undefined;
            }
            var chunkOffset = idx % this.chunkSize;
            var chunkNum = (idx / this.chunkSize)|0;
            return this.getter(chunkNum)[chunkOffset];
          }
          setDataGetter(getter) {
            this.getter = getter;
          }
          cacheLength() {
            // Find length
            var xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, false);
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            var datalength = Number(xhr.getResponseHeader("Content-length"));
            var header;
            var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
            var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
            var chunkSize = 1024*1024; // Chunk size in bytes
  
            if (!hasByteServing) chunkSize = datalength;
  
            // Function to get a range from the remote URL.
            var doXHR = (from, to) => {
              if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
              if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
              // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
              var xhr = new XMLHttpRequest();
              xhr.open('GET', url, false);
              if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
              // Some hints to the browser that we want binary data.
              xhr.responseType = 'arraybuffer';
              if (xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain; charset=x-user-defined');
              }
  
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
              if (xhr.response !== undefined) {
                return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
              }
              return intArrayFromString(xhr.responseText || '', true);
            };
            var lazyArray = this;
            lazyArray.setDataGetter((chunkNum) => {
              var start = chunkNum * chunkSize;
              var end = (chunkNum+1) * chunkSize - 1; // including this byte
              end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
                lazyArray.chunks[chunkNum] = doXHR(start, end);
              }
              if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
              return lazyArray.chunks[chunkNum];
            });
  
            if (usesGzip || !datalength) {
              // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
              chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
              datalength = this.getter(0).length;
              chunkSize = datalength;
              out("LazyFiles on gzip forces download of the whole file when length is accessed");
            }
  
            this._length = datalength;
            this._chunkSize = chunkSize;
            this.lengthKnown = true;
          }
          get length() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._length;
          }
          get chunkSize() {
            if (!this.lengthKnown) {
              this.cacheLength();
            }
            return this._chunkSize;
          }
        }
  
        if (typeof XMLHttpRequest != 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = (...args) => {
            FS.forceLoadFile(node);
            return fn(...args);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc(length);
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },
  absolutePath() {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },
  createFolder() {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },
  createLink() {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },
  joinPath() {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },
  mmapAlloc() {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },
  standardizePath() {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      },
  };
  
  var SYSCALLS = {
  DEFAULT_POLLMASK:5,
  calculateAt(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);;
          }
          return dir;
        }
        return dir + '/' + path;
      },
  writeStat(buf, stat) {
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(4))>>2)] = stat.mode;
        HEAPU32[(((buf)+(8))>>2)] = stat.nlink;
        HEAP32[(((buf)+(12))>>2)] = stat.uid;
        HEAP32[(((buf)+(16))>>2)] = stat.gid;
        HEAP32[(((buf)+(20))>>2)] = stat.rdev;
        HEAP64[(((buf)+(24))>>3)] = BigInt(stat.size);
        HEAP32[(((buf)+(32))>>2)] = 4096;
        HEAP32[(((buf)+(36))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        HEAP64[(((buf)+(40))>>3)] = BigInt(Math.floor(atime / 1000));
        HEAPU32[(((buf)+(48))>>2)] = (atime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(56))>>3)] = BigInt(Math.floor(mtime / 1000));
        HEAPU32[(((buf)+(64))>>2)] = (mtime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(72))>>3)] = BigInt(Math.floor(ctime / 1000));
        HEAPU32[(((buf)+(80))>>2)] = (ctime % 1000) * 1000 * 1000;
        HEAP64[(((buf)+(88))>>3)] = BigInt(stat.ino);
        return 0;
      },
  writeStatFs(buf, stats) {
        HEAP32[(((buf)+(4))>>2)] = stats.bsize;
        HEAP32[(((buf)+(40))>>2)] = stats.bsize;
        HEAP32[(((buf)+(8))>>2)] = stats.blocks;
        HEAP32[(((buf)+(12))>>2)] = stats.bfree;
        HEAP32[(((buf)+(16))>>2)] = stats.bavail;
        HEAP32[(((buf)+(20))>>2)] = stats.files;
        HEAP32[(((buf)+(24))>>2)] = stats.ffree;
        HEAP32[(((buf)+(28))>>2)] = stats.fsid;
        HEAP32[(((buf)+(44))>>2)] = stats.flags;  // ST_NOSUID
        HEAP32[(((buf)+(36))>>2)] = stats.namelen;
      },
  doMsync(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },
  getStreamFromFD(fd) {
        var stream = FS.getStreamChecked(fd);
        return stream;
      },
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = syscallGetVarargI();
          if (arg < 0) {
            return -28;
          }
          while (FS.streams[arg]) {
            arg++;
          }
          var newStream;
          newStream = FS.dupStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = syscallGetVarargI();
          stream.flags |= arg;
          return 0;
        }
        case 12: {
          var arg = syscallGetVarargP();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 13:
        case 14:
          // Pretend that the locking is successful. These are process-level locks,
          // and Emscripten programs are a single process. If we supported linking a
          // filesystem between programs, we'd need to do more here.
          // See https://github.com/emscripten-core/emscripten/issues/23697
          return 0;
      }
      return -28;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_fstat64(fd, buf) {
  try {
  
      return SYSCALLS.writeStat(buf, FS.fstat(fd));
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  
  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21505: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcgets) {
            var termios = stream.tty.ops.ioctl_tcgets(stream);
            var argp = syscallGetVarargP();
            HEAP32[((argp)>>2)] = termios.c_iflag || 0;
            HEAP32[(((argp)+(4))>>2)] = termios.c_oflag || 0;
            HEAP32[(((argp)+(8))>>2)] = termios.c_cflag || 0;
            HEAP32[(((argp)+(12))>>2)] = termios.c_lflag || 0;
            for (var i = 0; i < 32; i++) {
              HEAP8[(argp + i)+(17)] = termios.c_cc[i] || 0;
            }
            return 0;
          }
          return 0;
        }
        case 21510:
        case 21511:
        case 21512: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tcsets) {
            var argp = syscallGetVarargP();
            var c_iflag = HEAP32[((argp)>>2)];
            var c_oflag = HEAP32[(((argp)+(4))>>2)];
            var c_cflag = HEAP32[(((argp)+(8))>>2)];
            var c_lflag = HEAP32[(((argp)+(12))>>2)];
            var c_cc = []
            for (var i = 0; i < 32; i++) {
              c_cc.push(HEAP8[(argp + i)+(17)]);
            }
            return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
          }
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = syscallGetVarargP();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = syscallGetVarargP();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          if (stream.tty.ops.ioctl_tiocgwinsz) {
            var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
            var argp = syscallGetVarargP();
            HEAP16[((argp)>>1)] = winsize[0];
            HEAP16[(((argp)+(2))>>1)] = winsize[1];
          }
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        case 21515: {
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_lstat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.writeStat(buf, FS.lstat(path));
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_newfstatat(dirfd, path, buf, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      var nofollow = flags & 256;
      var allowEmpty = flags & 4096;
      flags = flags & (~6400);
      assert(!flags, `unknown flags in __syscall_newfstatat: ${flags}`);
      path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
      return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  
  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? syscallGetVarargI() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_stat64(path, buf) {
  try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.writeStat(buf, FS.stat(path));
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_unlinkat(dirfd, path, flags) {
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      if (!flags) {
        FS.unlink(path);
      } else if (flags === 512) {
        FS.rmdir(path);
      } else {
        return -28;
      }
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  var __abort_js = () =>
      abort('native code called abort()');

  var __emscripten_throw_longjmp = () => {
      throw Infinity;
    };

  var _emscripten_get_now = () => performance.now();
  
  var _emscripten_date_now = () => Date.now();
  
  var nowIsMonotonic = 1;
  
  var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
  
  var INT53_MAX = 9007199254740992;
  
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = (num) => (num < INT53_MIN || num > INT53_MAX) ? NaN : Number(num);
  function _clock_time_get(clk_id, ignored_precision, ptime) {
    ignored_precision = bigintToI53Checked(ignored_precision);
  
  
      if (!checkWasiClock(clk_id)) {
        return 28;
      }
      var now;
      // all wasi clocks but realtime are monotonic
      if (clk_id === 0) {
        now = _emscripten_date_now();
      } else if (nowIsMonotonic) {
        now = _emscripten_get_now();
      } else {
        return 52;
      }
      // "now" is in ms, and wasi times are in ns.
      var nsec = Math.round(now * 1000 * 1000);
      HEAP64[((ptime)>>3)] = BigInt(nsec);
      return 0;
    ;
  }

  var readEmAsmArgsArray = [];
  var readEmAsmArgs = (sigPtr, buf) => {
      // Nobody should have mutated _readEmAsmArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readEmAsmArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      while (ch = HEAPU8[sigPtr++]) {
        var chr = String.fromCharCode(ch);
        var validChars = ['d', 'f', 'i', 'p'];
        // In WASM_BIGINT mode we support passing i64 values as bigint.
        validChars.push('j');
        assert(validChars.includes(chr), `Invalid character ${ch}("${chr}") in readEmAsmArgs! Use only [${validChars}], and do not specify "v" for void return argument.`);
        // Floats are always passed as doubles, so all types except for 'i'
        // are 8 bytes and require alignment.
        var wide = (ch != 105);
        wide &= (ch != 112);
        buf += wide && (buf % 8) ? 4 : 0;
        readEmAsmArgsArray.push(
          // Special case for pointers under wasm64 or CAN_ADDRESS_2GB mode.
          ch == 112 ? HEAPU32[((buf)>>2)] :
          ch == 106 ? HEAP64[((buf)>>3)] :
          ch == 105 ?
            HEAP32[((buf)>>2)] :
            HEAPF64[((buf)>>3)]
        );
        buf += wide ? 8 : 4;
      }
      return readEmAsmArgsArray;
    };
  var runEmAsmFunction = (code, sigPtr, argbuf) => {
      var args = readEmAsmArgs(sigPtr, argbuf);
      assert(ASM_CONSTS.hasOwnProperty(code), `No EM_ASM constant found at address ${code}.  The loaded WebAssembly file is likely out of sync with the generated JavaScript.`);
      return ASM_CONSTS[code](...args);
    };
  var _emscripten_asm_const_double = (code, sigPtr, argbuf) => {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };

  var _emscripten_asm_const_int = (code, sigPtr, argbuf) => {
      return runEmAsmFunction(code, sigPtr, argbuf);
    };

  
  var _emscripten_set_main_loop_timing = (mode, value) => {
      MainLoop.timingMode = mode;
      MainLoop.timingValue = value;
  
      if (!MainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!MainLoop.running) {
        
        MainLoop.running = true;
      }
      if (mode == 0) {
        MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(MainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        MainLoop.method = 'timeout';
      } else if (mode == 1) {
        MainLoop.scheduler = function MainLoop_scheduler_rAF() {
          MainLoop.requestAnimationFrame(MainLoop.runner);
        };
        MainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof MainLoop.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var MainLoop_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", MainLoop_setImmediate_messageHandler, true);
            MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */((func) => {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            MainLoop.setImmediate = setImmediate;
          }
        }
        MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
          MainLoop.setImmediate(MainLoop.runner);
        };
        MainLoop.method = 'immediate';
      }
      return 0;
    };
  
  
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 8388608)');
        }
      }
      quit_(1, e);
    };
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!MainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
      MainLoop.func = iterFunc;
      MainLoop.arg = arg;
  
      var thisMainLoopId = MainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
          
          maybeExit();
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      MainLoop.running = false;
      MainLoop.runner = function MainLoop_runner() {
        if (ABORT) return;
        if (MainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = MainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (MainLoop.remainingBlockers) {
            var remaining = MainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              MainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              MainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          MainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(MainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
        if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          MainLoop.scheduler();
          return;
        } else if (MainLoop.timingMode == 0) {
          MainLoop.tickStartTime = _emscripten_get_now();
        }
  
        if (MainLoop.method === 'timeout' && Module['ctx']) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          MainLoop.method = ''; // just warn once per call to set main loop
        }
  
        MainLoop.runIter(iterFunc);
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        MainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        MainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  var MainLoop = {
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  preMainLoop:[],
  postMainLoop:[],
  pause() {
        MainLoop.scheduler = null;
        // Incrementing this signals the previous main loop that it's now become old, and it must return.
        MainLoop.currentlyRunningMainloop++;
      },
  resume() {
        MainLoop.currentlyRunningMainloop++;
        var timingMode = MainLoop.timingMode;
        var timingValue = MainLoop.timingValue;
        var func = MainLoop.func;
        MainLoop.func = null;
        // do not set timing and call scheduler, we will do it on the next lines
        setMainLoop(func, 0, false, MainLoop.arg, true);
        _emscripten_set_main_loop_timing(timingMode, timingValue);
        MainLoop.scheduler();
      },
  updateStatus() {
        if (Module['setStatus']) {
          var message = Module['statusMessage'] || 'Please wait...';
          var remaining = MainLoop.remainingBlockers ?? 0;
          var expected = MainLoop.expectedBlockers ?? 0;
          if (remaining) {
            if (remaining < expected) {
              Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
            } else {
              Module['setStatus'](message);
            }
          } else {
            Module['setStatus']('');
          }
        }
      },
  init() {
        Module['preMainLoop'] && MainLoop.preMainLoop.push(Module['preMainLoop']);
        Module['postMainLoop'] && MainLoop.postMainLoop.push(Module['postMainLoop']);
      },
  runIter(func) {
        if (ABORT) return;
        for (var pre of MainLoop.preMainLoop) {
          if (pre() === false) {
            return; // |return false| skips a frame
          }
        }
        callUserCallback(func);
        for (var post of MainLoop.postMainLoop) {
          post();
        }
        checkStackCookie();
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (MainLoop.nextRAF === 0) {
          MainLoop.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= MainLoop.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            MainLoop.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(MainLoop.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = MainLoop.fakeRequestAnimationFrame;
        RAF(func);
      },
  };
  var _emscripten_cancel_main_loop = () => {
      MainLoop.pause();
      MainLoop.func = null;
    };



  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };

  var onExits = [];
  var addOnExit = (cb) => onExits.push(cb);
  var JSEvents = {
  memcpy(target, src, size) {
        HEAP8.set(HEAP8.subarray(src, src + size), target);
      },
  removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
  inEventHandler:0,
  deferredCalls:[],
  deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var call of JSEvents.deferredCalls) {
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction,
          precedence,
          argsList
        });
  
        JSEvents.deferredCalls.sort((x,y) => x.precedence < y.precedence);
      },
  removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
      },
  canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          // Verify against transient activation status from UserActivation API
          // whether it is possible to perform a request here without needing to defer. See
          // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
          // and https://caniuse.com/mdn-api_useractivation
          // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
          return navigator.userActivation.isActive;
        }
  
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },
  runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
          call.targetFunction(...call.argsList);
        }
      },
  eventHandlers:[],
  removeAllHandlersOnTarget:(target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },
  _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },
  registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          err('registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:');
          console.dir(eventHandler);
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function(event) {
            // Increment nesting count for the event handler.
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            // Process any old deferred calls the user has placed.
            JSEvents.runDeferredCalls();
            // Process the actual event, calls back to user C code handler.
            eventHandler.handlerFunc(event);
            // Process any new deferred calls that were placed right now from this event handler.
            JSEvents.runDeferredCalls();
            // Out of event handler - restore nesting count.
            --JSEvents.inEventHandler;
          };
  
          eventHandler.target.addEventListener(eventHandler.eventTypeString,
                                               eventHandler.eventListenerFunc,
                                               eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
        return 0;
      },
  getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
  fullscreenEnabled() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      },
  };
  
  /** @type {Object} */
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {'left':0,'top':0};
  var fillMouseEventData = (eventStruct, e, target) => {
      assert(eventStruct % 4 == 0);
      HEAPF64[((eventStruct)>>3)] = e.timeStamp;
      var idx = ((eventStruct)>>2);
      HEAP32[idx + 2] = e.screenX;
      HEAP32[idx + 3] = e.screenY;
      HEAP32[idx + 4] = e.clientX;
      HEAP32[idx + 5] = e.clientY;
      HEAP8[eventStruct + 24] = e.ctrlKey;
      HEAP8[eventStruct + 25] = e.shiftKey;
      HEAP8[eventStruct + 26] = e.altKey;
      HEAP8[eventStruct + 27] = e.metaKey;
      HEAP16[idx*2 + 14] = e.button;
      HEAP16[idx*2 + 15] = e.buttons;
  
      HEAP32[idx + 8] = e["movementX"];
  
      HEAP32[idx + 9] = e["movementY"];
  
      // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
      var rect = getBoundingClientRect(target);
      HEAP32[idx + 10] = e.clientX - (rect.left | 0);
      HEAP32[idx + 11] = e.clientY - (rect.top  | 0);
    };
  
  var maybeCStringToJsString = (cString) => {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    };
  
  var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : null);
      return domElement;
    };
  
  var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.mouseEvent ||= _malloc(64);
      target = findEventTarget(target);
  
      var mouseEventHandlerFunc = (e = event) => {
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_click_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 4, "click", targetThread);

  
  
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.keyEvent ||= _malloc(160);
  
      var keyEventHandlerFunc = (e) => {
        assert(e);
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx = ((keyEventData)>>2);
  
        HEAP32[idx + 2] = e.location;
        HEAP8[keyEventData + 12] = e.ctrlKey;
        HEAP8[keyEventData + 13] = e.shiftKey;
        HEAP8[keyEventData + 14] = e.altKey;
        HEAP8[keyEventData + 15] = e.metaKey;
        HEAP8[keyEventData + 16] = e.repeat;
        HEAP32[idx + 5] = e.charCode;
        HEAP32[idx + 6] = e.keyCode;
        HEAP32[idx + 7] = e.which;
        stringToUTF8(e.key || '', keyEventData + 32, 32);
        stringToUTF8(e.code || '', keyEventData + 64, 32);
        stringToUTF8(e.char || '', keyEventData + 96, 32);
        stringToUTF8(e.locale || '', keyEventData + 128, 32);
  
        if (((a1, a2, a3) => dynCall_iiii(callbackfunc, a1, a2, a3))(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

  var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

  var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
      var iterFunc = (() => dynCall_v(func));
      setMainLoop(iterFunc, fps, simulateInfiniteLoop);
    };

  var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);

  var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);

  var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);

  var GLctx;
  
  var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) =>
      // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
      !!(ctx.dibvbi = ctx.getExtension('WEBGL_draw_instanced_base_vertex_base_instance'));
  
  var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => {
      // Closure is expected to be allowed to minify the '.mdibvbi' property, so not accessing it quoted.
      return !!(ctx.mdibvbi = ctx.getExtension('WEBGL_multi_draw_instanced_base_vertex_base_instance'));
    };
  
  var webgl_enable_EXT_polygon_offset_clamp = (ctx) =>
      !!(ctx.extPolygonOffsetClamp = ctx.getExtension('EXT_polygon_offset_clamp'));
  
  var webgl_enable_EXT_clip_control = (ctx) =>
      !!(ctx.extClipControl = ctx.getExtension('EXT_clip_control'));
  
  var webgl_enable_WEBGL_polygon_mode = (ctx) =>
      !!(ctx.webglPolygonMode = ctx.getExtension('WEBGL_polygon_mode'));
  
  var webgl_enable_WEBGL_multi_draw = (ctx) =>
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
  
  var getEmscriptenSupportedExtensions = (ctx) => {
      // Restrict the list of advertised extensions to those that we actually
      // support.
      var supportedExtensions = [
        // WebGL 2 extensions
        'EXT_color_buffer_float',
        'EXT_conservative_depth',
        'EXT_disjoint_timer_query_webgl2',
        'EXT_texture_norm16',
        'NV_shader_noperspective_interpolation',
        'WEBGL_clip_cull_distance',
        // WebGL 1 and WebGL 2 extensions
        'EXT_clip_control',
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_polygon_offset_clamp',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
        'WEBGL_polygon_mode'
      ];
      // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
      return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
    };
  
  var registerPreMainLoop = (f) => {
      // Does nothing unless $MainLoop is included/used.
      typeof MainLoop != 'undefined' && MainLoop.preMainLoop.push(f);
    };
  
  
  var GL = {
  counter:1,
  buffers:[],
  programs:[],
  framebuffers:[],
  renderbuffers:[],
  textures:[],
  shaders:[],
  vaos:[],
  contexts:[],
  offscreenCanvases:{
  },
  queries:[],
  samplers:[],
  transformFeedbacks:[],
  syncs:[],
  byteSizeByTypeRoot:5120,
  byteSizeByType:[1,1,2,2,4,4,4,2,3,4,8],
  stringCache:{
  },
  stringiCache:{
  },
  unpackAlignment:4,
  unpackRowLength:0,
  recordError:(errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
  getNewId:(table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },
  genObject:(n, buffers, createFunction, objectTable
        ) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          }
          HEAP32[(((buffers)+(i*4))>>2)] = id;
        }
      },
  MAX_TEMP_BUFFER_SIZE:2097152,
  numTempVertexBuffersPerSize:64,
  log2ceilLookup:(i) => 32 - Math.clz32(i === 0 ? 0 : i - 1),
  generateTempBuffers:(quads, context) => {
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        context.tempVertexBufferCounters1 = [];
        context.tempVertexBufferCounters2 = [];
        context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex+1;
        context.tempVertexBuffers1 = [];
        context.tempVertexBuffers2 = [];
        context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex+1;
        context.tempIndexBuffers = [];
        context.tempIndexBuffers.length = largestIndex+1;
        for (var i = 0; i <= largestIndex; ++i) {
          context.tempIndexBuffers[i] = null; // Created on-demand
          context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[i] = 0;
          var ringbufferLength = GL.numTempVertexBuffersPerSize;
          context.tempVertexBuffers1[i] = [];
          context.tempVertexBuffers2[i] = [];
          var ringbuffer1 = context.tempVertexBuffers1[i];
          var ringbuffer2 = context.tempVertexBuffers2[i];
          ringbuffer1.length = ringbuffer2.length = ringbufferLength;
          for (var j = 0; j < ringbufferLength; ++j) {
            ringbuffer1[j] = ringbuffer2[j] = null; // Created on-demand
          }
        }
  
        if (quads) {
          // GL_QUAD indexes can be precalculated
          context.tempQuadIndexBuffer = GLctx.createBuffer();
          context.GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, context.tempQuadIndexBuffer);
          var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
          var quadIndexes = new Uint16Array(numIndexes);
          var i = 0, v = 0;
          while (1) {
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+1;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+2;
            if (i >= numIndexes) break;
            quadIndexes[i++] = v+3;
            if (i >= numIndexes) break;
            v += 4;
          }
          context.GLctx.bufferData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, quadIndexes, 0x88E4 /*GL_STATIC_DRAW*/);
          context.GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, null);
        }
      },
  getTempVertexBuffer:(sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
        var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
        GL.currentContext.tempVertexBufferCounters1[idx] = (GL.currentContext.tempVertexBufferCounters1[idx]+1) & (GL.numTempVertexBuffersPerSize-1);
        var vbo = ringbuffer[nextFreeBufferIndex];
        if (vbo) {
          return vbo;
        }
        var prevVBO = GLctx.getParameter(0x8894 /*GL_ARRAY_BUFFER_BINDING*/);
        ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
        GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, ringbuffer[nextFreeBufferIndex]);
        GLctx.bufferData(0x8892 /*GL_ARRAY_BUFFER*/, 1 << idx, 0x88E8 /*GL_DYNAMIC_DRAW*/);
        GLctx.bindBuffer(0x8892 /*GL_ARRAY_BUFFER*/, prevVBO);
        return ringbuffer[nextFreeBufferIndex];
      },
  getTempIndexBuffer:(sizeBytes) => {
        var idx = GL.log2ceilLookup(sizeBytes);
        var ibo = GL.currentContext.tempIndexBuffers[idx];
        if (ibo) {
          return ibo;
        }
        var prevIBO = GLctx.getParameter(0x8895 /*ELEMENT_ARRAY_BUFFER_BINDING*/);
        GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, GL.currentContext.tempIndexBuffers[idx]);
        GLctx.bufferData(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, 1 << idx, 0x88E8 /*GL_DYNAMIC_DRAW*/);
        GLctx.bindBuffer(0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/, prevIBO);
        return GL.currentContext.tempIndexBuffers[idx];
      },
  newRenderingFrameStarted:() => {
        if (!GL.currentContext) {
          return;
        }
        var vb = GL.currentContext.tempVertexBuffers1;
        GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
        GL.currentContext.tempVertexBuffers2 = vb;
        vb = GL.currentContext.tempVertexBufferCounters1;
        GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
        GL.currentContext.tempVertexBufferCounters2 = vb;
        var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
        for (var i = 0; i <= largestIndex; ++i) {
          GL.currentContext.tempVertexBufferCounters1[i] = 0;
        }
      },
  getSource:(shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(((length)+(i*4))>>2)] : undefined;
          source += UTF8ToString(HEAPU32[(((string)+(i*4))>>2)], len);
        }
        // Let's see if we need to enable the standard derivatives extension
        var type = GLctx.getShaderParameter(GL.shaders[shader], 0x8B4F /* GL_SHADER_TYPE */);
        if (type == 0x8B30 /* GL_FRAGMENT_SHADER */) {
          if (GLEmulation.findToken(source, "dFdx") ||
              GLEmulation.findToken(source, "dFdy") ||
              GLEmulation.findToken(source, "fwidth")) {
            source = "#extension GL_OES_standard_derivatives : enable\n" + source;
            var extension = GLctx.getExtension("OES_standard_derivatives");
          }
        }
        return source;
      },
  enabledClientAttribIndices:[],
  enableVertexAttribArray:(index) => {
        if (!GL.enabledClientAttribIndices[index]) {
          GL.enabledClientAttribIndices[index] = true;
          GLctx.enableVertexAttribArray(index);
        }
      },
  disableVertexAttribArray:(index) => {
        if (GL.enabledClientAttribIndices[index]) {
          GL.enabledClientAttribIndices[index] = false;
          GLctx.disableVertexAttribArray(index);
        }
      },
  createContext:(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
        // context on a canvas, calling .getContext() will always return that
        // context independent of which 'webgl' or 'webgl2'
        // context version was passed. See:
        //   https://bugs.webkit.org/show_bug.cgi?id=222758
        // and:
        //   https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
        // version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx = canvas.getContext("webgl2", webGLContextAttributes);
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },
  registerContext:(ctx, webGLContextAttributes) => {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context
        // given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        return handle;
      },
  makeContextCurrent:(contextHandle) => {
  
        // Active Emscripten GL layer context object.
        GL.currentContext = GL.contexts[contextHandle];
        // Active WebGL context object.
        Module['ctx'] = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
  getContext:(contextHandle) => {
        return GL.contexts[contextHandle];
      },
  deleteContext:(contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          // Release all JS event handlers on the DOM element that the GL context is
          // associated with since the context is now deleted.
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        // Make sure the canvas object no longer refers to the context object so
        // there are no GC surprises.
        if (GL.contexts[contextHandle]?.GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
  initExtensions:(context) => {
        // If this function is called without a specific context object, init the
        // extensions of the currently active context.
        context ||= GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, ction GL interop
        // layer itself will need to know if they exist.
        context.compressionExt = GLctx.getExtension('WEBGL_compressed_texture_s3tc');
        context.anisotropicExt = GLctx.getExtension('EXT_texture_filter_anisotropic');
  
        // Extensions that are available in both WebGL 1 and WebGL 2
        webgl_enable_WEBGL_multi_draw(GLctx);
        webgl_enable_EXT_polygon_offset_clamp(GLctx);
        webgl_enable_EXT_clip_control(GLctx);
        webgl_enable_WEBGL_polygon_mode(GLctx);
        // Extensions that are available from WebGL >= 2 (no-op if called on a WebGL 1 context active)
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
        // On WebGL 2, EXT_disjoint_timer_query is replaced with an alternative
        // that's based on core APIs, and exposes only the queryCounterEXT()
        // entrypoint.
        if (context.version >= 2) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
        }
  
        // However, Firefox exposes the WebGL 1 version on WebGL 2 as well and
        // thus we look for the WebGL 1 version again if the WebGL 2 version
        // isn't present. https://bugzilla.mozilla.org/show_bug.cgi?id=1328882
        if (context.version < 2 || !GLctx.disjointTimerQueryExt)
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
          // are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      },
  };
  
  var webglPowerPreferences = ["default","low-power","high-performance"];
  
  var findCanvasEventTarget = findEventTarget;
  
  /** @suppress {duplicate } */
  var _emscripten_webgl_do_create_context = (target, attributes) => {
      assert(attributes);
      var attr32 = ((attributes)>>2);
      var powerPreference = HEAP32[attr32 + (8>>2)];
      var contextAttributes = {
        'alpha': !!HEAP8[attributes + 0],
        'depth': !!HEAP8[attributes + 1],
        'stencil': !!HEAP8[attributes + 2],
        'antialias': !!HEAP8[attributes + 3],
        'premultipliedAlpha': !!HEAP8[attributes + 4],
        'preserveDrawingBuffer': !!HEAP8[attributes + 5],
        'powerPreference': webglPowerPreferences[powerPreference],
        'failIfMajorPerformanceCaveat': !!HEAP8[attributes + 12],
        // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
        majorVersion: HEAP32[attr32 + (16>>2)],
        minorVersion: HEAP32[attr32 + (20>>2)],
        enableExtensionsByDefault: HEAP8[attributes + 24],
        explicitSwapControl: HEAP8[attributes + 25],
        proxyContextToMainThread: HEAP32[attr32 + (28>>2)],
        renderViaOffscreenBackBuffer: HEAP8[attributes + 32]
      };
  
      //  TODO: Make these into hard errors at some point in the future
      if (contextAttributes.majorVersion !== 1 && contextAttributes.majorVersion !== 2) {
        err(`Invalid WebGL version requested: ${contextAttributes.majorVersion}`);
      }
      if (contextAttributes.majorVersion !== 2) {
        err('WebGL 1 requested but only WebGL 2 is supported (MIN_WEBGL_VERSION is 2)');
      }
  
      var canvas = findCanvasEventTarget(target);
  
      if (!canvas) {
        return 0;
      }
  
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
  
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    };
  var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

  var _emscripten_webgl_destroy_context = (contextHandle) => {
      if (GL.currentContext == contextHandle) GL.currentContext = 0;
      GL.deleteContext(contextHandle);
    };

  var _emscripten_webgl_make_context_current = (contextHandle) => {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    };

  var ENV = {
  };
  
  var getExecutableName = () => thisProgram || './this.program';
  var getEnvStrings = () => {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.language) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(`${x}=${env[x]}`);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    };
  
  var _environ_get = (__environ, environ_buf) => {
      var bufSize = 0;
      var envp = 0;
      for (var string of getEnvStrings()) {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(envp))>>2)] = ptr;
        bufSize += stringToUTF8(string, ptr, Infinity) + 1;
        envp += 4;
      }
      return 0;
    };

  
  var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      for (var string of strings) {
        bufSize += lengthBytesUTF8(string) + 1;
      }
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    };


  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  var doReadv = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  
  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
  
  
  try {
  
      if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      HEAP64[((newOffset)>>3)] = BigInt(stream.position);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  ;
  }

  /** @param {number=} offset */
  var doWritev = (stream, iov, iovcnt, offset) => {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8, ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) {
          // No more space to write.
          break;
        }
        if (typeof offset != 'undefined') {
          offset += curr;
        }
      }
      return ret;
    };
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  var _glAlphaFunc = (func, ref) => {
      switch(func) {
        case 0x200: // GL_NEVER
        case 0x201: // GL_LESS
        case 0x202: // GL_EQUAL
        case 0x203: // GL_LEQUAL
        case 0x204: // GL_GREATER
        case 0x205: // GL_NOTEQUAL
        case 0x206: // GL_GEQUAL
        case 0x207: // GL_ALWAYS
          GLEmulation.alphaTestRef = ref;
          if (GLEmulation.alphaTestFunc != func) {
            GLEmulation.alphaTestFunc = func;
            GLImmediate.currentRenderer = null; // alpha test mode is part of the FFP shader state, we must re-lookup the renderer to use.
          }
          break;
        default: // invalid value provided
          break;
      }
    };

  
  /** @param {number=} timeout */
  var safeSetTimeout = (func, timeout) => {
      
      return setTimeout(() => {
        
        callUserCallback(func);
      }, timeout);
    };
  
  
  
  var Browser = {
  useWebGL:false,
  isFullscreen:false,
  pointerLock:false,
  moduleContextCreatedCallbacks:[],
  workers:[],
  preloadedImages:{
  },
  preloadedAudios:{
  },
  getCanvas:() => Module['canvas'],
  init() {
        if (Browser.initted) return;
        Browser.initted = true;
  
        // Support for plugins that can process preloaded files. You can add more of these to
        // your app by creating and appending to preloadPlugins.
        //
        // Each plugin is asked if it can handle a file based on the file's name. If it can,
        // it is given the file's raw data. When it is done, it calls a callback with the file's
        // (possibly modified) data. For example, a plugin might decompress a file, or it
        // might create some side data structure for use later (like an Image element, etc.).
  
        var imagePlugin = {};
        imagePlugin['canHandle'] = function imagePlugin_canHandle(name) {
          return !Module['noImageDecoding'] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
        };
        imagePlugin['handle'] = function imagePlugin_handle(byteArray, name, onload, onerror) {
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          if (b.size !== byteArray.length) { // Safari bug #118630
            // Safari's Blob can only take an ArrayBuffer
            b = new Blob([(new Uint8Array(byteArray)).buffer], { type: Browser.getMimetype(name) });
          }
          var url = URL.createObjectURL(b);
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var img = new Image();
          img.onload = () => {
            assert(img.complete, `Image ${name} could not be decoded`);
            var canvas = /** @type {!HTMLCanvasElement} */ (document.createElement('canvas'));
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            Browser.preloadedImages[name] = canvas;
            URL.revokeObjectURL(url);
            onload?.(byteArray);
          };
          img.onerror = (event) => {
            err(`Image ${url} could not be decoded`);
            onerror?.();
          };
          img.src = url;
        };
        preloadPlugins.push(imagePlugin);
  
        var audioPlugin = {};
        audioPlugin['canHandle'] = function audioPlugin_canHandle(name) {
          return !Module['noAudioDecoding'] && name.slice(-4) in { '.ogg': 1, '.wav': 1, '.mp3': 1 };
        };
        audioPlugin['handle'] = function audioPlugin_handle(byteArray, name, onload, onerror) {
          var done = false;
          function finish(audio) {
            if (done) return;
            done = true;
            Browser.preloadedAudios[name] = audio;
            onload?.(byteArray);
          }
          function fail() {
            if (done) return;
            done = true;
            Browser.preloadedAudios[name] = new Audio(); // empty shim
            onerror?.();
          }
          var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
          var url = URL.createObjectURL(b); // XXX we never revoke this!
          assert(typeof url == 'string', 'createObjectURL must return a url as a string');
          var audio = new Audio();
          audio.addEventListener('canplaythrough', () => finish(audio), false); // use addEventListener due to chromium bug 124926
          audio.onerror = function audio_onerror(event) {
            if (done) return;
            err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
            function encode64(data) {
              var BASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
              var PAD = '=';
              var ret = '';
              var leftchar = 0;
              var leftbits = 0;
              for (var i = 0; i < data.length; i++) {
                leftchar = (leftchar << 8) | data[i];
                leftbits += 8;
                while (leftbits >= 6) {
                  var curr = (leftchar >> (leftbits-6)) & 0x3f;
                  leftbits -= 6;
                  ret += BASE[curr];
                }
              }
              if (leftbits == 2) {
                ret += BASE[(leftchar&3) << 4];
                ret += PAD + PAD;
              } else if (leftbits == 4) {
                ret += BASE[(leftchar&0xf) << 2];
                ret += PAD;
              }
              return ret;
            }
            audio.src = 'data:audio/x-' + name.slice(-3) + ';base64,' + encode64(byteArray);
            finish(audio); // we don't wait for confirmation this worked - but it's worth trying
          };
          audio.src = url;
          // workaround for chrome bug 124926 - we do not always get oncanplaythrough or onerror
          safeSetTimeout(() => {
            finish(audio); // try to use it even though it is not necessarily ready to play
          }, 10000);
        };
        preloadPlugins.push(audioPlugin);
  
        // Canvas event setup
  
        function pointerLockChange() {
          var canvas = Browser.getCanvas();
          Browser.pointerLock = document['pointerLockElement'] === canvas ||
                                document['mozPointerLockElement'] === canvas ||
                                document['webkitPointerLockElement'] === canvas ||
                                document['msPointerLockElement'] === canvas;
        }
        var canvas = Browser.getCanvas();
        if (canvas) {
          // forced aspect ratio can be enabled by defining 'forcedAspectRatio' on Module
          // Module['forcedAspectRatio'] = 4 / 3;
  
          canvas.requestPointerLock = canvas['requestPointerLock'] ||
                                      canvas['mozRequestPointerLock'] ||
                                      canvas['webkitRequestPointerLock'] ||
                                      canvas['msRequestPointerLock'] ||
                                      (() => {});
          canvas.exitPointerLock = document['exitPointerLock'] ||
                                   document['mozExitPointerLock'] ||
                                   document['webkitExitPointerLock'] ||
                                   document['msExitPointerLock'] ||
                                   (() => {}); // no-op if function does not exist
          canvas.exitPointerLock = canvas.exitPointerLock.bind(document);
  
          document.addEventListener('pointerlockchange', pointerLockChange, false);
          document.addEventListener('mozpointerlockchange', pointerLockChange, false);
          document.addEventListener('webkitpointerlockchange', pointerLockChange, false);
          document.addEventListener('mspointerlockchange', pointerLockChange, false);
  
          if (Module['elementPointerLock']) {
            canvas.addEventListener("click", (ev) => {
              if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
                Browser.getCanvas().requestPointerLock();
                ev.preventDefault();
              }
            }, false);
          }
        }
      },
  createContext(/** @type {HTMLCanvasElement} */ canvas, useWebGL, setInModule, webGLContextAttributes) {
        if (useWebGL && Module['ctx'] && canvas == Browser.getCanvas()) return Module['ctx']; // no need to recreate GL context if it's already been created for this canvas.
  
        var ctx;
        var contextHandle;
        if (useWebGL) {
          // For GLES2/desktop GL compatibility, adjust a few defaults to be different to WebGL defaults, so that they align better with the desktop defaults.
          var contextAttributes = {
            antialias: false,
            alpha: false,
            majorVersion: 2,
          };
  
          if (webGLContextAttributes) {
            for (var attribute in webGLContextAttributes) {
              contextAttributes[attribute] = webGLContextAttributes[attribute];
            }
          }
  
          // This check of existence of GL is here to satisfy Closure compiler, which yells if variable GL is referenced below but GL object is not
          // actually compiled in because application is not doing any GL operations. TODO: Ideally if GL is not being used, this function
          // Browser.createContext() should not even be emitted.
          if (typeof GL != 'undefined') {
            contextHandle = GL.createContext(canvas, contextAttributes);
            if (contextHandle) {
              ctx = GL.getContext(contextHandle).GLctx;
            }
          }
        } else {
          ctx = canvas.getContext('2d');
        }
  
        if (!ctx) return null;
  
        if (setInModule) {
          if (!useWebGL) assert(typeof GLctx == 'undefined', 'cannot set in module if GLctx is used, but we are a non-GL context that would replace it');
          Module['ctx'] = ctx;
          if (useWebGL) GL.makeContextCurrent(contextHandle);
          Browser.useWebGL = useWebGL;
          Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
          Browser.init();
        }
        return ctx;
      },
  fullscreenHandlersInstalled:false,
  lockPointer:undefined,
  resizeCanvas:undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
        Browser.lockPointer = lockPointer;
        Browser.resizeCanvas = resizeCanvas;
        if (typeof Browser.lockPointer == 'undefined') Browser.lockPointer = true;
        if (typeof Browser.resizeCanvas == 'undefined') Browser.resizeCanvas = false;
  
        var canvas = Browser.getCanvas();
        function fullscreenChange() {
          Browser.isFullscreen = false;
          var canvasContainer = canvas.parentNode;
          if ((document['fullscreenElement'] || document['mozFullScreenElement'] ||
               document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
               document['webkitCurrentFullScreenElement']) === canvasContainer) {
            canvas.exitFullscreen = Browser.exitFullscreen;
            if (Browser.lockPointer) canvas.requestPointerLock();
            Browser.isFullscreen = true;
            if (Browser.resizeCanvas) {
              Browser.setFullscreenCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          } else {
            // remove the full screen specific parent of the canvas again to restore the HTML structure from before going full screen
            canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
            canvasContainer.parentNode.removeChild(canvasContainer);
  
            if (Browser.resizeCanvas) {
              Browser.setWindowedCanvasSize();
            } else {
              Browser.updateCanvasDimensions(canvas);
            }
          }
          Module['onFullScreen']?.(Browser.isFullscreen);
          Module['onFullscreen']?.(Browser.isFullscreen);
        }
  
        if (!Browser.fullscreenHandlersInstalled) {
          Browser.fullscreenHandlersInstalled = true;
          document.addEventListener('fullscreenchange', fullscreenChange, false);
          document.addEventListener('mozfullscreenchange', fullscreenChange, false);
          document.addEventListener('webkitfullscreenchange', fullscreenChange, false);
          document.addEventListener('MSFullscreenChange', fullscreenChange, false);
        }
  
        // create a new parent to ensure the canvas has no siblings. this allows browsers to optimize full screen performance when its parent is the full screen root
        var canvasContainer = document.createElement("div");
        canvas.parentNode.insertBefore(canvasContainer, canvas);
        canvasContainer.appendChild(canvas);
  
        // use parent of canvas as full screen root to allow aspect ratio correction (Firefox stretches the root to screen size)
        canvasContainer.requestFullscreen = canvasContainer['requestFullscreen'] ||
                                            canvasContainer['mozRequestFullScreen'] ||
                                            canvasContainer['msRequestFullscreen'] ||
                                           (canvasContainer['webkitRequestFullscreen'] ? () => canvasContainer['webkitRequestFullscreen'](Element['ALLOW_KEYBOARD_INPUT']) : null) ||
                                           (canvasContainer['webkitRequestFullScreen'] ? () => canvasContainer['webkitRequestFullScreen'](Element['ALLOW_KEYBOARD_INPUT']) : null);
  
        canvasContainer.requestFullscreen();
      },
  requestFullScreen() {
        abort('Module.requestFullScreen has been replaced by Module.requestFullscreen (without a capital S)');
      },
  exitFullscreen() {
        // This is workaround for chrome. Trying to exit from fullscreen
        // not in fullscreen state will cause "TypeError: Document not active"
        // in chrome. See https://github.com/emscripten-core/emscripten/pull/8236
        if (!Browser.isFullscreen) {
          return false;
        }
  
        var CFS = document['exitFullscreen'] ||
                  document['cancelFullScreen'] ||
                  document['mozCancelFullScreen'] ||
                  document['msExitFullscreen'] ||
                  document['webkitCancelFullScreen'] ||
            (() => {});
        CFS.apply(document, []);
        return true;
      },
  safeSetTimeout(func, timeout) {
        // Legacy function, this is used by the SDL2 port so we need to keep it
        // around at least until that is updated.
        // See https://github.com/libsdl-org/SDL/pull/6304
        return safeSetTimeout(func, timeout);
      },
  getMimetype(name) {
        return {
          'jpg': 'image/jpeg',
          'jpeg': 'image/jpeg',
          'png': 'image/png',
          'bmp': 'image/bmp',
          'ogg': 'audio/ogg',
          'wav': 'audio/wav',
          'mp3': 'audio/mpeg'
        }[name.slice(name.lastIndexOf('.')+1)];
      },
  getUserMedia(func) {
        window.getUserMedia ||= navigator['getUserMedia'] ||
                                navigator['mozGetUserMedia'];
        window.getUserMedia(func);
      },
  getMovementX(event) {
        return event['movementX'] ||
               event['mozMovementX'] ||
               event['webkitMovementX'] ||
               0;
      },
  getMovementY(event) {
        return event['movementY'] ||
               event['mozMovementY'] ||
               event['webkitMovementY'] ||
               0;
      },
  getMouseWheelDelta(event) {
        var delta = 0;
        switch (event.type) {
          case 'DOMMouseScroll':
            // 3 lines make up a step
            delta = event.detail / 3;
            break;
          case 'mousewheel':
            // 120 units make up a step
            delta = event.wheelDelta / 120;
            break;
          case 'wheel':
            delta = event.deltaY
            switch (event.deltaMode) {
              case 0:
                // DOM_DELTA_PIXEL: 100 pixels make up a step
                delta /= 100;
                break;
              case 1:
                // DOM_DELTA_LINE: 3 lines make up a step
                delta /= 3;
                break;
              case 2:
                // DOM_DELTA_PAGE: A page makes up 80 steps
                delta *= 80;
                break;
              default:
                throw 'unrecognized mouse wheel delta mode: ' + event.deltaMode;
            }
            break;
          default:
            throw 'unrecognized mouse wheel event: ' + event.type;
        }
        return delta;
      },
  mouseX:0,
  mouseY:0,
  mouseMovementX:0,
  mouseMovementY:0,
  touches:{
  },
  lastTouches:{
  },
  calculateMouseCoords(pageX, pageY) {
        // Calculate the movement based on the changes
        // in the coordinates.
        var canvas = Browser.getCanvas();
        var rect = canvas.getBoundingClientRect();
  
        // Neither .scrollX or .pageXOffset are defined in a spec, but
        // we prefer .scrollX because it is currently in a spec draft.
        // (see: http://www.w3.org/TR/2013/WD-cssom-view-20131217/)
        var scrollX = ((typeof window.scrollX != 'undefined') ? window.scrollX : window.pageXOffset);
        var scrollY = ((typeof window.scrollY != 'undefined') ? window.scrollY : window.pageYOffset);
        // If this assert lands, it's likely because the browser doesn't support scrollX or pageXOffset
        // and we have no viable fallback.
        assert((typeof scrollX != 'undefined') && (typeof scrollY != 'undefined'), 'Unable to retrieve scroll position, mouse positions likely broken.');
        var adjustedX = pageX - (scrollX + rect.left);
        var adjustedY = pageY - (scrollY + rect.top);
  
        // the canvas might be CSS-scaled compared to its backbuffer;
        // SDL-using content will want mouse coordinates in terms
        // of backbuffer units.
        adjustedX = adjustedX * (canvas.width / rect.width);
        adjustedY = adjustedY * (canvas.height / rect.height);
  
        return { x: adjustedX, y: adjustedY };
      },
  setMouseCoords(pageX, pageY) {
        const {x, y} = Browser.calculateMouseCoords(pageX, pageY);
        Browser.mouseMovementX = x - Browser.mouseX;
        Browser.mouseMovementY = y - Browser.mouseY;
        Browser.mouseX = x;
        Browser.mouseY = y;
      },
  calculateMouseEvent(event) { // event should be mousemove, mousedown or mouseup
        if (Browser.pointerLock) {
          // When the pointer is locked, calculate the coordinates
          // based on the movement of the mouse.
          // Workaround for Firefox bug 764498
          if (event.type != 'mousemove' &&
              ('mozMovementX' in event)) {
            Browser.mouseMovementX = Browser.mouseMovementY = 0;
          } else {
            Browser.mouseMovementX = Browser.getMovementX(event);
            Browser.mouseMovementY = Browser.getMovementY(event);
          }
  
          // add the mouse delta to the current absolute mouse position
          Browser.mouseX += Browser.mouseMovementX;
          Browser.mouseY += Browser.mouseMovementY;
        } else {
          if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
            var touch = event.touch;
            if (touch === undefined) {
              return; // the "touch" property is only defined in SDL
  
            }
            var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
  
            if (event.type === 'touchstart') {
              Browser.lastTouches[touch.identifier] = coords;
              Browser.touches[touch.identifier] = coords;
            } else if (event.type === 'touchend' || event.type === 'touchmove') {
              var last = Browser.touches[touch.identifier];
              last ||= coords;
              Browser.lastTouches[touch.identifier] = last;
              Browser.touches[touch.identifier] = coords;
            }
            return;
          }
  
          Browser.setMouseCoords(event.pageX, event.pageY);
        }
      },
  resizeListeners:[],
  updateResizeListeners() {
        var canvas = Browser.getCanvas();
        Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
      },
  setCanvasSize(width, height, noUpdates) {
        var canvas = Browser.getCanvas();
        Browser.updateCanvasDimensions(canvas, width, height);
        if (!noUpdates) Browser.updateResizeListeners();
      },
  windowedWidth:0,
  windowedHeight:0,
  setFullscreenCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags | 0x00800000; // set SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Browser.getCanvas());
        Browser.updateResizeListeners();
      },
  setWindowedCanvasSize() {
        // check if SDL is available
        if (typeof SDL != "undefined") {
          var flags = HEAPU32[((SDL.screen)>>2)];
          flags = flags & ~0x00800000; // clear SDL_FULLSCREEN flag
          HEAP32[((SDL.screen)>>2)] = flags;
        }
        Browser.updateCanvasDimensions(Browser.getCanvas());
        Browser.updateResizeListeners();
      },
  updateCanvasDimensions(canvas, wNative, hNative) {
        if (wNative && hNative) {
          canvas.widthNative = wNative;
          canvas.heightNative = hNative;
        } else {
          wNative = canvas.widthNative;
          hNative = canvas.heightNative;
        }
        var w = wNative;
        var h = hNative;
        if (Module['forcedAspectRatio'] > 0) {
          if (w/h < Module['forcedAspectRatio']) {
            w = Math.round(h * Module['forcedAspectRatio']);
          } else {
            h = Math.round(w / Module['forcedAspectRatio']);
          }
        }
        if (((document['fullscreenElement'] || document['mozFullScreenElement'] ||
             document['msFullscreenElement'] || document['webkitFullscreenElement'] ||
             document['webkitCurrentFullScreenElement']) === canvas.parentNode) && (typeof screen != 'undefined')) {
           var factor = Math.min(screen.width / w, screen.height / h);
           w = Math.round(w * factor);
           h = Math.round(h * factor);
        }
        if (Browser.resizeCanvas) {
          if (canvas.width  != w) canvas.width  = w;
          if (canvas.height != h) canvas.height = h;
          if (typeof canvas.style != 'undefined') {
            canvas.style.removeProperty( "width");
            canvas.style.removeProperty("height");
          }
        } else {
          if (canvas.width  != wNative) canvas.width  = wNative;
          if (canvas.height != hNative) canvas.height = hNative;
          if (typeof canvas.style != 'undefined') {
            if (w != wNative || h != hNative) {
              canvas.style.setProperty( "width", w + "px", "important");
              canvas.style.setProperty("height", h + "px", "important");
            } else {
              canvas.style.removeProperty( "width");
              canvas.style.removeProperty("height");
            }
          }
        }
      },
  };
  
  
  
  var _glEnable = (x0) => GLctx.enable(x0);
  
  var _glDisable = (x0) => GLctx.disable(x0);
  
  var _glIsEnabled = (x0) => GLctx.isEnabled(x0);
  
  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  
  var readI53FromU64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAPU32[(((ptr)+(4))>>2)] * 4294967296;
    };
  var writeI53ToI64 = (ptr, num) => {
      HEAPU32[((ptr)>>2)] = num;
      var lower = HEAPU32[((ptr)>>2)];
      HEAPU32[(((ptr)+(4))>>2)] = (num - lower)/4294967296;
      var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
      var offset = ((ptr)>>2);
      if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset+1])}, which deserializes back to ${deserialized} instead!`);
    };
  
  
  var webglGetExtensions = () => {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
  
  var emscriptenWebGLGet = (name_, p, type) => {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null
      // pointer should be treated.  Testing on desktop core GL 3, the application
      // crashes on glGetIntegerv to a null pointer, but better to report an error
      // instead of doing anything random.
      if (!p) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch (name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type != 0 && type != 1) {
            GL.recordError(0x500); // GL_INVALID_ENUM
          }
          // Do not write anything to the out pointer, since no binary formats are
          // supported.
          return;
        case 0x87FE: // GL_NUM_PROGRAM_BINARY_FORMATS
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
          // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
          // queried for length), so implement it ourselves to allow C++ GLES2
          // code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
  
        case 0x821D: // GL_NUM_EXTENSIONS
          if (GL.currentContext.version < 2) {
            // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
            return;
          }
          ret = webglGetExtensions().length;
          break;
        case 0x821B: // GL_MAJOR_VERSION
        case 0x821C: // GL_MINOR_VERSION
          if (GL.currentContext.version < 2) {
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          }
          ret = name_ == 0x821B ? 3 : 0; // return version 3.0
          break;
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound -
              // perhaps nothing is bound), but otherwise can mean an invalid
              // name_, which we need to report as an error
              switch (name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8F36: // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
                case 0x8F37: // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
                case 0x88ED: // PIXEL_PACK_BUFFER_BINDING
                case 0x88EF: // PIXEL_UNPACK_BUFFER_BINDING
                case 0x8CAA: // READ_FRAMEBUFFER_BINDING
                case 0x8919: // SAMPLER_BINDING
                case 0x8C1D: // TEXTURE_BINDING_2D_ARRAY
                case 0x806A: // TEXTURE_BINDING_3D
                case 0x8E25: // TRANSFORM_FEEDBACK_BINDING
                case 0x8C8F: // TRANSFORM_FEEDBACK_BUFFER_BINDING
                case 0x8A28: // UNIFORM_BUFFER_BINDING
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0: HEAP32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 2: HEAPF32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 4: HEAP8[(p)+(i)] = result[i] ? 1 : 0; break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x500); // GL_INVALID_ENUM
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(0x500); // GL_INVALID_ENUM
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof(result)}!`);
            return;
        }
      }
  
      switch (type) {
        case 1: writeI53ToI64(p, ret); break;
        case 0: HEAP32[((p)>>2)] = ret; break;
        case 2:   HEAPF32[((p)>>2)] = ret; break;
        case 4: HEAP8[p] = ret ? 1 : 0; break;
      }
    };
  
  var _glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
  
  
  var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
  
  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
  
  
  var _glGetString = (name_) => {
      var ret = GL.stringCache[name_];
      if (!ret) {
        switch (name_) {
          case 0x1F03 /* GL_EXTENSIONS */:
            ret = stringToNewUTF8(webglGetExtensions().join(' '));
            break;
          case 0x1F00 /* GL_VENDOR */:
          case 0x1F01 /* GL_RENDERER */:
          case 0x9245 /* UNMASKED_VENDOR_WEBGL */:
          case 0x9246 /* UNMASKED_RENDERER_WEBGL */:
            var s = GLctx.getParameter(name_);
            if (!s) {
              GL.recordError(0x500/*GL_INVALID_ENUM*/);
            }
            ret = s ? stringToNewUTF8(s) : 0;
            break;
  
          case 0x1F02 /* GL_VERSION */:
            var webGLVersion = GLctx.getParameter(0x1F02 /*GL_VERSION*/);
            // return GLES version string corresponding to the version of the WebGL context
            var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
            if (true) glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
            ret = stringToNewUTF8(glVersion);
            break;
          case 0x8B8C /* GL_SHADING_LANGUAGE_VERSION */:
            var glslVersion = GLctx.getParameter(0x8B8C /*GL_SHADING_LANGUAGE_VERSION*/);
            // extract the version number 'N.M' from the string 'WebGL GLSL ES N.M ...'
            var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
            var ver_num = glslVersion.match(ver_re);
            if (ver_num !== null) {
              if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + '0'; // ensure minor version has 2 digits
              glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
            }
            ret = stringToNewUTF8(glslVersion);
            break;
          default:
            GL.recordError(0x500/*GL_INVALID_ENUM*/);
            // fall through
        }
        GL.stringCache[name_] = ret;
      }
      return ret;
    };
  
  var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    };
  
  var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    };
  
  var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };
  
  var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };
  
  var _glDetachShader = (program, shader) => {
      GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
    };
  
  var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    };
  
  var _glDeleteProgram = (id) => {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) {
        // glDeleteProgram actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };
  
  
  var _glBindAttribLocation = (program, index, name) => {
      GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
    };
  
  var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    };
  
  var _glBindBuffer = (target, buffer) => {
      if (target == 0x8892 /*GL_ARRAY_BUFFER*/) {
        GLctx.currentArrayBufferBinding = buffer;
        GLImmediate.lastArrayBuffer = buffer;
      } else if (target == 0x8893 /*GL_ELEMENT_ARRAY_BUFFER*/) {
        GLctx.currentElementArrayBufferBinding = buffer;
      }
  
      if (target == 0x88EB /*GL_PIXEL_PACK_BUFFER*/) {
        // In WebGL 2 glReadPixels entry point, we need to use a different WebGL 2
        // API function call when a buffer is bound to
        // GL_PIXEL_PACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelPackBufferBinding = buffer;
      } else if (target == 0x88EC /*GL_PIXEL_UNPACK_BUFFER*/) {
        // In WebGL 2 gl(Compressed)Tex(Sub)Image[23]D entry points, we need to
        // use a different WebGL 2 API function call when a buffer is bound to
        // GL_PIXEL_UNPACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelUnpackBufferBinding = buffer;
      }
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };
  
  
  var _glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
  
  var _glHint = (x0, x1) => GLctx.hint(x0, x1);
  
  var _glEnableVertexAttribArray = (index) => {
      GLctx.enableVertexAttribArray(index);
    };
  
  var _glDisableVertexAttribArray = (index) => {
      GLctx.disableVertexAttribArray(index);
    };
  
  var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };
  
  var _glActiveTexture = (x0) => GLctx.activeTexture(x0);
  
  
  
  var GLEmulation = {
  fogStart:0,
  fogEnd:1,
  fogDensity:1,
  fogColor:null,
  fogMode:2048,
  fogEnabled:false,
  MAX_CLIP_PLANES:6,
  clipPlaneEnabled:[false,false,false,false,false,false],
  clipPlaneEquation:[],
  lightingEnabled:false,
  lightModelAmbient:null,
  lightModelLocalViewer:false,
  lightModelTwoSide:false,
  materialAmbient:null,
  materialDiffuse:null,
  materialSpecular:null,
  materialShininess:null,
  materialEmission:null,
  MAX_LIGHTS:8,
  lightEnabled:[false,false,false,false,false,false,false,false],
  lightAmbient:[],
  lightDiffuse:[],
  lightSpecular:[],
  lightPosition:[],
  alphaTestEnabled:false,
  alphaTestFunc:519,
  alphaTestRef:0,
  pointSize:1,
  vaos:[],
  currentVao:null,
  enabledVertexAttribArrays:{
  },
  hasRunInit:false,
  findToken(source, token) {
        function isIdentChar(ch) {
          if (ch >= 48 && ch <= 57) // 0-9
            return true;
          if (ch >= 65 && ch <= 90) // A-Z
            return true;
          if (ch >= 97 && ch <= 122) // a-z
            return true;
          return false;
        }
        var i = -1;
        do {
          i = source.indexOf(token, i + 1);
          if (i < 0) {
            break;
          }
          if (i > 0 && isIdentChar(source[i - 1])) {
            continue;
          }
          i += token.length;
          if (i < source.length - 1 && isIdentChar(source[i + 1])) {
            continue;
          }
          return true;
        } while (true);
        return false;
      },
  init() {
        // Do not activate immediate/emulation code (e.g. replace glDrawElements)
        // when in FULL_ES2 mode.  We do not need full emulation, we instead
        // emulate client-side arrays etc. in FULL_ES2 code in a straightforward
        // manner, and avoid not having a bound buffer be ambiguous between es2
        // emulation code and legacy gl emulation code.
  
        if (GLEmulation.hasRunInit) {
          return;
        }
        GLEmulation.hasRunInit = true;
  
        GLEmulation.fogColor = new Float32Array(4);
  
        for (var clipPlaneId = 0; clipPlaneId < GLEmulation.MAX_CLIP_PLANES; clipPlaneId++) {
          GLEmulation.clipPlaneEquation[clipPlaneId] = new Float32Array(4);
        }
  
        // set defaults for GL_LIGHTING
        GLEmulation.lightModelAmbient = new Float32Array([0.2, 0.2, 0.2, 1.0]);
        GLEmulation.materialAmbient = new Float32Array([0.2, 0.2, 0.2, 1.0]);
        GLEmulation.materialDiffuse = new Float32Array([0.8, 0.8, 0.8, 1.0]);
        GLEmulation.materialSpecular = new Float32Array([0.0, 0.0, 0.0, 1.0]);
        GLEmulation.materialShininess = new Float32Array([0.0]);
        GLEmulation.materialEmission = new Float32Array([0.0, 0.0, 0.0, 1.0]);
  
        for (var lightId = 0; lightId < GLEmulation.MAX_LIGHTS; lightId++) {
          GLEmulation.lightAmbient[lightId] = new Float32Array([0.0, 0.0, 0.0, 1.0]);
          GLEmulation.lightDiffuse[lightId] = lightId ? new Float32Array([0.0, 0.0, 0.0, 1.0]) : new Float32Array([1.0, 1.0, 1.0, 1.0]);
          GLEmulation.lightSpecular[lightId] = lightId ? new Float32Array([0.0, 0.0, 0.0, 1.0]) : new Float32Array([1.0, 1.0, 1.0, 1.0]);
          GLEmulation.lightPosition[lightId] = new Float32Array([0.0, 0.0, 1.0, 0.0]);
        }
  
        // Add some emulation workarounds
        err('WARNING: using emscripten GL emulation. This is a collection of limited workarounds, do not expect it to work.');
        err('WARNING: using emscripten GL emulation unsafe opts. If weirdness happens, try -sGL_UNSAFE_OPTS=0');
  
        // XXX some of the capabilities we don't support may lead to incorrect rendering, if we do not emulate them in shaders
        var validCapabilities = {
          0xB44: 1, // GL_CULL_FACE
          0xBE2: 1, // GL_BLEND
          0xBD0: 1, // GL_DITHER,
          0xB90: 1, // GL_STENCIL_TEST
          0xB71: 1, // GL_DEPTH_TEST
          0xC11: 1, // GL_SCISSOR_TEST
          0x8037: 1, // GL_POLYGON_OFFSET_FILL
          0x809E: 1, // GL_SAMPLE_ALPHA_TO_COVERAGE
          0x80A0: 1  // GL_SAMPLE_COVERAGE
        };
  
        var orig_glEnable = _glEnable;
        _glEnable = _emscripten_glEnable = (cap) => {
          // Clean up the renderer on any change to the rendering state. The optimization of
          // skipping renderer setup is aimed at the case of multiple glDraw* right after each other
          GLImmediate.lastRenderer?.cleanup();
          if (cap == 0xB60 /* GL_FOG */) {
            if (GLEmulation.fogEnabled != true) {
              GLImmediate.currentRenderer = null; // Fog parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.fogEnabled = true;
            }
            return;
          } else if ((cap >= 0x3000) && (cap < 0x3006)  /* GL_CLIP_PLANE0 to GL_CLIP_PLANE5 */) {
            var clipPlaneId = cap - 0x3000;
            if (GLEmulation.clipPlaneEnabled[clipPlaneId] != true) {
              GLImmediate.currentRenderer = null; // clip plane parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.clipPlaneEnabled[clipPlaneId] = true;
            }
            return;
          } else if ((cap >= 0x4000) && (cap < 0x4008)  /* GL_LIGHT0 to GL_LIGHT7 */) {
            var lightId = cap - 0x4000;
            if (GLEmulation.lightEnabled[lightId] != true) {
              GLImmediate.currentRenderer = null; // light parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.lightEnabled[lightId] = true;
            }
            return;
          } else if (cap == 0xB50 /* GL_LIGHTING */) {
            if (GLEmulation.lightingEnabled != true) {
              GLImmediate.currentRenderer = null; // light parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.lightingEnabled = true;
            }
            return;
          } else if (cap == 0xBC0 /* GL_ALPHA_TEST */) {
            if (GLEmulation.alphaTestEnabled != true) {
              GLImmediate.currentRenderer = null; // alpha testing is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.alphaTestEnabled = true;
            }
            return;
          } else if (cap == 0xDE1 /* GL_TEXTURE_2D */) {
            // XXX not according to spec, and not in desktop GL, but works in some GLES1.x apparently, so support
            // it by forwarding to glEnableClientState
            /* Actually, let's not, for now. (This sounds exceedingly broken)
             * This is in gl_ps_workaround2.c.
            _glEnableClientState(cap);
            */
            return;
          } else if (!(cap in validCapabilities)) {
            return;
          }
          orig_glEnable(cap);
        };
        
  
        var orig_glDisable = _glDisable;
        _glDisable = _emscripten_glDisable = (cap) => {
          GLImmediate.lastRenderer?.cleanup();
          if (cap == 0xB60 /* GL_FOG */) {
            if (GLEmulation.fogEnabled != false) {
              GLImmediate.currentRenderer = null; // Fog parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.fogEnabled = false;
            }
            return;
          } else if ((cap >= 0x3000) && (cap < 0x3006)  /* GL_CLIP_PLANE0 to GL_CLIP_PLANE5 */) {
            var clipPlaneId = cap - 0x3000;
            if (GLEmulation.clipPlaneEnabled[clipPlaneId] != false) {
              GLImmediate.currentRenderer = null; // clip plane parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.clipPlaneEnabled[clipPlaneId] = false;
            }
            return;
          } else if ((cap >= 0x4000) && (cap < 0x4008)  /* GL_LIGHT0 to GL_LIGHT7 */) {
            var lightId = cap - 0x4000;
            if (GLEmulation.lightEnabled[lightId] != false) {
              GLImmediate.currentRenderer = null; // light parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.lightEnabled[lightId] = false;
            }
            return;
          } else if (cap == 0xB50 /* GL_LIGHTING */) {
            if (GLEmulation.lightingEnabled != false) {
              GLImmediate.currentRenderer = null; // light parameter is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.lightingEnabled = false;
            }
            return;
          } else if (cap == 0xBC0 /* GL_ALPHA_TEST */) {
            if (GLEmulation.alphaTestEnabled != false) {
              GLImmediate.currentRenderer = null; // alpha testing is part of the FFP shader state, we must re-lookup the renderer to use.
              GLEmulation.alphaTestEnabled = false;
            }
            return;
          } else if (cap == 0xDE1 /* GL_TEXTURE_2D */) {
            // XXX not according to spec, and not in desktop GL, but works in some GLES1.x apparently, so support
            // it by forwarding to glDisableClientState
            /* Actually, let's not, for now. (This sounds exceedingly broken)
             * This is in gl_ps_workaround2.c.
            _glDisableClientState(cap);
            */
            return;
          } else if (!(cap in validCapabilities)) {
            return;
          }
          orig_glDisable(cap);
        };
        
  
        var orig_glIsEnabled = _glIsEnabled;
        _glIsEnabled = _emscripten_glIsEnabled = (cap) => {
          if (cap == 0xB60 /* GL_FOG */) {
            return GLEmulation.fogEnabled ? 1 : 0;
          } else if ((cap >= 0x3000) && (cap < 0x3006)  /* GL_CLIP_PLANE0 to GL_CLIP_PLANE5 */) {
            var clipPlaneId = cap - 0x3000;
            return GLEmulation.clipPlaneEnabled[clipPlaneId] ? 1 : 0;
          } else if ((cap >= 0x4000) && (cap < 0x4008)  /* GL_LIGHT0 to GL_LIGHT7 */) {
            var lightId = cap - 0x4000;
            return GLEmulation.lightEnabled[lightId] ? 1 : 0;
          } else if (cap == 0xB50 /* GL_LIGHTING */) {
            return GLEmulation.lightingEnabled ? 1 : 0;
          } else if (cap == 0xBC0 /* GL_ALPHA_TEST */) {
            return GLEmulation.alphaTestEnabled ? 1 : 0;
          } else if (!(cap in validCapabilities)) {
            return 0;
          }
          return GLctx.isEnabled(cap);
        };
        
  
        var orig_glGetBooleanv = _glGetBooleanv;
        _glGetBooleanv = _emscripten_glGetBooleanv = (pname, p) => {
          var attrib = GLEmulation.getAttributeFromCapability(pname);
          if (attrib !== null) {
            
            var result = GLImmediate.enabledClientAttributes[attrib];
            HEAP8[p] = result === true ? 1 : 0;
            return;
          }
          orig_glGetBooleanv(pname, p);
        };
        
  
        var orig_glGetIntegerv = _glGetIntegerv;
        _glGetIntegerv = _emscripten_glGetIntegerv = (pname, params) => {
          
          switch (pname) {
            case 0x84E2: pname = GLctx.MAX_TEXTURE_IMAGE_UNITS /* fake it */; break; // GL_MAX_TEXTURE_UNITS
            case 0x8B4A: { // GL_MAX_VERTEX_UNIFORM_COMPONENTS_ARB
              var result = GLctx.getParameter(GLctx.MAX_VERTEX_UNIFORM_VECTORS);
              HEAP32[((params)>>2)] = result*4; // GLES gives num of 4-element vectors, GL wants individual components, so multiply
              return;
            }
            case 0x8B49: { // GL_MAX_FRAGMENT_UNIFORM_COMPONENTS_ARB
              var result = GLctx.getParameter(GLctx.MAX_FRAGMENT_UNIFORM_VECTORS);
              HEAP32[((params)>>2)] = result*4; // GLES gives num of 4-element vectors, GL wants individual components, so multiply
              return;
            }
            case 0x8B4B: { // GL_MAX_VARYING_FLOATS_ARB
              var result = GLctx.getParameter(GLctx.MAX_VARYING_VECTORS);
              HEAP32[((params)>>2)] = result*4; // GLES gives num of 4-element vectors, GL wants individual components, so multiply
              return;
            }
            case 0x8871: pname = GLctx.MAX_COMBINED_TEXTURE_IMAGE_UNITS /* close enough */; break; // GL_MAX_TEXTURE_COORDS
            case 0x807A: { // GL_VERTEX_ARRAY_SIZE
              var attribute = GLImmediate.clientAttributes[GLImmediate.VERTEX];
              HEAP32[((params)>>2)] = attribute ? attribute.size : 0;
              return;
            }
            case 0x807B: { // GL_VERTEX_ARRAY_TYPE
              var attribute = GLImmediate.clientAttributes[GLImmediate.VERTEX];
              HEAP32[((params)>>2)] = attribute ? attribute.type : 0;
              return;
            }
            case 0x807C: { // GL_VERTEX_ARRAY_STRIDE
              var attribute = GLImmediate.clientAttributes[GLImmediate.VERTEX];
              HEAP32[((params)>>2)] = attribute ? attribute.stride : 0;
              return;
            }
            case 0x8081: { // GL_COLOR_ARRAY_SIZE
              var attribute = GLImmediate.clientAttributes[GLImmediate.COLOR];
              HEAP32[((params)>>2)] = attribute ? attribute.size : 0;
              return;
            }
            case 0x8082: { // GL_COLOR_ARRAY_TYPE
              var attribute = GLImmediate.clientAttributes[GLImmediate.COLOR];
              HEAP32[((params)>>2)] = attribute ? attribute.type : 0;
              return;
            }
            case 0x8083: { // GL_COLOR_ARRAY_STRIDE
              var attribute = GLImmediate.clientAttributes[GLImmediate.COLOR];
              HEAP32[((params)>>2)] = attribute ? attribute.stride : 0;
              return;
            }
            case 0x8088: { // GL_TEXTURE_COORD_ARRAY_SIZE
              var attribute = GLImmediate.clientAttributes[GLImmediate.TEXTURE0 + GLImmediate.clientActiveTexture];
              HEAP32[((params)>>2)] = attribute ? attribute.size : 0;
              return;
            }
            case 0x8089: { // GL_TEXTURE_COORD_ARRAY_TYPE
              var attribute = GLImmediate.clientAttributes[GLImmediate.TEXTURE0 + GLImmediate.clientActiveTexture];
              HEAP32[((params)>>2)] = attribute ? attribute.type : 0;
              return;
            }
            case 0x808A: { // GL_TEXTURE_COORD_ARRAY_STRIDE
              var attribute = GLImmediate.clientAttributes[GLImmediate.TEXTURE0 + GLImmediate.clientActiveTexture];
              HEAP32[((params)>>2)] = attribute ? attribute.stride : 0;
              return;
            }
            case 0x0D32: { // GL_MAX_CLIP_PLANES
              HEAP32[((params)>>2)] = GLEmulation.MAX_CLIP_PLANES; // all implementations need to support atleast 6
              return;
            }
            case 0x0BA0: { // GL_MATRIX_MODE
              HEAP32[((params)>>2)] = GLImmediate.currentMatrix + 0x1700;
              return;
            }
            case 0x0BC1: { // GL_ALPHA_TEST_FUNC
              HEAP32[((params)>>2)] = GLEmulation.alphaTestFunc;
              return;
            }
          }
          orig_glGetIntegerv(pname, params);
        };
        
  
        var orig_glGetString = _glGetString;
        _glGetString = _emscripten_glGetString = (name_) => {
          if (GL.stringCache[name_]) return GL.stringCache[name_];
          switch (name_) {
            case 0x1F03 /* GL_EXTENSIONS */: // Add various extensions that we can support
              var ret = stringToNewUTF8(getEmscriptenSupportedExtensions(GLctx).join(' ') +
                     ' GL_EXT_texture_env_combine GL_ARB_texture_env_crossbar GL_ATI_texture_env_combine3 GL_NV_texture_env_combine4 GL_EXT_texture_env_dot3 GL_ARB_multitexture GL_ARB_vertex_buffer_object GL_EXT_framebuffer_object GL_ARB_vertex_program GL_ARB_fragment_program GL_ARB_shading_language_100 GL_ARB_shader_objects GL_ARB_vertex_shader GL_ARB_fragment_shader GL_ARB_texture_cube_map GL_EXT_draw_range_elements' +
                     (GL.currentContext.compressionExt ? ' GL_ARB_texture_compression GL_EXT_texture_compression_s3tc' : '') +
                     (GL.currentContext.anisotropicExt ? ' GL_EXT_texture_filter_anisotropic' : '')
              );
              return GL.stringCache[name_] = ret;
          }
          return orig_glGetString(name_);
        };
        
  
        // Do some automatic rewriting to work around GLSL differences. Note that this must be done in
        // tandem with the rest of the program, by itself it cannot suffice.
        // Note that we need to remember shader types for this rewriting, saving sources makes it easier to debug.
        GL.shaderInfos = {};
        var orig_glCreateShader = _glCreateShader;
        _glCreateShader = _emscripten_glCreateShader = (shaderType) => {
          var id = orig_glCreateShader(shaderType);
          GL.shaderInfos[id] = {
            type: shaderType,
            ftransform: false
          };
          return id;
        };
        
  
        function ensurePrecision(source) {
          if (!/precision +(low|medium|high)p +float *;/.test(source)) {
            source = '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n' + source;
          }
          return source;
        }
  
        var orig_glShaderSource = _glShaderSource;
        _glShaderSource = _emscripten_glShaderSource = (shader, count, string, length) => {
          
          
          var source = GL.getSource(shader, count, string, length);
          // XXX We add attributes and uniforms to shaders. The program can ask for the # of them, and see the
          // ones we generated, potentially confusing it? Perhaps we should hide them.
          if (GL.shaderInfos[shader].type == GLctx.VERTEX_SHADER) {
            // Replace ftransform() with explicit project/modelview transforms, and add position and matrix info.
            var has_pm = source.search(/u_projection/) >= 0;
            var has_mm = source.search(/u_modelView/) >= 0;
            var has_pv = source.search(/a_position/) >= 0;
            var need_pm = 0, need_mm = 0, need_pv = 0;
            var old = source;
            source = source.replace(/ftransform\(\)/g, '(u_projection * u_modelView * a_position)');
            if (old != source) need_pm = need_mm = need_pv = 1;
            old = source;
            source = source.replace(/gl_ProjectionMatrix/g, 'u_projection');
            if (old != source) need_pm = 1;
            old = source;
            source = source.replace(/gl_ModelViewMatrixTranspose\[2\]/g, 'vec4(u_modelView[0][2], u_modelView[1][2], u_modelView[2][2], u_modelView[3][2])'); // XXX extremely inefficient
            if (old != source) need_mm = 1;
            old = source;
            source = source.replace(/gl_ModelViewMatrix/g, 'u_modelView');
            if (old != source) need_mm = 1;
            old = source;
            source = source.replace(/gl_Vertex/g, 'a_position');
            if (old != source) need_pv = 1;
            old = source;
            source = source.replace(/gl_ModelViewProjectionMatrix/g, '(u_projection * u_modelView)');
            if (old != source) need_pm = need_mm = 1;
            if (need_pv && !has_pv) source = 'attribute vec4 a_position; \n' + source;
            if (need_mm && !has_mm) source = 'uniform mat4 u_modelView; \n' + source;
            if (need_pm && !has_pm) source = 'uniform mat4 u_projection; \n' + source;
            GL.shaderInfos[shader].ftransform = need_pm || need_mm || need_pv; // we will need to provide the fixed function stuff as attributes and uniforms
            for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
              // XXX To handle both regular texture mapping and cube mapping, we use vec4 for tex coordinates.
              old = source;
              var need_vtc = source.search(`v_texCoord${i}`) == -1;
              source = source.replace(new RegExp(`gl_TexCoord\\[${i}\\]`, 'g'), `v_texCoord${i}`)
                             .replace(new RegExp(`gl_MultiTexCoord${i}`, 'g'), `a_texCoord${i}`);
              if (source != old) {
                source = `attribute vec4 a_texCoord${i}; \n${source}`;
                if (need_vtc) {
                  source = `varying vec4 v_texCoord${i};   \n${source}`;
                }
              }
  
              old = source;
              source = source.replace(new RegExp(`gl_TextureMatrix\\[${i}\\]`, 'g'), `u_textureMatrix${i}`);
              if (source != old) {
                source = `uniform mat4 u_textureMatrix${i}; \n${source}`;
              }
            }
            if (source.includes('gl_FrontColor')) {
              source = 'varying vec4 v_color; \n' +
                       source.replace(/gl_FrontColor/g, 'v_color');
            }
            if (source.includes('gl_Color')) {
              source = 'attribute vec4 a_color; \n' +
                       source.replace(/gl_Color/g, 'a_color');
            }
            if (source.includes('gl_Normal')) {
              source = 'attribute vec3 a_normal; \n' +
                       source.replace(/gl_Normal/g, 'a_normal');
            }
            // fog
            if (source.includes('gl_FogFragCoord')) {
              source = 'varying float v_fogFragCoord;   \n' +
                       source.replace(/gl_FogFragCoord/g, 'v_fogFragCoord');
            }
          } else { // Fragment shader
            for (i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
              old = source;
              source = source.replace(new RegExp(`gl_TexCoord\\[${i}\\]`, 'g'), `v_texCoord${i}`);
              if (source != old) {
                source = 'varying vec4 v_texCoord' + i + ';   \n' + source;
              }
            }
            if (source.includes('gl_Color')) {
              source = 'varying vec4 v_color; \n' + source.replace(/gl_Color/g, 'v_color');
            }
            if (source.includes('gl_Fog.color')) {
              source = 'uniform vec4 u_fogColor;   \n' +
                       source.replace(/gl_Fog.color/g, 'u_fogColor');
            }
            if (source.includes('gl_Fog.end')) {
              source = 'uniform float u_fogEnd;   \n' +
                       source.replace(/gl_Fog.end/g, 'u_fogEnd');
            }
            if (source.includes('gl_Fog.scale')) {
              source = 'uniform float u_fogScale;   \n' +
                       source.replace(/gl_Fog.scale/g, 'u_fogScale');
            }
            if (source.includes('gl_Fog.density')) {
              source = 'uniform float u_fogDensity;   \n' +
                       source.replace(/gl_Fog.density/g, 'u_fogDensity');
            }
            if (source.includes('gl_FogFragCoord')) {
              source = 'varying float v_fogFragCoord;   \n' +
                       source.replace(/gl_FogFragCoord/g, 'v_fogFragCoord');
            }
            source = ensurePrecision(source);
          }
          GLctx.shaderSource(GL.shaders[shader], source);
        };
        
  
        var orig_glCompileShader = _glCompileShader;
        _glCompileShader = _emscripten_glCompileShader = (shader) => {
          GLctx.compileShader(GL.shaders[shader]);
        };
        
  
        GL.programShaders = {};
        var orig_glAttachShader = _glAttachShader;
        _glAttachShader = _emscripten_glAttachShader = (program, shader) => {
          GL.programShaders[program] ||= [];
          GL.programShaders[program].push(shader);
          orig_glAttachShader(program, shader);
        };
        
  
        var orig_glDetachShader = _glDetachShader;
        _glDetachShader = _emscripten_glDetachShader = (program, shader) => {
          var programShader = GL.programShaders[program];
          if (!programShader) {
            err(`WARNING: _glDetachShader received invalid program: ${program}`);
            return;
          }
          var index = programShader.indexOf(shader);
          programShader.splice(index, 1);
          orig_glDetachShader(program, shader);
        };
        
  
        var orig_glUseProgram = _glUseProgram;
        _glUseProgram = _emscripten_glUseProgram = (program) => {
          if (GL.currProgram != program) {
            GLImmediate.currentRenderer = null; // This changes the FFP emulation shader program, need to recompute that.
            GL.currProgram = program;
            GLImmediate.fixedFunctionProgram = 0;
            orig_glUseProgram(program);
          }
        }
        
  
        var orig_glDeleteProgram = _glDeleteProgram;
        _glDeleteProgram = _emscripten_glDeleteProgram = (program) => {
          orig_glDeleteProgram(program);
          if (program == GL.currProgram) {
            GLImmediate.currentRenderer = null; // This changes the FFP emulation shader program, need to recompute that.
            GL.currProgram = 0;
          }
        };
        
  
        // If attribute 0 was not bound, bind it to 0 for WebGL performance reasons. Track if 0 is free for that.
        var zeroUsedPrograms = {};
        var orig_glBindAttribLocation = _glBindAttribLocation;
        _glBindAttribLocation = _emscripten_glBindAttribLocation = (program, index, name) => {
          if (index == 0) zeroUsedPrograms[program] = true;
          orig_glBindAttribLocation(program, index, name);
        };
        
  
        var orig_glLinkProgram = _glLinkProgram;
        _glLinkProgram = _emscripten_glLinkProgram = (program) => {
          if (!(program in zeroUsedPrograms)) {
            GLctx.bindAttribLocation(GL.programs[program], 0, 'a_position');
          }
          orig_glLinkProgram(program);
        };
        
  
        var orig_glBindBuffer = _glBindBuffer;
        _glBindBuffer = _emscripten_glBindBuffer = (target, buffer) => {
          orig_glBindBuffer(target, buffer);
          if (target == GLctx.ARRAY_BUFFER) {
            if (GLEmulation.currentVao) {
              assert(GLEmulation.currentVao.arrayBuffer == buffer || GLEmulation.currentVao.arrayBuffer == 0 || buffer == 0, 'TODO: support for multiple array buffers in vao');
              GLEmulation.currentVao.arrayBuffer = buffer;
            }
          } else if (target == GLctx.ELEMENT_ARRAY_BUFFER) {
            if (GLEmulation.currentVao) GLEmulation.currentVao.elementArrayBuffer = buffer;
          }
        };
        
  
        var orig_glGetFloatv = _glGetFloatv;
        _glGetFloatv = _emscripten_glGetFloatv = (pname, params) => {
          
          if (pname == 0xBA6) { // GL_MODELVIEW_MATRIX
            HEAPF32.set(GLImmediate.matrix[0/*m*/], ((params)>>2));
          } else if (pname == 0xBA7) { // GL_PROJECTION_MATRIX
            HEAPF32.set(GLImmediate.matrix[1/*p*/], ((params)>>2));
          } else if (pname == 0xBA8) { // GL_TEXTURE_MATRIX
            HEAPF32.set(GLImmediate.matrix[2/*t*/ + GLImmediate.clientActiveTexture], ((params)>>2));
          } else if (pname == 0xB66) { // GL_FOG_COLOR
            HEAPF32.set(GLEmulation.fogColor, ((params)>>2));
          } else if (pname == 0xB63) { // GL_FOG_START
            HEAPF32[((params)>>2)] = GLEmulation.fogStart;
          } else if (pname == 0xB64) { // GL_FOG_END
            HEAPF32[((params)>>2)] = GLEmulation.fogEnd;
          } else if (pname == 0xB62) { // GL_FOG_DENSITY
            HEAPF32[((params)>>2)] = GLEmulation.fogDensity;
          } else if (pname == 0xB65) { // GL_FOG_MODE
            HEAPF32[((params)>>2)] = GLEmulation.fogMode;
          } else if (pname == 0xB53) { // GL_LIGHT_MODEL_AMBIENT
            HEAPF32[((params)>>2)] = GLEmulation.lightModelAmbient[0];
            HEAPF32[(((params)+(4))>>2)] = GLEmulation.lightModelAmbient[1];
            HEAPF32[(((params)+(8))>>2)] = GLEmulation.lightModelAmbient[2];
            HEAPF32[(((params)+(12))>>2)] = GLEmulation.lightModelAmbient[3];
          } else if (pname == 0xBC2) { // GL_ALPHA_TEST_REF
            HEAPF32[((params)>>2)] = GLEmulation.alphaTestRef;
          } else if (pname == 0xB00) { // GL_CURRENT_COLOR
            var c = GLImmediate.clientColor;
            HEAPF32[((params)>>2)] = c[0];
            HEAPF32[(((params)+(4))>>2)] = c[1];
            HEAPF32[(((params)+(8))>>2)] = c[2];
            HEAPF32[(((params)+(12))>>2)] = c[3];
          } else {
            orig_glGetFloatv(pname, params);
          }
        };
        
  
        var orig_glHint = _glHint;
        _glHint = _emscripten_glHint = (target, mode) => {
          if (target == 0x84EF) { // GL_TEXTURE_COMPRESSION_HINT
            return;
          }
          orig_glHint(target, mode);
        };
        
  
        var orig_glEnableVertexAttribArray = _glEnableVertexAttribArray;
        _glEnableVertexAttribArray = _emscripten_glEnableVertexAttribArray = (index) => {
          orig_glEnableVertexAttribArray(index);
          GLEmulation.enabledVertexAttribArrays[index] = 1;
          if (GLEmulation.currentVao) GLEmulation.currentVao.enabledVertexAttribArrays[index] = 1;
        };
        
  
        var orig_glDisableVertexAttribArray = _glDisableVertexAttribArray;
        _glDisableVertexAttribArray = _emscripten_glDisableVertexAttribArray = (index) => {
          orig_glDisableVertexAttribArray(index);
          delete GLEmulation.enabledVertexAttribArrays[index];
          if (GLEmulation.currentVao) delete GLEmulation.currentVao.enabledVertexAttribArrays[index];
        };
        
  
        var orig_glVertexAttribPointer = _glVertexAttribPointer;
        _glVertexAttribPointer = _emscripten_glVertexAttribPointer = (index, size, type, normalized, stride, pointer) => {
          orig_glVertexAttribPointer(index, size, type, normalized, stride, pointer);
          if (GLEmulation.currentVao) { // TODO: avoid object creation here? likely not hot though
            GLEmulation.currentVao.vertexAttribPointers[index] = [index, size, type, normalized, stride, pointer];
          }
        };
        
      },
  getAttributeFromCapability(cap) {
        var attrib = null;
        switch (cap) {
          case 0xDE1: // GL_TEXTURE_2D - XXX not according to spec, and not in desktop GL, but works in some GLES1.x apparently, so support it
            abort("GL_TEXTURE_2D is not a spec-defined capability for gl{Enable,Disable}ClientState.");
            // Fall through:
          case 0x8078: // GL_TEXTURE_COORD_ARRAY
            attrib = GLImmediate.TEXTURE0 + GLImmediate.clientActiveTexture; break;
          case 0x8074: // GL_VERTEX_ARRAY
            attrib = GLImmediate.VERTEX; break;
          case 0x8075: // GL_NORMAL_ARRAY
            attrib = GLImmediate.NORMAL; break;
          case 0x8076: // GL_COLOR_ARRAY
            attrib = GLImmediate.COLOR; break;
        }
        return attrib;
      },
  };
  var GLImmediate = {
  MapTreeLib:null,
  spawnMapTreeLib:() => {
        /**
         * A naive implementation of a map backed by an array, and accessed by
         * naive iteration along the array. (hashmap with only one bucket)
         * @constructor
         */
        function CNaiveListMap() {
          var list = [];
  
          this.insert = function CNaiveListMap_insert(key, val) {
            if (this.contains(key|0)) return false;
            list.push([key, val]);
            return true;
          };
  
          var __contains_i;
          this.contains = function CNaiveListMap_contains(key) {
            for (__contains_i = 0; __contains_i < list.length; ++__contains_i) {
              if (list[__contains_i][0] === key) return true;
            }
            return false;
          };
  
          var __get_i;
          this.get = function CNaiveListMap_get(key) {
            for (__get_i = 0; __get_i < list.length; ++__get_i) {
              if (list[__get_i][0] === key) return list[__get_i][1];
            }
            return undefined;
          };
        };
  
        /**
         * A tree of map nodes.
         * Uses `KeyView`s to allow descending the tree without garbage.
         * Example: {
         *   // Create our map object.
         *   var map = new ObjTreeMap();
         *
         *   // Grab the static keyView for the map.
         *   var keyView = map.GetStaticKeyView();
         *
         *   // Let's make a map for:
         *   // root: <undefined>
         *   //   1: <undefined>
         *   //     2: <undefined>
         *   //       5: "Three, sir!"
         *   //       3: "Three!"
         *
         *   // Note how we can chain together `Reset` and `Next` to
         *   // easily descend based on multiple key fragments.
         *   keyView.Reset().Next(1).Next(2).Next(5).Set("Three, sir!");
         *   keyView.Reset().Next(1).Next(2).Next(3).Set("Three!");
         * }
         * @constructor
         */
        function CMapTree() {
          /** @constructor */
          function CNLNode() {
            var map = new CNaiveListMap();
  
            this.child = function CNLNode_child(keyFrag) {
              if (!map.contains(keyFrag|0)) {
                map.insert(keyFrag|0, new CNLNode());
              }
              return map.get(keyFrag|0);
            };
  
            this.value = undefined;
            this.get = function CNLNode_get() {
              return this.value;
            };
  
            this.set = function CNLNode_set(val) {
              this.value = val;
            };
          }
  
          /** @constructor */
          function CKeyView(root) {
            var cur;
  
            this.reset = function CKeyView_reset() {
              cur = root;
              return this;
            };
            this.reset();
  
            this.next = function CKeyView_next(keyFrag) {
              cur = cur.child(keyFrag);
              return this;
            };
  
            this.get = function CKeyView_get() {
              return cur.get();
            };
  
            this.set = function CKeyView_set(val) {
              cur.set(val);
            };
          };
  
          var root;
          var staticKeyView;
  
          this.createKeyView = function CNLNode_createKeyView() {
            return new CKeyView(root);
          }
  
          this.clear = function CNLNode_clear() {
            root = new CNLNode();
            staticKeyView = this.createKeyView();
          };
          this.clear();
  
          this.getStaticKeyView = function CNLNode_getStaticKeyView() {
            staticKeyView.reset();
            return staticKeyView;
          };
        };
  
        // Exports:
        return {
          create: () => new CMapTree(),
        };
      },
  TexEnvJIT:null,
  spawnTexEnvJIT:() => {
        // GL defs:
        var GL_TEXTURE0 = 0x84C0;
        var GL_TEXTURE_1D = 0xDE0;
        var GL_TEXTURE_2D = 0xDE1;
        var GL_TEXTURE_3D = 0x806f;
        var GL_TEXTURE_CUBE_MAP = 0x8513;
        var GL_TEXTURE_ENV = 0x2300;
        var GL_TEXTURE_ENV_MODE = 0x2200;
        var GL_TEXTURE_ENV_COLOR = 0x2201;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_X = 0x8515;
        var GL_TEXTURE_CUBE_MAP_NEGATIVE_X = 0x8516;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_Y = 0x8517;
        var GL_TEXTURE_CUBE_MAP_NEGATIVE_Y = 0x8518;
        var GL_TEXTURE_CUBE_MAP_POSITIVE_Z = 0x8519;
        var GL_TEXTURE_CUBE_MAP_NEGATIVE_Z = 0x851A;
  
        var GL_SRC0_RGB = 0x8580;
        var GL_SRC1_RGB = 0x8581;
        var GL_SRC2_RGB = 0x8582;
  
        var GL_SRC0_ALPHA = 0x8588;
        var GL_SRC1_ALPHA = 0x8589;
        var GL_SRC2_ALPHA = 0x858A;
  
        var GL_OPERAND0_RGB = 0x8590;
        var GL_OPERAND1_RGB = 0x8591;
        var GL_OPERAND2_RGB = 0x8592;
  
        var GL_OPERAND0_ALPHA = 0x8598;
        var GL_OPERAND1_ALPHA = 0x8599;
        var GL_OPERAND2_ALPHA = 0x859A;
  
        var GL_COMBINE_RGB = 0x8571;
        var GL_COMBINE_ALPHA = 0x8572;
  
        var GL_RGB_SCALE = 0x8573;
        var GL_ALPHA_SCALE = 0xD1C;
  
        // env.mode
        var GL_ADD      = 0x104;
        var GL_BLEND    = 0xBE2;
        var GL_REPLACE  = 0x1E01;
        var GL_MODULATE = 0x2100;
        var GL_DECAL    = 0x2101;
        var GL_COMBINE  = 0x8570;
  
        // env.color/alphaCombiner
        //var GL_ADD         = 0x104;
        //var GL_REPLACE     = 0x1E01;
        //var GL_MODULATE    = 0x2100;
        var GL_SUBTRACT    = 0x84E7;
        var GL_INTERPOLATE = 0x8575;
  
        // env.color/alphaSrc
        var GL_TEXTURE       = 0x1702;
        var GL_CONSTANT      = 0x8576;
        var GL_PRIMARY_COLOR = 0x8577;
        var GL_PREVIOUS      = 0x8578;
  
        // env.color/alphaOp
        var GL_SRC_COLOR           = 0x300;
        var GL_ONE_MINUS_SRC_COLOR = 0x301;
        var GL_SRC_ALPHA           = 0x302;
        var GL_ONE_MINUS_SRC_ALPHA = 0x303;
  
        var GL_RGB  = 0x1907;
        var GL_RGBA = 0x1908;
  
        // Our defs:
        var TEXENVJIT_NAMESPACE_PREFIX = "tej_";
        // Not actually constant, as they can be changed between JIT passes:
        var TEX_UNIT_UNIFORM_PREFIX = "uTexUnit";
        var TEX_COORD_VARYING_PREFIX = "vTexCoord";
        var PRIM_COLOR_VARYING = "vPrimColor";
        var TEX_MATRIX_UNIFORM_PREFIX = "uTexMatrix";
  
        // Static vars:
        var s_texUnits = null; //[];
        var s_activeTexture = 0;
  
        var s_requiredTexUnitsForPass = [];
  
        // Static funcs:
        function abort(info) {
          assert(false, "[TexEnvJIT] ABORT: " + info);
        }
  
        function abort_noSupport(info) {
          abort("No support: " + info);
        }
  
        function abort_sanity(info) {
          abort("Sanity failure: " + info);
        }
  
        function genTexUnitSampleExpr(texUnitID) {
          var texUnit = s_texUnits[texUnitID];
          var texType = texUnit.getTexType();
  
          var func = null;
          switch (texType) {
            case GL_TEXTURE_1D:
              func = "texture2D";
              break;
            case GL_TEXTURE_2D:
              func = "texture2D";
              break;
            case GL_TEXTURE_3D:
              return abort_noSupport("No support for 3D textures.");
            case GL_TEXTURE_CUBE_MAP:
              func = "textureCube";
              break;
            default:
              return abort_sanity(`Unknown texType: ${ptrToString(texType)}`);
          }
  
          var texCoordExpr = TEX_COORD_VARYING_PREFIX + texUnitID;
          if (TEX_MATRIX_UNIFORM_PREFIX != null) {
            texCoordExpr = `(${TEX_MATRIX_UNIFORM_PREFIX}${texUnitID} * ${texCoordExpr})`;
          }
          return `${func}(${TEX_UNIT_UNIFORM_PREFIX}${texUnitID}, ${texCoordExpr}.xy)`;
        }
  
        function getTypeFromCombineOp(op) {
          switch (op) {
            case GL_SRC_COLOR:
            case GL_ONE_MINUS_SRC_COLOR:
              return "vec3";
            case GL_SRC_ALPHA:
            case GL_ONE_MINUS_SRC_ALPHA:
              return "float";
          }
  
          return abort_noSupport("Unsupported combiner op: " + ptrToString(op));
        }
  
        function getCurTexUnit() {
          return s_texUnits[s_activeTexture];
        }
  
        function genCombinerSourceExpr(texUnitID, constantExpr, previousVar,
                                       src, op)
        {
          var srcExpr = null;
          switch (src) {
            case GL_TEXTURE:
              srcExpr = genTexUnitSampleExpr(texUnitID);
              break;
            case GL_CONSTANT:
              srcExpr = constantExpr;
              break;
            case GL_PRIMARY_COLOR:
              srcExpr = PRIM_COLOR_VARYING;
              break;
            case GL_PREVIOUS:
              srcExpr = previousVar;
              break;
            default:
                return abort_noSupport("Unsupported combiner src: " + ptrToString(src));
          }
  
          var expr = null;
          switch (op) {
            case GL_SRC_COLOR:
              expr = srcExpr + ".rgb";
              break;
            case GL_ONE_MINUS_SRC_COLOR:
              expr = "(vec3(1.0) - " + srcExpr + ".rgb)";
              break;
            case GL_SRC_ALPHA:
              expr = srcExpr + ".a";
              break;
            case GL_ONE_MINUS_SRC_ALPHA:
              expr = "(1.0 - " + srcExpr + ".a)";
              break;
            default:
              return abort_noSupport("Unsupported combiner op: " + ptrToString(op));
          }
  
          return expr;
        }
  
        function valToFloatLiteral(val) {
          if (val == Math.round(val)) return val + '.0';
          return val;
        }
  
        // Classes:
        /** @constructor */
        function CTexEnv() {
          this.mode = GL_MODULATE;
          this.colorCombiner = GL_MODULATE;
          this.alphaCombiner = GL_MODULATE;
          this.colorScale = 1;
          this.alphaScale = 1;
          this.envColor = [0, 0, 0, 0];
  
          this.colorSrc = [
            GL_TEXTURE,
            GL_PREVIOUS,
            GL_CONSTANT
          ];
          this.alphaSrc = [
            GL_TEXTURE,
            GL_PREVIOUS,
            GL_CONSTANT
          ];
          this.colorOp = [
            GL_SRC_COLOR,
            GL_SRC_COLOR,
            GL_SRC_ALPHA
          ];
          this.alphaOp = [
            GL_SRC_ALPHA,
            GL_SRC_ALPHA,
            GL_SRC_ALPHA
          ];
  
          // Map GLenums to small values to efficiently pack the enums to bits for tighter access.
          this.traverseKey = {
            // mode
            0x1E01 /* GL_REPLACE */: 0,
            0x2100 /* GL_MODULATE */: 1,
            0x104 /* GL_ADD */: 2,
            0xBE2 /* GL_BLEND */: 3,
            0x2101 /* GL_DECAL */: 4,
            0x8570 /* GL_COMBINE */: 5,
  
            // additional color and alpha combiners
            0x84E7 /* GL_SUBTRACT */: 3,
            0x8575 /* GL_INTERPOLATE */: 4,
  
            // color and alpha src
            0x1702 /* GL_TEXTURE */: 0,
            0x8576 /* GL_CONSTANT */: 1,
            0x8577 /* GL_PRIMARY_COLOR */: 2,
            0x8578 /* GL_PREVIOUS */: 3,
  
            // color and alpha op
            0x300 /* GL_SRC_COLOR */: 0,
            0x301 /* GL_ONE_MINUS_SRC_COLOR */: 1,
            0x302 /* GL_SRC_ALPHA */: 2,
            0x303 /* GL_ONE_MINUS_SRC_ALPHA */: 3
          };
  
          // The tuple (key0,key1,key2) uniquely identifies the state of the variables in CTexEnv.
          // -1 on key0 denotes 'the whole cached key is dirty'
          this.key0 = -1;
          this.key1 = 0;
          this.key2 = 0;
  
          this.computeKey0 = function() {
            var k = this.traverseKey;
            var key = k[this.mode] * 1638400; // 6 distinct values.
            key += k[this.colorCombiner] * 327680; // 5 distinct values.
            key += k[this.alphaCombiner] * 65536; // 5 distinct values.
            // The above three fields have 6*5*5=150 distinct values -> 8 bits.
            key += (this.colorScale-1) * 16384; // 10 bits used.
            key += (this.alphaScale-1) * 4096; // 12 bits used.
            key += k[this.colorSrc[0]] * 1024; // 14
            key += k[this.colorSrc[1]] * 256; // 16
            key += k[this.colorSrc[2]] * 64; // 18
            key += k[this.alphaSrc[0]] * 16; // 20
            key += k[this.alphaSrc[1]] * 4; // 22
            key += k[this.alphaSrc[2]]; // 24 bits used total.
            return key;
          }
          this.computeKey1 = function() {
            var k = this.traverseKey;
            var key = k[this.colorOp[0]] * 4096;
            key += k[this.colorOp[1]] * 1024;
            key += k[this.colorOp[2]] * 256;
            key += k[this.alphaOp[0]] * 16;
            key += k[this.alphaOp[1]] * 4;
            key += k[this.alphaOp[2]];
            return key;
          }
          // TODO: remove this. The color should not be part of the key!
          this.computeKey2 = function() {
            return this.envColor[0] * 16777216 + this.envColor[1] * 65536 + this.envColor[2] * 256 + 1 + this.envColor[3];
          }
          this.recomputeKey = function() {
            this.key0 = this.computeKey0();
            this.key1 = this.computeKey1();
            this.key2 = this.computeKey2();
          }
          this.invalidateKey = function() {
            this.key0 = -1; // The key of this texture unit must be recomputed when rendering the next time.
            GLImmediate.currentRenderer = null; // The currently used renderer must be re-evaluated at next render.
          }
        }
  
        /** @constructor */
        function CTexUnit() {
          this.env = new CTexEnv();
          this.enabled_tex1D   = false;
          this.enabled_tex2D   = false;
          this.enabled_tex3D   = false;
          this.enabled_texCube = false;
          this.texTypesEnabled = 0; // A bitfield combination of the four flags above, used for fast access to operations.
  
          this.traverseState = function CTexUnit_traverseState(keyView) {
            if (this.texTypesEnabled) {
              if (this.env.key0 == -1) {
                this.env.recomputeKey();
              }
              keyView.next(this.texTypesEnabled | (this.env.key0 << 4));
              keyView.next(this.env.key1);
              keyView.next(this.env.key2);
            } else {
              // For correctness, must traverse a zero value, theoretically a subsequent integer key could collide with this value otherwise.
              keyView.next(0);
            }
          };
        };
  
        // Class impls:
        CTexUnit.prototype.enabled = function CTexUnit_enabled() {
          return this.texTypesEnabled;
        }
  
        CTexUnit.prototype.genPassLines = function CTexUnit_genPassLines(passOutputVar, passInputVar, texUnitID) {
          if (!this.enabled()) {
            return ["vec4 " + passOutputVar + " = " + passInputVar + ";"];
          }
          var lines = this.env.genPassLines(passOutputVar, passInputVar, texUnitID).join('\n');
  
          var texLoadLines = '';
          var texLoadRegex = /(texture.*?\(.*?\))/g;
          var loadCounter = 0;
          var load;
  
          // As an optimization, merge duplicate identical texture loads to one var.
          while (load = texLoadRegex.exec(lines)) {
            var texLoadExpr = load[1];
            var secondOccurrence = lines.slice(load.index+1).indexOf(texLoadExpr);
            if (secondOccurrence != -1) { // And also has a second occurrence of same load expression..
              // Create new var to store the common load.
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var texLoadVar = prefix + 'texload' + loadCounter++;
              var texLoadLine = 'vec4 ' + texLoadVar + ' = ' + texLoadExpr + ';\n';
              texLoadLines += texLoadLine + '\n'; // Store the generated texture load statements in a temp string to not confuse regex search in progress.
              lines = lines.split(texLoadExpr).join(texLoadVar);
              // Reset regex search, since we modified the string.
              texLoadRegex = /(texture.*\(.*\))/g;
            }
          }
          return [texLoadLines + lines];
        }
  
        CTexUnit.prototype.getTexType = function CTexUnit_getTexType() {
          if (this.enabled_texCube) {
            return GL_TEXTURE_CUBE_MAP;
          } else if (this.enabled_tex3D) {
            return GL_TEXTURE_3D;
          } else if (this.enabled_tex2D) {
            return GL_TEXTURE_2D;
          } else if (this.enabled_tex1D) {
            return GL_TEXTURE_1D;
          }
          return 0;
        }
  
        CTexEnv.prototype.genPassLines = function CTexEnv_genPassLines(passOutputVar, passInputVar, texUnitID) {
          switch (this.mode) {
            case GL_REPLACE: {
              /* RGB:
               * Cv = Cs
               * Av = Ap // Note how this is different, and that we'll
               *            need to track the bound texture internalFormat
               *            to get this right.
               *
               * RGBA:
               * Cv = Cs
               * Av = As
               */
              return [
                "vec4 " + passOutputVar + " = " + genTexUnitSampleExpr(texUnitID) + ";",
              ];
            }
            case GL_ADD: {
              /* RGBA:
               * Cv = Cp + Cs
               * Av = ApAs
               */
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var texVar = prefix + "tex";
              var colorVar = prefix + "color";
              var alphaVar = prefix + "alpha";
  
              return [
                "vec4 " + texVar + " = " + genTexUnitSampleExpr(texUnitID) + ";",
                "vec3 " + colorVar + " = " + passInputVar + ".rgb + " + texVar + ".rgb;",
                "float " + alphaVar + " = " + passInputVar + ".a * " + texVar + ".a;",
                "vec4 " + passOutputVar + " = vec4(" + colorVar + ", " + alphaVar + ");",
              ];
            }
            case GL_MODULATE: {
              /* RGBA:
               * Cv = CpCs
               * Av = ApAs
               */
              var line = [
                "vec4 " + passOutputVar,
                " = ",
                  passInputVar,
                  " * ",
                  genTexUnitSampleExpr(texUnitID),
                ";",
              ];
              return [line.join("")];
            }
            case GL_DECAL: {
              /* RGBA:
               * Cv = Cp(1 - As) + CsAs
               * Av = Ap
               */
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var texVar = prefix + "tex";
              var colorVar = prefix + "color";
              var alphaVar = prefix + "alpha";
  
              return [
                "vec4 " + texVar + " = " + genTexUnitSampleExpr(texUnitID) + ";",
                [
                  "vec3 " + colorVar + " = ",
                    passInputVar + ".rgb * (1.0 - " + texVar + ".a)",
                      " + ",
                    texVar + ".rgb * " + texVar + ".a",
                  ";"
                ].join(""),
                "float " + alphaVar + " = " + passInputVar + ".a;",
                "vec4 " + passOutputVar + " = vec4(" + colorVar + ", " + alphaVar + ");",
              ];
            }
            case GL_BLEND: {
              /* RGBA:
               * Cv = Cp(1 - Cs) + CcCs
               * Av = As
               */
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var texVar = prefix + "tex";
              var colorVar = prefix + "color";
              var alphaVar = prefix + "alpha";
  
              return [
                "vec4 " + texVar + " = " + genTexUnitSampleExpr(texUnitID) + ";",
                [
                  "vec3 " + colorVar + " = ",
                    passInputVar + ".rgb * (1.0 - " + texVar + ".rgb)",
                      " + ",
                    PRIM_COLOR_VARYING + ".rgb * " + texVar + ".rgb",
                  ";"
                ].join(""),
                "float " + alphaVar + " = " + texVar + ".a;",
                "vec4 " + passOutputVar + " = vec4(" + colorVar + ", " + alphaVar + ");",
              ];
            }
            case GL_COMBINE: {
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + texUnitID + "_";
              var colorVar = prefix + "color";
              var alphaVar = prefix + "alpha";
              var colorLines = this.genCombinerLines(true, colorVar,
                                                     passInputVar, texUnitID,
                                                     this.colorCombiner, this.colorSrc, this.colorOp);
              var alphaLines = this.genCombinerLines(false, alphaVar,
                                                     passInputVar, texUnitID,
                                                     this.alphaCombiner, this.alphaSrc, this.alphaOp);
  
              // Generate scale, but avoid generating an identity op that multiplies by one.
              var scaledColor = (this.colorScale == 1) ? colorVar : (colorVar + " * " + valToFloatLiteral(this.colorScale));
              var scaledAlpha = (this.alphaScale == 1) ? alphaVar : (alphaVar + " * " + valToFloatLiteral(this.alphaScale));
  
              var line = [
                "vec4 " + passOutputVar,
                " = ",
                  "vec4(",
                      scaledColor,
                      ", ",
                      scaledAlpha,
                  ")",
                ";",
              ].join("");
              return [].concat(colorLines, alphaLines, [line]);
            }
          }
  
          return abort_noSupport("Unsupported TexEnv mode: " + ptrToString(this.mode));
        }
  
        CTexEnv.prototype.genCombinerLines = function CTexEnv_getCombinerLines(isColor, outputVar,
                                                                               passInputVar, texUnitID,
                                                                               combiner, srcArr, opArr)
        {
          var argsNeeded = null;
          switch (combiner) {
            case GL_REPLACE:
              argsNeeded = 1;
              break;
  
            case GL_MODULATE:
            case GL_ADD:
            case GL_SUBTRACT:
              argsNeeded = 2;
              break;
  
            case GL_INTERPOLATE:
              argsNeeded = 3;
              break;
  
            default:
              return abort_noSupport("Unsupported combiner: " + ptrToString(combiner));
          }
  
          var constantExpr = [
            "vec4(",
              valToFloatLiteral(this.envColor[0]),
              ", ",
              valToFloatLiteral(this.envColor[1]),
              ", ",
              valToFloatLiteral(this.envColor[2]),
              ", ",
              valToFloatLiteral(this.envColor[3]),
            ")",
          ].join("");
          var src0Expr = (argsNeeded >= 1) ? genCombinerSourceExpr(texUnitID, constantExpr, passInputVar, srcArr[0], opArr[0])
                                           : null;
          var src1Expr = (argsNeeded >= 2) ? genCombinerSourceExpr(texUnitID, constantExpr, passInputVar, srcArr[1], opArr[1])
                                           : null;
          var src2Expr = (argsNeeded >= 3) ? genCombinerSourceExpr(texUnitID, constantExpr, passInputVar, srcArr[2], opArr[2])
                                           : null;
  
          var outputType = isColor ? "vec3" : "float";
          var lines = null;
          switch (combiner) {
            case GL_REPLACE: {
              lines = [`${outputType} ${outputVar} = ${src0Expr};`]
              break;
            }
            case GL_MODULATE: {
              lines = [`${outputType} ${outputVar} = ${src0Expr} * ${src1Expr};`];
              break;
            }
            case GL_ADD: {
              lines = [`${outputType} ${outputVar} = ${src0Expr} + ${src1Expr};`]
              break;
            }
            case GL_SUBTRACT: {
              lines = [`${outputType} ${outputVar} = ${src0Expr} - ${src1Expr};`]
              break;
            }
            case GL_INTERPOLATE: {
              var prefix = `${TEXENVJIT_NAMESPACE_PREFIX}env${texUnitID}_`;
              var arg2Var = `${prefix}colorSrc2`;
              var arg2Type = getTypeFromCombineOp(this.colorOp[2]);
  
              lines = [
                `${arg2Type} ${arg2Var} = ${src2Expr};`,
                `${outputType} ${outputVar} = ${src0Expr} * ${arg2Var} + ${src1Expr} * (1.0 - ${arg2Var});`,
              ];
              break;
            }
  
            default:
              return abort_sanity("Unmatched TexEnv.colorCombiner?");
          }
  
          return lines;
        }
  
        return {
          // Exports:
          init: (gl, specifiedMaxTextureImageUnits) => {
            var maxTexUnits = 0;
            if (specifiedMaxTextureImageUnits) {
              maxTexUnits = specifiedMaxTextureImageUnits;
            } else if (gl) {
              maxTexUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
            }
            assert(maxTexUnits > 0);
            s_texUnits = [];
            for (var i = 0; i < maxTexUnits; i++) {
              s_texUnits.push(new CTexUnit());
            }
          },
  
          setGLSLVars: (uTexUnitPrefix, vTexCoordPrefix, vPrimColor, uTexMatrixPrefix) => {
            TEX_UNIT_UNIFORM_PREFIX   = uTexUnitPrefix;
            TEX_COORD_VARYING_PREFIX  = vTexCoordPrefix;
            PRIM_COLOR_VARYING        = vPrimColor;
            TEX_MATRIX_UNIFORM_PREFIX = uTexMatrixPrefix;
          },
  
          genAllPassLines: (resultDest, indentSize = 0) => {
            s_requiredTexUnitsForPass.length = 0; // Clear the list.
            var lines = [];
            var lastPassVar = PRIM_COLOR_VARYING;
            for (var i = 0; i < s_texUnits.length; i++) {
              if (!s_texUnits[i].enabled()) continue;
  
              s_requiredTexUnitsForPass.push(i);
  
              var prefix = TEXENVJIT_NAMESPACE_PREFIX + 'env' + i + "_";
              var passOutputVar = prefix + "result";
  
              var newLines = s_texUnits[i].genPassLines(passOutputVar, lastPassVar, i);
              lines = lines.concat(newLines, [""]);
  
              lastPassVar = passOutputVar;
            }
            lines.push(resultDest + " = " + lastPassVar + ";");
  
            var indent = "";
            for (var i = 0; i < indentSize; i++) indent += " ";
  
            var output = indent + lines.join("\n" + indent);
  
            return output;
          },
  
          getUsedTexUnitList: () => s_requiredTexUnitsForPass,
  
          getActiveTexture: () => s_activeTexture,
  
          traverseState: (keyView) => {
            for (var texUnit of s_texUnits) {
              texUnit.traverseState(keyView);
            }
          },
  
          getTexUnitType: (texUnitID) => {
            assert(texUnitID >= 0 &&
                   texUnitID < s_texUnits.length);
            return s_texUnits[texUnitID].getTexType();
          },
  
          // Hooks:
          hook_activeTexture: (texture) => {
            s_activeTexture = texture - GL_TEXTURE0;
            // Check if the current matrix mode is GL_TEXTURE.
            if (GLImmediate.currentMatrix >= 2) {
              // Switch to the corresponding texture matrix stack.
              GLImmediate.currentMatrix = 2 + s_activeTexture;
            }
          },
  
          hook_enable: (cap) => {
            var cur = getCurTexUnit();
            switch (cap) {
              case GL_TEXTURE_1D:
                if (!cur.enabled_tex1D) {
                  GLImmediate.currentRenderer = null; // Renderer state changed, and must be recreated or looked up again.
                  cur.enabled_tex1D = true;
                  cur.texTypesEnabled |= 1;
                }
                break;
              case GL_TEXTURE_2D:
                if (!cur.enabled_tex2D) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_tex2D = true;
                  cur.texTypesEnabled |= 2;
                }
                break;
              case GL_TEXTURE_3D:
                if (!cur.enabled_tex3D) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_tex3D = true;
                  cur.texTypesEnabled |= 4;
                }
                break;
              case GL_TEXTURE_CUBE_MAP:
                if (!cur.enabled_texCube) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_texCube = true;
                  cur.texTypesEnabled |= 8;
                }
                break;
            }
          },
  
          hook_disable: (cap) => {
            var cur = getCurTexUnit();
            switch (cap) {
              case GL_TEXTURE_1D:
                if (cur.enabled_tex1D) {
                  GLImmediate.currentRenderer = null; // Renderer state changed, and must be recreated or looked up again.
                  cur.enabled_tex1D = false;
                  cur.texTypesEnabled &= ~1;
                }
                break;
              case GL_TEXTURE_2D:
                if (cur.enabled_tex2D) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_tex2D = false;
                  cur.texTypesEnabled &= ~2;
                }
                break;
              case GL_TEXTURE_3D:
                if (cur.enabled_tex3D) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_tex3D = false;
                  cur.texTypesEnabled &= ~4;
                }
                break;
              case GL_TEXTURE_CUBE_MAP:
                if (cur.enabled_texCube) {
                  GLImmediate.currentRenderer = null;
                  cur.enabled_texCube = false;
                  cur.texTypesEnabled &= ~8;
                }
                break;
            }
          },
  
          hook_texEnvf(target, pname, param) {
            if (target != GL_TEXTURE_ENV)
              return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_RGB_SCALE:
                if (env.colorScale != param) {
                  env.invalidateKey(); // We changed FFP emulation renderer state.
                  env.colorScale = param;
                }
                break;
              case GL_ALPHA_SCALE:
                if (env.alphaScale != param) {
                  env.invalidateKey();
                  env.alphaScale = param;
                }
                break;
              case GL_TEXTURE_ENV_MODE:
                if (env.mode != param) {
                  env.invalidateKey();
                  env.mode = param;
                }
                break;
  
              default:
                err('WARNING: Unhandled `pname` in call to `glTexEnvf`.');
            }
          },
  
          hook_texEnvi(target, pname, param) {
            if (target != GL_TEXTURE_ENV)
              return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_TEXTURE_ENV_MODE:
                if (env.mode != param) {
                  env.invalidateKey(); // We changed FFP emulation renderer state.
                  env.mode = param;
                }
                break;
  
              case GL_COMBINE_RGB:
                if (env.colorCombiner != param) {
                  env.invalidateKey();
                  env.colorCombiner = param;
                }
                break;
              case GL_COMBINE_ALPHA:
                if (env.alphaCombiner != param) {
                  env.invalidateKey();
                  env.alphaCombiner = param;
                }
                break;
  
              case GL_SRC0_RGB:
                if (env.colorSrc[0] != param) {
                  env.invalidateKey();
                  env.colorSrc[0] = param;
                }
                break;
              case GL_SRC1_RGB:
                if (env.colorSrc[1] != param) {
                  env.invalidateKey();
                  env.colorSrc[1] = param;
                }
                break;
              case GL_SRC2_RGB:
                if (env.colorSrc[2] != param) {
                  env.invalidateKey();
                  env.colorSrc[2] = param;
                }
                break;
  
              case GL_SRC0_ALPHA:
                if (env.alphaSrc[0] != param) {
                  env.invalidateKey();
                  env.alphaSrc[0] = param;
                }
                break;
              case GL_SRC1_ALPHA:
                if (env.alphaSrc[1] != param) {
                  env.invalidateKey();
                  env.alphaSrc[1] = param;
                }
                break;
              case GL_SRC2_ALPHA:
                if (env.alphaSrc[2] != param) {
                  env.invalidateKey();
                  env.alphaSrc[2] = param;
                }
                break;
  
              case GL_OPERAND0_RGB:
                if (env.colorOp[0] != param) {
                  env.invalidateKey();
                  env.colorOp[0] = param;
                }
                break;
              case GL_OPERAND1_RGB:
                if (env.colorOp[1] != param) {
                  env.invalidateKey();
                  env.colorOp[1] = param;
                }
                break;
              case GL_OPERAND2_RGB:
                if (env.colorOp[2] != param) {
                  env.invalidateKey();
                  env.colorOp[2] = param;
                }
                break;
  
              case GL_OPERAND0_ALPHA:
                if (env.alphaOp[0] != param) {
                  env.invalidateKey();
                  env.alphaOp[0] = param;
                }
                break;
              case GL_OPERAND1_ALPHA:
                if (env.alphaOp[1] != param) {
                  env.invalidateKey();
                  env.alphaOp[1] = param;
                }
                break;
              case GL_OPERAND2_ALPHA:
                if (env.alphaOp[2] != param) {
                  env.invalidateKey();
                  env.alphaOp[2] = param;
                }
                break;
  
              case GL_RGB_SCALE:
                if (env.colorScale != param) {
                  env.invalidateKey();
                  env.colorScale = param;
                }
                break;
              case GL_ALPHA_SCALE:
                if (env.alphaScale != param) {
                  env.invalidateKey();
                  env.alphaScale = param;
                }
                break;
  
              default:
                err('WARNING: Unhandled `pname` in call to `glTexEnvi`.');
            }
          },
  
          hook_texEnvfv(target, pname, params) {
            if (target != GL_TEXTURE_ENV) return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_TEXTURE_ENV_COLOR: {
                for (var i = 0; i < 4; i++) {
                  var param = HEAPF32[(((params)+(i*4))>>2)];
                  if (env.envColor[i] != param) {
                    env.invalidateKey(); // We changed FFP emulation renderer state.
                    env.envColor[i] = param;
                  }
                }
                break
              }
              default:
                err('WARNING: Unhandled `pname` in call to `glTexEnvfv`.');
            }
          },
  
          hook_getTexEnviv(target, pname, param) {
            if (target != GL_TEXTURE_ENV)
              return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_TEXTURE_ENV_MODE:
                HEAP32[((param)>>2)] = env.mode;
                return;
  
              case GL_TEXTURE_ENV_COLOR:
                HEAP32[((param)>>2)] = Math.max(Math.min(env.envColor[0]*255, 255, -255));
                HEAP32[(((param)+(1))>>2)] = Math.max(Math.min(env.envColor[1]*255, 255, -255));
                HEAP32[(((param)+(2))>>2)] = Math.max(Math.min(env.envColor[2]*255, 255, -255));
                HEAP32[(((param)+(3))>>2)] = Math.max(Math.min(env.envColor[3]*255, 255, -255));
                return;
  
              case GL_COMBINE_RGB:
                HEAP32[((param)>>2)] = env.colorCombiner;
                return;
  
              case GL_COMBINE_ALPHA:
                HEAP32[((param)>>2)] = env.alphaCombiner;
                return;
  
              case GL_SRC0_RGB:
                HEAP32[((param)>>2)] = env.colorSrc[0];
                return;
  
              case GL_SRC1_RGB:
                HEAP32[((param)>>2)] = env.colorSrc[1];
                return;
  
              case GL_SRC2_RGB:
                HEAP32[((param)>>2)] = env.colorSrc[2];
                return;
  
              case GL_SRC0_ALPHA:
                HEAP32[((param)>>2)] = env.alphaSrc[0];
                return;
  
              case GL_SRC1_ALPHA:
                HEAP32[((param)>>2)] = env.alphaSrc[1];
                return;
  
              case GL_SRC2_ALPHA:
                HEAP32[((param)>>2)] = env.alphaSrc[2];
                return;
  
              case GL_OPERAND0_RGB:
                HEAP32[((param)>>2)] = env.colorOp[0];
                return;
  
              case GL_OPERAND1_RGB:
                HEAP32[((param)>>2)] = env.colorOp[1];
                return;
  
              case GL_OPERAND2_RGB:
                HEAP32[((param)>>2)] = env.colorOp[2];
                return;
  
              case GL_OPERAND0_ALPHA:
                HEAP32[((param)>>2)] = env.alphaOp[0];
                return;
  
              case GL_OPERAND1_ALPHA:
                HEAP32[((param)>>2)] = env.alphaOp[1];
                return;
  
              case GL_OPERAND2_ALPHA:
                HEAP32[((param)>>2)] = env.alphaOp[2];
                return;
  
              case GL_RGB_SCALE:
                HEAP32[((param)>>2)] = env.colorScale;
                return;
  
              case GL_ALPHA_SCALE:
                HEAP32[((param)>>2)] = env.alphaScale;
                return;
  
              default:
                err('WARNING: Unhandled `pname` in call to `glGetTexEnvi`.');
            }
          },
  
          hook_getTexEnvfv: (target, pname, param) => {
            if (target != GL_TEXTURE_ENV)
              return;
  
            var env = getCurTexUnit().env;
            switch (pname) {
              case GL_TEXTURE_ENV_COLOR:
                HEAPF32[((param)>>2)] = env.envColor[0];
                HEAPF32[(((param)+(4))>>2)] = env.envColor[1];
                HEAPF32[(((param)+(8))>>2)] = env.envColor[2];
                HEAPF32[(((param)+(12))>>2)] = env.envColor[3];
                return;
            }
          }
        };
      },
  vertexData:null,
  vertexDataU8:null,
  tempData:null,
  indexData:null,
  vertexCounter:0,
  mode:-1,
  rendererCache:null,
  rendererComponents:[],
  rendererComponentPointer:0,
  lastRenderer:null,
  lastArrayBuffer:null,
  lastProgram:null,
  lastStride:-1,
  matrix:[],
  matrixStack:[],
  currentMatrix:0,
  tempMatrix:null,
  matricesModified:false,
  useTextureMatrix:false,
  VERTEX:0,
  NORMAL:1,
  COLOR:2,
  TEXTURE0:3,
  NUM_ATTRIBUTES:-1,
  MAX_TEXTURES:-1,
  totalEnabledClientAttributes:0,
  enabledClientAttributes:[0,0],
  clientAttributes:[],
  liveClientAttributes:[],
  currentRenderer:null,
  modifiedClientAttributes:false,
  clientActiveTexture:0,
  clientColor:null,
  usedTexUnitList:[],
  fixedFunctionProgram:null,
  setClientAttribute(name, size, type, stride, pointer) {
        var attrib = GLImmediate.clientAttributes[name];
        if (!attrib) {
          for (var i = 0; i <= name; i++) { // keep flat
            GLImmediate.clientAttributes[i] ||= {
              name,
              size,
              type,
              stride,
              pointer,
              offset: 0
            };
          }
        } else {
          attrib.name = name;
          attrib.size = size;
          attrib.type = type;
          attrib.stride = stride;
          attrib.pointer = pointer;
          attrib.offset = 0;
        }
        GLImmediate.modifiedClientAttributes = true;
      },
  addRendererComponent(name, size, type) {
        if (!GLImmediate.rendererComponents[name]) {
          GLImmediate.rendererComponents[name] = 1;
          if (GLImmediate.enabledClientAttributes[name]) {
            warnOnce("Warning: glTexCoord used after EnableClientState for TEXTURE_COORD_ARRAY for TEXTURE0. Disabling TEXTURE_COORD_ARRAY...");
          }
          GLImmediate.enabledClientAttributes[name] = true;
          GLImmediate.setClientAttribute(name, size, type, 0, GLImmediate.rendererComponentPointer);
          GLImmediate.rendererComponentPointer += size * GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
          // We can enable the correct attribute stream index immediately here, since the same attribute in each shader
          // will be bound to this same index.
          GL.enableVertexAttribArray(name);
        } else {
          GLImmediate.rendererComponents[name]++;
        }
      },
  disableBeginEndClientAttributes() {
        for (var i = 0; i < GLImmediate.NUM_ATTRIBUTES; i++) {
          if (GLImmediate.rendererComponents[i]) GLImmediate.enabledClientAttributes[i] = false;
        }
      },
  getRenderer() {
        // If no FFP state has changed that would have forced to re-evaluate which FFP emulation shader to use,
        // we have the currently used renderer in cache, and can immediately return that.
        if (GLImmediate.currentRenderer) {
          return GLImmediate.currentRenderer;
        }
        // return a renderer object given the liveClientAttributes
        // we maintain a cache of renderers, optimized to not generate garbage
        var attributes = GLImmediate.liveClientAttributes;
        var cacheMap = GLImmediate.rendererCache;
        var keyView = cacheMap.getStaticKeyView().reset();
  
        // By attrib state:
        var enabledAttributesKey = 0;
        for (var attr of attributes) {
          enabledAttributesKey |= 1 << attr.name;
        }
  
        // To prevent using more than 31 bits add another level to the maptree
        // and reset the enabledAttributesKey for the next glemulation state bits
        keyView.next(enabledAttributesKey);
        enabledAttributesKey = 0;
  
        // By fog state:
        var fogParam = 0;
        if (GLEmulation.fogEnabled) {
          switch (GLEmulation.fogMode) {
            case 0x801: // GL_EXP2
              fogParam = 1;
              break;
            case 0x2601: // GL_LINEAR
              fogParam = 2;
              break;
            default: // default to GL_EXP
              fogParam = 3;
              break;
          }
        }
        enabledAttributesKey = (enabledAttributesKey << 2) | fogParam;
  
        // By clip plane mode
        for (var clipPlaneId = 0; clipPlaneId < GLEmulation.MAX_CLIP_PLANES; clipPlaneId++) {
          enabledAttributesKey = (enabledAttributesKey << 1) | GLEmulation.clipPlaneEnabled[clipPlaneId];
        }
  
        // By lighting mode and enabled lights
        enabledAttributesKey = (enabledAttributesKey << 1) | GLEmulation.lightingEnabled;
        for (var lightId = 0; lightId < GLEmulation.MAX_LIGHTS; lightId++) {
          enabledAttributesKey = (enabledAttributesKey << 1) | (GLEmulation.lightingEnabled ? GLEmulation.lightEnabled[lightId] : 0);
        }
  
        // By alpha testing mode
        enabledAttributesKey = (enabledAttributesKey << 3) | (GLEmulation.alphaTestEnabled ? (GLEmulation.alphaTestFunc - 0x200) : 0x7);
  
        // By drawing mode:
        enabledAttributesKey = (enabledAttributesKey << 1) | (GLImmediate.mode == GLctx.POINTS ? 1 : 0);
  
        keyView.next(enabledAttributesKey);
  
          GLImmediate.TexEnvJIT.traverseState(keyView);
  
        // If we don't already have it, create it.
        var renderer = keyView.get();
        if (!renderer) {
          renderer = GLImmediate.createRenderer();
          GLImmediate.currentRenderer = renderer;
          keyView.set(renderer);
          return renderer;
        }
        GLImmediate.currentRenderer = renderer; // Cache the currently used renderer, so later lookups without state changes can get this fast.
        return renderer;
      },
  createRenderer(renderer) {
        var useCurrProgram = !!GL.currProgram;
        var hasTextures = false;
        for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
          var texAttribName = GLImmediate.TEXTURE0 + i;
          if (!GLImmediate.enabledClientAttributes[texAttribName])
            continue;
  
          if (!useCurrProgram) {
            if (GLImmediate.TexEnvJIT.getTexUnitType(i) == 0) {
               warnOnce("GL_TEXTURE" + i + " coords are supplied, but that texture unit is disabled in the fixed-function pipeline.");
            }
          }
  
          hasTextures = true;
        }
  
        /** @constructor */
        function Renderer() {
          this.init = function() {
            // For fixed-function shader generation.
            var uTexUnitPrefix = 'u_texUnit';
            var aTexCoordPrefix = 'a_texCoord';
            var vTexCoordPrefix = 'v_texCoord';
            var vPrimColor = 'v_color';
            var uTexMatrixPrefix = GLImmediate.useTextureMatrix ? 'u_textureMatrix' : null;
  
            if (useCurrProgram) {
              if (GL.shaderInfos[GL.programShaders[GL.currProgram][0]].type == GLctx.VERTEX_SHADER) {
                this.vertexShader = GL.shaders[GL.programShaders[GL.currProgram][0]];
                this.fragmentShader = GL.shaders[GL.programShaders[GL.currProgram][1]];
              } else {
                this.vertexShader = GL.shaders[GL.programShaders[GL.currProgram][1]];
                this.fragmentShader = GL.shaders[GL.programShaders[GL.currProgram][0]];
              }
              this.program = GL.programs[GL.currProgram];
              this.usedTexUnitList = [];
            } else {
              // IMPORTANT NOTE: If you parameterize the shader source based on any runtime values
              // in order to create the least expensive shader possible based on the features being
              // used, you should also update the code in the beginning of getRenderer to make sure
              // that you cache the renderer based on the said parameters.
              if (GLEmulation.fogEnabled) {
                switch (GLEmulation.fogMode) {
                  case 0x801: // GL_EXP2
                    // fog = exp(-(gl_Fog.density * gl_FogFragCoord)^2)
                    var fogFormula = '  float fog = exp(-u_fogDensity * u_fogDensity * ecDistance * ecDistance); \n';
                    break;
                  case 0x2601: // GL_LINEAR
                    // fog = (gl_Fog.end - gl_FogFragCoord) * gl_fog.scale
                    var fogFormula = '  float fog = (u_fogEnd - ecDistance) * u_fogScale; \n';
                    break;
                  default: // default to GL_EXP
                    // fog = exp(-gl_Fog.density * gl_FogFragCoord)
                    var fogFormula = '  float fog = exp(-u_fogDensity * ecDistance); \n';
                    break;
                }
              }
  
              GLImmediate.TexEnvJIT.setGLSLVars(uTexUnitPrefix, vTexCoordPrefix, vPrimColor, uTexMatrixPrefix);
              var fsTexEnvPass = GLImmediate.TexEnvJIT.genAllPassLines('gl_FragColor', 2);
  
              var texUnitAttribList = '';
              var texUnitVaryingList = '';
              var texUnitUniformList = '';
              var vsTexCoordInits = '';
              this.usedTexUnitList = GLImmediate.TexEnvJIT.getUsedTexUnitList();
              for (var texUnit of this.usedTexUnitList) {
                texUnitAttribList += 'attribute vec4 ' + aTexCoordPrefix + texUnit + ';\n';
                texUnitVaryingList += 'varying vec4 ' + vTexCoordPrefix + texUnit + ';\n';
                texUnitUniformList += 'uniform sampler2D ' + uTexUnitPrefix + texUnit + ';\n';
                vsTexCoordInits += '  ' + vTexCoordPrefix + texUnit + ' = ' + aTexCoordPrefix + texUnit + ';\n';
  
                if (GLImmediate.useTextureMatrix) {
                  texUnitUniformList += 'uniform mat4 ' + uTexMatrixPrefix + texUnit + ';\n';
                }
              }
  
              var vsFogVaryingInit = null;
              if (GLEmulation.fogEnabled) {
                vsFogVaryingInit = '  v_fogFragCoord = abs(ecPosition.z);\n';
              }
  
              var vsPointSizeDefs = null;
              var vsPointSizeInit = null;
              if (GLImmediate.mode == GLctx.POINTS) {
                vsPointSizeDefs = 'uniform float u_pointSize;\n';
                vsPointSizeInit = '  gl_PointSize = u_pointSize;\n';
              }
  
              var vsClipPlaneDefs = '';
              var vsClipPlaneInit = '';
              var fsClipPlaneDefs = '';
              var fsClipPlanePass = '';
              for (var clipPlaneId = 0; clipPlaneId < GLEmulation.MAX_CLIP_PLANES; clipPlaneId++) {
                if (GLEmulation.clipPlaneEnabled[clipPlaneId]) {
                  vsClipPlaneDefs += 'uniform vec4 u_clipPlaneEquation' + clipPlaneId + ';';
                  vsClipPlaneDefs += 'varying float v_clipDistance' + clipPlaneId + ';';
                  vsClipPlaneInit += '  v_clipDistance' + clipPlaneId + ' = dot(ecPosition, u_clipPlaneEquation' + clipPlaneId + ');';
                  fsClipPlaneDefs += 'varying float v_clipDistance' + clipPlaneId + ';';
                  fsClipPlanePass += '  if (v_clipDistance' + clipPlaneId + ' < 0.0) discard;';
                }
              }
  
              var vsLightingDefs = '';
              var vsLightingPass = '';
              if (GLEmulation.lightingEnabled) {
                vsLightingDefs += 'attribute vec3 a_normal;';
                vsLightingDefs += 'uniform mat3 u_normalMatrix;';
                vsLightingDefs += 'uniform vec4 u_lightModelAmbient;';
                vsLightingDefs += 'uniform vec4 u_materialAmbient;';
                vsLightingDefs += 'uniform vec4 u_materialDiffuse;';
                vsLightingDefs += 'uniform vec4 u_materialSpecular;';
                vsLightingDefs += 'uniform float u_materialShininess;';
                vsLightingDefs += 'uniform vec4 u_materialEmission;';
  
                vsLightingPass += '  vec3 ecNormal = normalize(u_normalMatrix * a_normal);';
                vsLightingPass += '  v_color.w = u_materialDiffuse.w;';
                vsLightingPass += '  v_color.xyz = u_materialEmission.xyz;';
                vsLightingPass += '  v_color.xyz += u_lightModelAmbient.xyz * u_materialAmbient.xyz;';
  
                for (var lightId = 0; lightId < GLEmulation.MAX_LIGHTS; lightId++) {
                  if (GLEmulation.lightEnabled[lightId]) {
                    vsLightingDefs += 'uniform vec4 u_lightAmbient' + lightId + ';';
                    vsLightingDefs += 'uniform vec4 u_lightDiffuse' + lightId + ';';
                    vsLightingDefs += 'uniform vec4 u_lightSpecular' + lightId + ';';
                    vsLightingDefs += 'uniform vec4 u_lightPosition' + lightId + ';';
  
                    vsLightingPass += '  {';
                    vsLightingPass += '    vec3 lightDirection = normalize(u_lightPosition' + lightId + ').xyz;';
                    vsLightingPass += '    vec3 halfVector = normalize(lightDirection + vec3(0,0,1));';
                    vsLightingPass += '    vec3 ambient = u_lightAmbient' + lightId + '.xyz * u_materialAmbient.xyz;';
                    vsLightingPass += '    float diffuseI = max(dot(ecNormal, lightDirection), 0.0);';
                    vsLightingPass += '    float specularI = max(dot(ecNormal, halfVector), 0.0);';
                    vsLightingPass += '    vec3 diffuse = diffuseI * u_lightDiffuse' + lightId + '.xyz * u_materialDiffuse.xyz;';
                    vsLightingPass += '    specularI = (diffuseI > 0.0 && specularI > 0.0) ? exp(u_materialShininess * log(specularI)) : 0.0;';
                    vsLightingPass += '    vec3 specular = specularI * u_lightSpecular' + lightId + '.xyz * u_materialSpecular.xyz;';
                    vsLightingPass += '    v_color.xyz += ambient + diffuse + specular;';
                    vsLightingPass += '  }';
                  }
                }
                vsLightingPass += '  v_color = clamp(v_color, 0.0, 1.0);';
              }
  
              var vsSource = [
                'attribute vec4 a_position;',
                'attribute vec4 a_color;',
                'varying vec4 v_color;',
                texUnitAttribList,
                texUnitVaryingList,
                (GLEmulation.fogEnabled ? 'varying float v_fogFragCoord;' : null),
                'uniform mat4 u_modelView;',
                'uniform mat4 u_projection;',
                vsPointSizeDefs,
                vsClipPlaneDefs,
                vsLightingDefs,
                'void main()',
                '{',
                '  vec4 ecPosition = u_modelView * a_position;', // eye-coordinate position
                '  gl_Position = u_projection * ecPosition;',
                '  v_color = a_color;',
                vsTexCoordInits,
                vsFogVaryingInit,
                vsPointSizeInit,
                vsClipPlaneInit,
                vsLightingPass,
                '}',
                ''
              ].join('\n').replace(/\n\n+/g, '\n');
  
              this.vertexShader = GLctx.createShader(GLctx.VERTEX_SHADER);
              GLctx.shaderSource(this.vertexShader, vsSource);
              GLctx.compileShader(this.vertexShader);
  
              var fogHeaderIfNeeded = null;
              if (GLEmulation.fogEnabled) {
                fogHeaderIfNeeded = [
                  '',
                  'varying float v_fogFragCoord; ',
                  'uniform vec4 u_fogColor;      ',
                  'uniform float u_fogEnd;       ',
                  'uniform float u_fogScale;     ',
                  'uniform float u_fogDensity;   ',
                  'float ffog(in float ecDistance) { ',
                  fogFormula,
                  '  fog = clamp(fog, 0.0, 1.0); ',
                  '  return fog;                 ',
                  '}',
                  '',
                ].join("\n");
              }
  
              var fogPass = null;
              if (GLEmulation.fogEnabled) {
                fogPass = 'gl_FragColor = vec4(mix(u_fogColor.rgb, gl_FragColor.rgb, ffog(v_fogFragCoord)), gl_FragColor.a);\n';
              }
  
              var fsAlphaTestDefs = '';
              var fsAlphaTestPass = '';
              if (GLEmulation.alphaTestEnabled) {
                fsAlphaTestDefs = 'uniform float u_alphaTestRef;';
                switch (GLEmulation.alphaTestFunc) {
                  case 0x200: // GL_NEVER
                    fsAlphaTestPass = 'discard;';
                    break;
                  case 0x201: // GL_LESS
                    fsAlphaTestPass = 'if (!(gl_FragColor.a < u_alphaTestRef)) { discard; }';
                    break;
                  case 0x202: // GL_EQUAL
                    fsAlphaTestPass = 'if (!(gl_FragColor.a == u_alphaTestRef)) { discard; }';
                    break;
                  case 0x203: // GL_LEQUAL
                    fsAlphaTestPass = 'if (!(gl_FragColor.a <= u_alphaTestRef)) { discard; }';
                    break;
                  case 0x204: // GL_GREATER
                    fsAlphaTestPass = 'if (!(gl_FragColor.a > u_alphaTestRef)) { discard; }';
                    break;
                  case 0x205: // GL_NOTEQUAL
                    fsAlphaTestPass = 'if (!(gl_FragColor.a != u_alphaTestRef)) { discard; }';
                    break;
                  case 0x206: // GL_GEQUAL
                    fsAlphaTestPass = 'if (!(gl_FragColor.a >= u_alphaTestRef)) { discard; }';
                    break;
                  case 0x207: // GL_ALWAYS
                    fsAlphaTestPass = '';
                    break;
                }
              }
  
              var fsSource = [
                'precision mediump float;',
                texUnitVaryingList,
                texUnitUniformList,
                'varying vec4 v_color;',
                fogHeaderIfNeeded,
                fsClipPlaneDefs,
                fsAlphaTestDefs,
                'void main()',
                '{',
                fsClipPlanePass,
                fsTexEnvPass,
                fogPass,
                fsAlphaTestPass,
                '}',
                ''
              ].join("\n").replace(/\n\n+/g, '\n');
  
              this.fragmentShader = GLctx.createShader(GLctx.FRAGMENT_SHADER);
              GLctx.shaderSource(this.fragmentShader, fsSource);
              GLctx.compileShader(this.fragmentShader);
  
              this.program = GLctx.createProgram();
              GLctx.attachShader(this.program, this.vertexShader);
              GLctx.attachShader(this.program, this.fragmentShader);
  
              // As optimization, bind all attributes to prespecified locations, so that the FFP emulation
              // code can submit attributes to any generated FFP shader without having to examine each shader in turn.
              // These prespecified locations are only assumed if GL_FFP_ONLY is specified, since user could also create their
              // own shaders that didn't have attributes in the same locations.
              GLctx.bindAttribLocation(this.program, GLImmediate.VERTEX, 'a_position');
              GLctx.bindAttribLocation(this.program, GLImmediate.COLOR, 'a_color');
              GLctx.bindAttribLocation(this.program, GLImmediate.NORMAL, 'a_normal');
              var maxVertexAttribs = GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);
              for (var i = 0; i < GLImmediate.MAX_TEXTURES && GLImmediate.TEXTURE0 + i < maxVertexAttribs; i++) {
                GLctx.bindAttribLocation(this.program, GLImmediate.TEXTURE0 + i, 'a_texCoord'+i);
                GLctx.bindAttribLocation(this.program, GLImmediate.TEXTURE0 + i, aTexCoordPrefix+i);
              }
              GLctx.linkProgram(this.program);
            }
  
            // Stores an array that remembers which matrix uniforms are up-to-date in this FFP renderer, so they don't need to be resubmitted
            // each time we render with this program.
            this.textureMatrixVersion = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
  
            this.positionLocation = GLctx.getAttribLocation(this.program, 'a_position');
  
            this.texCoordLocations = [];
  
            for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
              if (!GLImmediate.enabledClientAttributes[GLImmediate.TEXTURE0 + i]) {
                this.texCoordLocations[i] = -1;
                continue;
              }
  
              if (useCurrProgram) {
                this.texCoordLocations[i] = GLctx.getAttribLocation(this.program, `a_texCoord${i}`);
              } else {
                this.texCoordLocations[i] = GLctx.getAttribLocation(this.program, aTexCoordPrefix + i);
              }
            }
            this.colorLocation = GLctx.getAttribLocation(this.program, 'a_color');
            if (!useCurrProgram) {
              // Temporarily switch to the program so we can set our sampler uniforms early.
              var prevBoundProg = GLctx.getParameter(GLctx.CURRENT_PROGRAM);
              GLctx.useProgram(this.program);
              {
                for (var i = 0; i < this.usedTexUnitList.length; i++) {
                  var texUnitID = this.usedTexUnitList[i];
                  var texSamplerLoc = GLctx.getUniformLocation(this.program, uTexUnitPrefix + texUnitID);
                  GLctx.uniform1i(texSamplerLoc, texUnitID);
                }
              }
              // The default color attribute value is not the same as the default for all other attribute streams (0,0,0,1) but (1,1,1,1),
              // so explicitly set it right at start.
              GLctx.vertexAttrib4fv(this.colorLocation, [1,1,1,1]);
              GLctx.useProgram(prevBoundProg);
            }
  
            this.textureMatrixLocations = [];
            for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
              this.textureMatrixLocations[i] = GLctx.getUniformLocation(this.program, `u_textureMatrix${i}`);
            }
            this.normalLocation = GLctx.getAttribLocation(this.program, 'a_normal');
  
            this.modelViewLocation = GLctx.getUniformLocation(this.program, 'u_modelView');
            this.projectionLocation = GLctx.getUniformLocation(this.program, 'u_projection');
            this.normalMatrixLocation = GLctx.getUniformLocation(this.program, 'u_normalMatrix');
  
            this.hasTextures = hasTextures;
            this.hasNormal = GLImmediate.enabledClientAttributes[GLImmediate.NORMAL] &&
                             GLImmediate.clientAttributes[GLImmediate.NORMAL].size > 0 &&
                             this.normalLocation >= 0;
            this.hasColor = (this.colorLocation === 0) || this.colorLocation > 0;
  
            this.floatType = GLctx.FLOAT; // minor optimization
  
            this.fogColorLocation = GLctx.getUniformLocation(this.program, 'u_fogColor');
            this.fogEndLocation = GLctx.getUniformLocation(this.program, 'u_fogEnd');
            this.fogScaleLocation = GLctx.getUniformLocation(this.program, 'u_fogScale');
            this.fogDensityLocation = GLctx.getUniformLocation(this.program, 'u_fogDensity');
            this.hasFog = !!(this.fogColorLocation || this.fogEndLocation ||
                             this.fogScaleLocation || this.fogDensityLocation);
  
            this.pointSizeLocation = GLctx.getUniformLocation(this.program, 'u_pointSize');
  
            this.hasClipPlane = false;
            this.clipPlaneEquationLocation = [];
            for (var clipPlaneId = 0; clipPlaneId < GLEmulation.MAX_CLIP_PLANES; clipPlaneId++) {
              this.clipPlaneEquationLocation[clipPlaneId] = GLctx.getUniformLocation(this.program, `u_clipPlaneEquation${clipPlaneId}`);
              this.hasClipPlane = (this.hasClipPlane || this.clipPlaneEquationLocation[clipPlaneId]);
            }
  
            this.hasLighting = GLEmulation.lightingEnabled;
            this.lightModelAmbientLocation = GLctx.getUniformLocation(this.program, 'u_lightModelAmbient');
            this.materialAmbientLocation = GLctx.getUniformLocation(this.program, 'u_materialAmbient');
            this.materialDiffuseLocation = GLctx.getUniformLocation(this.program, 'u_materialDiffuse');
            this.materialSpecularLocation = GLctx.getUniformLocation(this.program, 'u_materialSpecular');
            this.materialShininessLocation = GLctx.getUniformLocation(this.program, 'u_materialShininess');
            this.materialEmissionLocation = GLctx.getUniformLocation(this.program, 'u_materialEmission');
            this.lightAmbientLocation = []
            this.lightDiffuseLocation = []
            this.lightSpecularLocation = []
            this.lightPositionLocation = []
            for (var lightId = 0; lightId < GLEmulation.MAX_LIGHTS; lightId++) {
              this.lightAmbientLocation[lightId] = GLctx.getUniformLocation(this.program, `u_lightAmbient${lightId}`);
              this.lightDiffuseLocation[lightId] = GLctx.getUniformLocation(this.program, `u_lightDiffuse${lightId}`);
              this.lightSpecularLocation[lightId] = GLctx.getUniformLocation(this.program, `u_lightSpecular${lightId}`);
              this.lightPositionLocation[lightId] = GLctx.getUniformLocation(this.program, `u_lightPosition${lightId}`);
            }
  
            this.hasAlphaTest = GLEmulation.alphaTestEnabled;
            this.alphaTestRefLocation = GLctx.getUniformLocation(this.program, 'u_alphaTestRef');
  
          };
  
          this.prepare = function() {
            // Calculate the array buffer
            var arrayBuffer;
            if (!GLctx.currentArrayBufferBinding) {
              var start = GLImmediate.firstVertex*GLImmediate.stride;
              var end = GLImmediate.lastVertex*GLImmediate.stride;
              assert(end <= GL.MAX_TEMP_BUFFER_SIZE, 'too much vertex data');
              arrayBuffer = GL.getTempVertexBuffer(end);
              // TODO: consider using the last buffer we bound, if it was larger. downside is larger buffer, but we might avoid rebinding and preparing
            } else {
              arrayBuffer = GLctx.currentArrayBufferBinding;
            }
  
            // If the array buffer is unchanged and the renderer as well, then we can avoid all the work here
            // XXX We use some heuristics here, and this may not work in all cases. Try disabling GL_UNSAFE_OPTS if you
            // have odd glitches
            var lastRenderer = GLImmediate.lastRenderer;
            var canSkip = this == lastRenderer &&
                          arrayBuffer == GLImmediate.lastArrayBuffer &&
                          (GL.currProgram || this.program) == GLImmediate.lastProgram &&
                          GLImmediate.stride == GLImmediate.lastStride &&
                          !GLImmediate.matricesModified;
            if (!canSkip && lastRenderer) lastRenderer.cleanup();
            if (!GLctx.currentArrayBufferBinding) {
              // Bind the array buffer and upload data after cleaning up the previous renderer
  
              if (arrayBuffer != GLImmediate.lastArrayBuffer) {
                GLctx.bindBuffer(GLctx.ARRAY_BUFFER, arrayBuffer);
                GLImmediate.lastArrayBuffer = arrayBuffer;
              }
  
              GLctx.bufferSubData(GLctx.ARRAY_BUFFER, start, GLImmediate.vertexData.subarray(start >> 2, end >> 2));
            }
            if (canSkip) return;
            GLImmediate.lastRenderer = this;
            GLImmediate.lastProgram = GL.currProgram || this.program;
            GLImmediate.lastStride = GLImmediate.stride;
            GLImmediate.matricesModified = false;
  
            if (!GL.currProgram) {
              if (GLImmediate.fixedFunctionProgram != this.program) {
                GLctx.useProgram(this.program);
                GLImmediate.fixedFunctionProgram = this.program;
              }
            }
  
            if (this.modelViewLocation && this.modelViewMatrixVersion != GLImmediate.matrixVersion[0/*m*/]) {
              this.modelViewMatrixVersion = GLImmediate.matrixVersion[0/*m*/];
              GLctx.uniformMatrix4fv(this.modelViewLocation, false, GLImmediate.matrix[0/*m*/]);
  
              // set normal matrix to the upper 3x3 of the inverse transposed current modelview matrix
              if (GLEmulation.lightEnabled) {
                var tmpMVinv = GLImmediate.matrixLib.mat4.create(GLImmediate.matrix[0]);
                GLImmediate.matrixLib.mat4.inverse(tmpMVinv);
                GLImmediate.matrixLib.mat4.transpose(tmpMVinv);
                GLctx.uniformMatrix3fv(this.normalMatrixLocation, false, GLImmediate.matrixLib.mat4.toMat3(tmpMVinv));
              }
            }
            if (this.projectionLocation && this.projectionMatrixVersion != GLImmediate.matrixVersion[1/*p*/]) {
              this.projectionMatrixVersion = GLImmediate.matrixVersion[1/*p*/];
              GLctx.uniformMatrix4fv(this.projectionLocation, false, GLImmediate.matrix[1/*p*/]);
            }
  
            var clientAttributes = GLImmediate.clientAttributes;
            var posAttr = clientAttributes[GLImmediate.VERTEX];
  
            if (!GLctx.currentArrayBufferBinding) {
              GLctx.vertexAttribPointer(GLImmediate.VERTEX, posAttr.size, posAttr.type, false, GLImmediate.stride, posAttr.offset);
              if (this.hasNormal) {
                var normalAttr = clientAttributes[GLImmediate.NORMAL];
                GLctx.vertexAttribPointer(GLImmediate.NORMAL, normalAttr.size, normalAttr.type, true, GLImmediate.stride, normalAttr.offset);
              }
            }
            if (this.hasTextures) {
              for (var i = 0; i < GLImmediate.MAX_TEXTURES; i++) {
                if (!GLctx.currentArrayBufferBinding) {
                  var attribLoc = GLImmediate.TEXTURE0+i;
                  if (!GLImmediate._muMaxAttrib) GLImmediate._muMaxAttrib = GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS);
                  if (attribLoc < GLImmediate._muMaxAttrib) {
                  var texAttr = clientAttributes[attribLoc];
                  if (texAttr.size) {
                    GLctx.vertexAttribPointer(attribLoc, texAttr.size, texAttr.type, false, GLImmediate.stride, texAttr.offset);
                  } else {
                    // These two might be dangerous, but let's try them.
                    GLctx.vertexAttrib4f(attribLoc, 0, 0, 0, 1);
                  }
                  }
                }
                var t = 2/*t*/+i;
                if (this.textureMatrixLocations[i] && this.textureMatrixVersion[t] != GLImmediate.matrixVersion[t]) { // XXX might we need this even without the condition we are currently in?
                  this.textureMatrixVersion[t] = GLImmediate.matrixVersion[t];
                  GLctx.uniformMatrix4fv(this.textureMatrixLocations[i], false, GLImmediate.matrix[t]);
                }
              }
            }
            if (GLImmediate.enabledClientAttributes[GLImmediate.COLOR]) {
              var colorAttr = clientAttributes[GLImmediate.COLOR];
              if (!GLctx.currentArrayBufferBinding) {
                GLctx.vertexAttribPointer(GLImmediate.COLOR, colorAttr.size, colorAttr.type, true, GLImmediate.stride, colorAttr.offset);
              }
            } else if (GLImmediate.clientColor) {
              GLctx.disableVertexAttribArray(GLImmediate.COLOR);
              GLctx.vertexAttrib4fv(GLImmediate.COLOR, GLImmediate.clientColor);
            }
            if (this.hasFog) {
              if (this.fogColorLocation) GLctx.uniform4fv(this.fogColorLocation, GLEmulation.fogColor);
              if (this.fogEndLocation) GLctx.uniform1f(this.fogEndLocation, GLEmulation.fogEnd);
              if (this.fogScaleLocation) GLctx.uniform1f(this.fogScaleLocation, 1/(GLEmulation.fogEnd - GLEmulation.fogStart));
              if (this.fogDensityLocation) GLctx.uniform1f(this.fogDensityLocation, GLEmulation.fogDensity);
            }
  
            if (this.hasClipPlane) {
              for (var clipPlaneId = 0; clipPlaneId < GLEmulation.MAX_CLIP_PLANES; clipPlaneId++) {
                if (this.clipPlaneEquationLocation[clipPlaneId]) GLctx.uniform4fv(this.clipPlaneEquationLocation[clipPlaneId], GLEmulation.clipPlaneEquation[clipPlaneId]);
              }
            }
  
            if (this.hasLighting) {
              if (this.lightModelAmbientLocation) GLctx.uniform4fv(this.lightModelAmbientLocation, GLEmulation.lightModelAmbient);
              if (this.materialAmbientLocation) GLctx.uniform4fv(this.materialAmbientLocation, GLEmulation.materialAmbient);
              if (this.materialDiffuseLocation) GLctx.uniform4fv(this.materialDiffuseLocation, GLEmulation.materialDiffuse);
              if (this.materialSpecularLocation) GLctx.uniform4fv(this.materialSpecularLocation, GLEmulation.materialSpecular);
              if (this.materialShininessLocation) GLctx.uniform1f(this.materialShininessLocation, GLEmulation.materialShininess[0]);
              if (this.materialEmissionLocation) GLctx.uniform4fv(this.materialEmissionLocation, GLEmulation.materialEmission);
              for (var lightId = 0; lightId < GLEmulation.MAX_LIGHTS; lightId++) {
                if (this.lightAmbientLocation[lightId]) GLctx.uniform4fv(this.lightAmbientLocation[lightId], GLEmulation.lightAmbient[lightId]);
                if (this.lightDiffuseLocation[lightId]) GLctx.uniform4fv(this.lightDiffuseLocation[lightId], GLEmulation.lightDiffuse[lightId]);
                if (this.lightSpecularLocation[lightId]) GLctx.uniform4fv(this.lightSpecularLocation[lightId], GLEmulation.lightSpecular[lightId]);
                if (this.lightPositionLocation[lightId]) GLctx.uniform4fv(this.lightPositionLocation[lightId], GLEmulation.lightPosition[lightId]);
              }
            }
  
            if (this.hasAlphaTest) {
              if (this.alphaTestRefLocation) GLctx.uniform1f(this.alphaTestRefLocation, GLEmulation.alphaTestRef);
            }
  
            if (GLImmediate.mode == GLctx.POINTS) {
              if (this.pointSizeLocation) {
                GLctx.uniform1f(this.pointSizeLocation, GLEmulation.pointSize);
              }
            }
          };
  
          this.cleanup = function() {
          }
  
          this.init();
        }
        return new Renderer();
      },
  setupFuncs() {
        // TexEnv stuff needs to be prepared early, so do it here.
        // init() is too late for -O2, since it freezes the GL functions
        // by that point.
        GLImmediate.MapTreeLib = GLImmediate.spawnMapTreeLib();
        GLImmediate.spawnMapTreeLib = null;
  
        GLImmediate.TexEnvJIT = GLImmediate.spawnTexEnvJIT();
        GLImmediate.spawnTexEnvJIT = null;
  
        GLImmediate.setupHooks();
      },
  setupHooks() {
        if (!GLEmulation.hasRunInit) {
          GLEmulation.init();
        }
  
        var glActiveTexture = _glActiveTexture;
        _glActiveTexture = _emscripten_glActiveTexture = (texture) => {
          GLImmediate.TexEnvJIT.hook_activeTexture(texture);
          glActiveTexture(texture);
        };
  
        var glEnable = _glEnable;
        _glEnable = _emscripten_glEnable = (cap) => {
          GLImmediate.TexEnvJIT.hook_enable(cap);
          glEnable(cap);
        };
  
        var glDisable = _glDisable;
        _glDisable = _emscripten_glDisable = (cap) => {
          GLImmediate.TexEnvJIT.hook_disable(cap);
          glDisable(cap);
        };
  
        var glTexEnvf = (typeof _glTexEnvf != 'undefined') ? _glTexEnvf : () => {};
        /** @suppress {checkTypes} */
        _glTexEnvf = _emscripten_glTexEnvf = (target, pname, param) => {
          GLImmediate.TexEnvJIT.hook_texEnvf(target, pname, param);
          // Don't call old func, since we are the implementor.
          //glTexEnvf(target, pname, param);
        };
  
        var glTexEnvi = (typeof _glTexEnvi != 'undefined') ? _glTexEnvi : () => {};
        /** @suppress {checkTypes} */
        _glTexEnvi = _emscripten_glTexEnvi = (target, pname, param) => {
          
          GLImmediate.TexEnvJIT.hook_texEnvi(target, pname, param);
          // Don't call old func, since we are the implementor.
          //glTexEnvi(target, pname, param);
        };
  
        var glTexEnvfv = (typeof _glTexEnvfv != 'undefined') ? _glTexEnvfv : () => {};
        /** @suppress {checkTypes} */
        _glTexEnvfv = _emscripten_glTexEnvfv = (target, pname, param) => {
          
          GLImmediate.TexEnvJIT.hook_texEnvfv(target, pname, param);
          // Don't call old func, since we are the implementor.
          //glTexEnvfv(target, pname, param);
        };
  
        _glGetTexEnviv = (target, pname, param) => {
          
          GLImmediate.TexEnvJIT.hook_getTexEnviv(target, pname, param);
        };
  
        _glGetTexEnvfv = (target, pname, param) => {
          
          GLImmediate.TexEnvJIT.hook_getTexEnvfv(target, pname, param);
        };
  
        var glGetIntegerv = _glGetIntegerv;
        _glGetIntegerv = _emscripten_glGetIntegerv = (pname, params) => {
          switch (pname) {
            case 0x8B8D: { // GL_CURRENT_PROGRAM
              // Just query directly so we're working with WebGL objects.
              var cur = GLctx.getParameter(GLctx.CURRENT_PROGRAM);
              if (cur == GLImmediate.fixedFunctionProgram) {
                // Pretend we're not using a program.
                HEAP32[((params)>>2)] = 0;
                return;
              }
              break;
            }
          }
          glGetIntegerv(pname, params);
        };
      },
  initted:false,
  init() {
        err('WARNING: using emscripten GL immediate mode emulation. This is very limited in what it supports');
        GLImmediate.initted = true;
  
        if (!Browser.useWebGL) return; // a 2D canvas may be currently used TODO: make sure we are actually called in that case
  
        // User can override the maximum number of texture units that we emulate. Using fewer texture units increases runtime performance
        // slightly, so it is advantageous to choose as small value as needed.
        // Limit to a maximum of 28 to not overflow the state bits used for renderer caching (31 bits = 3 attributes + 28 texture units).
        GLImmediate.MAX_TEXTURES = Math.min(Module['GL_MAX_TEXTURE_IMAGE_UNITS'] || GLctx.getParameter(GLctx.MAX_TEXTURE_IMAGE_UNITS), 4);
  
        GLImmediate.TexEnvJIT.init(GLctx, GLImmediate.MAX_TEXTURES);
  
        GLImmediate.NUM_ATTRIBUTES = 3 /*pos+normal+color attributes*/ + GLImmediate.MAX_TEXTURES;
        GLImmediate.clientAttributes = [];
        GLEmulation.enabledClientAttribIndices = [];
        for (var i = 0; i < GLImmediate.NUM_ATTRIBUTES; i++) {
          GLImmediate.clientAttributes.push({});
          GLEmulation.enabledClientAttribIndices.push(false);
        }
  
        // Initialize matrix library
        // When user sets a matrix, increment a 'version number' on the new data, and when rendering, submit
        // the matrices to the shader program only if they have an old version of the data.
        GLImmediate.matrix = [];
        GLImmediate.matrixStack = [];
        GLImmediate.matrixVersion = [];
        for (var i = 0; i < 2 + GLImmediate.MAX_TEXTURES; i++) { // Modelview, Projection, plus one matrix for each texture coordinate.
          GLImmediate.matrixStack.push([]);
          GLImmediate.matrixVersion.push(0);
          GLImmediate.matrix.push(GLImmediate.matrixLib.mat4.create());
          GLImmediate.matrixLib.mat4.identity(GLImmediate.matrix[i]);
        }
  
        // Renderer cache
        GLImmediate.rendererCache = GLImmediate.MapTreeLib.create();
  
        // Buffers for data
        GLImmediate.tempData = new Float32Array(GL.MAX_TEMP_BUFFER_SIZE >> 2);
        GLImmediate.indexData = new Uint16Array(GL.MAX_TEMP_BUFFER_SIZE >> 1);
  
        GLImmediate.vertexDataU8 = new Uint8Array(GLImmediate.tempData.buffer);
  
        GL.generateTempBuffers(true, GL.currentContext);
  
        GLImmediate.clientColor = new Float32Array([1, 1, 1, 1]);
      },
  prepareClientAttributes(count, beginEnd) {
        // If no client attributes were modified since we were last called, do
        // nothing. Note that this does not work for glBegin/End, where we
        // generate renderer components dynamically and then disable them
        // ourselves, but it does help with glDrawElements/Arrays.
        if (!GLImmediate.modifiedClientAttributes) {
          GLImmediate.vertexCounter = (GLImmediate.stride * count) / 4; // XXX assuming float
          return;
        }
        GLImmediate.modifiedClientAttributes = false;
  
        // The role of prepareClientAttributes is to examine the set of
        // client-side vertex attribute buffers that user code has submitted, and
        // to prepare them to be uploaded to a VBO in GPU memory (since WebGL does
        // not support client-side rendering, i.e. rendering from vertex data in
        // CPU memory). User can submit vertex data generally in three different
        // configurations:
        // 1. Fully planar: all attributes are in their own separate
        //                  tightly-packed arrays in CPU memory.
        // 2. Fully interleaved: all attributes share a single array where data is
        //                       interleaved something like (pos,uv,normal),
        //                       (pos,uv,normal), ...
        // 3. Complex hybrid: Multiple separate arrays that either are sparsely
        //                    strided, and/or partially interleaves vertex
        //                    attributes.
  
        // For simplicity, we support the case (2) as the fast case. For (1) and
        // (3), we do a memory copy of the vertex data here to prepare a
        // relayouted buffer that is of the structure in case (2). The reason
        // for this is that it allows the emulation code to get away with using
        // just one VBO buffer for rendering, and not have to maintain multiple
        // ones. Therefore cases (1) and (3) will be very slow, and case (2) is
        // fast.
  
        // Detect which case we are in by using a quick heuristic by examining the
        // strides of the buffers. If all the buffers have identical stride, we
        // assume we have case (2), otherwise we have something more complex.
        var clientStartPointer = 0xFFFFFFFF;
        var bytes = 0; // Total number of bytes taken up by a single vertex.
        var minStride = 0xFFFFFFFF;
        var maxStride = 0;
        var attributes = GLImmediate.liveClientAttributes;
        attributes.length = 0;
        for (var i = 0; i < 3+GLImmediate.MAX_TEXTURES; i++) {
          if (GLImmediate.enabledClientAttributes[i]) {
            var attr = GLImmediate.clientAttributes[i];
            attributes.push(attr);
            clientStartPointer = Math.min(clientStartPointer, attr.pointer);
            attr.sizeBytes = attr.size * GL.byteSizeByType[attr.type - GL.byteSizeByTypeRoot];
            bytes += attr.sizeBytes;
            minStride = Math.min(minStride, attr.stride);
            maxStride = Math.max(maxStride, attr.stride);
          }
        }
  
        if ((minStride != maxStride || maxStride < bytes) && !beginEnd) {
          // We are in cases (1) or (3): slow path, shuffle the data around into a
          // single interleaved vertex buffer.
          // The immediate-mode glBegin()/glEnd() vertex submission gets
          // automatically generated in appropriate layout, so never need to come
          // down this path if that was used.
          GLImmediate.restrideBuffer ||= _malloc(GL.MAX_TEMP_BUFFER_SIZE);
          var start = GLImmediate.restrideBuffer;
          bytes = 0;
          // calculate restrided offsets and total size
          for (var attr of attributes) {
            var size = attr.sizeBytes;
            if (size % 4 != 0) size += 4 - (size % 4); // align everything
            attr.offset = bytes;
            bytes += size;
          }
          // copy out the data (we need to know the stride for that, and define attr.pointer)
          for (var attr of attributes) {
            var srcStride = Math.max(attr.sizeBytes, attr.stride);
            if ((srcStride & 3) == 0 && (attr.sizeBytes & 3) == 0) {
              for (var j = 0; j < count; j++) {
                for (var k = 0; k < attr.sizeBytes; k+=4) { // copy in chunks of 4 bytes, our alignment makes this possible
                  var val = HEAP32[(((attr.pointer)+(j*srcStride + k))>>2)];
                  HEAP32[(((start + attr.offset)+(bytes*j + k))>>2)] = val;
                }
              }
            } else {
              for (var j = 0; j < count; j++) {
                for (var k = 0; k < attr.sizeBytes; k++) { // source data was not aligned to multiples of 4, must copy byte by byte.
                  HEAP8[start + attr.offset + bytes*j + k] = HEAP8[attr.pointer + j*srcStride + k];
                }
              }
            }
            attr.pointer = start + attr.offset;
          }
          GLImmediate.stride = bytes;
          GLImmediate.vertexPointer = start;
        } else {
          // case (2): fast path, all data is interleaved to a single vertex array so we can get away with a single VBO upload.
          if (GLctx.currentArrayBufferBinding) {
            GLImmediate.vertexPointer = 0;
          } else {
            GLImmediate.vertexPointer = clientStartPointer;
          }
          for (var attr of attributes) {
            attr.offset = attr.pointer - GLImmediate.vertexPointer; // Compute what will be the offset of this attribute in the VBO after we upload.
          }
          GLImmediate.stride = Math.max(maxStride, bytes);
        }
        if (!beginEnd) {
          GLImmediate.vertexCounter = (GLImmediate.stride * count) / 4; // XXX assuming float
        }
      },
  flush(numProvidedIndexes, startIndex = 0, ptr = 0) {
        assert(numProvidedIndexes >= 0 || !numProvidedIndexes);
        var renderer = GLImmediate.getRenderer();
  
        // Generate index data in a format suitable for GLES 2.0/WebGL
        var numVertices = 4 * GLImmediate.vertexCounter / GLImmediate.stride;
        if (!numVertices) return;
        assert(numVertices % 1 == 0, "`numVertices` must be an integer.");
        var emulatedElementArrayBuffer = false;
        var numIndexes = 0;
        if (numProvidedIndexes) {
          numIndexes = numProvidedIndexes;
          if (!GLctx.currentArrayBufferBinding && GLImmediate.firstVertex > GLImmediate.lastVertex) {
            // Figure out the first and last vertex from the index data
            // If we are going to upload array buffer data, we need to find which range to
            // upload based on the indices. If they are in a buffer on the GPU, that is very
            // inconvenient! So if you do not have an array buffer, you should also not have
            // an element array buffer. But best is to use both buffers!
            assert(!GLctx.currentElementArrayBufferBinding);
            for (var i = 0; i < numProvidedIndexes; i++) {
              var currIndex = HEAPU16[(((ptr)+(i*2))>>1)];
              GLImmediate.firstVertex = Math.min(GLImmediate.firstVertex, currIndex);
              GLImmediate.lastVertex = Math.max(GLImmediate.lastVertex, currIndex+1);
            }
          }
          if (!GLctx.currentElementArrayBufferBinding) {
            // If no element array buffer is bound, then indices is a literal pointer to clientside data
            assert(numProvidedIndexes << 1 <= GL.MAX_TEMP_BUFFER_SIZE, 'too many immediate mode indexes (a)');
            var indexBuffer = GL.getTempIndexBuffer(numProvidedIndexes << 1);
            GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, indexBuffer);
            GLctx.bufferSubData(GLctx.ELEMENT_ARRAY_BUFFER, 0, HEAPU16.subarray((((ptr)>>1)), ((ptr + (numProvidedIndexes << 1))>>1)));
            ptr = 0;
            emulatedElementArrayBuffer = true;
          }
        } else if (GLImmediate.mode > 6) { // above GL_TRIANGLE_FAN are the non-GL ES modes
          if (GLImmediate.mode != 7) throw 'unsupported immediate mode ' + GLImmediate.mode; // GL_QUADS
          // GLImmediate.firstVertex is the first vertex we want. Quad indexes are
          // in the pattern 0 1 2, 0 2 3, 4 5 6, 4 6 7, so we need to look at
          // index firstVertex * 1.5 to see it.  Then since indexes are 2 bytes
          // each, that means 3
          assert(GLImmediate.firstVertex % 4 == 0);
          ptr = GLImmediate.firstVertex * 3;
          var numQuads = numVertices / 4;
          numIndexes = numQuads * 6; // 0 1 2, 0 2 3 pattern
          assert(ptr + (numIndexes << 1) <= GL.MAX_TEMP_BUFFER_SIZE, 'too many immediate mode indexes (b)');
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.currentContext.tempQuadIndexBuffer);
          emulatedElementArrayBuffer = true;
          GLImmediate.mode = GLctx.TRIANGLES;
        }
  
        renderer.prepare();
  
        if (numIndexes) {
          GLctx.drawElements(GLImmediate.mode, numIndexes, GLctx.UNSIGNED_SHORT, ptr);
        } else {
          GLctx.drawArrays(GLImmediate.mode, startIndex, numVertices);
        }
  
        if (emulatedElementArrayBuffer) {
          GLctx.bindBuffer(GLctx.ELEMENT_ARRAY_BUFFER, GL.buffers[GLctx.currentElementArrayBufferBinding] || null);
        }
  
      },
  };
  GLImmediate.matrixLib = (() => {
  
  /**
   * @fileoverview gl-matrix - High performance matrix and vector operations for WebGL
   * @author Brandon Jones
   * @version 1.2.4
   */
  
  // Modified for emscripten:
  // - Global scoping etc.
  // - Disabled some non-closure-compatible javadoc comments.
  
  /*
   * Copyright (c) 2011 Brandon Jones
   *
   * This software is provided 'as-is', without any express or implied
   * warranty. In no event will the authors be held liable for any damages
   * arising from the use of this software.
   *
   * Permission is granted to anyone to use this software for any purpose,
   * including commercial applications, and to alter it and redistribute it
   * freely, subject to the following restrictions:
   *
   *    1. The origin of this software must not be misrepresented; you must not
   *    claim that you wrote the original software. If you use this software
   *    in a product, an acknowledgment in the product documentation would be
   *    appreciated but is not required.
   *
   *    2. Altered source versions must be plainly marked as such, and must not
   *    be misrepresented as being the original software.
   *
   *    3. This notice may not be removed or altered from any source
   *    distribution.
   */
  
  
  /**
   * @class 3 Dimensional Vector
   * @name vec3
   */
  var vec3 = {};
  
  /**
   * @class 3x3 Matrix
   * @name mat3
   */
  var mat3 = {};
  
  /**
   * @class 4x4 Matrix
   * @name mat4
   */
  var mat4 = {};
  
  /**
   * @class Quaternion
   * @name quat4
   */
  var quat4 = {};
  
  var MatrixArray = Float32Array;
  
  /*
   * vec3
   */
  
  /**
   * Creates a new instance of a vec3 using the default array type
   * Any javascript array-like objects containing at least 3 numeric elements can serve as a vec3
   *
   * _param {vec3} [vec] vec3 containing values to initialize with
   *
   * _returns {vec3} New vec3
   */
  vec3.create = function (vec) {
      var dest = new MatrixArray(3);
  
      if (vec) {
          dest[0] = vec[0];
          dest[1] = vec[1];
          dest[2] = vec[2];
      } else {
          dest[0] = dest[1] = dest[2] = 0;
      }
  
      return dest;
  };
  
  /**
   * Copies the values of one vec3 to another
   *
   * _param {vec3} vec vec3 containing values to copy
   * _param {vec3} dest vec3 receiving copied values
   *
   * _returns {vec3} dest
   */
  vec3.set = function (vec, dest) {
      dest[0] = vec[0];
      dest[1] = vec[1];
      dest[2] = vec[2];
  
      return dest;
  };
  
  /**
   * Performs a vector addition
   *
   * _param {vec3} vec First operand
   * _param {vec3} vec2 Second operand
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.add = function (vec, vec2, dest) {
      if (!dest || vec === dest) {
          vec[0] += vec2[0];
          vec[1] += vec2[1];
          vec[2] += vec2[2];
          return vec;
      }
  
      dest[0] = vec[0] + vec2[0];
      dest[1] = vec[1] + vec2[1];
      dest[2] = vec[2] + vec2[2];
      return dest;
  };
  
  /**
   * Performs a vector subtraction
   *
   * _param {vec3} vec First operand
   * _param {vec3} vec2 Second operand
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.subtract = function (vec, vec2, dest) {
      if (!dest || vec === dest) {
          vec[0] -= vec2[0];
          vec[1] -= vec2[1];
          vec[2] -= vec2[2];
          return vec;
      }
  
      dest[0] = vec[0] - vec2[0];
      dest[1] = vec[1] - vec2[1];
      dest[2] = vec[2] - vec2[2];
      return dest;
  };
  
  /**
   * Performs a vector multiplication
   *
   * _param {vec3} vec First operand
   * _param {vec3} vec2 Second operand
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.multiply = function (vec, vec2, dest) {
      if (!dest || vec === dest) {
          vec[0] *= vec2[0];
          vec[1] *= vec2[1];
          vec[2] *= vec2[2];
          return vec;
      }
  
      dest[0] = vec[0] * vec2[0];
      dest[1] = vec[1] * vec2[1];
      dest[2] = vec[2] * vec2[2];
      return dest;
  };
  
  /**
   * Negates the components of a vec3
   *
   * _param {vec3} vec vec3 to negate
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.negate = function (vec, dest) {
      if (!dest) { dest = vec; }
  
      dest[0] = -vec[0];
      dest[1] = -vec[1];
      dest[2] = -vec[2];
      return dest;
  };
  
  /**
   * Multiplies the components of a vec3 by a scalar value
   *
   * _param {vec3} vec vec3 to scale
   * _param {number} val Value to scale by
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.scale = function (vec, val, dest) {
      if (!dest || vec === dest) {
          vec[0] *= val;
          vec[1] *= val;
          vec[2] *= val;
          return vec;
      }
  
      dest[0] = vec[0] * val;
      dest[1] = vec[1] * val;
      dest[2] = vec[2] * val;
      return dest;
  };
  
  /**
   * Generates a unit vector of the same direction as the provided vec3
   * If vector length is 0, returns [0, 0, 0]
   *
   * _param {vec3} vec vec3 to normalize
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.normalize = function (vec, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2],
          len = Math.sqrt(x * x + y * y + z * z);
  
      if (!len) {
          dest[0] = 0;
          dest[1] = 0;
          dest[2] = 0;
          return dest;
      } else if (len === 1) {
          dest[0] = x;
          dest[1] = y;
          dest[2] = z;
          return dest;
      }
  
      len = 1 / len;
      dest[0] = x * len;
      dest[1] = y * len;
      dest[2] = z * len;
      return dest;
  };
  
  /**
   * Generates the cross product of two vec3s
   *
   * _param {vec3} vec First operand
   * _param {vec3} vec2 Second operand
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.cross = function (vec, vec2, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2],
          x2 = vec2[0], y2 = vec2[1], z2 = vec2[2];
  
      dest[0] = y * z2 - z * y2;
      dest[1] = z * x2 - x * z2;
      dest[2] = x * y2 - y * x2;
      return dest;
  };
  
  /**
   * Calculates the length of a vec3
   *
   * _param {vec3} vec vec3 to calculate length of
   *
   * _returns {number} Length of vec
   */
  vec3.length = function (vec) {
      var x = vec[0], y = vec[1], z = vec[2];
      return Math.sqrt(x * x + y * y + z * z);
  };
  
  /**
   * Calculates the dot product of two vec3s
   *
   * _param {vec3} vec First operand
   * _param {vec3} vec2 Second operand
   *
   * _returns {number} Dot product of vec and vec2
   */
  vec3.dot = function (vec, vec2) {
      return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
  };
  
  /**
   * Generates a unit vector pointing from one vector to another
   *
   * _param {vec3} vec Origin vec3
   * _param {vec3} vec2 vec3 to point to
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.direction = function (vec, vec2, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0] - vec2[0],
          y = vec[1] - vec2[1],
          z = vec[2] - vec2[2],
          len = Math.sqrt(x * x + y * y + z * z);
  
      if (!len) {
          dest[0] = 0;
          dest[1] = 0;
          dest[2] = 0;
          return dest;
      }
  
      len = 1 / len;
      dest[0] = x * len;
      dest[1] = y * len;
      dest[2] = z * len;
      return dest;
  };
  
  /**
   * Performs a linear interpolation between two vec3
   *
   * _param {vec3} vec First vector
   * _param {vec3} vec2 Second vector
   * _param {number} lerp Interpolation amount between the two inputs
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.lerp = function (vec, vec2, lerp, dest) {
      if (!dest) { dest = vec; }
  
      dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
      dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
      dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);
  
      return dest;
  };
  
  /**
   * Calculates the euclidean distance between two vec3
   *
   * Params:
   * _param {vec3} vec First vector
   * _param {vec3} vec2 Second vector
   *
   * _returns {number} Distance between vec and vec2
   */
  vec3.dist = function (vec, vec2) {
      var x = vec2[0] - vec[0],
          y = vec2[1] - vec[1],
          z = vec2[2] - vec[2];
  
      return Math.sqrt(x*x + y*y + z*z);
  };
  
  /**
   * Projects the specified vec3 from screen space into object space
   * Based on the <a href="http://webcvs.freedesktop.org/mesa/Mesa/src/glu/mesa/project.c?revision=1.4&view=markup">Mesa gluUnProject implementation</a>
   *
   * _param {vec3} vec Screen-space vector to project
   * _param {mat4} view View matrix
   * _param {mat4} proj Projection matrix
   * _param {vec4} viewport Viewport as given to gl.viewport [x, y, width, height]
   * _param {vec3} [dest] vec3 receiving unprojected result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  vec3.unproject = function (vec, view, proj, viewport, dest) {
      if (!dest) { dest = vec; }
  
      var m = mat4.create();
      var v = new MatrixArray(4);
  
      v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
      v[1] = (vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0;
      v[2] = 2.0 * vec[2] - 1.0;
      v[3] = 1.0;
  
      mat4.multiply(proj, view, m);
      if(!mat4.inverse(m)) { return null; }
  
      mat4.multiplyVec4(m, v);
      if(v[3] === 0.0) { return null; }
  
      dest[0] = v[0] / v[3];
      dest[1] = v[1] / v[3];
      dest[2] = v[2] / v[3];
  
      return dest;
  };
  
  /**
   * Returns a string representation of a vector
   *
   * _param {vec3} vec Vector to represent as a string
   *
   * _returns {string} String representation of vec
   */
  vec3.str = function (vec) {
      return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']';
  };
  
  /*
   * mat3
   */
  
  /**
   * Creates a new instance of a mat3 using the default array type
   * Any javascript array-like object containing at least 9 numeric elements can serve as a mat3
   *
   * _param {mat3} [mat] mat3 containing values to initialize with
   *
   * _returns {mat3} New mat3
   *
   * @param {Object=} mat
   */
  mat3.create = function (mat) {
      var dest = new MatrixArray(9);
  
      if (mat) {
          dest[0] = mat[0];
          dest[1] = mat[1];
          dest[2] = mat[2];
          dest[3] = mat[3];
          dest[4] = mat[4];
          dest[5] = mat[5];
          dest[6] = mat[6];
          dest[7] = mat[7];
          dest[8] = mat[8];
      }
  
      return dest;
  };
  
  /**
   * Copies the values of one mat3 to another
   *
   * _param {mat3} mat mat3 containing values to copy
   * _param {mat3} dest mat3 receiving copied values
   *
   * _returns {mat3} dest
   */
  mat3.set = function (mat, dest) {
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[3];
      dest[4] = mat[4];
      dest[5] = mat[5];
      dest[6] = mat[6];
      dest[7] = mat[7];
      dest[8] = mat[8];
      return dest;
  };
  
  /**
   * Sets a mat3 to an identity matrix
   *
   * _param {mat3} dest mat3 to set
   *
   * _returns dest if specified, otherwise a new mat3
   */
  mat3.identity = function (dest) {
      if (!dest) { dest = mat3.create(); }
      dest[0] = 1;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 1;
      dest[5] = 0;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = 1;
      return dest;
  };
  
  /**
   * Transposes a mat3 (flips the values over the diagonal)
   *
   * Params:
   * _param {mat3} mat mat3 to transpose
   * _param {mat3} [dest] mat3 receiving transposed values. If not specified result is written to mat
   */
  mat3.transpose = function (mat, dest) {
      // If we are transposing ourselves we can skip a few steps but have to cache some values
      if (!dest || mat === dest) {
          var a01 = mat[1], a02 = mat[2],
              a12 = mat[5];
  
          mat[1] = mat[3];
          mat[2] = mat[6];
          mat[3] = a01;
          mat[5] = mat[7];
          mat[6] = a02;
          mat[7] = a12;
          return mat;
      }
  
      dest[0] = mat[0];
      dest[1] = mat[3];
      dest[2] = mat[6];
      dest[3] = mat[1];
      dest[4] = mat[4];
      dest[5] = mat[7];
      dest[6] = mat[2];
      dest[7] = mat[5];
      dest[8] = mat[8];
      return dest;
  };
  
  /**
   * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
   *
   * _param {mat3} mat mat3 containing values to copy
   * _param {mat4} [dest] mat4 receiving copied values
   *
   * _returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat3.toMat4 = function (mat, dest) {
      if (!dest) { dest = mat4.create(); }
  
      dest[15] = 1;
      dest[14] = 0;
      dest[13] = 0;
      dest[12] = 0;
  
      dest[11] = 0;
      dest[10] = mat[8];
      dest[9] = mat[7];
      dest[8] = mat[6];
  
      dest[7] = 0;
      dest[6] = mat[5];
      dest[5] = mat[4];
      dest[4] = mat[3];
  
      dest[3] = 0;
      dest[2] = mat[2];
      dest[1] = mat[1];
      dest[0] = mat[0];
  
      return dest;
  };
  
  /**
   * Returns a string representation of a mat3
   *
   * _param {mat3} mat mat3 to represent as a string
   *
   * _param {string} String representation of mat
   */
  mat3.str = function (mat) {
      return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] +
          ', ' + mat[3] + ', ' + mat[4] + ', ' + mat[5] +
          ', ' + mat[6] + ', ' + mat[7] + ', ' + mat[8] + ']';
  };
  
  /*
   * mat4
   */
  
  /**
   * Creates a new instance of a mat4 using the default array type
   * Any javascript array-like object containing at least 16 numeric elements can serve as a mat4
   *
   * _param {mat4} [mat] mat4 containing values to initialize with
   *
   * _returns {mat4} New mat4
   *
   * @param {Object=} mat
   */
  mat4.create = function (mat) {
      var dest = new MatrixArray(16);
  
      if (mat) {
          dest[0] = mat[0];
          dest[1] = mat[1];
          dest[2] = mat[2];
          dest[3] = mat[3];
          dest[4] = mat[4];
          dest[5] = mat[5];
          dest[6] = mat[6];
          dest[7] = mat[7];
          dest[8] = mat[8];
          dest[9] = mat[9];
          dest[10] = mat[10];
          dest[11] = mat[11];
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      return dest;
  };
  
  /**
   * Copies the values of one mat4 to another
   *
   * _param {mat4} mat mat4 containing values to copy
   * _param {mat4} dest mat4 receiving copied values
   *
   * _returns {mat4} dest
   */
  mat4.set = function (mat, dest) {
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[3];
      dest[4] = mat[4];
      dest[5] = mat[5];
      dest[6] = mat[6];
      dest[7] = mat[7];
      dest[8] = mat[8];
      dest[9] = mat[9];
      dest[10] = mat[10];
      dest[11] = mat[11];
      dest[12] = mat[12];
      dest[13] = mat[13];
      dest[14] = mat[14];
      dest[15] = mat[15];
      return dest;
  };
  
  /**
   * Sets a mat4 to an identity matrix
   *
   * _param {mat4} dest mat4 to set
   *
   * _returns {mat4} dest
   */
  mat4.identity = function (dest) {
      if (!dest) { dest = mat4.create(); }
      dest[0] = 1;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 0;
      dest[5] = 1;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = 0;
      dest[9] = 0;
      dest[10] = 1;
      dest[11] = 0;
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = 0;
      dest[15] = 1;
      return dest;
  };
  
  /**
   * Transposes a mat4 (flips the values over the diagonal)
   *
   * _param {mat4} mat mat4 to transpose
   * _param {mat4} [dest] mat4 receiving transposed values. If not specified result is written to mat
   */
  mat4.transpose = function (mat, dest) {
      // If we are transposing ourselves we can skip a few steps but have to cache some values
      if (!dest || mat === dest) {
          var a01 = mat[1], a02 = mat[2], a03 = mat[3],
              a12 = mat[6], a13 = mat[7],
              a23 = mat[11];
  
          mat[1] = mat[4];
          mat[2] = mat[8];
          mat[3] = mat[12];
          mat[4] = a01;
          mat[6] = mat[9];
          mat[7] = mat[13];
          mat[8] = a02;
          mat[9] = a12;
          mat[11] = mat[14];
          mat[12] = a03;
          mat[13] = a13;
          mat[14] = a23;
          return mat;
      }
  
      dest[0] = mat[0];
      dest[1] = mat[4];
      dest[2] = mat[8];
      dest[3] = mat[12];
      dest[4] = mat[1];
      dest[5] = mat[5];
      dest[6] = mat[9];
      dest[7] = mat[13];
      dest[8] = mat[2];
      dest[9] = mat[6];
      dest[10] = mat[10];
      dest[11] = mat[14];
      dest[12] = mat[3];
      dest[13] = mat[7];
      dest[14] = mat[11];
      dest[15] = mat[15];
      return dest;
  };
  
  /**
   * Calculates the determinant of a mat4
   *
   * _param {mat4} mat mat4 to calculate determinant of
   *
   * _returns {number} determinant of mat
   */
  mat4.determinant = function (mat) {
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
          a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
          a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
          a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15];
  
      return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 +
              a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 +
              a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 +
              a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 +
              a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 +
              a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
  };
  
  /**
   * Calculates the inverse matrix of a mat4
   *
   * _param {mat4} mat mat4 to calculate inverse of
   * _param {mat4} [dest] mat4 receiving inverse matrix. If not specified result is written to mat, null if matrix cannot be inverted
   *
   * @param {Object=} dest
   */
  mat4.inverse = function (mat, dest) {
      if (!dest) { dest = mat; }
  
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
          a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
          a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
          a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],
  
          b00 = a00 * a11 - a01 * a10,
          b01 = a00 * a12 - a02 * a10,
          b02 = a00 * a13 - a03 * a10,
          b03 = a01 * a12 - a02 * a11,
          b04 = a01 * a13 - a03 * a11,
          b05 = a02 * a13 - a03 * a12,
          b06 = a20 * a31 - a21 * a30,
          b07 = a20 * a32 - a22 * a30,
          b08 = a20 * a33 - a23 * a30,
          b09 = a21 * a32 - a22 * a31,
          b10 = a21 * a33 - a23 * a31,
          b11 = a22 * a33 - a23 * a32,
  
          d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
          invDet;
  
          // Calculate the determinant
          if (!d) { return null; }
          invDet = 1 / d;
  
      dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
      dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
      dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
      dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
      dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
      dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
      dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
      dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
      dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
      dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
      dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
      dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
      dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
      dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
      dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
      dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
  
      return dest;
  };
  
  /**
   * Copies the upper 3x3 elements of a mat4 into another mat4
   *
   * _param {mat4} mat mat4 containing values to copy
   * _param {mat4} [dest] mat4 receiving copied values
   *
   * _returns {mat4} dest is specified, a new mat4 otherwise
   */
  mat4.toRotationMat = function (mat, dest) {
      if (!dest) { dest = mat4.create(); }
  
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[3];
      dest[4] = mat[4];
      dest[5] = mat[5];
      dest[6] = mat[6];
      dest[7] = mat[7];
      dest[8] = mat[8];
      dest[9] = mat[9];
      dest[10] = mat[10];
      dest[11] = mat[11];
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = 0;
      dest[15] = 1;
  
      return dest;
  };
  
  /**
   * Copies the upper 3x3 elements of a mat4 into a mat3
   *
   * _param {mat4} mat mat4 containing values to copy
   * _param {mat3} [dest] mat3 receiving copied values
   *
   * _returns {mat3} dest is specified, a new mat3 otherwise
   */
  mat4.toMat3 = function (mat, dest) {
      if (!dest) { dest = mat3.create(); }
  
      dest[0] = mat[0];
      dest[1] = mat[1];
      dest[2] = mat[2];
      dest[3] = mat[4];
      dest[4] = mat[5];
      dest[5] = mat[6];
      dest[6] = mat[8];
      dest[7] = mat[9];
      dest[8] = mat[10];
  
      return dest;
  };
  
  /**
   * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
   * The resulting matrix is useful for calculating transformed normals
   *
   * Params:
   * _param {mat4} mat mat4 containing values to invert and copy
   * _param {mat3} [dest] mat3 receiving values
   *
   * _returns {mat3} dest is specified, a new mat3 otherwise, null if the matrix cannot be inverted
   */
  mat4.toInverseMat3 = function (mat, dest) {
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat[0], a01 = mat[1], a02 = mat[2],
          a10 = mat[4], a11 = mat[5], a12 = mat[6],
          a20 = mat[8], a21 = mat[9], a22 = mat[10],
  
          b01 = a22 * a11 - a12 * a21,
          b11 = -a22 * a10 + a12 * a20,
          b21 = a21 * a10 - a11 * a20,
  
          d = a00 * b01 + a01 * b11 + a02 * b21,
          id;
  
      if (!d) { return null; }
      id = 1 / d;
  
      if (!dest) { dest = mat3.create(); }
  
      dest[0] = b01 * id;
      dest[1] = (-a22 * a01 + a02 * a21) * id;
      dest[2] = (a12 * a01 - a02 * a11) * id;
      dest[3] = b11 * id;
      dest[4] = (a22 * a00 - a02 * a20) * id;
      dest[5] = (-a12 * a00 + a02 * a10) * id;
      dest[6] = b21 * id;
      dest[7] = (-a21 * a00 + a01 * a20) * id;
      dest[8] = (a11 * a00 - a01 * a10) * id;
  
      return dest;
  };
  
  /**
   * Performs a matrix multiplication
   *
   * _param {mat4} mat First operand
   * _param {mat4} mat2 Second operand
   * _param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   */
  mat4.multiply = function (mat, mat2, dest) {
      if (!dest) { dest = mat; }
  
      // Cache the matrix values (makes for huge speed increases!)
      var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
          a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
          a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
          a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],
  
          b00 = mat2[0], b01 = mat2[1], b02 = mat2[2], b03 = mat2[3],
          b10 = mat2[4], b11 = mat2[5], b12 = mat2[6], b13 = mat2[7],
          b20 = mat2[8], b21 = mat2[9], b22 = mat2[10], b23 = mat2[11],
          b30 = mat2[12], b31 = mat2[13], b32 = mat2[14], b33 = mat2[15];
  
      dest[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
      dest[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
      dest[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
      dest[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
      dest[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
      dest[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
      dest[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
      dest[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
      dest[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
      dest[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
      dest[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
      dest[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
      dest[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
      dest[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
      dest[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
      dest[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
  
      return dest;
  };
  
  /**
   * Transforms a vec3 with the given matrix
   * 4th vector component is implicitly '1'
   *
   * _param {mat4} mat mat4 to transform the vector with
   * _param {vec3} vec vec3 to transform
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec3} dest if specified, vec otherwise
   */
  mat4.multiplyVec3 = function (mat, vec, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2];
  
      dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
      dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
      dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
  
      return dest;
  };
  
  /**
   * Transforms a vec4 with the given matrix
   *
   * _param {mat4} mat mat4 to transform the vector with
   * _param {vec4} vec vec4 to transform
   * _param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vec
   *
   * _returns {vec4} dest if specified, vec otherwise
   *
   * @param {Object=} dest
   */
  mat4.multiplyVec4 = function (mat, vec, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2], w = vec[3];
  
      dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
      dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
      dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
      dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;
  
      return dest;
  };
  
  /**
   * Translates a matrix by the given vector
   *
   * _param {mat4} mat mat4 to translate
   * _param {vec3} vec vec3 specifying the translation
   * _param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   */
  mat4.translate = function (mat, vec, dest) {
      var x = vec[0], y = vec[1], z = vec[2],
          a00, a01, a02, a03,
          a10, a11, a12, a13,
          a20, a21, a22, a23;
  
      if (!dest || mat === dest) {
          mat[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
          mat[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
          mat[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
          mat[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
          return mat;
      }
  
      a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
      a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
      a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];
  
      dest[0] = a00; dest[1] = a01; dest[2] = a02; dest[3] = a03;
      dest[4] = a10; dest[5] = a11; dest[6] = a12; dest[7] = a13;
      dest[8] = a20; dest[9] = a21; dest[10] = a22; dest[11] = a23;
  
      dest[12] = a00 * x + a10 * y + a20 * z + mat[12];
      dest[13] = a01 * x + a11 * y + a21 * z + mat[13];
      dest[14] = a02 * x + a12 * y + a22 * z + mat[14];
      dest[15] = a03 * x + a13 * y + a23 * z + mat[15];
      return dest;
  };
  
  /**
   * Scales a matrix by the given vector
   *
   * _param {mat4} mat mat4 to scale
   * _param {vec3} vec vec3 specifying the scale for each axis
   * _param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   */
  mat4.scale = function (mat, vec, dest) {
      var x = vec[0], y = vec[1], z = vec[2];
  
      if (!dest || mat === dest) {
          mat[0] *= x;
          mat[1] *= x;
          mat[2] *= x;
          mat[3] *= x;
          mat[4] *= y;
          mat[5] *= y;
          mat[6] *= y;
          mat[7] *= y;
          mat[8] *= z;
          mat[9] *= z;
          mat[10] *= z;
          mat[11] *= z;
          return mat;
      }
  
      dest[0] = mat[0] * x;
      dest[1] = mat[1] * x;
      dest[2] = mat[2] * x;
      dest[3] = mat[3] * x;
      dest[4] = mat[4] * y;
      dest[5] = mat[5] * y;
      dest[6] = mat[6] * y;
      dest[7] = mat[7] * y;
      dest[8] = mat[8] * z;
      dest[9] = mat[9] * z;
      dest[10] = mat[10] * z;
      dest[11] = mat[11] * z;
      dest[12] = mat[12];
      dest[13] = mat[13];
      dest[14] = mat[14];
      dest[15] = mat[15];
      return dest;
  };
  
  /**
   * Rotates a matrix by the given angle around the specified axis
   * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
   *
   * _param {mat4} mat mat4 to rotate
   * _param {number} angle Angle (in radians) to rotate
   * _param {vec3} axis vec3 representing the axis to rotate around
   * _param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   */
  mat4.rotate = function (mat, angle, axis, dest) {
      var x = axis[0], y = axis[1], z = axis[2],
          len = Math.sqrt(x * x + y * y + z * z),
          s, c, t,
          a00, a01, a02, a03,
          a10, a11, a12, a13,
          a20, a21, a22, a23,
          b00, b01, b02,
          b10, b11, b12,
          b20, b21, b22;
  
      if (!len) { return null; }
      if (len !== 1) {
          len = 1 / len;
          x *= len;
          y *= len;
          z *= len;
      }
  
      s = Math.sin(angle);
      c = Math.cos(angle);
      t = 1 - c;
  
      a00 = mat[0]; a01 = mat[1]; a02 = mat[2]; a03 = mat[3];
      a10 = mat[4]; a11 = mat[5]; a12 = mat[6]; a13 = mat[7];
      a20 = mat[8]; a21 = mat[9]; a22 = mat[10]; a23 = mat[11];
  
      // Construct the elements of the rotation matrix
      b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
      b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
      b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;
  
      if (!dest) {
          dest = mat;
      } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      // Perform rotation-specific matrix multiplication
      dest[0] = a00 * b00 + a10 * b01 + a20 * b02;
      dest[1] = a01 * b00 + a11 * b01 + a21 * b02;
      dest[2] = a02 * b00 + a12 * b01 + a22 * b02;
      dest[3] = a03 * b00 + a13 * b01 + a23 * b02;
  
      dest[4] = a00 * b10 + a10 * b11 + a20 * b12;
      dest[5] = a01 * b10 + a11 * b11 + a21 * b12;
      dest[6] = a02 * b10 + a12 * b11 + a22 * b12;
      dest[7] = a03 * b10 + a13 * b11 + a23 * b12;
  
      dest[8] = a00 * b20 + a10 * b21 + a20 * b22;
      dest[9] = a01 * b20 + a11 * b21 + a21 * b22;
      dest[10] = a02 * b20 + a12 * b21 + a22 * b22;
      dest[11] = a03 * b20 + a13 * b21 + a23 * b22;
      return dest;
  };
  
  /**
   * Rotates a matrix by the given angle around the X axis
   *
   * _param {mat4} mat mat4 to rotate
   * _param {number} angle Angle (in radians) to rotate
   * _param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   */
  mat4.rotateX = function (mat, angle, dest) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a10 = mat[4],
          a11 = mat[5],
          a12 = mat[6],
          a13 = mat[7],
          a20 = mat[8],
          a21 = mat[9],
          a22 = mat[10],
          a23 = mat[11];
  
      if (!dest) {
          dest = mat;
      } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
          dest[0] = mat[0];
          dest[1] = mat[1];
          dest[2] = mat[2];
          dest[3] = mat[3];
  
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      // Perform axis-specific matrix multiplication
      dest[4] = a10 * c + a20 * s;
      dest[5] = a11 * c + a21 * s;
      dest[6] = a12 * c + a22 * s;
      dest[7] = a13 * c + a23 * s;
  
      dest[8] = a10 * -s + a20 * c;
      dest[9] = a11 * -s + a21 * c;
      dest[10] = a12 * -s + a22 * c;
      dest[11] = a13 * -s + a23 * c;
      return dest;
  };
  
  /**
   * Rotates a matrix by the given angle around the Y axis
   *
   * _param {mat4} mat mat4 to rotate
   * _param {number} angle Angle (in radians) to rotate
   * _param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   */
  mat4.rotateY = function (mat, angle, dest) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a00 = mat[0],
          a01 = mat[1],
          a02 = mat[2],
          a03 = mat[3],
          a20 = mat[8],
          a21 = mat[9],
          a22 = mat[10],
          a23 = mat[11];
  
      if (!dest) {
          dest = mat;
      } else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
          dest[4] = mat[4];
          dest[5] = mat[5];
          dest[6] = mat[6];
          dest[7] = mat[7];
  
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      // Perform axis-specific matrix multiplication
      dest[0] = a00 * c + a20 * -s;
      dest[1] = a01 * c + a21 * -s;
      dest[2] = a02 * c + a22 * -s;
      dest[3] = a03 * c + a23 * -s;
  
      dest[8] = a00 * s + a20 * c;
      dest[9] = a01 * s + a21 * c;
      dest[10] = a02 * s + a22 * c;
      dest[11] = a03 * s + a23 * c;
      return dest;
  };
  
  /**
   * Rotates a matrix by the given angle around the Z axis
   *
   * _param {mat4} mat mat4 to rotate
   * _param {number} angle Angle (in radians) to rotate
   * _param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
   */
  mat4.rotateZ = function (mat, angle, dest) {
      var s = Math.sin(angle),
          c = Math.cos(angle),
          a00 = mat[0],
          a01 = mat[1],
          a02 = mat[2],
          a03 = mat[3],
          a10 = mat[4],
          a11 = mat[5],
          a12 = mat[6],
          a13 = mat[7];
  
      if (!dest) {
          dest = mat;
      } else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
          dest[8] = mat[8];
          dest[9] = mat[9];
          dest[10] = mat[10];
          dest[11] = mat[11];
  
          dest[12] = mat[12];
          dest[13] = mat[13];
          dest[14] = mat[14];
          dest[15] = mat[15];
      }
  
      // Perform axis-specific matrix multiplication
      dest[0] = a00 * c + a10 * s;
      dest[1] = a01 * c + a11 * s;
      dest[2] = a02 * c + a12 * s;
      dest[3] = a03 * c + a13 * s;
  
      dest[4] = a00 * -s + a10 * c;
      dest[5] = a01 * -s + a11 * c;
      dest[6] = a02 * -s + a12 * c;
      dest[7] = a03 * -s + a13 * c;
  
      return dest;
  };
  
  /**
   * Generates a frustum matrix with the given bounds
   *
   * _param {number} left Left bound of the frustum
   * _param {number} right Right bound of the frustum
   * _param {number} bottom Bottom bound of the frustum
   * _param {number} top Top bound of the frustum
   * _param {number} near Near bound of the frustum
   * _param {number} far Far bound of the frustum
   * _param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * _returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.frustum = function (left, right, bottom, top, near, far, dest) {
      if (!dest) { dest = mat4.create(); }
      var rl = (right - left),
          tb = (top - bottom),
          fn = (far - near);
      dest[0] = (near * 2) / rl;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 0;
      dest[5] = (near * 2) / tb;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = (right + left) / rl;
      dest[9] = (top + bottom) / tb;
      dest[10] = -(far + near) / fn;
      dest[11] = -1;
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = -(far * near * 2) / fn;
      dest[15] = 0;
      return dest;
  };
  
  /**
   * Generates a perspective projection matrix with the given bounds
   *
   * _param {number} fovy Vertical field of view
   * _param {number} aspect Aspect ratio. typically viewport width/height
   * _param {number} near Near bound of the frustum
   * _param {number} far Far bound of the frustum
   * _param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * _returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.perspective = function (fovy, aspect, near, far, dest) {
      var top = near * Math.tan(fovy * Math.PI / 360.0),
          right = top * aspect;
      return mat4.frustum(-right, right, -top, top, near, far, dest);
  };
  
  /**
   * Generates a orthogonal projection matrix with the given bounds
   *
   * _param {number} left Left bound of the frustum
   * _param {number} right Right bound of the frustum
   * _param {number} bottom Bottom bound of the frustum
   * _param {number} top Top bound of the frustum
   * _param {number} near Near bound of the frustum
   * _param {number} far Far bound of the frustum
   * _param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * _returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.ortho = function (left, right, bottom, top, near, far, dest) {
      if (!dest) { dest = mat4.create(); }
      var rl = (right - left),
          tb = (top - bottom),
          fn = (far - near);
      dest[0] = 2 / rl;
      dest[1] = 0;
      dest[2] = 0;
      dest[3] = 0;
      dest[4] = 0;
      dest[5] = 2 / tb;
      dest[6] = 0;
      dest[7] = 0;
      dest[8] = 0;
      dest[9] = 0;
      dest[10] = -2 / fn;
      dest[11] = 0;
      dest[12] = -(left + right) / rl;
      dest[13] = -(top + bottom) / tb;
      dest[14] = -(far + near) / fn;
      dest[15] = 1;
      return dest;
  };
  
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis
   *
   * _param {vec3} eye Position of the viewer
   * _param {vec3} center Point the viewer is looking at
   * _param {vec3} up vec3 pointing "up"
   * _param {mat4} [dest] mat4 frustum matrix will be written into
   *
   * _returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.lookAt = function (eye, center, up, dest) {
      if (!dest) { dest = mat4.create(); }
  
      var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
          eyex = eye[0],
          eyey = eye[1],
          eyez = eye[2],
          upx = up[0],
          upy = up[1],
          upz = up[2],
          centerx = center[0],
          centery = center[1],
          centerz = center[2];
  
      if (eyex === centerx && eyey === centery && eyez === centerz) {
          return mat4.identity(dest);
      }
  
      //vec3.direction(eye, center, z);
      z0 = eyex - centerx;
      z1 = eyey - centery;
      z2 = eyez - centerz;
  
      // normalize (no check needed for 0 because of early return)
      len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
      z0 *= len;
      z1 *= len;
      z2 *= len;
  
      //vec3.normalize(vec3.cross(up, z, x));
      x0 = upy * z2 - upz * z1;
      x1 = upz * z0 - upx * z2;
      x2 = upx * z1 - upy * z0;
      len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
      if (!len) {
          x0 = 0;
          x1 = 0;
          x2 = 0;
      } else {
          len = 1 / len;
          x0 *= len;
          x1 *= len;
          x2 *= len;
      }
  
      //vec3.normalize(vec3.cross(z, x, y));
      y0 = z1 * x2 - z2 * x1;
      y1 = z2 * x0 - z0 * x2;
      y2 = z0 * x1 - z1 * x0;
  
      len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
      if (!len) {
          y0 = 0;
          y1 = 0;
          y2 = 0;
      } else {
          len = 1 / len;
          y0 *= len;
          y1 *= len;
          y2 *= len;
      }
  
      dest[0] = x0;
      dest[1] = y0;
      dest[2] = z0;
      dest[3] = 0;
      dest[4] = x1;
      dest[5] = y1;
      dest[6] = z1;
      dest[7] = 0;
      dest[8] = x2;
      dest[9] = y2;
      dest[10] = z2;
      dest[11] = 0;
      dest[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
      dest[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
      dest[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
      dest[15] = 1;
  
      return dest;
  };
  
  /**
   * Creates a matrix from a quaternion rotation and vector translation
   * This is equivalent to (but much faster than):
   *
   *     mat4.identity(dest);
   *     mat4.translate(dest, vec);
   *     var quatMat = mat4.create();
   *     quat4.toMat4(quat, quatMat);
   *     mat4.multiply(dest, quatMat);
   *
   * _param {quat4} quat Rotation quaternion
   * _param {vec3} vec Translation vector
   * _param {mat4} [dest] mat4 receiving operation result. If not specified result is written to a new mat4
   *
   * _returns {mat4} dest if specified, a new mat4 otherwise
   */
  mat4.fromRotationTranslation = function (quat, vec, dest) {
      if (!dest) { dest = mat4.create(); }
  
      // Quaternion math
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
          x2 = x + x,
          y2 = y + y,
          z2 = z + z,
  
          xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;
  
      dest[0] = 1 - (yy + zz);
      dest[1] = xy + wz;
      dest[2] = xz - wy;
      dest[3] = 0;
      dest[4] = xy - wz;
      dest[5] = 1 - (xx + zz);
      dest[6] = yz + wx;
      dest[7] = 0;
      dest[8] = xz + wy;
      dest[9] = yz - wx;
      dest[10] = 1 - (xx + yy);
      dest[11] = 0;
      dest[12] = vec[0];
      dest[13] = vec[1];
      dest[14] = vec[2];
      dest[15] = 1;
  
      return dest;
  };
  
  /**
   * Returns a string representation of a mat4
   *
   * _param {mat4} mat mat4 to represent as a string
   *
   * _returns {string} String representation of mat
   */
  mat4.str = function (mat) {
      return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] +
          ', ' + mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] +
          ', ' + mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] +
          ', ' + mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
  };
  
  /*
   * quat4
   */
  
  /**
   * Creates a new instance of a quat4 using the default array type
   * Any javascript array containing at least 4 numeric elements can serve as a quat4
   *
   * _param {quat4} [quat] quat4 containing values to initialize with
   *
   * _returns {quat4} New quat4
   */
  quat4.create = function (quat) {
      var dest = new MatrixArray(4);
  
      if (quat) {
          dest[0] = quat[0];
          dest[1] = quat[1];
          dest[2] = quat[2];
          dest[3] = quat[3];
      }
  
      return dest;
  };
  
  /**
   * Copies the values of one quat4 to another
   *
   * _param {quat4} quat quat4 containing values to copy
   * _param {quat4} dest quat4 receiving copied values
   *
   * _returns {quat4} dest
   */
  quat4.set = function (quat, dest) {
      dest[0] = quat[0];
      dest[1] = quat[1];
      dest[2] = quat[2];
      dest[3] = quat[3];
  
      return dest;
  };
  
  /**
   * Calculates the W component of a quat4 from the X, Y, and Z components.
   * Assumes that quaternion is 1 unit in length.
   * Any existing W component will be ignored.
   *
   * _param {quat4} quat quat4 to calculate W component of
   * _param {quat4} [dest] quat4 receiving calculated values. If not specified result is written to quat
   *
   * _returns {quat4} dest if specified, quat otherwise
   */
  quat4.calculateW = function (quat, dest) {
      var x = quat[0], y = quat[1], z = quat[2];
  
      if (!dest || quat === dest) {
          quat[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
          return quat;
      }
      dest[0] = x;
      dest[1] = y;
      dest[2] = z;
      dest[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
      return dest;
  };
  
  /**
   * Calculates the dot product of two quaternions
   *
   * _param {quat4} quat First operand
   * _param {quat4} quat2 Second operand
   *
   * @return {number} Dot product of quat and quat2
   */
  quat4.dot = function(quat, quat2){
      return quat[0]*quat2[0] + quat[1]*quat2[1] + quat[2]*quat2[2] + quat[3]*quat2[3];
  };
  
  /**
   * Calculates the inverse of a quat4
   *
   * _param {quat4} quat quat4 to calculate inverse of
   * _param {quat4} [dest] quat4 receiving inverse values. If not specified result is written to quat
   *
   * _returns {quat4} dest if specified, quat otherwise
   */
  quat4.inverse = function(quat, dest) {
      var q0 = quat[0], q1 = quat[1], q2 = quat[2], q3 = quat[3],
          dot = q0*q0 + q1*q1 + q2*q2 + q3*q3,
          invDot = dot ? 1.0/dot : 0;
  
      // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
  
      if(!dest || quat === dest) {
          quat[0] *= -invDot;
          quat[1] *= -invDot;
          quat[2] *= -invDot;
          quat[3] *= invDot;
          return quat;
      }
      dest[0] = -quat[0]*invDot;
      dest[1] = -quat[1]*invDot;
      dest[2] = -quat[2]*invDot;
      dest[3] = quat[3]*invDot;
      return dest;
  };
  
  
  /**
   * Calculates the conjugate of a quat4
   * If the quaternion is normalized, this function is faster than quat4.inverse and produces the same result.
   *
   * _param {quat4} quat quat4 to calculate conjugate of
   * _param {quat4} [dest] quat4 receiving conjugate values. If not specified result is written to quat
   *
   * _returns {quat4} dest if specified, quat otherwise
   */
  quat4.conjugate = function (quat, dest) {
      if (!dest || quat === dest) {
          quat[0] *= -1;
          quat[1] *= -1;
          quat[2] *= -1;
          return quat;
      }
      dest[0] = -quat[0];
      dest[1] = -quat[1];
      dest[2] = -quat[2];
      dest[3] = quat[3];
      return dest;
  };
  
  /**
   * Calculates the length of a quat4
   *
   * Params:
   * _param {quat4} quat quat4 to calculate length of
   *
   * _returns Length of quat
   */
  quat4.length = function (quat) {
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3];
      return Math.sqrt(x * x + y * y + z * z + w * w);
  };
  
  /**
   * Generates a unit quaternion of the same direction as the provided quat4
   * If quaternion length is 0, returns [0, 0, 0, 0]
   *
   * _param {quat4} quat quat4 to normalize
   * _param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * _returns {quat4} dest if specified, quat otherwise
   */
  quat4.normalize = function (quat, dest) {
      if (!dest) { dest = quat; }
  
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
          len = Math.sqrt(x * x + y * y + z * z + w * w);
      if (len === 0) {
          dest[0] = 0;
          dest[1] = 0;
          dest[2] = 0;
          dest[3] = 0;
          return dest;
      }
      len = 1 / len;
      dest[0] = x * len;
      dest[1] = y * len;
      dest[2] = z * len;
      dest[3] = w * len;
  
      return dest;
  };
  
  /**
   * Performs quaternion addition
   *
   * _param {quat4} quat First operand
   * _param {quat4} quat2 Second operand
   * _param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * _returns {quat4} dest if specified, quat otherwise
   */
  quat4.add = function (quat, quat2, dest) {
      if(!dest || quat === dest) {
          quat[0] += quat2[0];
          quat[1] += quat2[1];
          quat[2] += quat2[2];
          quat[3] += quat2[3];
          return quat;
      }
      dest[0] = quat[0]+quat2[0];
      dest[1] = quat[1]+quat2[1];
      dest[2] = quat[2]+quat2[2];
      dest[3] = quat[3]+quat2[3];
      return dest;
  };
  
  /**
   * Performs a quaternion multiplication
   *
   * _param {quat4} quat First operand
   * _param {quat4} quat2 Second operand
   * _param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * _returns {quat4} dest if specified, quat otherwise
   */
  quat4.multiply = function (quat, quat2, dest) {
      if (!dest) { dest = quat; }
  
      var qax = quat[0], qay = quat[1], qaz = quat[2], qaw = quat[3],
          qbx = quat2[0], qby = quat2[1], qbz = quat2[2], qbw = quat2[3];
  
      dest[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      dest[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      dest[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      dest[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
  
      return dest;
  };
  
  /**
   * Transforms a vec3 with the given quaternion
   *
   * _param {quat4} quat quat4 to transform the vector with
   * _param {vec3} vec vec3 to transform
   * _param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
   *
   * _returns dest if specified, vec otherwise
   */
  quat4.multiplyVec3 = function (quat, vec, dest) {
      if (!dest) { dest = vec; }
  
      var x = vec[0], y = vec[1], z = vec[2],
          qx = quat[0], qy = quat[1], qz = quat[2], qw = quat[3],
  
          // calculate quat * vec
          ix = qw * x + qy * z - qz * y,
          iy = qw * y + qz * x - qx * z,
          iz = qw * z + qx * y - qy * x,
          iw = -qx * x - qy * y - qz * z;
  
      // calculate result * inverse quat
      dest[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      dest[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      dest[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  
      return dest;
  };
  
  /**
   * Multiplies the components of a quaternion by a scalar value
   *
   * _param {quat4} quat to scale
   * _param {number} val Value to scale by
   * _param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * _returns {quat4} dest if specified, quat otherwise
   */
  quat4.scale = function (quat, val, dest) {
      if(!dest || quat === dest) {
          quat[0] *= val;
          quat[1] *= val;
          quat[2] *= val;
          quat[3] *= val;
          return quat;
      }
      dest[0] = quat[0]*val;
      dest[1] = quat[1]*val;
      dest[2] = quat[2]*val;
      dest[3] = quat[3]*val;
      return dest;
  };
  
  /**
   * Calculates a 3x3 matrix from the given quat4
   *
   * _param {quat4} quat quat4 to create matrix from
   * _param {mat3} [dest] mat3 receiving operation result
   *
   * _returns {mat3} dest if specified, a new mat3 otherwise
   */
  quat4.toMat3 = function (quat, dest) {
      if (!dest) { dest = mat3.create(); }
  
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
          x2 = x + x,
          y2 = y + y,
          z2 = z + z,
  
          xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;
  
      dest[0] = 1 - (yy + zz);
      dest[1] = xy + wz;
      dest[2] = xz - wy;
  
      dest[3] = xy - wz;
      dest[4] = 1 - (xx + zz);
      dest[5] = yz + wx;
  
      dest[6] = xz + wy;
      dest[7] = yz - wx;
      dest[8] = 1 - (xx + yy);
  
      return dest;
  };
  
  /**
   * Calculates a 4x4 matrix from the given quat4
   *
   * _param {quat4} quat quat4 to create matrix from
   * _param {mat4} [dest] mat4 receiving operation result
   *
   * _returns {mat4} dest if specified, a new mat4 otherwise
   */
  quat4.toMat4 = function (quat, dest) {
      if (!dest) { dest = mat4.create(); }
  
      var x = quat[0], y = quat[1], z = quat[2], w = quat[3],
          x2 = x + x,
          y2 = y + y,
          z2 = z + z,
  
          xx = x * x2,
          xy = x * y2,
          xz = x * z2,
          yy = y * y2,
          yz = y * z2,
          zz = z * z2,
          wx = w * x2,
          wy = w * y2,
          wz = w * z2;
  
      dest[0] = 1 - (yy + zz);
      dest[1] = xy + wz;
      dest[2] = xz - wy;
      dest[3] = 0;
  
      dest[4] = xy - wz;
      dest[5] = 1 - (xx + zz);
      dest[6] = yz + wx;
      dest[7] = 0;
  
      dest[8] = xz + wy;
      dest[9] = yz - wx;
      dest[10] = 1 - (xx + yy);
      dest[11] = 0;
  
      dest[12] = 0;
      dest[13] = 0;
      dest[14] = 0;
      dest[15] = 1;
  
      return dest;
  };
  
  /**
   * Performs a spherical linear interpolation between two quat4
   *
   * _param {quat4} quat First quaternion
   * _param {quat4} quat2 Second quaternion
   * _param {number} slerp Interpolation amount between the two inputs
   * _param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
   *
   * _returns {quat4} dest if specified, quat otherwise
   */
  quat4.slerp = function (quat, quat2, slerp, dest) {
      if (!dest) { dest = quat; }
  
      var cosHalfTheta = quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3],
          halfTheta,
          sinHalfTheta,
          ratioA,
          ratioB;
  
      if (Math.abs(cosHalfTheta) >= 1.0) {
          if (dest !== quat) {
              dest[0] = quat[0];
              dest[1] = quat[1];
              dest[2] = quat[2];
              dest[3] = quat[3];
          }
          return dest;
      }
  
      halfTheta = Math.acos(cosHalfTheta);
      sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
  
      if (Math.abs(sinHalfTheta) < 0.001) {
          dest[0] = (quat[0] * 0.5 + quat2[0] * 0.5);
          dest[1] = (quat[1] * 0.5 + quat2[1] * 0.5);
          dest[2] = (quat[2] * 0.5 + quat2[2] * 0.5);
          dest[3] = (quat[3] * 0.5 + quat2[3] * 0.5);
          return dest;
      }
  
      ratioA = Math.sin((1 - slerp) * halfTheta) / sinHalfTheta;
      ratioB = Math.sin(slerp * halfTheta) / sinHalfTheta;
  
      dest[0] = (quat[0] * ratioA + quat2[0] * ratioB);
      dest[1] = (quat[1] * ratioA + quat2[1] * ratioB);
      dest[2] = (quat[2] * ratioA + quat2[2] * ratioB);
      dest[3] = (quat[3] * ratioA + quat2[3] * ratioB);
  
      return dest;
  };
  
  /**
   * Returns a string representation of a quaternion
   *
   * _param {quat4} quat quat4 to represent as a string
   *
   * _returns {string} String representation of quat
   */
  quat4.str = function (quat) {
      return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']';
  };
  
  
  return {
    vec3: vec3,
    mat3: mat3,
    mat4: mat4,
    quat4: quat4
  };
  
  })();
  
  ;
  
  var GLImmediateSetup = {
  };
  var _glBegin = (mode) => {
      // Push the old state:
      GLImmediate.enabledClientAttributes_preBegin = GLImmediate.enabledClientAttributes;
      GLImmediate.enabledClientAttributes = [];
  
      GLImmediate.clientAttributes_preBegin = GLImmediate.clientAttributes;
      GLImmediate.clientAttributes = []
      for (var i = 0; i < GLImmediate.clientAttributes_preBegin.length; i++) {
        GLImmediate.clientAttributes.push({});
      }
  
      if (Module._muBatchOpen && !Module._muBatchDrawing && Module._mu_mesh_flush) {
        Module._muBatchDrawing = 1;
        Module._mu_mesh_flush();
        Module._muBatchDrawing = 0;
      }
      GLImmediate.mode = mode;
      GLImmediate.vertexCounter = 0;
      GLImmediate.muColorArmed = false;
      GLImmediate.muColorFirst = false;
      GLImmediate.muColorThisVertex = false;
      var components = GLImmediate.rendererComponents = [];
      for (var i = 0; i < GLImmediate.NUM_ATTRIBUTES; i++) {
        components[i] = 0;
      }
      GLImmediate.rendererComponentPointer = 0;
      GLImmediate.vertexData = GLImmediate.tempData;
    };

  var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };

  var _glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);

  var _glClear = (x0) => GLctx.clear(x0);

  var _glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);

  var _glColor4f = (r, g, b, a) => {
      r = Math.max(Math.min(r, 1), 0);
      g = Math.max(Math.min(g, 1), 0);
      b = Math.max(Math.min(b, 1), 0);
      a = Math.max(Math.min(a, 1), 0);
  
      // TODO: make ub the default, not f, save a few mathops
      if (GLImmediate.mode >= 0) {
        var start = GLImmediate.vertexCounter << 2;
        GLImmediate.vertexDataU8[start + 0] = r * 255;
        GLImmediate.vertexDataU8[start + 1] = g * 255;
        GLImmediate.vertexDataU8[start + 2] = b * 255;
        GLImmediate.vertexDataU8[start + 3] = a * 255;
        GLImmediate.vertexCounter++;
        if (!GLImmediate.rendererComponents[GLImmediate.COLOR]) {
          GLImmediate.muColorFirst = GLImmediate.rendererComponentPointer === 0;
        }
        GLImmediate.clientColor[0] = r;
        GLImmediate.clientColor[1] = g;
        GLImmediate.clientColor[2] = b;
        GLImmediate.clientColor[3] = a;
        GLImmediate.muColorArmed = true;
        GLImmediate.muColorThisVertex = true;
        GLImmediate.addRendererComponent(GLImmediate.COLOR, 4, GLctx.UNSIGNED_BYTE);
      } else {
        GLImmediate.clientColor[0] = r;
        GLImmediate.clientColor[1] = g;
        GLImmediate.clientColor[2] = b;
        GLImmediate.clientColor[3] = a;
        GLctx.vertexAttrib4fv(GLImmediate.COLOR, GLImmediate.clientColor);
      }
    };
  var _glColor3f = (r, g, b) => _glColor4f(r, g, b, 1);

  var _glColor3fv = (p) => _glColor3f(HEAPF32[((p)>>2)],
                                  HEAPF32[(((p)+(4))>>2)],
                                  HEAPF32[(((p)+(8))>>2)]);


  var _glColor4fv = (p) => _glColor4f(HEAPF32[((p)>>2)],
                                  HEAPF32[(((p)+(4))>>2)],
                                  HEAPF32[(((p)+(8))>>2)],
                                  HEAPF32[(((p)+(12))>>2)]);

  var _glColor4ub = (r, g, b, a) => _glColor4f((r&255)/255, (g&255)/255, (b&255)/255, (a&255)/255);

  var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        // GL spec: "glDeleteTextures silently ignores 0s and names that do not
        // correspond to existing textures".
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };

  var _glDepthFunc = (x0) => GLctx.depthFunc(x0);

  var _glDepthMask = (flag) => {
      GLctx.depthMask(!!flag);
    };



  var _glEnd = () => {
      GLImmediate.prepareClientAttributes(GLImmediate.rendererComponents[GLImmediate.VERTEX], true);
      GLImmediate.firstVertex = 0;
      GLImmediate.lastVertex = GLImmediate.vertexCounter / (GLImmediate.stride >> 2);
      GLImmediate.flush();
      GLImmediate.disableBeginEndClientAttributes();
      GLImmediate.mode = -1;
  
      // Pop the old state:
      GLImmediate.enabledClientAttributes = GLImmediate.enabledClientAttributes_preBegin;
      GLImmediate.clientAttributes = GLImmediate.clientAttributes_preBegin;
      GLImmediate.currentRenderer = null; // The set of active client attributes changed, we must re-lookup the renderer to use.
      GLImmediate.modifiedClientAttributes = true;
    };

  var _glFlush = () => GLctx.flush();

  var _glFogf = (pname, param) => { // partial support, TODO
      switch (pname) {
        case 0xB63: // GL_FOG_START
          GLEmulation.fogStart = param; break;
        case 0xB64: // GL_FOG_END
          GLEmulation.fogEnd = param; break;
        case 0xB62: // GL_FOG_DENSITY
          GLEmulation.fogDensity = param; break;
        case 0xB65: // GL_FOG_MODE
          switch (param) {
            case 0x801: // GL_EXP2
            case 0x2601: // GL_LINEAR
              if (GLEmulation.fogMode != param) {
                GLImmediate.currentRenderer = null; // Fog mode is part of the FFP shader state, we must re-lookup the renderer to use.
                GLEmulation.fogMode = param;
              }
              break;
            default: // default to GL_EXP
              if (GLEmulation.fogMode != 0x800 /* GL_EXP */) {
                GLImmediate.currentRenderer = null; // Fog mode is part of the FFP shader state, we must re-lookup the renderer to use.
                GLEmulation.fogMode = 0x800 /* GL_EXP */;
              }
              break;
          }
          break;
      }
    };

  var _glFogfv = (pname, param) => { // partial support, TODO
      switch (pname) {
        case 0xB66: // GL_FOG_COLOR
          GLEmulation.fogColor[0] = HEAPF32[((param)>>2)];
          GLEmulation.fogColor[1] = HEAPF32[(((param)+(4))>>2)];
          GLEmulation.fogColor[2] = HEAPF32[(((param)+(8))>>2)];
          GLEmulation.fogColor[3] = HEAPF32[(((param)+(12))>>2)];
          break;
        case 0xB63: // GL_FOG_START
        case 0xB64: // GL_FOG_END
          _glFogf(pname, HEAPF32[((param)>>2)]); break;
      }
    };

  var _glFogi = (pname, param) => {
      return _glFogf(pname, param);
    };

  var _glGenTextures = (n, textures) => {
      GL.genObject(n, textures, 'createTexture', GL.textures
        );
    };

  var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0/*GL_NO_ERROR*/;
      return error;
    };




  
  var _glLoadIdentity = () => {
      if (Module._muBatchOpen && !Module._muBatchDrawing && Module._mu_mesh_flush) {
        Module._muBatchDrawing = 1;
        Module._mu_mesh_flush();
        Module._muBatchDrawing = 0;
      }
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrixLib.mat4.identity(GLImmediate.matrix[GLImmediate.currentMatrix]);
    };

  
  var _glMatrixMode = (mode) => {
      if (mode == 0x1700 /* GL_MODELVIEW */) {
        GLImmediate.currentMatrix = 0/*m*/;
      } else if (mode == 0x1701 /* GL_PROJECTION */) {
        GLImmediate.currentMatrix = 1/*p*/;
      } else if (mode == 0x1702) { // GL_TEXTURE
        GLImmediate.useTextureMatrix = true;
        GLImmediate.currentMatrix = 2/*t*/ + GLImmediate.TexEnvJIT.getActiveTexture();
      } else {
        throw `Wrong mode ${mode} passed to glMatrixMode`;
      }
    };

  var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };

  var _glPopMatrix = () => {
      if (GLImmediate.matrixStack[GLImmediate.currentMatrix].length == 0) {
        GL.recordError(0x504/*GL_STACK_UNDERFLOW*/);
        return;
      }
      if (Module._muBatchOpen && !Module._muBatchDrawing && Module._mu_mesh_flush) {
        Module._muBatchDrawing = 1;
        Module._mu_mesh_flush();
        Module._muBatchDrawing = 0;
      }
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrix[GLImmediate.currentMatrix] = GLImmediate.matrixStack[GLImmediate.currentMatrix].pop();
    };

  var _glPushMatrix = () => {
      if (Module._muBatchOpen && !Module._muBatchDrawing && Module._mu_mesh_flush) {
        Module._muBatchDrawing = 1;
        Module._mu_mesh_flush();
        Module._muBatchDrawing = 0;
      }
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrixStack[GLImmediate.currentMatrix].push(
          Array.prototype.slice.call(GLImmediate.matrix[GLImmediate.currentMatrix]));
    };

  var heapObjectForWebGLType = (type) => {
      // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
      // smaller values for the heap, for shorter generated code size.
      // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
      // (since most types are HEAPU16)
      type -= 0x1400;
      if (type == 0) return HEAP8;
  
      if (type == 1) return HEAPU8;
  
      if (type == 2) return HEAP16;
  
      if (type == 4) return HEAP32;
  
      if (type == 6) return HEAPF32;
  
      if (type == 5
        || type == 28922
        || type == 28520
        || type == 30779
        || type == 30782
        )
        return HEAPU32;
  
      return HEAPU16;
    };
  
  var toTypedArrayIndex = (pointer, heap) =>
      pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
  
  var _glReadPixels = (x, y, width, height, format, type, pixels) => {
      if (true) {
        if (GLctx.currentPixelPackBufferBinding) {
          GLctx.readPixels(x, y, width, height, format, type, pixels);
          return;
        }
        var heap = heapObjectForWebGLType(type);
        var target = toTypedArrayIndex(pixels, heap);
        GLctx.readPixels(x, y, width, height, format, type, heap, target);
        return;
      }
    };

  /** @suppress {duplicate } */
  var _glRotated = (angle, x, y, z) => {
      if (Module._muBatchOpen && !Module._muBatchDrawing && Module._mu_mesh_flush) {
        Module._muBatchDrawing = 1;
        Module._mu_mesh_flush();
        Module._muBatchDrawing = 0;
      }
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrixLib.mat4.rotate(GLImmediate.matrix[GLImmediate.currentMatrix], angle*Math.PI/180, [x, y, z]);
    };
  var _glRotatef = _glRotated;

  var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

  /** @suppress {duplicate } */
  var muEmitRepeatColor = () => {
      if (!GLImmediate.muColorArmed || !GLImmediate.muColorFirst || GLImmediate.muColorThisVertex) return;
      var start = GLImmediate.vertexCounter << 2;
      var c = GLImmediate.clientColor;
      GLImmediate.vertexDataU8[start + 0] = c[0] * 255;
      GLImmediate.vertexDataU8[start + 1] = c[1] * 255;
      GLImmediate.vertexDataU8[start + 2] = c[2] * 255;
      GLImmediate.vertexDataU8[start + 3] = c[3] * 255;
      GLImmediate.vertexCounter++;
      GLImmediate.muColorThisVertex = true;
    };
  var _glTexCoord2i = (u, v) => {
      assert(GLImmediate.mode >= 0); // must be in begin/end
      muEmitRepeatColor();
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = u;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = v;
      GLImmediate.addRendererComponent(GLImmediate.TEXTURE0, 2, GLctx.FLOAT);
    };
  var _glTexCoord2f = _glTexCoord2i;

  var _glTexEnvf = (target, pname, params) => warnOnce('glTexEnvf: TODO');

  var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
      return height * alignedRowSize;
    };
  
  var colorChannelsInGlTextureFormat = (format) => {
      // Micro-optimizations for size: map format to size by subtracting smallest
      // enum value (0x1902) from all values first.  Also omit the most common
      // size value (1) from the list, which is assumed by formats not on the
      // list.
      var colorChannels = {
        // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
        // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
        5: 3,
        6: 4,
        // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
        8: 2,
        29502: 3,
        29504: 4,
        // 0x1903 /* GL_RED */ - 0x1902: 1,
        26917: 2,
        26918: 2,
        // 0x8D94 /* GL_RED_INTEGER */ - 0x1902: 1,
        29846: 3,
        29847: 4
      };
      return colorChannels[format - 0x1902]||1;
    };
  
  
  
  var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
      var heap = heapObjectForWebGLType(type);
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
      return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
    };
  
  
  
  var muGlFormat = (fmt) => {
      if (fmt == 4) return 0x1908;
      return fmt;
    };
  var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
      internalFormat = muGlFormat(internalFormat);
      format = muGlFormat(format);
      if (true) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
          return;
        }
        if (pixels) {
          var heap = heapObjectForWebGLType(type);
          var index = toTypedArrayIndex(pixels, heap);
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
          return;
        }
      }
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
    };

  var _glTexParameterfv = (target, pname, params) => {
      if (pname == 0x1004) return;
      var param = HEAPF32[((params)>>2)];
      if (param == 0x2900 || param == 0x812D) param = 0x812F;
      GLctx.texParameterf(target, pname, param);
    };

  var _glTexParameteri = (x0, x1, x2) => {
      if (x1 == 0x1004) return;
      if (x2 == 0x2900 || x2 == 0x812D) x2 = 0x812F;
      GLctx.texParameteri(x0, x1, x2);
    };

  /** @suppress {duplicate } */
  var _glTranslated = (x, y, z) => {
      if (Module._muBatchOpen && !Module._muBatchDrawing && Module._mu_mesh_flush) {
        Module._muBatchDrawing = 1;
        Module._mu_mesh_flush();
        Module._muBatchDrawing = 0;
      }
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrixLib.mat4.translate(GLImmediate.matrix[GLImmediate.currentMatrix], [x, y, z]);
    };
  var _glTranslatef = _glTranslated;

  var _glVertex2f = (x, y) => {
      assert(GLImmediate.mode >= 0); // must be in begin/end
      muEmitRepeatColor();
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = x;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = y;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = 0;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = 1;
      assert(GLImmediate.vertexCounter << 2 < GL.MAX_TEMP_BUFFER_SIZE);
      GLImmediate.addRendererComponent(GLImmediate.VERTEX, 4, GLctx.FLOAT);
      GLImmediate.muColorThisVertex = false;
    };

  var _glVertex3f = (x, y, z) => {
      assert(GLImmediate.mode >= 0); // must be in begin/end
      muEmitRepeatColor();
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = x;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = y;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = z;
      GLImmediate.vertexData[GLImmediate.vertexCounter++] = 1;
      assert(GLImmediate.vertexCounter << 2 < GL.MAX_TEMP_BUFFER_SIZE);
      GLImmediate.addRendererComponent(GLImmediate.VERTEX, 4, GLctx.FLOAT);
      GLImmediate.muColorThisVertex = false;
    };

  var _glVertex3fv = (p) => _glVertex3f(HEAPF32[((p)>>2)],
                                    HEAPF32[(((p)+(4))>>2)],
                                    HEAPF32[(((p)+(8))>>2)]);

  var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);

  var _glOrtho = (left, right, bottom, top_, nearVal, farVal) => {
      if (Module._muBatchOpen && !Module._muBatchDrawing && Module._mu_mesh_flush) {
        Module._muBatchDrawing = 1;
        Module._mu_mesh_flush();
        Module._muBatchDrawing = 0;
      }
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrixLib.mat4.multiply(GLImmediate.matrix[GLImmediate.currentMatrix],
          GLImmediate.matrixLib.mat4.ortho(left, right, bottom, top_, nearVal, farVal));
    };
  var _gluOrtho2D = (left, right, bottom, top) => _glOrtho(left, right, bottom, top, -1, 1);

  var _gluPerspective = (fov, aspect, near, far) => {
      if (Module._muBatchOpen && !Module._muBatchDrawing && Module._mu_mesh_flush) {
        Module._muBatchDrawing = 1;
        Module._mu_mesh_flush();
        Module._muBatchDrawing = 0;
      }
      GLImmediate.matricesModified = true;
      GLImmediate.matrixVersion[GLImmediate.currentMatrix] = (GLImmediate.matrixVersion[GLImmediate.currentMatrix] + 1)|0;
      GLImmediate.matrix[GLImmediate.currentMatrix] =
        GLImmediate.matrixLib.mat4.perspective(fov, aspect, near, far,
                                                 GLImmediate.matrix[GLImmediate.currentMatrix]);
    };



  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        /** @suppress {checkTypes} */
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      /** @suppress {checkTypes} */
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };



  var FS_createPath = (...args) => FS.createPath(...args);



  var FS_unlink = (...args) => FS.unlink(...args);

  var FS_createLazyFile = (...args) => FS.createLazyFile(...args);

  var FS_createDevice = (...args) => FS.createDevice(...args);

  FS.createPreloadedFile = FS_createPreloadedFile;
  FS.staticInit();;

      Module['requestAnimationFrame'] = MainLoop.requestAnimationFrame;
      Module['pauseMainLoop'] = MainLoop.pause;
      Module['resumeMainLoop'] = MainLoop.resume;
      MainLoop.init();;

      // Signal GL rendering layer that processing of a new frame is about to
      // start. This helps it optimize VBO double-buffering and reduce GPU stalls.
      registerPreMainLoop(() => GL.newRenderingFrameStarted());
    ;
GLImmediate.setupFuncs(); Browser.moduleContextCreatedCallbacks.push(() => GLImmediate.init());;
/**@suppress {duplicate, undefinedVars}*/var _emscripten_glDrawArrays;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glDrawElements;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glActiveTexture;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glEnable;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glDisable;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glTexEnvf;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glTexEnvi;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glTexEnvfv;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glGetIntegerv;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glIsEnabled;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glGetBooleanv;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glGetString;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glCreateShader;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glShaderSource;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glCompileShader;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glAttachShader;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glDetachShader;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glUseProgram;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glDeleteProgram;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glBindAttribLocation;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glLinkProgram;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glBindBuffer;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glGetFloatv;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glHint;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glEnableVertexAttribArray;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glDisableVertexAttribArray;/**@suppress {duplicate, undefinedVars}*/var _emscripten_glVertexAttribPointer;/**@suppress {duplicate, undefinedVars}*/var _glTexEnvf;/**@suppress {duplicate, undefinedVars}*/var _glTexEnvi;/**@suppress {duplicate, undefinedVars}*/var _glTexEnvfv;/**@suppress {duplicate, undefinedVars}*/var _glGetTexEnviv;/**@suppress {duplicate, undefinedVars}*/var _glGetTexEnvfv;GLEmulation.init();;
// End JS library code

// include: postlibrary.js
// This file is included after the automatically-generated JS library code
// but before the wasm module is created.

{

  // Begin ATMODULES hooks
  if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];
if (Module['preloadPlugins']) preloadPlugins = Module['preloadPlugins'];
if (Module['print']) out = Module['print'];
if (Module['printErr']) err = Module['printErr'];
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];
  // End ATMODULES hooks

  checkIncomingModuleAPI();

  if (Module['arguments']) arguments_ = Module['arguments'];
  if (Module['thisProgram']) thisProgram = Module['thisProgram'];

  // Assertions on removed incoming Module JS APIs.
  assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
  assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
  assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
  assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
  assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
  assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
  assert(typeof Module['ENVIRONMENT'] == 'undefined', 'Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
  assert(typeof Module['STACK_SIZE'] == 'undefined', 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')
  // If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
  assert(typeof Module['wasmMemory'] == 'undefined', 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
  assert(typeof Module['INITIAL_MEMORY'] == 'undefined', 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

}

// Begin runtime exports
  Module['addRunDependency'] = addRunDependency;
  Module['removeRunDependency'] = removeRunDependency;
  Module['FS_createPreloadedFile'] = FS_createPreloadedFile;
  Module['FS_unlink'] = FS_unlink;
  Module['FS_createPath'] = FS_createPath;
  Module['FS_createDevice'] = FS_createDevice;
  Module['FS_createDataFile'] = FS_createDataFile;
  Module['FS_createLazyFile'] = FS_createLazyFile;
  var missingLibrarySymbols = [
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'convertI32PairToI53',
  'convertI32PairToI53Checked',
  'convertU32PairToI53',
  'stackAlloc',
  'getTempRet0',
  'setTempRet0',
  'zeroMemory',
  'getHeapMax',
  'growMemory',
  'withStackSave',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'emscriptenLog',
  'runMainThreadEmAsm',
  'jstoi_q',
  'autoResumeAudioContext',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'asmjsMangle',
  'alignMemory',
  'HandleAllocator',
  'getNativeTypeSize',
  'addOnInit',
  'addOnPostCtor',
  'addOnPreMain',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'setImmediateWrapped',
  'safeRequestAnimationFrame',
  'clearImmediateWrapped',
  'registerPostMainLoop',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'FS_mkdirTree',
  '_setNetworkCallback',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'emscriptenWebGLGetIndexed',
  'emulGlGenVertexArrays',
  'emulGlDeleteVertexArrays',
  'emulGlIsVertexArray',
  'emulGlBindVertexArray',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'demangle',
  'stackTrace',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

  var unexportedSymbols = [
  'run',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'HEAPF32',
  'HEAPF64',
  'HEAP8',
  'HEAP16',
  'HEAPU16',
  'HEAP32',
  'HEAPU32',
  'HEAP64',
  'HEAPU64',
  'writeStackCookie',
  'checkStackCookie',
  'writeI53ToI64',
  'readI53FromI64',
  'readI53FromU64',
  'INT53_MAX',
  'INT53_MIN',
  'bigintToI53Checked',
  'stackSave',
  'stackRestore',
  'ptrToString',
  'exitJS',
  'abortOnCannotGrowMemory',
  'ENV',
  'ERRNO_CODES',
  'strError',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'readEmAsmArgs',
  'runEmAsmFunction',
  'getExecutableName',
  'handleException',
  'keepRuntimeAlive',
  'callUserCallback',
  'maybeExit',
  'asyncLoad',
  'mmapAlloc',
  'wasmTable',
  'getUniqueRunDependency',
  'noExitRuntime',
  'addOnPreRun',
  'addOnExit',
  'addOnPostRun',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'intArrayFromString',
  'UTF16Decoder',
  'stringToNewUTF8',
  'JSEvents',
  'registerKeyEventCallback',
  'specialHTMLTargets',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'UNWIND_CACHE',
  'ExitStatus',
  'getEnvStrings',
  'checkWasiClock',
  'doReadv',
  'doWritev',
  'initRandomFill',
  'randomFill',
  'safeSetTimeout',
  'emSetImmediate',
  'emClearImmediate_deps',
  'emClearImmediate',
  'registerPreMainLoop',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'ExceptionInfo',
  'Browser',
  'requestFullscreen',
  'requestFullScreen',
  'setCanvasSize',
  'getUserMedia',
  'createContext',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'SYSCALLS',
  'preloadPlugins',
  'FS_modeStringToFlags',
  'FS_getMode',
  'FS_stdin_getChar_buffer',
  'FS_stdin_getChar',
  'FS_readFile',
  'FS',
  'FS_root',
  'FS_mounts',
  'FS_devices',
  'FS_streams',
  'FS_nextInode',
  'FS_nameTable',
  'FS_currentPath',
  'FS_initialized',
  'FS_ignorePermissions',
  'FS_filesystems',
  'FS_syncFSRequests',
  'FS_readFiles',
  'FS_lookupPath',
  'FS_getPath',
  'FS_hashName',
  'FS_hashAddNode',
  'FS_hashRemoveNode',
  'FS_lookupNode',
  'FS_createNode',
  'FS_destroyNode',
  'FS_isRoot',
  'FS_isMountpoint',
  'FS_isFile',
  'FS_isDir',
  'FS_isLink',
  'FS_isChrdev',
  'FS_isBlkdev',
  'FS_isFIFO',
  'FS_isSocket',
  'FS_flagsToPermissionString',
  'FS_nodePermissions',
  'FS_mayLookup',
  'FS_mayCreate',
  'FS_mayDelete',
  'FS_mayOpen',
  'FS_checkOpExists',
  'FS_nextfd',
  'FS_getStreamChecked',
  'FS_getStream',
  'FS_createStream',
  'FS_closeStream',
  'FS_dupStream',
  'FS_doSetAttr',
  'FS_chrdev_stream_ops',
  'FS_major',
  'FS_minor',
  'FS_makedev',
  'FS_registerDevice',
  'FS_getDevice',
  'FS_getMounts',
  'FS_syncfs',
  'FS_mount',
  'FS_unmount',
  'FS_lookup',
  'FS_mknod',
  'FS_statfs',
  'FS_statfsStream',
  'FS_statfsNode',
  'FS_create',
  'FS_mkdir',
  'FS_mkdev',
  'FS_symlink',
  'FS_rename',
  'FS_rmdir',
  'FS_readdir',
  'FS_readlink',
  'FS_stat',
  'FS_fstat',
  'FS_lstat',
  'FS_doChmod',
  'FS_chmod',
  'FS_lchmod',
  'FS_fchmod',
  'FS_doChown',
  'FS_chown',
  'FS_lchown',
  'FS_fchown',
  'FS_doTruncate',
  'FS_truncate',
  'FS_ftruncate',
  'FS_utime',
  'FS_open',
  'FS_close',
  'FS_isClosed',
  'FS_llseek',
  'FS_read',
  'FS_write',
  'FS_mmap',
  'FS_msync',
  'FS_ioctl',
  'FS_writeFile',
  'FS_cwd',
  'FS_chdir',
  'FS_createDefaultDirectories',
  'FS_createDefaultDevices',
  'FS_createSpecialDirectories',
  'FS_createStandardStreams',
  'FS_staticInit',
  'FS_init',
  'FS_quit',
  'FS_findObject',
  'FS_analyzePath',
  'FS_createFile',
  'FS_forceLoadFile',
  'FS_absolutePath',
  'FS_createFolder',
  'FS_createLink',
  'FS_joinPath',
  'FS_mmapAlloc',
  'FS_standardizePath',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'GL',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance',
  'webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance',
  'GLEmulation',
  'GLImmediate',
  'GLImmediateSetup',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'print',
  'printErr',
  'jstoi_s',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);

  // End runtime exports
  // Begin JS library exports
  // End JS library exports

// end include: postlibrary.js

function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var ASM_CONSTS = {
  8539656: () => { if (typeof GLImmediate !== 'undefined' && !GLImmediate.matrixVersion) { Browser.useWebGL = true; GLImmediate.init(); } },  
 8539779: ($0, $1, $2, $3, $4) => { if (typeof window === 'undefined' || (window.AudioContext || window.webkitAudioContext) === undefined) { return 0; } if (typeof(window.miniaudio) === 'undefined') { window.miniaudio = { referenceCount: 0 }; window.miniaudio.device_type = {}; window.miniaudio.device_type.playback = $0; window.miniaudio.device_type.capture = $1; window.miniaudio.device_type.duplex = $2; window.miniaudio.device_state = {}; window.miniaudio.device_state.stopped = $3; window.miniaudio.device_state.started = $4; let miniaudio = window.miniaudio; miniaudio.devices = []; miniaudio.track_device = function(device) { for (var iDevice = 0; iDevice < miniaudio.devices.length; ++iDevice) { if (miniaudio.devices[iDevice] == null) { miniaudio.devices[iDevice] = device; return iDevice; } } miniaudio.devices.push(device); return miniaudio.devices.length - 1; }; miniaudio.untrack_device_by_index = function(deviceIndex) { miniaudio.devices[deviceIndex] = null; while (miniaudio.devices.length > 0) { if (miniaudio.devices[miniaudio.devices.length-1] == null) { miniaudio.devices.pop(); } else { break; } } }; miniaudio.untrack_device = function(device) { for (var iDevice = 0; iDevice < miniaudio.devices.length; ++iDevice) { if (miniaudio.devices[iDevice] == device) { return miniaudio.untrack_device_by_index(iDevice); } } }; miniaudio.get_device_by_index = function(deviceIndex) { return miniaudio.devices[deviceIndex]; }; miniaudio.unlock_event_types = (function(){ return ['touchend', 'click']; })(); miniaudio.unlock = function() { for(var i = 0; i < miniaudio.devices.length; ++i) { var device = miniaudio.devices[i]; if (device != null && device.webaudio != null && device.state === miniaudio.device_state.started) { device.webaudio.resume().then(() => { _ma_device__on_notification_unlocked(device.pDevice); }, (error) => {console.error("Failed to resume audiocontext", error); }); } } miniaudio.unlock_event_types.map(function(event_type) { document.removeEventListener(event_type, miniaudio.unlock, true); }); }; miniaudio.unlock_event_types.map(function(event_type) { document.addEventListener(event_type, miniaudio.unlock, true); }); } window.miniaudio.referenceCount += 1; return 1; },  
 8541957: () => { if (typeof(window.miniaudio) !== 'undefined') { window.miniaudio.unlock_event_types.map(function(event_type) { document.removeEventListener(event_type, window.miniaudio.unlock, true); }); window.miniaudio.referenceCount -= 1; if (window.miniaudio.referenceCount === 0) { delete window.miniaudio; } } },  
 8542261: () => { return (navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia !== undefined); },  
 8542365: () => { try { var temp = new (window.AudioContext || window.webkitAudioContext)(); var sampleRate = temp.sampleRate; temp.close(); return sampleRate; } catch(e) { return 0; } },  
 8542536: ($0, $1, $2, $3, $4, $5) => { var deviceType = $0; var channels = $1; var sampleRate = $2; var bufferSize = $3; var pIntermediaryBuffer = $4; var pDevice = $5; if (typeof(window.miniaudio) === 'undefined') { return -1; } var device = {}; var audioContextOptions = {}; if (deviceType == window.miniaudio.device_type.playback && sampleRate != 0) { audioContextOptions.sampleRate = sampleRate; } device.webaudio = new (window.AudioContext || window.webkitAudioContext)(audioContextOptions); device.webaudio.suspend(); device.state = window.miniaudio.device_state.stopped; var channelCountIn = 0; var channelCountOut = channels; if (deviceType != window.miniaudio.device_type.playback) { channelCountIn = channels; } device.scriptNode = device.webaudio.createScriptProcessor(bufferSize, channelCountIn, channelCountOut); device.scriptNode.onaudioprocess = function(e) { if (device.intermediaryBufferView == null || device.intermediaryBufferView.length == 0) { device.intermediaryBufferView = new Float32Array(HEAPF32.buffer, pIntermediaryBuffer, bufferSize * channels); } if (deviceType == window.miniaudio.device_type.capture || deviceType == window.miniaudio.device_type.duplex) { for (var iChannel = 0; iChannel < channels; iChannel += 1) { var inputBuffer = e.inputBuffer.getChannelData(iChannel); var intermediaryBuffer = device.intermediaryBufferView; for (var iFrame = 0; iFrame < bufferSize; iFrame += 1) { intermediaryBuffer[iFrame*channels + iChannel] = inputBuffer[iFrame]; } } _ma_device_process_pcm_frames_capture__webaudio(pDevice, bufferSize, pIntermediaryBuffer); } if (deviceType == window.miniaudio.device_type.playback || deviceType == window.miniaudio.device_type.duplex) { _ma_device_process_pcm_frames_playback__webaudio(pDevice, bufferSize, pIntermediaryBuffer); for (var iChannel = 0; iChannel < e.outputBuffer.numberOfChannels; ++iChannel) { var outputBuffer = e.outputBuffer.getChannelData(iChannel); var intermediaryBuffer = device.intermediaryBufferView; for (var iFrame = 0; iFrame < bufferSize; iFrame += 1) { outputBuffer[iFrame] = intermediaryBuffer[iFrame*channels + iChannel]; } } } else { for (var iChannel = 0; iChannel < e.outputBuffer.numberOfChannels; ++iChannel) { e.outputBuffer.getChannelData(iChannel).fill(0.0); } } }; if (deviceType == window.miniaudio.device_type.capture || deviceType == window.miniaudio.device_type.duplex) { navigator.mediaDevices.getUserMedia({audio:true, video:false}) .then(function(stream) { device.streamNode = device.webaudio.createMediaStreamSource(stream); device.streamNode.connect(device.scriptNode); device.scriptNode.connect(device.webaudio.destination); }) .catch(function(error) { console.log("Failed to get user media: " + error); }); } if (deviceType == window.miniaudio.device_type.playback) { device.scriptNode.connect(device.webaudio.destination); } device.pDevice = pDevice; return window.miniaudio.track_device(device); },  
 8545413: ($0) => { return window.miniaudio.get_device_by_index($0).webaudio.sampleRate; },  
 8545486: ($0) => { var device = window.miniaudio.get_device_by_index($0); if (device.scriptNode !== undefined) { device.scriptNode.onaudioprocess = function(e) {}; device.scriptNode.disconnect(); device.scriptNode = undefined; } if (device.streamNode !== undefined) { device.streamNode.disconnect(); device.streamNode = undefined; } device.webaudio.close(); device.webaudio = undefined; device.pDevice = undefined; },  
 8545886: ($0) => { window.miniaudio.untrack_device_by_index($0); },  
 8545936: ($0) => { var device = window.miniaudio.get_device_by_index($0); device.webaudio.resume(); device.state = window.miniaudio.device_state.started; },  
 8546075: ($0) => { var device = window.miniaudio.get_device_by_index($0); device.webaudio.suspend(); device.state = window.miniaudio.device_state.stopped; },  
 8546215: () => { if (typeof window !== 'undefined' && window.soloExitGame) { window.soloExitGame(); } else if (typeof window !== 'undefined') { window.location.reload(); } },  
 8546374: () => { if (typeof window !== 'undefined' && window.soloExitGame) { window.soloExitGame(); } else if (typeof window !== 'undefined') { window.location.reload(); } },  
 8546533: ($0) => { var key = "mu97k-hwid"; var v = ""; try { v = localStorage.getItem(key) || ""; } catch (e) { v = ""; } if (v.length != 35) { var hex = "0123456789ABCDEF"; var a = ""; var b = ""; var c = ""; var d = ""; var p = 0; while (p < 4) { var s = ""; var buf = new Uint8Array(4); crypto.getRandomValues(buf); var i = 0; while (i < 4) { s = s + hex[buf[i] >> 4] + hex[buf[i] & 15]; i = i + 1; } if (p == 0) a = s; if (p == 1) b = s; if (p == 2) c = s; if (p == 3) d = s; p = p + 1; } v = a + "-" + b + "-" + c + "-" + d; try { localStorage.setItem(key, v); } catch (e2) {} } var n = v.length; if (n > 35) n = 35; var j = 0; while (j < n) { setValue($0 + j, v.charCodeAt(j), "i8"); j = j + 1; } setValue($0 + n, 0, "i8"); },  
 8547248: ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) => { var w = $1; var cell = $2; var fontPx = $3; var c = document.createElement('canvas'); c.width = w; c.height = w; var g = c.getContext('2d'); g.clearRect(0, 0, w, w); g.fillStyle = '#ffffff'; var face = UTF8ToString($6); if (!face) face = 'Arial'; g.font = ($9 ? 'italic ' : 'normal ') + ($8 ? 'bold ' : '400 ') + fontPx + 'px "' + face + '"'; g.textBaseline = 'alphabetic'; var adv = $4; var base = $5; for (var ch = 32; ch < 256; ch++) { var col = ch % 16; var row = (ch / 16) | 0; g.fillText(String.fromCharCode(ch), col * cell, row * cell + base); var measured = g.measureText(String.fromCharCode(ch)).width; var iw = (measured + 0.5) | 0; if (iw < 1) iw = 1; if (iw > cell - 1) iw = cell - 1; HEAPU8[adv + ch] = iw; } var img = g.getImageData(0, 0, w, w); if ($7) { var d = img.data; var cut = $8 ? 150 : 200; for (var i = 3; i < d.length; i += 4) { var on = d[i] >= cut ? 255 : 0; d[i - 3] = on; d[i - 2] = on; d[i - 1] = on; d[i] = on; } } HEAPU8.set(img.data, $0); },  
 8548224: () => { var bar = document.getElementById('muTopBar'); var top = bar ? bar.offsetHeight : 40; var fit = Math.max(0.65, Math.min(1, window.innerWidth / 1024, (window.innerHeight - top) / 600)); return (window.devicePixelRatio || 1) * fit; },  
 8548458: ($0) => { var dpr = window.devicePixelRatio || 1; if (!(dpr > 0)) dpr = 1; var bar = document.getElementById('muTopBar'); var topH = (bar && bar.offsetHeight) ? bar.offsetHeight : 40; var css = $0 ? Math.max(100, window.innerHeight - topH) : window.innerWidth; var n = Math.round(css * dpr); var floor = $0 ? 480 : 640; if (n < floor) n = floor; if (n & 1) n = n - 1; return n; },  
 8548830: ($0, $1) => { try { function param(name) { var q = location.search.length > 1 ? location.search.substring(1) : ""; var parts = q.split("&"); for (var i = 0; i < parts.length; i++) { var cut = parts[i].indexOf("="); var key = decodeURIComponent(cut < 0 ? parts[i] : parts[i].substring(0, cut)); if (key !== name) continue; var val = cut < 0 ? "" : parts[i].substring(cut + 1); try { return decodeURIComponent(val.split("+").join(" ")); } catch (e) { return ""; } } return ""; } function put(text, ptr) { var n = 0; for (var i = 0; i < text.length && n < 10; i++) { var c = text.charCodeAt(i); if (c < 33 || c > 126) continue; HEAPU8[ptr + n] = c; n++; } HEAPU8[ptr + n] = 0; } put(param("u") || param("user"), $0); put(param("p") || param("pass"), $1); } catch (e) {} },  
 8549587: ($0, $1) => { var c = Module.canvas; var bar = document.getElementById('muTopBar'); var topH = (bar && bar.offsetHeight) ? bar.offsetHeight : 40; var availH = Math.max(100, window.innerHeight - topH); c.width = $0; c.height = $1; c.style.position = 'fixed'; c.style.width = window.innerWidth + 'px'; c.style.height = availH + 'px'; c.style.left = '0px'; c.style.top = topH + 'px'; c.style.imageRendering = 'pixelated'; c.style.outline = 'none'; c.style.border = '0'; Module._viewW = window.innerWidth; Module._viewH = availH; if (!Module._pageResizeHook) { Module._pageResizeHook = 1; window.addEventListener('resize', function () { Module._pageDirty = 1; }); } },  
 8550239: () => { return Module._viewW | 0; },  
 8550269: () => { return Module._viewH | 0; },  
 8550299: () => { if (typeof GLImmediate !== 'undefined' && !GLImmediate.matrixVersion) { Browser.useWebGL = true; GLImmediate.init(); } },  
 8550422: () => { return Module._pageDirty ? 1 : 0; },  
 8550460: () => { Module._pageDirty = 0; },  
 8550487: function() { if (Module._wrapDraws) return; Module._wrapDraws = 1; var maxAttribs = GLctx.getParameter(GLctx.MAX_VERTEX_ATTRIBS) | 0; var lastArrayBuffer = null; var bufSizes = new WeakMap(); var bindBuffer = GLctx.bindBuffer; GLctx.bindBuffer = function(target, buffer) { if (target === GLctx.ARRAY_BUFFER) lastArrayBuffer = buffer; return bindBuffer.apply(this, arguments); }; function bufferBytes(buf) { var hit = bufSizes.get(buf); if (hit !== undefined) return hit; var sz = GLctx.getBufferParameter(GLctx.ARRAY_BUFFER, GLctx.BUFFER_SIZE) | 0; bufSizes.set(buf, sz); return sz; } var bufferData = GLctx.bufferData; GLctx.bufferData = function(target, data, usage) { var r = bufferData.apply(this, arguments); if (target === GLctx.ARRAY_BUFFER && lastArrayBuffer) bufSizes.delete(lastArrayBuffer); return r; }; var a = GLctx.drawArrays; var muAttribIds = new Int32Array(4); GLctx.drawArrays = function(mode, first, count) { var prev = lastArrayBuffer; var imm = (typeof GLImmediate !== 'undefined') ? GLImmediate : null; if (imm && imm.clientAttributes && imm.enabledClientAttributes && prev) { var strideNow = imm.stride | 0; muAttribIds[0] = imm.VERTEX; muAttribIds[1] = imm.NORMAL; muAttribIds[2] = imm.COLOR; muAttribIds[3] = imm.TEXTURE0; var bsizeNow = bufferBytes(prev); for (var k = 0; k < 4; k++) { var idx = muAttribIds[k]; if (idx < 0 || idx >= maxAttribs) continue; var attr = imm.clientAttributes[idx]; if (!imm.enabledClientAttributes[idx]) { GLctx.disableVertexAttribArray(idx); continue; } if (!attr || !attr.size || strideNow <= 0) continue; var bytes = attr.sizeBytes | 0; if (!bytes) bytes = 4; var needNow = (attr.offset | 0) + (count > 0 ? (count - 1) * strideNow : 0) + bytes; if (needNow > bsizeNow) { GLctx.disableVertexAttribArray(idx); continue; } GLctx.enableVertexAttribArray(idx); GLctx.vertexAttribPointer(idx, attr.size, attr.type, idx === imm.COLOR || idx === imm.NORMAL, strideNow, attr.offset); } } return a.apply(this, arguments); }; if (typeof GLImmediate !== 'undefined' && GLImmediate.flush && !GLImmediate._muTexFlush) { GLImmediate._muTexFlush = GLImmediate.flush; GLImmediate.flush = function() { var texAttr = GLImmediate.TEXTURE0; var on = GLImmediate.enabledClientAttributes && GLImmediate.enabledClientAttributes[texAttr]; if (on && GLImmediate.TexEnvJIT && GLImmediate.TexEnvJIT.getTexUnitType(0) == 0) GLImmediate.TexEnvJIT.hook_enable(0x0DE1); return GLImmediate._muTexFlush.apply(this, arguments); }; } },  
 8552934: ($0) => { Module['HEAPU8'] = HEAPU8; if (typeof window !== 'undefined') { window['HEAPU8'] = HEAPU8; } if (typeof window !== 'undefined' && window.soloBridge && window.soloBridge.connect) { window.soloBridge.connect($0); } },  
 8553151: () => { if (typeof window !== 'undefined' && window.soloBridge && window.soloBridge.disconnect) { window.soloBridge.disconnect(); } },  
 8553279: ($0, $1) => { if (typeof window !== 'undefined' && window.soloBridge && window.soloBridge.send) { var data = new Uint8Array(HEAPU8.subarray($0, $0 + $1)); window.soloBridge.send(data); } },  
 8553456: ($0, $1, $2) => { var m = (typeof GLImmediate !== "undefined" && GLImmediate.matrix) ? GLImmediate.matrix[0] : null; if (!m) return; if (!Module._muMatSaved) Module._muMatSaved = new Float32Array(16); for (var s = 0; s < 16; s++) Module._muMatSaved[s] = m[s]; var p = $0 >> 2; for (var i = 0; i < 16; i++) m[i] = HEAPF32[p + i]; GLImmediate.matrixVersion[0] = (GLImmediate.matrixVersion[0] | 0) + 1; if ($1) { var c = GLImmediate.clientColor; if (!Module._muColSaved) Module._muColSaved = new Float32Array(4); Module._muColSaved[0] = c[0]; Module._muColSaved[1] = c[1]; Module._muColSaved[2] = c[2]; Module._muColSaved[3] = c[3]; var q = $2 >> 2; c[0] = HEAPF32[q]; c[1] = HEAPF32[q + 1]; c[2] = HEAPF32[q + 2]; c[3] = HEAPF32[q + 3]; } },  
 8554179: ($0, $1, $2) => { var n = $1 | 0; var layout = $2 | 0; var stride = layout === 0 ? 24 : (layout === 3 ? 16 : 28); var bytes = (n * stride) | 0; if (typeof GLImmediate === "undefined" || GLImmediate.mode < 0) return 0; if (bytes <= 0 || bytes >= GL.MAX_TEMP_BUFFER_SIZE) return 0; var dst = GLImmediate.vertexDataU8; if (!dst || dst.length < bytes) return 0; dst.set(HEAPU8.subarray($0, ($0 + bytes) | 0)); var F = GLctx.FLOAT; var U = GLctx.UNSIGNED_BYTE; if (layout === 0) { GLImmediate.addRendererComponent(GLImmediate.TEXTURE0, 2, F); GLImmediate.addRendererComponent(GLImmediate.VERTEX, 4, F); } else if (layout === 1) { GLImmediate.addRendererComponent(GLImmediate.TEXTURE0, 2, F); GLImmediate.addRendererComponent(GLImmediate.COLOR, 4, U); GLImmediate.addRendererComponent(GLImmediate.VERTEX, 4, F); } else if (layout === 2) { GLImmediate.addRendererComponent(GLImmediate.COLOR, 4, U); GLImmediate.addRendererComponent(GLImmediate.TEXTURE0, 2, F); GLImmediate.addRendererComponent(GLImmediate.VERTEX, 4, F); } else if (layout === 3) { GLImmediate.addRendererComponent(GLImmediate.VERTEX, 4, F); } else { return 0; } GLImmediate.vertexCounter = bytes >> 2; return 1; },  
 8555337: ($0, $1) => { var m = (typeof GLImmediate !== "undefined" && GLImmediate.matrix) ? GLImmediate.matrix[0] : null; if (m && Module._muMatSaved) { for (var s = 0; s < 16; s++) m[s] = Module._muMatSaved[s]; GLImmediate.matrixVersion[0] = (GLImmediate.matrixVersion[0] | 0) + 1; } if ($0 && GLImmediate.clientColor && Module._muColSaved) { var c = GLImmediate.clientColor; c[0] = Module._muColSaved[0]; c[1] = Module._muColSaved[1]; c[2] = Module._muColSaved[2]; c[3] = Module._muColSaved[3]; } if ($1 && GLImmediate.clientColor) { GLctx.disableVertexAttribArray(GLImmediate.COLOR); GLctx.vertexAttrib4fv(GLImmediate.COLOR, GLImmediate.clientColor); } },  
 8555974: ($0) => { var c = (typeof GLImmediate !== "undefined") ? GLImmediate.clientColor : null; if (!c) return 1; var p = $0 >> 2; for (var i = 0; i < 4; i++) if (c[i] !== HEAPF32[p + i]) return 0; return 1; },  
 8556169: ($0) => { var m = (typeof GLImmediate !== "undefined" && GLImmediate.matrix) ? GLImmediate.matrix[0] : null; if (!m) return 1; var p = $0 >> 2; for (var i = 0; i < 16; i++) if (m[i] !== HEAPF32[p + i]) return 0; return 1; },  
 8556385: ($0) => { var m = (typeof GLImmediate !== "undefined" && GLImmediate.matrix) ? GLImmediate.matrix[0] : null; var p = $0 >> 2; if (!m) { for (var i = 0; i < 16; i++) HEAPF32[p + i] = (i % 5 == 0) ? 1 : 0; return; } for (var i = 0; i < 16; i++) HEAPF32[p + i] = m[i]; },  
 8556645: ($0) => { var c = (typeof GLImmediate !== "undefined") ? GLImmediate.clientColor : null; var p = $0 >> 2; if (!c) { HEAPF32[p] = 1; HEAPF32[p+1] = 1; HEAPF32[p+2] = 1; HEAPF32[p+3] = 1; return; } HEAPF32[p] = c[0]; HEAPF32[p+1] = c[1]; HEAPF32[p+2] = c[2]; HEAPF32[p+3] = c[3]; },  
 8556917: ($0, $1) => { Module._muBatchOpen = $0 ? 1 : 0; Module._muBatchDrawing = $1 ? 1 : 0; }
};

// Imports from the Wasm binary.
var _malloc = makeInvalidEarlyAccess('_malloc');
var _fflush = makeInvalidEarlyAccess('_fflush');
var _ma_device__on_notification_unlocked = Module['_ma_device__on_notification_unlocked'] = makeInvalidEarlyAccess('_ma_device__on_notification_unlocked');
var _ma_malloc_emscripten = Module['_ma_malloc_emscripten'] = makeInvalidEarlyAccess('_ma_malloc_emscripten');
var _ma_free_emscripten = Module['_ma_free_emscripten'] = makeInvalidEarlyAccess('_ma_free_emscripten');
var _ma_device_process_pcm_frames_capture__webaudio = Module['_ma_device_process_pcm_frames_capture__webaudio'] = makeInvalidEarlyAccess('_ma_device_process_pcm_frames_capture__webaudio');
var _ma_device_process_pcm_frames_playback__webaudio = Module['_ma_device_process_pcm_frames_playback__webaudio'] = makeInvalidEarlyAccess('_ma_device_process_pcm_frames_playback__webaudio');
var _mu_mesh_flush = Module['_mu_mesh_flush'] = makeInvalidEarlyAccess('_mu_mesh_flush');
var _mu_key = Module['_mu_key'] = makeInvalidEarlyAccess('_mu_key');
var _mu_stick = Module['_mu_stick'] = makeInvalidEarlyAccess('_mu_stick');
var _mu_rbutton = Module['_mu_rbutton'] = makeInvalidEarlyAccess('_mu_rbutton');
var _mu_auto_attack = Module['_mu_auto_attack'] = makeInvalidEarlyAccess('_mu_auto_attack');
var _mu_get_auto_attack = Module['_mu_get_auto_attack'] = makeInvalidEarlyAccess('_mu_get_auto_attack');
var _mu_cursor = Module['_mu_cursor'] = makeInvalidEarlyAccess('_mu_cursor');
var _mu_audible = Module['_mu_audible'] = makeInvalidEarlyAccess('_mu_audible');
var _mu_lbutton = Module['_mu_lbutton'] = makeInvalidEarlyAccess('_mu_lbutton');
var _main = Module['_main'] = makeInvalidEarlyAccess('_main');
var _mu_net_get_push_buffer = Module['_mu_net_get_push_buffer'] = makeInvalidEarlyAccess('_mu_net_get_push_buffer');
var _mu_net_push_packet = Module['_mu_net_push_packet'] = makeInvalidEarlyAccess('_mu_net_push_packet');
var _mu_net_push_bytes = Module['_mu_net_push_bytes'] = makeInvalidEarlyAccess('_mu_net_push_bytes');
var _mu_net_push_disconnect = Module['_mu_net_push_disconnect'] = makeInvalidEarlyAccess('_mu_net_push_disconnect');
var _emscripten_stack_get_end = makeInvalidEarlyAccess('_emscripten_stack_get_end');
var _emscripten_stack_get_base = makeInvalidEarlyAccess('_emscripten_stack_get_base');
var _strerror = makeInvalidEarlyAccess('_strerror');
var _setThrew = makeInvalidEarlyAccess('_setThrew');
var _emscripten_stack_init = makeInvalidEarlyAccess('_emscripten_stack_init');
var _emscripten_stack_get_free = makeInvalidEarlyAccess('_emscripten_stack_get_free');
var __emscripten_stack_restore = makeInvalidEarlyAccess('__emscripten_stack_restore');
var __emscripten_stack_alloc = makeInvalidEarlyAccess('__emscripten_stack_alloc');
var _emscripten_stack_get_current = makeInvalidEarlyAccess('_emscripten_stack_get_current');
var dynCall_vi = makeInvalidEarlyAccess('dynCall_vi');
var dynCall_vii = makeInvalidEarlyAccess('dynCall_vii');
var dynCall_iiii = makeInvalidEarlyAccess('dynCall_iiii');
var dynCall_iii = makeInvalidEarlyAccess('dynCall_iii');
var dynCall_ii = makeInvalidEarlyAccess('dynCall_ii');
var dynCall_iiiii = makeInvalidEarlyAccess('dynCall_iiiii');
var dynCall_iiji = makeInvalidEarlyAccess('dynCall_iiji');
var dynCall_iiiji = makeInvalidEarlyAccess('dynCall_iiiji');
var dynCall_iiiiii = makeInvalidEarlyAccess('dynCall_iiiiii');
var dynCall_viiii = makeInvalidEarlyAccess('dynCall_viiii');
var dynCall_iiiiiii = makeInvalidEarlyAccess('dynCall_iiiiiii');
var dynCall_iij = makeInvalidEarlyAccess('dynCall_iij');
var dynCall_viiiii = makeInvalidEarlyAccess('dynCall_viiiii');
var dynCall_viii = makeInvalidEarlyAccess('dynCall_viii');
var dynCall_jii = makeInvalidEarlyAccess('dynCall_jii');
var dynCall_iiiiiiiii = makeInvalidEarlyAccess('dynCall_iiiiiiiii');
var dynCall_viiiiii = makeInvalidEarlyAccess('dynCall_viiiiii');
var dynCall_viiiiiiiii = makeInvalidEarlyAccess('dynCall_viiiiiiiii');
var dynCall_viiiiiii = makeInvalidEarlyAccess('dynCall_viiiiiii');
var dynCall_v = makeInvalidEarlyAccess('dynCall_v');
var dynCall_jiji = makeInvalidEarlyAccess('dynCall_jiji');
var dynCall_iidiiii = makeInvalidEarlyAccess('dynCall_iidiiii');

function assignWasmExports(wasmExports) {
  _malloc = createExportWrapper('malloc', 1);
  _fflush = createExportWrapper('fflush', 1);
  Module['_ma_device__on_notification_unlocked'] = _ma_device__on_notification_unlocked = createExportWrapper('ma_device__on_notification_unlocked', 1);
  Module['_ma_malloc_emscripten'] = _ma_malloc_emscripten = createExportWrapper('ma_malloc_emscripten', 2);
  Module['_ma_free_emscripten'] = _ma_free_emscripten = createExportWrapper('ma_free_emscripten', 2);
  Module['_ma_device_process_pcm_frames_capture__webaudio'] = _ma_device_process_pcm_frames_capture__webaudio = createExportWrapper('ma_device_process_pcm_frames_capture__webaudio', 3);
  Module['_ma_device_process_pcm_frames_playback__webaudio'] = _ma_device_process_pcm_frames_playback__webaudio = createExportWrapper('ma_device_process_pcm_frames_playback__webaudio', 3);
  Module['_mu_mesh_flush'] = _mu_mesh_flush = createExportWrapper('mu_mesh_flush', 0);
  Module['_mu_key'] = _mu_key = createExportWrapper('mu_key', 3);
  Module['_mu_stick'] = _mu_stick = createExportWrapper('mu_stick', 2);
  Module['_mu_rbutton'] = _mu_rbutton = createExportWrapper('mu_rbutton', 1);
  Module['_mu_auto_attack'] = _mu_auto_attack = createExportWrapper('mu_auto_attack', 1);
  Module['_mu_get_auto_attack'] = _mu_get_auto_attack = createExportWrapper('mu_get_auto_attack', 0);
  Module['_mu_cursor'] = _mu_cursor = createExportWrapper('mu_cursor', 2);
  Module['_mu_audible'] = _mu_audible = createExportWrapper('mu_audible', 1);
  Module['_mu_lbutton'] = _mu_lbutton = createExportWrapper('mu_lbutton', 1);
  Module['_main'] = _main = createExportWrapper('main', 2);
  Module['_mu_net_get_push_buffer'] = _mu_net_get_push_buffer = createExportWrapper('mu_net_get_push_buffer', 0);
  Module['_mu_net_push_packet'] = _mu_net_push_packet = createExportWrapper('mu_net_push_packet', 1);
  Module['_mu_net_push_bytes'] = _mu_net_push_bytes = createExportWrapper('mu_net_push_bytes', 2);
  Module['_mu_net_push_disconnect'] = _mu_net_push_disconnect = createExportWrapper('mu_net_push_disconnect', 0);
  _emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'];
  _emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'];
  _strerror = createExportWrapper('strerror', 1);
  _setThrew = createExportWrapper('setThrew', 2);
  _emscripten_stack_init = wasmExports['emscripten_stack_init'];
  _emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'];
  __emscripten_stack_restore = wasmExports['_emscripten_stack_restore'];
  __emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'];
  _emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'];
  dynCall_vi = createExportWrapper('dynCall_vi', 2);
  dynCall_vii = createExportWrapper('dynCall_vii', 3);
  dynCall_iiii = createExportWrapper('dynCall_iiii', 4);
  dynCall_iii = createExportWrapper('dynCall_iii', 3);
  dynCall_ii = createExportWrapper('dynCall_ii', 2);
  dynCall_iiiii = createExportWrapper('dynCall_iiiii', 5);
  dynCall_iiji = createExportWrapper('dynCall_iiji', 4);
  dynCall_iiiji = createExportWrapper('dynCall_iiiji', 5);
  dynCall_iiiiii = createExportWrapper('dynCall_iiiiii', 6);
  dynCall_viiii = createExportWrapper('dynCall_viiii', 5);
  dynCall_iiiiiii = createExportWrapper('dynCall_iiiiiii', 7);
  dynCall_iij = createExportWrapper('dynCall_iij', 3);
  dynCall_viiiii = createExportWrapper('dynCall_viiiii', 6);
  dynCall_viii = createExportWrapper('dynCall_viii', 4);
  dynCall_jii = createExportWrapper('dynCall_jii', 3);
  dynCall_iiiiiiiii = createExportWrapper('dynCall_iiiiiiiii', 9);
  dynCall_viiiiii = createExportWrapper('dynCall_viiiiii', 7);
  dynCall_viiiiiiiii = createExportWrapper('dynCall_viiiiiiiii', 10);
  dynCall_viiiiiii = createExportWrapper('dynCall_viiiiiii', 8);
  dynCall_v = createExportWrapper('dynCall_v', 1);
  dynCall_jiji = createExportWrapper('dynCall_jiji', 4);
  dynCall_iidiiii = createExportWrapper('dynCall_iidiiii', 7);
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  __cxa_throw: ___cxa_throw,
  /** @export */
  __syscall_fcntl64: ___syscall_fcntl64,
  /** @export */
  __syscall_fstat64: ___syscall_fstat64,
  /** @export */
  __syscall_ioctl: ___syscall_ioctl,
  /** @export */
  __syscall_lstat64: ___syscall_lstat64,
  /** @export */
  __syscall_newfstatat: ___syscall_newfstatat,
  /** @export */
  __syscall_openat: ___syscall_openat,
  /** @export */
  __syscall_stat64: ___syscall_stat64,
  /** @export */
  __syscall_unlinkat: ___syscall_unlinkat,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _emscripten_throw_longjmp: __emscripten_throw_longjmp,
  /** @export */
  clock_time_get: _clock_time_get,
  /** @export */
  emscripten_asm_const_double: _emscripten_asm_const_double,
  /** @export */
  emscripten_asm_const_int: _emscripten_asm_const_int,
  /** @export */
  emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
  /** @export */
  emscripten_date_now: _emscripten_date_now,
  /** @export */
  emscripten_get_now: _emscripten_get_now,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_set_click_callback_on_thread: _emscripten_set_click_callback_on_thread,
  /** @export */
  emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */
  emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */
  emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */
  emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
  /** @export */
  emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
  /** @export */
  emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
  /** @export */
  emscripten_webgl_create_context: _emscripten_webgl_create_context,
  /** @export */
  emscripten_webgl_destroy_context: _emscripten_webgl_destroy_context,
  /** @export */
  emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */
  environ_get: _environ_get,
  /** @export */
  environ_sizes_get: _environ_sizes_get,
  /** @export */
  exit: _exit,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_read: _fd_read,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  glAlphaFunc: _glAlphaFunc,
  /** @export */
  glBegin: _glBegin,
  /** @export */
  glBindTexture: _glBindTexture,
  /** @export */
  glBlendFunc: _glBlendFunc,
  /** @export */
  glClear: _glClear,
  /** @export */
  glClearColor: _glClearColor,
  /** @export */
  glColor3f: _glColor3f,
  /** @export */
  glColor3fv: _glColor3fv,
  /** @export */
  glColor4f: _glColor4f,
  /** @export */
  glColor4fv: _glColor4fv,
  /** @export */
  glColor4ub: _glColor4ub,
  /** @export */
  glDeleteTextures: _glDeleteTextures,
  /** @export */
  glDepthFunc: _glDepthFunc,
  /** @export */
  glDepthMask: _glDepthMask,
  /** @export */
  glDisable: _glDisable,
  /** @export */
  glEnable: _glEnable,
  /** @export */
  glEnd: _glEnd,
  /** @export */
  glFlush: _glFlush,
  /** @export */
  glFogf: _glFogf,
  /** @export */
  glFogfv: _glFogfv,
  /** @export */
  glFogi: _glFogi,
  /** @export */
  glGenTextures: _glGenTextures,
  /** @export */
  glGetError: _glGetError,
  /** @export */
  glGetFloatv: _glGetFloatv,
  /** @export */
  glGetIntegerv: _glGetIntegerv,
  /** @export */
  glIsEnabled: _glIsEnabled,
  /** @export */
  glLoadIdentity: _glLoadIdentity,
  /** @export */
  glMatrixMode: _glMatrixMode,
  /** @export */
  glPixelStorei: _glPixelStorei,
  /** @export */
  glPopMatrix: _glPopMatrix,
  /** @export */
  glPushMatrix: _glPushMatrix,
  /** @export */
  glReadPixels: _glReadPixels,
  /** @export */
  glRotatef: _glRotatef,
  /** @export */
  glScissor: _glScissor,
  /** @export */
  glTexCoord2f: _glTexCoord2f,
  /** @export */
  glTexEnvf: _glTexEnvf,
  /** @export */
  glTexImage2D: _glTexImage2D,
  /** @export */
  glTexParameterfv: _glTexParameterfv,
  /** @export */
  glTexParameteri: _glTexParameteri,
  /** @export */
  glTranslatef: _glTranslatef,
  /** @export */
  glVertex2f: _glVertex2f,
  /** @export */
  glVertex3f: _glVertex3f,
  /** @export */
  glVertex3fv: _glVertex3fv,
  /** @export */
  glViewport: _glViewport,
  /** @export */
  gluOrtho2D: _gluOrtho2D,
  /** @export */
  gluPerspective: _gluPerspective,
  /** @export */
  invoke_ii,
  /** @export */
  invoke_iii,
  /** @export */
  invoke_iiii,
  /** @export */
  invoke_iiiii,
  /** @export */
  invoke_vi,
  /** @export */
  invoke_vii,
  /** @export */
  invoke_viii,
  /** @export */
  invoke_viiiiiiiii
};
var wasmExports;
createWasm();

function invoke_iii(index,a1,a2) {
  var sp = stackSave();
  try {
    return dynCall_iii(index,a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_ii(index,a1) {
  var sp = stackSave();
  try {
    return dynCall_ii(index,a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    dynCall_viii(index,a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  var sp = stackSave();
  try {
    dynCall_vii(index,a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index,a1) {
  var sp = stackSave();
  try {
    dynCall_vi(index,a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    return dynCall_iiiii(index,a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return dynCall_iiii(index,a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9) {
  var sp = stackSave();
  try {
    dynCall_viiiiiiiii(index,a1,a2,a3,a4,a5,a6,a7,a8,a9);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0) throw e;
    _setThrew(1, 0);
  }
}


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

var calledRun;

function callMain() {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(typeof onPreRuns === 'undefined' || onPreRuns.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = _main;

  var argc = 0;
  var argv = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  } catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }

  stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    assert(!calledRun);
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    Module['onRuntimeInitialized']?.();
    consumedModuleProp('onRuntimeInitialized');

    var noInitialRun = Module['noInitialRun'] || false;
    if (!noInitialRun) callMain();

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    _fflush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach((name) => {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty?.output?.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
  }
}

function preInit() {
  if (Module['preInit']) {
    if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
    while (Module['preInit'].length > 0) {
      Module['preInit'].shift()();
    }
  }
  consumedModuleProp('preInit');
}

preInit();
run();

// end include: postamble.js

