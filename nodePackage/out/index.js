// Imports giac.node.wasm.js file that's generated in giac/build/binaries/giacggb.wasm/
// by running ./gradlew downloadEmsdk installEmsdk activateEmsdk createGiacWasmJsForNode
const factory = require('./giac.node.wasm');

let caseval = null;

export function initialize() {
    return factory().then((theInstance) => {
        caseval = theInstance.cwrap('caseval', 'string', ['string'])
    });
}

export function runEval(str) {
    if (!caseval)
        throw Error(`Giac not initialized`);
    return caseval(str);
}

