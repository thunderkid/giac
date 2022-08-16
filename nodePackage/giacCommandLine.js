var tg = require('./out/index');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});


function callGiac(text) {
    const res = tg.runEval(text);
    if (res.startsWith('GIAC_ERROR'))
        throw Error(res);
    return res;
}

let initialized = false;
tg.initialize().then(() => {
    initialized = true;
}); 

console.log('This is a minimalist command line version of a WASM compilation of giac');
console.log('Enter expressions to evaluate');
console.log('Example: factor(x^4-1); simplify(sin(3x)/sin(x))');
console.log('int(1/(x^4-1)); int(1/(x^4+1)^4,x,0,inf)');
console.log("f(x):=sin(x^2); f'(2); f'(y)");
console.log('Commands listed at http://www-fourier.ujf-grenoble.fr/~parisse/giac/doc/en/cascmd_en/index.html');
console.log('Type "exit" to stop');

let n=1;

rl.on('line', function(line){
    if (!initialized) {
        console.log('*** sorry - giac still initializing ***');
    }
    if (line.trim().toLowerCase() == 'exit' || line.trim().toLowerCase() == 'quit')
        rl.close();
    else {
        console.log(n + '>> ' + line);
        const t0 = performance.now();
        try {
            const ans = callGiac(line);// 'you said ' + line;
            const t1 = performance.now();
            const took = t1 - t0;
            const tookReport = took < 20 ? Math.round((took)*10)/10 : Math.round(took)
            console.log(n + '<< ' + ans + '\t\t\t\ttook '+ tookReport + 'ms');
            n++;
        } catch (e) {
            console.log(n + `<< !! ${e}`);
            n++;
        }
    }
})

/*
console.log(giac.evaluate("expand((x+y)^3)"));
console.log(giac.evaluate("expand((x+y)^4)"));
console.log(giac.evaluate("2^50"));
console.log(giac.evaluate("[1]"));
console.log(giac.evaluate("caseval(\"init geogebra\")"));
console.log(giac.evaluate("[1]"));
console.log(giac.evaluate("evalf(7,15)"));
console.log(giac.evaluate("caseval(\"close geogebra\")"));
console.log(giac.evaluate("normal(sqrt(1+i))"));
*/

/* The expected output is:
 *
 * x^3+y^3+3*x*y^2+3*x^2*y
 * x^4+y^4+4*x*y^3+6*x^2*y^2+4*x^3*y
 * 1125899906842624
 * [1]
 * "geogebra mode on"
 * {1}
 * 7.00000000000000
 * "geogebra mode off"
 * (sqrt(2)*sqrt(sqrt(2)+1)+(1+i)*sqrt(sqrt(2)+1))/(sqrt(2)+2)
 *
 */
