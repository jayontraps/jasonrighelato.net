/* Cache reference to DOM elements */
var domEls = require('./modules/domEls');


/* Animation utilities and functions */
var inView = require('./modules/animations/inView');
var wrapLetters = require('./modules/animations/wrapLetters');
var animateHeading = require('./modules/animations/animateHeading');
var whichTransitionEvent = require('./modules/animations/animation_utils/whichTransitionEvent');
var whichAnimationEvent = require('./modules/animations/animation_utils/whichAnimationEvent');

/*
get callbacks from css animations: https://davidwalsh.name/css-animation-callback

var el = document.getElementById('el'); // get some element
	
// store the animation / transition end event - add to global object? 
var theEvent = whichAnimationEvent();

// add listner and callback
theEvent && el.addEventListener(theEvent, function() {
	console.log('Transition complete!  This is the callback, no library needed!');
});
*/


/* testing animate.js : https://github.com/bendc/animate */
// var testAnimateJs = require('./modules/animations/animate_js/testAnimateJs');
// testAnimateJs();




/* loading work pages */
var injectSpinner = require('./modules/injectSpinner');
var ajaxCall = require('./modules/ajaxCall');
var readAddressBar = require('./modules/readAddressBar'); // simple routing
// var isLoaded = require('./modules/isLoaded'); // use with localstorage 
var backToMenu = require('./modules/backToMenu');






// GLOBAL FOR DEV
request = {};

// GLOBAL FOR DEV
page_state = {
	"animate_to_item" : false,
	"animate_from_item" : false,
	"current_page" : "",
	"loaded_pages" : [],
	"fromPage" : "",
	"toPage" : ""
};

// EXAMPLES

// postdata {
// 	json_url : {
// 		28 :  "http://localhost/jasonrighelato/wp-json/wp/v2/posts/28",
// 		30: "http://localhost/jasonrighelato/wp-json/wp/v2/posts/30"
// 	},
// 	root_url: "http://localhost/jasonrighelato",
//	slug: {
//		"ace" : 28,
//		"boc" : 30
// 	}
// }

// request = {
// 	"href" : "",
// 	"id" : 0,
// 	"id_str" : "",
// 	"json_url" : ""	
// };


// "loaded_pages" : [
// 	{
// 		json_link: "http://localhost/jasonrighelato/wp-json/wp/v2/posts/8"
// 		page_id: 8
// 		page_slug: "birds-of-berkshire-atlas"
// 		page_url: "http://localhost/jasonrighelato/birds-of-berkshire-atlas/"			
// 	}
// ]


