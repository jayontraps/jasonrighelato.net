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