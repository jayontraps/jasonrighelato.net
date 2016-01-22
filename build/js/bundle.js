(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* Cache reference to DOM elements */
var domEls = require('./modules/domEls');


/* Animations */
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



/* Effeckt */
var core = require('./modules/Effeckt/core');
var pageTransitions = require('./modules/Effeckt/pageTransitions');
var captions = require('./modules/Effeckt/captions');
// init Effeckt
core();
pageTransitions();
captions();



/* loading work pages */
var injectSpinner = require('./modules/injectSpinner');
var ajaxCall = require('./modules/ajaxCall');
var readAddressBar = require('./modules/readAddressBar'); // attempt at a router

var isLoaded = require('./modules/isLoaded'); 
// var transitionToPage = require('./modules/transitionToPage');
// var transitionBackToMenu = require('./modules/transitionBackToMenu');
var fireTransition = require('./modules/fireTransition');
var backToMenu = require('./modules/backToMenu');






// GLOBAL FOR DEV
request = {};

// GLOBAL FOR DEV
page_state = {
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

		

		// test inView..
		var homepage = document.getElementById('homepage');
		// var $animation_elements = $('#js_animate_heading');	

		// if ($(homepage).length > 0) {

		// 	inView(homepage, $animation_elements);

		// 	var x = $('#testing');
		// 	inView(homepage, x);

		// }

		
		// ScrollReveal plugin

		if ($(homepage).length > 0) {
			window.sr = ScrollReveal()
				  .reveal( '.content-cell', { container: homepage } )
				  .reveal( '.work_menu_link', { container: homepage } );
		}

		

		
		
		// var introEls = $('.content-cell');

		// if ($(homepage).length > 0) {

		// 	inView(homepage, introEls);

		// }

					
		$('.work_menu_link').on('click', function(event) {

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

			ajaxCall(request);
					
			if (Modernizr.history) {
			 	history.pushState(null, null, request.href);
			}
		});


		// /* BACK TO MENU */
		domEls.back_to_menu_btn.on('touchstart click', function(event) {
			event.preventDefault();
			
			backToMenu();

			// for browsersync only - CHANGE TO:
			// history.pushState( null, null, postdata.root_url );	        
			history.pushState( null, null, jr_portfolio.config.siteUrl );

		});







		/* TODO - BROWSERS BACK BUTTON */
		// if ($(homepage).length > 0) {

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

		// 	alert("wtf");

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
},{"./modules/Effeckt/captions":2,"./modules/Effeckt/core":3,"./modules/Effeckt/pageTransitions":4,"./modules/ajaxCall":5,"./modules/animations/animateHeading":6,"./modules/animations/animation_utils/whichAnimationEvent":7,"./modules/animations/animation_utils/whichTransitionEvent":8,"./modules/animations/inView":9,"./modules/animations/wrapLetters":10,"./modules/backToMenu":11,"./modules/domEls":12,"./modules/fireTransition":13,"./modules/injectSpinner":14,"./modules/isLoaded":15,"./modules/readAddressBar":17}],2:[function(require,module,exports){
module.exports = function captions() {

  /*!
   * captions.js
   *
   * author: Effeckt.css
   *
   * Licensed under the MIT license
   */

  var effecktCaptions = {

    init: function() {
      this.bindUIActions();
    },

    bindUIActions: function() {
      var self = this; //keep a reference to this (Captions) object.

      $('[data-effeckt-type]').on(Effeckt.buttonPressedEvent, function(event) {
        self.activateCaptions(this);
        event.preventDefault();
      });
    },

    activateCaptions: function(el) {
      var activeClass = 'active';

      if (document.documentElement.classList) {
        el.classList.toggle(activeClass);
      } else {
        var $caption = $(el);
        $caption.toggleClass(activeClass);
      }
    }
  };

  effecktCaptions.init();

};
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{"./domEls":12,"./pageStateUpDate":16,"./renderTemplates":18}],6:[function(require,module,exports){
var wrapLetters = require('./wrapLetters');

module.exports = function animateHead() {

	var heading = document.getElementById('js_animate_heading');

	if ($(heading).length > 0) {
		wrapLetters(heading);

		var letters = document.getElementById('js_animate_heading').getElementsByClassName('letter');

		var n = 0;

		for (var i = 0; i < letters.length; i++) {		
			letters[i].style.transition = 'opacity ' + n + 'ms ease';
			n+= 200;
		}

	}

	window.setTimeout(function() {
		$(heading).addClass('on-load');
	}, 200);
	

};
},{"./wrapLetters":10}],7:[function(require,module,exports){
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
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
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
		latestKnownScrollY = $(homepage).scrollTop();
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
},{"../domEls":12}],10:[function(require,module,exports){
module.exports = function wrapLetters(el) {
	return el.innerHTML = el.textContent.split("").map(function (letter) {
		return '<span class=letter>' + letter + '</span>';
	}).join("");	
};
},{}],11:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function backToMenu() {

	// update page_state
	page_state.current_page = "homepage";

	// hide the button 
	$(domEls.back_to_menu_btn)
		
			.addClass('off');

	// scroll the single item page back to top
	window.setTimeout(function() {

		$('#js_page_2').scrollTop( 0 );

		$(domEls.back_to_menu_btn)
			.removeClass('on off');

	}, 600);
		        				    	
};
},{"./domEls":12}],12:[function(require,module,exports){
var domEls = {
	"trigger_transition" : $('#js_trigger_transition'),
	"animation_elements" : $('#js_animate_head'),
	"page_container" : $('#js_page_single_item'),
	"back_to_menu_btn" : $('#js_back_to_menu'),
	"spinner" : $('<div id="js_loading"><div class="spinner"></div></div>')
};


module.exports = domEls;
},{}],13:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function fireTransition() {

	domEls.trigger_transition.trigger('click');

	window.setTimeout(function() {	
		
		domEls.back_to_menu_btn
			.addClass('on');

		$('#js_loading').remove();

	}, 1200);

};
},{"./domEls":12}],14:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function injectSpinner() {
	$('body').append(domEls.spinner);	
};
},{"./domEls":12}],15:[function(require,module,exports){
module.exports = function isLoaded(identifier, arr, request) {

	var res = false;

	for (var i = 0; i < arr.length; i++) {
		
		for (var key in arr[i]) {
			
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
},{}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
             if theSlug is in postdata.slug update request and fire ajax - you are on the homepage
             if not trigger back to menu click 
            */

            // are you on the same page_state
            // if (theSlug === page_state.current_page) {
            //   return false;
            // }

            
            // if (theSlug === "" || theSlug === "jasonrighelato") {

            //   if (page_state.current_page !== "homepage") {

            //     console.log("you're on the homepage");
            //     domEls.back_to_menu_btn.trigger('click');
            //     backToMenu();
            //     page_state.current_page = "homepage";
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




},{"./ajaxCall":5,"./backToMenu":11,"./domEls":12,"./injectSpinner":14}],18:[function(require,module,exports){
var fireTransition = require('./fireTransition');

module.exports = function renderTemplates(data) {

	var slug = data.slug;
	var imageUrl = data.acf.header_image.url;

	function onComplete() {

		console.log('template rendered!');
		// All set.. 
		fireTransition();
	}

	// $("#js_page_single_item").removeClass().addClass(slug);

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
},{"./fireTransition":13}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvY2FwdGlvbnMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvRWZmZWNrdC9jb3JlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hBbmltYXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaFRyYW5zaXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2luVmlldy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2JhY2tUb01lbnUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvZG9tRWxzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2ZpcmVUcmFuc2l0aW9uLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2luamVjdFNwaW5uZXIuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlbmRlclRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBDYWNoZSByZWZlcmVuY2UgdG8gRE9NIGVsZW1lbnRzICovXG52YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2RvbUVscycpO1xuXG5cbi8qIEFuaW1hdGlvbnMgKi9cbnZhciBpblZpZXcgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9pblZpZXcnKTtcbnZhciB3cmFwTGV0dGVycyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzJyk7XG52YXIgYW5pbWF0ZUhlYWRpbmcgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlSGVhZGluZycpO1xudmFyIHdoaWNoVHJhbnNpdGlvbkV2ZW50ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0aW9uX3V0aWxzL3doaWNoVHJhbnNpdGlvbkV2ZW50Jyk7XG52YXIgd2hpY2hBbmltYXRpb25FdmVudCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaEFuaW1hdGlvbkV2ZW50Jyk7XG5cbi8qXG5nZXQgY2FsbGJhY2tzIGZyb20gY3NzIGFuaW1hdGlvbnM6IGh0dHBzOi8vZGF2aWR3YWxzaC5uYW1lL2Nzcy1hbmltYXRpb24tY2FsbGJhY2tcblxudmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VsJyk7IC8vIGdldCBzb21lIGVsZW1lbnRcblx0XG4vLyBzdG9yZSB0aGUgYW5pbWF0aW9uIC8gdHJhbnNpdGlvbiBlbmQgZXZlbnQgLSBhZGQgdG8gZ2xvYmFsIG9iamVjdD8gXG52YXIgdGhlRXZlbnQgPSB3aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cbi8vIGFkZCBsaXN0bmVyIGFuZCBjYWxsYmFja1xudGhlRXZlbnQgJiYgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGVFdmVudCwgZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdUcmFuc2l0aW9uIGNvbXBsZXRlISAgVGhpcyBpcyB0aGUgY2FsbGJhY2ssIG5vIGxpYnJhcnkgbmVlZGVkIScpO1xufSk7XG5cbiovXG5cblxuXG5cblxuXG4vKiB0ZXN0aW5nIGFuaW1hdGUuanMgOiBodHRwczovL2dpdGh1Yi5jb20vYmVuZGMvYW5pbWF0ZSAqL1xuLy8gdmFyIHRlc3RBbmltYXRlSnMgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlX2pzL3Rlc3RBbmltYXRlSnMnKTtcbi8vIHRlc3RBbmltYXRlSnMoKTtcblxuXG5cbi8qIEVmZmVja3QgKi9cbnZhciBjb3JlID0gcmVxdWlyZSgnLi9tb2R1bGVzL0VmZmVja3QvY29yZScpO1xudmFyIHBhZ2VUcmFuc2l0aW9ucyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9FZmZlY2t0L3BhZ2VUcmFuc2l0aW9ucycpO1xudmFyIGNhcHRpb25zID0gcmVxdWlyZSgnLi9tb2R1bGVzL0VmZmVja3QvY2FwdGlvbnMnKTtcbi8vIGluaXQgRWZmZWNrdFxuY29yZSgpO1xucGFnZVRyYW5zaXRpb25zKCk7XG5jYXB0aW9ucygpO1xuXG5cblxuLyogbG9hZGluZyB3b3JrIHBhZ2VzICovXG52YXIgaW5qZWN0U3Bpbm5lciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pbmplY3RTcGlubmVyJyk7XG52YXIgYWpheENhbGwgPSByZXF1aXJlKCcuL21vZHVsZXMvYWpheENhbGwnKTtcbnZhciByZWFkQWRkcmVzc0JhciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9yZWFkQWRkcmVzc0JhcicpOyAvLyBhdHRlbXB0IGF0IGEgcm91dGVyXG5cbnZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pc0xvYWRlZCcpOyBcbi8vIHZhciB0cmFuc2l0aW9uVG9QYWdlID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RyYW5zaXRpb25Ub1BhZ2UnKTtcbi8vIHZhciB0cmFuc2l0aW9uQmFja1RvTWVudSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90cmFuc2l0aW9uQmFja1RvTWVudScpO1xudmFyIGZpcmVUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9tb2R1bGVzL2ZpcmVUcmFuc2l0aW9uJyk7XG52YXIgYmFja1RvTWVudSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9iYWNrVG9NZW51Jyk7XG5cblxuXG5cblxuXG4vLyBHTE9CQUwgRk9SIERFVlxucmVxdWVzdCA9IHt9O1xuXG4vLyBHTE9CQUwgRk9SIERFVlxucGFnZV9zdGF0ZSA9IHtcblx0XCJjdXJyZW50X3BhZ2VcIiA6IFwiXCIsXG5cdFwibG9hZGVkX3BhZ2VzXCIgOiBbXSxcblx0XCJmcm9tUGFnZVwiIDogXCJcIixcblx0XCJ0b1BhZ2VcIiA6IFwiXCJcbn07XG5cbi8vIEVYQU1QTEVTXG5cbi8vIHBvc3RkYXRhIHtcbi8vIFx0anNvbl91cmwgOiB7XG4vLyBcdFx0MjggOiAgXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvMjhcIixcbi8vIFx0XHQzMDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvMzBcIlxuLy8gXHR9LFxuLy8gXHRyb290X3VybDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvXCIsXG4vL1x0c2x1Zzoge1xuLy9cdFx0XCJhY2VcIiA6IDI4LFxuLy9cdFx0XCJib2NcIiA6IDMwXG4vLyBcdH1cbi8vIH1cblxuLy8gcmVxdWVzdCA9IHtcbi8vIFx0XCJocmVmXCIgOiBcIlwiLFxuLy8gXHRcImlkXCIgOiAwLFxuLy8gXHRcImlkX3N0clwiIDogXCJcIixcbi8vIFx0XCJqc29uX3VybFwiIDogXCJcIlx0XG4vLyB9O1xuXG5cbi8vIFwibG9hZGVkX3BhZ2VzXCIgOiBbXG4vLyBcdHtcbi8vIFx0XHRqc29uX2xpbms6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzhcIlxuLy8gXHRcdHBhZ2VfaWQ6IDhcbi8vIFx0XHRwYWdlX3NsdWc6IFwiYmlyZHMtb2YtYmVya3NoaXJlLWF0bGFzXCJcbi8vIFx0XHRwYWdlX3VybDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL2JpcmRzLW9mLWJlcmtzaGlyZS1hdGxhcy9cIlx0XHRcdFxuLy8gXHR9XG4vLyBdXG5cblxuKGZ1bmN0aW9uKCQpIHtcdFxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG5cdFx0LyogU0VUIFVQIEFOSU1BVElPTlMgKi9cblxuXHRcdHZhciB0aGVUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX3RpdGxlJyk7XG5cblx0XHRpZiAoJCh0aGVUaXRsZSkubGVuZ3RoID4gMCkge1xuXHRcdFx0d3JhcExldHRlcnModGhlVGl0bGUpO1xuXHRcdH1cblx0XHRcblx0XHRcblx0XHRhbmltYXRlSGVhZGluZygpO1xuXG5cdFx0XG5cblx0XHQvLyB0ZXN0IGluVmlldy4uXG5cdFx0dmFyIGhvbWVwYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvbWVwYWdlJyk7XG5cdFx0Ly8gdmFyICRhbmltYXRpb25fZWxlbWVudHMgPSAkKCcjanNfYW5pbWF0ZV9oZWFkaW5nJyk7XHRcblxuXHRcdC8vIGlmICgkKGhvbWVwYWdlKS5sZW5ndGggPiAwKSB7XG5cblx0XHQvLyBcdGluVmlldyhob21lcGFnZSwgJGFuaW1hdGlvbl9lbGVtZW50cyk7XG5cblx0XHQvLyBcdHZhciB4ID0gJCgnI3Rlc3RpbmcnKTtcblx0XHQvLyBcdGluVmlldyhob21lcGFnZSwgeCk7XG5cblx0XHQvLyB9XG5cblx0XHRcblx0XHQvLyBTY3JvbGxSZXZlYWwgcGx1Z2luXG5cblx0XHRpZiAoJChob21lcGFnZSkubGVuZ3RoID4gMCkge1xuXHRcdFx0d2luZG93LnNyID0gU2Nyb2xsUmV2ZWFsKClcblx0XHRcdFx0ICAucmV2ZWFsKCAnLmNvbnRlbnQtY2VsbCcsIHsgY29udGFpbmVyOiBob21lcGFnZSB9IClcblx0XHRcdFx0ICAucmV2ZWFsKCAnLndvcmtfbWVudV9saW5rJywgeyBjb250YWluZXI6IGhvbWVwYWdlIH0gKTtcblx0XHR9XG5cblx0XHRcblxuXHRcdFxuXHRcdFxuXHRcdC8vIHZhciBpbnRyb0VscyA9ICQoJy5jb250ZW50LWNlbGwnKTtcblxuXHRcdC8vIGlmICgkKGhvbWVwYWdlKS5sZW5ndGggPiAwKSB7XG5cblx0XHQvLyBcdGluVmlldyhob21lcGFnZSwgaW50cm9FbHMpO1xuXG5cdFx0Ly8gfVxuXG5cdFx0XHRcdFx0XG5cdFx0JCgnLndvcmtfbWVudV9saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Ly8gdXBkYXRlcyByZXF1ZXN0IG9iamVjdFxuXHRcdFx0cmVxdWVzdCA9IHt9O1xuXHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcdFx0XHRcblx0XHRcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFx0XG5cblx0XHRcdGluamVjdFNwaW5uZXIoKTtcblxuXHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0XHRcdFx0XG5cdFx0XHRpZiAoTW9kZXJuaXpyLmhpc3RvcnkpIHtcblx0XHRcdCBcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHJlcXVlc3QuaHJlZik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblxuXHRcdC8vIC8qIEJBQ0sgVE8gTUVOVSAqL1xuXHRcdGRvbUVscy5iYWNrX3RvX21lbnVfYnRuLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcblx0XHRcdGJhY2tUb01lbnUoKTtcblxuXHRcdFx0Ly8gZm9yIGJyb3dzZXJzeW5jIG9ubHkgLSBDSEFOR0UgVE86XG5cdFx0XHQvLyBoaXN0b3J5LnB1c2hTdGF0ZSggbnVsbCwgbnVsbCwgcG9zdGRhdGEucm9vdF91cmwgKTtcdCAgICAgICAgXG5cdFx0XHRoaXN0b3J5LnB1c2hTdGF0ZSggbnVsbCwgbnVsbCwganJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsICk7XG5cblx0XHR9KTtcblxuXG5cblxuXG5cblxuXHRcdC8qIFRPRE8gLSBCUk9XU0VSUyBCQUNLIEJVVFRPTiAqL1xuXHRcdC8vIGlmICgkKGhvbWVwYWdlKS5sZW5ndGggPiAwKSB7XG5cblx0XHQvLyBcdHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpO1xuXHRcdC8vIFx0Ly8gYWRkcyB0aGUgcG9wc3RhdGUgZXZlbnQgaGFuZGxlciBcblx0XHQvLyBcdC8vIG5lZWRzIHJldmlzaW9uXG5cblx0XHQvLyB9XG5cblxuXHRcdHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpO1xuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXHRcdC8qIFRPRE8gLSBIT1ZFUiAqL1xuXHRcdC8vIGlmIG5vIHRvdWNoIHdlIGNhbiBhbnRpY2lwYXRlIGEgY2xpY2sgYW5kIGZpcmUgYWpheENhbGwgb24gbW91c2VvdmVyIG9mIG1lbnUgbGlua3Ncblx0XHQvLyBpZiAoIU1vZGVybml6ci50b3VjaGV2ZW50cykge1xuXG5cdFx0Ly8gXHQkKCcjYXBwJykub24oJ21vdXNlb3ZlcicsICdhJywgZnVuY3Rpb24oKSB7XG5cblx0XHQvLyBcdFx0cmVxdWVzdCA9IHt9O1xuXHRcdC8vIFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHQvLyBcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHQvLyBcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdC8vIFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0Ly8gXHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdC8vIFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcdFx0XHRcblx0XHQvLyBcdFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdC8vIFx0XHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XG5cblx0XHQvLyBcdFx0aWYgKCAhaXNMb2FkZWQocmVxdWVzdC5pZCwgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMsIHJlcXVlc3QpICkge1xuXHRcdC8vIFx0XHRcdGFqYXhDYWxsKHJlcXVlc3QpO1xuXHRcdC8vIFx0XHR9XG5cblx0XHQvLyBcdH0pO1xuXHRcdC8vIH1cblxuXG5cblxuXHRcdC8qIEZJUlNUIEFUVEVNUFQgLSBDTElDSyAqL1xuXG5cdFx0Ly8gJCgnI2FwcCcpLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdC8vIFx0YWxlcnQoXCJ3dGZcIik7XG5cblx0XHQvLyBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHRcdFxuXG5cdFx0Ly8gXHRyZXF1ZXN0ID0ge307XHRcdFx0XHRcblx0XHQvLyBcdC8vIGdldCB0aGUgaHJlZlxuXHRcdC8vIFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHQvLyBcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHQvLyBcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHQvLyBcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdC8vIFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1x0XG5cdFx0Ly8gXHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0Ly8gXHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XHRcblx0XHRcdFx0XHRcblx0XHQvLyBcdC8vIGlzIGl0IGFscmVhZHkgbG9hZGVkIGludG8gRE9NPyBDaGVjayB0aGUgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMgYXJyYXlcblx0XHQvLyBcdGlmICggIWlzTG9hZGVkKHJlcXVlc3QuaWQsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSApIHtcblx0XHQvLyBcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0Ly8gXHR9XG5cdFx0XG5cdFx0Ly8gXHRpZiAoTW9kZXJuaXpyLmhpc3RvcnkpIHtcblx0XHQvLyBcdCBcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHJlcXVlc3QuaHJlZik7XG5cdFx0Ly8gXHR9XG5cblx0XHQvLyB9KTtcblxuXG5cblx0XHRcblxuXG5cdFx0XG5cblxuXHR9KTtcblxuXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FwdGlvbnMoKSB7XG5cbiAgLyohXG4gICAqIGNhcHRpb25zLmpzXG4gICAqXG4gICAqIGF1dGhvcjogRWZmZWNrdC5jc3NcbiAgICpcbiAgICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gICAqL1xuXG4gIHZhciBlZmZlY2t0Q2FwdGlvbnMgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuYmluZFVJQWN0aW9ucygpO1xuICAgIH0sXG5cbiAgICBiaW5kVUlBY3Rpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpczsgLy9rZWVwIGEgcmVmZXJlbmNlIHRvIHRoaXMgKENhcHRpb25zKSBvYmplY3QuXG5cbiAgICAgICQoJ1tkYXRhLWVmZmVja3QtdHlwZV0nKS5vbihFZmZlY2t0LmJ1dHRvblByZXNzZWRFdmVudCwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc2VsZi5hY3RpdmF0ZUNhcHRpb25zKHRoaXMpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGFjdGl2YXRlQ2FwdGlvbnM6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB2YXIgYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcblxuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShhY3RpdmVDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgJGNhcHRpb24gPSAkKGVsKTtcbiAgICAgICAgJGNhcHRpb24udG9nZ2xlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBlZmZlY2t0Q2FwdGlvbnMuaW5pdCgpO1xuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29yZSgpIHtcblxuOyhmdW5jdGlvbih3aW5kb3cpe1xuXG4gIHZhclxuICAgIC8vIElzIE1vZGVybml6ciBkZWZpbmVkIG9uIHRoZSBnbG9iYWwgc2NvcGVcbiAgICBNb2Rlcm5penIgPSB0eXBlb2YgTW9kZXJuaXpyICE9PSBcInVuZGVmaW5lZFwiID8gTW9kZXJuaXpyIDogZmFsc2UsXG5cbiAgICAvLyBBbHdheXMgZXhwZWN0IGJvdGgga2luZHMgb2YgZXZlbnRcbiAgICBidXR0b25QcmVzc2VkRXZlbnQgPSAndG91Y2hzdGFydCBjbGljaycsXG5cbiAgICAvLyBMaXN0IG9mIGFsbCBhbmltYXRpb24vdHJhbnNpdGlvbiBwcm9wZXJ0aWVzXG4gICAgLy8gd2l0aCBpdHMgYW5pbWF0aW9uRW5kL3RyYW5zaXRpb25FbmQgZXZlbnRcbiAgICBhbmltYXRpb25FbmRFdmVudE5hbWVzID0ge1xuICAgICAgJ1dlYmtpdEFuaW1hdGlvbicgOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICAgICdPQW5pbWF0aW9uJyA6ICdvQW5pbWF0aW9uRW5kJyxcbiAgICAgICdtc0FuaW1hdGlvbicgOiAnTVNBbmltYXRpb25FbmQnLFxuICAgICAgJ2FuaW1hdGlvbicgOiAnYW5pbWF0aW9uZW5kJ1xuICAgIH0sXG5cbiAgICB0cmFuc2l0aW9uRW5kRXZlbnROYW1lcyA9IHtcbiAgICAgICdXZWJraXRUcmFuc2l0aW9uJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICdPVHJhbnNpdGlvbicgOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICAgJ21zVHJhbnNpdGlvbicgOiAnTVNUcmFuc2l0aW9uRW5kJyxcbiAgICAgICd0cmFuc2l0aW9uJyA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH0sXG5cbiAgICBFZmZlY2t0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9O1xuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgRWZmZWNrdC52ZXJzaW9uID0gJzAuMC4xJztcblxuICAvLyBJbml0aWFsaXphdGlvbiBtZXRob2RcbiAgRWZmZWNrdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYnV0dG9uUHJlc3NlZEV2ZW50ID0gYnV0dG9uUHJlc3NlZEV2ZW50O1xuXG4gICAgLy9ldmVudCB0cmlnZ2VyIGFmdGVyIGFuaW1hdGlvbi90cmFuc2l0aW9uIGVuZC5cbiAgICB0aGlzLnRyYW5zaXRpb25FbmRFdmVudE5hbWUgPSBNb2Rlcm5penIgPyB0cmFuc2l0aW9uRW5kRXZlbnROYW1lc1tNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zaXRpb24nKV0gOiBnZXRUcmFuc2l0aW9uRW5kRXZlbnROYW1lcygpO1xuICAgIHRoaXMuYW5pbWF0aW9uRW5kRXZlbnROYW1lICA9IE1vZGVybml6ciA/IGFuaW1hdGlvbkVuZEV2ZW50TmFtZXNbTW9kZXJuaXpyLnByZWZpeGVkKCdhbmltYXRpb24nKV0gOiBnZXRBbmltYXRpb25FbmRFdmVudE5hbWVzKCk7XG4gICAgdGhpcy50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgPSB0aGlzLmFuaW1hdGlvbkVuZEV2ZW50TmFtZSArICcgJyArIHRoaXMudHJhbnNpdGlvbkVuZEV2ZW50TmFtZTtcbiAgfTtcblxuICBFZmZlY2t0LnByb3RvdHlwZS5nZXRWaWV3cG9ydEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICBjbGllbnQgPSBkb2NFbGVtZW50WydjbGllbnRIZWlnaHQnXSxcbiAgICAgIGlubmVyID0gd2luZG93Wydpbm5lckhlaWdodCddO1xuXG4gICAgaWYoIGNsaWVudCA8IGlubmVyIClcbiAgICAgIHJldHVybiBpbm5lcjtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gY2xpZW50O1xuICB9O1xuXG4gIC8vIEdldCBhbGwgdGhlIHByb3BlcnRpZXMgZm9yIHRyYW5zaXRpb24vYW5pbWF0aW9uIGVuZFxuICBmdW5jdGlvbiBnZXRUcmFuc2l0aW9uRW5kRXZlbnROYW1lcygpIHtcbiAgICByZXR1cm4gX2dldEVuZEV2ZW50TmFtZXMoIHRyYW5zaXRpb25FbmRFdmVudE5hbWVzICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbmltYXRpb25FbmRFdmVudE5hbWVzKCkge1xuICAgIHJldHVybiBfZ2V0RW5kRXZlbnROYW1lcyggYW5pbWF0aW9uRW5kRXZlbnROYW1lcyApO1xuICB9XG5cbiAgZnVuY3Rpb24gX2dldEVuZEV2ZW50TmFtZXMob2JqKSB7XG4gICAgdmFyIGV2ZW50cyA9IFtdO1xuXG4gICAgZm9yICggdmFyIGV2ZW50TmFtZSBpbiBvYmogKSB7XG4gICAgICBldmVudHMucHVzaCggb2JqWyBldmVudE5hbWUgXSApO1xuICAgIH1cblxuICAgIHJldHVybiBldmVudHMuam9pbignICcpO1xuICB9XG5cbiAgLy8gQ3JlYXRlcyBhIEVmZmVja3Qgb2JqZWN0LlxuICB3aW5kb3cuRWZmZWNrdCA9IG5ldyBFZmZlY2t0KCk7XG5cbn0pKHRoaXMpO1xuXG5cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZ2VUcmFuc2l0aW9ucygpIHtcblxudmFyIEVmZmVja3RQYWdlVHJhbnNpdGlvbnMgPSB7XG5cbiAgZnJvbVBhZ2U6ICcnLFxuICB0b1BhZ2U6ICcnLFxuICBpc0FuaW1hdGluZzogZmFsc2UsXG4gIGlzTmV4dFBhZ2VFbmQ6IGZhbHNlLFxuICBpc0N1cnJlbnRQYWdlRW5kOiBmYWxzZSxcbiAgdHJhbnNpdGlvbkluRWZmZWN0OiAnJyxcbiAgdHJhbnNpdGlvbk91dEVmZmVjdDogJycsXG5cbiAgaW5pdDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmluaXRQYWdlcygpO1xuICAgIHRoaXMuYmluZFVJQWN0aW9ucygpO1xuXG4gIH0sXG5cbiAgaW5pdFBhZ2VzOiBmdW5jdGlvbigpe1xuXG4gICAgdmFyICRwYWdlcyA9ICQoJ1tkYXRhLWVmZmVja3QtcGFnZV0nKTtcblxuICAgIHRoaXMuZnJvbVBhZ2UgPSAkcGFnZXMuZmlyc3QoKS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFjdGl2ZScpO1xuXG4gIH0sXG5cbiAgYmluZFVJQWN0aW9uczogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAkKCcuZWZmZWNrdC1wYWdlLXRyYW5zaXRpb24tYnV0dG9uJykub24oIEVmZmVja3QuYnV0dG9uUHJlc3NlZEV2ZW50LCBmdW5jdGlvbihlKXtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdHJhbnNpdGlvbkluRWZmZWN0ICA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLWluJyksXG4gICAgICAgICAgdHJhbnNpdGlvbk91dEVmZmVjdCA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLW91dCcpLFxuICAgICAgICAgIHRyYW5zaXRpb25QYWdlICAgICAgPSAkKHRoaXMpLmRhdGEoJ2VmZmVja3QtdHJhbnNpdGlvbi1wYWdlJyk7XG5cbiAgICAgIGlmICggJCh0aGlzKS5kYXRhKFwiZWZmZWNrdC1uZWVkcy1wZXJzcGVjdGl2ZVwiKSkge1xuICAgICAgICAkKFwiaHRtbFwiKS5hZGRDbGFzcyhcIm1kLXBlcnNwZWN0aXZlXCIpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnRyYW5zaXRpb25QYWdlKCB0cmFuc2l0aW9uUGFnZSwgdHJhbnNpdGlvbkluRWZmZWN0LCB0cmFuc2l0aW9uT3V0RWZmZWN0ICk7XG5cbiAgICB9KTtcbiAgfSxcblxuICB0cmFuc2l0aW9uUGFnZTogZnVuY3Rpb24oIHRyYW5zaXRpb25QYWdlLCB0cmFuc2l0aW9uSW5FZmZlY3QsIHRyYW5zaXRpb25PdXRFZmZlY3QgKSB7XG5cbiAgICBpZiAoIHRoaXMuaXNBbmltYXRpbmcgKSB7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuaXNDdXJyZW50UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNOZXh0UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMudHJhbnNpdGlvbkluRWZmZWN0ID0gdHJhbnNpdGlvbkluRWZmZWN0O1xuICAgIHRoaXMudHJhbnNpdGlvbk91dEVmZmVjdD0gdHJhbnNpdGlvbk91dEVmZmVjdDtcblxuICAgIC8vIEdldCBQYWdlc1xuICAgIHRoaXMuZnJvbVBhZ2UgPSAkKCdbZGF0YS1lZmZlY2t0LXBhZ2VdLmVmZmVja3QtcGFnZS1hY3RpdmUnKTtcbiAgICB0aGlzLnRvUGFnZSAgID0gJCgnW2RhdGEtZWZmZWNrdC1wYWdlPVwiJyArIHRyYW5zaXRpb25QYWdlICsgJ1wiXScpO1xuXG4gICAgLy8gQWRkIHRoaXMgY2xhc3MgdG8gcHJldmVudCBzY3JvbGwgdG8gYmUgZGlzcGxheWVkXG4gICAgdGhpcy50b1BhZ2UuYWRkQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgZWZmZWNrdC1wYWdlLWFjdGl2ZSAnICsgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QpO1xuICAgIHRoaXMuZnJvbVBhZ2UuYWRkQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcnKTtcblxuICAgIC8vIFNldCBUcmFuc2l0aW9uIENsYXNzXG4gICAgdGhpcy5mcm9tUGFnZS5hZGRDbGFzcyh0aGlzLnRyYW5zaXRpb25PdXRFZmZlY3QpO1xuICAgIFxuICAgIHZhciBzZWxmPSB0aGlzO1xuICAgIFxuICAgIHRoaXMudG9QYWdlLm9uKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICBcbiAgICAgIHNlbGYudG9QYWdlLm9mZiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgKTtcbiAgICAgIHNlbGYuaXNOZXh0UGFnZUVuZCA9IHRydWU7XG5cbiAgICAgIGlmICggc2VsZi5pc0N1cnJlbnRQYWdlRW5kICkge1xuICAgICAgICBzZWxmLnJlc2V0VHJhbnNpdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5mcm9tUGFnZS5vbiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgc2VsZi5mcm9tUGFnZS5vZmYoIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50ICk7XG4gICAgICBzZWxmLmlzQ3VycmVudFBhZ2VFbmQgPSB0cnVlO1xuXG4gICAgICBpZiAoIHNlbGYuaXNOZXh0UGFnZUVuZCApIHtcbiAgICAgICAgc2VsZi5yZXNldFRyYW5zaXRpb24oKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH0sXG5cbiAgcmVzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ3VycmVudFBhZ2VFbmQgPSBmYWxzZTtcbiAgICB0aGlzLmlzTmV4dFBhZ2VFbmQgPSBmYWxzZTtcblxuICAgIHRoaXMuZnJvbVBhZ2UucmVtb3ZlQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgZWZmZWNrdC1wYWdlLWFjdGl2ZSAnICsgdGhpcy50cmFuc2l0aW9uT3V0RWZmZWN0KTsvLy5oaWRlKCk7XG4gICAgdGhpcy50b1BhZ2UucmVtb3ZlQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgJyArIHRoaXMudHJhbnNpdGlvbkluRWZmZWN0KTtcblxuICAgICQoXCJodG1sXCIpLnJlbW92ZUNsYXNzKFwibWQtcGVyc3BlY3RpdmVcIik7XG4gIH1cblxufTtcblxuRWZmZWNrdFBhZ2VUcmFuc2l0aW9ucy5pbml0KCk7XHRcblx0XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xudmFyIHJlbmRlclRlbXBsYXRlcyA9IHJlcXVpcmUoJy4vcmVuZGVyVGVtcGxhdGVzJyk7XG52YXIgcGFnZVN0YXRlVXBEYXRlID0gcmVxdWlyZSgnLi9wYWdlU3RhdGVVcERhdGUnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFqYXhDYWxsKHJlcXVlc3QpIHtcblxuXHQkLmFqYXgoe1xuXHQgICAgdXJsOiByZXF1ZXN0Lmpzb25fdXJsLFxuXHQgICAgZGF0YVR5cGU6ICdqc29uJ1xuXHR9KVxuXG5cdC5kb25lKGZ1bmN0aW9uKGRhdGEpe1x0XG5cblx0XHQvLyBjbGVhciBjdXJyZW50IGNvbnRlbnQgLSB0aGlzIGNvdWxkIGJlIHN0b3JlZFxuXHRcdGRvbUVscy5wYWdlX2NvbnRhaW5lci5lbXB0eSgpO1xuXG5cdFx0Ly8gdXBkYXRlIHBhZ2Vfc3RhdGUgb2JqZWN0XG5cdFx0cGFnZVN0YXRlVXBEYXRlKGRhdGEsIHBhZ2Vfc3RhdGUpO1x0XG5cblx0XHRyZW5kZXJUZW1wbGF0ZXMoZGF0YSk7XG5cdFx0XHRcblx0XHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdpZnlcblx0XHQvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInBhZ2VfXCIgKyByZXF1ZXN0LmlkLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0XG5cdFx0Ly8gaWYgKE1vZGVybml6ci5sb2NhbHN0b3JhZ2UpIHtcblx0XHQvLyBcdC8vIHB1dCB0aGUgdGVtcGF0ZSBpbiBsb2NhbCBzdG9yYWdlIGFzIHN0cmluZ1xuXHRcdC8vIFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BhZ2VfJyArIHJlcXVlc3QuaWQsIGNodW5rWzBdLmlubmVySFRNTCk7XHRcdFx0XHRcblx0XHQvLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0fSlcblxuXHQuZmFpbChmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnZXJyb3InKTtcblx0XHQkKCcjanNfbG9hZGluZycpLnJlbW92ZSgpO1xuXHR9KVxuXG5cdC5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2NvbXBsZXRlIScpO1xuXHR9KTtcdFxuXG59OyIsInZhciB3cmFwTGV0dGVycyA9IHJlcXVpcmUoJy4vd3JhcExldHRlcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbmltYXRlSGVhZCgpIHtcblxuXHR2YXIgaGVhZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX2hlYWRpbmcnKTtcblxuXHRpZiAoJChoZWFkaW5nKS5sZW5ndGggPiAwKSB7XG5cdFx0d3JhcExldHRlcnMoaGVhZGluZyk7XG5cblx0XHR2YXIgbGV0dGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX2hlYWRpbmcnKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZXR0ZXInKTtcblxuXHRcdHZhciBuID0gMDtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGV0dGVycy5sZW5ndGg7IGkrKykge1x0XHRcblx0XHRcdGxldHRlcnNbaV0uc3R5bGUudHJhbnNpdGlvbiA9ICdvcGFjaXR5ICcgKyBuICsgJ21zIGVhc2UnO1xuXHRcdFx0bis9IDIwMDtcblx0XHR9XG5cblx0fVxuXG5cdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdCQoaGVhZGluZykuYWRkQ2xhc3MoJ29uLWxvYWQnKTtcblx0fSwgMjAwKTtcblx0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaEFuaW1hdGlvbkV2ZW50KCkge1xuXHRcblx0dmFyIGtleTtcdFxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG5cblx0dmFyIGFuaW1hdGlvbnMgPSB7XG5cdFx0J1dlYmtpdEFuaW1hdGlvbicgOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcblx0XHQnT0FuaW1hdGlvbicgOiAnb0FuaW1hdGlvbkVuZCcsXG5cdFx0J21zQW5pbWF0aW9uJyA6ICdNU0FuaW1hdGlvbkVuZCcsXG5cdFx0J2FuaW1hdGlvbicgOiAnYW5pbWF0aW9uZW5kJ1xuXHR9O1xuXG4gICAgZm9yKGtleSBpbiBhbmltYXRpb25zKXtcbiAgICAgICAgaWYoIGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoVHJhbnNpdGlvbkV2ZW50KCkge1xuXG5cdHZhciBrZXk7XHRcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcblxuXHR2YXIgdHJhbnNpdGlvbnMgPSB7XG5cdFx0J3RyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcblx0XHQnT1RyYW5zaXRpb24nOidvVHJhbnNpdGlvbkVuZCcsXG5cdFx0J01velRyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcblx0XHQnV2Via2l0VHJhbnNpdGlvbic6J3dlYmtpdFRyYW5zaXRpb25FbmQnXG5cdH07XG5cblx0Zm9yKGtleSBpbiB0cmFuc2l0aW9ucyl7XG5cdFx0aWYoIGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCApe1xuXHRcdCAgICByZXR1cm4gdHJhbnNpdGlvbnNba2V5XTtcblx0XHR9XG5cdH1cdFxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5WaWV3KGNvbnRhaW5lciwgJGVsKSB7XG5cblx0Ly8gaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvc3BlZWQvYW5pbWF0aW9ucy8jZGVib3VuY2luZy1zY3JvbGwtZXZlbnRzXG5cblx0dmFyICRhbmltYXRpb25fZWxlbWVudHMgPSAkZWw7XG5cblx0dmFyIHBhZ2UgPSBjb250YWluZXI7XG5cblx0dmFyIGxhdGVzdEtub3duU2Nyb2xsWSA9IDAsXG5cdFx0dGlja2luZyA9IGZhbHNlLFxuXHRcdHBhZ2VIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCksXG5cdFx0dGhlT2Zmc2V0ID0gMDtcblxuXHRmdW5jdGlvbiBvblNjcm9sbCgpIHtcblx0XHRsYXRlc3RLbm93blNjcm9sbFkgPSAkKGhvbWVwYWdlKS5zY3JvbGxUb3AoKTtcblx0XHRyZXF1ZXN0VGljaygpO1xuXHR9XG5cdGZ1bmN0aW9uIHJlcXVlc3RUaWNrKCkge1xuXHRcdGlmKCF0aWNraW5nKSB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcblx0XHR9XG5cdFx0dGlja2luZyA9IHRydWU7XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlKCkge1xuXHRcdC8vIHJlc2V0IHRoZSB0aWNrIHNvIHdlIGNhblxuXHRcdC8vIGNhcHR1cmUgdGhlIG5leHQgb25TY3JvbGxcblx0XHR0aWNraW5nID0gZmFsc2U7XG5cblx0XHR2YXIgY3VycmVudFNjcm9sbFkgPSBsYXRlc3RLbm93blNjcm9sbFk7XG5cblx0XHQvLyByZWFkIG9mZnNldCBvZiBET00gZWxlbWVudHNcblx0XHR0aGVPZmZzZXQgPSAkYW5pbWF0aW9uX2VsZW1lbnRzLm9mZnNldCgpO1xuXG5cdFx0Ly8gYW5kIGNvbXBhcmUgdG8gdGhlIGN1cnJlbnRTY3JvbGxZIHZhbHVlXG5cdFx0Ly8gdGhlbiBhcHBseSBzb21lIENTUyBjbGFzc2VzXG5cdFx0Ly8gdG8gdGhlIHZpc2libGUgaXRlbXNcblx0XHRpZiAodGhlT2Zmc2V0LnRvcCA8IHBhZ2VIZWlnaHQpIHtcblx0XHRcdCRhbmltYXRpb25fZWxlbWVudHMuYWRkQ2xhc3MoJ2luLXZpZXcnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGFuaW1hdGlvbl9lbGVtZW50cy5yZW1vdmVDbGFzcygnaW4tdmlldycpO1xuXHRcdH1cblxuXHRcdC8vIGNvbnNvbGUubG9nKHRoZU9mZnNldC50b3ApO1xuXHRcdC8vIGNvbnNvbGUubG9nKHBhZ2VIZWlnaHQpO1xuXG5cdH1cblxuXHRwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCBmYWxzZSk7XG5cdFxuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd3JhcExldHRlcnMoZWwpIHtcblx0cmV0dXJuIGVsLmlubmVySFRNTCA9IGVsLnRleHRDb250ZW50LnNwbGl0KFwiXCIpLm1hcChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0cmV0dXJuICc8c3BhbiBjbGFzcz1sZXR0ZXI+JyArIGxldHRlciArICc8L3NwYW4+Jztcblx0fSkuam9pbihcIlwiKTtcdFxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiYWNrVG9NZW51KCkge1xuXG5cdC8vIHVwZGF0ZSBwYWdlX3N0YXRlXG5cdHBhZ2Vfc3RhdGUuY3VycmVudF9wYWdlID0gXCJob21lcGFnZVwiO1xuXG5cdC8vIGhpZGUgdGhlIGJ1dHRvbiBcblx0JChkb21FbHMuYmFja190b19tZW51X2J0bilcblx0XHRcblx0XHRcdC5hZGRDbGFzcygnb2ZmJyk7XG5cblx0Ly8gc2Nyb2xsIHRoZSBzaW5nbGUgaXRlbSBwYWdlIGJhY2sgdG8gdG9wXG5cdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0JCgnI2pzX3BhZ2VfMicpLnNjcm9sbFRvcCggMCApO1xuXG5cdFx0JChkb21FbHMuYmFja190b19tZW51X2J0bilcblx0XHRcdC5yZW1vdmVDbGFzcygnb24gb2ZmJyk7XG5cblx0fSwgNjAwKTtcblx0XHQgICAgICAgIFx0XHRcdFx0ICAgIFx0XG59OyIsInZhciBkb21FbHMgPSB7XG5cdFwidHJpZ2dlcl90cmFuc2l0aW9uXCIgOiAkKCcjanNfdHJpZ2dlcl90cmFuc2l0aW9uJyksXG5cdFwiYW5pbWF0aW9uX2VsZW1lbnRzXCIgOiAkKCcjanNfYW5pbWF0ZV9oZWFkJyksXG5cdFwicGFnZV9jb250YWluZXJcIiA6ICQoJyNqc19wYWdlX3NpbmdsZV9pdGVtJyksXG5cdFwiYmFja190b19tZW51X2J0blwiIDogJCgnI2pzX2JhY2tfdG9fbWVudScpLFxuXHRcInNwaW5uZXJcIiA6ICQoJzxkaXYgaWQ9XCJqc19sb2FkaW5nXCI+PGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj48L2Rpdj4nKVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUVsczsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaXJlVHJhbnNpdGlvbigpIHtcblxuXHRkb21FbHMudHJpZ2dlcl90cmFuc2l0aW9uLnRyaWdnZXIoJ2NsaWNrJyk7XG5cblx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHRcblx0XHRcblx0XHRkb21FbHMuYmFja190b19tZW51X2J0blxuXHRcdFx0LmFkZENsYXNzKCdvbicpO1xuXG5cdFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcblxuXHR9LCAxMjAwKTtcblxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmplY3RTcGlubmVyKCkge1xuXHQkKCdib2R5JykuYXBwZW5kKGRvbUVscy5zcGlubmVyKTtcdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTG9hZGVkKGlkZW50aWZpZXIsIGFyciwgcmVxdWVzdCkge1xuXG5cdHZhciByZXMgPSBmYWxzZTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdFxuXHRcdGZvciAodmFyIGtleSBpbiBhcnJbaV0pIHtcblx0XHRcdFxuXHRcdFx0aWYgKGFycltpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0aWYgKGFycltpXVtrZXldID09PSBpZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIGlkZW50aWZpZXIgaXMgZm91bmQgdXBkYXRlIHJlcXVlc3QuaWRcblx0XHRcdFx0XHQvLyB1c2VkIGZvciB3aGVuIHRoZSBpZGVudGlmaWVyIGlzIG5vdCB0aGUgaWQgbnVtYmVyIChlZyBzbHVnKVxuXHRcdFx0XHRcdHJlcXVlc3QuaWQgPSBhcnJbaV0ucGFnZV9pZDtcblx0XHRcdFx0XHRyZXMgPSB0cnVlO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cdFx0XHRcdFxuXHR9XG5cdFxuXHRjb25zb2xlLmxvZyhcImlzTG9hZGVkIDogXCIgKyByZXMpO1xuXG5cdHJldHVybiByZXM7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSkge1xuXHRcblx0cGFnZV9zdGF0ZS5jdXJyZW50X3BhZ2UgPSBkYXRhLnNsdWc7XG5cblx0cGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMucHVzaCh7XG5cdFx0XCJwYWdlX2lkXCIgOiBkYXRhLmlkLFxuXHRcdFwicGFnZV9zbHVnXCIgOiBkYXRhLnNsdWcsXG5cdFx0XCJwYWdlX3VybFwiIDogZGF0YS5saW5rLFxuXHRcdFwianNvbl9saW5rXCIgOiBkYXRhLl9saW5rcy5zZWxmWzBdLmhyZWZcdFx0XHRcblx0fSk7XG5cblx0cmV0dXJuIHBhZ2Vfc3RhdGU7XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xudmFyIGJhY2tUb01lbnUgPSByZXF1aXJlKCcuL2JhY2tUb01lbnUnKTtcbi8vIHZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vaXNMb2FkZWQnKTtcbnZhciBpbmplY3RTcGlubmVyID0gcmVxdWlyZSgnLi9pbmplY3RTcGlubmVyJyk7XG52YXIgYWpheENhbGwgPSByZXF1aXJlKCcuL2FqYXhDYWxsJyk7XG5cblxuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSkge1xuXG4gICAgLy8gU2FmYXJpIGZpcmUgcG9wc3RhdGUgZXZlbnQgb24gcGFnZSBsb2FkLiBIYWNrIHRvIGF2b2lkIGluZmluYXRlIGxvb3AgLSB3cmFwIGluIHNldFRpbWVvdXRcblxuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuXG4gICAgXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZ1bmN0aW9uKGUpIHtcdFx0XG5cblxuICAgIFx0XHQgICAgLy8gZ2V0IHRoZSBzbHVnXG4gICAgICAgICAgICBwYXRoQXJyYXkgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCggJy8nICk7XG4gICAgICAgICAgICB0aGVJbmRleCA9IHBhdGhBcnJheS5sZW5ndGggLSAyO1xuICAgICAgICAgICAgdGhlU2x1ZyA9IHBhdGhBcnJheVt0aGVJbmRleF07XHRcbiAgICAgICAgICAgIHRoZVJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncmVhZEFkZHJlc3NCYXIuanMgLSB0aGVTbHVnID0gJyArIHRoZVNsdWcpO1xuXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAgICAgICAvKiAgICAgICAgICAgXG4gICAgICAgICAgICAgaWYgdGhlU2x1ZyBpcyBpbiBwb3N0ZGF0YS5zbHVnIHVwZGF0ZSByZXF1ZXN0IGFuZCBmaXJlIGFqYXggLSB5b3UgYXJlIG9uIHRoZSBob21lcGFnZVxuICAgICAgICAgICAgIGlmIG5vdCB0cmlnZ2VyIGJhY2sgdG8gbWVudSBjbGljayBcbiAgICAgICAgICAgICovXG5cbiAgICAgICAgICAgIC8vIGFyZSB5b3Ugb24gdGhlIHNhbWUgcGFnZV9zdGF0ZVxuICAgICAgICAgICAgLy8gaWYgKHRoZVNsdWcgPT09IHBhZ2Vfc3RhdGUuY3VycmVudF9wYWdlKSB7XG4gICAgICAgICAgICAvLyAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBpZiAodGhlU2x1ZyA9PT0gXCJcIiB8fCB0aGVTbHVnID09PSBcImphc29ucmlnaGVsYXRvXCIpIHtcblxuICAgICAgICAgICAgLy8gICBpZiAocGFnZV9zdGF0ZS5jdXJyZW50X3BhZ2UgIT09IFwiaG9tZXBhZ2VcIikge1xuXG4gICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJ5b3UncmUgb24gdGhlIGhvbWVwYWdlXCIpO1xuICAgICAgICAgICAgLy8gICAgIGRvbUVscy5iYWNrX3RvX21lbnVfYnRuLnRyaWdnZXIoJ2NsaWNrJyk7XG4gICAgICAgICAgICAvLyAgICAgYmFja1RvTWVudSgpO1xuICAgICAgICAgICAgLy8gICAgIHBhZ2Vfc3RhdGUuY3VycmVudF9wYWdlID0gXCJob21lcGFnZVwiO1xuICAgICAgICAgICAgLy8gICAgIHJldHVybiBmYWxzZTsgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICAvLyBmb3IgKHZhciBrZXkgaW4gcG9zdGRhdGEuc2x1Zykge1xuXG4gICAgICAgICAgICAvLyAgIGlmIChwb3N0ZGF0YS5zbHVnLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygga2V5ICsgXCIgOiBcIiArIHBvc3RkYXRhLnNsdWdba2V5XSk7XG5cbiAgICAgICAgICAgIC8vICAgICBpZiAodGhlU2x1ZyA9PT0ga2V5KSB7XG5cbiAgICAgICAgICAgIC8vICAgICAgIGNvbnNvbGUubG9nKHRoZVNsdWcpO1xuICAgICAgICAgICAgLy8gICAgICAgJCgnIycgKyB0aGVTbHVnKS50cmlnZ2VyKCdjbGljaycpO1xuXG4gICAgICAgICAgICAvLyAgICAgICAvLyB0aGVSZXN1bHQgPSB0cnVlOyBcbiAgICAgICAgICAgIC8vICAgICAgIC8vIC8vIHVwZGF0ZXMgcmVxdWVzdCBvYmplY3RcbiAgICAgICAgICAgIC8vICAgICAgIC8vIHJlcXVlc3QgPSB7fTtcbiAgICAgICAgICAgIC8vICAgICAgIC8vIC8vIGdldCB0aGUgaHJlZlxuICAgICAgICAgICAgLy8gICAgICAgLy8gcmVxdWVzdC5ocmVmID0gXCJcIjtcbiAgICAgICAgICAgIC8vICAgICAgIC8vIC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cbiAgICAgICAgICAgIC8vICAgICAgIC8vIHJlcXVlc3QuaWQgPSBwb3N0ZGF0YS5zbHVnW2tleV07ICAgXG4gICAgICAgICAgICAvLyAgICAgICAvLyAvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3NcbiAgICAgICAgICAgIC8vICAgICAgIC8vIHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTsgICAgICAgXG4gICAgICAgICAgICAvLyAgICAgICAvLyAvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG4gICAgICAgICAgICAvLyAgICAgICAvLyByZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1xuICAgICAgICAgICAgLy8gICAgIH0gXG4gICAgICAgICAgICAvLyAgIH0gXG4gICAgICAgICAgICAvLyB9IFxuXG4gICAgICAgICAgICAvLyBpZiAodGhlUmVzdWx0KSB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICAgICBpbmplY3RTcGlubmVyKCk7XG4gICAgICAgICAgICAvLyAgICAgLy8gaWYgaXNMb2FkZWQgZ3JhYiB0aGUgY2h1bmsgZnJvbSBsb2NhbFN0b3JhZ2VcbiAgICAgICAgICAgIC8vICAgICBhamF4Q2FsbChyZXF1ZXN0KTsgICAgICAgICAgXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oanJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsKTtcbiAgICAgICAgICAgIC8vICAgLy8gIGZvciBicm93c2Vyc3luYyBvbmx5IC0gQ0hBTkdFIFRPOlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24ocG9zdGRhdGEucm9vdF91cmwpOyAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB9XG5cblxuICAgICAgICB9KTsgIFxuXG4gICAgICAgIH0sIDMwMCApOyAgIFx0XG59O1xuXG5cblxuIiwidmFyIGZpcmVUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9maXJlVHJhbnNpdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlbmRlclRlbXBsYXRlcyhkYXRhKSB7XG5cblx0dmFyIHNsdWcgPSBkYXRhLnNsdWc7XG5cdHZhciBpbWFnZVVybCA9IGRhdGEuYWNmLmhlYWRlcl9pbWFnZS51cmw7XG5cblx0ZnVuY3Rpb24gb25Db21wbGV0ZSgpIHtcblxuXHRcdGNvbnNvbGUubG9nKCd0ZW1wbGF0ZSByZW5kZXJlZCEnKTtcblx0XHQvLyBBbGwgc2V0Li4gXG5cdFx0ZmlyZVRyYW5zaXRpb24oKTtcblx0fVxuXG5cdC8vICQoXCIjanNfcGFnZV9zaW5nbGVfaXRlbVwiKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHNsdWcpO1xuXG5cdCQoXCIjanNfcGFnZV9zaW5nbGVfaXRlbVwiKS5sb2FkVGVtcGxhdGUoJChcIiNpdGVtVGVtcGxhdGVcIiksIHtcblxuXHRcdFwidGl0bGVcIiA6IGRhdGEudGl0bGUucmVuZGVyZWQsXG5cdFx0XCJpbnRyb1wiIDogZGF0YS5hY2YubG9uZ19kZXNjcmlwdGlvbixcblx0XHRcImhlcm9JbWFnZVwiIDogZGF0YS5hY2YuaGVhZGVyX2ltYWdlLnVybCxcblx0XHRcImltYWdlXzFcIiA6IGRhdGEuYWNmLmltYWdlXzEudXJsLFxuXHRcdFwiZGV0YWlsc18xXCIgOiBkYXRhLmFjZi5kZXRhaWxzXzEsXG5cdFx0XCJpbWFnZV8yXCIgOiBkYXRhLmFjZi5pbWFnZV8yLnVybCxcblx0XHRcImRldGFpbHNfMlwiIDogZGF0YS5hY2YuZGV0YWlsc18yLFxuXHRcdFwiYnRuVGV4dFwiIDogXCJWaXNpdCB0aGUgc2l0ZVwiLFxuXHRcdFwiYnRuTGlua1wiIDogZGF0YS5hY2Yuc2l0ZV91cmxcbiAgIFx0XHR9LCB7IGNvbXBsZXRlOiBvbkNvbXBsZXRlIH0pO1x0XG5cbn07Il19