(function($) {	

	$(document).ready(function() {

		/* SET UP ANIMATIONS */

		var theTitle = document.getElementById('js_animate_title');

		if ($(theTitle).length > 0) {
			wrapLetters(theTitle);
		}
		
		
		animateHeading();
		
		
		var js_page_1 = document.getElementById('js_page_1');
		var js_page_2 = document.getElementById('js_page_2');



		// test inView :
		// var $animation_elements = $('#js_animate_heading');	
		// if ($(js_page_1).length > 0) {
		// 	inView(js_page_1, $animation_elements);
		// }

		
		


		// ScrollReveal plugin
		if ($(js_page_1).length > 0) {
			window.sr = ScrollReveal()
				  .reveal( '.content-cell', { container: js_page_1 } )
				  .reveal( '.work_menu_link', { container: js_page_1 } );
		}

		






		/* listen for animationend on [data-page] */

		// page-1 listner and callback
		if ($(js_page_1).length > 0) {
			
			// store the animation / transition end event - add to global object? 
			var theEvent = whichAnimationEvent();

			// add listner and callback
			theEvent && js_page_1.addEventListener(theEvent, function(e) {

				if (e.target.id === 'js_page_1' && page_state.animate_to_item) {
									
					domEls.page_1.removeClass('page-animating page-active');

					domEls.page_2.addClass('page-animating page-active slide-in-from-right');
				}


				
				// add listner and callback - listen on animate_from_item state
				if (e.target.id === 'js_page_1' && page_state.animate_from_item) {													
					domEls.page_2
						.removeClass('page-animating page-active slide-to-right');

					domEls.page_1
						.removeClass('slide-from-left page-animating');	
				}
			});
		}


		// page-2 listner and callback
		if ($(js_page_2).length > 0) {
			
			var theAnimationEvent = whichAnimationEvent();

			// add listner and callback - listen on animate_to_item state
			theAnimationEvent && js_page_2.addEventListener(theAnimationEvent, function(e) {

				if (e.target.id === 'js_page_2' && page_state.animate_to_item) {

					$('#js_loading').remove();

					domEls.page_1
						.removeClass('scale-down');
				
					domEls.page_2
						.removeClass('page-animating slide-in-from-right');

					domEls.back_to_menu_btn
						.addClass('on');					
					
				}

				
				// // add listner and callback - listen on animate_from_item state
				// if (e.target.id === 'js_page_2' && page_state.animate_from_item) {													
				// 	domEls.page_2.removeClass('page-animating page-active slide-to-right');

				// 	domEls.page_1
				// 		.removeClass('page-animating');
					
				// }


			});
		}







	

					
		$('.work_menu_link').on('click', function(event) {

			event.preventDefault();

			// set the page_state 
			page_state.animate_from_item = false;
			page_state.animate_to_item = true;

			// updates request object
			request = {};
			// get the href
			request.href = $(this).attr("href");
			// Get items ID from the DOM
			request.id = $(this).data('api');		
			// Get REST URL from WordPress
			request.json_url = postdata.json_url[request.id];				
			// create the DOM el id string 
			request.id_str = 'page_' + request.id;			

			injectSpinner();

			ajaxCall(request);
					
			if (Modernizr.history) {
			 	history.pushState(null, null, request.href);
			}
		});














		// /* BACK TO MENU */
		domEls.back_to_menu_btn.on('touchstart click', function(event) {
			event.preventDefault();
			
			page_state.animate_to_item = false;
			page_state.animate_from_item = true;

			// $('[data-page]').removeClass('page-active');

			$(js_page_1).addClass('slide-from-left page-active page-animating');
			$(js_page_2).addClass('slide-to-right page-active page-animating');

			backToMenu();

			// for browsersync only - CHANGE TO:
			// history.pushState( null, null, postdata.root_url );	        
			history.pushState( null, null, jr_portfolio.config.siteUrl );

		});







		/* TODO - BROWSERS BACK BUTTON */
		// if ($(js_page_1).length > 0) {

		// 	readAddressBar(request, page_state);
		// 	// adds the popstate event handler 
		// 	// needs revision

		// }


		readAddressBar(request, page_state);















		/* TODO - HOVER */
		// if no touch we can anticipate a click and fire ajaxCall on mouseover of menu links
		// if (!Modernizr.touchevents) {

		// 	$('#app').on('mouseover', 'a', function() {

		// 		request = {};
		// 		// get the href
		// 		request.href = $(this).attr("href");
		// 		// Get items ID from the DOM
		// 		request.id = $(this).data('api');		
		// 		// Get REST URL from WordPress
		// 		request.json_url = postdata.json_url[request.id];				
		// 		// create the DOM el id string 
		// 		request.id_str = 'page_' + request.id;	

		// 		if ( !isLoaded(request.id, page_state.loaded_pages, request) ) {
		// 			ajaxCall(request);
		// 		}

		// 	});
		// }




		/* FIRST ATTEMPT - CLICK */

		// $('#app').on('click', 'a', function(event) {

		// 	event.preventDefault();		

		// 	request = {};				
		// 	// get the href
		// 	request.href = $(this).attr("href");
		// 	// Get items ID from the DOM
		// 	request.id = $(this).data('api');		
		// 	// Get REST URL from WordPress
		// 	request.json_url = postdata.json_url[request.id];	
		// 	// create the DOM el id string 
		// 	request.id_str = 'page_' + request.id;		
					
		// 	// is it already loaded into DOM? Check the page_state.loaded_pages array
		// 	if ( !isLoaded(request.id, page_state.loaded_pages, request) ) {
		// 		ajaxCall(request);
		// 	}
		
		// 	if (Modernizr.history) {
		// 	 	history.pushState(null, null, request.href);
		// 	}

		// });



		


		


	});


})(jQuery);