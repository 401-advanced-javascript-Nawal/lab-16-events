'use strict';

const fs = require('fs');
const util = require('util');

const events = require('./events.js');

/***************************************** Read / Write File System **************************************************/
// FS File( read , write )
let file = `${__dirname}/./files/data.text`;

// Second Way to read a file with FS (Promisify)
let readFilepromisify = util.promisify(fs.readFile);
// console.log('readFilepromisify : ', readFilepromisify);

readFilepromisify(file)
  .then(data => {
    // console.log('data in read  : ', data);
    // console.log('data promisify : ', data.toString());
    return data.toString();
  })
  .then(data => writeFile(file, data))
  .then(data => events.emit('success' , data))
  .catch(error => events.emit('error',error));

// Third Way to read a file with FS (Promisify) & async function
// async function readFileAsync(file) {
//   try {
//     let data = await readFilepromisify(file);
//     console.log('data : ', data);
//   }
//   catch (error) {
//     events.emit('error',error);
//   }
// }

// readFileAsync(file);

let writeFilepromisify = util.promisify(fs.writeFile);

const writeFile = (file, data) => {
  data = data.toUpperCase();
  console.log('data in write function : ', data);
  writeFilepromisify(file, data);
  return data;
};