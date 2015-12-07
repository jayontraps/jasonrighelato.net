(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function bar (myArray) {
	myArray.shift();
	console.log("from bar : " + myArray);	
};


},{}],2:[function(require,module,exports){
var more = require('./more.js');

module.exports = function foo(myArray, secondArr) {
	secondArr.push(myArray[0]);
	console.log("From foo : " + myArray);
	more.flavour("choc");
};



},{"./more.js":4}],3:[function(require,module,exports){
// var myArray = require('./myArray.js');
// var secondArr = [];

// var foo = require('./foo.js');
// var bar = require('./bar.js');


// window.onload = function () {	
// 	bar(myArray);
// 	foo(myArray, secondArr);
// 	console.log(myArray, secondArr);
// };

window.onload = function () {	

// ajax post data
(function($) {		
	$(document).ready(function() {
		$.ajax({
		    url: 'wp-json/posts?type=portfolio',
		    data: {
		        filter: {
		        'posts_per_page': 5
		        }
		    },
		    dataType: 'json',
		    type: 'GET',
		    success: function(data) {

	    		
		        // success code
		        // console.log(data[0].meta.recordings[0].abundance);
		        // console.log(data.length);		        

		        // for (var i = 0; i < data.length; i++) {
		        // 	console.log(data[i].meta.short_description);
		        // }


				var template = $("#itemTemplate").html();
				var result = Mustache.render(template, data );
				$("#container").html(result);



		    },
		    error: function() {
		        // error code
		    }
		});		
	});


	// $("document").ready(function() {
	//     var template = $("#itemTemplate").html();
	//     var result = Mustache.render(template, {
	//         "item" : "Whisper 4000 in-home heater and dog walker",
	//         "description" : "Walk your dog and heat your house at the same time? Now you can, with the Whisper 4000 Home Heating system / Dog Treadmill!",
	//         "price" : 895.99,
	//         "inStock" : true,
	//         "quantity" : 100
	//     } );
	//     $("#container").html(result);
	//  });



})(jQuery);











};	
},{}],4:[function(require,module,exports){
var more = {
	iceCream : true,
	flavour : function(yourFlavour) {
		console.log("my fav flav is " + yourFlavour);
	}
};

module.exports = more;
},{}],5:[function(require,module,exports){
var myArray = [
	"hello",
	"world",
	"from",
	"my",
	"array"
	];

module.exports = myArray;	

},{}]},{},[1,2,3,4,5])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hcHAvc3JjL2Jhci5qcyIsImpzL2FwcC9zcmMvZm9vLmpzIiwianMvYXBwL3NyYy9tYWluLmpzIiwianMvYXBwL3NyYy9tb3JlLmpzIiwianMvYXBwL3NyYy9teUFycmF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiYXIgKG15QXJyYXkpIHtcblx0bXlBcnJheS5zaGlmdCgpO1xuXHRjb25zb2xlLmxvZyhcImZyb20gYmFyIDogXCIgKyBteUFycmF5KTtcdFxufTtcblxuIiwidmFyIG1vcmUgPSByZXF1aXJlKCcuL21vcmUuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb28obXlBcnJheSwgc2Vjb25kQXJyKSB7XG5cdHNlY29uZEFyci5wdXNoKG15QXJyYXlbMF0pO1xuXHRjb25zb2xlLmxvZyhcIkZyb20gZm9vIDogXCIgKyBteUFycmF5KTtcblx0bW9yZS5mbGF2b3VyKFwiY2hvY1wiKTtcbn07XG5cblxuIiwiLy8gdmFyIG15QXJyYXkgPSByZXF1aXJlKCcuL215QXJyYXkuanMnKTtcbi8vIHZhciBzZWNvbmRBcnIgPSBbXTtcblxuLy8gdmFyIGZvbyA9IHJlcXVpcmUoJy4vZm9vLmpzJyk7XG4vLyB2YXIgYmFyID0gcmVxdWlyZSgnLi9iYXIuanMnKTtcblxuXG4vLyB3aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1x0XG4vLyBcdGJhcihteUFycmF5KTtcbi8vIFx0Zm9vKG15QXJyYXksIHNlY29uZEFycik7XG4vLyBcdGNvbnNvbGUubG9nKG15QXJyYXksIHNlY29uZEFycik7XG4vLyB9O1xuXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1x0XG5cbi8vIGFqYXggcG9zdCBkYXRhXG4oZnVuY3Rpb24oJCkge1x0XHRcblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdFx0JC5hamF4KHtcblx0XHQgICAgdXJsOiAnd3AtanNvbi9wb3N0cz90eXBlPXBvcnRmb2xpbycsXG5cdFx0ICAgIGRhdGE6IHtcblx0XHQgICAgICAgIGZpbHRlcjoge1xuXHRcdCAgICAgICAgJ3Bvc3RzX3Blcl9wYWdlJzogNVxuXHRcdCAgICAgICAgfVxuXHRcdCAgICB9LFxuXHRcdCAgICBkYXRhVHlwZTogJ2pzb24nLFxuXHRcdCAgICB0eXBlOiAnR0VUJyxcblx0XHQgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuXG5cdCAgICBcdFx0XG5cdFx0ICAgICAgICAvLyBzdWNjZXNzIGNvZGVcblx0XHQgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFbMF0ubWV0YS5yZWNvcmRpbmdzWzBdLmFidW5kYW5jZSk7XG5cdFx0ICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhLmxlbmd0aCk7XHRcdCAgICAgICAgXG5cblx0XHQgICAgICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuXHRcdCAgICAgICAgLy8gXHRjb25zb2xlLmxvZyhkYXRhW2ldLm1ldGEuc2hvcnRfZGVzY3JpcHRpb24pO1xuXHRcdCAgICAgICAgLy8gfVxuXG5cblx0XHRcdFx0dmFyIHRlbXBsYXRlID0gJChcIiNpdGVtVGVtcGxhdGVcIikuaHRtbCgpO1xuXHRcdFx0XHR2YXIgcmVzdWx0ID0gTXVzdGFjaGUucmVuZGVyKHRlbXBsYXRlLCBkYXRhICk7XG5cdFx0XHRcdCQoXCIjY29udGFpbmVyXCIpLmh0bWwocmVzdWx0KTtcblxuXG5cblx0XHQgICAgfSxcblx0XHQgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuXHRcdCAgICAgICAgLy8gZXJyb3IgY29kZVxuXHRcdCAgICB9XG5cdFx0fSk7XHRcdFxuXHR9KTtcblxuXG5cdC8vICQoXCJkb2N1bWVudFwiKS5yZWFkeShmdW5jdGlvbigpIHtcblx0Ly8gICAgIHZhciB0ZW1wbGF0ZSA9ICQoXCIjaXRlbVRlbXBsYXRlXCIpLmh0bWwoKTtcblx0Ly8gICAgIHZhciByZXN1bHQgPSBNdXN0YWNoZS5yZW5kZXIodGVtcGxhdGUsIHtcblx0Ly8gICAgICAgICBcIml0ZW1cIiA6IFwiV2hpc3BlciA0MDAwIGluLWhvbWUgaGVhdGVyIGFuZCBkb2cgd2Fsa2VyXCIsXG5cdC8vICAgICAgICAgXCJkZXNjcmlwdGlvblwiIDogXCJXYWxrIHlvdXIgZG9nIGFuZCBoZWF0IHlvdXIgaG91c2UgYXQgdGhlIHNhbWUgdGltZT8gTm93IHlvdSBjYW4sIHdpdGggdGhlIFdoaXNwZXIgNDAwMCBIb21lIEhlYXRpbmcgc3lzdGVtIC8gRG9nIFRyZWFkbWlsbCFcIixcblx0Ly8gICAgICAgICBcInByaWNlXCIgOiA4OTUuOTksXG5cdC8vICAgICAgICAgXCJpblN0b2NrXCIgOiB0cnVlLFxuXHQvLyAgICAgICAgIFwicXVhbnRpdHlcIiA6IDEwMFxuXHQvLyAgICAgfSApO1xuXHQvLyAgICAgJChcIiNjb250YWluZXJcIikuaHRtbChyZXN1bHQpO1xuXHQvLyAgfSk7XG5cblxuXG59KShqUXVlcnkpO1xuXG5cblxuXG5cblxuXG5cblxuXG5cbn07XHQiLCJ2YXIgbW9yZSA9IHtcblx0aWNlQ3JlYW0gOiB0cnVlLFxuXHRmbGF2b3VyIDogZnVuY3Rpb24oeW91ckZsYXZvdXIpIHtcblx0XHRjb25zb2xlLmxvZyhcIm15IGZhdiBmbGF2IGlzIFwiICsgeW91ckZsYXZvdXIpO1xuXHR9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vcmU7IiwidmFyIG15QXJyYXkgPSBbXG5cdFwiaGVsbG9cIixcblx0XCJ3b3JsZFwiLFxuXHRcImZyb21cIixcblx0XCJteVwiLFxuXHRcImFycmF5XCJcblx0XTtcblxubW9kdWxlLmV4cG9ydHMgPSBteUFycmF5O1x0XG4iXX0=
