'use strict';

const events = require('./events.js');

// if success 
events.on('success', payload => logEvents('success',payload));
// if there's an error 
events.on('error', payload => logEvents('error',payload));

function logEvents(event,payload){

  let msg = `${event.toUpperCase()}`;
  let time = new Date();

  console.log( time , msg, payload );

} // end of logEvents function 
