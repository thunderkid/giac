import { initialize, runEval } from './index';


console.log('a');
initialize().then(() => {
    console.log('done');
})
initialize().then(() => {

    console.log(runEval('cfactor(x^4-1)'));

    console.log('1');
    
    
    initialize().then(console.log('dog1'));
    console.log(runEval('cfactor(x^4+1)'));
    initialize().then(console.log('dog2'));
    console.log(runEval('cfactor(x^2+2)'));
    



});

// async function doIt() {
//     await initialize();

//     console.log('initialized it i did');
// }

// doIt();