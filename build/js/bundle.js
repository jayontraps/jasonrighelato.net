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
		"image_2" : data.acf.image_2.url,
		"btnText" : "Visit the site",
		"btnLink" : data.acf.site_url
   		}, { complete: onComplete });	

};
},{"./fireTransition":13}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvY2FwdGlvbnMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvRWZmZWNrdC9jb3JlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hBbmltYXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaFRyYW5zaXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2luVmlldy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2JhY2tUb01lbnUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvZG9tRWxzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2ZpcmVUcmFuc2l0aW9uLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2luamVjdFNwaW5uZXIuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlbmRlclRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qIENhY2hlIHJlZmVyZW5jZSB0byBET00gZWxlbWVudHMgKi9cbnZhciBkb21FbHMgPSByZXF1aXJlKCcuL21vZHVsZXMvZG9tRWxzJyk7XG5cblxuLyogQW5pbWF0aW9ucyAqL1xudmFyIGluVmlldyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2luVmlldycpO1xudmFyIHdyYXBMZXR0ZXJzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvd3JhcExldHRlcnMnKTtcbnZhciBhbmltYXRlSGVhZGluZyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGVIZWFkaW5nJyk7XG52YXIgd2hpY2hUcmFuc2l0aW9uRXZlbnQgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hUcmFuc2l0aW9uRXZlbnQnKTtcbnZhciB3aGljaEFuaW1hdGlvbkV2ZW50ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0aW9uX3V0aWxzL3doaWNoQW5pbWF0aW9uRXZlbnQnKTtcblxuLypcbmdldCBjYWxsYmFja3MgZnJvbSBjc3MgYW5pbWF0aW9uczogaHR0cHM6Ly9kYXZpZHdhbHNoLm5hbWUvY3NzLWFuaW1hdGlvbi1jYWxsYmFja1xuXG52YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWwnKTsgLy8gZ2V0IHNvbWUgZWxlbWVudFxuXHRcbi8vIHN0b3JlIHRoZSBhbmltYXRpb24gLyB0cmFuc2l0aW9uIGVuZCBldmVudCAtIGFkZCB0byBnbG9iYWwgb2JqZWN0PyBcbnZhciB0aGVFdmVudCA9IHdoaWNoQW5pbWF0aW9uRXZlbnQoKTtcblxuLy8gYWRkIGxpc3RuZXIgYW5kIGNhbGxiYWNrXG50aGVFdmVudCAmJiBlbC5hZGRFdmVudExpc3RlbmVyKHRoZUV2ZW50LCBmdW5jdGlvbigpIHtcblx0Y29uc29sZS5sb2coJ1RyYW5zaXRpb24gY29tcGxldGUhICBUaGlzIGlzIHRoZSBjYWxsYmFjaywgbm8gbGlicmFyeSBuZWVkZWQhJyk7XG59KTtcblxuKi9cblxuXG5cblxuXG5cbi8qIHRlc3RpbmcgYW5pbWF0ZS5qcyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5kYy9hbmltYXRlICovXG4vLyB2YXIgdGVzdEFuaW1hdGVKcyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGVfanMvdGVzdEFuaW1hdGVKcycpO1xuLy8gdGVzdEFuaW1hdGVKcygpO1xuXG5cblxuLyogRWZmZWNrdCAqL1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL21vZHVsZXMvRWZmZWNrdC9jb3JlJyk7XG52YXIgcGFnZVRyYW5zaXRpb25zID0gcmVxdWlyZSgnLi9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zJyk7XG52YXIgY2FwdGlvbnMgPSByZXF1aXJlKCcuL21vZHVsZXMvRWZmZWNrdC9jYXB0aW9ucycpO1xuLy8gaW5pdCBFZmZlY2t0XG5jb3JlKCk7XG5wYWdlVHJhbnNpdGlvbnMoKTtcbmNhcHRpb25zKCk7XG5cblxuXG4vKiBsb2FkaW5nIHdvcmsgcGFnZXMgKi9cbnZhciBpbmplY3RTcGlubmVyID0gcmVxdWlyZSgnLi9tb2R1bGVzL2luamVjdFNwaW5uZXInKTtcbnZhciBhamF4Q2FsbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hamF4Q2FsbCcpO1xudmFyIHJlYWRBZGRyZXNzQmFyID0gcmVxdWlyZSgnLi9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyJyk7IC8vIGF0dGVtcHQgYXQgYSByb3V0ZXJcblxudmFyIGlzTG9hZGVkID0gcmVxdWlyZSgnLi9tb2R1bGVzL2lzTG9hZGVkJyk7IFxuLy8gdmFyIHRyYW5zaXRpb25Ub1BhZ2UgPSByZXF1aXJlKCcuL21vZHVsZXMvdHJhbnNpdGlvblRvUGFnZScpO1xuLy8gdmFyIHRyYW5zaXRpb25CYWNrVG9NZW51ID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RyYW5zaXRpb25CYWNrVG9NZW51Jyk7XG52YXIgZmlyZVRyYW5zaXRpb24gPSByZXF1aXJlKCcuL21vZHVsZXMvZmlyZVRyYW5zaXRpb24nKTtcbnZhciBiYWNrVG9NZW51ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2JhY2tUb01lbnUnKTtcblxuXG5cblxuXG5cbi8vIEdMT0JBTCBGT1IgREVWXG5yZXF1ZXN0ID0ge307XG5cbi8vIEdMT0JBTCBGT1IgREVWXG5wYWdlX3N0YXRlID0ge1xuXHRcImN1cnJlbnRfcGFnZVwiIDogXCJcIixcblx0XCJsb2FkZWRfcGFnZXNcIiA6IFtdLFxuXHRcImZyb21QYWdlXCIgOiBcIlwiLFxuXHRcInRvUGFnZVwiIDogXCJcIlxufTtcblxuLy8gRVhBTVBMRVNcblxuLy8gcG9zdGRhdGEge1xuLy8gXHRqc29uX3VybCA6IHtcbi8vIFx0XHQyOCA6ICBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy8yOFwiLFxuLy8gXHRcdDMwOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy8zMFwiXG4vLyBcdH0sXG4vLyBcdHJvb3RfdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG9cIixcbi8vXHRzbHVnOiB7XG4vL1x0XHRcImFjZVwiIDogMjgsXG4vL1x0XHRcImJvY1wiIDogMzBcbi8vIFx0fVxuLy8gfVxuXG4vLyByZXF1ZXN0ID0ge1xuLy8gXHRcImhyZWZcIiA6IFwiXCIsXG4vLyBcdFwiaWRcIiA6IDAsXG4vLyBcdFwiaWRfc3RyXCIgOiBcIlwiLFxuLy8gXHRcImpzb25fdXJsXCIgOiBcIlwiXHRcbi8vIH07XG5cblxuLy8gXCJsb2FkZWRfcGFnZXNcIiA6IFtcbi8vIFx0e1xuLy8gXHRcdGpzb25fbGluazogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvOFwiXG4vLyBcdFx0cGFnZV9pZDogOFxuLy8gXHRcdHBhZ2Vfc2x1ZzogXCJiaXJkcy1vZi1iZXJrc2hpcmUtYXRsYXNcIlxuLy8gXHRcdHBhZ2VfdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vYmlyZHMtb2YtYmVya3NoaXJlLWF0bGFzL1wiXHRcdFx0XG4vLyBcdH1cbi8vIF1cblxuXG4oZnVuY3Rpb24oJCkge1x0XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cblx0XHQvKiBTRVQgVVAgQU5JTUFUSU9OUyAqL1xuXG5cdFx0dmFyIHRoZVRpdGxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX2FuaW1hdGVfdGl0bGUnKTtcblxuXHRcdGlmICgkKHRoZVRpdGxlKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR3cmFwTGV0dGVycyh0aGVUaXRsZSk7XG5cdFx0fVxuXHRcdFxuXHRcdFxuXHRcdGFuaW1hdGVIZWFkaW5nKCk7XG5cblx0XHRcblxuXHRcdC8vIHRlc3QgaW5WaWV3Li5cblx0XHR2YXIgaG9tZXBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9tZXBhZ2UnKTtcblx0XHQvLyB2YXIgJGFuaW1hdGlvbl9lbGVtZW50cyA9ICQoJyNqc19hbmltYXRlX2hlYWRpbmcnKTtcdFxuXG5cdFx0Ly8gaWYgKCQoaG9tZXBhZ2UpLmxlbmd0aCA+IDApIHtcblxuXHRcdC8vIFx0aW5WaWV3KGhvbWVwYWdlLCAkYW5pbWF0aW9uX2VsZW1lbnRzKTtcblxuXHRcdC8vIFx0dmFyIHggPSAkKCcjdGVzdGluZycpO1xuXHRcdC8vIFx0aW5WaWV3KGhvbWVwYWdlLCB4KTtcblxuXHRcdC8vIH1cblxuXHRcdFxuXHRcdC8vIFNjcm9sbFJldmVhbCBwbHVnaW5cblxuXHRcdGlmICgkKGhvbWVwYWdlKS5sZW5ndGggPiAwKSB7XG5cdFx0XHR3aW5kb3cuc3IgPSBTY3JvbGxSZXZlYWwoKVxuXHRcdFx0XHQgIC5yZXZlYWwoICcuY29udGVudC1jZWxsJywgeyBjb250YWluZXI6IGhvbWVwYWdlIH0gKVxuXHRcdFx0XHQgIC5yZXZlYWwoICcud29ya19tZW51X2xpbmsnLCB7IGNvbnRhaW5lcjogaG9tZXBhZ2UgfSApO1xuXHRcdH1cblxuXHRcdFxuXG5cdFx0XG5cdFx0XG5cdFx0Ly8gdmFyIGludHJvRWxzID0gJCgnLmNvbnRlbnQtY2VsbCcpO1xuXG5cdFx0Ly8gaWYgKCQoaG9tZXBhZ2UpLmxlbmd0aCA+IDApIHtcblxuXHRcdC8vIFx0aW5WaWV3KGhvbWVwYWdlLCBpbnRyb0Vscyk7XG5cblx0XHQvLyB9XG5cblx0XHRcdFx0XHRcblx0XHQkKCcud29ya19tZW51X2xpbmsnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQvLyB1cGRhdGVzIHJlcXVlc3Qgb2JqZWN0XG5cdFx0XHRyZXF1ZXN0ID0ge307XG5cdFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFx0XHRcdFxuXHRcdFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFx0XHRcblxuXHRcdFx0aW5qZWN0U3Bpbm5lcigpO1xuXG5cdFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblx0XHRcdFx0XHRcblx0XHRcdGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdFx0IFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cdFx0Ly8gLyogQkFDSyBUTyBNRU5VICovXG5cdFx0ZG9tRWxzLmJhY2tfdG9fbWVudV9idG4ub24oJ3RvdWNoc3RhcnQgY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFxuXHRcdFx0YmFja1RvTWVudSgpO1xuXG5cdFx0XHQvLyBmb3IgYnJvd3NlcnN5bmMgb25seSAtIENIQU5HRSBUTzpcblx0XHRcdC8vIGhpc3RvcnkucHVzaFN0YXRlKCBudWxsLCBudWxsLCBwb3N0ZGF0YS5yb290X3VybCApO1x0ICAgICAgICBcblx0XHRcdGhpc3RvcnkucHVzaFN0YXRlKCBudWxsLCBudWxsLCBqcl9wb3J0Zm9saW8uY29uZmlnLnNpdGVVcmwgKTtcblxuXHRcdH0pO1xuXG5cblxuXG5cblxuXG5cdFx0LyogVE9ETyAtIEJST1dTRVJTIEJBQ0sgQlVUVE9OICovXG5cdFx0Ly8gaWYgKCQoaG9tZXBhZ2UpLmxlbmd0aCA+IDApIHtcblxuXHRcdC8vIFx0cmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSk7XG5cdFx0Ly8gXHQvLyBhZGRzIHRoZSBwb3BzdGF0ZSBldmVudCBoYW5kbGVyIFxuXHRcdC8vIFx0Ly8gbmVlZHMgcmV2aXNpb25cblxuXHRcdC8vIH1cblxuXG5cdFx0cmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSk7XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdFx0LyogVE9ETyAtIEhPVkVSICovXG5cdFx0Ly8gaWYgbm8gdG91Y2ggd2UgY2FuIGFudGljaXBhdGUgYSBjbGljayBhbmQgZmlyZSBhamF4Q2FsbCBvbiBtb3VzZW92ZXIgb2YgbWVudSBsaW5rc1xuXHRcdC8vIGlmICghTW9kZXJuaXpyLnRvdWNoZXZlbnRzKSB7XG5cblx0XHQvLyBcdCQoJyNhcHAnKS5vbignbW91c2VvdmVyJywgJ2EnLCBmdW5jdGlvbigpIHtcblxuXHRcdC8vIFx0XHRyZXF1ZXN0ID0ge307XG5cdFx0Ly8gXHRcdC8vIGdldCB0aGUgaHJlZlxuXHRcdC8vIFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdC8vIFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHQvLyBcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0Ly8gXHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFx0XHRcdFxuXHRcdC8vIFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcblxuXHRcdC8vIFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0Ly8gXHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0Ly8gXHRcdH1cblxuXHRcdC8vIFx0fSk7XG5cdFx0Ly8gfVxuXG5cblxuXG5cdFx0LyogRklSU1QgQVRURU1QVCAtIENMSUNLICovXG5cblx0XHQvLyAkKCcjYXBwJykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0Ly8gXHRhbGVydChcInd0ZlwiKTtcblxuXHRcdC8vIFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcdFx0XG5cblx0XHQvLyBcdHJlcXVlc3QgPSB7fTtcdFx0XHRcdFxuXHRcdC8vIFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0Ly8gXHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdC8vIFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdC8vIFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdC8vIFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0Ly8gXHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcblx0XHQvLyBcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHQvLyBcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFxuXHRcdFx0XHRcdFxuXHRcdC8vIFx0Ly8gaXMgaXQgYWxyZWFkeSBsb2FkZWQgaW50byBET00/IENoZWNrIHRoZSBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcyBhcnJheVxuXHRcdC8vIFx0aWYgKCAhaXNMb2FkZWQocmVxdWVzdC5pZCwgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMsIHJlcXVlc3QpICkge1xuXHRcdC8vIFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblx0XHQvLyBcdH1cblx0XHRcblx0XHQvLyBcdGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdC8vIFx0IFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHQvLyBcdH1cblxuXHRcdC8vIH0pO1xuXG5cblxuXHRcdFxuXG5cblx0XHRcblxuXG5cdH0pO1xuXG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYXB0aW9ucygpIHtcblxuICAvKiFcbiAgICogY2FwdGlvbnMuanNcbiAgICpcbiAgICogYXV0aG9yOiBFZmZlY2t0LmNzc1xuICAgKlxuICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAgICovXG5cbiAgdmFyIGVmZmVja3RDYXB0aW9ucyA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5iaW5kVUlBY3Rpb25zKCk7XG4gICAgfSxcblxuICAgIGJpbmRVSUFjdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzOyAvL2tlZXAgYSByZWZlcmVuY2UgdG8gdGhpcyAoQ2FwdGlvbnMpIG9iamVjdC5cblxuICAgICAgJCgnW2RhdGEtZWZmZWNrdC10eXBlXScpLm9uKEVmZmVja3QuYnV0dG9uUHJlc3NlZEV2ZW50LCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBzZWxmLmFjdGl2YXRlQ2FwdGlvbnModGhpcyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgYWN0aXZhdGVDYXB0aW9uczogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBhY3RpdmVDbGFzcyA9ICdhY3RpdmUnO1xuXG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGFjdGl2ZUNsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciAkY2FwdGlvbiA9ICQoZWwpO1xuICAgICAgICAkY2FwdGlvbi50b2dnbGVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGVmZmVja3RDYXB0aW9ucy5pbml0KCk7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb3JlKCkge1xuXG47KGZ1bmN0aW9uKHdpbmRvdyl7XG5cbiAgdmFyXG4gICAgLy8gSXMgTW9kZXJuaXpyIGRlZmluZWQgb24gdGhlIGdsb2JhbCBzY29wZVxuICAgIE1vZGVybml6ciA9IHR5cGVvZiBNb2Rlcm5penIgIT09IFwidW5kZWZpbmVkXCIgPyBNb2Rlcm5penIgOiBmYWxzZSxcblxuICAgIC8vIEFsd2F5cyBleHBlY3QgYm90aCBraW5kcyBvZiBldmVudFxuICAgIGJ1dHRvblByZXNzZWRFdmVudCA9ICd0b3VjaHN0YXJ0IGNsaWNrJyxcblxuICAgIC8vIExpc3Qgb2YgYWxsIGFuaW1hdGlvbi90cmFuc2l0aW9uIHByb3BlcnRpZXNcbiAgICAvLyB3aXRoIGl0cyBhbmltYXRpb25FbmQvdHJhbnNpdGlvbkVuZCBldmVudFxuICAgIGFuaW1hdGlvbkVuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAnV2Via2l0QW5pbWF0aW9uJyA6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgICAgJ09BbmltYXRpb24nIDogJ29BbmltYXRpb25FbmQnLFxuICAgICAgJ21zQW5pbWF0aW9uJyA6ICdNU0FuaW1hdGlvbkVuZCcsXG4gICAgICAnYW5pbWF0aW9uJyA6ICdhbmltYXRpb25lbmQnXG4gICAgfSxcblxuICAgIHRyYW5zaXRpb25FbmRFdmVudE5hbWVzID0ge1xuICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgJ09UcmFuc2l0aW9uJyA6ICdvVHJhbnNpdGlvbkVuZCcsXG4gICAgICAnbXNUcmFuc2l0aW9uJyA6ICdNU1RyYW5zaXRpb25FbmQnLFxuICAgICAgJ3RyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnXG4gICAgfSxcblxuICAgIEVmZmVja3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgLy8gQ3VycmVudCB2ZXJzaW9uLlxuICBFZmZlY2t0LnZlcnNpb24gPSAnMC4wLjEnO1xuXG4gIC8vIEluaXRpYWxpemF0aW9uIG1ldGhvZFxuICBFZmZlY2t0LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5idXR0b25QcmVzc2VkRXZlbnQgPSBidXR0b25QcmVzc2VkRXZlbnQ7XG5cbiAgICAvL2V2ZW50IHRyaWdnZXIgYWZ0ZXIgYW5pbWF0aW9uL3RyYW5zaXRpb24gZW5kLlxuICAgIHRoaXMudHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9IE1vZGVybml6ciA/IHRyYW5zaXRpb25FbmRFdmVudE5hbWVzW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNpdGlvbicpXSA6IGdldFRyYW5zaXRpb25FbmRFdmVudE5hbWVzKCk7XG4gICAgdGhpcy5hbmltYXRpb25FbmRFdmVudE5hbWUgID0gTW9kZXJuaXpyID8gYW5pbWF0aW9uRW5kRXZlbnROYW1lc1tNb2Rlcm5penIucHJlZml4ZWQoJ2FuaW1hdGlvbicpXSA6IGdldEFuaW1hdGlvbkVuZEV2ZW50TmFtZXMoKTtcbiAgICB0aGlzLnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCA9IHRoaXMuYW5pbWF0aW9uRW5kRXZlbnROYW1lICsgJyAnICsgdGhpcy50cmFuc2l0aW9uRW5kRXZlbnROYW1lO1xuICB9O1xuXG4gIEVmZmVja3QucHJvdG90eXBlLmdldFZpZXdwb3J0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgIGNsaWVudCA9IGRvY0VsZW1lbnRbJ2NsaWVudEhlaWdodCddLFxuICAgICAgaW5uZXIgPSB3aW5kb3dbJ2lubmVySGVpZ2h0J107XG5cbiAgICBpZiggY2xpZW50IDwgaW5uZXIgKVxuICAgICAgcmV0dXJuIGlubmVyO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBjbGllbnQ7XG4gIH07XG5cbiAgLy8gR2V0IGFsbCB0aGUgcHJvcGVydGllcyBmb3IgdHJhbnNpdGlvbi9hbmltYXRpb24gZW5kXG4gIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25FbmRFdmVudE5hbWVzKCkge1xuICAgIHJldHVybiBfZ2V0RW5kRXZlbnROYW1lcyggdHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFuaW1hdGlvbkVuZEV2ZW50TmFtZXMoKSB7XG4gICAgcmV0dXJuIF9nZXRFbmRFdmVudE5hbWVzKCBhbmltYXRpb25FbmRFdmVudE5hbWVzICk7XG4gIH1cblxuICBmdW5jdGlvbiBfZ2V0RW5kRXZlbnROYW1lcyhvYmopIHtcbiAgICB2YXIgZXZlbnRzID0gW107XG5cbiAgICBmb3IgKCB2YXIgZXZlbnROYW1lIGluIG9iaiApIHtcbiAgICAgIGV2ZW50cy5wdXNoKCBvYmpbIGV2ZW50TmFtZSBdICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50cy5qb2luKCcgJyk7XG4gIH1cblxuICAvLyBDcmVhdGVzIGEgRWZmZWNrdCBvYmplY3QuXG4gIHdpbmRvdy5FZmZlY2t0ID0gbmV3IEVmZmVja3QoKTtcblxufSkodGhpcyk7XG5cblx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFnZVRyYW5zaXRpb25zKCkge1xuXG52YXIgRWZmZWNrdFBhZ2VUcmFuc2l0aW9ucyA9IHtcblxuICBmcm9tUGFnZTogJycsXG4gIHRvUGFnZTogJycsXG4gIGlzQW5pbWF0aW5nOiBmYWxzZSxcbiAgaXNOZXh0UGFnZUVuZDogZmFsc2UsXG4gIGlzQ3VycmVudFBhZ2VFbmQ6IGZhbHNlLFxuICB0cmFuc2l0aW9uSW5FZmZlY3Q6ICcnLFxuICB0cmFuc2l0aW9uT3V0RWZmZWN0OiAnJyxcblxuICBpbml0OiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaW5pdFBhZ2VzKCk7XG4gICAgdGhpcy5iaW5kVUlBY3Rpb25zKCk7XG5cbiAgfSxcblxuICBpbml0UGFnZXM6IGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgJHBhZ2VzID0gJCgnW2RhdGEtZWZmZWNrdC1wYWdlXScpO1xuXG4gICAgdGhpcy5mcm9tUGFnZSA9ICRwYWdlcy5maXJzdCgpLmFkZENsYXNzKCdlZmZlY2t0LXBhZ2UtYWN0aXZlJyk7XG5cbiAgfSxcblxuICBiaW5kVUlBY3Rpb25zOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICQoJy5lZmZlY2t0LXBhZ2UtdHJhbnNpdGlvbi1idXR0b24nKS5vbiggRWZmZWNrdC5idXR0b25QcmVzc2VkRXZlbnQsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciB0cmFuc2l0aW9uSW5FZmZlY3QgID0gJCh0aGlzKS5kYXRhKCdlZmZlY2t0LXRyYW5zaXRpb24taW4nKSxcbiAgICAgICAgICB0cmFuc2l0aW9uT3V0RWZmZWN0ID0gJCh0aGlzKS5kYXRhKCdlZmZlY2t0LXRyYW5zaXRpb24tb3V0JyksXG4gICAgICAgICAgdHJhbnNpdGlvblBhZ2UgICAgICA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLXBhZ2UnKTtcblxuICAgICAgaWYgKCAkKHRoaXMpLmRhdGEoXCJlZmZlY2t0LW5lZWRzLXBlcnNwZWN0aXZlXCIpKSB7XG4gICAgICAgICQoXCJodG1sXCIpLmFkZENsYXNzKFwibWQtcGVyc3BlY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJhbnNpdGlvblBhZ2UoIHRyYW5zaXRpb25QYWdlLCB0cmFuc2l0aW9uSW5FZmZlY3QsIHRyYW5zaXRpb25PdXRFZmZlY3QgKTtcblxuICAgIH0pO1xuICB9LFxuXG4gIHRyYW5zaXRpb25QYWdlOiBmdW5jdGlvbiggdHJhbnNpdGlvblBhZ2UsIHRyYW5zaXRpb25JbkVmZmVjdCwgdHJhbnNpdGlvbk91dEVmZmVjdCApIHtcblxuICAgIGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgdGhpcy5pc0N1cnJlbnRQYWdlRW5kID0gZmFsc2U7XG4gICAgdGhpcy5pc05leHRQYWdlRW5kID0gZmFsc2U7XG4gICAgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QgPSB0cmFuc2l0aW9uSW5FZmZlY3Q7XG4gICAgdGhpcy50cmFuc2l0aW9uT3V0RWZmZWN0PSB0cmFuc2l0aW9uT3V0RWZmZWN0O1xuXG4gICAgLy8gR2V0IFBhZ2VzXG4gICAgdGhpcy5mcm9tUGFnZSA9ICQoJ1tkYXRhLWVmZmVja3QtcGFnZV0uZWZmZWNrdC1wYWdlLWFjdGl2ZScpO1xuICAgIHRoaXMudG9QYWdlICAgPSAkKCdbZGF0YS1lZmZlY2t0LXBhZ2U9XCInICsgdHJhbnNpdGlvblBhZ2UgKyAnXCJdJyk7XG5cbiAgICAvLyBBZGQgdGhpcyBjbGFzcyB0byBwcmV2ZW50IHNjcm9sbCB0byBiZSBkaXNwbGF5ZWRcbiAgICB0aGlzLnRvUGFnZS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyBlZmZlY2t0LXBhZ2UtYWN0aXZlICcgKyB0aGlzLnRyYW5zaXRpb25JbkVmZmVjdCk7XG4gICAgdGhpcy5mcm9tUGFnZS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZycpO1xuXG4gICAgLy8gU2V0IFRyYW5zaXRpb24gQ2xhc3NcbiAgICB0aGlzLmZyb21QYWdlLmFkZENsYXNzKHRoaXMudHJhbnNpdGlvbk91dEVmZmVjdCk7XG4gICAgXG4gICAgdmFyIHNlbGY9IHRoaXM7XG4gICAgXG4gICAgdGhpcy50b1BhZ2Uub24oIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgIFxuICAgICAgc2VsZi50b1BhZ2Uub2ZmKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCApO1xuICAgICAgc2VsZi5pc05leHRQYWdlRW5kID0gdHJ1ZTtcblxuICAgICAgaWYgKCBzZWxmLmlzQ3VycmVudFBhZ2VFbmQgKSB7XG4gICAgICAgIHNlbGYucmVzZXRUcmFuc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmZyb21QYWdlLm9uKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24gKCkge1xuXG4gICAgICBzZWxmLmZyb21QYWdlLm9mZiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgKTtcbiAgICAgIHNlbGYuaXNDdXJyZW50UGFnZUVuZCA9IHRydWU7XG5cbiAgICAgIGlmICggc2VsZi5pc05leHRQYWdlRW5kICkge1xuICAgICAgICBzZWxmLnJlc2V0VHJhbnNpdGlvbigpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfSxcblxuICByZXNldFRyYW5zaXRpb246IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNDdXJyZW50UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNOZXh0UGFnZUVuZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5mcm9tUGFnZS5yZW1vdmVDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyBlZmZlY2t0LXBhZ2UtYWN0aXZlICcgKyB0aGlzLnRyYW5zaXRpb25PdXRFZmZlY3QpOy8vLmhpZGUoKTtcbiAgICB0aGlzLnRvUGFnZS5yZW1vdmVDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyAnICsgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QpO1xuXG4gICAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJtZC1wZXJzcGVjdGl2ZVwiKTtcbiAgfVxuXG59O1xuXG5FZmZlY2t0UGFnZVRyYW5zaXRpb25zLmluaXQoKTtcdFxuXHRcbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG52YXIgcmVuZGVyVGVtcGxhdGVzID0gcmVxdWlyZSgnLi9yZW5kZXJUZW1wbGF0ZXMnKTtcbnZhciBwYWdlU3RhdGVVcERhdGUgPSByZXF1aXJlKCcuL3BhZ2VTdGF0ZVVwRGF0ZScpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYWpheENhbGwocmVxdWVzdCkge1xuXG5cdCQuYWpheCh7XG5cdCAgICB1cmw6IHJlcXVlc3QuanNvbl91cmwsXG5cdCAgICBkYXRhVHlwZTogJ2pzb24nXG5cdH0pXG5cblx0LmRvbmUoZnVuY3Rpb24oZGF0YSl7XHRcblxuXHRcdC8vIGNsZWFyIGN1cnJlbnQgY29udGVudCAtIHRoaXMgY291bGQgYmUgc3RvcmVkXG5cdFx0ZG9tRWxzLnBhZ2VfY29udGFpbmVyLmVtcHR5KCk7XG5cblx0XHQvLyB1cGRhdGUgcGFnZV9zdGF0ZSBvYmplY3Rcblx0XHRwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSk7XHRcblxuXHRcdHJlbmRlclRlbXBsYXRlcyhkYXRhKTtcblx0XHRcdFxuXHRcdC8vIHB1dCB0aGUgdGVtcGF0ZSBpbiBsb2NhbCBzdG9yYWdlIGFzIHN0cmluZ2lmeVxuXHRcdC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicGFnZV9cIiArIHJlcXVlc3QuaWQsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHRcblx0XHQvLyBpZiAoTW9kZXJuaXpyLmxvY2Fsc3RvcmFnZSkge1xuXHRcdC8vIFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5nXG5cdFx0Ly8gXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGFnZV8nICsgcmVxdWVzdC5pZCwgY2h1bmtbMF0uaW5uZXJIVE1MKTtcdFx0XHRcdFxuXHRcdC8vIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHR9KVxuXG5cdC5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKCdlcnJvcicpO1xuXHRcdCQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG5cdH0pXG5cblx0LmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHQvLyBjb25zb2xlLmxvZygnY29tcGxldGUhJyk7XG5cdH0pO1x0XG5cbn07IiwidmFyIHdyYXBMZXR0ZXJzID0gcmVxdWlyZSgnLi93cmFwTGV0dGVycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFuaW1hdGVIZWFkKCkge1xuXG5cdHZhciBoZWFkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX2FuaW1hdGVfaGVhZGluZycpO1xuXG5cdGlmICgkKGhlYWRpbmcpLmxlbmd0aCA+IDApIHtcblx0XHR3cmFwTGV0dGVycyhoZWFkaW5nKTtcblxuXHRcdHZhciBsZXR0ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX2FuaW1hdGVfaGVhZGluZycpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xldHRlcicpO1xuXG5cdFx0dmFyIG4gPSAwO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZXR0ZXJzLmxlbmd0aDsgaSsrKSB7XHRcdFxuXHRcdFx0bGV0dGVyc1tpXS5zdHlsZS50cmFuc2l0aW9uID0gJ29wYWNpdHkgJyArIG4gKyAnbXMgZWFzZSc7XG5cdFx0XHRuKz0gMjAwO1xuXHRcdH1cblxuXHR9XG5cblx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0JChoZWFkaW5nKS5hZGRDbGFzcygnb24tbG9hZCcpO1xuXHR9LCAyMDApO1xuXHRcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoQW5pbWF0aW9uRXZlbnQoKSB7XG5cdFxuXHR2YXIga2V5O1x0XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcblxuXHR2YXIgYW5pbWF0aW9ucyA9IHtcblx0XHQnV2Via2l0QW5pbWF0aW9uJyA6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuXHRcdCdPQW5pbWF0aW9uJyA6ICdvQW5pbWF0aW9uRW5kJyxcblx0XHQnbXNBbmltYXRpb24nIDogJ01TQW5pbWF0aW9uRW5kJyxcblx0XHQnYW5pbWF0aW9uJyA6ICdhbmltYXRpb25lbmQnXG5cdH07XG5cbiAgICBmb3Ioa2V5IGluIGFuaW1hdGlvbnMpe1xuICAgICAgICBpZiggZWwuc3R5bGVba2V5XSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uc1trZXldO1xuICAgICAgICB9XG4gICAgfVx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKSB7XG5cblx0dmFyIGtleTtcdFxuXHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlZWxlbWVudCcpO1xuXG5cdHZhciB0cmFuc2l0aW9ucyA9IHtcblx0XHQndHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuXHRcdCdPVHJhbnNpdGlvbic6J29UcmFuc2l0aW9uRW5kJyxcblx0XHQnTW96VHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuXHRcdCdXZWJraXRUcmFuc2l0aW9uJzond2Via2l0VHJhbnNpdGlvbkVuZCdcblx0fTtcblxuXHRmb3Ioa2V5IGluIHRyYW5zaXRpb25zKXtcblx0XHRpZiggZWwuc3R5bGVba2V5XSAhPT0gdW5kZWZpbmVkICl7XG5cdFx0ICAgIHJldHVybiB0cmFuc2l0aW9uc1trZXldO1xuXHRcdH1cblx0fVx0XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuLi9kb21FbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpblZpZXcoY29udGFpbmVyLCAkZWwpIHtcblxuXHQvLyBodHRwOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy9zcGVlZC9hbmltYXRpb25zLyNkZWJvdW5jaW5nLXNjcm9sbC1ldmVudHNcblxuXHR2YXIgJGFuaW1hdGlvbl9lbGVtZW50cyA9ICRlbDtcblxuXHR2YXIgcGFnZSA9IGNvbnRhaW5lcjtcblxuXHR2YXIgbGF0ZXN0S25vd25TY3JvbGxZID0gMCxcblx0XHR0aWNraW5nID0gZmFsc2UsXG5cdFx0cGFnZUhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcblx0XHR0aGVPZmZzZXQgPSAwO1xuXG5cdGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuXHRcdGxhdGVzdEtub3duU2Nyb2xsWSA9ICQoaG9tZXBhZ2UpLnNjcm9sbFRvcCgpO1xuXHRcdHJlcXVlc3RUaWNrKCk7XG5cdH1cblx0ZnVuY3Rpb24gcmVxdWVzdFRpY2soKSB7XG5cdFx0aWYoIXRpY2tpbmcpIHtcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuXHRcdH1cblx0XHR0aWNraW5nID0gdHJ1ZTtcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGUoKSB7XG5cdFx0Ly8gcmVzZXQgdGhlIHRpY2sgc28gd2UgY2FuXG5cdFx0Ly8gY2FwdHVyZSB0aGUgbmV4dCBvblNjcm9sbFxuXHRcdHRpY2tpbmcgPSBmYWxzZTtcblxuXHRcdHZhciBjdXJyZW50U2Nyb2xsWSA9IGxhdGVzdEtub3duU2Nyb2xsWTtcblxuXHRcdC8vIHJlYWQgb2Zmc2V0IG9mIERPTSBlbGVtZW50c1xuXHRcdHRoZU9mZnNldCA9ICRhbmltYXRpb25fZWxlbWVudHMub2Zmc2V0KCk7XG5cblx0XHQvLyBhbmQgY29tcGFyZSB0byB0aGUgY3VycmVudFNjcm9sbFkgdmFsdWVcblx0XHQvLyB0aGVuIGFwcGx5IHNvbWUgQ1NTIGNsYXNzZXNcblx0XHQvLyB0byB0aGUgdmlzaWJsZSBpdGVtc1xuXHRcdGlmICh0aGVPZmZzZXQudG9wIDwgcGFnZUhlaWdodCkge1xuXHRcdFx0JGFuaW1hdGlvbl9lbGVtZW50cy5hZGRDbGFzcygnaW4tdmlldycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkYW5pbWF0aW9uX2VsZW1lbnRzLnJlbW92ZUNsYXNzKCdpbi12aWV3Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gY29uc29sZS5sb2codGhlT2Zmc2V0LnRvcCk7XG5cdFx0Ly8gY29uc29sZS5sb2cocGFnZUhlaWdodCk7XG5cblx0fVxuXG5cdHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcblx0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3cmFwTGV0dGVycyhlbCkge1xuXHRyZXR1cm4gZWwuaW5uZXJIVE1MID0gZWwudGV4dENvbnRlbnQuc3BsaXQoXCJcIikubWFwKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRyZXR1cm4gJzxzcGFuIGNsYXNzPWxldHRlcj4nICsgbGV0dGVyICsgJzwvc3Bhbj4nO1xuXHR9KS5qb2luKFwiXCIpO1x0XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJhY2tUb01lbnUoKSB7XG5cblx0Ly8gdXBkYXRlIHBhZ2Vfc3RhdGVcblx0cGFnZV9zdGF0ZS5jdXJyZW50X3BhZ2UgPSBcImhvbWVwYWdlXCI7XG5cblx0Ly8gaGlkZSB0aGUgYnV0dG9uIFxuXHQkKGRvbUVscy5iYWNrX3RvX21lbnVfYnRuKVxuXHRcdFxuXHRcdFx0LmFkZENsYXNzKCdvZmYnKTtcblxuXHQvLyBzY3JvbGwgdGhlIHNpbmdsZSBpdGVtIHBhZ2UgYmFjayB0byB0b3Bcblx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHQkKCcjanNfcGFnZV8yJykuc2Nyb2xsVG9wKCAwICk7XG5cblx0XHQkKGRvbUVscy5iYWNrX3RvX21lbnVfYnRuKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdvbiBvZmYnKTtcblxuXHR9LCA2MDApO1xuXHRcdCAgICAgICAgXHRcdFx0XHQgICAgXHRcbn07IiwidmFyIGRvbUVscyA9IHtcblx0XCJ0cmlnZ2VyX3RyYW5zaXRpb25cIiA6ICQoJyNqc190cmlnZ2VyX3RyYW5zaXRpb24nKSxcblx0XCJhbmltYXRpb25fZWxlbWVudHNcIiA6ICQoJyNqc19hbmltYXRlX2hlYWQnKSxcblx0XCJwYWdlX2NvbnRhaW5lclwiIDogJCgnI2pzX3BhZ2Vfc2luZ2xlX2l0ZW0nKSxcblx0XCJiYWNrX3RvX21lbnVfYnRuXCIgOiAkKCcjanNfYmFja190b19tZW51JyksXG5cdFwic3Bpbm5lclwiIDogJCgnPGRpdiBpZD1cImpzX2xvYWRpbmdcIj48ZGl2IGNsYXNzPVwic3Bpbm5lclwiPjwvZGl2PjwvZGl2PicpXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxzOyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpcmVUcmFuc2l0aW9uKCkge1xuXG5cdGRvbUVscy50cmlnZ2VyX3RyYW5zaXRpb24udHJpZ2dlcignY2xpY2snKTtcblxuXHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcdFxuXHRcdFxuXHRcdGRvbUVscy5iYWNrX3RvX21lbnVfYnRuXG5cdFx0XHQuYWRkQ2xhc3MoJ29uJyk7XG5cblx0XHQkKCcjanNfbG9hZGluZycpLnJlbW92ZSgpO1xuXG5cdH0sIDEyMDApO1xuXG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluamVjdFNwaW5uZXIoKSB7XG5cdCQoJ2JvZHknKS5hcHBlbmQoZG9tRWxzLnNwaW5uZXIpO1x0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNMb2FkZWQoaWRlbnRpZmllciwgYXJyLCByZXF1ZXN0KSB7XG5cblx0dmFyIHJlcyA9IGZhbHNlO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XG5cdFx0Zm9yICh2YXIga2V5IGluIGFycltpXSkge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXJyW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRpZiAoYXJyW2ldW2tleV0gPT09IGlkZW50aWZpZXIpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgaWRlbnRpZmllciBpcyBmb3VuZCB1cGRhdGUgcmVxdWVzdC5pZFxuXHRcdFx0XHRcdC8vIHVzZWQgZm9yIHdoZW4gdGhlIGlkZW50aWZpZXIgaXMgbm90IHRoZSBpZCBudW1iZXIgKGVnIHNsdWcpXG5cdFx0XHRcdFx0cmVxdWVzdC5pZCA9IGFycltpXS5wYWdlX2lkO1xuXHRcdFx0XHRcdHJlcyA9IHRydWU7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVx0XHRcdFx0XG5cdH1cblx0XG5cdGNvbnNvbGUubG9nKFwiaXNMb2FkZWQgOiBcIiArIHJlcyk7XG5cblx0cmV0dXJuIHJlcztcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZ2VTdGF0ZVVwRGF0ZShkYXRhLCBwYWdlX3N0YXRlKSB7XG5cdFxuXHRwYWdlX3N0YXRlLmN1cnJlbnRfcGFnZSA9IGRhdGEuc2x1ZztcblxuXHRwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcy5wdXNoKHtcblx0XHRcInBhZ2VfaWRcIiA6IGRhdGEuaWQsXG5cdFx0XCJwYWdlX3NsdWdcIiA6IGRhdGEuc2x1Zyxcblx0XHRcInBhZ2VfdXJsXCIgOiBkYXRhLmxpbmssXG5cdFx0XCJqc29uX2xpbmtcIiA6IGRhdGEuX2xpbmtzLnNlbGZbMF0uaHJlZlx0XHRcdFxuXHR9KTtcblxuXHRyZXR1cm4gcGFnZV9zdGF0ZTtcbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG52YXIgYmFja1RvTWVudSA9IHJlcXVpcmUoJy4vYmFja1RvTWVudScpO1xuLy8gdmFyIGlzTG9hZGVkID0gcmVxdWlyZSgnLi9pc0xvYWRlZCcpO1xudmFyIGluamVjdFNwaW5uZXIgPSByZXF1aXJlKCcuL2luamVjdFNwaW5uZXInKTtcbnZhciBhamF4Q2FsbCA9IHJlcXVpcmUoJy4vYWpheENhbGwnKTtcblxuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZWFkQWRkcmVzc0JhcihyZXF1ZXN0LCBwYWdlX3N0YXRlKSB7XG5cbiAgICAvLyBTYWZhcmkgZmlyZSBwb3BzdGF0ZSBldmVudCBvbiBwYWdlIGxvYWQuIEhhY2sgdG8gYXZvaWQgaW5maW5hdGUgbG9vcCAtIHdyYXAgaW4gc2V0VGltZW91dFxuXG4gICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG5cbiAgICBcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZnVuY3Rpb24oZSkge1x0XHRcblxuXG4gICAgXHRcdCAgICAvLyBnZXQgdGhlIHNsdWdcbiAgICAgICAgICAgIHBhdGhBcnJheSA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgICAgIHRoZUluZGV4ID0gcGF0aEFycmF5Lmxlbmd0aCAtIDI7XG4gICAgICAgICAgICB0aGVTbHVnID0gcGF0aEFycmF5W3RoZUluZGV4XTtcdFxuICAgICAgICAgICAgdGhlUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdyZWFkQWRkcmVzc0Jhci5qcyAtIHRoZVNsdWcgPSAnICsgdGhlU2x1Zyk7XG5cbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oZG9jdW1lbnQubG9jYXRpb24uaHJlZik7XG5cbiAgICAgICAgICAgIC8qICAgICAgICAgICBcbiAgICAgICAgICAgICBpZiB0aGVTbHVnIGlzIGluIHBvc3RkYXRhLnNsdWcgdXBkYXRlIHJlcXVlc3QgYW5kIGZpcmUgYWpheCAtIHlvdSBhcmUgb24gdGhlIGhvbWVwYWdlXG4gICAgICAgICAgICAgaWYgbm90IHRyaWdnZXIgYmFjayB0byBtZW51IGNsaWNrIFxuICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgLy8gYXJlIHlvdSBvbiB0aGUgc2FtZSBwYWdlX3N0YXRlXG4gICAgICAgICAgICAvLyBpZiAodGhlU2x1ZyA9PT0gcGFnZV9zdGF0ZS5jdXJyZW50X3BhZ2UpIHtcbiAgICAgICAgICAgIC8vICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGlmICh0aGVTbHVnID09PSBcIlwiIHx8IHRoZVNsdWcgPT09IFwiamFzb25yaWdoZWxhdG9cIikge1xuXG4gICAgICAgICAgICAvLyAgIGlmIChwYWdlX3N0YXRlLmN1cnJlbnRfcGFnZSAhPT0gXCJob21lcGFnZVwiKSB7XG5cbiAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcInlvdSdyZSBvbiB0aGUgaG9tZXBhZ2VcIik7XG4gICAgICAgICAgICAvLyAgICAgZG9tRWxzLmJhY2tfdG9fbWVudV9idG4udHJpZ2dlcignY2xpY2snKTtcbiAgICAgICAgICAgIC8vICAgICBiYWNrVG9NZW51KCk7XG4gICAgICAgICAgICAvLyAgICAgcGFnZV9zdGF0ZS5jdXJyZW50X3BhZ2UgPSBcImhvbWVwYWdlXCI7XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlOyAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB9XG5cbiAgICAgICAgICAgIC8vIGZvciAodmFyIGtleSBpbiBwb3N0ZGF0YS5zbHVnKSB7XG5cbiAgICAgICAgICAgIC8vICAgaWYgKHBvc3RkYXRhLnNsdWcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUubG9nKCBrZXkgKyBcIiA6IFwiICsgcG9zdGRhdGEuc2x1Z1trZXldKTtcblxuICAgICAgICAgICAgLy8gICAgIGlmICh0aGVTbHVnID09PSBrZXkpIHtcblxuICAgICAgICAgICAgLy8gICAgICAgY29uc29sZS5sb2codGhlU2x1Zyk7XG4gICAgICAgICAgICAvLyAgICAgICAkKCcjJyArIHRoZVNsdWcpLnRyaWdnZXIoJ2NsaWNrJyk7XG5cbiAgICAgICAgICAgIC8vICAgICAgIC8vIHRoZVJlc3VsdCA9IHRydWU7IFxuICAgICAgICAgICAgLy8gICAgICAgLy8gLy8gdXBkYXRlcyByZXF1ZXN0IG9iamVjdFxuICAgICAgICAgICAgLy8gICAgICAgLy8gcmVxdWVzdCA9IHt9O1xuICAgICAgICAgICAgLy8gICAgICAgLy8gLy8gZ2V0IHRoZSBocmVmXG4gICAgICAgICAgICAvLyAgICAgICAvLyByZXF1ZXN0LmhyZWYgPSBcIlwiO1xuICAgICAgICAgICAgLy8gICAgICAgLy8gLy8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuICAgICAgICAgICAgLy8gICAgICAgLy8gcmVxdWVzdC5pZCA9IHBvc3RkYXRhLnNsdWdba2V5XTsgICBcbiAgICAgICAgICAgIC8vICAgICAgIC8vIC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuICAgICAgICAgICAgLy8gICAgICAgLy8gcmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdOyAgICAgICBcbiAgICAgICAgICAgIC8vICAgICAgIC8vIC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcbiAgICAgICAgICAgIC8vICAgICAgIC8vIHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XG4gICAgICAgICAgICAvLyAgICAgfSBcbiAgICAgICAgICAgIC8vICAgfSBcbiAgICAgICAgICAgIC8vIH0gXG5cbiAgICAgICAgICAgIC8vIGlmICh0aGVSZXN1bHQpIHsgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gICAgIGluamVjdFNwaW5uZXIoKTtcbiAgICAgICAgICAgIC8vICAgICAvLyBpZiBpc0xvYWRlZCBncmFiIHRoZSBjaHVuayBmcm9tIGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgLy8gICAgIGFqYXhDYWxsKHJlcXVlc3QpOyAgICAgICAgICBcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgd2luZG93LmxvY2F0aW9uLmFzc2lnbihqcl9wb3J0Zm9saW8uY29uZmlnLnNpdGVVcmwpO1xuICAgICAgICAgICAgLy8gICAvLyAgZm9yIGJyb3dzZXJzeW5jIG9ubHkgLSBDSEFOR0UgVE86XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gICAgLy8gd2luZG93LmxvY2F0aW9uLmFzc2lnbihwb3N0ZGF0YS5yb290X3VybCk7ICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIH1cblxuXG4gICAgICAgIH0pOyAgXG5cbiAgICAgICAgfSwgMzAwICk7ICAgXHRcbn07XG5cblxuXG4iLCJ2YXIgZmlyZVRyYW5zaXRpb24gPSByZXF1aXJlKCcuL2ZpcmVUcmFuc2l0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVuZGVyVGVtcGxhdGVzKGRhdGEpIHtcblxuXHR2YXIgc2x1ZyA9IGRhdGEuc2x1Zztcblx0dmFyIGltYWdlVXJsID0gZGF0YS5hY2YuaGVhZGVyX2ltYWdlLnVybDtcblxuXHRmdW5jdGlvbiBvbkNvbXBsZXRlKCkge1xuXG5cdFx0Y29uc29sZS5sb2coJ3RlbXBsYXRlIHJlbmRlcmVkIScpO1xuXHRcdC8vIEFsbCBzZXQuLiBcblx0XHRmaXJlVHJhbnNpdGlvbigpO1xuXHR9XG5cblx0Ly8gJChcIiNqc19wYWdlX3NpbmdsZV9pdGVtXCIpLnJlbW92ZUNsYXNzKCkuYWRkQ2xhc3Moc2x1Zyk7XG5cblx0JChcIiNqc19wYWdlX3NpbmdsZV9pdGVtXCIpLmxvYWRUZW1wbGF0ZSgkKFwiI2l0ZW1UZW1wbGF0ZVwiKSwge1xuXG5cdFx0XCJ0aXRsZVwiIDogZGF0YS50aXRsZS5yZW5kZXJlZCxcblx0XHRcImludHJvXCIgOiBkYXRhLmFjZi5sb25nX2Rlc2NyaXB0aW9uLFxuXHRcdFwiaGVyb0ltYWdlXCIgOiBkYXRhLmFjZi5oZWFkZXJfaW1hZ2UudXJsLFxuXHRcdFwiaW1hZ2VfMVwiIDogZGF0YS5hY2YuaW1hZ2VfMS51cmwsXG5cdFx0XCJpbWFnZV8yXCIgOiBkYXRhLmFjZi5pbWFnZV8yLnVybCxcblx0XHRcImJ0blRleHRcIiA6IFwiVmlzaXQgdGhlIHNpdGVcIixcblx0XHRcImJ0bkxpbmtcIiA6IGRhdGEuYWNmLnNpdGVfdXJsXG4gICBcdFx0fSwgeyBjb21wbGV0ZTogb25Db21wbGV0ZSB9KTtcdFxuXG59OyJdfQ==
