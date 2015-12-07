var more = require('./more.js');

module.exports = function foo(myArray, secondArr) {
	secondArr.push(myArray[0]);
	console.log("From foo : " + myArray);
	more.flavour("choc");
};


