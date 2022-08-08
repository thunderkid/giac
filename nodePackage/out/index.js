// Imports giac.node.wasm.js file that's generated in giac/build/binaries/giacggb.wasm/
// by running ./gradlew downloadEmsdk installEmsdk activateEmsdk createGiacWasmJsForNode
const factory = require('./giac.node.wasm');

let caseval = null;

let initializeStarted = false;
let initializeCompleted = false;
export function initialize() {
    if (initializeCompleted)
        return Promise.resolve();
    else if (initializeStarted)
        throw Error(`Two Giac initializations are running concurrently.`);
    initializeStarted = true;
    return factory().then((theInstance) => {
        caseval = theInstance.cwrap('caseval', 'string', ['string']);
        initializeCompleted = true;
    });
}

export function runEval(str) {
    if (!caseval)
        throw Error(`Giac not initialized`);
    return caseval(str);
}

