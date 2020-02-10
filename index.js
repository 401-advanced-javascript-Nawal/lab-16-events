'use strict';

const events = require('./modular/events.js');

require('./modular/logger.js');
require('./modular/file.js');

const fs = require('fs');
const util = require('util');

const reader = ('./files/reader.js');

/***************************************** Read / Write File System **************************************************/
// FS File( read , write )
let file = `${__dirname}/./files/data.text`;

// Second Way to read a file with FS (Promisify)
let readFilepromisify = util.promisify(fs.readFile);
// console.log('readFilepromisify : ', readFilepromisify);

readFilepromisify(file)
    .then(data => {
        console.log('data in read  : ', data);
        console.log('data promisify : ', data.toString());
        return data.toString();
    })
    .then(data => writeFile(file, data))
    .catch(error => console.error('There is an error , promise', error))

// Third Way to read a file with FS (Promisify) & async function
async function readFileAsync(file) {
    try {
        let data = await readFilepromisify(file);
        console.log('data : ', data);
    }
    catch (error) {
        console.error('There is an error , async', error);
    }
}

readFileAsync(file);

let writeFilepromisify = util.promisify(fs.writeFile);

const writeFile = (file, data) => {
    data = data.toUpperCase();
    console.log('data in write function : ', data);
    writeFilepromisify(file, data);
    return data;
};

