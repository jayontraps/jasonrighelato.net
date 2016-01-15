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
		domEls.back_to_menu_btn.on('touchstart click', function(event) {
			event.preventDefault();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvY2FwdGlvbnMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvRWZmZWNrdC9jb3JlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hBbmltYXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaFRyYW5zaXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2luVmlldy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2JhY2tUb01lbnUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYnVpbGRUZW1wbGF0ZS5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9kb21FbHMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvZmlyZVRyYW5zaXRpb24uanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaW5qZWN0U3Bpbm5lci5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9pc0xvYWRlZC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9wYWdlU3RhdGVVcERhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcmVuZGVyVGVtcGxhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDclRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogQ2FjaGUgcmVmZXJlbmNlIHRvIERPTSBlbGVtZW50cyAqL1xudmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9kb21FbHMnKTtcblxuXG4vKiBBbmltYXRpb25zICovXG52YXIgaW5WaWV3ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvaW5WaWV3Jyk7XG52YXIgd3JhcExldHRlcnMgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy93cmFwTGV0dGVycycpO1xudmFyIGFuaW1hdGVIZWFkaW5nID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcnKTtcbnZhciB3aGljaFRyYW5zaXRpb25FdmVudCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaFRyYW5zaXRpb25FdmVudCcpO1xudmFyIHdoaWNoQW5pbWF0aW9uRXZlbnQgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hBbmltYXRpb25FdmVudCcpO1xuXG4vKlxuZ2V0IGNhbGxiYWNrcyBmcm9tIGNzcyBhbmltYXRpb25zOiBodHRwczovL2Rhdmlkd2Fsc2gubmFtZS9jc3MtYW5pbWF0aW9uLWNhbGxiYWNrXG5cbnZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlbCcpOyAvLyBnZXQgc29tZSBlbGVtZW50XG5cdFxuLy8gc3RvcmUgdGhlIGFuaW1hdGlvbiAvIHRyYW5zaXRpb24gZW5kIGV2ZW50IC0gYWRkIHRvIGdsb2JhbCBvYmplY3Q/IFxudmFyIHRoZUV2ZW50ID0gd2hpY2hBbmltYXRpb25FdmVudCgpO1xuXG4vLyBhZGQgbGlzdG5lciBhbmQgY2FsbGJhY2tcbnRoZUV2ZW50ICYmIGVsLmFkZEV2ZW50TGlzdGVuZXIodGhlRXZlbnQsIGZ1bmN0aW9uKCkge1xuXHRjb25zb2xlLmxvZygnVHJhbnNpdGlvbiBjb21wbGV0ZSEgIFRoaXMgaXMgdGhlIGNhbGxiYWNrLCBubyBsaWJyYXJ5IG5lZWRlZCEnKTtcbn0pO1xuXG4qL1xuXG5cblxuXG5cblxuLyogdGVzdGluZyBhbmltYXRlLmpzIDogaHR0cHM6Ly9naXRodWIuY29tL2JlbmRjL2FuaW1hdGUgKi9cbi8vIHZhciB0ZXN0QW5pbWF0ZUpzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZV9qcy90ZXN0QW5pbWF0ZUpzJyk7XG4vLyB0ZXN0QW5pbWF0ZUpzKCk7XG5cblxuXG4vKiBFZmZlY2t0ICovXG52YXIgY29yZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy9FZmZlY2t0L2NvcmUnKTtcbnZhciBwYWdlVHJhbnNpdGlvbnMgPSByZXF1aXJlKCcuL21vZHVsZXMvRWZmZWNrdC9wYWdlVHJhbnNpdGlvbnMnKTtcbnZhciBjYXB0aW9ucyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9FZmZlY2t0L2NhcHRpb25zJyk7XG4vLyBpbml0IEVmZmVja3RcbmNvcmUoKTtcbnBhZ2VUcmFuc2l0aW9ucygpO1xuY2FwdGlvbnMoKTtcblxuXG5cbi8qIGxvYWRpbmcgd29yayBwYWdlcyAqL1xudmFyIGluamVjdFNwaW5uZXIgPSByZXF1aXJlKCcuL21vZHVsZXMvaW5qZWN0U3Bpbm5lcicpO1xudmFyIGFqYXhDYWxsID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FqYXhDYWxsJyk7XG4vLyB2YXIgcmVhZEFkZHJlc3NCYXIgPSByZXF1aXJlKCcuL21vZHVsZXMvcmVhZEFkZHJlc3NCYXInKTsgLy8gYXR0ZW1wdCBhdCBhIHJvdXRlclxuXG52YXIgaXNMb2FkZWQgPSByZXF1aXJlKCcuL21vZHVsZXMvaXNMb2FkZWQnKTsgXG4vLyB2YXIgdHJhbnNpdGlvblRvUGFnZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90cmFuc2l0aW9uVG9QYWdlJyk7XG4vLyB2YXIgdHJhbnNpdGlvbkJhY2tUb01lbnUgPSByZXF1aXJlKCcuL21vZHVsZXMvdHJhbnNpdGlvbkJhY2tUb01lbnUnKTtcbnZhciBmaXJlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vbW9kdWxlcy9maXJlVHJhbnNpdGlvbicpO1xudmFyIGJhY2tUb01lbnUgPSByZXF1aXJlKCcuL21vZHVsZXMvYmFja1RvTWVudScpO1xuXG5cblxuXG5cblxuLy8gR0xPQkFMIEZPUiBERVZcbnJlcXVlc3QgPSB7fTtcblxuLy8gR0xPQkFMIEZPUiBERVZcbnBhZ2Vfc3RhdGUgPSB7XG5cdFwiY3VycmVudF9wYWdlXCIgOiBcIlwiLFxuXHRcImxvYWRlZF9wYWdlc1wiIDogW10sXG5cdFwiZnJvbVBhZ2VcIiA6IFwiXCIsXG5cdFwidG9QYWdlXCIgOiBcIlwiXG59O1xuXG4vLyBFWEFNUExFU1xuXG4vLyBwb3N0ZGF0YSB7XG4vLyBcdGpzb25fdXJsIDoge1xuLy8gXHRcdDI4IDogIFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzI4XCIsXG4vLyBcdFx0MzA6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzMwXCJcbi8vIFx0fSxcbi8vIFx0cm9vdF91cmw6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0b1wiLFxuLy9cdHNsdWc6IHtcbi8vXHRcdFwiYWNlXCIgOiAyOCxcbi8vXHRcdFwiYm9jXCIgOiAzMFxuLy8gXHR9XG4vLyB9XG5cbi8vIHJlcXVlc3QgPSB7XG4vLyBcdFwiaHJlZlwiIDogXCJcIixcbi8vIFx0XCJpZFwiIDogMCxcbi8vIFx0XCJpZF9zdHJcIiA6IFwiXCIsXG4vLyBcdFwianNvbl91cmxcIiA6IFwiXCJcdFxuLy8gfTtcblxuXG4vLyBcImxvYWRlZF9wYWdlc1wiIDogW1xuLy8gXHR7XG4vLyBcdFx0anNvbl9saW5rOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy84XCJcbi8vIFx0XHRwYWdlX2lkOiA4XG4vLyBcdFx0cGFnZV9zbHVnOiBcImJpcmRzLW9mLWJlcmtzaGlyZS1hdGxhc1wiXG4vLyBcdFx0cGFnZV91cmw6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by9iaXJkcy1vZi1iZXJrc2hpcmUtYXRsYXMvXCJcdFx0XHRcbi8vIFx0fVxuLy8gXVxuXG5cbihmdW5jdGlvbigkKSB7XHRcblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuXHRcdC8qIFNFVCBVUCBBTklNQVRJT05TICovXG5cblx0XHR2YXIgdGhlVGl0bGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNfYW5pbWF0ZV90aXRsZScpO1xuXG5cdFx0aWYgKCQodGhlVGl0bGUpLmxlbmd0aCA+IDApIHtcblx0XHRcdHdyYXBMZXR0ZXJzKHRoZVRpdGxlKTtcblx0XHR9XG5cdFx0XG5cdFx0XG5cdFx0YW5pbWF0ZUhlYWRpbmcoKTtcblxuXHRcdFxuXG5cdFx0Ly8gdGVzdCBpblZpZXcuLlxuXHRcdHZhciBob21lcGFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob21lcGFnZScpO1xuXHRcdC8vIHZhciAkYW5pbWF0aW9uX2VsZW1lbnRzID0gJCgnI2pzX2FuaW1hdGVfaGVhZGluZycpO1x0XG5cblx0XHQvLyBpZiAoJChob21lcGFnZSkubGVuZ3RoID4gMCkge1xuXG5cdFx0Ly8gXHRpblZpZXcoaG9tZXBhZ2UsICRhbmltYXRpb25fZWxlbWVudHMpO1xuXG5cdFx0Ly8gXHR2YXIgeCA9ICQoJyN0ZXN0aW5nJyk7XG5cdFx0Ly8gXHRpblZpZXcoaG9tZXBhZ2UsIHgpO1xuXG5cdFx0Ly8gfVxuXG5cdFx0XG5cdFx0Ly8gU2Nyb2xsUmV2ZWFsIHBsdWdpblxuXG5cdFx0aWYgKCQoaG9tZXBhZ2UpLmxlbmd0aCA+IDApIHtcblx0XHRcdHdpbmRvdy5zciA9IFNjcm9sbFJldmVhbCgpXG5cdFx0XHRcdCAgLnJldmVhbCggJy5jb250ZW50LWNlbGwnLCB7IGNvbnRhaW5lcjogaG9tZXBhZ2UgfSApXG5cdFx0XHRcdCAgLnJldmVhbCggJy53b3JrX21lbnVfbGluaycsIHsgY29udGFpbmVyOiBob21lcGFnZSB9ICk7XG5cdFx0fVxuXG5cdFx0XG5cblx0XHRcblx0XHRcblx0XHQvLyB2YXIgaW50cm9FbHMgPSAkKCcuY29udGVudC1jZWxsJyk7XG5cblx0XHQvLyBpZiAoJChob21lcGFnZSkubGVuZ3RoID4gMCkge1xuXG5cdFx0Ly8gXHRpblZpZXcoaG9tZXBhZ2UsIGludHJvRWxzKTtcblxuXHRcdC8vIH1cblxuXHRcdFx0XHRcdFxuXHRcdCQoJy53b3JrX21lbnVfbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdC8vIHVwZGF0ZXMgcmVxdWVzdCBvYmplY3Rcblx0XHRcdHJlcXVlc3QgPSB7fTtcblx0XHRcdC8vIGdldCB0aGUgaHJlZlxuXHRcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHRcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHRcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1x0XHRcdFx0XG5cdFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0XHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XHRcdFxuXG5cdFx0XHRpbmplY3RTcGlubmVyKCk7XG5cblx0XHRcdC8vIGlmIGlzTG9hZGVkIGdyYWIgdGhlIGNodW5rIGZyb20gbG9jYWxTdG9yYWdlXG5cblxuXG5cdFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblxuXG5cdFx0XHQvLyBsb2NhbCB0ZXN0aW5nIFxuXHRcdFx0Ly8gZGVsYXkgZm9yIDUwMG1zIGluIGNhc2Ugb2YgZmFzdCBhamF4ICFcblx0XHRcdC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBcdCQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG5cdFx0XHQvLyBcdGZpcmVUcmFuc2l0aW9uKCk7XG5cblx0XHRcdC8vIH0sIDUwMCk7XHRcblxuXHRcdFx0XHRcdFxuXG5cblx0XHRcdC8vIGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdFx0Ly8gIFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHRcdC8vIH1cblx0XHR9KTtcblxuXG5cdFx0Ly8gLyogQkFDSyBUTyBNRU5VICovXG5cdFx0ZG9tRWxzLmJhY2tfdG9fbWVudV9idG4ub24oJ3RvdWNoc3RhcnQgY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdGJhY2tUb01lbnUoKTtcblxuXHRcdFx0Ly8gZm9yIGJyb3dzZXJzeW5jIG9ubHkgLSBDSEFOR0UgVE86XG5cdFx0XHQvLyBoaXN0b3J5LnB1c2hTdGF0ZSggbnVsbCwgbnVsbCwgcG9zdGRhdGEucm9vdF91cmwgKTtcdCAgICAgICAgXG5cdFx0XHQvLyBoaXN0b3J5LnB1c2hTdGF0ZSggbnVsbCwgbnVsbCwganJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsICk7XG5cblx0XHR9KTtcblxuXG5cblxuXG5cblxuXHRcdC8qIFRPRE8gLSBCUk9XU0VSUyBCQUNLIEJVVFRPTiAqL1xuXHRcdC8vIGlmICgkKGhvbWVwYWdlKS5sZW5ndGggPiAwKSB7XG5cblx0XHQvLyBcdHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpO1xuXHRcdC8vIFx0Ly8gYWRkcyB0aGUgcG9wc3RhdGUgZXZlbnQgaGFuZGxlciBcblx0XHQvLyBcdC8vIG5lZWRzIHJldmlzaW9uXG5cblx0XHQvLyB9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXHRcdC8qIFRPRE8gLSBIT1ZFUiAqL1xuXHRcdC8vIGlmIG5vIHRvdWNoIHdlIGNhbiBhbnRpY2lwYXRlIGEgY2xpY2sgYW5kIGZpcmUgYWpheENhbGwgb24gbW91c2VvdmVyIG9mIG1lbnUgbGlua3Ncblx0XHQvLyBpZiAoIU1vZGVybml6ci50b3VjaGV2ZW50cykge1xuXG5cdFx0Ly8gXHQkKCcjYXBwJykub24oJ21vdXNlb3ZlcicsICdhJywgZnVuY3Rpb24oKSB7XG5cblx0XHQvLyBcdFx0cmVxdWVzdCA9IHt9O1xuXHRcdC8vIFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHQvLyBcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHQvLyBcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdC8vIFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0Ly8gXHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdC8vIFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcdFx0XHRcblx0XHQvLyBcdFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdC8vIFx0XHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XG5cblx0XHQvLyBcdFx0aWYgKCAhaXNMb2FkZWQocmVxdWVzdC5pZCwgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMsIHJlcXVlc3QpICkge1xuXHRcdC8vIFx0XHRcdGFqYXhDYWxsKHJlcXVlc3QpO1xuXHRcdC8vIFx0XHR9XG5cblx0XHQvLyBcdH0pO1xuXHRcdC8vIH1cblxuXG5cblxuXHRcdC8qIEZJUlNUIEFUVEVNUFQgLSBDTElDSyAqL1xuXG5cdFx0Ly8gJCgnI2FwcCcpLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdC8vIFx0YWxlcnQoXCJ3dGZcIik7XG5cblx0XHQvLyBcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHRcdFxuXG5cdFx0Ly8gXHRyZXF1ZXN0ID0ge307XHRcdFx0XHRcblx0XHQvLyBcdC8vIGdldCB0aGUgaHJlZlxuXHRcdC8vIFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHQvLyBcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHQvLyBcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHQvLyBcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdC8vIFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1x0XG5cdFx0Ly8gXHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0Ly8gXHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XHRcblx0XHRcdFx0XHRcblx0XHQvLyBcdC8vIGlzIGl0IGFscmVhZHkgbG9hZGVkIGludG8gRE9NPyBDaGVjayB0aGUgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMgYXJyYXlcblx0XHQvLyBcdGlmICggIWlzTG9hZGVkKHJlcXVlc3QuaWQsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSApIHtcblx0XHQvLyBcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0Ly8gXHR9XG5cdFx0XG5cdFx0Ly8gXHRpZiAoTW9kZXJuaXpyLmhpc3RvcnkpIHtcblx0XHQvLyBcdCBcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHJlcXVlc3QuaHJlZik7XG5cdFx0Ly8gXHR9XG5cblx0XHQvLyB9KTtcblxuXG5cblx0XHRcblxuXG5cdFx0XG5cblxuXHR9KTtcblxuXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FwdGlvbnMoKSB7XG5cbiAgLyohXG4gICAqIGNhcHRpb25zLmpzXG4gICAqXG4gICAqIGF1dGhvcjogRWZmZWNrdC5jc3NcbiAgICpcbiAgICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gICAqL1xuXG4gIHZhciBlZmZlY2t0Q2FwdGlvbnMgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuYmluZFVJQWN0aW9ucygpO1xuICAgIH0sXG5cbiAgICBiaW5kVUlBY3Rpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpczsgLy9rZWVwIGEgcmVmZXJlbmNlIHRvIHRoaXMgKENhcHRpb25zKSBvYmplY3QuXG5cbiAgICAgICQoJ1tkYXRhLWVmZmVja3QtdHlwZV0nKS5vbihFZmZlY2t0LmJ1dHRvblByZXNzZWRFdmVudCwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgc2VsZi5hY3RpdmF0ZUNhcHRpb25zKHRoaXMpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIGFjdGl2YXRlQ2FwdGlvbnM6IGZ1bmN0aW9uKGVsKSB7XG4gICAgICB2YXIgYWN0aXZlQ2xhc3MgPSAnYWN0aXZlJztcblxuICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnRvZ2dsZShhY3RpdmVDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgJGNhcHRpb24gPSAkKGVsKTtcbiAgICAgICAgJGNhcHRpb24udG9nZ2xlQ2xhc3MoYWN0aXZlQ2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBlZmZlY2t0Q2FwdGlvbnMuaW5pdCgpO1xuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29yZSgpIHtcblxuOyhmdW5jdGlvbih3aW5kb3cpe1xuXG4gIHZhclxuICAgIC8vIElzIE1vZGVybml6ciBkZWZpbmVkIG9uIHRoZSBnbG9iYWwgc2NvcGVcbiAgICBNb2Rlcm5penIgPSB0eXBlb2YgTW9kZXJuaXpyICE9PSBcInVuZGVmaW5lZFwiID8gTW9kZXJuaXpyIDogZmFsc2UsXG5cbiAgICAvLyBBbHdheXMgZXhwZWN0IGJvdGgga2luZHMgb2YgZXZlbnRcbiAgICBidXR0b25QcmVzc2VkRXZlbnQgPSAndG91Y2hzdGFydCBjbGljaycsXG5cbiAgICAvLyBMaXN0IG9mIGFsbCBhbmltYXRpb24vdHJhbnNpdGlvbiBwcm9wZXJ0aWVzXG4gICAgLy8gd2l0aCBpdHMgYW5pbWF0aW9uRW5kL3RyYW5zaXRpb25FbmQgZXZlbnRcbiAgICBhbmltYXRpb25FbmRFdmVudE5hbWVzID0ge1xuICAgICAgJ1dlYmtpdEFuaW1hdGlvbicgOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICAgICdPQW5pbWF0aW9uJyA6ICdvQW5pbWF0aW9uRW5kJyxcbiAgICAgICdtc0FuaW1hdGlvbicgOiAnTVNBbmltYXRpb25FbmQnLFxuICAgICAgJ2FuaW1hdGlvbicgOiAnYW5pbWF0aW9uZW5kJ1xuICAgIH0sXG5cbiAgICB0cmFuc2l0aW9uRW5kRXZlbnROYW1lcyA9IHtcbiAgICAgICdXZWJraXRUcmFuc2l0aW9uJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICdPVHJhbnNpdGlvbicgOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICAgJ21zVHJhbnNpdGlvbicgOiAnTVNUcmFuc2l0aW9uRW5kJyxcbiAgICAgICd0cmFuc2l0aW9uJyA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH0sXG5cbiAgICBFZmZlY2t0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9O1xuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgRWZmZWNrdC52ZXJzaW9uID0gJzAuMC4xJztcblxuICAvLyBJbml0aWFsaXphdGlvbiBtZXRob2RcbiAgRWZmZWNrdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYnV0dG9uUHJlc3NlZEV2ZW50ID0gYnV0dG9uUHJlc3NlZEV2ZW50O1xuXG4gICAgLy9ldmVudCB0cmlnZ2VyIGFmdGVyIGFuaW1hdGlvbi90cmFuc2l0aW9uIGVuZC5cbiAgICB0aGlzLnRyYW5zaXRpb25FbmRFdmVudE5hbWUgPSBNb2Rlcm5penIgPyB0cmFuc2l0aW9uRW5kRXZlbnROYW1lc1tNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zaXRpb24nKV0gOiBnZXRUcmFuc2l0aW9uRW5kRXZlbnROYW1lcygpO1xuICAgIHRoaXMuYW5pbWF0aW9uRW5kRXZlbnROYW1lICA9IE1vZGVybml6ciA/IGFuaW1hdGlvbkVuZEV2ZW50TmFtZXNbTW9kZXJuaXpyLnByZWZpeGVkKCdhbmltYXRpb24nKV0gOiBnZXRBbmltYXRpb25FbmRFdmVudE5hbWVzKCk7XG4gICAgdGhpcy50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgPSB0aGlzLmFuaW1hdGlvbkVuZEV2ZW50TmFtZSArICcgJyArIHRoaXMudHJhbnNpdGlvbkVuZEV2ZW50TmFtZTtcbiAgfTtcblxuICBFZmZlY2t0LnByb3RvdHlwZS5nZXRWaWV3cG9ydEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICBjbGllbnQgPSBkb2NFbGVtZW50WydjbGllbnRIZWlnaHQnXSxcbiAgICAgIGlubmVyID0gd2luZG93Wydpbm5lckhlaWdodCddO1xuXG4gICAgaWYoIGNsaWVudCA8IGlubmVyIClcbiAgICAgIHJldHVybiBpbm5lcjtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gY2xpZW50O1xuICB9O1xuXG4gIC8vIEdldCBhbGwgdGhlIHByb3BlcnRpZXMgZm9yIHRyYW5zaXRpb24vYW5pbWF0aW9uIGVuZFxuICBmdW5jdGlvbiBnZXRUcmFuc2l0aW9uRW5kRXZlbnROYW1lcygpIHtcbiAgICByZXR1cm4gX2dldEVuZEV2ZW50TmFtZXMoIHRyYW5zaXRpb25FbmRFdmVudE5hbWVzICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbmltYXRpb25FbmRFdmVudE5hbWVzKCkge1xuICAgIHJldHVybiBfZ2V0RW5kRXZlbnROYW1lcyggYW5pbWF0aW9uRW5kRXZlbnROYW1lcyApO1xuICB9XG5cbiAgZnVuY3Rpb24gX2dldEVuZEV2ZW50TmFtZXMob2JqKSB7XG4gICAgdmFyIGV2ZW50cyA9IFtdO1xuXG4gICAgZm9yICggdmFyIGV2ZW50TmFtZSBpbiBvYmogKSB7XG4gICAgICBldmVudHMucHVzaCggb2JqWyBldmVudE5hbWUgXSApO1xuICAgIH1cblxuICAgIHJldHVybiBldmVudHMuam9pbignICcpO1xuICB9XG5cbiAgLy8gQ3JlYXRlcyBhIEVmZmVja3Qgb2JqZWN0LlxuICB3aW5kb3cuRWZmZWNrdCA9IG5ldyBFZmZlY2t0KCk7XG5cbn0pKHRoaXMpO1xuXG5cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZ2VUcmFuc2l0aW9ucygpIHtcblxudmFyIEVmZmVja3RQYWdlVHJhbnNpdGlvbnMgPSB7XG5cbiAgZnJvbVBhZ2U6ICcnLFxuICB0b1BhZ2U6ICcnLFxuICBpc0FuaW1hdGluZzogZmFsc2UsXG4gIGlzTmV4dFBhZ2VFbmQ6IGZhbHNlLFxuICBpc0N1cnJlbnRQYWdlRW5kOiBmYWxzZSxcbiAgdHJhbnNpdGlvbkluRWZmZWN0OiAnJyxcbiAgdHJhbnNpdGlvbk91dEVmZmVjdDogJycsXG5cbiAgaW5pdDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmluaXRQYWdlcygpO1xuICAgIHRoaXMuYmluZFVJQWN0aW9ucygpO1xuXG4gIH0sXG5cbiAgaW5pdFBhZ2VzOiBmdW5jdGlvbigpe1xuXG4gICAgdmFyICRwYWdlcyA9ICQoJ1tkYXRhLWVmZmVja3QtcGFnZV0nKTtcblxuICAgIHRoaXMuZnJvbVBhZ2UgPSAkcGFnZXMuZmlyc3QoKS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFjdGl2ZScpO1xuXG4gIH0sXG5cbiAgYmluZFVJQWN0aW9uczogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAkKCcuZWZmZWNrdC1wYWdlLXRyYW5zaXRpb24tYnV0dG9uJykub24oIEVmZmVja3QuYnV0dG9uUHJlc3NlZEV2ZW50LCBmdW5jdGlvbihlKXtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdHJhbnNpdGlvbkluRWZmZWN0ICA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLWluJyksXG4gICAgICAgICAgdHJhbnNpdGlvbk91dEVmZmVjdCA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLW91dCcpLFxuICAgICAgICAgIHRyYW5zaXRpb25QYWdlICAgICAgPSAkKHRoaXMpLmRhdGEoJ2VmZmVja3QtdHJhbnNpdGlvbi1wYWdlJyk7XG5cbiAgICAgIGlmICggJCh0aGlzKS5kYXRhKFwiZWZmZWNrdC1uZWVkcy1wZXJzcGVjdGl2ZVwiKSkge1xuICAgICAgICAkKFwiaHRtbFwiKS5hZGRDbGFzcyhcIm1kLXBlcnNwZWN0aXZlXCIpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnRyYW5zaXRpb25QYWdlKCB0cmFuc2l0aW9uUGFnZSwgdHJhbnNpdGlvbkluRWZmZWN0LCB0cmFuc2l0aW9uT3V0RWZmZWN0ICk7XG5cbiAgICB9KTtcbiAgfSxcblxuICB0cmFuc2l0aW9uUGFnZTogZnVuY3Rpb24oIHRyYW5zaXRpb25QYWdlLCB0cmFuc2l0aW9uSW5FZmZlY3QsIHRyYW5zaXRpb25PdXRFZmZlY3QgKSB7XG5cbiAgICBpZiAoIHRoaXMuaXNBbmltYXRpbmcgKSB7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuaXNDdXJyZW50UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNOZXh0UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMudHJhbnNpdGlvbkluRWZmZWN0ID0gdHJhbnNpdGlvbkluRWZmZWN0O1xuICAgIHRoaXMudHJhbnNpdGlvbk91dEVmZmVjdD0gdHJhbnNpdGlvbk91dEVmZmVjdDtcblxuICAgIC8vIEdldCBQYWdlc1xuICAgIHRoaXMuZnJvbVBhZ2UgPSAkKCdbZGF0YS1lZmZlY2t0LXBhZ2VdLmVmZmVja3QtcGFnZS1hY3RpdmUnKTtcbiAgICB0aGlzLnRvUGFnZSAgID0gJCgnW2RhdGEtZWZmZWNrdC1wYWdlPVwiJyArIHRyYW5zaXRpb25QYWdlICsgJ1wiXScpO1xuXG4gICAgLy8gQWRkIHRoaXMgY2xhc3MgdG8gcHJldmVudCBzY3JvbGwgdG8gYmUgZGlzcGxheWVkXG4gICAgdGhpcy50b1BhZ2UuYWRkQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgZWZmZWNrdC1wYWdlLWFjdGl2ZSAnICsgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QpO1xuICAgIHRoaXMuZnJvbVBhZ2UuYWRkQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcnKTtcblxuICAgIC8vIFNldCBUcmFuc2l0aW9uIENsYXNzXG4gICAgdGhpcy5mcm9tUGFnZS5hZGRDbGFzcyh0aGlzLnRyYW5zaXRpb25PdXRFZmZlY3QpO1xuICAgIFxuICAgIHZhciBzZWxmPSB0aGlzO1xuICAgIFxuICAgIHRoaXMudG9QYWdlLm9uKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICBcbiAgICAgIHNlbGYudG9QYWdlLm9mZiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgKTtcbiAgICAgIHNlbGYuaXNOZXh0UGFnZUVuZCA9IHRydWU7XG5cbiAgICAgIGlmICggc2VsZi5pc0N1cnJlbnRQYWdlRW5kICkge1xuICAgICAgICBzZWxmLnJlc2V0VHJhbnNpdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5mcm9tUGFnZS5vbiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgc2VsZi5mcm9tUGFnZS5vZmYoIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50ICk7XG4gICAgICBzZWxmLmlzQ3VycmVudFBhZ2VFbmQgPSB0cnVlO1xuXG4gICAgICBpZiAoIHNlbGYuaXNOZXh0UGFnZUVuZCApIHtcbiAgICAgICAgc2VsZi5yZXNldFRyYW5zaXRpb24oKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH0sXG5cbiAgcmVzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ3VycmVudFBhZ2VFbmQgPSBmYWxzZTtcbiAgICB0aGlzLmlzTmV4dFBhZ2VFbmQgPSBmYWxzZTtcblxuICAgIHRoaXMuZnJvbVBhZ2UucmVtb3ZlQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgZWZmZWNrdC1wYWdlLWFjdGl2ZSAnICsgdGhpcy50cmFuc2l0aW9uT3V0RWZmZWN0KTsvLy5oaWRlKCk7XG4gICAgdGhpcy50b1BhZ2UucmVtb3ZlQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgJyArIHRoaXMudHJhbnNpdGlvbkluRWZmZWN0KTtcblxuICAgICQoXCJodG1sXCIpLnJlbW92ZUNsYXNzKFwibWQtcGVyc3BlY3RpdmVcIik7XG4gIH1cblxufTtcblxuRWZmZWNrdFBhZ2VUcmFuc2l0aW9ucy5pbml0KCk7XHRcblx0XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xudmFyIGJ1aWxkVGVtcGxhdGUgPSByZXF1aXJlKCcuL2J1aWxkVGVtcGxhdGUnKTtcbnZhciByZW5kZXJUZW1wbGF0ZXMgPSByZXF1aXJlKCcuL3JlbmRlclRlbXBsYXRlcycpO1xudmFyIHBhZ2VTdGF0ZVVwRGF0ZSA9IHJlcXVpcmUoJy4vcGFnZVN0YXRlVXBEYXRlJyk7XG52YXIgZmlyZVRyYW5zaXRpb24gPSByZXF1aXJlKCcuL2ZpcmVUcmFuc2l0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYWpheENhbGwocmVxdWVzdCkge1xuXG5cdCQuYWpheCh7XG5cdCAgICB1cmw6IHJlcXVlc3QuanNvbl91cmwsXG5cdCAgICBkYXRhVHlwZTogJ2pzb24nXG5cdH0pXG5cblx0LmRvbmUoZnVuY3Rpb24oZGF0YSl7XHRcblxuXHRcdC8vIGNsZWFyIGN1cnJlbnQgY29udGVudCAtIHRoaXMgY291bGQgYmUgc3RvcmVkXG5cdFx0ZG9tRWxzLnBhZ2VfY29udGFpbmVyLmVtcHR5KCk7XG5cblx0XHQvLyB1cGRhdGUgcGFnZV9zdGF0ZSBvYmplY3Rcblx0XHRwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSk7XHRcblxuXHRcdHJlbmRlclRlbXBsYXRlcyhkYXRhKTtcblxuXG5cdFx0XG5cdFx0Ly8gdGVtcGxhdGUgdGhlIGRhdGFcblx0XHQvLyB2YXIgY2h1bmsgPSBidWlsZFRlbXBsYXRlKGRhdGEpO1xuXG5cdFx0Ly8gLy8gaW5zZXJ0IGludG8gdGhlIERPTVx0XHRcblx0XHQvLyBkb21FbHMucGFnZV9jb250YWluZXIuYXBwZW5kKGNodW5rKTtcblxuXHRcdC8vIGRlbGF5IGZvciA1MDBtcyBpbiBjYXNlIG9mIGZhc3QgYWpheCAhXG5cdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHRcdC8vICQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG4gICAgXHRcdGZpcmVUcmFuc2l0aW9uKCk7XG5cblx0XHR9LCA1MDApO1xuXHRcdFxuXHRcblx0XHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdpZnlcblx0XHQvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInBhZ2VfXCIgKyByZXF1ZXN0LmlkLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0XG5cdFx0Ly8gaWYgKE1vZGVybml6ci5sb2NhbHN0b3JhZ2UpIHtcblx0XHQvLyBcdC8vIHB1dCB0aGUgdGVtcGF0ZSBpbiBsb2NhbCBzdG9yYWdlIGFzIHN0cmluZ1xuXHRcdC8vIFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BhZ2VfJyArIHJlcXVlc3QuaWQsIGNodW5rWzBdLmlubmVySFRNTCk7XHRcdFx0XHRcblx0XHQvLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0fSlcblxuXHQuZmFpbChmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnZXJyb3InKTtcblx0XHQkKCcjanNfbG9hZGluZycpLnJlbW92ZSgpO1xuXHRcdC8vIGFsZXJ0KFwiZXJyb3JcIik7XG5cdH0pXG5cblx0LmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHQvLyBjb25zb2xlLmxvZygnY29tcGxldGUhJyk7XG5cdH0pO1x0XG5cbn07IiwidmFyIHdyYXBMZXR0ZXJzID0gcmVxdWlyZSgnLi93cmFwTGV0dGVycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFuaW1hdGVIZWFkKCkge1xuXG5cdHZhciBoZWFkaW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX2FuaW1hdGVfaGVhZGluZycpO1xuXG5cdGlmICgkKGhlYWRpbmcpLmxlbmd0aCA+IDApIHtcblx0XHR3cmFwTGV0dGVycyhoZWFkaW5nKTtcblxuXHRcdHZhciBsZXR0ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX2FuaW1hdGVfaGVhZGluZycpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2xldHRlcicpO1xuXG5cdFx0dmFyIG4gPSAwO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZXR0ZXJzLmxlbmd0aDsgaSsrKSB7XHRcdFxuXHRcdFx0bGV0dGVyc1tpXS5zdHlsZS50cmFuc2l0aW9uID0gJ29wYWNpdHkgJyArIG4gKyAnbXMgZWFzZSc7XG5cdFx0XHRuKz0gMjAwO1xuXHRcdH1cblxuXHR9XG5cblx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0JChoZWFkaW5nKS5hZGRDbGFzcygnb24tbG9hZCcpO1xuXHR9LCAyMDApO1xuXHRcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoQW5pbWF0aW9uRXZlbnQoKSB7XG5cdFxuXHR2YXIga2V5O1x0XG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcblxuXHR2YXIgYW5pbWF0aW9ucyA9IHtcblx0XHQnV2Via2l0QW5pbWF0aW9uJyA6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuXHRcdCdPQW5pbWF0aW9uJyA6ICdvQW5pbWF0aW9uRW5kJyxcblx0XHQnbXNBbmltYXRpb24nIDogJ01TQW5pbWF0aW9uRW5kJyxcblx0XHQnYW5pbWF0aW9uJyA6ICdhbmltYXRpb25lbmQnXG5cdH07XG5cbiAgICBmb3Ioa2V5IGluIGFuaW1hdGlvbnMpe1xuICAgICAgICBpZiggZWwuc3R5bGVba2V5XSAhPT0gdW5kZWZpbmVkICl7XG4gICAgICAgICAgICByZXR1cm4gYW5pbWF0aW9uc1trZXldO1xuICAgICAgICB9XG4gICAgfVx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKSB7XG5cblx0dmFyIGtleTtcdFxuXHR2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlZWxlbWVudCcpO1xuXG5cdHZhciB0cmFuc2l0aW9ucyA9IHtcblx0XHQndHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuXHRcdCdPVHJhbnNpdGlvbic6J29UcmFuc2l0aW9uRW5kJyxcblx0XHQnTW96VHJhbnNpdGlvbic6J3RyYW5zaXRpb25lbmQnLFxuXHRcdCdXZWJraXRUcmFuc2l0aW9uJzond2Via2l0VHJhbnNpdGlvbkVuZCdcblx0fTtcblxuXHRmb3Ioa2V5IGluIHRyYW5zaXRpb25zKXtcblx0XHRpZiggZWwuc3R5bGVba2V5XSAhPT0gdW5kZWZpbmVkICl7XG5cdFx0ICAgIHJldHVybiB0cmFuc2l0aW9uc1trZXldO1xuXHRcdH1cblx0fVx0XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuLi9kb21FbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpblZpZXcoY29udGFpbmVyLCAkZWwpIHtcblxuXHQvLyBodHRwOi8vd3d3Lmh0bWw1cm9ja3MuY29tL2VuL3R1dG9yaWFscy9zcGVlZC9hbmltYXRpb25zLyNkZWJvdW5jaW5nLXNjcm9sbC1ldmVudHNcblxuXHR2YXIgJGFuaW1hdGlvbl9lbGVtZW50cyA9ICRlbDtcblxuXHR2YXIgcGFnZSA9IGNvbnRhaW5lcjtcblxuXHR2YXIgbGF0ZXN0S25vd25TY3JvbGxZID0gMCxcblx0XHR0aWNraW5nID0gZmFsc2UsXG5cdFx0cGFnZUhlaWdodCA9ICQod2luZG93KS5oZWlnaHQoKSxcblx0XHR0aGVPZmZzZXQgPSAwO1xuXG5cdGZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuXHRcdGxhdGVzdEtub3duU2Nyb2xsWSA9ICQoaG9tZXBhZ2UpLnNjcm9sbFRvcCgpO1xuXHRcdHJlcXVlc3RUaWNrKCk7XG5cdH1cblx0ZnVuY3Rpb24gcmVxdWVzdFRpY2soKSB7XG5cdFx0aWYoIXRpY2tpbmcpIHtcblx0XHRcdHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xuXHRcdH1cblx0XHR0aWNraW5nID0gdHJ1ZTtcblx0fVxuXHRmdW5jdGlvbiB1cGRhdGUoKSB7XG5cdFx0Ly8gcmVzZXQgdGhlIHRpY2sgc28gd2UgY2FuXG5cdFx0Ly8gY2FwdHVyZSB0aGUgbmV4dCBvblNjcm9sbFxuXHRcdHRpY2tpbmcgPSBmYWxzZTtcblxuXHRcdHZhciBjdXJyZW50U2Nyb2xsWSA9IGxhdGVzdEtub3duU2Nyb2xsWTtcblxuXHRcdC8vIHJlYWQgb2Zmc2V0IG9mIERPTSBlbGVtZW50c1xuXHRcdHRoZU9mZnNldCA9ICRhbmltYXRpb25fZWxlbWVudHMub2Zmc2V0KCk7XG5cblx0XHQvLyBhbmQgY29tcGFyZSB0byB0aGUgY3VycmVudFNjcm9sbFkgdmFsdWVcblx0XHQvLyB0aGVuIGFwcGx5IHNvbWUgQ1NTIGNsYXNzZXNcblx0XHQvLyB0byB0aGUgdmlzaWJsZSBpdGVtc1xuXHRcdGlmICh0aGVPZmZzZXQudG9wIDwgcGFnZUhlaWdodCkge1xuXHRcdFx0JGFuaW1hdGlvbl9lbGVtZW50cy5hZGRDbGFzcygnaW4tdmlldycpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkYW5pbWF0aW9uX2VsZW1lbnRzLnJlbW92ZUNsYXNzKCdpbi12aWV3Jyk7XG5cdFx0fVxuXG5cdFx0Ly8gY29uc29sZS5sb2codGhlT2Zmc2V0LnRvcCk7XG5cdFx0Ly8gY29uc29sZS5sb2cocGFnZUhlaWdodCk7XG5cblx0fVxuXG5cdHBhZ2UuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgb25TY3JvbGwsIGZhbHNlKTtcblx0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3cmFwTGV0dGVycyhlbCkge1xuXHRyZXR1cm4gZWwuaW5uZXJIVE1MID0gZWwudGV4dENvbnRlbnQuc3BsaXQoXCJcIikubWFwKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRyZXR1cm4gJzxzcGFuIGNsYXNzPWxldHRlcj4nICsgbGV0dGVyICsgJzwvc3Bhbj4nO1xuXHR9KS5qb2luKFwiXCIpO1x0XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJhY2tUb01lbnUoKSB7XG5cblx0Ly8gdXBkYXRlIHBhZ2Vfc3RhdGVcblx0cGFnZV9zdGF0ZS5jdXJyZW50X3BhZ2UgPSBcImhvbWVwYWdlXCI7XG5cblx0Ly8gaGlkZSB0aGUgYnV0dG9uIFxuXHQkKGRvbUVscy5iYWNrX3RvX21lbnVfYnRuKVxuXHRcdC5yZW1vdmVDbGFzcygnb24nKVxuXHRcdFx0LmFkZENsYXNzKCdvZmYnKTtcblxuXHQvLyBzY3JvbGwgdGhlIHNpbmdsZSBpdGVtIHBhZ2UgYmFjayB0byB0b3Bcblx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHQkKCcjanNfcGFnZV8yJykuc2Nyb2xsVG9wKCAwICk7XG5cblx0XHQkKGRvbUVscy5iYWNrX3RvX21lbnVfYnRuKVxuXHRcdFx0LnJlbW92ZUNsYXNzKCdvZmYnKTtcblxuXHR9LCA2MDApO1xuXHRcdCAgICAgICAgXHRcdFx0XHQgICAgXHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFRlbXBsYXRlKGRhdGEpIHtcblxuXHR2YXIgaSA9IFwiXCI7XG5cdHZhciBrZXk7XG5cdHZhciB0aXRsZSA9IGRhdGEudGl0bGUucmVuZGVyZWQ7XG5cdHZhciBjb250ZW50ID0gZGF0YS5jb250ZW50LnJlbmRlcmVkO1xuXG5cdHZhciBpbWFnZXMgPSBkYXRhLmFjZi5pbWFnZXM7XG5cdHZhciBpbWFnZUl0ZW1zID0gXCJcIjtcblxuXHRpZiAoaW1hZ2VzLmxlbmd0aCkge1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8PSBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0Zm9yIChrZXkgaW4gaW1hZ2VzW2ldKSB7XG5cblx0XHRcdFx0aWYgKGltYWdlc1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0XHRpbWFnZUl0ZW1zICs9IFx0JzxsaT4nICtcblx0XHRcdFx0XHRcdFx0XHRcdGltYWdlc1tpXVtrZXldLnRpdGxlICsgXG5cdFx0XHRcdFx0XHRcdFx0XHQnIDogJyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPGltZyBzcmM9XCInICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRpbWFnZXNbaV1ba2V5XS5zaXplcy5sYXJnZSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0J1wiIC8+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPC9saT4nO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBcblx0XHRcdH0gXHRcdFxuXHRcdH1cdFx0XHRcblx0fSBcblxuXG5cblxuXG5cblx0dmFyIHRlc3RpbW9uaWFscyA9IGRhdGEuYWNmLnRlc3RpbW9uaWFscztcblx0dmFyIHRlc3RpbW9uaWFsSXRlbXMgPSBcIlwiO1xuXG5cdGlmICh0ZXN0aW1vbmlhbHMubGVuZ3RoKSB7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDw9IHRlc3RpbW9uaWFscy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRmb3IgKGtleSBpbiB0ZXN0aW1vbmlhbHNbaV0pIHtcblx0XHRcdFx0aWYgKHRlc3RpbW9uaWFsc1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0XHR0ZXN0aW1vbmlhbEl0ZW1zICs9IFx0JzxsaT4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRrZXkgKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnIDogJyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXY+JyArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRlc3RpbW9uaWFsc1tpXVtrZXldICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2xpPic7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IFxuXHRcdFx0fSBcdFx0XG5cdFx0fVx0XHRcdFxuXHR9IFxuXHRcblxuXG5cdHZhciB3cmFwcGVyID0gJCgnPGRpdi8+Jywge1xuXHRcdCdjbGFzcycgOiAnd3JhcHBlcicsXHRcdFxuXHR9KTtcblxuXHQkKCc8aDEvPicsIHtcblx0XHQnY2xhc3MnIDogJ3RpdGxlJyxcblx0XHRodG1sOiB0aXRsZVxuXHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcdFxuXG5cdCQoJzxkaXYvPicsIHtcblx0XHQnY2xhc3MnIDogJ2NvbnRlbnQnLFxuXHRcdGh0bWw6IGNvbnRlbnRcblx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cblx0aWYgKHRlc3RpbW9uaWFscy5sZW5ndGgpIHtcblxuXHRcdCQoJzx1bC8+Jywge1xuXHRcdFx0J2NsYXNzJyA6ICd0ZXN0aW1vbmlhbHMtbGlzdCcsXG5cdFx0XHRodG1sOiB0ZXN0aW1vbmlhbEl0ZW1zXG5cdFx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cdH1cblxuXG5cdGlmIChpbWFnZXMubGVuZ3RoKSB7XG5cblx0XHQkKCc8dWwvPicsIHtcblx0XHRcdCdjbGFzcycgOiAnaW1hZ2UtbGlzdCcsXG5cdFx0XHRodG1sOiBpbWFnZUl0ZW1zXG5cdFx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cdH1cblxuXG5cblx0cmV0dXJuIHdyYXBwZXI7XG5cdFxufTsiLCJ2YXIgZG9tRWxzID0ge1xuXHRcImFuaW1hdGlvbl9lbGVtZW50c1wiIDogJCgnI2pzX2FuaW1hdGVfaGVhZCcpLFxuXHRcInBhZ2VfY29udGFpbmVyXCIgOiAkKCcjanNfcGFnZV9zaW5nbGVfaXRlbScpLFxuXHRcImJhY2tfdG9fbWVudV9idG5cIiA6ICQoJyNqc19iYWNrX3RvX21lbnUnKSxcblx0XCJzcGlubmVyXCIgOiAkKCc8ZGl2IGlkPVwianNfbG9hZGluZ1wiPjxkaXYgY2xhc3M9XCJzcGlubmVyXCI+PC9kaXY+PC9kaXY+Jylcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkb21FbHM7IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmlyZVRyYW5zaXRpb24oKSB7XG5cblx0JCgnLmVmZmVja3QgLnRoZS1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xuXG5cdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1x0XG5cdFx0XG5cdFx0ZG9tRWxzLmJhY2tfdG9fbWVudV9idG5cblx0XHRcdC5hZGRDbGFzcygnb24nKTtcblxuXHRcdCQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG5cblx0fSwgMTIwMCk7XG5cbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5qZWN0U3Bpbm5lcigpIHtcblx0JCgnYm9keScpLmFwcGVuZChkb21FbHMuc3Bpbm5lcik7XHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0xvYWRlZChpZGVudGlmaWVyLCBhcnIsIHJlcXVlc3QpIHtcblxuXHR2YXIgcmVzID0gZmFsc2U7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcblx0XHRmb3IgKHZhciBrZXkgaW4gYXJyW2ldKSB7XG5cdFx0XHRcblx0XHRcdGlmIChhcnJbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdGlmIChhcnJbaV1ba2V5XSA9PT0gaWRlbnRpZmllcikge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBpZGVudGlmaWVyIGlzIGZvdW5kIHVwZGF0ZSByZXF1ZXN0LmlkXG5cdFx0XHRcdFx0Ly8gdXNlZCBmb3Igd2hlbiB0aGUgaWRlbnRpZmllciBpcyBub3QgdGhlIGlkIG51bWJlciAoZWcgc2x1Zylcblx0XHRcdFx0XHRyZXF1ZXN0LmlkID0gYXJyW2ldLnBhZ2VfaWQ7XG5cdFx0XHRcdFx0cmVzID0gdHJ1ZTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XHRcdFx0XHRcblx0fVxuXHRcblx0Y29uc29sZS5sb2coXCJpc0xvYWRlZCA6IFwiICsgcmVzKTtcblxuXHRyZXR1cm4gcmVzO1xuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFnZVN0YXRlVXBEYXRlKGRhdGEsIHBhZ2Vfc3RhdGUpIHtcblx0XG5cdHBhZ2Vfc3RhdGUuY3VycmVudF9wYWdlID0gZGF0YS5zbHVnO1xuXG5cdHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLnB1c2goe1xuXHRcdFwicGFnZV9pZFwiIDogZGF0YS5pZCxcblx0XHRcInBhZ2Vfc2x1Z1wiIDogZGF0YS5zbHVnLFxuXHRcdFwicGFnZV91cmxcIiA6IGRhdGEubGluayxcblx0XHRcImpzb25fbGlua1wiIDogZGF0YS5fbGlua3Muc2VsZlswXS5ocmVmXHRcdFx0XG5cdH0pO1xuXG5cdHJldHVybiBwYWdlX3N0YXRlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlbmRlclRlbXBsYXRlcyhkYXRhKSB7XG5cblx0dmFyIHNsdWcgPSBkYXRhLnNsdWc7XG5cdHZhciBpbWFnZVVybCA9IGRhdGEuYWNmLmhlYWRlcl9pbWFnZS51cmw7XG5cblx0ZnVuY3Rpb24gb25Db21wbGV0ZSgpIHtcblx0XHQvLyAkKFwiLmhlcm9cIikuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLFwidXJsKFwiKyBpbWFnZVVybCArXCIpXCIpO1xuXHRcdFxuXHRcdC8vIGNvbnNvbGUubG9nKGltYWdlVXJsKTtcblx0fVxuXG5cdCQoXCIjanNfcGFnZV9zaW5nbGVfaXRlbVwiKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHNsdWcpO1xuXG5cdCQoXCIjanNfcGFnZV9zaW5nbGVfaXRlbVwiKS5sb2FkVGVtcGxhdGUoJChcIiNpdGVtVGVtcGxhdGVcIiksIHtcblxuXHRcdFwidGl0bGVcIiA6IGRhdGEudGl0bGUucmVuZGVyZWQsXG5cdFx0XCJpbnRyb1wiIDogZGF0YS5hY2YubG9uZ19kZXNjcmlwdGlvbixcblx0XHRcImhlcm9JbWFnZVwiIDogZGF0YS5hY2YuaGVhZGVyX2ltYWdlLnVybCxcblx0XHRcImltYWdlXzFcIiA6IGRhdGEuYWNmLmltYWdlXzEudXJsLFxuXHRcdFwiaW1hZ2VfMlwiIDogZGF0YS5hY2YuaW1hZ2VfMi51cmwsXG5cdFx0XCJidG5UZXh0XCIgOiBcIlZpc2l0IHRoZSBzaXRlXCIsXG5cdFx0XCJidG5MaW5rXCIgOiBkYXRhLmFjZi5zaXRlX3VybFxuICAgXHRcdH0sIHsgY29tcGxldGU6IG9uQ29tcGxldGUgfSk7XHRcblxufTsiXX0=
