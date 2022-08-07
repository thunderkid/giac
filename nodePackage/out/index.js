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




export * from './parsley';
