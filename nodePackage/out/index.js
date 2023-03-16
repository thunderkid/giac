// Imports giac.node.wasm.js file that's generated in giac/build/binaries/giacggb.wasm/
// by running ./gradlew downloadEmsdk installEmsdk activateEmsdk createGiacWasmJsForNode
const factory = require('./compiledWasm/giac.node.wasm');

// caseval is the actual workhorse function of giac. Once wasm is compiled it's initialized.
let caseval = null;

// initializePromise ensures that the actual wasm compilation only occurs once
// even if initialize is called multiple times. 
let initializePromise = null;
function initialize() {
    const startTime = getTimestamp();
    if (!initializePromise) {
        initializePromise = factory().then((theInstance) => {
            if (caseval)
                throw Error('Two giac initalizations were somehow run. The initializePromise logic must have broken.')
            caseval = theInstance.cwrap('caseval', 'string', ['string']);
            console.log(`Giac WASM initialized in ${Math.round(getTimestamp()-startTime)}ms`);
        });
    }
   return initializePromise;
}

function runEval(str) {
    if (!caseval)
        throw Error(`Evaluation attempted before giac was initialized`);
    // if (!caseval)
    //     initialize();  
    // while (!caseval) {}
    return caseval(str);
}


// performance.now() is not available in node.js, so we use process.hrtime() instead. 
// Think in other cases it's just used in b
function getTimestamp() {
    if (typeof performance !== 'undefined' && performance.now) {
        return performance.now();
    } else {
        const hrTime = process.hrtime();
        return (hrTime[0] * 1000) + (hrTime[1] / 1000000);
    }
}


module.exports = { initialize, runEval, getTimestamp }

//initialize();
