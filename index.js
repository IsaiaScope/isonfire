// index.js

const yargs = require('yargs');

// Parse command-line arguments
const argv = yargs
    .command('launch-test', 'Launch test.js with 3 arguments using positional arguments', (yargs) => {
        yargs.positional('arg1', {
            describe: 'Description of arg1',
            type: 'string'
        });
        yargs.positional('arg2', {
            describe: 'Description of arg2',
            type: 'string'
        });
        yargs.positional('arg3', {
            describe: 'Description of arg3',
            type: 'string'
        });
    })
    .command('launch-test-flag', 'Launch test.js with 3 arguments using flags', (yargs) => {
        yargs.option('r', {
            alias: 'arg1',
            describe: 'Description of arg1',
            type: 'string'
        });
        yargs.option('u', {
            alias: 'arg2',
            describe: 'Description of arg2',
            type: 'string'
        });
        yargs.option('f', {
            alias: 'arg3',
            describe: 'Description of arg3',
            type: 'string'
        });
    })
    .help()
    .argv;

if (argv._.includes('launch-test')) {
    // Extract arguments from positional arguments
    const arg1 = argv.arg1;
    console.log(`🧊 ~ arg1: `, arg1);
    const arg2 = argv.arg2;
    console.log(`🧊 ~ arg2: `, arg2);
    const arg3 = argv.arg3;
    console.log(`🧊 ~ arg3: `, arg3);

    // Launch test.js with the passed arguments
    const testProcess = spawn('node', ['test.js', arg1, arg2, arg3]);


} else if (argv._.includes('launch-test-flag')) {
    // Extract arguments from flags
    const arg1 = argv.arg1;
    console.log(`🧊 ~ arg1: `, arg1);
    const arg2 = argv.arg2;
    console.log(`🧊 ~ arg2: `, arg2);
    const arg3 = argv.arg3;
    console.log(`🧊 ~ arg3: `, arg3);

  

}
