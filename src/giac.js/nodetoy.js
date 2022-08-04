//const factory = require('./giac.node.wasm-loader.js')
// OR FOR INLINE VERSION:
const factory = require('./giac.node.wasm.js')

factory().then((instance) => {
  const caseval = instance.cwrap('caseval', 'string', ['string']);
  console.log(caseval("simplify(22x-33x)"));
  console.log(caseval("factor(x^2-1)"));
  console.log(caseval("cfactor(x^4+4)"));
  console.log(caseval("cfactor(x^4+81)"));
  console.log(caseval("simplify(x^4+81-81)"));
  const start = Date.now();
    for (let i = 0; i < 1000; i++) {
        caseval("cfactor(x^4+81)");
        //caseval("simplify(x^4+81-81)");
    }
    const end = Date.now();

    console.log('took ');
    console.log(end-start);


});