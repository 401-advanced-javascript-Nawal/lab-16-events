'use strict';

const fs = require('fs');
const util = require('util');
const events = require('./events.js');
require('./logger.js');

/********************************** Read A File **********************************/
const readWithCallBack = (file,callback)=>
{
  fs.readFile(file , (error,data)=>
  {
    if(error) {
        events.emit('error',error);
    }
  });
};

let readFilepromisify = util.promisify(fs.readFile);

const readWithPromise = (file) =>
{
  return readFilepromisify(file)
    .then(file =>file.toString().trim())
    .then(data => writeFile( file, data))
    .catch(error => events.emit('error',error));
};

const writeFile = (file,data) =>
{
  let data2 = data.toUpperCase();
  writeFilepromisify(file,data2);
  return data2;
};

module.exports = { readWithCallBack , readWithPromise ,writeFile };