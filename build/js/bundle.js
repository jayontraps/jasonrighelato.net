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
// var readAddressBar = require('./modules/readAddressBar'); // attempt at a router

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

					
		$('.work_menu_link').on('touchstart click', function(event) {

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


			// local testing 
			// delay for 500ms in case of fast ajax !
			// window.setTimeout(function() {

			// 	$('#js_loading').remove();
			// 	fireTransition();

			// }, 500);	

					


			// if (Modernizr.history) {
			//  	history.pushState(null, null, request.href);
			// }
		});


		// /* BACK TO MENU */
		domEls.back_to_menu_btn.on('touchstart click', function() {

			backToMenu();

			// for browsersync only - CHANGE TO:
			// history.pushState( null, null, postdata.root_url );	        
			// history.pushState( null, null, jr_portfolio.config.siteUrl );

		});







		/* TODO - BROWSERS BACK BUTTON */
		// if ($(homepage).length > 0) {

		// 	readAddressBar(request, page_state);
		// 	// adds the popstate event handler 
		// 	// needs revision

		// }

















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
},{"./modules/Effeckt/captions":2,"./modules/Effeckt/core":3,"./modules/Effeckt/pageTransitions":4,"./modules/ajaxCall":5,"./modules/animations/animateHeading":6,"./modules/animations/animation_utils/whichAnimationEvent":7,"./modules/animations/animation_utils/whichTransitionEvent":8,"./modules/animations/inView":9,"./modules/animations/wrapLetters":10,"./modules/backToMenu":11,"./modules/domEls":13,"./modules/fireTransition":14,"./modules/injectSpinner":15,"./modules/isLoaded":16}],2:[function(require,module,exports){
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
var buildTemplate = require('./buildTemplate');
var renderTemplates = require('./renderTemplates');
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

		renderTemplates(data);


		
		// template the data
		// var chunk = buildTemplate(data);

		// // insert into the DOM		
		// domEls.page_container.append(chunk);

		// delay for 500ms in case of fast ajax !
		window.setTimeout(function() {

			// $('#js_loading').remove();
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
},{"./buildTemplate":12,"./domEls":13,"./fireTransition":14,"./pageStateUpDate":17,"./renderTemplates":18}],6:[function(require,module,exports){
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
},{"../domEls":13}],10:[function(require,module,exports){
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
		.removeClass('on')
			.addClass('off');

	// scroll the single item page back to top
	window.setTimeout(function() {

		$('#js_page_2').scrollTop( 0 );

		$(domEls.back_to_menu_btn)
			.removeClass('off');

	}, 600);
		        				    	
};
},{"./domEls":13}],12:[function(require,module,exports){
module.exports = function buildTemplate(data) {

	var i = "";
	var key;
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
},{}],13:[function(require,module,exports){
var domEls = {
	"animation_elements" : $('#js_animate_head'),
	"page_container" : $('#js_page_single_item'),
	"back_to_menu_btn" : $('#js_back_to_menu'),
	"spinner" : $('<div id="js_loading"><div class="spinner"></div></div>')
};


module.exports = domEls;
},{}],14:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function fireTransition() {

	$('.effeckt .the-btn').trigger('click');

	window.setTimeout(function() {	
		
		domEls.back_to_menu_btn
			.addClass('on');

		$('#js_loading').remove();

	}, 1200);

};
},{"./domEls":13}],15:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function injectSpinner() {
	$('body').append(domEls.spinner);	
};
},{"./domEls":13}],16:[function(require,module,exports){
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
},{}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
module.exports = function renderTemplates(data) {

	var slug = data.slug;
	var imageUrl = data.acf.header_image.url;

	function onComplete() {
		// $(".hero").css("background-image","url("+ imageUrl +")");
		
		// console.log(imageUrl);
	}

	$("#js_page_single_item").removeClass().addClass(slug);

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
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvY2FwdGlvbnMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvRWZmZWNrdC9jb3JlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hBbmltYXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaFRyYW5zaXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2luVmlldy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2JhY2tUb01lbnUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYnVpbGRUZW1wbGF0ZS5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9kb21FbHMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvZmlyZVRyYW5zaXRpb24uanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaW5qZWN0U3Bpbm5lci5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9pc0xvYWRlZC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9wYWdlU3RhdGVVcERhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcmVuZGVyVGVtcGxhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDclRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogQ2FjaGUgcmVmZXJlbmNlIHRvIERPTSBlbGVtZW50cyAqL1xudmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9kb21FbHMnKTtcblxuXG4vKiBBbmltYXRpb25zICovXG52YXIgaW5WaWV3ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvaW5WaWV3Jyk7XG52YXIgd3JhcExldHRlcnMgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy93cmFwTGV0dGVycycpO1xudmFyIGFuaW1hdGVIZWFkaW5nID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcnKTtcbnZhciB3aGljaFRyYW5zaXRpb25FdmVudCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaFRyYW5zaXRpb25FdmVudCcpO1xudmFyIHdoaWNoQW5pbWF0aW9uRXZlbnQgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hBbmltYXRpb25FdmVudCcpO1xuXG4vKlxuZ2V0IGNhbGxiYWNrcyBmcm9tIGNzcyBhbmltYXRpb25zOiBodHRwczovL2Rhdmlkd2Fsc2gubmFtZS9jc3MtYW5pbWF0aW9uLWNhbGxiYWNrXG5cbnZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbCcpOyAvLyBnZXQgc29tZSBlbGVtZW50XG5cdFxuLy8gc3RvcmUgdGhlIGFuaW1hdGlvbiAvIHRyYW5zaXRpb24gZW5kIGV2ZW50IC0gYWRkIHRvIGdsb2JhbCBvYmplY3Q/IFxudmFyIHRoZUV2ZW50ID0gd2hpY2hBbmltYXRpb25FdmVudCgpO1xuXG4vLyBhZGQgbGlzdG5lciBhbmQgY2FsbGJhY2tcbnRoZUV2ZW50ICYmIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhlRXZlbnQsIGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygnVHJhbnNpdGlvbiBjb21wbGV0ZSEgIFRoaXMgaXMgdGhlIGNhbGxiYWNrLCBubyBsaWJyYXJ5IG5lZWRlZCEnKTtcbn0pO1xuXG4qL1xuXG5cblxuXG5cblxuLyogdGVzdGluZyBhbmltYXRlLmpzIDogaHR0cHM6Ly9naXRodWIuY29tL2JlbmRjL2FuaW1hdGUgKi9cbi8vIHZhciB0ZXN0QW5pbWF0ZUpzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZV9qcy90ZXN0QW5pbWF0ZUpzJyk7XG4vLyB0ZXN0QW5pbWF0ZUpzKCk7XG5cblxuXG4vKiBFZmZlY2t0ICovXG52YXIgY29yZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9FZmZlY2t0L2NvcmUnKTtcbnZhciBwYWdlVHJhbnNpdGlvbnMgPSByZXF1aXJlKCcuL21vZHVsZXMvRWZmZWNrdC9wYWdlVHJhbnNpdGlvbnMnKTtcbnZhciBjYXB0aW9ucyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9FZmZlY2t0L2NhcHRpb25zJyk7XG4vLyBpbml0IEVmZmVja3RcbmNvcmUoKTtcbnBhZ2VUcmFuc2l0aW9ucygpO1xuY2FwdGlvbnMoKTtcblxuXG5cbi8qIGxvYWRpbmcgd29yayBwYWdlcyAqL1xudmFyIGluamVjdFNwaW5uZXIgPSByZXF1aXJlKCcuL21vZHVsZXMvaW5qZWN0U3Bpbm5lcicpO1xudmFyIGFqYXhDYWxsID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FqYXhDYWxsJyk7XG4vLyB2YXIgcmVhZEFkZHJlc3NCYXIgPSByZXF1aXJlKCcuL21vZHVsZXMvcmVhZEFkZHJlc3NCYXInKTsgLy8gYXR0ZW1wdCBhdCBhIHJvdXRlclxuXG52YXIgaXNMb2FkZWQgPSByZXF1aXJlKCcuL21vZHVsZXMvaXNMb2FkZWQnKTsgXG4vLyB2YXIgdHJhbnNpdGlvblRvUGFnZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90cmFuc2l0aW9uVG9QYWdlJyk7XG4vLyB2YXIgdHJhbnNpdGlvbkJhY2tUb01lbnUgPSByZXF1aXJlKCcuL21vZHVsZXMvdHJhbnNpdGlvbkJhY2tUb01lbnUnKTtcbnZhciBmaXJlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vbW9kdWxlcy9maXJlVHJhbnNpdGlvbicpO1xudmFyIGJhY2tUb01lbnUgPSByZXF1aXJlKCcuL21vZHVsZXMvYmFja1RvTWVudScpO1xuXG5cblxuXG5cblxuLy8gR0xPQkFMIEZPUiBERVZcbnJlcXVlc3QgPSB7fTtcblxuLy8gR0xPQkFMIEZPUiBERVZcbnBhZ2Vfc3RhdGUgPSB7XG5cdFwiY3VycmVudF9wYWdlXCIgOiBcIlwiLFxuXHRcImxvYWRlZF9wYWdlc1wiIDogW10sXG5cdFwiZnJvbVBhZ2VcIiA6IFwiXCIsXG5cdFwidG9QYWdlXCIgOiBcIlwiXG59O1xuXG4vLyBFWEFNUExFU1xuXG4vLyBwb3N0ZGF0YSB7XG4vLyBcdGpzb25fdXJsIDoge1xuLy8gXHRcdDI4IDogIFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzI4XCIsXG4vLyBcdFx0MzA6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzMwXCJcbi8vIFx0fSxcbi8vIFx0cm9vdF91cmw6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0b1wiLFxuLy9cdHNsdWc6IHtcbi8vXHRcdFwiYWNlXCIgOiAyOCxcbi8vXHRcdFwiYm9jXCIgOiAzMFxuLy8gXHR9XG4vLyB9XG5cbi8vIHJlcXVlc3QgPSB7XG4vLyBcdFwiaHJlZlwiIDogXCJcIixcbi8vIFx0XCJpZFwiIDogMCxcbi8vIFx0XCJpZF9zdHJcIiA6IFwiXCIsXG4vLyBcdFwianNvbl91cmxcIiA6IFwiXCJcdFxuLy8gfTtcblxuXG4vLyBcImxvYWRlZF9wYWdlc1wiIDogW1xuLy8gXHR7XG4vLyBcdFx0anNvbl9saW5rOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy84XCJcbi8vIFx0XHRwYWdlX2lkOiA4XG4vLyBcdFx0cGFnZV9zbHVnOiBcImJpcmRzLW9mLWJlcmtzaGlyZS1hdGxhc1wiXG4vLyBcdFx0cGFnZV91cmw6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by9iaXJkcy1vZi1iZXJrc2hpcmUtYXRsYXMvXCJcdFx0XHRcbi8vIFx0fVxuLy8gXVxuXG5cbihmdW5jdGlvbigkKSB7XHRcblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuXHRcdC8qIFNFVCBVUCBBTklNQVRJT05TICovXG5cblx0XHR2YXIgdGhlVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNfYW5pbWF0ZV90aXRsZScpO1xuXG5cdFx0aWYgKCQodGhlVGl0bGUpLmxlbmd0aCA+IDApIHtcblx0XHRcdHdyYXBMZXR0ZXJzKHRoZVRpdGxlKTtcblx0XHR9XG5cdFx0XG5cdFx0XG5cdFx0YW5pbWF0ZUhlYWRpbmcoKTtcblxuXHRcdFxuXG5cdFx0Ly8gdGVzdCBpblZpZXcuLlxuXHRcdHZhciBob21lcGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lcGFnZScpO1xuXHRcdC8vIHZhciAkYW5pbWF0aW9uX2VsZW1lbnRzID0gJCgnI2pzX2FuaW1hdGVfaGVhZGluZycpO1x0XG5cblx0XHQvLyBpZiAoJChob21lcGFnZSkubGVuZ3RoID4gMCkge1xuXG5cdFx0Ly8gXHRpblZpZXcoaG9tZXBhZ2UsICRhbmltYXRpb25fZWxlbWVudHMpO1xuXG5cdFx0Ly8gXHR2YXIgeCA9ICQoJyN0ZXN0aW5nJyk7XG5cdFx0Ly8gXHRpblZpZXcoaG9tZXBhZ2UsIHgpO1xuXG5cdFx0Ly8gfVxuXG5cdFx0XG5cdFx0Ly8gU2Nyb2xsUmV2ZWFsIHBsdWdpblxuXG5cdFx0aWYgKCQoaG9tZXBhZ2UpLmxlbmd0aCA+IDApIHtcblx0XHRcdHdpbmRvdy5zciA9IFNjcm9sbFJldmVhbCgpXG5cdFx0XHRcdCAgLnJldmVhbCggJy5jb250ZW50LWNlbGwnLCB7IGNvbnRhaW5lcjogaG9tZXBhZ2UgfSApXG5cdFx0XHRcdCAgLnJldmVhbCggJy53b3JrX21lbnVfbGluaycsIHsgY29udGFpbmVyOiBob21lcGFnZSB9ICk7XG5cdFx0fVxuXG5cdFx0XG5cblx0XHRcblx0XHRcblx0XHQvLyB2YXIgaW50cm9FbHMgPSAkKCcuY29udGVudC1jZWxsJyk7XG5cblx0XHQvLyBpZiAoJChob21lcGFnZSkubGVuZ3RoID4gMCkge1xuXG5cdFx0Ly8gXHRpblZpZXcoaG9tZXBhZ2UsIGludHJvRWxzKTtcblxuXHRcdC8vIH1cblxuXHRcdFx0XHRcdFxuXHRcdCQoJy53b3JrX21lbnVfbGluaycpLm9uKCd0b3VjaHN0YXJ0IGNsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Ly8gdXBkYXRlcyByZXF1ZXN0IG9iamVjdFxuXHRcdFx0cmVxdWVzdCA9IHt9O1xuXHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcdFx0XHRcblx0XHRcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFx0XG5cblx0XHRcdGluamVjdFNwaW5uZXIoKTtcblxuXHRcdFx0Ly8gaWYgaXNMb2FkZWQgZ3JhYiB0aGUgY2h1bmsgZnJvbSBsb2NhbFN0b3JhZ2VcblxuXG5cblx0XHRcdGFqYXhDYWxsKHJlcXVlc3QpO1xuXG5cblx0XHRcdC8vIGxvY2FsIHRlc3RpbmcgXG5cdFx0XHQvLyBkZWxheSBmb3IgNTAwbXMgaW4gY2FzZSBvZiBmYXN0IGFqYXggIVxuXHRcdFx0Ly8gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vIFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcblx0XHRcdC8vIFx0ZmlyZVRyYW5zaXRpb24oKTtcblxuXHRcdFx0Ly8gfSwgNTAwKTtcdFxuXG5cdFx0XHRcdFx0XG5cblxuXHRcdFx0Ly8gaWYgKE1vZGVybml6ci5oaXN0b3J5KSB7XG5cdFx0XHQvLyAgXHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCByZXF1ZXN0LmhyZWYpO1xuXHRcdFx0Ly8gfVxuXHRcdH0pO1xuXG5cblx0XHQvLyAvKiBCQUNLIFRPIE1FTlUgKi9cblx0XHRkb21FbHMuYmFja190b19tZW51X2J0bi5vbigndG91Y2hzdGFydCBjbGljaycsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRiYWNrVG9NZW51KCk7XG5cblx0XHRcdC8vIGZvciBicm93c2Vyc3luYyBvbmx5IC0gQ0hBTkdFIFRPOlxuXHRcdFx0Ly8gaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIHBvc3RkYXRhLnJvb3RfdXJsICk7XHQgICAgICAgIFxuXHRcdFx0Ly8gaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCApO1xuXG5cdFx0fSk7XG5cblxuXG5cblxuXG5cblx0XHQvKiBUT0RPIC0gQlJPV1NFUlMgQkFDSyBCVVRUT04gKi9cblx0XHQvLyBpZiAoJChob21lcGFnZSkubGVuZ3RoID4gMCkge1xuXG5cdFx0Ly8gXHRyZWFkQWRkcmVzc0JhcihyZXF1ZXN0LCBwYWdlX3N0YXRlKTtcblx0XHQvLyBcdC8vIGFkZHMgdGhlIHBvcHN0YXRlIGV2ZW50IGhhbmRsZXIgXG5cdFx0Ly8gXHQvLyBuZWVkcyByZXZpc2lvblxuXG5cdFx0Ly8gfVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblx0XHQvKiBUT0RPIC0gSE9WRVIgKi9cblx0XHQvLyBpZiBubyB0b3VjaCB3ZSBjYW4gYW50aWNpcGF0ZSBhIGNsaWNrIGFuZCBmaXJlIGFqYXhDYWxsIG9uIG1vdXNlb3ZlciBvZiBtZW51IGxpbmtzXG5cdFx0Ly8gaWYgKCFNb2Rlcm5penIudG91Y2hldmVudHMpIHtcblxuXHRcdC8vIFx0JCgnI2FwcCcpLm9uKCdtb3VzZW92ZXInLCAnYScsIGZ1bmN0aW9uKCkge1xuXG5cdFx0Ly8gXHRcdHJlcXVlc3QgPSB7fTtcblx0XHQvLyBcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0Ly8gXHRcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHQvLyBcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdC8vIFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHQvLyBcdFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1x0XHRcdFx0XG5cdFx0Ly8gXHRcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHQvLyBcdFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFxuXG5cdFx0Ly8gXHRcdGlmICggIWlzTG9hZGVkKHJlcXVlc3QuaWQsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSApIHtcblx0XHQvLyBcdFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblx0XHQvLyBcdFx0fVxuXG5cdFx0Ly8gXHR9KTtcblx0XHQvLyB9XG5cblxuXG5cblx0XHQvKiBGSVJTVCBBVFRFTVBUIC0gQ0xJQ0sgKi9cblxuXHRcdC8vICQoJyNhcHAnKS5vbignY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHQvLyBcdGFsZXJ0KFwid3RmXCIpO1xuXG5cdFx0Ly8gXHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1x0XHRcblxuXHRcdC8vIFx0cmVxdWVzdCA9IHt9O1x0XHRcdFx0XG5cdFx0Ly8gXHQvLyBnZXQgdGhlIGhyZWZcblx0XHQvLyBcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0Ly8gXHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0Ly8gXHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0Ly8gXHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHQvLyBcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFxuXHRcdC8vIFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdC8vIFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFx0XG5cdFx0XHRcdFx0XG5cdFx0Ly8gXHQvLyBpcyBpdCBhbHJlYWR5IGxvYWRlZCBpbnRvIERPTT8gQ2hlY2sgdGhlIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzIGFycmF5XG5cdFx0Ly8gXHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0Ly8gXHRcdGFqYXhDYWxsKHJlcXVlc3QpO1xuXHRcdC8vIFx0fVxuXHRcdFxuXHRcdC8vIFx0aWYgKE1vZGVybml6ci5oaXN0b3J5KSB7XG5cdFx0Ly8gXHQgXHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCByZXF1ZXN0LmhyZWYpO1xuXHRcdC8vIFx0fVxuXG5cdFx0Ly8gfSk7XG5cblxuXG5cdFx0XG5cblxuXHRcdFxuXG5cblx0fSk7XG5cblxufSkoalF1ZXJ5KTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhcHRpb25zKCkge1xuXG4gIC8qIVxuICAgKiBjYXB0aW9ucy5qc1xuICAgKlxuICAgKiBhdXRob3I6IEVmZmVja3QuY3NzXG4gICAqXG4gICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICAgKi9cblxuICB2YXIgZWZmZWNrdENhcHRpb25zID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmJpbmRVSUFjdGlvbnMoKTtcbiAgICB9LFxuXG4gICAgYmluZFVJQWN0aW9uczogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7IC8va2VlcCBhIHJlZmVyZW5jZSB0byB0aGlzIChDYXB0aW9ucykgb2JqZWN0LlxuXG4gICAgICAkKCdbZGF0YS1lZmZlY2t0LXR5cGVdJykub24oRWZmZWNrdC5idXR0b25QcmVzc2VkRXZlbnQsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHNlbGYuYWN0aXZhdGVDYXB0aW9ucyh0aGlzKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBhY3RpdmF0ZUNhcHRpb25zOiBmdW5jdGlvbihlbCkge1xuICAgICAgdmFyIGFjdGl2ZUNsYXNzID0gJ2FjdGl2ZSc7XG5cbiAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC50b2dnbGUoYWN0aXZlQ2xhc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyICRjYXB0aW9uID0gJChlbCk7XG4gICAgICAgICRjYXB0aW9uLnRvZ2dsZUNsYXNzKGFjdGl2ZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgZWZmZWNrdENhcHRpb25zLmluaXQoKTtcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvcmUoKSB7XG5cbjsoZnVuY3Rpb24od2luZG93KXtcblxuICB2YXJcbiAgICAvLyBJcyBNb2Rlcm5penIgZGVmaW5lZCBvbiB0aGUgZ2xvYmFsIHNjb3BlXG4gICAgTW9kZXJuaXpyID0gdHlwZW9mIE1vZGVybml6ciAhPT0gXCJ1bmRlZmluZWRcIiA/IE1vZGVybml6ciA6IGZhbHNlLFxuXG4gICAgLy8gQWx3YXlzIGV4cGVjdCBib3RoIGtpbmRzIG9mIGV2ZW50XG4gICAgYnV0dG9uUHJlc3NlZEV2ZW50ID0gJ3RvdWNoc3RhcnQgY2xpY2snLFxuXG4gICAgLy8gTGlzdCBvZiBhbGwgYW5pbWF0aW9uL3RyYW5zaXRpb24gcHJvcGVydGllc1xuICAgIC8vIHdpdGggaXRzIGFuaW1hdGlvbkVuZC90cmFuc2l0aW9uRW5kIGV2ZW50XG4gICAgYW5pbWF0aW9uRW5kRXZlbnROYW1lcyA9IHtcbiAgICAgICdXZWJraXRBbmltYXRpb24nIDogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG4gICAgICAnT0FuaW1hdGlvbicgOiAnb0FuaW1hdGlvbkVuZCcsXG4gICAgICAnbXNBbmltYXRpb24nIDogJ01TQW5pbWF0aW9uRW5kJyxcbiAgICAgICdhbmltYXRpb24nIDogJ2FuaW1hdGlvbmVuZCdcbiAgICB9LFxuXG4gICAgdHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAnV2Via2l0VHJhbnNpdGlvbicgOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gICAgICAnT1RyYW5zaXRpb24nIDogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAgICdtc1RyYW5zaXRpb24nIDogJ01TVHJhbnNpdGlvbkVuZCcsXG4gICAgICAndHJhbnNpdGlvbicgOiAndHJhbnNpdGlvbmVuZCdcbiAgICB9LFxuXG4gICAgRWZmZWNrdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5pbml0KCk7XG4gICAgfTtcblxuICAvLyBDdXJyZW50IHZlcnNpb24uXG4gIEVmZmVja3QudmVyc2lvbiA9ICcwLjAuMSc7XG5cbiAgLy8gSW5pdGlhbGl6YXRpb24gbWV0aG9kXG4gIEVmZmVja3QucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmJ1dHRvblByZXNzZWRFdmVudCA9IGJ1dHRvblByZXNzZWRFdmVudDtcblxuICAgIC8vZXZlbnQgdHJpZ2dlciBhZnRlciBhbmltYXRpb24vdHJhbnNpdGlvbiBlbmQuXG4gICAgdGhpcy50cmFuc2l0aW9uRW5kRXZlbnROYW1lID0gTW9kZXJuaXpyID8gdHJhbnNpdGlvbkVuZEV2ZW50TmFtZXNbTW9kZXJuaXpyLnByZWZpeGVkKCd0cmFuc2l0aW9uJyldIDogZ2V0VHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMoKTtcbiAgICB0aGlzLmFuaW1hdGlvbkVuZEV2ZW50TmFtZSAgPSBNb2Rlcm5penIgPyBhbmltYXRpb25FbmRFdmVudE5hbWVzW01vZGVybml6ci5wcmVmaXhlZCgnYW5pbWF0aW9uJyldIDogZ2V0QW5pbWF0aW9uRW5kRXZlbnROYW1lcygpO1xuICAgIHRoaXMudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50ID0gdGhpcy5hbmltYXRpb25FbmRFdmVudE5hbWUgKyAnICcgKyB0aGlzLnRyYW5zaXRpb25FbmRFdmVudE5hbWU7XG4gIH07XG5cbiAgRWZmZWNrdC5wcm90b3R5cGUuZ2V0Vmlld3BvcnRIZWlnaHQgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBkb2NFbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgICAgY2xpZW50ID0gZG9jRWxlbWVudFsnY2xpZW50SGVpZ2h0J10sXG4gICAgICBpbm5lciA9IHdpbmRvd1snaW5uZXJIZWlnaHQnXTtcblxuICAgIGlmKCBjbGllbnQgPCBpbm5lciApXG4gICAgICByZXR1cm4gaW5uZXI7XG4gICAgZWxzZVxuICAgICAgcmV0dXJuIGNsaWVudDtcbiAgfTtcblxuICAvLyBHZXQgYWxsIHRoZSBwcm9wZXJ0aWVzIGZvciB0cmFuc2l0aW9uL2FuaW1hdGlvbiBlbmRcbiAgZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMoKSB7XG4gICAgcmV0dXJuIF9nZXRFbmRFdmVudE5hbWVzKCB0cmFuc2l0aW9uRW5kRXZlbnROYW1lcyApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QW5pbWF0aW9uRW5kRXZlbnROYW1lcygpIHtcbiAgICByZXR1cm4gX2dldEVuZEV2ZW50TmFtZXMoIGFuaW1hdGlvbkVuZEV2ZW50TmFtZXMgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9nZXRFbmRFdmVudE5hbWVzKG9iaikge1xuICAgIHZhciBldmVudHMgPSBbXTtcblxuICAgIGZvciAoIHZhciBldmVudE5hbWUgaW4gb2JqICkge1xuICAgICAgZXZlbnRzLnB1c2goIG9ialsgZXZlbnROYW1lIF0gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXZlbnRzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8vIENyZWF0ZXMgYSBFZmZlY2t0IG9iamVjdC5cbiAgd2luZG93LkVmZmVja3QgPSBuZXcgRWZmZWNrdCgpO1xuXG59KSh0aGlzKTtcblxuXHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWdlVHJhbnNpdGlvbnMoKSB7XG5cbnZhciBFZmZlY2t0UGFnZVRyYW5zaXRpb25zID0ge1xuXG4gIGZyb21QYWdlOiAnJyxcbiAgdG9QYWdlOiAnJyxcbiAgaXNBbmltYXRpbmc6IGZhbHNlLFxuICBpc05leHRQYWdlRW5kOiBmYWxzZSxcbiAgaXNDdXJyZW50UGFnZUVuZDogZmFsc2UsXG4gIHRyYW5zaXRpb25JbkVmZmVjdDogJycsXG4gIHRyYW5zaXRpb25PdXRFZmZlY3Q6ICcnLFxuXG4gIGluaXQ6IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5pbml0UGFnZXMoKTtcbiAgICB0aGlzLmJpbmRVSUFjdGlvbnMoKTtcblxuICB9LFxuXG4gIGluaXRQYWdlczogZnVuY3Rpb24oKXtcblxuICAgIHZhciAkcGFnZXMgPSAkKCdbZGF0YS1lZmZlY2t0LXBhZ2VdJyk7XG5cbiAgICB0aGlzLmZyb21QYWdlID0gJHBhZ2VzLmZpcnN0KCkuYWRkQ2xhc3MoJ2VmZmVja3QtcGFnZS1hY3RpdmUnKTtcblxuICB9LFxuXG4gIGJpbmRVSUFjdGlvbnM6IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgJCgnLmVmZmVja3QtcGFnZS10cmFuc2l0aW9uLWJ1dHRvbicpLm9uKCBFZmZlY2t0LmJ1dHRvblByZXNzZWRFdmVudCwgZnVuY3Rpb24oZSl7XG5cbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgdmFyIHRyYW5zaXRpb25JbkVmZmVjdCAgPSAkKHRoaXMpLmRhdGEoJ2VmZmVja3QtdHJhbnNpdGlvbi1pbicpLFxuICAgICAgICAgIHRyYW5zaXRpb25PdXRFZmZlY3QgPSAkKHRoaXMpLmRhdGEoJ2VmZmVja3QtdHJhbnNpdGlvbi1vdXQnKSxcbiAgICAgICAgICB0cmFuc2l0aW9uUGFnZSAgICAgID0gJCh0aGlzKS5kYXRhKCdlZmZlY2t0LXRyYW5zaXRpb24tcGFnZScpO1xuXG4gICAgICBpZiAoICQodGhpcykuZGF0YShcImVmZmVja3QtbmVlZHMtcGVyc3BlY3RpdmVcIikpIHtcbiAgICAgICAgJChcImh0bWxcIikuYWRkQ2xhc3MoXCJtZC1wZXJzcGVjdGl2ZVwiKTtcbiAgICAgIH1cblxuICAgICAgc2VsZi50cmFuc2l0aW9uUGFnZSggdHJhbnNpdGlvblBhZ2UsIHRyYW5zaXRpb25JbkVmZmVjdCwgdHJhbnNpdGlvbk91dEVmZmVjdCApO1xuXG4gICAgfSk7XG4gIH0sXG5cbiAgdHJhbnNpdGlvblBhZ2U6IGZ1bmN0aW9uKCB0cmFuc2l0aW9uUGFnZSwgdHJhbnNpdGlvbkluRWZmZWN0LCB0cmFuc2l0aW9uT3V0RWZmZWN0ICkge1xuXG4gICAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB9XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmlzQ3VycmVudFBhZ2VFbmQgPSBmYWxzZTtcbiAgICB0aGlzLmlzTmV4dFBhZ2VFbmQgPSBmYWxzZTtcbiAgICB0aGlzLnRyYW5zaXRpb25JbkVmZmVjdCA9IHRyYW5zaXRpb25JbkVmZmVjdDtcbiAgICB0aGlzLnRyYW5zaXRpb25PdXRFZmZlY3Q9IHRyYW5zaXRpb25PdXRFZmZlY3Q7XG5cbiAgICAvLyBHZXQgUGFnZXNcbiAgICB0aGlzLmZyb21QYWdlID0gJCgnW2RhdGEtZWZmZWNrdC1wYWdlXS5lZmZlY2t0LXBhZ2UtYWN0aXZlJyk7XG4gICAgdGhpcy50b1BhZ2UgICA9ICQoJ1tkYXRhLWVmZmVja3QtcGFnZT1cIicgKyB0cmFuc2l0aW9uUGFnZSArICdcIl0nKTtcblxuICAgIC8vIEFkZCB0aGlzIGNsYXNzIHRvIHByZXZlbnQgc2Nyb2xsIHRvIGJlIGRpc3BsYXllZFxuICAgIHRoaXMudG9QYWdlLmFkZENsYXNzKCdlZmZlY2t0LXBhZ2UtYW5pbWF0aW5nIGVmZmVja3QtcGFnZS1hY3RpdmUgJyArIHRoaXMudHJhbnNpdGlvbkluRWZmZWN0KTtcbiAgICB0aGlzLmZyb21QYWdlLmFkZENsYXNzKCdlZmZlY2t0LXBhZ2UtYW5pbWF0aW5nJyk7XG5cbiAgICAvLyBTZXQgVHJhbnNpdGlvbiBDbGFzc1xuICAgIHRoaXMuZnJvbVBhZ2UuYWRkQ2xhc3ModGhpcy50cmFuc2l0aW9uT3V0RWZmZWN0KTtcbiAgICBcbiAgICB2YXIgc2VsZj0gdGhpcztcbiAgICBcbiAgICB0aGlzLnRvUGFnZS5vbiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgXG4gICAgICBzZWxmLnRvUGFnZS5vZmYoIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50ICk7XG4gICAgICBzZWxmLmlzTmV4dFBhZ2VFbmQgPSB0cnVlO1xuXG4gICAgICBpZiAoIHNlbGYuaXNDdXJyZW50UGFnZUVuZCApIHtcbiAgICAgICAgc2VsZi5yZXNldFRyYW5zaXRpb24oKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZnJvbVBhZ2Uub24oIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIHNlbGYuZnJvbVBhZ2Uub2ZmKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCApO1xuICAgICAgc2VsZi5pc0N1cnJlbnRQYWdlRW5kID0gdHJ1ZTtcblxuICAgICAgaWYgKCBzZWxmLmlzTmV4dFBhZ2VFbmQgKSB7XG4gICAgICAgIHNlbGYucmVzZXRUcmFuc2l0aW9uKCk7XG4gICAgICB9XG5cbiAgICB9KTtcblxuICB9LFxuXG4gIHJlc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5pc0N1cnJlbnRQYWdlRW5kID0gZmFsc2U7XG4gICAgdGhpcy5pc05leHRQYWdlRW5kID0gZmFsc2U7XG5cbiAgICB0aGlzLmZyb21QYWdlLnJlbW92ZUNsYXNzKCdlZmZlY2t0LXBhZ2UtYW5pbWF0aW5nIGVmZmVja3QtcGFnZS1hY3RpdmUgJyArIHRoaXMudHJhbnNpdGlvbk91dEVmZmVjdCk7Ly8uaGlkZSgpO1xuICAgIHRoaXMudG9QYWdlLnJlbW92ZUNsYXNzKCdlZmZlY2t0LXBhZ2UtYW5pbWF0aW5nICcgKyB0aGlzLnRyYW5zaXRpb25JbkVmZmVjdCk7XG5cbiAgICAkKFwiaHRtbFwiKS5yZW1vdmVDbGFzcyhcIm1kLXBlcnNwZWN0aXZlXCIpO1xuICB9XG5cbn07XG5cbkVmZmVja3RQYWdlVHJhbnNpdGlvbnMuaW5pdCgpO1x0XG5cdFxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcbnZhciBidWlsZFRlbXBsYXRlID0gcmVxdWlyZSgnLi9idWlsZFRlbXBsYXRlJyk7XG52YXIgcmVuZGVyVGVtcGxhdGVzID0gcmVxdWlyZSgnLi9yZW5kZXJUZW1wbGF0ZXMnKTtcbnZhciBwYWdlU3RhdGVVcERhdGUgPSByZXF1aXJlKCcuL3BhZ2VTdGF0ZVVwRGF0ZScpO1xudmFyIGZpcmVUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9maXJlVHJhbnNpdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFqYXhDYWxsKHJlcXVlc3QpIHtcblxuXHQkLmFqYXgoe1xuXHQgICAgdXJsOiByZXF1ZXN0Lmpzb25fdXJsLFxuXHQgICAgZGF0YVR5cGU6ICdqc29uJ1xuXHR9KVxuXG5cdC5kb25lKGZ1bmN0aW9uKGRhdGEpe1x0XG5cblx0XHQvLyBjbGVhciBjdXJyZW50IGNvbnRlbnQgLSB0aGlzIGNvdWxkIGJlIHN0b3JlZFxuXHRcdGRvbUVscy5wYWdlX2NvbnRhaW5lci5lbXB0eSgpO1xuXG5cdFx0Ly8gdXBkYXRlIHBhZ2Vfc3RhdGUgb2JqZWN0XG5cdFx0cGFnZVN0YXRlVXBEYXRlKGRhdGEsIHBhZ2Vfc3RhdGUpO1x0XG5cblx0XHRyZW5kZXJUZW1wbGF0ZXMoZGF0YSk7XG5cblxuXHRcdFxuXHRcdC8vIHRlbXBsYXRlIHRoZSBkYXRhXG5cdFx0Ly8gdmFyIGNodW5rID0gYnVpbGRUZW1wbGF0ZShkYXRhKTtcblxuXHRcdC8vIC8vIGluc2VydCBpbnRvIHRoZSBET01cdFx0XG5cdFx0Ly8gZG9tRWxzLnBhZ2VfY29udGFpbmVyLmFwcGVuZChjaHVuayk7XG5cblx0XHQvLyBkZWxheSBmb3IgNTAwbXMgaW4gY2FzZSBvZiBmYXN0IGFqYXggIVxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyAkKCcjanNfbG9hZGluZycpLnJlbW92ZSgpO1xuICAgIFx0XHRmaXJlVHJhbnNpdGlvbigpO1xuXG5cdFx0fSwgNTAwKTtcblx0XHRcblx0XG5cdFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5naWZ5XG5cdFx0Ly8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYWdlX1wiICsgcmVxdWVzdC5pZCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdFxuXHRcdC8vIGlmIChNb2Rlcm5penIubG9jYWxzdG9yYWdlKSB7XG5cdFx0Ly8gXHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdcblx0XHQvLyBcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYWdlXycgKyByZXF1ZXN0LmlkLCBjaHVua1swXS5pbm5lckhUTUwpO1x0XHRcdFx0XG5cdFx0Ly8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdH0pXG5cblx0LmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coJ2Vycm9yJyk7XG5cdFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcblx0XHQvLyBhbGVydChcImVycm9yXCIpO1xuXHR9KVxuXG5cdC5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2NvbXBsZXRlIScpO1xuXHR9KTtcdFxuXG59OyIsInZhciB3cmFwTGV0dGVycyA9IHJlcXVpcmUoJy4vd3JhcExldHRlcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbmltYXRlSGVhZCgpIHtcblxuXHR2YXIgaGVhZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX2hlYWRpbmcnKTtcblxuXHRpZiAoJChoZWFkaW5nKS5sZW5ndGggPiAwKSB7XG5cdFx0d3JhcExldHRlcnMoaGVhZGluZyk7XG5cblx0XHR2YXIgbGV0dGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX2hlYWRpbmcnKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZXR0ZXInKTtcblxuXHRcdHZhciBuID0gMDtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbGV0dGVycy5sZW5ndGg7IGkrKykge1x0XHRcblx0XHRcdGxldHRlcnNbaV0uc3R5bGUudHJhbnNpdGlvbiA9ICdvcGFjaXR5ICcgKyBuICsgJ21zIGVhc2UnO1xuXHRcdFx0bis9IDIwMDtcblx0XHR9XG5cblx0fVxuXG5cdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdCQoaGVhZGluZykuYWRkQ2xhc3MoJ29uLWxvYWQnKTtcblx0fSwgMjAwKTtcblx0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaEFuaW1hdGlvbkV2ZW50KCkge1xuXHRcblx0dmFyIGtleTtcdFxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG5cblx0dmFyIGFuaW1hdGlvbnMgPSB7XG5cdFx0J1dlYmtpdEFuaW1hdGlvbicgOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcblx0XHQnT0FuaW1hdGlvbicgOiAnb0FuaW1hdGlvbkVuZCcsXG5cdFx0J21zQW5pbWF0aW9uJyA6ICdNU0FuaW1hdGlvbkVuZCcsXG5cdFx0J2FuaW1hdGlvbicgOiAnYW5pbWF0aW9uZW5kJ1xuXHR9O1xuXG4gICAgZm9yKGtleSBpbiBhbmltYXRpb25zKXtcbiAgICAgICAgaWYoIGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoVHJhbnNpdGlvbkV2ZW50KCkge1xuXG5cdHZhciBrZXk7XHRcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcblxuXHR2YXIgdHJhbnNpdGlvbnMgPSB7XG5cdFx0J3RyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcblx0XHQnT1RyYW5zaXRpb24nOidvVHJhbnNpdGlvbkVuZCcsXG5cdFx0J01velRyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcblx0XHQnV2Via2l0VHJhbnNpdGlvbic6J3dlYmtpdFRyYW5zaXRpb25FbmQnXG5cdH07XG5cblx0Zm9yKGtleSBpbiB0cmFuc2l0aW9ucyl7XG5cdFx0aWYoIGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCApe1xuXHRcdCAgICByZXR1cm4gdHJhbnNpdGlvbnNba2V5XTtcblx0XHR9XG5cdH1cdFxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5WaWV3KGNvbnRhaW5lciwgJGVsKSB7XG5cblx0Ly8gaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvc3BlZWQvYW5pbWF0aW9ucy8jZGVib3VuY2luZy1zY3JvbGwtZXZlbnRzXG5cblx0dmFyICRhbmltYXRpb25fZWxlbWVudHMgPSAkZWw7XG5cblx0dmFyIHBhZ2UgPSBjb250YWluZXI7XG5cblx0dmFyIGxhdGVzdEtub3duU2Nyb2xsWSA9IDAsXG5cdFx0dGlja2luZyA9IGZhbHNlLFxuXHRcdHBhZ2VIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCksXG5cdFx0dGhlT2Zmc2V0ID0gMDtcblxuXHRmdW5jdGlvbiBvblNjcm9sbCgpIHtcblx0XHRsYXRlc3RLbm93blNjcm9sbFkgPSAkKGhvbWVwYWdlKS5zY3JvbGxUb3AoKTtcblx0XHRyZXF1ZXN0VGljaygpO1xuXHR9XG5cdGZ1bmN0aW9uIHJlcXVlc3RUaWNrKCkge1xuXHRcdGlmKCF0aWNraW5nKSB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcblx0XHR9XG5cdFx0dGlja2luZyA9IHRydWU7XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlKCkge1xuXHRcdC8vIHJlc2V0IHRoZSB0aWNrIHNvIHdlIGNhblxuXHRcdC8vIGNhcHR1cmUgdGhlIG5leHQgb25TY3JvbGxcblx0XHR0aWNraW5nID0gZmFsc2U7XG5cblx0XHR2YXIgY3VycmVudFNjcm9sbFkgPSBsYXRlc3RLbm93blNjcm9sbFk7XG5cblx0XHQvLyByZWFkIG9mZnNldCBvZiBET00gZWxlbWVudHNcblx0XHR0aGVPZmZzZXQgPSAkYW5pbWF0aW9uX2VsZW1lbnRzLm9mZnNldCgpO1xuXG5cdFx0Ly8gYW5kIGNvbXBhcmUgdG8gdGhlIGN1cnJlbnRTY3JvbGxZIHZhbHVlXG5cdFx0Ly8gdGhlbiBhcHBseSBzb21lIENTUyBjbGFzc2VzXG5cdFx0Ly8gdG8gdGhlIHZpc2libGUgaXRlbXNcblx0XHRpZiAodGhlT2Zmc2V0LnRvcCA8IHBhZ2VIZWlnaHQpIHtcblx0XHRcdCRhbmltYXRpb25fZWxlbWVudHMuYWRkQ2xhc3MoJ2luLXZpZXcnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGFuaW1hdGlvbl9lbGVtZW50cy5yZW1vdmVDbGFzcygnaW4tdmlldycpO1xuXHRcdH1cblxuXHRcdC8vIGNvbnNvbGUubG9nKHRoZU9mZnNldC50b3ApO1xuXHRcdC8vIGNvbnNvbGUubG9nKHBhZ2VIZWlnaHQpO1xuXG5cdH1cblxuXHRwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCBmYWxzZSk7XG5cdFxuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd3JhcExldHRlcnMoZWwpIHtcblx0cmV0dXJuIGVsLmlubmVySFRNTCA9IGVsLnRleHRDb250ZW50LnNwbGl0KFwiXCIpLm1hcChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0cmV0dXJuICc8c3BhbiBjbGFzcz1sZXR0ZXI+JyArIGxldHRlciArICc8L3NwYW4+Jztcblx0fSkuam9pbihcIlwiKTtcdFxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiYWNrVG9NZW51KCkge1xuXG5cdC8vIHVwZGF0ZSBwYWdlX3N0YXRlXG5cdHBhZ2Vfc3RhdGUuY3VycmVudF9wYWdlID0gXCJob21lcGFnZVwiO1xuXG5cdC8vIGhpZGUgdGhlIGJ1dHRvbiBcblx0JChkb21FbHMuYmFja190b19tZW51X2J0bilcblx0XHQucmVtb3ZlQ2xhc3MoJ29uJylcblx0XHRcdC5hZGRDbGFzcygnb2ZmJyk7XG5cblx0Ly8gc2Nyb2xsIHRoZSBzaW5nbGUgaXRlbSBwYWdlIGJhY2sgdG8gdG9wXG5cdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0JCgnI2pzX3BhZ2VfMicpLnNjcm9sbFRvcCggMCApO1xuXG5cdFx0JChkb21FbHMuYmFja190b19tZW51X2J0bilcblx0XHRcdC5yZW1vdmVDbGFzcygnb2ZmJyk7XG5cblx0fSwgNjAwKTtcblx0XHQgICAgICAgIFx0XHRcdFx0ICAgIFx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZShkYXRhKSB7XG5cblx0dmFyIGkgPSBcIlwiO1xuXHR2YXIga2V5O1xuXHR2YXIgdGl0bGUgPSBkYXRhLnRpdGxlLnJlbmRlcmVkO1xuXHR2YXIgY29udGVudCA9IGRhdGEuY29udGVudC5yZW5kZXJlZDtcblxuXHR2YXIgaW1hZ2VzID0gZGF0YS5hY2YuaW1hZ2VzO1xuXHR2YXIgaW1hZ2VJdGVtcyA9IFwiXCI7XG5cblx0aWYgKGltYWdlcy5sZW5ndGgpIHtcblxuXHRcdGZvciAoaSA9IDA7IGkgPD0gaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGZvciAoa2V5IGluIGltYWdlc1tpXSkge1xuXG5cdFx0XHRcdGlmIChpbWFnZXNbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdFx0aW1hZ2VJdGVtcyArPSBcdCc8bGk+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRpbWFnZXNbaV1ba2V5XS50aXRsZSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0JyA6ICcgK1xuXHRcdFx0XHRcdFx0XHRcdFx0JzxpbWcgc3JjPVwiJyArIFxuXHRcdFx0XHRcdFx0XHRcdFx0aW1hZ2VzW2ldW2tleV0uc2l6ZXMubGFyZ2UgKyBcblx0XHRcdFx0XHRcdFx0XHRcdCdcIiAvPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0JzwvbGk+JztcdFx0XHRcdFx0XG5cdFx0XHRcdH0gXG5cdFx0XHR9IFx0XHRcblx0XHR9XHRcdFx0XG5cdH0gXG5cblxuXG5cblxuXG5cdHZhciB0ZXN0aW1vbmlhbHMgPSBkYXRhLmFjZi50ZXN0aW1vbmlhbHM7XG5cdHZhciB0ZXN0aW1vbmlhbEl0ZW1zID0gXCJcIjtcblxuXHRpZiAodGVzdGltb25pYWxzLmxlbmd0aCkge1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8PSB0ZXN0aW1vbmlhbHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0Zm9yIChrZXkgaW4gdGVzdGltb25pYWxzW2ldKSB7XG5cdFx0XHRcdGlmICh0ZXN0aW1vbmlhbHNbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdFx0dGVzdGltb25pYWxJdGVtcyArPSBcdCc8bGk+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5ICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JyA6ICcgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2PicgKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0ZXN0aW1vbmlhbHNbaV1ba2V5XSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9saT4nO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBcblx0XHRcdH0gXHRcdFxuXHRcdH1cdFx0XHRcblx0fSBcblx0XG5cblxuXHR2YXIgd3JhcHBlciA9ICQoJzxkaXYvPicsIHtcblx0XHQnY2xhc3MnIDogJ3dyYXBwZXInLFx0XHRcblx0fSk7XG5cblx0JCgnPGgxLz4nLCB7XG5cdFx0J2NsYXNzJyA6ICd0aXRsZScsXG5cdFx0aHRtbDogdGl0bGVcblx0fSkuYXBwZW5kVG8od3JhcHBlcik7XHRcblxuXHQkKCc8ZGl2Lz4nLCB7XG5cdFx0J2NsYXNzJyA6ICdjb250ZW50Jyxcblx0XHRodG1sOiBjb250ZW50XG5cdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXG5cdGlmICh0ZXN0aW1vbmlhbHMubGVuZ3RoKSB7XG5cblx0XHQkKCc8dWwvPicsIHtcblx0XHRcdCdjbGFzcycgOiAndGVzdGltb25pYWxzLWxpc3QnLFxuXHRcdFx0aHRtbDogdGVzdGltb25pYWxJdGVtc1xuXHRcdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXHR9XG5cblxuXHRpZiAoaW1hZ2VzLmxlbmd0aCkge1xuXG5cdFx0JCgnPHVsLz4nLCB7XG5cdFx0XHQnY2xhc3MnIDogJ2ltYWdlLWxpc3QnLFxuXHRcdFx0aHRtbDogaW1hZ2VJdGVtc1xuXHRcdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXHR9XG5cblxuXG5cdHJldHVybiB3cmFwcGVyO1xuXHRcbn07IiwidmFyIGRvbUVscyA9IHtcblx0XCJhbmltYXRpb25fZWxlbWVudHNcIiA6ICQoJyNqc19hbmltYXRlX2hlYWQnKSxcblx0XCJwYWdlX2NvbnRhaW5lclwiIDogJCgnI2pzX3BhZ2Vfc2luZ2xlX2l0ZW0nKSxcblx0XCJiYWNrX3RvX21lbnVfYnRuXCIgOiAkKCcjanNfYmFja190b19tZW51JyksXG5cdFwic3Bpbm5lclwiIDogJCgnPGRpdiBpZD1cImpzX2xvYWRpbmdcIj48ZGl2IGNsYXNzPVwic3Bpbm5lclwiPjwvZGl2PjwvZGl2PicpXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZG9tRWxzOyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpcmVUcmFuc2l0aW9uKCkge1xuXG5cdCQoJy5lZmZlY2t0IC50aGUtYnRuJykudHJpZ2dlcignY2xpY2snKTtcblxuXHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcdFxuXHRcdFxuXHRcdGRvbUVscy5iYWNrX3RvX21lbnVfYnRuXG5cdFx0XHQuYWRkQ2xhc3MoJ29uJyk7XG5cblx0XHQkKCcjanNfbG9hZGluZycpLnJlbW92ZSgpO1xuXG5cdH0sIDEyMDApO1xuXG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluamVjdFNwaW5uZXIoKSB7XG5cdCQoJ2JvZHknKS5hcHBlbmQoZG9tRWxzLnNwaW5uZXIpO1x0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNMb2FkZWQoaWRlbnRpZmllciwgYXJyLCByZXF1ZXN0KSB7XG5cblx0dmFyIHJlcyA9IGZhbHNlO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XG5cdFx0Zm9yICh2YXIga2V5IGluIGFycltpXSkge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXJyW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRpZiAoYXJyW2ldW2tleV0gPT09IGlkZW50aWZpZXIpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgaWRlbnRpZmllciBpcyBmb3VuZCB1cGRhdGUgcmVxdWVzdC5pZFxuXHRcdFx0XHRcdC8vIHVzZWQgZm9yIHdoZW4gdGhlIGlkZW50aWZpZXIgaXMgbm90IHRoZSBpZCBudW1iZXIgKGVnIHNsdWcpXG5cdFx0XHRcdFx0cmVxdWVzdC5pZCA9IGFycltpXS5wYWdlX2lkO1xuXHRcdFx0XHRcdHJlcyA9IHRydWU7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVx0XHRcdFx0XG5cdH1cblx0XG5cdGNvbnNvbGUubG9nKFwiaXNMb2FkZWQgOiBcIiArIHJlcyk7XG5cblx0cmV0dXJuIHJlcztcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZ2VTdGF0ZVVwRGF0ZShkYXRhLCBwYWdlX3N0YXRlKSB7XG5cdFxuXHRwYWdlX3N0YXRlLmN1cnJlbnRfcGFnZSA9IGRhdGEuc2x1ZztcblxuXHRwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcy5wdXNoKHtcblx0XHRcInBhZ2VfaWRcIiA6IGRhdGEuaWQsXG5cdFx0XCJwYWdlX3NsdWdcIiA6IGRhdGEuc2x1Zyxcblx0XHRcInBhZ2VfdXJsXCIgOiBkYXRhLmxpbmssXG5cdFx0XCJqc29uX2xpbmtcIiA6IGRhdGEuX2xpbmtzLnNlbGZbMF0uaHJlZlx0XHRcdFxuXHR9KTtcblxuXHRyZXR1cm4gcGFnZV9zdGF0ZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZW5kZXJUZW1wbGF0ZXMoZGF0YSkge1xuXG5cdHZhciBzbHVnID0gZGF0YS5zbHVnO1xuXHR2YXIgaW1hZ2VVcmwgPSBkYXRhLmFjZi5oZWFkZXJfaW1hZ2UudXJsO1xuXG5cdGZ1bmN0aW9uIG9uQ29tcGxldGUoKSB7XG5cdFx0Ly8gJChcIi5oZXJvXCIpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIixcInVybChcIisgaW1hZ2VVcmwgK1wiKVwiKTtcblx0XHRcblx0XHQvLyBjb25zb2xlLmxvZyhpbWFnZVVybCk7XG5cdH1cblxuXHQkKFwiI2pzX3BhZ2Vfc2luZ2xlX2l0ZW1cIikucmVtb3ZlQ2xhc3MoKS5hZGRDbGFzcyhzbHVnKTtcblxuXHQkKFwiI2pzX3BhZ2Vfc2luZ2xlX2l0ZW1cIikubG9hZFRlbXBsYXRlKCQoXCIjaXRlbVRlbXBsYXRlXCIpLCB7XG5cblx0XHRcInRpdGxlXCIgOiBkYXRhLnRpdGxlLnJlbmRlcmVkLFxuXHRcdFwiaW50cm9cIiA6IGRhdGEuYWNmLmxvbmdfZGVzY3JpcHRpb24sXG5cdFx0XCJoZXJvSW1hZ2VcIiA6IGRhdGEuYWNmLmhlYWRlcl9pbWFnZS51cmwsXG5cdFx0XCJpbWFnZV8xXCIgOiBkYXRhLmFjZi5pbWFnZV8xLnVybCxcblx0XHRcImltYWdlXzJcIiA6IGRhdGEuYWNmLmltYWdlXzIudXJsLFxuXHRcdFwiYnRuVGV4dFwiIDogXCJWaXNpdCB0aGUgc2l0ZVwiLFxuXHRcdFwiYnRuTGlua1wiIDogZGF0YS5hY2Yuc2l0ZV91cmxcbiAgIFx0XHR9LCB7IGNvbXBsZXRlOiBvbkNvbXBsZXRlIH0pO1x0XG5cbn07Il19
