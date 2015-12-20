(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Cache reference to DOM elements */
var domEls = require('./modules/domEls');

/* my animations */
// var inView = require('./modules/animations/inView');
var animateHead = require('./modules/animations/animateHead');
animateHead();

var injectSpinner = require('./modules/injectSpinner');
var ajaxCall = require('./modules/ajaxCall');
var readAddressBar = require('./modules/readAddressBar');
var isLoaded = require('./modules/isLoaded');
// var transitionToPage = require('./modules/transitionToPage');
// var transitionBackToMenu = require('./modules/transitionBackToMenu');
var fireTransition = require('./modules/fireTransition');

/* Effeckt */
var core = require('./modules/Effeckt/core');
var pageTransitions = require('./modules/Effeckt/pageTransitions');
// init Effeckt
core();
pageTransitions();




$window = $(window);


// GLOBAL FOR DEV
request = {};

// GLOBAL FOR DEV
page_state = {
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

		var $animation_elements = $('#js_animate_head');
		var $page = $( "[data-effeckt-page]" );

		function check_if_in_view() {

		  var window_height = $page.height();
		  var window_top_position = $page.scrollTop();
		  var window_bottom_position = (window_top_position + window_height);
		 
		  $.each($animation_elements, function() {
		    var $element = $(this);
		    var element_height = $element.outerHeight();
		    var element_top_position = $element.offset().top;
		    var element_bottom_position = (element_top_position + element_height);
		 
		    //check to see if this current container is within viewport
		    if ((element_bottom_position >= window_top_position) &&
		        (element_top_position <= window_bottom_position)) {
		      $element.addClass('in-view');
		    } else {
		      $element.removeClass('in-view');
		    }
		  });
		}

		$page.on('scroll resize', check_if_in_view);
		$page.trigger('scroll');




		/* scroll events */
		// $window.on('scroll resize', inView());
		// $window.trigger('scroll');


















					
		$('.work_menu_items').on('click', function(event) {

			event.preventDefault();

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

			// if isLoaded grab the chunk from localStorage

			ajaxCall(request);

			if (Modernizr.history) {
			 	history.pushState(null, null, request.href);
			}
		});



		/* BACK TO MENU */
		domEls.back_to_menu_btn.on('click', function() {
	        				
	        // for browsersync only - CHANGE TO:
	        history.pushState( null, null, postdata.root_url );
	        
			// history.pushState( null, null, jr_portfolio.config.siteUrl );
		});




		/* BROWSERS BACK BUTTON */
		// add the popstate event handler on the page-portfolio and single-portfolio only
		// will the event handler remain on other pages??

		if ($('body').hasClass('work-page')) {
			readAddressBar(request, page_state);			
		}

















		/* HOVER */
		// if no touch we can anticipate a click and fire ajaxCall on mouseover
		if (!Modernizr.touchevents) {

			$('#app').on('mouseover', 'a', function() {

				request = {};
				// get the href
				request.href = $(this).attr("href");
				// Get items ID from the DOM
				request.id = $(this).data('api');		
				// Get REST URL from WordPress
				request.json_url = postdata.json_url[request.id];				
				// create the DOM el id string 
				request.id_str = 'page_' + request.id;	

				if ( !isLoaded(request.id, page_state.loaded_pages, request) ) {
					ajaxCall(request);
				}

			});
		}




		/* CLICK */
		$('#app').on('click', 'a', function(event) {

			alert("wtf");

			event.preventDefault();		

			request = {};				
			// get the href
			request.href = $(this).attr("href");
			// Get items ID from the DOM
			request.id = $(this).data('api');		
			// Get REST URL from WordPress
			request.json_url = postdata.json_url[request.id];	
			// create the DOM el id string 
			request.id_str = 'page_' + request.id;		
					
			// is it already loaded into DOM? Check the page_state.loaded_pages array
			if ( !isLoaded(request.id, page_state.loaded_pages, request) ) {
				ajaxCall(request);
			}
		
			if (Modernizr.history) {
			 	history.pushState(null, null, request.href);
			}

		});



		


		


	});


})(jQuery);
},{"./modules/Effeckt/core":2,"./modules/Effeckt/pageTransitions":3,"./modules/ajaxCall":4,"./modules/animations/animateHead":5,"./modules/domEls":7,"./modules/fireTransition":8,"./modules/injectSpinner":9,"./modules/isLoaded":10,"./modules/readAddressBar":12}],2:[function(require,module,exports){
module.exports = function core() {

;(function(window){

  var
    // Is Modernizr defined on the global scope
    Modernizr = typeof Modernizr !== "undefined" ? Modernizr : false,

    // Always expect both kinds of event
    buttonPressedEvent = 'touchstart click',

    // List of all animation/transition properties
    // with its animationEnd/transitionEnd event
    animationEndEventNames = {
      'WebkitAnimation' : 'webkitAnimationEnd',
      'OAnimation' : 'oAnimationEnd',
      'msAnimation' : 'MSAnimationEnd',
      'animation' : 'animationend'
    },

    transitionEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'OTransition' : 'oTransitionEnd',
      'msTransition' : 'MSTransitionEnd',
      'transition' : 'transitionend'
    },

    Effeckt = function() {
      this.init();
    };

  // Current version.
  Effeckt.version = '0.0.1';

  // Initialization method
  Effeckt.prototype.init = function() {
    this.buttonPressedEvent = buttonPressedEvent;

    //event trigger after animation/transition end.
    this.transitionEndEventName = Modernizr ? transitionEndEventNames[Modernizr.prefixed('transition')] : getTransitionEndEventNames();
    this.animationEndEventName  = Modernizr ? animationEndEventNames[Modernizr.prefixed('animation')] : getAnimationEndEventNames();
    this.transitionAnimationEndEvent = this.animationEndEventName + ' ' + this.transitionEndEventName;
  };

  Effeckt.prototype.getViewportHeight = function() {

    var docElement = document.documentElement,
      client = docElement['clientHeight'],
      inner = window['innerHeight'];

    if( client < inner )
      return inner;
    else
      return client;
  };

  // Get all the properties for transition/animation end
  function getTransitionEndEventNames() {
    return _getEndEventNames( transitionEndEventNames );
  }

  function getAnimationEndEventNames() {
    return _getEndEventNames( animationEndEventNames );
  }

  function _getEndEventNames(obj) {
    var events = [];

    for ( var eventName in obj ) {
      events.push( obj[ eventName ] );
    }

    return events.join(' ');
  }

  // Creates a Effeckt object.
  window.Effeckt = new Effeckt();

})(this);

	
};
},{}],3:[function(require,module,exports){
module.exports = function pageTransitions() {

var EffecktPageTransitions = {

  fromPage: '',
  toPage: '',
  isAnimating: false,
  isNextPageEnd: false,
  isCurrentPageEnd: false,
  transitionInEffect: '',
  transitionOutEffect: '',

  init: function() {

    this.initPages();
    this.bindUIActions();

  },

  initPages: function(){

    var $pages = $('[data-effeckt-page]');

    this.fromPage = $pages.first().addClass('effeckt-page-active');

  },

  bindUIActions: function() {

    var self = this;

    $('.effeckt-page-transition-button').on( Effeckt.buttonPressedEvent, function(e){

      e.preventDefault();

      var transitionInEffect  = $(this).data('effeckt-transition-in'),
          transitionOutEffect = $(this).data('effeckt-transition-out'),
          transitionPage      = $(this).data('effeckt-transition-page');

      if ( $(this).data("effeckt-needs-perspective")) {
        $("html").addClass("md-perspective");
      }

      self.transitionPage( transitionPage, transitionInEffect, transitionOutEffect );

    });
  },

  transitionPage: function( transitionPage, transitionInEffect, transitionOutEffect ) {

    if ( this.isAnimating ) {

      return false;

    }

    this.isAnimating = true;
    this.isCurrentPageEnd = false;
    this.isNextPageEnd = false;
    this.transitionInEffect = transitionInEffect;
    this.transitionOutEffect= transitionOutEffect;

    // Get Pages
    this.fromPage = $('[data-effeckt-page].effeckt-page-active');
    this.toPage   = $('[data-effeckt-page="' + transitionPage + '"]');

    // Add this class to prevent scroll to be displayed
    this.toPage.addClass('effeckt-page-animating effeckt-page-active ' + this.transitionInEffect);
    this.fromPage.addClass('effeckt-page-animating');

    // Set Transition Class
    this.fromPage.addClass(this.transitionOutEffect);
    
    var self= this;
    
    this.toPage.on( Effeckt.transitionAnimationEndEvent, function() {
      
      self.toPage.off( Effeckt.transitionAnimationEndEvent );
      self.isNextPageEnd = true;

      if ( self.isCurrentPageEnd ) {
        self.resetTransition();
      }
    });

    this.fromPage.on( Effeckt.transitionAnimationEndEvent, function () {

      self.fromPage.off( Effeckt.transitionAnimationEndEvent );
      self.isCurrentPageEnd = true;

      if ( self.isNextPageEnd ) {
        self.resetTransition();
      }

    });

  },

  resetTransition: function() {

    this.isAnimating = false;
    this.isCurrentPageEnd = false;
    this.isNextPageEnd = false;

    this.fromPage.removeClass('effeckt-page-animating effeckt-page-active ' + this.transitionOutEffect);//.hide();
    this.toPage.removeClass('effeckt-page-animating ' + this.transitionInEffect);

    $("html").removeClass("md-perspective");
  }

};

EffecktPageTransitions.init();	
	
};
},{}],4:[function(require,module,exports){
var domEls = require('./domEls');
var buildTemplate = require('./buildTemplate');
var pageStateUpDate = require('./pageStateUpDate');
var fireTransition = require('./fireTransition');

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
		
		// template the data
		var chunk = buildTemplate(data);

		// insert into the DOM		
		domEls.page_container.append(chunk);

		// delay for 500ms in case of fast ajax !
		window.setTimeout(function() {

			$('#js_loading').remove();
    		fireTransition();

		}, 500);
		
	
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
		// alert("error");
	})

	.always(function() {
		// console.log('complete!');
	});	

};
},{"./buildTemplate":6,"./domEls":7,"./fireTransition":8,"./pageStateUpDate":11}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
module.exports = function buildTemplate(data) {

	var i = "";
	var title = data.title.rendered;
	var content = data.content.rendered;

	var images = data.acf.images;
	var imageItems = "";

	if (images.length) {

		for (i = 0; i <= images.length; i++) {

			for (key in images[i]) {

				if (images[i].hasOwnProperty(key)) {

					imageItems += 	'<li>' +
									images[i][key].title + 
									' : ' +
									'<img src="' + 
									images[i][key].sizes.large + 
									'" />' +
									'</li>';					
				} 
			} 		
		}			
	} 






	var testimonials = data.acf.testimonials;
	var testimonialItems = "";

	if (testimonials.length) {

		for (i = 0; i <= testimonials.length; i++) {

			for (key in testimonials[i]) {
				if (testimonials[i].hasOwnProperty(key)) {

					testimonialItems += 	'<li>' +
											key + 
											' : ' +
											'<div>' + 
											testimonials[i][key] + 
											'</div>' +
											'</li>';					
				} 
			} 		
		}			
	} 
	


	var wrapper = $('<div/>', {
		'class' : 'wrapper',		
	});

	$('<h1/>', {
		'class' : 'title',
		html: title
	}).appendTo(wrapper);	

	$('<div/>', {
		'class' : 'content',
		html: content
	}).appendTo(wrapper);

	if (testimonials.length) {

		$('<ul/>', {
			'class' : 'testimonials-list',
			html: testimonialItems
		}).appendTo(wrapper);
	}


	if (images.length) {

		$('<ul/>', {
			'class' : 'image-list',
			html: imageItems
		}).appendTo(wrapper);
	}



	return wrapper;
	
};
},{}],7:[function(require,module,exports){
var domEls = {
	"animation_elements" : $('#js_animate_head'),
	"page_container" : $('#js_page_single_item'),
	"back_to_menu_btn" : $('#js_back_to_menu'),
	"spinner" : $('<div id="js_loading"><div class="spinner"></div></div>')
};


module.exports = domEls;
},{}],8:[function(require,module,exports){
module.exports = function fireTransition() {
	$('.effeckt .the-btn').trigger('click');
};
},{}],9:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function injectSpinner() {
	$('body').append(domEls.spinner);	
};
},{"./domEls":7}],10:[function(require,module,exports){
module.exports = function isLoaded(identifier, arr, request) {

	var res = false;

	for (var i = 0; i < arr.length; i++) {
		
		for (key in arr[i]) {
			
			if (arr[i].hasOwnProperty(key)) {

				if (arr[i][key] === identifier) {
					// if the identifier is found update request.id
					// used for when the identifier is not the id number (eg slug)
					request.id = arr[i].page_id;
					res = true;					
				}
			}
		}				
	}
	
	console.log("isLoaded : " + res);

	return res;

};
},{}],11:[function(require,module,exports){
module.exports = function pageStateUpDate(data, page_state) {

	page_state.loaded_pages.push({
		"page_id" : data.id,
		"page_slug" : data.slug,
		"page_url" : data.link,
		"json_link" : data._links.self[0].href			
	});

	return page_state;
};
},{}],12:[function(require,module,exports){
var domEls = require('./domEls');
var isLoaded = require('./isLoaded');
var injectSpinner = require('./injectSpinner');
var ajaxCall = require('./ajaxCall');

module.exports = function readAddressBar(request, page_state) {

	window.addEventListener("popstate", function(e) {		

		    // get the slug
        pathArray = document.location.pathname.split( '/' );
        theIndex = pathArray.length - 2;
        theSlug = pathArray[theIndex];	
        theResult = false;
        /*
         
         if theSlug is in postdata.slug update request and fire ajax - you are on the homepage
         if not trigger back to menu click 

        */

        for (key in postdata.slug) {

          if (postdata.slug.hasOwnProperty(key)) {
            
            // console.log( key + " : " + postdata.slug[key]);

            if (theSlug === key) {

              theResult = true; 
              // updates request object
              request = {};
              // get the href
              request.href = "";
              // Get items ID from the DOM
              request.id = postdata.slug[key];   
              // Get REST URL from WordPress
              request.json_url = postdata.json_url[request.id];       
              // create the DOM el id string 
              request.id_str = 'page_' + request.id;
            }
          } 
        } 

        if (theResult) {                    
            injectSpinner();
            // if isLoaded grab the chunk from localStorage
            ajaxCall(request);          
        } else {
         
         // window.location.assign(jr_portfolio.config.siteUrl);
          //  for browsersync only - CHANGE TO:
           // window.location.assign(postdata.root_url);           
        }


    });     	
};




},{"./ajaxCall":4,"./domEls":7,"./injectSpinner":9,"./isLoaded":10}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvY29yZS5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9FZmZlY2t0L3BhZ2VUcmFuc2l0aW9ucy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hamF4Q2FsbC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGVIZWFkLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2J1aWxkVGVtcGxhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvZG9tRWxzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2ZpcmVUcmFuc2l0aW9uLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2luamVjdFNwaW5uZXIuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBDYWNoZSByZWZlcmVuY2UgdG8gRE9NIGVsZW1lbnRzICovXG52YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2RvbUVscycpO1xuXG4vKiBteSBhbmltYXRpb25zICovXG4vLyB2YXIgaW5WaWV3ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvaW5WaWV3Jyk7XG52YXIgYW5pbWF0ZUhlYWQgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlSGVhZCcpO1xuYW5pbWF0ZUhlYWQoKTtcblxudmFyIGluamVjdFNwaW5uZXIgPSByZXF1aXJlKCcuL21vZHVsZXMvaW5qZWN0U3Bpbm5lcicpO1xudmFyIGFqYXhDYWxsID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FqYXhDYWxsJyk7XG52YXIgcmVhZEFkZHJlc3NCYXIgPSByZXF1aXJlKCcuL21vZHVsZXMvcmVhZEFkZHJlc3NCYXInKTtcbnZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pc0xvYWRlZCcpO1xuLy8gdmFyIHRyYW5zaXRpb25Ub1BhZ2UgPSByZXF1aXJlKCcuL21vZHVsZXMvdHJhbnNpdGlvblRvUGFnZScpO1xuLy8gdmFyIHRyYW5zaXRpb25CYWNrVG9NZW51ID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RyYW5zaXRpb25CYWNrVG9NZW51Jyk7XG52YXIgZmlyZVRyYW5zaXRpb24gPSByZXF1aXJlKCcuL21vZHVsZXMvZmlyZVRyYW5zaXRpb24nKTtcblxuLyogRWZmZWNrdCAqL1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL21vZHVsZXMvRWZmZWNrdC9jb3JlJyk7XG52YXIgcGFnZVRyYW5zaXRpb25zID0gcmVxdWlyZSgnLi9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zJyk7XG4vLyBpbml0IEVmZmVja3RcbmNvcmUoKTtcbnBhZ2VUcmFuc2l0aW9ucygpO1xuXG5cblxuXG4kd2luZG93ID0gJCh3aW5kb3cpO1xuXG5cbi8vIEdMT0JBTCBGT1IgREVWXG5yZXF1ZXN0ID0ge307XG5cbi8vIEdMT0JBTCBGT1IgREVWXG5wYWdlX3N0YXRlID0ge1xuXHRcImxvYWRlZF9wYWdlc1wiIDogW10sXG5cdFwiZnJvbVBhZ2VcIiA6IFwiXCIsXG5cdFwidG9QYWdlXCIgOiBcIlwiXG59O1xuXG4vLyBFWEFNUExFU1xuXG4vLyBwb3N0ZGF0YSB7XG4vLyBcdGpzb25fdXJsIDoge1xuLy8gXHRcdDI4IDogIFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzI4XCIsXG4vLyBcdFx0MzA6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzMwXCJcbi8vIFx0fSxcbi8vIFx0cm9vdF91cmw6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0b1wiLFxuLy9cdHNsdWc6IHtcbi8vXHRcdFwiYWNlXCIgOiAyOCxcbi8vXHRcdFwiYm9jXCIgOiAzMFxuLy8gXHR9XG4vLyB9XG5cbi8vIHJlcXVlc3QgPSB7XG4vLyBcdFwiaHJlZlwiIDogXCJcIixcbi8vIFx0XCJpZFwiIDogMCxcbi8vIFx0XCJpZF9zdHJcIiA6IFwiXCIsXG4vLyBcdFwianNvbl91cmxcIiA6IFwiXCJcdFxuLy8gfTtcblxuXG4vLyBcImxvYWRlZF9wYWdlc1wiIDogW1xuLy8gXHR7XG4vLyBcdFx0anNvbl9saW5rOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy84XCJcbi8vIFx0XHRwYWdlX2lkOiA4XG4vLyBcdFx0cGFnZV9zbHVnOiBcImJpcmRzLW9mLWJlcmtzaGlyZS1hdGxhc1wiXG4vLyBcdFx0cGFnZV91cmw6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by9iaXJkcy1vZi1iZXJrc2hpcmUtYXRsYXMvXCJcdFx0XHRcbi8vIFx0fVxuLy8gXVxuXG5cbihmdW5jdGlvbigkKSB7XHRcblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuXHRcdHZhciAkYW5pbWF0aW9uX2VsZW1lbnRzID0gJCgnI2pzX2FuaW1hdGVfaGVhZCcpO1xuXHRcdHZhciAkcGFnZSA9ICQoIFwiW2RhdGEtZWZmZWNrdC1wYWdlXVwiICk7XG5cblx0XHRmdW5jdGlvbiBjaGVja19pZl9pbl92aWV3KCkge1xuXG5cdFx0ICB2YXIgd2luZG93X2hlaWdodCA9ICRwYWdlLmhlaWdodCgpO1xuXHRcdCAgdmFyIHdpbmRvd190b3BfcG9zaXRpb24gPSAkcGFnZS5zY3JvbGxUb3AoKTtcblx0XHQgIHZhciB3aW5kb3dfYm90dG9tX3Bvc2l0aW9uID0gKHdpbmRvd190b3BfcG9zaXRpb24gKyB3aW5kb3dfaGVpZ2h0KTtcblx0XHQgXG5cdFx0ICAkLmVhY2goJGFuaW1hdGlvbl9lbGVtZW50cywgZnVuY3Rpb24oKSB7XG5cdFx0ICAgIHZhciAkZWxlbWVudCA9ICQodGhpcyk7XG5cdFx0ICAgIHZhciBlbGVtZW50X2hlaWdodCA9ICRlbGVtZW50Lm91dGVySGVpZ2h0KCk7XG5cdFx0ICAgIHZhciBlbGVtZW50X3RvcF9wb3NpdGlvbiA9ICRlbGVtZW50Lm9mZnNldCgpLnRvcDtcblx0XHQgICAgdmFyIGVsZW1lbnRfYm90dG9tX3Bvc2l0aW9uID0gKGVsZW1lbnRfdG9wX3Bvc2l0aW9uICsgZWxlbWVudF9oZWlnaHQpO1xuXHRcdCBcblx0XHQgICAgLy9jaGVjayB0byBzZWUgaWYgdGhpcyBjdXJyZW50IGNvbnRhaW5lciBpcyB3aXRoaW4gdmlld3BvcnRcblx0XHQgICAgaWYgKChlbGVtZW50X2JvdHRvbV9wb3NpdGlvbiA+PSB3aW5kb3dfdG9wX3Bvc2l0aW9uKSAmJlxuXHRcdCAgICAgICAgKGVsZW1lbnRfdG9wX3Bvc2l0aW9uIDw9IHdpbmRvd19ib3R0b21fcG9zaXRpb24pKSB7XG5cdFx0ICAgICAgJGVsZW1lbnQuYWRkQ2xhc3MoJ2luLXZpZXcnKTtcblx0XHQgICAgfSBlbHNlIHtcblx0XHQgICAgICAkZWxlbWVudC5yZW1vdmVDbGFzcygnaW4tdmlldycpO1xuXHRcdCAgICB9XG5cdFx0ICB9KTtcblx0XHR9XG5cblx0XHQkcGFnZS5vbignc2Nyb2xsIHJlc2l6ZScsIGNoZWNrX2lmX2luX3ZpZXcpO1xuXHRcdCRwYWdlLnRyaWdnZXIoJ3Njcm9sbCcpO1xuXG5cblxuXG5cdFx0Lyogc2Nyb2xsIGV2ZW50cyAqL1xuXHRcdC8vICR3aW5kb3cub24oJ3Njcm9sbCByZXNpemUnLCBpblZpZXcoKSk7XG5cdFx0Ly8gJHdpbmRvdy50cmlnZ2VyKCdzY3JvbGwnKTtcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblx0XHRcdFx0XHRcblx0XHQkKCcud29ya19tZW51X2l0ZW1zJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Ly8gdXBkYXRlcyByZXF1ZXN0IG9iamVjdFxuXHRcdFx0cmVxdWVzdCA9IHt9O1xuXHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcdFx0XHRcblx0XHRcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFx0XG5cblx0XHRcdGluamVjdFNwaW5uZXIoKTtcblxuXHRcdFx0Ly8gaWYgaXNMb2FkZWQgZ3JhYiB0aGUgY2h1bmsgZnJvbSBsb2NhbFN0b3JhZ2VcblxuXHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cblx0XHRcdGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdFx0IFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cblx0XHQvKiBCQUNLIFRPIE1FTlUgKi9cblx0XHRkb21FbHMuYmFja190b19tZW51X2J0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0ICAgICAgICBcdFx0XHRcdFxuXHQgICAgICAgIC8vIGZvciBicm93c2Vyc3luYyBvbmx5IC0gQ0hBTkdFIFRPOlxuXHQgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKCBudWxsLCBudWxsLCBwb3N0ZGF0YS5yb290X3VybCApO1xuXHQgICAgICAgIFxuXHRcdFx0Ly8gaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCApO1xuXHRcdH0pO1xuXG5cblxuXG5cdFx0LyogQlJPV1NFUlMgQkFDSyBCVVRUT04gKi9cblx0XHQvLyBhZGQgdGhlIHBvcHN0YXRlIGV2ZW50IGhhbmRsZXIgb24gdGhlIHBhZ2UtcG9ydGZvbGlvIGFuZCBzaW5nbGUtcG9ydGZvbGlvIG9ubHlcblx0XHQvLyB3aWxsIHRoZSBldmVudCBoYW5kbGVyIHJlbWFpbiBvbiBvdGhlciBwYWdlcz8/XG5cblx0XHRpZiAoJCgnYm9keScpLmhhc0NsYXNzKCd3b3JrLXBhZ2UnKSkge1xuXHRcdFx0cmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSk7XHRcdFx0XG5cdFx0fVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblx0XHQvKiBIT1ZFUiAqL1xuXHRcdC8vIGlmIG5vIHRvdWNoIHdlIGNhbiBhbnRpY2lwYXRlIGEgY2xpY2sgYW5kIGZpcmUgYWpheENhbGwgb24gbW91c2VvdmVyXG5cdFx0aWYgKCFNb2Rlcm5penIudG91Y2hldmVudHMpIHtcblxuXHRcdFx0JCgnI2FwcCcpLm9uKCdtb3VzZW92ZXInLCAnYScsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHJlcXVlc3QgPSB7fTtcblx0XHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0XHRcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHRcdFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1x0XHRcdFx0XG5cdFx0XHRcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHRcdFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFxuXG5cdFx0XHRcdGlmICggIWlzTG9hZGVkKHJlcXVlc3QuaWQsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSApIHtcblx0XHRcdFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9KTtcblx0XHR9XG5cblxuXG5cblx0XHQvKiBDTElDSyAqL1xuXHRcdCQoJyNhcHAnKS5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHRcdGFsZXJ0KFwid3RmXCIpO1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1x0XHRcblxuXHRcdFx0cmVxdWVzdCA9IHt9O1x0XHRcdFx0XG5cdFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFxuXHRcdFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFx0XG5cdFx0XHRcdFx0XG5cdFx0XHQvLyBpcyBpdCBhbHJlYWR5IGxvYWRlZCBpbnRvIERPTT8gQ2hlY2sgdGhlIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzIGFycmF5XG5cdFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0XHRcdGFqYXhDYWxsKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdFxuXHRcdFx0aWYgKE1vZGVybml6ci5oaXN0b3J5KSB7XG5cdFx0XHQgXHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCByZXF1ZXN0LmhyZWYpO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblxuXG5cdFx0XG5cblxuXHRcdFxuXG5cblx0fSk7XG5cblxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvcmUoKSB7XG5cbjsoZnVuY3Rpb24od2luZG93KXtcblxuICB2YXJcbiAgICAvLyBJcyBNb2Rlcm5penIgZGVmaW5lZCBvbiB0aGUgZ2xvYmFsIHNjb3BlXG4gICAgTW9kZXJuaXpyID0gdHlwZW9mIE1vZGVybml6ciAhPT0gXCJ1bmRlZmluZWRcIiA/IE1vZGVybml6ciA6IGZhbHNlLFxuXG4gICAgLy8gQWx3YXlzIGV4cGVjdCBib3RoIGtpbmRzIG9mIGV2ZW50XG4gICAgYnV0dG9uUHJlc3NlZEV2ZW50ID0gJ3RvdWNoc3RhcnQgY2xpY2snLFxuXG4gICAgLy8gTGlzdCBvZiBhbGwgYW5pbWF0aW9uL3RyYW5zaXRpb24gcHJvcGVydGllc1xuICAgIC8vIHdpdGggaXRzIGFuaW1hdGlvbkVuZC90cmFuc2l0aW9uRW5kIGV2ZW50XG4gICAgYW5pbWF0aW9uRW5kRXZlbnROYW1lcyA9IHtcbiAgICAgICdXZWJraXRBbmltYXRpb24nIDogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gICAgICAnT0FuaW1hdGlvbicgOiAnb0FuaW1hdGlvbkVuZCcsXG4gICAgICAnbXNBbmltYXRpb24nIDogJ01TQW5pbWF0aW9uRW5kJyxcbiAgICAgICdhbmltYXRpb24nIDogJ2FuaW1hdGlvbmVuZCdcbiAgICB9LFxuXG4gICAgdHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAnV2Via2l0VHJhbnNpdGlvbicgOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgICAnT1RyYW5zaXRpb24nIDogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAgICdtc1RyYW5zaXRpb24nIDogJ01TVHJhbnNpdGlvbkVuZCcsXG4gICAgICAndHJhbnNpdGlvbicgOiAndHJhbnNpdGlvbmVuZCdcbiAgICB9LFxuXG4gICAgRWZmZWNrdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfTtcblxuICAvLyBDdXJyZW50IHZlcnNpb24uXG4gIEVmZmVja3QudmVyc2lvbiA9ICcwLjAuMSc7XG5cbiAgLy8gSW5pdGlhbGl6YXRpb24gbWV0aG9kXG4gIEVmZmVja3QucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJ1dHRvblByZXNzZWRFdmVudCA9IGJ1dHRvblByZXNzZWRFdmVudDtcblxuICAgIC8vZXZlbnQgdHJpZ2dlciBhZnRlciBhbmltYXRpb24vdHJhbnNpdGlvbiBlbmQuXG4gICAgdGhpcy50cmFuc2l0aW9uRW5kRXZlbnROYW1lID0gTW9kZXJuaXpyID8gdHJhbnNpdGlvbkVuZEV2ZW50TmFtZXNbTW9kZXJuaXpyLnByZWZpeGVkKCd0cmFuc2l0aW9uJyldIDogZ2V0VHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMoKTtcbiAgICB0aGlzLmFuaW1hdGlvbkVuZEV2ZW50TmFtZSAgPSBNb2Rlcm5penIgPyBhbmltYXRpb25FbmRFdmVudE5hbWVzW01vZGVybml6ci5wcmVmaXhlZCgnYW5pbWF0aW9uJyldIDogZ2V0QW5pbWF0aW9uRW5kRXZlbnROYW1lcygpO1xuICAgIHRoaXMudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50ID0gdGhpcy5hbmltYXRpb25FbmRFdmVudE5hbWUgKyAnICcgKyB0aGlzLnRyYW5zaXRpb25FbmRFdmVudE5hbWU7XG4gIH07XG5cbiAgRWZmZWNrdC5wcm90b3R5cGUuZ2V0Vmlld3BvcnRIZWlnaHQgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBkb2NFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgY2xpZW50ID0gZG9jRWxlbWVudFsnY2xpZW50SGVpZ2h0J10sXG4gICAgICBpbm5lciA9IHdpbmRvd1snaW5uZXJIZWlnaHQnXTtcblxuICAgIGlmKCBjbGllbnQgPCBpbm5lciApXG4gICAgICByZXR1cm4gaW5uZXI7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGNsaWVudDtcbiAgfTtcblxuICAvLyBHZXQgYWxsIHRoZSBwcm9wZXJ0aWVzIGZvciB0cmFuc2l0aW9uL2FuaW1hdGlvbiBlbmRcbiAgZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMoKSB7XG4gICAgcmV0dXJuIF9nZXRFbmRFdmVudE5hbWVzKCB0cmFuc2l0aW9uRW5kRXZlbnROYW1lcyApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QW5pbWF0aW9uRW5kRXZlbnROYW1lcygpIHtcbiAgICByZXR1cm4gX2dldEVuZEV2ZW50TmFtZXMoIGFuaW1hdGlvbkVuZEV2ZW50TmFtZXMgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9nZXRFbmRFdmVudE5hbWVzKG9iaikge1xuICAgIHZhciBldmVudHMgPSBbXTtcblxuICAgIGZvciAoIHZhciBldmVudE5hbWUgaW4gb2JqICkge1xuICAgICAgZXZlbnRzLnB1c2goIG9ialsgZXZlbnROYW1lIF0gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnRzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8vIENyZWF0ZXMgYSBFZmZlY2t0IG9iamVjdC5cbiAgd2luZG93LkVmZmVja3QgPSBuZXcgRWZmZWNrdCgpO1xuXG59KSh0aGlzKTtcblxuXHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWdlVHJhbnNpdGlvbnMoKSB7XG5cbnZhciBFZmZlY2t0UGFnZVRyYW5zaXRpb25zID0ge1xuXG4gIGZyb21QYWdlOiAnJyxcbiAgdG9QYWdlOiAnJyxcbiAgaXNBbmltYXRpbmc6IGZhbHNlLFxuICBpc05leHRQYWdlRW5kOiBmYWxzZSxcbiAgaXNDdXJyZW50UGFnZUVuZDogZmFsc2UsXG4gIHRyYW5zaXRpb25JbkVmZmVjdDogJycsXG4gIHRyYW5zaXRpb25PdXRFZmZlY3Q6ICcnLFxuXG4gIGluaXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5pbml0UGFnZXMoKTtcbiAgICB0aGlzLmJpbmRVSUFjdGlvbnMoKTtcblxuICB9LFxuXG4gIGluaXRQYWdlczogZnVuY3Rpb24oKXtcblxuICAgIHZhciAkcGFnZXMgPSAkKCdbZGF0YS1lZmZlY2t0LXBhZ2VdJyk7XG5cbiAgICB0aGlzLmZyb21QYWdlID0gJHBhZ2VzLmZpcnN0KCkuYWRkQ2xhc3MoJ2VmZmVja3QtcGFnZS1hY3RpdmUnKTtcblxuICB9LFxuXG4gIGJpbmRVSUFjdGlvbnM6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgJCgnLmVmZmVja3QtcGFnZS10cmFuc2l0aW9uLWJ1dHRvbicpLm9uKCBFZmZlY2t0LmJ1dHRvblByZXNzZWRFdmVudCwgZnVuY3Rpb24oZSl7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHRyYW5zaXRpb25JbkVmZmVjdCAgPSAkKHRoaXMpLmRhdGEoJ2VmZmVja3QtdHJhbnNpdGlvbi1pbicpLFxuICAgICAgICAgIHRyYW5zaXRpb25PdXRFZmZlY3QgPSAkKHRoaXMpLmRhdGEoJ2VmZmVja3QtdHJhbnNpdGlvbi1vdXQnKSxcbiAgICAgICAgICB0cmFuc2l0aW9uUGFnZSAgICAgID0gJCh0aGlzKS5kYXRhKCdlZmZlY2t0LXRyYW5zaXRpb24tcGFnZScpO1xuXG4gICAgICBpZiAoICQodGhpcykuZGF0YShcImVmZmVja3QtbmVlZHMtcGVyc3BlY3RpdmVcIikpIHtcbiAgICAgICAgJChcImh0bWxcIikuYWRkQ2xhc3MoXCJtZC1wZXJzcGVjdGl2ZVwiKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi50cmFuc2l0aW9uUGFnZSggdHJhbnNpdGlvblBhZ2UsIHRyYW5zaXRpb25JbkVmZmVjdCwgdHJhbnNpdGlvbk91dEVmZmVjdCApO1xuXG4gICAgfSk7XG4gIH0sXG5cbiAgdHJhbnNpdGlvblBhZ2U6IGZ1bmN0aW9uKCB0cmFuc2l0aW9uUGFnZSwgdHJhbnNpdGlvbkluRWZmZWN0LCB0cmFuc2l0aW9uT3V0RWZmZWN0ICkge1xuXG4gICAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ3VycmVudFBhZ2VFbmQgPSBmYWxzZTtcbiAgICB0aGlzLmlzTmV4dFBhZ2VFbmQgPSBmYWxzZTtcbiAgICB0aGlzLnRyYW5zaXRpb25JbkVmZmVjdCA9IHRyYW5zaXRpb25JbkVmZmVjdDtcbiAgICB0aGlzLnRyYW5zaXRpb25PdXRFZmZlY3Q9IHRyYW5zaXRpb25PdXRFZmZlY3Q7XG5cbiAgICAvLyBHZXQgUGFnZXNcbiAgICB0aGlzLmZyb21QYWdlID0gJCgnW2RhdGEtZWZmZWNrdC1wYWdlXS5lZmZlY2t0LXBhZ2UtYWN0aXZlJyk7XG4gICAgdGhpcy50b1BhZ2UgICA9ICQoJ1tkYXRhLWVmZmVja3QtcGFnZT1cIicgKyB0cmFuc2l0aW9uUGFnZSArICdcIl0nKTtcblxuICAgIC8vIEFkZCB0aGlzIGNsYXNzIHRvIHByZXZlbnQgc2Nyb2xsIHRvIGJlIGRpc3BsYXllZFxuICAgIHRoaXMudG9QYWdlLmFkZENsYXNzKCdlZmZlY2t0LXBhZ2UtYW5pbWF0aW5nIGVmZmVja3QtcGFnZS1hY3RpdmUgJyArIHRoaXMudHJhbnNpdGlvbkluRWZmZWN0KTtcbiAgICB0aGlzLmZyb21QYWdlLmFkZENsYXNzKCdlZmZlY2t0LXBhZ2UtYW5pbWF0aW5nJyk7XG5cbiAgICAvLyBTZXQgVHJhbnNpdGlvbiBDbGFzc1xuICAgIHRoaXMuZnJvbVBhZ2UuYWRkQ2xhc3ModGhpcy50cmFuc2l0aW9uT3V0RWZmZWN0KTtcbiAgICBcbiAgICB2YXIgc2VsZj0gdGhpcztcbiAgICBcbiAgICB0aGlzLnRvUGFnZS5vbiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgXG4gICAgICBzZWxmLnRvUGFnZS5vZmYoIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50ICk7XG4gICAgICBzZWxmLmlzTmV4dFBhZ2VFbmQgPSB0cnVlO1xuXG4gICAgICBpZiAoIHNlbGYuaXNDdXJyZW50UGFnZUVuZCApIHtcbiAgICAgICAgc2VsZi5yZXNldFRyYW5zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZnJvbVBhZ2Uub24oIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHNlbGYuZnJvbVBhZ2Uub2ZmKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCApO1xuICAgICAgc2VsZi5pc0N1cnJlbnRQYWdlRW5kID0gdHJ1ZTtcblxuICAgICAgaWYgKCBzZWxmLmlzTmV4dFBhZ2VFbmQgKSB7XG4gICAgICAgIHNlbGYucmVzZXRUcmFuc2l0aW9uKCk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9LFxuXG4gIHJlc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc0N1cnJlbnRQYWdlRW5kID0gZmFsc2U7XG4gICAgdGhpcy5pc05leHRQYWdlRW5kID0gZmFsc2U7XG5cbiAgICB0aGlzLmZyb21QYWdlLnJlbW92ZUNsYXNzKCdlZmZlY2t0LXBhZ2UtYW5pbWF0aW5nIGVmZmVja3QtcGFnZS1hY3RpdmUgJyArIHRoaXMudHJhbnNpdGlvbk91dEVmZmVjdCk7Ly8uaGlkZSgpO1xuICAgIHRoaXMudG9QYWdlLnJlbW92ZUNsYXNzKCdlZmZlY2t0LXBhZ2UtYW5pbWF0aW5nICcgKyB0aGlzLnRyYW5zaXRpb25JbkVmZmVjdCk7XG5cbiAgICAkKFwiaHRtbFwiKS5yZW1vdmVDbGFzcyhcIm1kLXBlcnNwZWN0aXZlXCIpO1xuICB9XG5cbn07XG5cbkVmZmVja3RQYWdlVHJhbnNpdGlvbnMuaW5pdCgpO1x0XG5cdFxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcbnZhciBidWlsZFRlbXBsYXRlID0gcmVxdWlyZSgnLi9idWlsZFRlbXBsYXRlJyk7XG52YXIgcGFnZVN0YXRlVXBEYXRlID0gcmVxdWlyZSgnLi9wYWdlU3RhdGVVcERhdGUnKTtcbnZhciBmaXJlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vZmlyZVRyYW5zaXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhamF4Q2FsbChyZXF1ZXN0KSB7XG5cblx0JC5hamF4KHtcblx0ICAgIHVybDogcmVxdWVzdC5qc29uX3VybCxcblx0ICAgIGRhdGFUeXBlOiAnanNvbidcblx0fSlcblxuXHQuZG9uZShmdW5jdGlvbihkYXRhKXtcdFxuXG5cdFx0Ly8gY2xlYXIgY3VycmVudCBjb250ZW50IC0gdGhpcyBjb3VsZCBiZSBzdG9yZWRcblx0XHRkb21FbHMucGFnZV9jb250YWluZXIuZW1wdHkoKTtcblxuXHRcdC8vIHVwZGF0ZSBwYWdlX3N0YXRlIG9iamVjdFxuXHRcdHBhZ2VTdGF0ZVVwRGF0ZShkYXRhLCBwYWdlX3N0YXRlKTtcdFx0XHRcdFx0XG5cdFx0XG5cdFx0Ly8gdGVtcGxhdGUgdGhlIGRhdGFcblx0XHR2YXIgY2h1bmsgPSBidWlsZFRlbXBsYXRlKGRhdGEpO1xuXG5cdFx0Ly8gaW5zZXJ0IGludG8gdGhlIERPTVx0XHRcblx0XHRkb21FbHMucGFnZV9jb250YWluZXIuYXBwZW5kKGNodW5rKTtcblxuXHRcdC8vIGRlbGF5IGZvciA1MDBtcyBpbiBjYXNlIG9mIGZhc3QgYWpheCAhXG5cdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHRcdCQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG4gICAgXHRcdGZpcmVUcmFuc2l0aW9uKCk7XG5cblx0XHR9LCA1MDApO1xuXHRcdFxuXHRcblx0XHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdpZnlcblx0XHQvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInBhZ2VfXCIgKyByZXF1ZXN0LmlkLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0XG5cdFx0Ly8gaWYgKE1vZGVybml6ci5sb2NhbHN0b3JhZ2UpIHtcblx0XHQvLyBcdC8vIHB1dCB0aGUgdGVtcGF0ZSBpbiBsb2NhbCBzdG9yYWdlIGFzIHN0cmluZ1xuXHRcdC8vIFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BhZ2VfJyArIHJlcXVlc3QuaWQsIGNodW5rWzBdLmlubmVySFRNTCk7XHRcdFx0XHRcblx0XHQvLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0fSlcblxuXHQuZmFpbChmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnZXJyb3InKTtcblx0XHQkKCcjanNfbG9hZGluZycpLnJlbW92ZSgpO1xuXHRcdC8vIGFsZXJ0KFwiZXJyb3JcIik7XG5cdH0pXG5cblx0LmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHQvLyBjb25zb2xlLmxvZygnY29tcGxldGUhJyk7XG5cdH0pO1x0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbmltYXRlSGVhZCgpIHtcblxuXG5cdHZhciBoZWFkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX2FuaW1hdGVfaGVhZCcpO1xuXHR2YXIgaGVhZGluZ18yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX2FuaW1hdGVfYW5vdGhlcl9oZWFkJyk7XG5cdC8vIGNvbnNvbGUubG9nKGVsLnRleHRDb250ZW50LnNwbGl0KFwiXCIpKTtcblxuXHR2YXIgd3JhcExldHRlcnMgPSBmdW5jdGlvbiB3cmFwTGV0dGVycyhlbCkge1xuXHRcdHJldHVybiBlbC5pbm5lckhUTUwgPSBlbC50ZXh0Q29udGVudC5zcGxpdChcIlwiKS5tYXAoZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0cmV0dXJuICc8c3BhbiBjbGFzcz1sZXR0ZXI+JyArIGxldHRlciArICc8L3NwYW4+Jztcblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdHdyYXBMZXR0ZXJzKGhlYWRpbmcpO1xuXHR3cmFwTGV0dGVycyhoZWFkaW5nXzIpO1xuXG5cdHZhciBsZXR0ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGV0dGVyJyk7XG5cblx0dmFyIG4gPSAwO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGV0dGVycy5sZW5ndGg7IGkrKykge1x0XHRcblx0XHRsZXR0ZXJzW2ldLnN0eWxlLnRyYW5zaXRpb24gPSAnb3BhY2l0eSAnICsgbiArICdtcyc7XG5cdFx0biA9IG4gKyAxMDA7XG5cdH1cblxuXG5cdC8vIHRyaWdnZXIgYnkgc2Nyb2xsIC8gZWxlbWVudCBpbiB2aWV3XG5cdC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHQvLyBcdCQoJy5sZXR0ZXInKS5lYWNoKCBmdW5jdGlvbigpIHtcdFxuXHQvLyBcdFx0JCh0aGlzKS5hZGRDbGFzcygnb24nKTtcblx0Ly8gXHR9KTtcblx0Ly8gfSwgMTAwMCk7XG5cdFxuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZShkYXRhKSB7XG5cblx0dmFyIGkgPSBcIlwiO1xuXHR2YXIgdGl0bGUgPSBkYXRhLnRpdGxlLnJlbmRlcmVkO1xuXHR2YXIgY29udGVudCA9IGRhdGEuY29udGVudC5yZW5kZXJlZDtcblxuXHR2YXIgaW1hZ2VzID0gZGF0YS5hY2YuaW1hZ2VzO1xuXHR2YXIgaW1hZ2VJdGVtcyA9IFwiXCI7XG5cblx0aWYgKGltYWdlcy5sZW5ndGgpIHtcblxuXHRcdGZvciAoaSA9IDA7IGkgPD0gaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGZvciAoa2V5IGluIGltYWdlc1tpXSkge1xuXG5cdFx0XHRcdGlmIChpbWFnZXNbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdFx0aW1hZ2VJdGVtcyArPSBcdCc8bGk+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRpbWFnZXNbaV1ba2V5XS50aXRsZSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0JyA6ICcgK1xuXHRcdFx0XHRcdFx0XHRcdFx0JzxpbWcgc3JjPVwiJyArIFxuXHRcdFx0XHRcdFx0XHRcdFx0aW1hZ2VzW2ldW2tleV0uc2l6ZXMubGFyZ2UgKyBcblx0XHRcdFx0XHRcdFx0XHRcdCdcIiAvPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0JzwvbGk+JztcdFx0XHRcdFx0XG5cdFx0XHRcdH0gXG5cdFx0XHR9IFx0XHRcblx0XHR9XHRcdFx0XG5cdH0gXG5cblxuXG5cblxuXG5cdHZhciB0ZXN0aW1vbmlhbHMgPSBkYXRhLmFjZi50ZXN0aW1vbmlhbHM7XG5cdHZhciB0ZXN0aW1vbmlhbEl0ZW1zID0gXCJcIjtcblxuXHRpZiAodGVzdGltb25pYWxzLmxlbmd0aCkge1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8PSB0ZXN0aW1vbmlhbHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0Zm9yIChrZXkgaW4gdGVzdGltb25pYWxzW2ldKSB7XG5cdFx0XHRcdGlmICh0ZXN0aW1vbmlhbHNbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdFx0dGVzdGltb25pYWxJdGVtcyArPSBcdCc8bGk+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5ICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JyA6ICcgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2PicgKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0ZXN0aW1vbmlhbHNbaV1ba2V5XSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9saT4nO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBcblx0XHRcdH0gXHRcdFxuXHRcdH1cdFx0XHRcblx0fSBcblx0XG5cblxuXHR2YXIgd3JhcHBlciA9ICQoJzxkaXYvPicsIHtcblx0XHQnY2xhc3MnIDogJ3dyYXBwZXInLFx0XHRcblx0fSk7XG5cblx0JCgnPGgxLz4nLCB7XG5cdFx0J2NsYXNzJyA6ICd0aXRsZScsXG5cdFx0aHRtbDogdGl0bGVcblx0fSkuYXBwZW5kVG8od3JhcHBlcik7XHRcblxuXHQkKCc8ZGl2Lz4nLCB7XG5cdFx0J2NsYXNzJyA6ICdjb250ZW50Jyxcblx0XHRodG1sOiBjb250ZW50XG5cdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXG5cdGlmICh0ZXN0aW1vbmlhbHMubGVuZ3RoKSB7XG5cblx0XHQkKCc8dWwvPicsIHtcblx0XHRcdCdjbGFzcycgOiAndGVzdGltb25pYWxzLWxpc3QnLFxuXHRcdFx0aHRtbDogdGVzdGltb25pYWxJdGVtc1xuXHRcdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXHR9XG5cblxuXHRpZiAoaW1hZ2VzLmxlbmd0aCkge1xuXG5cdFx0JCgnPHVsLz4nLCB7XG5cdFx0XHQnY2xhc3MnIDogJ2ltYWdlLWxpc3QnLFxuXHRcdFx0aHRtbDogaW1hZ2VJdGVtc1xuXHRcdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXHR9XG5cblxuXG5cdHJldHVybiB3cmFwcGVyO1xuXHRcbn07IiwidmFyIGRvbUVscyA9IHtcblx0XCJhbmltYXRpb25fZWxlbWVudHNcIiA6ICQoJyNqc19hbmltYXRlX2hlYWQnKSxcblx0XCJwYWdlX2NvbnRhaW5lclwiIDogJCgnI2pzX3BhZ2Vfc2luZ2xlX2l0ZW0nKSxcblx0XCJiYWNrX3RvX21lbnVfYnRuXCIgOiAkKCcjanNfYmFja190b19tZW51JyksXG5cdFwic3Bpbm5lclwiIDogJCgnPGRpdiBpZD1cImpzX2xvYWRpbmdcIj48ZGl2IGNsYXNzPVwic3Bpbm5lclwiPjwvZGl2PjwvZGl2PicpXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxzOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmlyZVRyYW5zaXRpb24oKSB7XG5cdCQoJy5lZmZlY2t0IC50aGUtYnRuJykudHJpZ2dlcignY2xpY2snKTtcbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5qZWN0U3Bpbm5lcigpIHtcblx0JCgnYm9keScpLmFwcGVuZChkb21FbHMuc3Bpbm5lcik7XHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0xvYWRlZChpZGVudGlmaWVyLCBhcnIsIHJlcXVlc3QpIHtcblxuXHR2YXIgcmVzID0gZmFsc2U7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcblx0XHRmb3IgKGtleSBpbiBhcnJbaV0pIHtcblx0XHRcdFxuXHRcdFx0aWYgKGFycltpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0aWYgKGFycltpXVtrZXldID09PSBpZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIGlkZW50aWZpZXIgaXMgZm91bmQgdXBkYXRlIHJlcXVlc3QuaWRcblx0XHRcdFx0XHQvLyB1c2VkIGZvciB3aGVuIHRoZSBpZGVudGlmaWVyIGlzIG5vdCB0aGUgaWQgbnVtYmVyIChlZyBzbHVnKVxuXHRcdFx0XHRcdHJlcXVlc3QuaWQgPSBhcnJbaV0ucGFnZV9pZDtcblx0XHRcdFx0XHRyZXMgPSB0cnVlO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cdFx0XHRcdFxuXHR9XG5cdFxuXHRjb25zb2xlLmxvZyhcImlzTG9hZGVkIDogXCIgKyByZXMpO1xuXG5cdHJldHVybiByZXM7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSkge1xuXG5cdHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLnB1c2goe1xuXHRcdFwicGFnZV9pZFwiIDogZGF0YS5pZCxcblx0XHRcInBhZ2Vfc2x1Z1wiIDogZGF0YS5zbHVnLFxuXHRcdFwicGFnZV91cmxcIiA6IGRhdGEubGluayxcblx0XHRcImpzb25fbGlua1wiIDogZGF0YS5fbGlua3Muc2VsZlswXS5ocmVmXHRcdFx0XG5cdH0pO1xuXG5cdHJldHVybiBwYWdlX3N0YXRlO1xufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcbnZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vaXNMb2FkZWQnKTtcbnZhciBpbmplY3RTcGlubmVyID0gcmVxdWlyZSgnLi9pbmplY3RTcGlubmVyJyk7XG52YXIgYWpheENhbGwgPSByZXF1aXJlKCcuL2FqYXhDYWxsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSkge1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZnVuY3Rpb24oZSkge1x0XHRcblxuXHRcdCAgICAvLyBnZXQgdGhlIHNsdWdcbiAgICAgICAgcGF0aEFycmF5ID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoICcvJyApO1xuICAgICAgICB0aGVJbmRleCA9IHBhdGhBcnJheS5sZW5ndGggLSAyO1xuICAgICAgICB0aGVTbHVnID0gcGF0aEFycmF5W3RoZUluZGV4XTtcdFxuICAgICAgICB0aGVSZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLypcbiAgICAgICAgIFxuICAgICAgICAgaWYgdGhlU2x1ZyBpcyBpbiBwb3N0ZGF0YS5zbHVnIHVwZGF0ZSByZXF1ZXN0IGFuZCBmaXJlIGFqYXggLSB5b3UgYXJlIG9uIHRoZSBob21lcGFnZVxuICAgICAgICAgaWYgbm90IHRyaWdnZXIgYmFjayB0byBtZW51IGNsaWNrIFxuXG4gICAgICAgICovXG5cbiAgICAgICAgZm9yIChrZXkgaW4gcG9zdGRhdGEuc2x1Zykge1xuXG4gICAgICAgICAgaWYgKHBvc3RkYXRhLnNsdWcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygga2V5ICsgXCIgOiBcIiArIHBvc3RkYXRhLnNsdWdba2V5XSk7XG5cbiAgICAgICAgICAgIGlmICh0aGVTbHVnID09PSBrZXkpIHtcblxuICAgICAgICAgICAgICB0aGVSZXN1bHQgPSB0cnVlOyBcbiAgICAgICAgICAgICAgLy8gdXBkYXRlcyByZXF1ZXN0IG9iamVjdFxuICAgICAgICAgICAgICByZXF1ZXN0ID0ge307XG4gICAgICAgICAgICAgIC8vIGdldCB0aGUgaHJlZlxuICAgICAgICAgICAgICByZXF1ZXN0LmhyZWYgPSBcIlwiO1xuICAgICAgICAgICAgICAvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG4gICAgICAgICAgICAgIHJlcXVlc3QuaWQgPSBwb3N0ZGF0YS5zbHVnW2tleV07ICAgXG4gICAgICAgICAgICAgIC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuICAgICAgICAgICAgICByZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07ICAgICAgIFxuICAgICAgICAgICAgICAvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG4gICAgICAgICAgICAgIHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBcbiAgICAgICAgfSBcblxuICAgICAgICBpZiAodGhlUmVzdWx0KSB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGluamVjdFNwaW5uZXIoKTtcbiAgICAgICAgICAgIC8vIGlmIGlzTG9hZGVkIGdyYWIgdGhlIGNodW5rIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICBhamF4Q2FsbChyZXF1ZXN0KTsgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICBcbiAgICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oanJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsKTtcbiAgICAgICAgICAvLyAgZm9yIGJyb3dzZXJzeW5jIG9ubHkgLSBDSEFOR0UgVE86XG4gICAgICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24ocG9zdGRhdGEucm9vdF91cmwpOyAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgfSk7ICAgICBcdFxufTtcblxuXG5cbiJdfQ==
