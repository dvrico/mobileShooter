var logger = require('./logger');

require("./style.less");

logger('It works!');

var [string] = [['WOOHOO']];

var len = string.map( s => s.length );

document.write(`Woohoo! this is awesome # ${len} on ${ENV}`);