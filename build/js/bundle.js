(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Cache reference to DOM elements */
var domEls = require('./modules/domEls');


/* Animation utilities and functions */
var inView = require('./modules/animations/inView');
var wrapLetters = require('./modules/animations/wrapLetters');
var animateHeading = require('./modules/animations/animateHeading');
var whichTransitionEvent = require('./modules/animations/animation_utils/whichTransitionEvent');
var whichAnimationEvent = require('./modules/animations/animation_utils/whichAnimationEvent');
var getAnimationEvents = require('./modules/animations/animation_utils/getAnimationEvents');
getAnimationEvents();
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






		// /* listen for animationend on [data-page] */

		// // page-1 listner and callback
		// if ($(js_page_1).length > 0) {
			
		// 	// store the animation / transition end event - add to global object? 
		// 	var theEvent = whichAnimationEvent();

		// 	// add listner and callback
		// 	theEvent && js_page_1.addEventListener(theEvent, function(e) {

		// 		if (e.target.id === 'js_page_1' && page_state.animate_to_item) {
									
		// 			domEls.page_1.removeClass('page-animating page-active');

		// 			domEls.page_2.addClass('page-animating page-active slide-in-from-right');
		// 		}


				
		// 		// add listner and callback - listen on animate_from_item state
		// 		if (e.target.id === 'js_page_1' && page_state.animate_from_item) {													
		// 			domEls.page_2
		// 				.removeClass('page-animating page-active slide-to-right');

		// 			domEls.page_1
		// 				.removeClass('slide-from-left page-animating');	
		// 		}
		// 	});
		// }


		// // page-2 listner and callback
		// if ($(js_page_2).length > 0) {
			
		// 	var theAnimationEvent = whichAnimationEvent();

		// 	// add listner and callback - listen on animate_to_item state
		// 	theAnimationEvent && js_page_2.addEventListener(theAnimationEvent, function(e) {

		// 		if (e.target.id === 'js_page_2' && page_state.animate_to_item) {

		// 			$('#js_loading').remove();

		// 			domEls.page_1
		// 				.removeClass('scale-down');
				
		// 			domEls.page_2
		// 				.removeClass('page-animating slide-in-from-right');

		// 			domEls.back_to_menu_btn
		// 				.addClass('on');					
					
		// 		}

				
		// 		// // add listner and callback - listen on animate_from_item state
		// 		// if (e.target.id === 'js_page_2' && page_state.animate_from_item) {													
		// 		// 	domEls.page_2.removeClass('page-animating page-active slide-to-right');

		// 		// 	domEls.page_1
		// 		// 		.removeClass('page-animating');
					
		// 		// }


		// 	});
		// }














		function page_1_anim_end_listeners (e) {

			if (e.target.id === 'js_page_1' && page_state.animate_to_item) {
									
				domEls.page_1
					.removeClass('page-animating page-active');
			}


			if (e.target.id === 'js_page_1' && page_state.animate_from_item) {	

				domEls.page_2
					.removeClass('page-animating page-active slide-to-right');

				domEls.page_1
					.removeClass('slide-from-left page-animating');	

			}
		}


		function page_2_anim_end_listeners(e) {

			if (e.target.id === 'js_page_2' && page_state.animate_to_item) {

				$('#js_loading').remove();

				domEls.page_1
					.removeClass('scale-down');
			
				domEls.page_2
					.removeClass('page-animating slide-in-from-right');

				domEls.back_to_menu_btn
					.addClass('on');					
				
			}
		}


		function page_1_anim_start_listeners (e) {
			if (e.target.id === 'js_page_1') {
				domEls.page_2
					.addClass('page-animating page-active slide-in-from-right');
			}			
		}

		

		// page-1 listner and callback
		if ($(js_page_1).length > 0) {
			js_page_1.addEventListener(animationStart, page_1_anim_start_listeners, false);
			js_page_1.addEventListener(animationEnd, page_1_anim_end_listeners, false);
		}


		// page-2 listner and callback
		if ($(js_page_2).length > 0) {			
			js_page_2.addEventListener(animationEnd, page_2_anim_end_listeners, false);
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

			// local testing with dumby content
			// domEls.page_1.addClass('page-animating scale-down');
					
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
},{"./modules/ajaxCall":2,"./modules/animations/animateHeading":3,"./modules/animations/animation_utils/getAnimationEvents":4,"./modules/animations/animation_utils/whichAnimationEvent":5,"./modules/animations/animation_utils/whichTransitionEvent":6,"./modules/animations/inView":7,"./modules/animations/wrapLetters":8,"./modules/backToMenu":9,"./modules/domEls":10,"./modules/injectSpinner":11,"./modules/readAddressBar":13}],2:[function(require,module,exports){
var domEls = require('./domEls');
var renderTemplates = require('./renderTemplates');
var pageStateUpDate = require('./pageStateUpDate');

module.exports = function ajaxCall(request) {


	$.ajax({
	    url: request.json_url,
	    dataType: 'json'
	})

	.done(function(data){	

		// clear current content - this could be stored
		domEls.page_container.empty();

		// update page_state object
		pageStateUpDate(data, page_state);	

		renderTemplates(data);
			
		// put the tempate in local storage as stringify
		// localStorage.setItem("page_" + request.id, JSON.stringify(data));
		
		// if (Modernizr.localstorage) {
		// 	// put the tempate in local storage as string
		// 	localStorage.setItem('page_' + request.id, chunk[0].innerHTML);				
		// }
															
	})

	.fail(function() {
		console.log('error');
		$('#js_loading').remove();
	})

	.always(function() {
		// console.log('complete!');
	});	

};
},{"./domEls":10,"./pageStateUpDate":12,"./renderTemplates":14}],3:[function(require,module,exports){
var wrapLetters = require('./wrapLetters');

module.exports = function animateHead() {

	var heading = document.getElementById('js_animate_heading');

	if ($(heading).length > 0) {
		wrapLetters(heading);

		var letters = document.getElementById('js_animate_heading').getElementsByClassName('letter');

		var n = 0;

		for (var i = 0; i < letters.length; i++) {		
			letters[i].style.transition = 'opacity ' + n + 'ms ease';
			n+=200;
		}

	}

	window.setTimeout(function() {
		$(heading).addClass('on-load');
	}, 200);
	

};
},{"./wrapLetters":8}],4:[function(require,module,exports){
module.exports = function getAnimationEvents() {

	// Initialise needed variables
	var prefixes = ["webkit", "moz", "MS", "o"];
	var elem = document.createElement('div');
	var i;

	// Animation Start
	window.animationStart = "animationstart";
	for (i = 0; i < prefixes.length; i++) {
	    if (elem.style[prefixes[i] + "AnimationStart"] !== undefined){
	        window.animationStart = prefixes[i] + "AnimationStart";
	        break;
	    }
	}

	// Animation Iteration
	window.animationIteration = "animationiteration";
	for (i = 0; i < prefixes.length; i++) {
	    if (elem.style[prefixes[i] + "AnimationIteration"] !== undefined){
	        window.animationIteration = prefixes[i] + "AnimationIteration";
	        break;
	    }
	}

	// Animation End
	window.animationEnd = "animationend";
	for (i = 0; i < prefixes.length; i++) {
	    if (elem.style[prefixes[i] + "AnimationEnd"] !== undefined){
	        window.animationEnd = prefixes[i] + "AnimationEnd";
	        break;
	    }
	}

};
},{}],5:[function(require,module,exports){
module.exports = function whichAnimationEvent() {
	
	var key;	
    var el = document.createElement('fakeelement');

	var animations = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	};

    for(key in animations){
        if( el.style[key] !== undefined ){
            return animations[key];
        }
    }	
};
},{}],6:[function(require,module,exports){
module.exports = function whichTransitionEvent() {

	var key;	
	var el = document.createElement('fakeelement');

	var transitions = {
		'transition':'transitionend',
		'OTransition':'oTransitionEnd',
		'MozTransition':'transitionend',
		'WebkitTransition':'webkitTransitionEnd'
	};

	for(key in transitions){
		if( el.style[key] !== undefined ){
		    return transitions[key];
		}
	}	
};
},{}],7:[function(require,module,exports){
var domEls = require('../domEls');

module.exports = function inView(container, $el) {

	// http://www.html5rocks.com/en/tutorials/speed/animations/#debouncing-scroll-events

	var $animation_elements = $el;

	var page = container;

	var latestKnownScrollY = 0,
		ticking = false,
		pageHeight = $(window).height(),
		theOffset = 0;

	function onScroll() {
		latestKnownScrollY = $(js_page_1).scrollTop();
		requestTick();
	}
	function requestTick() {
		if(!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}
	function update() {
		// reset the tick so we can
		// capture the next onScroll
		ticking = false;

		var currentScrollY = latestKnownScrollY;

		// read offset of DOM elements
		theOffset = $animation_elements.offset();

		// and compare to the currentScrollY value
		// then apply some CSS classes
		// to the visible items
		if (theOffset.top < pageHeight) {
			$animation_elements.addClass('in-view');
		} else {
			$animation_elements.removeClass('in-view');
		}

		// console.log(theOffset.top);
		// console.log(pageHeight);

	}

	page.addEventListener('scroll', onScroll, false);
	

};
},{"../domEls":10}],8:[function(require,module,exports){
module.exports = function wrapLetters(el) {
	return el.innerHTML = el.textContent.split("").map(function (letter) {
		return '<span class=letter>' + letter + '</span>';
	}).join("");	
};
},{}],9:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function backToMenu() {

	// update page_state
	page_state.current_page = 'js_page_1';

	// hide the button 
	$(domEls.back_to_menu_btn)
				.addClass('off');


	// scroll the single item page back to top
	window.setTimeout(function() {

		$('#js_page_2').scrollTop( 0 );

		$(domEls.back_to_menu_btn)
			.removeClass('on off');

	}, 300);
		        				    	
};
},{"./domEls":10}],10:[function(require,module,exports){
var domEls = {
	page_1: $('#js_page_1'),
	page_2: $('#js_page_2'),
	trigger_transition : $('#js_trigger_transition'),
	animation_elements : $('#js_animate_head'),
	page_container : $('#js_page_single_item'),
	back_to_menu_btn : $('#js_back_to_menu'),
	spinner : $('<div id="js_loading"><div class="spinner"></div></div>')
};


module.exports = domEls;
},{}],11:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function injectSpinner() {
	$('body').append(domEls.spinner);	
};
},{"./domEls":10}],12:[function(require,module,exports){
module.exports = function pageStateUpDate(data, page_state) {
	
	page_state.current_page = data.slug;

	page_state.loaded_pages.push({
		"page_id" : data.id,
		"page_slug" : data.slug,
		"page_url" : data.link,
		"json_link" : data._links.self[0].href			
	});

	return page_state;
};
},{}],13:[function(require,module,exports){
var domEls = require('./domEls');
var backToMenu = require('./backToMenu');
// var isLoaded = require('./isLoaded');
var injectSpinner = require('./injectSpinner');
var ajaxCall = require('./ajaxCall');




module.exports = function readAddressBar(request, page_state) {

    // Safari fire popstate event on page load. Hack to avoid infinate loop - wrap in setTimeout

    setTimeout( function() {

    	window.addEventListener("popstate", function(e) {		


    		    // get the slug
            pathArray = document.location.pathname.split( '/' );
            theIndex = pathArray.length - 2;
            theSlug = pathArray[theIndex];	
            theResult = false;
            
            // console.log('readAddressBar.js - theSlug = ' + theSlug);

            window.location.assign(document.location.href);

            /*           
             if theSlug is in postdata.slug update request and fire ajax - you are on the js_page_1
             if not trigger back to menu click 
            */

            // are you on the same page_state
            // if (theSlug === page_state.current_page) {
            //   return false;
            // }

            
            // if (theSlug === "" || theSlug === "jasonrighelato") {

            //   if (page_state.current_page !== "js_page_1") {

            //     console.log("you're on the js_page_1");
            //     domEls.back_to_menu_btn.trigger('click');
            //     backToMenu();
            //     page_state.current_page = "js_page_1";
            //     return false;            
            //   }                              
            // }

            // for (var key in postdata.slug) {

            //   if (postdata.slug.hasOwnProperty(key)) {
                
            //     // console.log( key + " : " + postdata.slug[key]);

            //     if (theSlug === key) {

            //       console.log(theSlug);
            //       $('#' + theSlug).trigger('click');

            //       // theResult = true; 
            //       // // updates request object
            //       // request = {};
            //       // // get the href
            //       // request.href = "";
            //       // // Get items ID from the DOM
            //       // request.id = postdata.slug[key];   
            //       // // Get REST URL from WordPress
            //       // request.json_url = postdata.json_url[request.id];       
            //       // // create the DOM el id string 
            //       // request.id_str = 'page_' + request.id;
            //     } 
            //   } 
            // } 

            // if (theResult) {                    
            //     injectSpinner();
            //     // if isLoaded grab the chunk from localStorage
            //     ajaxCall(request);          
            // } else {
             
            //  window.location.assign(jr_portfolio.config.siteUrl);
            //   //  for browsersync only - CHANGE TO:
              
            //    // window.location.assign(postdata.root_url);           
            // }


        });  

        }, 300 );   	
};




},{"./ajaxCall":2,"./backToMenu":9,"./domEls":10,"./injectSpinner":11}],14:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function renderTemplates(data) {

	var slug = data.slug;
	var imageUrl = data.acf.header_image.url;

	function onComplete() {
		// All set.. fire page transitions
		domEls.page_1.addClass('page-animating scale-down');
	}

	$("#js_page_single_item").removeClass().addClass(slug);

	$("#js_page_single_item").loadTemplate($("#itemTemplate"), {

		"title" : data.title.rendered,
		"intro" : data.acf.long_description,
		"heroImage" : data.acf.header_image.url,
		"image_1" : data.acf.image_1.url,
		"details_1" : data.acf.details_1,
		"image_2" : data.acf.image_2.url,
		"details_2" : data.acf.details_2,
		"btnText" : "Visit the site",
		"btnLink" : data.acf.site_url
   		}, { complete: onComplete });	

};
},{"./domEls":10}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvZ2V0QW5pbWF0aW9uRXZlbnRzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0aW9uX3V0aWxzL3doaWNoQW5pbWF0aW9uRXZlbnQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hUcmFuc2l0aW9uRXZlbnQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9pblZpZXcuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy93cmFwTGV0dGVycy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9iYWNrVG9NZW51LmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2RvbUVscy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9pbmplY3RTcGlubmVyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3BhZ2VTdGF0ZVVwRGF0ZS5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9yZWFkQWRkcmVzc0Jhci5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9yZW5kZXJUZW1wbGF0ZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDamNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogQ2FjaGUgcmVmZXJlbmNlIHRvIERPTSBlbGVtZW50cyAqL1xudmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9kb21FbHMnKTtcblxuXG4vKiBBbmltYXRpb24gdXRpbGl0aWVzIGFuZCBmdW5jdGlvbnMgKi9cbnZhciBpblZpZXcgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9pblZpZXcnKTtcbnZhciB3cmFwTGV0dGVycyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzJyk7XG52YXIgYW5pbWF0ZUhlYWRpbmcgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlSGVhZGluZycpO1xudmFyIHdoaWNoVHJhbnNpdGlvbkV2ZW50ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0aW9uX3V0aWxzL3doaWNoVHJhbnNpdGlvbkV2ZW50Jyk7XG52YXIgd2hpY2hBbmltYXRpb25FdmVudCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaEFuaW1hdGlvbkV2ZW50Jyk7XG52YXIgZ2V0QW5pbWF0aW9uRXZlbnRzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0aW9uX3V0aWxzL2dldEFuaW1hdGlvbkV2ZW50cycpO1xuZ2V0QW5pbWF0aW9uRXZlbnRzKCk7XG4vKlxuZ2V0IGNhbGxiYWNrcyBmcm9tIGNzcyBhbmltYXRpb25zOiBodHRwczovL2Rhdmlkd2Fsc2gubmFtZS9jc3MtYW5pbWF0aW9uLWNhbGxiYWNrXG5cbnZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbCcpOyAvLyBnZXQgc29tZSBlbGVtZW50XG5cdFxuLy8gc3RvcmUgdGhlIGFuaW1hdGlvbiAvIHRyYW5zaXRpb24gZW5kIGV2ZW50IC0gYWRkIHRvIGdsb2JhbCBvYmplY3Q/IFxudmFyIHRoZUV2ZW50ID0gd2hpY2hBbmltYXRpb25FdmVudCgpO1xuXG4vLyBhZGQgbGlzdG5lciBhbmQgY2FsbGJhY2tcbnRoZUV2ZW50ICYmIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhlRXZlbnQsIGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygnVHJhbnNpdGlvbiBjb21wbGV0ZSEgIFRoaXMgaXMgdGhlIGNhbGxiYWNrLCBubyBsaWJyYXJ5IG5lZWRlZCEnKTtcbn0pO1xuKi9cblxuXG4vKiB0ZXN0aW5nIGFuaW1hdGUuanMgOiBodHRwczovL2dpdGh1Yi5jb20vYmVuZGMvYW5pbWF0ZSAqL1xuLy8gdmFyIHRlc3RBbmltYXRlSnMgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlX2pzL3Rlc3RBbmltYXRlSnMnKTtcbi8vIHRlc3RBbmltYXRlSnMoKTtcblxuXG5cblxuLyogbG9hZGluZyB3b3JrIHBhZ2VzICovXG52YXIgaW5qZWN0U3Bpbm5lciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pbmplY3RTcGlubmVyJyk7XG52YXIgYWpheENhbGwgPSByZXF1aXJlKCcuL21vZHVsZXMvYWpheENhbGwnKTtcbnZhciByZWFkQWRkcmVzc0JhciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9yZWFkQWRkcmVzc0JhcicpOyAvLyBzaW1wbGUgcm91dGluZ1xuLy8gdmFyIGlzTG9hZGVkID0gcmVxdWlyZSgnLi9tb2R1bGVzL2lzTG9hZGVkJyk7IC8vIHVzZSB3aXRoIGxvY2Fsc3RvcmFnZSBcbnZhciBiYWNrVG9NZW51ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2JhY2tUb01lbnUnKTtcblxuXG5cblxuXG5cbi8vIEdMT0JBTCBGT1IgREVWXG5yZXF1ZXN0ID0ge307XG5cbi8vIEdMT0JBTCBGT1IgREVWXG5wYWdlX3N0YXRlID0ge1xuXHRcImFuaW1hdGVfdG9faXRlbVwiIDogZmFsc2UsXG5cdFwiYW5pbWF0ZV9mcm9tX2l0ZW1cIiA6IGZhbHNlLFxuXHRcImN1cnJlbnRfcGFnZVwiIDogXCJcIixcblx0XCJsb2FkZWRfcGFnZXNcIiA6IFtdLFxuXHRcImZyb21QYWdlXCIgOiBcIlwiLFxuXHRcInRvUGFnZVwiIDogXCJcIlxufTtcblxuLy8gRVhBTVBMRVNcblxuLy8gcG9zdGRhdGEge1xuLy8gXHRqc29uX3VybCA6IHtcbi8vIFx0XHQyOCA6ICBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy8yOFwiLFxuLy8gXHRcdDMwOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy8zMFwiXG4vLyBcdH0sXG4vLyBcdHJvb3RfdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG9cIixcbi8vXHRzbHVnOiB7XG4vL1x0XHRcImFjZVwiIDogMjgsXG4vL1x0XHRcImJvY1wiIDogMzBcbi8vIFx0fVxuLy8gfVxuXG4vLyByZXF1ZXN0ID0ge1xuLy8gXHRcImhyZWZcIiA6IFwiXCIsXG4vLyBcdFwiaWRcIiA6IDAsXG4vLyBcdFwiaWRfc3RyXCIgOiBcIlwiLFxuLy8gXHRcImpzb25fdXJsXCIgOiBcIlwiXHRcbi8vIH07XG5cblxuLy8gXCJsb2FkZWRfcGFnZXNcIiA6IFtcbi8vIFx0e1xuLy8gXHRcdGpzb25fbGluazogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvOFwiXG4vLyBcdFx0cGFnZV9pZDogOFxuLy8gXHRcdHBhZ2Vfc2x1ZzogXCJiaXJkcy1vZi1iZXJrc2hpcmUtYXRsYXNcIlxuLy8gXHRcdHBhZ2VfdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vYmlyZHMtb2YtYmVya3NoaXJlLWF0bGFzL1wiXHRcdFx0XG4vLyBcdH1cbi8vIF1cblxuXG4oZnVuY3Rpb24oJCkge1x0XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cblx0XHQvKiBTRVQgVVAgQU5JTUFUSU9OUyAqL1xuXG5cdFx0dmFyIHRoZVRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX2FuaW1hdGVfdGl0bGUnKTtcblxuXHRcdGlmICgkKHRoZVRpdGxlKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR3cmFwTGV0dGVycyh0aGVUaXRsZSk7XG5cdFx0fVxuXHRcdFxuXHRcdFxuXHRcdGFuaW1hdGVIZWFkaW5nKCk7XG5cdFx0XG5cdFx0XG5cdFx0dmFyIGpzX3BhZ2VfMSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19wYWdlXzEnKTtcblx0XHR2YXIganNfcGFnZV8yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX3BhZ2VfMicpO1xuXG5cblxuXHRcdC8vIHRlc3QgaW5WaWV3IDpcblx0XHQvLyB2YXIgJGFuaW1hdGlvbl9lbGVtZW50cyA9ICQoJyNqc19hbmltYXRlX2hlYWRpbmcnKTtcdFxuXHRcdC8vIGlmICgkKGpzX3BhZ2VfMSkubGVuZ3RoID4gMCkge1xuXHRcdC8vIFx0aW5WaWV3KGpzX3BhZ2VfMSwgJGFuaW1hdGlvbl9lbGVtZW50cyk7XG5cdFx0Ly8gfVxuXG5cdFx0XG5cdFx0XG5cblxuXHRcdC8vIFNjcm9sbFJldmVhbCBwbHVnaW5cblx0XHRpZiAoJChqc19wYWdlXzEpLmxlbmd0aCA+IDApIHtcblx0XHRcdHdpbmRvdy5zciA9IFNjcm9sbFJldmVhbCgpXG5cdFx0XHRcdCAgLnJldmVhbCggJy5jb250ZW50LWNlbGwnLCB7IGNvbnRhaW5lcjoganNfcGFnZV8xIH0gKVxuXHRcdFx0XHQgIC5yZXZlYWwoICcud29ya19tZW51X2xpbmsnLCB7IGNvbnRhaW5lcjoganNfcGFnZV8xIH0gKTtcblx0XHR9XG5cblxuXG5cblxuXG5cdFx0Ly8gLyogbGlzdGVuIGZvciBhbmltYXRpb25lbmQgb24gW2RhdGEtcGFnZV0gKi9cblxuXHRcdC8vIC8vIHBhZ2UtMSBsaXN0bmVyIGFuZCBjYWxsYmFja1xuXHRcdC8vIGlmICgkKGpzX3BhZ2VfMSkubGVuZ3RoID4gMCkge1xuXHRcdFx0XG5cdFx0Ly8gXHQvLyBzdG9yZSB0aGUgYW5pbWF0aW9uIC8gdHJhbnNpdGlvbiBlbmQgZXZlbnQgLSBhZGQgdG8gZ2xvYmFsIG9iamVjdD8gXG5cdFx0Ly8gXHR2YXIgdGhlRXZlbnQgPSB3aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cblx0XHQvLyBcdC8vIGFkZCBsaXN0bmVyIGFuZCBjYWxsYmFja1xuXHRcdC8vIFx0dGhlRXZlbnQgJiYganNfcGFnZV8xLmFkZEV2ZW50TGlzdGVuZXIodGhlRXZlbnQsIGZ1bmN0aW9uKGUpIHtcblxuXHRcdC8vIFx0XHRpZiAoZS50YXJnZXQuaWQgPT09ICdqc19wYWdlXzEnICYmIHBhZ2Vfc3RhdGUuYW5pbWF0ZV90b19pdGVtKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcblx0XHQvLyBcdFx0XHRkb21FbHMucGFnZV8xLnJlbW92ZUNsYXNzKCdwYWdlLWFuaW1hdGluZyBwYWdlLWFjdGl2ZScpO1xuXG5cdFx0Ly8gXHRcdFx0ZG9tRWxzLnBhZ2VfMi5hZGRDbGFzcygncGFnZS1hbmltYXRpbmcgcGFnZS1hY3RpdmUgc2xpZGUtaW4tZnJvbS1yaWdodCcpO1xuXHRcdC8vIFx0XHR9XG5cblxuXHRcdFx0XHRcblx0XHQvLyBcdFx0Ly8gYWRkIGxpc3RuZXIgYW5kIGNhbGxiYWNrIC0gbGlzdGVuIG9uIGFuaW1hdGVfZnJvbV9pdGVtIHN0YXRlXG5cdFx0Ly8gXHRcdGlmIChlLnRhcmdldC5pZCA9PT0gJ2pzX3BhZ2VfMScgJiYgcGFnZV9zdGF0ZS5hbmltYXRlX2Zyb21faXRlbSkge1x0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0Ly8gXHRcdFx0ZG9tRWxzLnBhZ2VfMlxuXHRcdC8vIFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdwYWdlLWFuaW1hdGluZyBwYWdlLWFjdGl2ZSBzbGlkZS10by1yaWdodCcpO1xuXG5cdFx0Ly8gXHRcdFx0ZG9tRWxzLnBhZ2VfMVxuXHRcdC8vIFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdzbGlkZS1mcm9tLWxlZnQgcGFnZS1hbmltYXRpbmcnKTtcdFxuXHRcdC8vIFx0XHR9XG5cdFx0Ly8gXHR9KTtcblx0XHQvLyB9XG5cblxuXHRcdC8vIC8vIHBhZ2UtMiBsaXN0bmVyIGFuZCBjYWxsYmFja1xuXHRcdC8vIGlmICgkKGpzX3BhZ2VfMikubGVuZ3RoID4gMCkge1xuXHRcdFx0XG5cdFx0Ly8gXHR2YXIgdGhlQW5pbWF0aW9uRXZlbnQgPSB3aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cblx0XHQvLyBcdC8vIGFkZCBsaXN0bmVyIGFuZCBjYWxsYmFjayAtIGxpc3RlbiBvbiBhbmltYXRlX3RvX2l0ZW0gc3RhdGVcblx0XHQvLyBcdHRoZUFuaW1hdGlvbkV2ZW50ICYmIGpzX3BhZ2VfMi5hZGRFdmVudExpc3RlbmVyKHRoZUFuaW1hdGlvbkV2ZW50LCBmdW5jdGlvbihlKSB7XG5cblx0XHQvLyBcdFx0aWYgKGUudGFyZ2V0LmlkID09PSAnanNfcGFnZV8yJyAmJiBwYWdlX3N0YXRlLmFuaW1hdGVfdG9faXRlbSkge1xuXG5cdFx0Ly8gXHRcdFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcblxuXHRcdC8vIFx0XHRcdGRvbUVscy5wYWdlXzFcblx0XHQvLyBcdFx0XHRcdC5yZW1vdmVDbGFzcygnc2NhbGUtZG93bicpO1xuXHRcdFx0XHRcblx0XHQvLyBcdFx0XHRkb21FbHMucGFnZV8yXG5cdFx0Ly8gXHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3BhZ2UtYW5pbWF0aW5nIHNsaWRlLWluLWZyb20tcmlnaHQnKTtcblxuXHRcdC8vIFx0XHRcdGRvbUVscy5iYWNrX3RvX21lbnVfYnRuXG5cdFx0Ly8gXHRcdFx0XHQuYWRkQ2xhc3MoJ29uJyk7XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFxuXHRcdC8vIFx0XHR9XG5cblx0XHRcdFx0XG5cdFx0Ly8gXHRcdC8vIC8vIGFkZCBsaXN0bmVyIGFuZCBjYWxsYmFjayAtIGxpc3RlbiBvbiBhbmltYXRlX2Zyb21faXRlbSBzdGF0ZVxuXHRcdC8vIFx0XHQvLyBpZiAoZS50YXJnZXQuaWQgPT09ICdqc19wYWdlXzInICYmIHBhZ2Vfc3RhdGUuYW5pbWF0ZV9mcm9tX2l0ZW0pIHtcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHRcdC8vIFx0XHQvLyBcdGRvbUVscy5wYWdlXzIucmVtb3ZlQ2xhc3MoJ3BhZ2UtYW5pbWF0aW5nIHBhZ2UtYWN0aXZlIHNsaWRlLXRvLXJpZ2h0Jyk7XG5cblx0XHQvLyBcdFx0Ly8gXHRkb21FbHMucGFnZV8xXG5cdFx0Ly8gXHRcdC8vIFx0XHQucmVtb3ZlQ2xhc3MoJ3BhZ2UtYW5pbWF0aW5nJyk7XG5cdFx0XHRcdFx0XG5cdFx0Ly8gXHRcdC8vIH1cblxuXG5cdFx0Ly8gXHR9KTtcblx0XHQvLyB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXHRcdGZ1bmN0aW9uIHBhZ2VfMV9hbmltX2VuZF9saXN0ZW5lcnMgKGUpIHtcblxuXHRcdFx0aWYgKGUudGFyZ2V0LmlkID09PSAnanNfcGFnZV8xJyAmJiBwYWdlX3N0YXRlLmFuaW1hdGVfdG9faXRlbSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdGRvbUVscy5wYWdlXzFcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3BhZ2UtYW5pbWF0aW5nIHBhZ2UtYWN0aXZlJyk7XG5cdFx0XHR9XG5cblxuXHRcdFx0aWYgKGUudGFyZ2V0LmlkID09PSAnanNfcGFnZV8xJyAmJiBwYWdlX3N0YXRlLmFuaW1hdGVfZnJvbV9pdGVtKSB7XHRcblxuXHRcdFx0XHRkb21FbHMucGFnZV8yXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdwYWdlLWFuaW1hdGluZyBwYWdlLWFjdGl2ZSBzbGlkZS10by1yaWdodCcpO1xuXG5cdFx0XHRcdGRvbUVscy5wYWdlXzFcblx0XHRcdFx0XHQucmVtb3ZlQ2xhc3MoJ3NsaWRlLWZyb20tbGVmdCBwYWdlLWFuaW1hdGluZycpO1x0XG5cblx0XHRcdH1cblx0XHR9XG5cblxuXHRcdGZ1bmN0aW9uIHBhZ2VfMl9hbmltX2VuZF9saXN0ZW5lcnMoZSkge1xuXG5cdFx0XHRpZiAoZS50YXJnZXQuaWQgPT09ICdqc19wYWdlXzInICYmIHBhZ2Vfc3RhdGUuYW5pbWF0ZV90b19pdGVtKSB7XG5cblx0XHRcdFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcblxuXHRcdFx0XHRkb21FbHMucGFnZV8xXG5cdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCdzY2FsZS1kb3duJyk7XG5cdFx0XHRcblx0XHRcdFx0ZG9tRWxzLnBhZ2VfMlxuXHRcdFx0XHRcdC5yZW1vdmVDbGFzcygncGFnZS1hbmltYXRpbmcgc2xpZGUtaW4tZnJvbS1yaWdodCcpO1xuXG5cdFx0XHRcdGRvbUVscy5iYWNrX3RvX21lbnVfYnRuXG5cdFx0XHRcdFx0LmFkZENsYXNzKCdvbicpO1x0XHRcdFx0XHRcblx0XHRcdFx0XG5cdFx0XHR9XG5cdFx0fVxuXG5cblx0XHRmdW5jdGlvbiBwYWdlXzFfYW5pbV9zdGFydF9saXN0ZW5lcnMgKGUpIHtcblx0XHRcdGlmIChlLnRhcmdldC5pZCA9PT0gJ2pzX3BhZ2VfMScpIHtcblx0XHRcdFx0ZG9tRWxzLnBhZ2VfMlxuXHRcdFx0XHRcdC5hZGRDbGFzcygncGFnZS1hbmltYXRpbmcgcGFnZS1hY3RpdmUgc2xpZGUtaW4tZnJvbS1yaWdodCcpO1xuXHRcdFx0fVx0XHRcdFxuXHRcdH1cblxuXHRcdFxuXG5cdFx0Ly8gcGFnZS0xIGxpc3RuZXIgYW5kIGNhbGxiYWNrXG5cdFx0aWYgKCQoanNfcGFnZV8xKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRqc19wYWdlXzEuYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25TdGFydCwgcGFnZV8xX2FuaW1fc3RhcnRfbGlzdGVuZXJzLCBmYWxzZSk7XG5cdFx0XHRqc19wYWdlXzEuYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25FbmQsIHBhZ2VfMV9hbmltX2VuZF9saXN0ZW5lcnMsIGZhbHNlKTtcblx0XHR9XG5cblxuXHRcdC8vIHBhZ2UtMiBsaXN0bmVyIGFuZCBjYWxsYmFja1xuXHRcdGlmICgkKGpzX3BhZ2VfMikubGVuZ3RoID4gMCkge1x0XHRcdFxuXHRcdFx0anNfcGFnZV8yLmFkZEV2ZW50TGlzdGVuZXIoYW5pbWF0aW9uRW5kLCBwYWdlXzJfYW5pbV9lbmRfbGlzdGVuZXJzLCBmYWxzZSk7XG5cdFx0fVxuXG5cblxuXG5cblxuXG5cblxuXG5cdFxuXG5cdFx0XHRcdFx0XG5cdFx0JCgnLndvcmtfbWVudV9saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Ly8gc2V0IHRoZSBwYWdlX3N0YXRlIFxuXHRcdFx0cGFnZV9zdGF0ZS5hbmltYXRlX2Zyb21faXRlbSA9IGZhbHNlO1xuXHRcdFx0cGFnZV9zdGF0ZS5hbmltYXRlX3RvX2l0ZW0gPSB0cnVlO1xuXG5cdFx0XHQvLyB1cGRhdGVzIHJlcXVlc3Qgb2JqZWN0XG5cdFx0XHRyZXF1ZXN0ID0ge307XG5cdFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFx0XHRcdFxuXHRcdFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFx0XHRcblxuXHRcdFx0aW5qZWN0U3Bpbm5lcigpO1xuXG5cdFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblxuXHRcdFx0Ly8gbG9jYWwgdGVzdGluZyB3aXRoIGR1bWJ5IGNvbnRlbnRcblx0XHRcdC8vIGRvbUVscy5wYWdlXzEuYWRkQ2xhc3MoJ3BhZ2UtYW5pbWF0aW5nIHNjYWxlLWRvd24nKTtcblx0XHRcdFx0XHRcblx0XHRcdGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdFx0IFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdFx0Ly8gLyogQkFDSyBUTyBNRU5VICovXG5cdFx0ZG9tRWxzLmJhY2tfdG9fbWVudV9idG4ub24oJ3RvdWNoc3RhcnQgY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFxuXHRcdFx0cGFnZV9zdGF0ZS5hbmltYXRlX3RvX2l0ZW0gPSBmYWxzZTtcblx0XHRcdHBhZ2Vfc3RhdGUuYW5pbWF0ZV9mcm9tX2l0ZW0gPSB0cnVlO1xuXG5cdFx0XHQvLyAkKCdbZGF0YS1wYWdlXScpLnJlbW92ZUNsYXNzKCdwYWdlLWFjdGl2ZScpO1xuXG5cdFx0XHQkKGpzX3BhZ2VfMSkuYWRkQ2xhc3MoJ3NsaWRlLWZyb20tbGVmdCBwYWdlLWFjdGl2ZSBwYWdlLWFuaW1hdGluZycpO1xuXHRcdFx0JChqc19wYWdlXzIpLmFkZENsYXNzKCdzbGlkZS10by1yaWdodCBwYWdlLWFjdGl2ZSBwYWdlLWFuaW1hdGluZycpO1xuXG5cdFx0XHRiYWNrVG9NZW51KCk7XG5cblx0XHRcdC8vIGZvciBicm93c2Vyc3luYyBvbmx5IC0gQ0hBTkdFIFRPOlxuXHRcdFx0Ly8gaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIHBvc3RkYXRhLnJvb3RfdXJsICk7XHQgICAgICAgIFxuXHRcdFx0aGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCApO1xuXG5cdFx0fSk7XG5cblxuXG5cblxuXG5cblx0XHQvKiBUT0RPIC0gQlJPV1NFUlMgQkFDSyBCVVRUT04gKi9cblx0XHQvLyBpZiAoJChqc19wYWdlXzEpLmxlbmd0aCA+IDApIHtcblxuXHRcdC8vIFx0cmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSk7XG5cdFx0Ly8gXHQvLyBhZGRzIHRoZSBwb3BzdGF0ZSBldmVudCBoYW5kbGVyIFxuXHRcdC8vIFx0Ly8gbmVlZHMgcmV2aXNpb25cblxuXHRcdC8vIH1cblxuXG5cdFx0cmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdFx0LyogVE9ETyAtIEhPVkVSICovXG5cdFx0Ly8gaWYgbm8gdG91Y2ggd2UgY2FuIGFudGljaXBhdGUgYSBjbGljayBhbmQgZmlyZSBhamF4Q2FsbCBvbiBtb3VzZW92ZXIgb2YgbWVudSBsaW5rc1xuXHRcdC8vIGlmICghTW9kZXJuaXpyLnRvdWNoZXZlbnRzKSB7XG5cblx0XHQvLyBcdCQoJyNhcHAnKS5vbignbW91c2VvdmVyJywgJ2EnLCBmdW5jdGlvbigpIHtcblxuXHRcdC8vIFx0XHRyZXF1ZXN0ID0ge307XG5cdFx0Ly8gXHRcdC8vIGdldCB0aGUgaHJlZlxuXHRcdC8vIFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdC8vIFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHQvLyBcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0Ly8gXHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFx0XHRcdFxuXHRcdC8vIFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcblxuXHRcdC8vIFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0Ly8gXHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0Ly8gXHRcdH1cblxuXHRcdC8vIFx0fSk7XG5cdFx0Ly8gfVxuXG5cblxuXG5cdFx0LyogRklSU1QgQVRURU1QVCAtIENMSUNLICovXG5cblx0XHQvLyAkKCcjYXBwJykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0Ly8gXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1x0XHRcblxuXHRcdC8vIFx0cmVxdWVzdCA9IHt9O1x0XHRcdFx0XG5cdFx0Ly8gXHQvLyBnZXQgdGhlIGhyZWZcblx0XHQvLyBcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0Ly8gXHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0Ly8gXHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0Ly8gXHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHQvLyBcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFxuXHRcdC8vIFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdC8vIFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFx0XG5cdFx0XHRcdFx0XG5cdFx0Ly8gXHQvLyBpcyBpdCBhbHJlYWR5IGxvYWRlZCBpbnRvIERPTT8gQ2hlY2sgdGhlIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzIGFycmF5XG5cdFx0Ly8gXHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0Ly8gXHRcdGFqYXhDYWxsKHJlcXVlc3QpO1xuXHRcdC8vIFx0fVxuXHRcdFxuXHRcdC8vIFx0aWYgKE1vZGVybml6ci5oaXN0b3J5KSB7XG5cdFx0Ly8gXHQgXHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCByZXF1ZXN0LmhyZWYpO1xuXHRcdC8vIFx0fVxuXG5cdFx0Ly8gfSk7XG5cblxuXG5cdFx0XG5cblxuXHRcdFxuXG5cblx0fSk7XG5cblxufSkoalF1ZXJ5KTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcbnZhciByZW5kZXJUZW1wbGF0ZXMgPSByZXF1aXJlKCcuL3JlbmRlclRlbXBsYXRlcycpO1xudmFyIHBhZ2VTdGF0ZVVwRGF0ZSA9IHJlcXVpcmUoJy4vcGFnZVN0YXRlVXBEYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYWpheENhbGwocmVxdWVzdCkge1xuXG5cblx0JC5hamF4KHtcblx0ICAgIHVybDogcmVxdWVzdC5qc29uX3VybCxcblx0ICAgIGRhdGFUeXBlOiAnanNvbidcblx0fSlcblxuXHQuZG9uZShmdW5jdGlvbihkYXRhKXtcdFxuXG5cdFx0Ly8gY2xlYXIgY3VycmVudCBjb250ZW50IC0gdGhpcyBjb3VsZCBiZSBzdG9yZWRcblx0XHRkb21FbHMucGFnZV9jb250YWluZXIuZW1wdHkoKTtcblxuXHRcdC8vIHVwZGF0ZSBwYWdlX3N0YXRlIG9iamVjdFxuXHRcdHBhZ2VTdGF0ZVVwRGF0ZShkYXRhLCBwYWdlX3N0YXRlKTtcdFxuXG5cdFx0cmVuZGVyVGVtcGxhdGVzKGRhdGEpO1xuXHRcdFx0XG5cdFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5naWZ5XG5cdFx0Ly8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYWdlX1wiICsgcmVxdWVzdC5pZCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdFxuXHRcdC8vIGlmIChNb2Rlcm5penIubG9jYWxzdG9yYWdlKSB7XG5cdFx0Ly8gXHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdcblx0XHQvLyBcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYWdlXycgKyByZXF1ZXN0LmlkLCBjaHVua1swXS5pbm5lckhUTUwpO1x0XHRcdFx0XG5cdFx0Ly8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdH0pXG5cblx0LmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coJ2Vycm9yJyk7XG5cdFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcblx0fSlcblxuXHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKCdjb21wbGV0ZSEnKTtcblx0fSk7XHRcblxufTsiLCJ2YXIgd3JhcExldHRlcnMgPSByZXF1aXJlKCcuL3dyYXBMZXR0ZXJzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5pbWF0ZUhlYWQoKSB7XG5cblx0dmFyIGhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNfYW5pbWF0ZV9oZWFkaW5nJyk7XG5cblx0aWYgKCQoaGVhZGluZykubGVuZ3RoID4gMCkge1xuXHRcdHdyYXBMZXR0ZXJzKGhlYWRpbmcpO1xuXG5cdFx0dmFyIGxldHRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNfYW5pbWF0ZV9oZWFkaW5nJykuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGV0dGVyJyk7XG5cblx0XHR2YXIgbiA9IDA7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxldHRlcnMubGVuZ3RoOyBpKyspIHtcdFx0XG5cdFx0XHRsZXR0ZXJzW2ldLnN0eWxlLnRyYW5zaXRpb24gPSAnb3BhY2l0eSAnICsgbiArICdtcyBlYXNlJztcblx0XHRcdG4rPTIwMDtcblx0XHR9XG5cblx0fVxuXG5cdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdCQoaGVhZGluZykuYWRkQ2xhc3MoJ29uLWxvYWQnKTtcblx0fSwgMjAwKTtcblx0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRBbmltYXRpb25FdmVudHMoKSB7XG5cblx0Ly8gSW5pdGlhbGlzZSBuZWVkZWQgdmFyaWFibGVzXG5cdHZhciBwcmVmaXhlcyA9IFtcIndlYmtpdFwiLCBcIm1velwiLCBcIk1TXCIsIFwib1wiXTtcblx0dmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblx0dmFyIGk7XG5cblx0Ly8gQW5pbWF0aW9uIFN0YXJ0XG5cdHdpbmRvdy5hbmltYXRpb25TdGFydCA9IFwiYW5pbWF0aW9uc3RhcnRcIjtcblx0Zm9yIChpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG5cdCAgICBpZiAoZWxlbS5zdHlsZVtwcmVmaXhlc1tpXSArIFwiQW5pbWF0aW9uU3RhcnRcIl0gIT09IHVuZGVmaW5lZCl7XG5cdCAgICAgICAgd2luZG93LmFuaW1hdGlvblN0YXJ0ID0gcHJlZml4ZXNbaV0gKyBcIkFuaW1hdGlvblN0YXJ0XCI7XG5cdCAgICAgICAgYnJlYWs7XG5cdCAgICB9XG5cdH1cblxuXHQvLyBBbmltYXRpb24gSXRlcmF0aW9uXG5cdHdpbmRvdy5hbmltYXRpb25JdGVyYXRpb24gPSBcImFuaW1hdGlvbml0ZXJhdGlvblwiO1xuXHRmb3IgKGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcblx0ICAgIGlmIChlbGVtLnN0eWxlW3ByZWZpeGVzW2ldICsgXCJBbmltYXRpb25JdGVyYXRpb25cIl0gIT09IHVuZGVmaW5lZCl7XG5cdCAgICAgICAgd2luZG93LmFuaW1hdGlvbkl0ZXJhdGlvbiA9IHByZWZpeGVzW2ldICsgXCJBbmltYXRpb25JdGVyYXRpb25cIjtcblx0ICAgICAgICBicmVhaztcblx0ICAgIH1cblx0fVxuXG5cdC8vIEFuaW1hdGlvbiBFbmRcblx0d2luZG93LmFuaW1hdGlvbkVuZCA9IFwiYW5pbWF0aW9uZW5kXCI7XG5cdGZvciAoaSA9IDA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKykge1xuXHQgICAgaWYgKGVsZW0uc3R5bGVbcHJlZml4ZXNbaV0gKyBcIkFuaW1hdGlvbkVuZFwiXSAhPT0gdW5kZWZpbmVkKXtcblx0ICAgICAgICB3aW5kb3cuYW5pbWF0aW9uRW5kID0gcHJlZml4ZXNbaV0gKyBcIkFuaW1hdGlvbkVuZFwiO1xuXHQgICAgICAgIGJyZWFrO1xuXHQgICAgfVxuXHR9XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaEFuaW1hdGlvbkV2ZW50KCkge1xuXHRcblx0dmFyIGtleTtcdFxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG5cblx0dmFyIGFuaW1hdGlvbnMgPSB7XG5cdFx0J1dlYmtpdEFuaW1hdGlvbicgOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcblx0XHQnT0FuaW1hdGlvbicgOiAnb0FuaW1hdGlvbkVuZCcsXG5cdFx0J21zQW5pbWF0aW9uJyA6ICdNU0FuaW1hdGlvbkVuZCcsXG5cdFx0J2FuaW1hdGlvbicgOiAnYW5pbWF0aW9uZW5kJ1xuXHR9O1xuXG4gICAgZm9yKGtleSBpbiBhbmltYXRpb25zKXtcbiAgICAgICAgaWYoIGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoVHJhbnNpdGlvbkV2ZW50KCkge1xuXG5cdHZhciBrZXk7XHRcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcblxuXHR2YXIgdHJhbnNpdGlvbnMgPSB7XG5cdFx0J3RyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcblx0XHQnT1RyYW5zaXRpb24nOidvVHJhbnNpdGlvbkVuZCcsXG5cdFx0J01velRyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcblx0XHQnV2Via2l0VHJhbnNpdGlvbic6J3dlYmtpdFRyYW5zaXRpb25FbmQnXG5cdH07XG5cblx0Zm9yKGtleSBpbiB0cmFuc2l0aW9ucyl7XG5cdFx0aWYoIGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCApe1xuXHRcdCAgICByZXR1cm4gdHJhbnNpdGlvbnNba2V5XTtcblx0XHR9XG5cdH1cdFxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5WaWV3KGNvbnRhaW5lciwgJGVsKSB7XG5cblx0Ly8gaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvc3BlZWQvYW5pbWF0aW9ucy8jZGVib3VuY2luZy1zY3JvbGwtZXZlbnRzXG5cblx0dmFyICRhbmltYXRpb25fZWxlbWVudHMgPSAkZWw7XG5cblx0dmFyIHBhZ2UgPSBjb250YWluZXI7XG5cblx0dmFyIGxhdGVzdEtub3duU2Nyb2xsWSA9IDAsXG5cdFx0dGlja2luZyA9IGZhbHNlLFxuXHRcdHBhZ2VIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCksXG5cdFx0dGhlT2Zmc2V0ID0gMDtcblxuXHRmdW5jdGlvbiBvblNjcm9sbCgpIHtcblx0XHRsYXRlc3RLbm93blNjcm9sbFkgPSAkKGpzX3BhZ2VfMSkuc2Nyb2xsVG9wKCk7XG5cdFx0cmVxdWVzdFRpY2soKTtcblx0fVxuXHRmdW5jdGlvbiByZXF1ZXN0VGljaygpIHtcblx0XHRpZighdGlja2luZykge1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG5cdFx0fVxuXHRcdHRpY2tpbmcgPSB0cnVlO1xuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblx0XHQvLyByZXNldCB0aGUgdGljayBzbyB3ZSBjYW5cblx0XHQvLyBjYXB0dXJlIHRoZSBuZXh0IG9uU2Nyb2xsXG5cdFx0dGlja2luZyA9IGZhbHNlO1xuXG5cdFx0dmFyIGN1cnJlbnRTY3JvbGxZID0gbGF0ZXN0S25vd25TY3JvbGxZO1xuXG5cdFx0Ly8gcmVhZCBvZmZzZXQgb2YgRE9NIGVsZW1lbnRzXG5cdFx0dGhlT2Zmc2V0ID0gJGFuaW1hdGlvbl9lbGVtZW50cy5vZmZzZXQoKTtcblxuXHRcdC8vIGFuZCBjb21wYXJlIHRvIHRoZSBjdXJyZW50U2Nyb2xsWSB2YWx1ZVxuXHRcdC8vIHRoZW4gYXBwbHkgc29tZSBDU1MgY2xhc3Nlc1xuXHRcdC8vIHRvIHRoZSB2aXNpYmxlIGl0ZW1zXG5cdFx0aWYgKHRoZU9mZnNldC50b3AgPCBwYWdlSGVpZ2h0KSB7XG5cdFx0XHQkYW5pbWF0aW9uX2VsZW1lbnRzLmFkZENsYXNzKCdpbi12aWV3Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRhbmltYXRpb25fZWxlbWVudHMucmVtb3ZlQ2xhc3MoJ2luLXZpZXcnKTtcblx0XHR9XG5cblx0XHQvLyBjb25zb2xlLmxvZyh0aGVPZmZzZXQudG9wKTtcblx0XHQvLyBjb25zb2xlLmxvZyhwYWdlSGVpZ2h0KTtcblxuXHR9XG5cblx0cGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgZmFsc2UpO1xuXHRcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdyYXBMZXR0ZXJzKGVsKSB7XG5cdHJldHVybiBlbC5pbm5lckhUTUwgPSBlbC50ZXh0Q29udGVudC5zcGxpdChcIlwiKS5tYXAoZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdHJldHVybiAnPHNwYW4gY2xhc3M9bGV0dGVyPicgKyBsZXR0ZXIgKyAnPC9zcGFuPic7XG5cdH0pLmpvaW4oXCJcIik7XHRcbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmFja1RvTWVudSgpIHtcblxuXHQvLyB1cGRhdGUgcGFnZV9zdGF0ZVxuXHRwYWdlX3N0YXRlLmN1cnJlbnRfcGFnZSA9ICdqc19wYWdlXzEnO1xuXG5cdC8vIGhpZGUgdGhlIGJ1dHRvbiBcblx0JChkb21FbHMuYmFja190b19tZW51X2J0bilcblx0XHRcdFx0LmFkZENsYXNzKCdvZmYnKTtcblxuXG5cdC8vIHNjcm9sbCB0aGUgc2luZ2xlIGl0ZW0gcGFnZSBiYWNrIHRvIHRvcFxuXHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdCQoJyNqc19wYWdlXzInKS5zY3JvbGxUb3AoIDAgKTtcblxuXHRcdCQoZG9tRWxzLmJhY2tfdG9fbWVudV9idG4pXG5cdFx0XHQucmVtb3ZlQ2xhc3MoJ29uIG9mZicpO1xuXG5cdH0sIDMwMCk7XG5cdFx0ICAgICAgICBcdFx0XHRcdCAgICBcdFxufTsiLCJ2YXIgZG9tRWxzID0ge1xuXHRwYWdlXzE6ICQoJyNqc19wYWdlXzEnKSxcblx0cGFnZV8yOiAkKCcjanNfcGFnZV8yJyksXG5cdHRyaWdnZXJfdHJhbnNpdGlvbiA6ICQoJyNqc190cmlnZ2VyX3RyYW5zaXRpb24nKSxcblx0YW5pbWF0aW9uX2VsZW1lbnRzIDogJCgnI2pzX2FuaW1hdGVfaGVhZCcpLFxuXHRwYWdlX2NvbnRhaW5lciA6ICQoJyNqc19wYWdlX3NpbmdsZV9pdGVtJyksXG5cdGJhY2tfdG9fbWVudV9idG4gOiAkKCcjanNfYmFja190b19tZW51JyksXG5cdHNwaW5uZXIgOiAkKCc8ZGl2IGlkPVwianNfbG9hZGluZ1wiPjxkaXYgY2xhc3M9XCJzcGlubmVyXCI+PC9kaXY+PC9kaXY+Jylcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkb21FbHM7IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5qZWN0U3Bpbm5lcigpIHtcblx0JCgnYm9keScpLmFwcGVuZChkb21FbHMuc3Bpbm5lcik7XHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSkge1xuXHRcblx0cGFnZV9zdGF0ZS5jdXJyZW50X3BhZ2UgPSBkYXRhLnNsdWc7XG5cblx0cGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMucHVzaCh7XG5cdFx0XCJwYWdlX2lkXCIgOiBkYXRhLmlkLFxuXHRcdFwicGFnZV9zbHVnXCIgOiBkYXRhLnNsdWcsXG5cdFx0XCJwYWdlX3VybFwiIDogZGF0YS5saW5rLFxuXHRcdFwianNvbl9saW5rXCIgOiBkYXRhLl9saW5rcy5zZWxmWzBdLmhyZWZcdFx0XHRcblx0fSk7XG5cblx0cmV0dXJuIHBhZ2Vfc3RhdGU7XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xudmFyIGJhY2tUb01lbnUgPSByZXF1aXJlKCcuL2JhY2tUb01lbnUnKTtcbi8vIHZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vaXNMb2FkZWQnKTtcbnZhciBpbmplY3RTcGlubmVyID0gcmVxdWlyZSgnLi9pbmplY3RTcGlubmVyJyk7XG52YXIgYWpheENhbGwgPSByZXF1aXJlKCcuL2FqYXhDYWxsJyk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSkge1xuXG4gICAgLy8gU2FmYXJpIGZpcmUgcG9wc3RhdGUgZXZlbnQgb24gcGFnZSBsb2FkLiBIYWNrIHRvIGF2b2lkIGluZmluYXRlIGxvb3AgLSB3cmFwIGluIHNldFRpbWVvdXRcblxuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXG4gICAgXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZ1bmN0aW9uKGUpIHtcdFx0XG5cblxuICAgIFx0XHQgICAgLy8gZ2V0IHRoZSBzbHVnXG4gICAgICAgICAgICBwYXRoQXJyYXkgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCggJy8nICk7XG4gICAgICAgICAgICB0aGVJbmRleCA9IHBhdGhBcnJheS5sZW5ndGggLSAyO1xuICAgICAgICAgICAgdGhlU2x1ZyA9IHBhdGhBcnJheVt0aGVJbmRleF07XHRcbiAgICAgICAgICAgIHRoZVJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVhZEFkZHJlc3NCYXIuanMgLSB0aGVTbHVnID0gJyArIHRoZVNsdWcpO1xuXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAgICAgICAvKiAgICAgICAgICAgXG4gICAgICAgICAgICAgaWYgdGhlU2x1ZyBpcyBpbiBwb3N0ZGF0YS5zbHVnIHVwZGF0ZSByZXF1ZXN0IGFuZCBmaXJlIGFqYXggLSB5b3UgYXJlIG9uIHRoZSBqc19wYWdlXzFcbiAgICAgICAgICAgICBpZiBub3QgdHJpZ2dlciBiYWNrIHRvIG1lbnUgY2xpY2sgXG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAvLyBhcmUgeW91IG9uIHRoZSBzYW1lIHBhZ2Vfc3RhdGVcbiAgICAgICAgICAgIC8vIGlmICh0aGVTbHVnID09PSBwYWdlX3N0YXRlLmN1cnJlbnRfcGFnZSkge1xuICAgICAgICAgICAgLy8gICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gaWYgKHRoZVNsdWcgPT09IFwiXCIgfHwgdGhlU2x1ZyA9PT0gXCJqYXNvbnJpZ2hlbGF0b1wiKSB7XG5cbiAgICAgICAgICAgIC8vICAgaWYgKHBhZ2Vfc3RhdGUuY3VycmVudF9wYWdlICE9PSBcImpzX3BhZ2VfMVwiKSB7XG5cbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcInlvdSdyZSBvbiB0aGUganNfcGFnZV8xXCIpO1xuICAgICAgICAgICAgLy8gICAgIGRvbUVscy5iYWNrX3RvX21lbnVfYnRuLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAvLyAgICAgYmFja1RvTWVudSgpO1xuICAgICAgICAgICAgLy8gICAgIHBhZ2Vfc3RhdGUuY3VycmVudF9wYWdlID0gXCJqc19wYWdlXzFcIjtcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gZmFsc2U7ICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgLy8gZm9yICh2YXIga2V5IGluIHBvc3RkYXRhLnNsdWcpIHtcblxuICAgICAgICAgICAgLy8gICBpZiAocG9zdGRhdGEuc2x1Zy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coIGtleSArIFwiIDogXCIgKyBwb3N0ZGF0YS5zbHVnW2tleV0pO1xuXG4gICAgICAgICAgICAvLyAgICAgaWYgKHRoZVNsdWcgPT09IGtleSkge1xuXG4gICAgICAgICAgICAvLyAgICAgICBjb25zb2xlLmxvZyh0aGVTbHVnKTtcbiAgICAgICAgICAgIC8vICAgICAgICQoJyMnICsgdGhlU2x1ZykudHJpZ2dlcignY2xpY2snKTtcblxuICAgICAgICAgICAgLy8gICAgICAgLy8gdGhlUmVzdWx0ID0gdHJ1ZTsgXG4gICAgICAgICAgICAvLyAgICAgICAvLyAvLyB1cGRhdGVzIHJlcXVlc3Qgb2JqZWN0XG4gICAgICAgICAgICAvLyAgICAgICAvLyByZXF1ZXN0ID0ge307XG4gICAgICAgICAgICAvLyAgICAgICAvLyAvLyBnZXQgdGhlIGhyZWZcbiAgICAgICAgICAgIC8vICAgICAgIC8vIHJlcXVlc3QuaHJlZiA9IFwiXCI7XG4gICAgICAgICAgICAvLyAgICAgICAvLyAvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG4gICAgICAgICAgICAvLyAgICAgICAvLyByZXF1ZXN0LmlkID0gcG9zdGRhdGEuc2x1Z1trZXldOyAgIFxuICAgICAgICAgICAgLy8gICAgICAgLy8gLy8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG4gICAgICAgICAgICAvLyAgICAgICAvLyByZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07ICAgICAgIFxuICAgICAgICAgICAgLy8gICAgICAgLy8gLy8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuICAgICAgICAgICAgLy8gICAgICAgLy8gcmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcbiAgICAgICAgICAgIC8vICAgICB9IFxuICAgICAgICAgICAgLy8gICB9IFxuICAgICAgICAgICAgLy8gfSBcblxuICAgICAgICAgICAgLy8gaWYgKHRoZVJlc3VsdCkgeyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgICAgaW5qZWN0U3Bpbm5lcigpO1xuICAgICAgICAgICAgLy8gICAgIC8vIGlmIGlzTG9hZGVkIGdyYWIgdGhlIGNodW5rIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICAvLyAgICAgYWpheENhbGwocmVxdWVzdCk7ICAgICAgICAgIFxuICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICB3aW5kb3cubG9jYXRpb24uYXNzaWduKGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCk7XG4gICAgICAgICAgICAvLyAgIC8vICBmb3IgYnJvd3NlcnN5bmMgb25seSAtIENIQU5HRSBUTzpcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgICAvLyB3aW5kb3cubG9jYXRpb24uYXNzaWduKHBvc3RkYXRhLnJvb3RfdXJsKTsgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgfSk7ICBcblxuICAgICAgICB9LCAzMDAgKTsgICBcdFxufTtcblxuXG5cbiIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlbmRlclRlbXBsYXRlcyhkYXRhKSB7XG5cblx0dmFyIHNsdWcgPSBkYXRhLnNsdWc7XG5cdHZhciBpbWFnZVVybCA9IGRhdGEuYWNmLmhlYWRlcl9pbWFnZS51cmw7XG5cblx0ZnVuY3Rpb24gb25Db21wbGV0ZSgpIHtcblx0XHQvLyBBbGwgc2V0Li4gZmlyZSBwYWdlIHRyYW5zaXRpb25zXG5cdFx0ZG9tRWxzLnBhZ2VfMS5hZGRDbGFzcygncGFnZS1hbmltYXRpbmcgc2NhbGUtZG93bicpO1xuXHR9XG5cblx0JChcIiNqc19wYWdlX3NpbmdsZV9pdGVtXCIpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moc2x1Zyk7XG5cblx0JChcIiNqc19wYWdlX3NpbmdsZV9pdGVtXCIpLmxvYWRUZW1wbGF0ZSgkKFwiI2l0ZW1UZW1wbGF0ZVwiKSwge1xuXG5cdFx0XCJ0aXRsZVwiIDogZGF0YS50aXRsZS5yZW5kZXJlZCxcblx0XHRcImludHJvXCIgOiBkYXRhLmFjZi5sb25nX2Rlc2NyaXB0aW9uLFxuXHRcdFwiaGVyb0ltYWdlXCIgOiBkYXRhLmFjZi5oZWFkZXJfaW1hZ2UudXJsLFxuXHRcdFwiaW1hZ2VfMVwiIDogZGF0YS5hY2YuaW1hZ2VfMS51cmwsXG5cdFx0XCJkZXRhaWxzXzFcIiA6IGRhdGEuYWNmLmRldGFpbHNfMSxcblx0XHRcImltYWdlXzJcIiA6IGRhdGEuYWNmLmltYWdlXzIudXJsLFxuXHRcdFwiZGV0YWlsc18yXCIgOiBkYXRhLmFjZi5kZXRhaWxzXzIsXG5cdFx0XCJidG5UZXh0XCIgOiBcIlZpc2l0IHRoZSBzaXRlXCIsXG5cdFx0XCJidG5MaW5rXCIgOiBkYXRhLmFjZi5zaXRlX3VybFxuICAgXHRcdH0sIHsgY29tcGxldGU6IG9uQ29tcGxldGUgfSk7XHRcblxufTsiXX0=
