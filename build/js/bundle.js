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
var readAddressBar = require('./modules/readAddressBar');
var isLoaded = require('./modules/isLoaded');
// var transitionToPage = require('./modules/transitionToPage');
// var transitionBackToMenu = require('./modules/transitionBackToMenu');
var fireTransition = require('./modules/fireTransition');






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

		/* SET UP ANIMATIONS */

		var theTitle = document.getElementById('js_animate_title');

		if ($(theTitle).length > 0) {
			wrapLetters(theTitle);
		}
		
		
		animateHeading();


		var homepage = document.getElementById('homepage');
		var $animation_elements = $('#js_animate_heading');	

		if ($(homepage).length > 0) {

			inView(homepage, $animation_elements);

			var x = $('#testing');
			inView(homepage, x);

		}

		






					
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

					


			if (Modernizr.history) {
			 	history.pushState(null, null, request.href);
			}
		});



		/* BACK TO MENU */
		domEls.back_to_menu_btn.on('click', function() {

			// scroll the single item page back to top
			window.setTimeout(function() {

				$('#target').scrollTop( 0 );

			}, 600);


				        				
	        // for browsersync only - CHANGE TO:
	        // history.pushState( null, null, postdata.root_url );
	        
			// history.pushState( null, null, jr_portfolio.config.siteUrl );
		});







		/* TODO - BROWSERS BACK BUTTON */

		// readAddressBar(request, page_state);
		// adds the popstate event handler 
		// needs revision

















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
},{"./modules/Effeckt/captions":2,"./modules/Effeckt/core":3,"./modules/Effeckt/pageTransitions":4,"./modules/ajaxCall":5,"./modules/animations/animateHeading":6,"./modules/animations/animation_utils/whichAnimationEvent":7,"./modules/animations/animation_utils/whichTransitionEvent":8,"./modules/animations/inView":9,"./modules/animations/wrapLetters":10,"./modules/domEls":12,"./modules/fireTransition":13,"./modules/injectSpinner":14,"./modules/isLoaded":15,"./modules/readAddressBar":17}],2:[function(require,module,exports){
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
},{"./buildTemplate":11,"./domEls":12,"./fireTransition":13,"./pageStateUpDate":16,"./renderTemplates":18}],6:[function(require,module,exports){
var wrapLetters = require('./wrapLetters');

module.exports = function animateHead() {

	var heading = document.getElementById('js_animate_heading');

	if ($(heading).length > 0) {
		wrapLetters(heading);

		var letters = document.getElementById('js_animate_heading').getElementsByClassName('letter');

		var n = 0;

		for (var i = 0; i < letters.length; i++) {		
			letters[i].style.transition = 'opacity ' + n + 'ms ease';
			n+= 100;
		}

	}
	

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
},{}],12:[function(require,module,exports){
var domEls = {
	"animation_elements" : $('#js_animate_head'),
	"page_container" : $('#js_page_single_item'),
	"back_to_menu_btn" : $('#js_back_to_menu'),
	"spinner" : $('<div id="js_loading"><div class="spinner"></div></div>')
};


module.exports = domEls;
},{}],13:[function(require,module,exports){
module.exports = function fireTransition() {

	$('.effeckt .the-btn').trigger('click');

	window.setTimeout(function() {	
		$('#js_loading').remove();
	}, 1200);

};
},{}],14:[function(require,module,exports){
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

        for (var key in postdata.slug) {

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
          
           window.location.assign(postdata.root_url);           
        }


    });     	
};




},{"./ajaxCall":5,"./domEls":12,"./injectSpinner":14,"./isLoaded":15}],18:[function(require,module,exports){
module.exports = function renderTemplates(data) {

	console.log("renderTemplates");

	var slug = data.slug;
	var imageUrl = data.acf.header_image.url;

	function onComplete() {
		$(".hero").css("background-image","url("+ imageUrl +")");
		
		console.log(imageUrl);
	};

	$("#js_page_single_item").removeClass().addClass(slug);

	$("#js_page_single_item").loadTemplate($("#itemTemplate"), {

       "title" : data.title.rendered,
       "intro" : data.acf.long_description,
       "heroImage" : data.acf.header_image.url}, 
       { complete: onComplete });	

};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvY2FwdGlvbnMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvRWZmZWNrdC9jb3JlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hBbmltYXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaFRyYW5zaXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2luVmlldy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2J1aWxkVGVtcGxhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvZG9tRWxzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2ZpcmVUcmFuc2l0aW9uLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2luamVjdFNwaW5uZXIuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlbmRlclRlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBDYWNoZSByZWZlcmVuY2UgdG8gRE9NIGVsZW1lbnRzICovXG52YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2RvbUVscycpO1xuXG5cbi8qIEFuaW1hdGlvbnMgKi9cbnZhciBpblZpZXcgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9pblZpZXcnKTtcbnZhciB3cmFwTGV0dGVycyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzJyk7XG52YXIgYW5pbWF0ZUhlYWRpbmcgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlSGVhZGluZycpO1xudmFyIHdoaWNoVHJhbnNpdGlvbkV2ZW50ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0aW9uX3V0aWxzL3doaWNoVHJhbnNpdGlvbkV2ZW50Jyk7XG52YXIgd2hpY2hBbmltYXRpb25FdmVudCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaEFuaW1hdGlvbkV2ZW50Jyk7XG5cbi8qXG5nZXQgY2FsbGJhY2tzIGZyb20gY3NzIGFuaW1hdGlvbnM6IGh0dHBzOi8vZGF2aWR3YWxzaC5uYW1lL2Nzcy1hbmltYXRpb24tY2FsbGJhY2tcblxudmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VsJyk7IC8vIGdldCBzb21lIGVsZW1lbnRcblx0XG4vLyBzdG9yZSB0aGUgYW5pbWF0aW9uIC8gdHJhbnNpdGlvbiBlbmQgZXZlbnQgLSBhZGQgdG8gZ2xvYmFsIG9iamVjdD8gXG52YXIgdGhlRXZlbnQgPSB3aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cbi8vIGFkZCBsaXN0bmVyIGFuZCBjYWxsYmFja1xudGhlRXZlbnQgJiYgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGVFdmVudCwgZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdUcmFuc2l0aW9uIGNvbXBsZXRlISAgVGhpcyBpcyB0aGUgY2FsbGJhY2ssIG5vIGxpYnJhcnkgbmVlZGVkIScpO1xufSk7XG5cbiovXG5cblxuXG5cblxuXG4vKiB0ZXN0aW5nIGFuaW1hdGUuanMgOiBodHRwczovL2dpdGh1Yi5jb20vYmVuZGMvYW5pbWF0ZSAqL1xuLy8gdmFyIHRlc3RBbmltYXRlSnMgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlX2pzL3Rlc3RBbmltYXRlSnMnKTtcbi8vIHRlc3RBbmltYXRlSnMoKTtcblxuXG5cbi8qIEVmZmVja3QgKi9cbnZhciBjb3JlID0gcmVxdWlyZSgnLi9tb2R1bGVzL0VmZmVja3QvY29yZScpO1xudmFyIHBhZ2VUcmFuc2l0aW9ucyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9FZmZlY2t0L3BhZ2VUcmFuc2l0aW9ucycpO1xudmFyIGNhcHRpb25zID0gcmVxdWlyZSgnLi9tb2R1bGVzL0VmZmVja3QvY2FwdGlvbnMnKTtcbi8vIGluaXQgRWZmZWNrdFxuY29yZSgpO1xucGFnZVRyYW5zaXRpb25zKCk7XG5jYXB0aW9ucygpO1xuXG5cblxuLyogbG9hZGluZyB3b3JrIHBhZ2VzICovXG52YXIgaW5qZWN0U3Bpbm5lciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pbmplY3RTcGlubmVyJyk7XG52YXIgYWpheENhbGwgPSByZXF1aXJlKCcuL21vZHVsZXMvYWpheENhbGwnKTtcbnZhciByZWFkQWRkcmVzc0JhciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9yZWFkQWRkcmVzc0JhcicpO1xudmFyIGlzTG9hZGVkID0gcmVxdWlyZSgnLi9tb2R1bGVzL2lzTG9hZGVkJyk7XG4vLyB2YXIgdHJhbnNpdGlvblRvUGFnZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90cmFuc2l0aW9uVG9QYWdlJyk7XG4vLyB2YXIgdHJhbnNpdGlvbkJhY2tUb01lbnUgPSByZXF1aXJlKCcuL21vZHVsZXMvdHJhbnNpdGlvbkJhY2tUb01lbnUnKTtcbnZhciBmaXJlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vbW9kdWxlcy9maXJlVHJhbnNpdGlvbicpO1xuXG5cblxuXG5cblxuLy8gR0xPQkFMIEZPUiBERVZcbnJlcXVlc3QgPSB7fTtcblxuLy8gR0xPQkFMIEZPUiBERVZcbnBhZ2Vfc3RhdGUgPSB7XG5cdFwibG9hZGVkX3BhZ2VzXCIgOiBbXSxcblx0XCJmcm9tUGFnZVwiIDogXCJcIixcblx0XCJ0b1BhZ2VcIiA6IFwiXCJcbn07XG5cbi8vIEVYQU1QTEVTXG5cbi8vIHBvc3RkYXRhIHtcbi8vIFx0anNvbl91cmwgOiB7XG4vLyBcdFx0MjggOiAgXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvMjhcIixcbi8vIFx0XHQzMDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvMzBcIlxuLy8gXHR9LFxuLy8gXHRyb290X3VybDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvXCIsXG4vL1x0c2x1Zzoge1xuLy9cdFx0XCJhY2VcIiA6IDI4LFxuLy9cdFx0XCJib2NcIiA6IDMwXG4vLyBcdH1cbi8vIH1cblxuLy8gcmVxdWVzdCA9IHtcbi8vIFx0XCJocmVmXCIgOiBcIlwiLFxuLy8gXHRcImlkXCIgOiAwLFxuLy8gXHRcImlkX3N0clwiIDogXCJcIixcbi8vIFx0XCJqc29uX3VybFwiIDogXCJcIlx0XG4vLyB9O1xuXG5cbi8vIFwibG9hZGVkX3BhZ2VzXCIgOiBbXG4vLyBcdHtcbi8vIFx0XHRqc29uX2xpbms6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzhcIlxuLy8gXHRcdHBhZ2VfaWQ6IDhcbi8vIFx0XHRwYWdlX3NsdWc6IFwiYmlyZHMtb2YtYmVya3NoaXJlLWF0bGFzXCJcbi8vIFx0XHRwYWdlX3VybDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL2JpcmRzLW9mLWJlcmtzaGlyZS1hdGxhcy9cIlx0XHRcdFxuLy8gXHR9XG4vLyBdXG5cblxuKGZ1bmN0aW9uKCQpIHtcdFxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG5cdFx0LyogU0VUIFVQIEFOSU1BVElPTlMgKi9cblxuXHRcdHZhciB0aGVUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX3RpdGxlJyk7XG5cblx0XHRpZiAoJCh0aGVUaXRsZSkubGVuZ3RoID4gMCkge1xuXHRcdFx0d3JhcExldHRlcnModGhlVGl0bGUpO1xuXHRcdH1cblx0XHRcblx0XHRcblx0XHRhbmltYXRlSGVhZGluZygpO1xuXG5cblx0XHR2YXIgaG9tZXBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9tZXBhZ2UnKTtcblx0XHR2YXIgJGFuaW1hdGlvbl9lbGVtZW50cyA9ICQoJyNqc19hbmltYXRlX2hlYWRpbmcnKTtcdFxuXG5cdFx0aWYgKCQoaG9tZXBhZ2UpLmxlbmd0aCA+IDApIHtcblxuXHRcdFx0aW5WaWV3KGhvbWVwYWdlLCAkYW5pbWF0aW9uX2VsZW1lbnRzKTtcblxuXHRcdFx0dmFyIHggPSAkKCcjdGVzdGluZycpO1xuXHRcdFx0aW5WaWV3KGhvbWVwYWdlLCB4KTtcblxuXHRcdH1cblxuXHRcdFxuXG5cblxuXG5cblxuXHRcdFx0XHRcdFxuXHRcdCQoJy53b3JrX21lbnVfbGluaycpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdC8vIHVwZGF0ZXMgcmVxdWVzdCBvYmplY3Rcblx0XHRcdHJlcXVlc3QgPSB7fTtcblx0XHRcdC8vIGdldCB0aGUgaHJlZlxuXHRcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHRcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHRcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1x0XHRcdFx0XG5cdFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0XHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XHRcdFxuXG5cdFx0XHRpbmplY3RTcGlubmVyKCk7XG5cblx0XHRcdC8vIGlmIGlzTG9hZGVkIGdyYWIgdGhlIGNodW5rIGZyb20gbG9jYWxTdG9yYWdlXG5cblxuXG5cdFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblxuXG5cdFx0XHQvLyBsb2NhbCB0ZXN0aW5nIFxuXHRcdFx0Ly8gZGVsYXkgZm9yIDUwMG1zIGluIGNhc2Ugb2YgZmFzdCBhamF4ICFcblx0XHRcdC8vIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQvLyBcdCQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG5cdFx0XHQvLyBcdGZpcmVUcmFuc2l0aW9uKCk7XG5cblx0XHRcdC8vIH0sIDUwMCk7XHRcblxuXHRcdFx0XHRcdFxuXG5cblx0XHRcdGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdFx0IFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXG5cblx0XHQvKiBCQUNLIFRPIE1FTlUgKi9cblx0XHRkb21FbHMuYmFja190b19tZW51X2J0bi5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gc2Nyb2xsIHRoZSBzaW5nbGUgaXRlbSBwYWdlIGJhY2sgdG8gdG9wXG5cdFx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdFx0XHQkKCcjdGFyZ2V0Jykuc2Nyb2xsVG9wKCAwICk7XG5cblx0XHRcdH0sIDYwMCk7XG5cblxuXHRcdFx0XHQgICAgICAgIFx0XHRcdFx0XG5cdCAgICAgICAgLy8gZm9yIGJyb3dzZXJzeW5jIG9ubHkgLSBDSEFOR0UgVE86XG5cdCAgICAgICAgLy8gaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIHBvc3RkYXRhLnJvb3RfdXJsICk7XG5cdCAgICAgICAgXG5cdFx0XHQvLyBoaXN0b3J5LnB1c2hTdGF0ZSggbnVsbCwgbnVsbCwganJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsICk7XG5cdFx0fSk7XG5cblxuXG5cblxuXG5cblx0XHQvKiBUT0RPIC0gQlJPV1NFUlMgQkFDSyBCVVRUT04gKi9cblxuXHRcdC8vIHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpO1xuXHRcdC8vIGFkZHMgdGhlIHBvcHN0YXRlIGV2ZW50IGhhbmRsZXIgXG5cdFx0Ly8gbmVlZHMgcmV2aXNpb25cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdFx0LyogVE9ETyAtIEhPVkVSICovXG5cdFx0Ly8gaWYgbm8gdG91Y2ggd2UgY2FuIGFudGljaXBhdGUgYSBjbGljayBhbmQgZmlyZSBhamF4Q2FsbCBvbiBtb3VzZW92ZXIgb2YgbWVudSBsaW5rc1xuXHRcdC8vIGlmICghTW9kZXJuaXpyLnRvdWNoZXZlbnRzKSB7XG5cblx0XHQvLyBcdCQoJyNhcHAnKS5vbignbW91c2VvdmVyJywgJ2EnLCBmdW5jdGlvbigpIHtcblxuXHRcdC8vIFx0XHRyZXF1ZXN0ID0ge307XG5cdFx0Ly8gXHRcdC8vIGdldCB0aGUgaHJlZlxuXHRcdC8vIFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdC8vIFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHQvLyBcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0Ly8gXHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFx0XHRcdFxuXHRcdC8vIFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcblxuXHRcdC8vIFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0Ly8gXHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0Ly8gXHRcdH1cblxuXHRcdC8vIFx0fSk7XG5cdFx0Ly8gfVxuXG5cblxuXG5cdFx0LyogRklSU1QgQVRURU1QVCAtIENMSUNLICovXG5cblx0XHQvLyAkKCcjYXBwJykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0Ly8gXHRhbGVydChcInd0ZlwiKTtcblxuXHRcdC8vIFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcdFx0XG5cblx0XHQvLyBcdHJlcXVlc3QgPSB7fTtcdFx0XHRcdFxuXHRcdC8vIFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0Ly8gXHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdC8vIFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdC8vIFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdC8vIFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0Ly8gXHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcblx0XHQvLyBcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHQvLyBcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFxuXHRcdFx0XHRcdFxuXHRcdC8vIFx0Ly8gaXMgaXQgYWxyZWFkeSBsb2FkZWQgaW50byBET00/IENoZWNrIHRoZSBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcyBhcnJheVxuXHRcdC8vIFx0aWYgKCAhaXNMb2FkZWQocmVxdWVzdC5pZCwgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMsIHJlcXVlc3QpICkge1xuXHRcdC8vIFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblx0XHQvLyBcdH1cblx0XHRcblx0XHQvLyBcdGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdC8vIFx0IFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHQvLyBcdH1cblxuXHRcdC8vIH0pO1xuXG5cblxuXHRcdFxuXG5cblx0XHRcblxuXG5cdH0pO1xuXG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYXB0aW9ucygpIHtcblxuICAvKiFcbiAgICogY2FwdGlvbnMuanNcbiAgICpcbiAgICogYXV0aG9yOiBFZmZlY2t0LmNzc1xuICAgKlxuICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAgICovXG5cbiAgdmFyIGVmZmVja3RDYXB0aW9ucyA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5iaW5kVUlBY3Rpb25zKCk7XG4gICAgfSxcblxuICAgIGJpbmRVSUFjdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzOyAvL2tlZXAgYSByZWZlcmVuY2UgdG8gdGhpcyAoQ2FwdGlvbnMpIG9iamVjdC5cblxuICAgICAgJCgnW2RhdGEtZWZmZWNrdC10eXBlXScpLm9uKEVmZmVja3QuYnV0dG9uUHJlc3NlZEV2ZW50LCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBzZWxmLmFjdGl2YXRlQ2FwdGlvbnModGhpcyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgYWN0aXZhdGVDYXB0aW9uczogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBhY3RpdmVDbGFzcyA9ICdhY3RpdmUnO1xuXG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGFjdGl2ZUNsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciAkY2FwdGlvbiA9ICQoZWwpO1xuICAgICAgICAkY2FwdGlvbi50b2dnbGVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGVmZmVja3RDYXB0aW9ucy5pbml0KCk7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb3JlKCkge1xuXG47KGZ1bmN0aW9uKHdpbmRvdyl7XG5cbiAgdmFyXG4gICAgLy8gSXMgTW9kZXJuaXpyIGRlZmluZWQgb24gdGhlIGdsb2JhbCBzY29wZVxuICAgIE1vZGVybml6ciA9IHR5cGVvZiBNb2Rlcm5penIgIT09IFwidW5kZWZpbmVkXCIgPyBNb2Rlcm5penIgOiBmYWxzZSxcblxuICAgIC8vIEFsd2F5cyBleHBlY3QgYm90aCBraW5kcyBvZiBldmVudFxuICAgIGJ1dHRvblByZXNzZWRFdmVudCA9ICd0b3VjaHN0YXJ0IGNsaWNrJyxcblxuICAgIC8vIExpc3Qgb2YgYWxsIGFuaW1hdGlvbi90cmFuc2l0aW9uIHByb3BlcnRpZXNcbiAgICAvLyB3aXRoIGl0cyBhbmltYXRpb25FbmQvdHJhbnNpdGlvbkVuZCBldmVudFxuICAgIGFuaW1hdGlvbkVuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAnV2Via2l0QW5pbWF0aW9uJyA6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgICAgJ09BbmltYXRpb24nIDogJ29BbmltYXRpb25FbmQnLFxuICAgICAgJ21zQW5pbWF0aW9uJyA6ICdNU0FuaW1hdGlvbkVuZCcsXG4gICAgICAnYW5pbWF0aW9uJyA6ICdhbmltYXRpb25lbmQnXG4gICAgfSxcblxuICAgIHRyYW5zaXRpb25FbmRFdmVudE5hbWVzID0ge1xuICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgJ09UcmFuc2l0aW9uJyA6ICdvVHJhbnNpdGlvbkVuZCcsXG4gICAgICAnbXNUcmFuc2l0aW9uJyA6ICdNU1RyYW5zaXRpb25FbmQnLFxuICAgICAgJ3RyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnXG4gICAgfSxcblxuICAgIEVmZmVja3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgLy8gQ3VycmVudCB2ZXJzaW9uLlxuICBFZmZlY2t0LnZlcnNpb24gPSAnMC4wLjEnO1xuXG4gIC8vIEluaXRpYWxpemF0aW9uIG1ldGhvZFxuICBFZmZlY2t0LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5idXR0b25QcmVzc2VkRXZlbnQgPSBidXR0b25QcmVzc2VkRXZlbnQ7XG5cbiAgICAvL2V2ZW50IHRyaWdnZXIgYWZ0ZXIgYW5pbWF0aW9uL3RyYW5zaXRpb24gZW5kLlxuICAgIHRoaXMudHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9IE1vZGVybml6ciA/IHRyYW5zaXRpb25FbmRFdmVudE5hbWVzW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNpdGlvbicpXSA6IGdldFRyYW5zaXRpb25FbmRFdmVudE5hbWVzKCk7XG4gICAgdGhpcy5hbmltYXRpb25FbmRFdmVudE5hbWUgID0gTW9kZXJuaXpyID8gYW5pbWF0aW9uRW5kRXZlbnROYW1lc1tNb2Rlcm5penIucHJlZml4ZWQoJ2FuaW1hdGlvbicpXSA6IGdldEFuaW1hdGlvbkVuZEV2ZW50TmFtZXMoKTtcbiAgICB0aGlzLnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCA9IHRoaXMuYW5pbWF0aW9uRW5kRXZlbnROYW1lICsgJyAnICsgdGhpcy50cmFuc2l0aW9uRW5kRXZlbnROYW1lO1xuICB9O1xuXG4gIEVmZmVja3QucHJvdG90eXBlLmdldFZpZXdwb3J0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgIGNsaWVudCA9IGRvY0VsZW1lbnRbJ2NsaWVudEhlaWdodCddLFxuICAgICAgaW5uZXIgPSB3aW5kb3dbJ2lubmVySGVpZ2h0J107XG5cbiAgICBpZiggY2xpZW50IDwgaW5uZXIgKVxuICAgICAgcmV0dXJuIGlubmVyO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBjbGllbnQ7XG4gIH07XG5cbiAgLy8gR2V0IGFsbCB0aGUgcHJvcGVydGllcyBmb3IgdHJhbnNpdGlvbi9hbmltYXRpb24gZW5kXG4gIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25FbmRFdmVudE5hbWVzKCkge1xuICAgIHJldHVybiBfZ2V0RW5kRXZlbnROYW1lcyggdHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFuaW1hdGlvbkVuZEV2ZW50TmFtZXMoKSB7XG4gICAgcmV0dXJuIF9nZXRFbmRFdmVudE5hbWVzKCBhbmltYXRpb25FbmRFdmVudE5hbWVzICk7XG4gIH1cblxuICBmdW5jdGlvbiBfZ2V0RW5kRXZlbnROYW1lcyhvYmopIHtcbiAgICB2YXIgZXZlbnRzID0gW107XG5cbiAgICBmb3IgKCB2YXIgZXZlbnROYW1lIGluIG9iaiApIHtcbiAgICAgIGV2ZW50cy5wdXNoKCBvYmpbIGV2ZW50TmFtZSBdICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50cy5qb2luKCcgJyk7XG4gIH1cblxuICAvLyBDcmVhdGVzIGEgRWZmZWNrdCBvYmplY3QuXG4gIHdpbmRvdy5FZmZlY2t0ID0gbmV3IEVmZmVja3QoKTtcblxufSkodGhpcyk7XG5cblx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFnZVRyYW5zaXRpb25zKCkge1xuXG52YXIgRWZmZWNrdFBhZ2VUcmFuc2l0aW9ucyA9IHtcblxuICBmcm9tUGFnZTogJycsXG4gIHRvUGFnZTogJycsXG4gIGlzQW5pbWF0aW5nOiBmYWxzZSxcbiAgaXNOZXh0UGFnZUVuZDogZmFsc2UsXG4gIGlzQ3VycmVudFBhZ2VFbmQ6IGZhbHNlLFxuICB0cmFuc2l0aW9uSW5FZmZlY3Q6ICcnLFxuICB0cmFuc2l0aW9uT3V0RWZmZWN0OiAnJyxcblxuICBpbml0OiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaW5pdFBhZ2VzKCk7XG4gICAgdGhpcy5iaW5kVUlBY3Rpb25zKCk7XG5cbiAgfSxcblxuICBpbml0UGFnZXM6IGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgJHBhZ2VzID0gJCgnW2RhdGEtZWZmZWNrdC1wYWdlXScpO1xuXG4gICAgdGhpcy5mcm9tUGFnZSA9ICRwYWdlcy5maXJzdCgpLmFkZENsYXNzKCdlZmZlY2t0LXBhZ2UtYWN0aXZlJyk7XG5cbiAgfSxcblxuICBiaW5kVUlBY3Rpb25zOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICQoJy5lZmZlY2t0LXBhZ2UtdHJhbnNpdGlvbi1idXR0b24nKS5vbiggRWZmZWNrdC5idXR0b25QcmVzc2VkRXZlbnQsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciB0cmFuc2l0aW9uSW5FZmZlY3QgID0gJCh0aGlzKS5kYXRhKCdlZmZlY2t0LXRyYW5zaXRpb24taW4nKSxcbiAgICAgICAgICB0cmFuc2l0aW9uT3V0RWZmZWN0ID0gJCh0aGlzKS5kYXRhKCdlZmZlY2t0LXRyYW5zaXRpb24tb3V0JyksXG4gICAgICAgICAgdHJhbnNpdGlvblBhZ2UgICAgICA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLXBhZ2UnKTtcblxuICAgICAgaWYgKCAkKHRoaXMpLmRhdGEoXCJlZmZlY2t0LW5lZWRzLXBlcnNwZWN0aXZlXCIpKSB7XG4gICAgICAgICQoXCJodG1sXCIpLmFkZENsYXNzKFwibWQtcGVyc3BlY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJhbnNpdGlvblBhZ2UoIHRyYW5zaXRpb25QYWdlLCB0cmFuc2l0aW9uSW5FZmZlY3QsIHRyYW5zaXRpb25PdXRFZmZlY3QgKTtcblxuICAgIH0pO1xuICB9LFxuXG4gIHRyYW5zaXRpb25QYWdlOiBmdW5jdGlvbiggdHJhbnNpdGlvblBhZ2UsIHRyYW5zaXRpb25JbkVmZmVjdCwgdHJhbnNpdGlvbk91dEVmZmVjdCApIHtcblxuICAgIGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgdGhpcy5pc0N1cnJlbnRQYWdlRW5kID0gZmFsc2U7XG4gICAgdGhpcy5pc05leHRQYWdlRW5kID0gZmFsc2U7XG4gICAgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QgPSB0cmFuc2l0aW9uSW5FZmZlY3Q7XG4gICAgdGhpcy50cmFuc2l0aW9uT3V0RWZmZWN0PSB0cmFuc2l0aW9uT3V0RWZmZWN0O1xuXG4gICAgLy8gR2V0IFBhZ2VzXG4gICAgdGhpcy5mcm9tUGFnZSA9ICQoJ1tkYXRhLWVmZmVja3QtcGFnZV0uZWZmZWNrdC1wYWdlLWFjdGl2ZScpO1xuICAgIHRoaXMudG9QYWdlICAgPSAkKCdbZGF0YS1lZmZlY2t0LXBhZ2U9XCInICsgdHJhbnNpdGlvblBhZ2UgKyAnXCJdJyk7XG5cbiAgICAvLyBBZGQgdGhpcyBjbGFzcyB0byBwcmV2ZW50IHNjcm9sbCB0byBiZSBkaXNwbGF5ZWRcbiAgICB0aGlzLnRvUGFnZS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyBlZmZlY2t0LXBhZ2UtYWN0aXZlICcgKyB0aGlzLnRyYW5zaXRpb25JbkVmZmVjdCk7XG4gICAgdGhpcy5mcm9tUGFnZS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZycpO1xuXG4gICAgLy8gU2V0IFRyYW5zaXRpb24gQ2xhc3NcbiAgICB0aGlzLmZyb21QYWdlLmFkZENsYXNzKHRoaXMudHJhbnNpdGlvbk91dEVmZmVjdCk7XG4gICAgXG4gICAgdmFyIHNlbGY9IHRoaXM7XG4gICAgXG4gICAgdGhpcy50b1BhZ2Uub24oIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgIFxuICAgICAgc2VsZi50b1BhZ2Uub2ZmKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCApO1xuICAgICAgc2VsZi5pc05leHRQYWdlRW5kID0gdHJ1ZTtcblxuICAgICAgaWYgKCBzZWxmLmlzQ3VycmVudFBhZ2VFbmQgKSB7XG4gICAgICAgIHNlbGYucmVzZXRUcmFuc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmZyb21QYWdlLm9uKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24gKCkge1xuXG4gICAgICBzZWxmLmZyb21QYWdlLm9mZiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgKTtcbiAgICAgIHNlbGYuaXNDdXJyZW50UGFnZUVuZCA9IHRydWU7XG5cbiAgICAgIGlmICggc2VsZi5pc05leHRQYWdlRW5kICkge1xuICAgICAgICBzZWxmLnJlc2V0VHJhbnNpdGlvbigpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfSxcblxuICByZXNldFRyYW5zaXRpb246IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNDdXJyZW50UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNOZXh0UGFnZUVuZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5mcm9tUGFnZS5yZW1vdmVDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyBlZmZlY2t0LXBhZ2UtYWN0aXZlICcgKyB0aGlzLnRyYW5zaXRpb25PdXRFZmZlY3QpOy8vLmhpZGUoKTtcbiAgICB0aGlzLnRvUGFnZS5yZW1vdmVDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyAnICsgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QpO1xuXG4gICAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJtZC1wZXJzcGVjdGl2ZVwiKTtcbiAgfVxuXG59O1xuXG5FZmZlY2t0UGFnZVRyYW5zaXRpb25zLmluaXQoKTtcdFxuXHRcbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG52YXIgYnVpbGRUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vYnVpbGRUZW1wbGF0ZScpO1xudmFyIHJlbmRlclRlbXBsYXRlcyA9IHJlcXVpcmUoJy4vcmVuZGVyVGVtcGxhdGVzJyk7XG52YXIgcGFnZVN0YXRlVXBEYXRlID0gcmVxdWlyZSgnLi9wYWdlU3RhdGVVcERhdGUnKTtcbnZhciBmaXJlVHJhbnNpdGlvbiA9IHJlcXVpcmUoJy4vZmlyZVRyYW5zaXRpb24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhamF4Q2FsbChyZXF1ZXN0KSB7XG5cblx0JC5hamF4KHtcblx0ICAgIHVybDogcmVxdWVzdC5qc29uX3VybCxcblx0ICAgIGRhdGFUeXBlOiAnanNvbidcblx0fSlcblxuXHQuZG9uZShmdW5jdGlvbihkYXRhKXtcdFxuXG5cdFx0Ly8gY2xlYXIgY3VycmVudCBjb250ZW50IC0gdGhpcyBjb3VsZCBiZSBzdG9yZWRcblx0XHRkb21FbHMucGFnZV9jb250YWluZXIuZW1wdHkoKTtcblxuXHRcdC8vIHVwZGF0ZSBwYWdlX3N0YXRlIG9iamVjdFxuXHRcdHBhZ2VTdGF0ZVVwRGF0ZShkYXRhLCBwYWdlX3N0YXRlKTtcdFxuXG5cdFx0cmVuZGVyVGVtcGxhdGVzKGRhdGEpO1xuXG5cblx0XHRcblx0XHQvLyB0ZW1wbGF0ZSB0aGUgZGF0YVxuXHRcdC8vIHZhciBjaHVuayA9IGJ1aWxkVGVtcGxhdGUoZGF0YSk7XG5cblx0XHQvLyAvLyBpbnNlcnQgaW50byB0aGUgRE9NXHRcdFxuXHRcdC8vIGRvbUVscy5wYWdlX2NvbnRhaW5lci5hcHBlbmQoY2h1bmspO1xuXG5cdFx0Ly8gZGVsYXkgZm9yIDUwMG1zIGluIGNhc2Ugb2YgZmFzdCBhamF4ICFcblx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdFx0Ly8gJCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcbiAgICBcdFx0ZmlyZVRyYW5zaXRpb24oKTtcblxuXHRcdH0sIDUwMCk7XG5cdFx0XG5cdFxuXHRcdC8vIHB1dCB0aGUgdGVtcGF0ZSBpbiBsb2NhbCBzdG9yYWdlIGFzIHN0cmluZ2lmeVxuXHRcdC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicGFnZV9cIiArIHJlcXVlc3QuaWQsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHRcblx0XHQvLyBpZiAoTW9kZXJuaXpyLmxvY2Fsc3RvcmFnZSkge1xuXHRcdC8vIFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5nXG5cdFx0Ly8gXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGFnZV8nICsgcmVxdWVzdC5pZCwgY2h1bmtbMF0uaW5uZXJIVE1MKTtcdFx0XHRcdFxuXHRcdC8vIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHR9KVxuXG5cdC5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKCdlcnJvcicpO1xuXHRcdCQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG5cdFx0Ly8gYWxlcnQoXCJlcnJvclwiKTtcblx0fSlcblxuXHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKCdjb21wbGV0ZSEnKTtcblx0fSk7XHRcblxufTsiLCJ2YXIgd3JhcExldHRlcnMgPSByZXF1aXJlKCcuL3dyYXBMZXR0ZXJzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5pbWF0ZUhlYWQoKSB7XG5cblx0dmFyIGhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNfYW5pbWF0ZV9oZWFkaW5nJyk7XG5cblx0aWYgKCQoaGVhZGluZykubGVuZ3RoID4gMCkge1xuXHRcdHdyYXBMZXR0ZXJzKGhlYWRpbmcpO1xuXG5cdFx0dmFyIGxldHRlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanNfYW5pbWF0ZV9oZWFkaW5nJykuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbGV0dGVyJyk7XG5cblx0XHR2YXIgbiA9IDA7XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxldHRlcnMubGVuZ3RoOyBpKyspIHtcdFx0XG5cdFx0XHRsZXR0ZXJzW2ldLnN0eWxlLnRyYW5zaXRpb24gPSAnb3BhY2l0eSAnICsgbiArICdtcyBlYXNlJztcblx0XHRcdG4rPSAxMDA7XG5cdFx0fVxuXG5cdH1cblx0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaEFuaW1hdGlvbkV2ZW50KCkge1xuXHRcblx0dmFyIGtleTtcdFxuICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG5cblx0dmFyIGFuaW1hdGlvbnMgPSB7XG5cdFx0J1dlYmtpdEFuaW1hdGlvbicgOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcblx0XHQnT0FuaW1hdGlvbicgOiAnb0FuaW1hdGlvbkVuZCcsXG5cdFx0J21zQW5pbWF0aW9uJyA6ICdNU0FuaW1hdGlvbkVuZCcsXG5cdFx0J2FuaW1hdGlvbicgOiAnYW5pbWF0aW9uZW5kJ1xuXHR9O1xuXG4gICAgZm9yKGtleSBpbiBhbmltYXRpb25zKXtcbiAgICAgICAgaWYoIGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgcmV0dXJuIGFuaW1hdGlvbnNba2V5XTtcbiAgICAgICAgfVxuICAgIH1cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdoaWNoVHJhbnNpdGlvbkV2ZW50KCkge1xuXG5cdHZhciBrZXk7XHRcblx0dmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZWVsZW1lbnQnKTtcblxuXHR2YXIgdHJhbnNpdGlvbnMgPSB7XG5cdFx0J3RyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcblx0XHQnT1RyYW5zaXRpb24nOidvVHJhbnNpdGlvbkVuZCcsXG5cdFx0J01velRyYW5zaXRpb24nOid0cmFuc2l0aW9uZW5kJyxcblx0XHQnV2Via2l0VHJhbnNpdGlvbic6J3dlYmtpdFRyYW5zaXRpb25FbmQnXG5cdH07XG5cblx0Zm9yKGtleSBpbiB0cmFuc2l0aW9ucyl7XG5cdFx0aWYoIGVsLnN0eWxlW2tleV0gIT09IHVuZGVmaW5lZCApe1xuXHRcdCAgICByZXR1cm4gdHJhbnNpdGlvbnNba2V5XTtcblx0XHR9XG5cdH1cdFxufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi4vZG9tRWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW5WaWV3KGNvbnRhaW5lciwgJGVsKSB7XG5cblx0Ly8gaHR0cDovL3d3dy5odG1sNXJvY2tzLmNvbS9lbi90dXRvcmlhbHMvc3BlZWQvYW5pbWF0aW9ucy8jZGVib3VuY2luZy1zY3JvbGwtZXZlbnRzXG5cblx0dmFyICRhbmltYXRpb25fZWxlbWVudHMgPSAkZWw7XG5cblx0dmFyIHBhZ2UgPSBjb250YWluZXI7XG5cblx0dmFyIGxhdGVzdEtub3duU2Nyb2xsWSA9IDAsXG5cdFx0dGlja2luZyA9IGZhbHNlLFxuXHRcdHBhZ2VIZWlnaHQgPSAkKHdpbmRvdykuaGVpZ2h0KCksXG5cdFx0dGhlT2Zmc2V0ID0gMDtcblxuXHRmdW5jdGlvbiBvblNjcm9sbCgpIHtcblx0XHRsYXRlc3RLbm93blNjcm9sbFkgPSAkKGhvbWVwYWdlKS5zY3JvbGxUb3AoKTtcblx0XHRyZXF1ZXN0VGljaygpO1xuXHR9XG5cdGZ1bmN0aW9uIHJlcXVlc3RUaWNrKCkge1xuXHRcdGlmKCF0aWNraW5nKSB7XG5cdFx0XHRyZXF1ZXN0QW5pbWF0aW9uRnJhbWUodXBkYXRlKTtcblx0XHR9XG5cdFx0dGlja2luZyA9IHRydWU7XG5cdH1cblx0ZnVuY3Rpb24gdXBkYXRlKCkge1xuXHRcdC8vIHJlc2V0IHRoZSB0aWNrIHNvIHdlIGNhblxuXHRcdC8vIGNhcHR1cmUgdGhlIG5leHQgb25TY3JvbGxcblx0XHR0aWNraW5nID0gZmFsc2U7XG5cblx0XHR2YXIgY3VycmVudFNjcm9sbFkgPSBsYXRlc3RLbm93blNjcm9sbFk7XG5cblx0XHQvLyByZWFkIG9mZnNldCBvZiBET00gZWxlbWVudHNcblx0XHR0aGVPZmZzZXQgPSAkYW5pbWF0aW9uX2VsZW1lbnRzLm9mZnNldCgpO1xuXG5cdFx0Ly8gYW5kIGNvbXBhcmUgdG8gdGhlIGN1cnJlbnRTY3JvbGxZIHZhbHVlXG5cdFx0Ly8gdGhlbiBhcHBseSBzb21lIENTUyBjbGFzc2VzXG5cdFx0Ly8gdG8gdGhlIHZpc2libGUgaXRlbXNcblx0XHRpZiAodGhlT2Zmc2V0LnRvcCA8IHBhZ2VIZWlnaHQpIHtcblx0XHRcdCRhbmltYXRpb25fZWxlbWVudHMuYWRkQ2xhc3MoJ2luLXZpZXcnKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JGFuaW1hdGlvbl9lbGVtZW50cy5yZW1vdmVDbGFzcygnaW4tdmlldycpO1xuXHRcdH1cblxuXHRcdC8vIGNvbnNvbGUubG9nKHRoZU9mZnNldC50b3ApO1xuXHRcdC8vIGNvbnNvbGUubG9nKHBhZ2VIZWlnaHQpO1xuXG5cdH1cblxuXHRwYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIG9uU2Nyb2xsLCBmYWxzZSk7XG5cdFxuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd3JhcExldHRlcnMoZWwpIHtcblx0cmV0dXJuIGVsLmlubmVySFRNTCA9IGVsLnRleHRDb250ZW50LnNwbGl0KFwiXCIpLm1hcChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0cmV0dXJuICc8c3BhbiBjbGFzcz1sZXR0ZXI+JyArIGxldHRlciArICc8L3NwYW4+Jztcblx0fSkuam9pbihcIlwiKTtcdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoZGF0YSkge1xuXG5cdHZhciBpID0gXCJcIjtcblx0dmFyIGtleTtcblx0dmFyIHRpdGxlID0gZGF0YS50aXRsZS5yZW5kZXJlZDtcblx0dmFyIGNvbnRlbnQgPSBkYXRhLmNvbnRlbnQucmVuZGVyZWQ7XG5cblx0dmFyIGltYWdlcyA9IGRhdGEuYWNmLmltYWdlcztcblx0dmFyIGltYWdlSXRlbXMgPSBcIlwiO1xuXG5cdGlmIChpbWFnZXMubGVuZ3RoKSB7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDw9IGltYWdlcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRmb3IgKGtleSBpbiBpbWFnZXNbaV0pIHtcblxuXHRcdFx0XHRpZiAoaW1hZ2VzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRcdGltYWdlSXRlbXMgKz0gXHQnPGxpPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0aW1hZ2VzW2ldW2tleV0udGl0bGUgKyBcblx0XHRcdFx0XHRcdFx0XHRcdCcgOiAnICtcblx0XHRcdFx0XHRcdFx0XHRcdCc8aW1nIHNyYz1cIicgKyBcblx0XHRcdFx0XHRcdFx0XHRcdGltYWdlc1tpXVtrZXldLnNpemVzLmxhcmdlICsgXG5cdFx0XHRcdFx0XHRcdFx0XHQnXCIgLz4nICtcblx0XHRcdFx0XHRcdFx0XHRcdCc8L2xpPic7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IFxuXHRcdFx0fSBcdFx0XG5cdFx0fVx0XHRcdFxuXHR9IFxuXG5cblxuXG5cblxuXHR2YXIgdGVzdGltb25pYWxzID0gZGF0YS5hY2YudGVzdGltb25pYWxzO1xuXHR2YXIgdGVzdGltb25pYWxJdGVtcyA9IFwiXCI7XG5cblx0aWYgKHRlc3RpbW9uaWFscy5sZW5ndGgpIHtcblxuXHRcdGZvciAoaSA9IDA7IGkgPD0gdGVzdGltb25pYWxzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGZvciAoa2V5IGluIHRlc3RpbW9uaWFsc1tpXSkge1xuXHRcdFx0XHRpZiAodGVzdGltb25pYWxzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRcdHRlc3RpbW9uaWFsSXRlbXMgKz0gXHQnPGxpPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGtleSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCcgOiAnICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdj4nICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGVzdGltb25pYWxzW2ldW2tleV0gKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvbGk+JztcdFx0XHRcdFx0XG5cdFx0XHRcdH0gXG5cdFx0XHR9IFx0XHRcblx0XHR9XHRcdFx0XG5cdH0gXG5cdFxuXG5cblx0dmFyIHdyYXBwZXIgPSAkKCc8ZGl2Lz4nLCB7XG5cdFx0J2NsYXNzJyA6ICd3cmFwcGVyJyxcdFx0XG5cdH0pO1xuXG5cdCQoJzxoMS8+Jywge1xuXHRcdCdjbGFzcycgOiAndGl0bGUnLFxuXHRcdGh0bWw6IHRpdGxlXG5cdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1x0XG5cblx0JCgnPGRpdi8+Jywge1xuXHRcdCdjbGFzcycgOiAnY29udGVudCcsXG5cdFx0aHRtbDogY29udGVudFxuXHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblxuXHRpZiAodGVzdGltb25pYWxzLmxlbmd0aCkge1xuXG5cdFx0JCgnPHVsLz4nLCB7XG5cdFx0XHQnY2xhc3MnIDogJ3Rlc3RpbW9uaWFscy1saXN0Jyxcblx0XHRcdGh0bWw6IHRlc3RpbW9uaWFsSXRlbXNcblx0XHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblx0fVxuXG5cblx0aWYgKGltYWdlcy5sZW5ndGgpIHtcblxuXHRcdCQoJzx1bC8+Jywge1xuXHRcdFx0J2NsYXNzJyA6ICdpbWFnZS1saXN0Jyxcblx0XHRcdGh0bWw6IGltYWdlSXRlbXNcblx0XHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblx0fVxuXG5cblxuXHRyZXR1cm4gd3JhcHBlcjtcblx0XG59OyIsInZhciBkb21FbHMgPSB7XG5cdFwiYW5pbWF0aW9uX2VsZW1lbnRzXCIgOiAkKCcjanNfYW5pbWF0ZV9oZWFkJyksXG5cdFwicGFnZV9jb250YWluZXJcIiA6ICQoJyNqc19wYWdlX3NpbmdsZV9pdGVtJyksXG5cdFwiYmFja190b19tZW51X2J0blwiIDogJCgnI2pzX2JhY2tfdG9fbWVudScpLFxuXHRcInNwaW5uZXJcIiA6ICQoJzxkaXYgaWQ9XCJqc19sb2FkaW5nXCI+PGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj48L2Rpdj4nKVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUVsczsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpcmVUcmFuc2l0aW9uKCkge1xuXG5cdCQoJy5lZmZlY2t0IC50aGUtYnRuJykudHJpZ2dlcignY2xpY2snKTtcblxuXHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcdFxuXHRcdCQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG5cdH0sIDEyMDApO1xuXG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluamVjdFNwaW5uZXIoKSB7XG5cdCQoJ2JvZHknKS5hcHBlbmQoZG9tRWxzLnNwaW5uZXIpO1x0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNMb2FkZWQoaWRlbnRpZmllciwgYXJyLCByZXF1ZXN0KSB7XG5cblx0dmFyIHJlcyA9IGZhbHNlO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XG5cdFx0Zm9yICh2YXIga2V5IGluIGFycltpXSkge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXJyW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRpZiAoYXJyW2ldW2tleV0gPT09IGlkZW50aWZpZXIpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgaWRlbnRpZmllciBpcyBmb3VuZCB1cGRhdGUgcmVxdWVzdC5pZFxuXHRcdFx0XHRcdC8vIHVzZWQgZm9yIHdoZW4gdGhlIGlkZW50aWZpZXIgaXMgbm90IHRoZSBpZCBudW1iZXIgKGVnIHNsdWcpXG5cdFx0XHRcdFx0cmVxdWVzdC5pZCA9IGFycltpXS5wYWdlX2lkO1xuXHRcdFx0XHRcdHJlcyA9IHRydWU7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVx0XHRcdFx0XG5cdH1cblx0XG5cdGNvbnNvbGUubG9nKFwiaXNMb2FkZWQgOiBcIiArIHJlcyk7XG5cblx0cmV0dXJuIHJlcztcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZ2VTdGF0ZVVwRGF0ZShkYXRhLCBwYWdlX3N0YXRlKSB7XG5cblx0cGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMucHVzaCh7XG5cdFx0XCJwYWdlX2lkXCIgOiBkYXRhLmlkLFxuXHRcdFwicGFnZV9zbHVnXCIgOiBkYXRhLnNsdWcsXG5cdFx0XCJwYWdlX3VybFwiIDogZGF0YS5saW5rLFxuXHRcdFwianNvbl9saW5rXCIgOiBkYXRhLl9saW5rcy5zZWxmWzBdLmhyZWZcdFx0XHRcblx0fSk7XG5cblx0cmV0dXJuIHBhZ2Vfc3RhdGU7XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xudmFyIGlzTG9hZGVkID0gcmVxdWlyZSgnLi9pc0xvYWRlZCcpO1xudmFyIGluamVjdFNwaW5uZXIgPSByZXF1aXJlKCcuL2luamVjdFNwaW5uZXInKTtcbnZhciBhamF4Q2FsbCA9IHJlcXVpcmUoJy4vYWpheENhbGwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZWFkQWRkcmVzc0JhcihyZXF1ZXN0LCBwYWdlX3N0YXRlKSB7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmdW5jdGlvbihlKSB7XHRcdFxuXG5cdFx0ICAgIC8vIGdldCB0aGUgc2x1Z1xuICAgICAgICBwYXRoQXJyYXkgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCggJy8nICk7XG4gICAgICAgIHRoZUluZGV4ID0gcGF0aEFycmF5Lmxlbmd0aCAtIDI7XG4gICAgICAgIHRoZVNsdWcgPSBwYXRoQXJyYXlbdGhlSW5kZXhdO1x0XG4gICAgICAgIHRoZVJlc3VsdCA9IGZhbHNlO1xuICAgICAgICAvKlxuICAgICAgICAgXG4gICAgICAgICBpZiB0aGVTbHVnIGlzIGluIHBvc3RkYXRhLnNsdWcgdXBkYXRlIHJlcXVlc3QgYW5kIGZpcmUgYWpheCAtIHlvdSBhcmUgb24gdGhlIGhvbWVwYWdlXG4gICAgICAgICBpZiBub3QgdHJpZ2dlciBiYWNrIHRvIG1lbnUgY2xpY2sgXG5cbiAgICAgICAgKi9cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcG9zdGRhdGEuc2x1Zykge1xuXG4gICAgICAgICAgaWYgKHBvc3RkYXRhLnNsdWcuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygga2V5ICsgXCIgOiBcIiArIHBvc3RkYXRhLnNsdWdba2V5XSk7XG5cbiAgICAgICAgICAgIGlmICh0aGVTbHVnID09PSBrZXkpIHtcblxuICAgICAgICAgICAgICB0aGVSZXN1bHQgPSB0cnVlOyBcbiAgICAgICAgICAgICAgLy8gdXBkYXRlcyByZXF1ZXN0IG9iamVjdFxuICAgICAgICAgICAgICByZXF1ZXN0ID0ge307XG4gICAgICAgICAgICAgIC8vIGdldCB0aGUgaHJlZlxuICAgICAgICAgICAgICByZXF1ZXN0LmhyZWYgPSBcIlwiO1xuICAgICAgICAgICAgICAvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG4gICAgICAgICAgICAgIHJlcXVlc3QuaWQgPSBwb3N0ZGF0YS5zbHVnW2tleV07ICAgXG4gICAgICAgICAgICAgIC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuICAgICAgICAgICAgICByZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07ICAgICAgIFxuICAgICAgICAgICAgICAvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG4gICAgICAgICAgICAgIHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBcbiAgICAgICAgfSBcblxuICAgICAgICBpZiAodGhlUmVzdWx0KSB7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGluamVjdFNwaW5uZXIoKTtcbiAgICAgICAgICAgIC8vIGlmIGlzTG9hZGVkIGdyYWIgdGhlIGNodW5rIGZyb20gbG9jYWxTdG9yYWdlXG4gICAgICAgICAgICBhamF4Q2FsbChyZXF1ZXN0KTsgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICBcbiAgICAgICAgIC8vIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24oanJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsKTtcbiAgICAgICAgICAvLyAgZm9yIGJyb3dzZXJzeW5jIG9ubHkgLSBDSEFOR0UgVE86XG4gICAgICAgICAgXG4gICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24ocG9zdGRhdGEucm9vdF91cmwpOyAgICAgICAgICAgXG4gICAgICAgIH1cblxuXG4gICAgfSk7ICAgICBcdFxufTtcblxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVuZGVyVGVtcGxhdGVzKGRhdGEpIHtcblxuXHRjb25zb2xlLmxvZyhcInJlbmRlclRlbXBsYXRlc1wiKTtcblxuXHR2YXIgc2x1ZyA9IGRhdGEuc2x1Zztcblx0dmFyIGltYWdlVXJsID0gZGF0YS5hY2YuaGVhZGVyX2ltYWdlLnVybDtcblxuXHRmdW5jdGlvbiBvbkNvbXBsZXRlKCkge1xuXHRcdCQoXCIuaGVyb1wiKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsXCJ1cmwoXCIrIGltYWdlVXJsICtcIilcIik7XG5cdFx0XG5cdFx0Y29uc29sZS5sb2coaW1hZ2VVcmwpO1xuXHR9O1xuXG5cdCQoXCIjanNfcGFnZV9zaW5nbGVfaXRlbVwiKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHNsdWcpO1xuXG5cdCQoXCIjanNfcGFnZV9zaW5nbGVfaXRlbVwiKS5sb2FkVGVtcGxhdGUoJChcIiNpdGVtVGVtcGxhdGVcIiksIHtcblxuICAgICAgIFwidGl0bGVcIiA6IGRhdGEudGl0bGUucmVuZGVyZWQsXG4gICAgICAgXCJpbnRyb1wiIDogZGF0YS5hY2YubG9uZ19kZXNjcmlwdGlvbixcbiAgICAgICBcImhlcm9JbWFnZVwiIDogZGF0YS5hY2YuaGVhZGVyX2ltYWdlLnVybH0sIFxuICAgICAgIHsgY29tcGxldGU6IG9uQ29tcGxldGUgfSk7XHRcblxufTsiXX0=
