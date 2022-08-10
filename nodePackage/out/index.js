// Imports giac.node.wasm.js file that's generated in giac/build/binaries/giacggb.wasm/
// by running ./gradlew downloadEmsdk installEmsdk activateEmsdk createGiacWasmJsForNode
const factory = require('./giac.node.wasm');

let caseval = null;

// let initializeStarted = false;
// let initializeCompleted = false;
let initializePromise = null;
export function initialize() {
    // if (initializePromise)
    //     return initializePromise;
    // else if (initializeStarted)
    //     throw Error(`Two Giac initializations are running concurrently.`);
    // initializeStarted = true;
    console.log('called initialize  eee');
    if (!initializePromise) {
        initializePromise = factory().then((theInstance) => {
            console.log('running initializer');
            caseval = theInstance.cwrap('caseval', 'string', ['string']);
            console.log('ended initializer');
        });
    }
   return initializePromise;

        // return factory().then((theInstance) => {
        //     console.log('running initializer');
        //     caseval = theInstance.cwrap('caseval', 'string', ['string']);
        //     //initializeCompleted = true;
        //     console.log('ended initializer');
        // });

}

export function runEval(str) {
    if (!caseval)
        throw Error(`Giac not initialized`);
    return caseval(str);
}

