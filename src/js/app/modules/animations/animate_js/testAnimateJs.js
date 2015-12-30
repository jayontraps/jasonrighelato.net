var animate = require('./animate');

module.exports = function testAnimateJs() {
	var ul = document.getElementById('js_test');
	var li = ul.getElementsByTagName('li');

	animate({
	  el: li[0],
	  rotateX: 190,
	  opacity: .5,
	  duration: 500,
	  complete: function() { 
	  	console.log("Done!"); 
	  }
	});

};