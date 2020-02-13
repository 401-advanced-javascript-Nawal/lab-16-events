'use strict';

const fs = require('fs');
const util = require('util');

let events = require('../../modular/events.js');
let logger = require('../../modular/logger.js');
let filereader = require('../../modular/file.js');
let writeFilepromisify = util.promisify(fs.writeFile);
let readFilepromisify = util.promisify(fs.readFile);

const writeFile = (file, data) => {
    data = data.toUpperCase();
    console.log('data in write function : ', data);
    writeFilepromisify(file, data);
    return data;
  };

describe(' File System Testing ' , () =>{

    let file = `${__dirname}/../../files/data.text`;

    it(' Read , Write File ' , () =>{
        readFilepromisify(file)
            .then( data => {
                console.log('data in test : ', data);
                expect(data).toBeDefined();
                console.log('data.toString() : ', data.toString());
                expect(data.toString()).toEqual('welcome to our app');
                return data.toString();
            })
            .then(data => {
                writeFile(file, data);
                console.log('write file in tests',writeFile(file, data));
                expect(data).toEqual('WELCOME TO OUR APP');
            })
            .then(data => {
                expect(events.emit('success' , data)).toBeTruthy();
            })
            .then(error => {
                events.emit('error',error)
            })
    }); // end of Read File 

}); // end of file tests 