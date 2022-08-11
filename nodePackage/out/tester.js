import { initialize, runEval } from './index';

const starttime = performance.now();
console.log('a');
initialize().then(() => {
    console.log('done');
    const endtime = performance.now();
    console.log(endtime-starttime);
})
initialize().then(() => {

    console.log(runEval('cfactor(x^4-1)'));

    console.log('1');
    
    
    initialize().then(console.log('dog1'));
    runEval('cfactor(x^4+1)'); //?.?
    console.log(runEval('cfactor(x^4+1)')); //?.?
    console.log(runEval('cfactor(x^4+1)'));
    initialize().then(console.log('dog2'));
    console.log(runEval('cfactor(x^2+2)'));
    



});

Math.round()

// async function doIt() {
//     await initialize();

//     console.log('initialized it i did');
// }

// doIt();