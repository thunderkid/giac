// Imports giac.node.wasm.js file that's generated in giac/build/binaries/giacggb.wasm/
// by running ./gradlew downloadEmsdk installEmsdk activateEmsdk createGiacWasmJsForNode
const factory = require('./giac.node.wasm');

// caseval is the actual workhorse function of giac. Once wasm is compiled it's initialized.
let caseval = null;

// initializePromise ensures that the actual wasm compilation only occurs once
// even if initialize is called multiple times. 
let initializePromise = null;
function initialize() {
    const startTime = performance.now();
    if (!initializePromise) {
        initializePromise = factory().then((theInstance) => {
            if (caseval)
                throw Error('Two giac initalizations were somehow run. The initializePromise logic must have broken.')
            caseval = theInstance.cwrap('caseval', 'string', ['string']);
            console.log(`Giac WASM initialized in ${Math.round(performance.now()-startTime)}ms`);
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


module.exports = { initialize, runEval }

//initialize();