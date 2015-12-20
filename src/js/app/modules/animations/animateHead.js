module.exports = function animateHead() {


	var heading = document.getElementById('js_animate_head');
	var heading_2 = document.getElementById('js_animate_another_head');
	// console.log(el.textContent.split(""));

	var wrapLetters = function wrapLetters(el) {
		return el.innerHTML = el.textContent.split("").map(function (letter) {
			return '<span class=letter>' + letter + '</span>';
		}).join("");
	};

	wrapLetters(heading);
	wrapLetters(heading_2);

	var letters = document.getElementsByClassName('letter');

	var n = 0;

	for (var i = 0; i < letters.length; i++) {		
		letters[i].style.transition = 'opacity ' + n + 'ms';
		n = n + 100;
	}


	// trigger by scroll / element in view
	// window.setTimeout(function() {
	// 	$('.letter').each( function() {	
	// 		$(this).addClass('on');
	// 	});
	// }, 1000);
	

};