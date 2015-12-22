var wrapLetters = require('./wrapLetters');

module.exports = function animateHead() {

	var heading = document.getElementById('js_animate_heading');

	wrapLetters(heading);

	var letters = document.getElementById('js_animate_heading').getElementsByClassName('letter');

	var n = 0;

	for (var i = 0; i < letters.length; i++) {		
		letters[i].style.transition = 'opacity ' + n + 'ms ease';
		n+= 100;
	}

};