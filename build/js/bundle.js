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
var testAnimateJs = require('./modules/animations/animate_js/testAnimateJs');
testAnimateJs();



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
		wrapLetters(theTitle);

		
		animateHeading();


		var $animation_elements = $('#js_animate_heading');	
		var homepage = document.getElementById('homepage');
		inView(homepage, $animation_elements);

		var x = $('#testing');
		inView(homepage, x);






					
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



			// ajaxCall(request);


			// local testing 
			// delay for 500ms in case of fast ajax !
			window.setTimeout(function() {

				$('#js_loading').remove();
				fireTransition();

			}, 500);	

					


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
},{"./modules/Effeckt/captions":2,"./modules/Effeckt/core":3,"./modules/Effeckt/pageTransitions":4,"./modules/ajaxCall":5,"./modules/animations/animateHeading":6,"./modules/animations/animate_js/testAnimateJs":8,"./modules/animations/animation_utils/whichAnimationEvent":9,"./modules/animations/animation_utils/whichTransitionEvent":10,"./modules/animations/inView":11,"./modules/animations/wrapLetters":12,"./modules/domEls":14,"./modules/fireTransition":15,"./modules/injectSpinner":16,"./modules/isLoaded":17,"./modules/readAddressBar":19}],2:[function(require,module,exports){
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
},{"./buildTemplate":13,"./domEls":14,"./fireTransition":15,"./pageStateUpDate":18}],6:[function(require,module,exports){
var wrapLetters = require('./wrapLetters');

module.exports = function animateHead() {

	var heading = document.getElementById('js_animate_heading');

	wrapLetters(heading);

	var letters = document.getElementById('js_animate_heading').getElementsByClassName('letter');

	var n = 0;

	for (var i = 0; i < letters.length; i++) {		
		letters[i].style.transition = 'opacity ' + n + 'ms ease';
		n+= 100;
	}

};
},{"./wrapLetters":12}],7:[function(require,module,exports){
// https://github.com/bendc/animate
var animate=function(){var d={delay:0,duration:400,easing:"ease"},g=function(){return Array.prototype.includes?function(b,a){return b.includes(a)}:function(b,a){return b.some(function(b){return b===a})}}(),h=function(){var b=function(a){return/\D$/.test(a)?a:a+"ms"};return function(a,c){var f={property:"opacity,"+e(),duration:b(c.duration||d.duration),"timing-function":c.easing||d.easing,delay:b(c.delay||d.delay)};Object.keys(f).forEach(function(b){a.style["transition-"+b]=f[b]})}}(),k=function(b){var a=
function(c){c.target.removeEventListener("transitionend",a);b.complete&&b.complete.call(c.target)};return a},l=function(b,a){void 0!=a.opacity&&(b.style.opacity=a.opacity)},e=function(){var b;return function(){b||(b="transform"in document.body.style?"transform":"-webkit-transform");return b}}(),m=function(){var b=["complete","el","opacity"].concat(Object.keys(d));return function(a){return!g(b,a)}}(),n=function(b){return Object.keys(b).filter(function(a){return m(a)})},p=function(){return function(b,
a){var c=n(a);c.length&&(b.style[e()]=c.map(function(b){var c;c=a[b];c=/\D$/.test(c)||/scale/.test(b)?c:/rotate|skew/.test(b)?c+"deg":c+"px";return b+"("+c+")"}).join(" "))}}(),q=function(b){return function(a){requestAnimationFrame(function(){[h,l,p].forEach(function(c){c(a,b)})});a.addEventListener("transitionend",k(b))}};return function(b){return function(a){"object"==typeof a&&b(a)}}(function(b){var a=b.el;if("string"==typeof a)var c=document,a=/^[\#.]?[\w-]+$/.test(a)?"."==a[0]?c.getElementsByClassName(a.slice(1)):
"#"==a[0]?c.getElementById(a.slice(1)):c.getElementsByTagName(a):c.querySelectorAll(a);(a.nodeType?[a]:Array.isArray(a)?a:[].slice.call(a)).forEach(q(b))})}();

module.exports =  animate;
},{}],8:[function(require,module,exports){
var animate = require('./animate');

module.exports = function testAnimateJs() {
	var ul = document.getElementById('js_test');
	var li = ul.getElementsByTagName('li');

	animate({
	  el: li[0],
	  rotateX: 190,
	  opacity: .5,
	  duration: 500,
	  complete: function() { 
	  	console.log("Done!"); 
	  }
	});

};
},{"./animate":7}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
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
},{"../domEls":14}],12:[function(require,module,exports){
module.exports = function wrapLetters(el) {
	return el.innerHTML = el.textContent.split("").map(function (letter) {
		return '<span class=letter>' + letter + '</span>';
	}).join("");	
};
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
var domEls = {
	"animation_elements" : $('#js_animate_head'),
	"page_container" : $('#js_page_single_item'),
	"back_to_menu_btn" : $('#js_back_to_menu'),
	"spinner" : $('<div id="js_loading"><div class="spinner"></div></div>')
};


module.exports = domEls;
},{}],15:[function(require,module,exports){
module.exports = function fireTransition() {
	$('.effeckt .the-btn').trigger('click');
};
},{}],16:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function injectSpinner() {
	$('body').append(domEls.spinner);	
};
},{"./domEls":14}],17:[function(require,module,exports){
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
},{}],18:[function(require,module,exports){
module.exports = function pageStateUpDate(data, page_state) {

	page_state.loaded_pages.push({
		"page_id" : data.id,
		"page_slug" : data.slug,
		"page_url" : data.link,
		"json_link" : data._links.self[0].href			
	});

	return page_state;
};
},{}],19:[function(require,module,exports){
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




},{"./ajaxCall":5,"./domEls":14,"./injectSpinner":16,"./isLoaded":17}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvY2FwdGlvbnMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvRWZmZWNrdC9jb3JlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0ZUhlYWRpbmcuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlX2pzL2FuaW1hdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlX2pzL3Rlc3RBbmltYXRlSnMuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRpb25fdXRpbHMvd2hpY2hBbmltYXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaFRyYW5zaXRpb25FdmVudC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL2luVmlldy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2J1aWxkVGVtcGxhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvZG9tRWxzLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2ZpcmVUcmFuc2l0aW9uLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2luamVjdFNwaW5uZXIuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBDYWNoZSByZWZlcmVuY2UgdG8gRE9NIGVsZW1lbnRzICovXG52YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2RvbUVscycpO1xuXG5cbi8qIEFuaW1hdGlvbnMgKi9cbnZhciBpblZpZXcgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9pblZpZXcnKTtcbnZhciB3cmFwTGV0dGVycyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL3dyYXBMZXR0ZXJzJyk7XG52YXIgYW5pbWF0ZUhlYWRpbmcgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9hbmltYXRlSGVhZGluZycpO1xudmFyIHdoaWNoVHJhbnNpdGlvbkV2ZW50ID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvYW5pbWF0aW9uX3V0aWxzL3doaWNoVHJhbnNpdGlvbkV2ZW50Jyk7XG52YXIgd2hpY2hBbmltYXRpb25FdmVudCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGlvbl91dGlscy93aGljaEFuaW1hdGlvbkV2ZW50Jyk7XG5cbi8qXG5nZXQgY2FsbGJhY2tzIGZyb20gY3NzIGFuaW1hdGlvbnM6IGh0dHBzOi8vZGF2aWR3YWxzaC5uYW1lL2Nzcy1hbmltYXRpb24tY2FsbGJhY2tcblxudmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2VsJyk7IC8vIGdldCBzb21lIGVsZW1lbnRcblx0XG4vLyBzdG9yZSB0aGUgYW5pbWF0aW9uIC8gdHJhbnNpdGlvbiBlbmQgZXZlbnQgLSBhZGQgdG8gZ2xvYmFsIG9iamVjdD8gXG52YXIgdGhlRXZlbnQgPSB3aGljaEFuaW1hdGlvbkV2ZW50KCk7XG5cbi8vIGFkZCBsaXN0bmVyIGFuZCBjYWxsYmFja1xudGhlRXZlbnQgJiYgZWwuYWRkRXZlbnRMaXN0ZW5lcih0aGVFdmVudCwgZnVuY3Rpb24oKSB7XG5cdGNvbnNvbGUubG9nKCdUcmFuc2l0aW9uIGNvbXBsZXRlISAgVGhpcyBpcyB0aGUgY2FsbGJhY2ssIG5vIGxpYnJhcnkgbmVlZGVkIScpO1xufSk7XG5cbiovXG5cblxuXG5cbi8qIHRlc3RpbmcgYW5pbWF0ZS5qcyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9iZW5kYy9hbmltYXRlICovXG52YXIgdGVzdEFuaW1hdGVKcyA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hbmltYXRpb25zL2FuaW1hdGVfanMvdGVzdEFuaW1hdGVKcycpO1xudGVzdEFuaW1hdGVKcygpO1xuXG5cblxuLyogRWZmZWNrdCAqL1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL21vZHVsZXMvRWZmZWNrdC9jb3JlJyk7XG52YXIgcGFnZVRyYW5zaXRpb25zID0gcmVxdWlyZSgnLi9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zJyk7XG52YXIgY2FwdGlvbnMgPSByZXF1aXJlKCcuL21vZHVsZXMvRWZmZWNrdC9jYXB0aW9ucycpO1xuLy8gaW5pdCBFZmZlY2t0XG5jb3JlKCk7XG5wYWdlVHJhbnNpdGlvbnMoKTtcbmNhcHRpb25zKCk7XG5cblxuXG4vKiBsb2FkaW5nIHdvcmsgcGFnZXMgKi9cbnZhciBpbmplY3RTcGlubmVyID0gcmVxdWlyZSgnLi9tb2R1bGVzL2luamVjdFNwaW5uZXInKTtcbnZhciBhamF4Q2FsbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hamF4Q2FsbCcpO1xudmFyIHJlYWRBZGRyZXNzQmFyID0gcmVxdWlyZSgnLi9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyJyk7XG52YXIgaXNMb2FkZWQgPSByZXF1aXJlKCcuL21vZHVsZXMvaXNMb2FkZWQnKTtcbi8vIHZhciB0cmFuc2l0aW9uVG9QYWdlID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RyYW5zaXRpb25Ub1BhZ2UnKTtcbi8vIHZhciB0cmFuc2l0aW9uQmFja1RvTWVudSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90cmFuc2l0aW9uQmFja1RvTWVudScpO1xudmFyIGZpcmVUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9tb2R1bGVzL2ZpcmVUcmFuc2l0aW9uJyk7XG5cblxuXG5cblxuXG4vLyBHTE9CQUwgRk9SIERFVlxucmVxdWVzdCA9IHt9O1xuXG4vLyBHTE9CQUwgRk9SIERFVlxucGFnZV9zdGF0ZSA9IHtcblx0XCJsb2FkZWRfcGFnZXNcIiA6IFtdLFxuXHRcImZyb21QYWdlXCIgOiBcIlwiLFxuXHRcInRvUGFnZVwiIDogXCJcIlxufTtcblxuLy8gRVhBTVBMRVNcblxuLy8gcG9zdGRhdGEge1xuLy8gXHRqc29uX3VybCA6IHtcbi8vIFx0XHQyOCA6ICBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy8yOFwiLFxuLy8gXHRcdDMwOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy8zMFwiXG4vLyBcdH0sXG4vLyBcdHJvb3RfdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG9cIixcbi8vXHRzbHVnOiB7XG4vL1x0XHRcImFjZVwiIDogMjgsXG4vL1x0XHRcImJvY1wiIDogMzBcbi8vIFx0fVxuLy8gfVxuXG4vLyByZXF1ZXN0ID0ge1xuLy8gXHRcImhyZWZcIiA6IFwiXCIsXG4vLyBcdFwiaWRcIiA6IDAsXG4vLyBcdFwiaWRfc3RyXCIgOiBcIlwiLFxuLy8gXHRcImpzb25fdXJsXCIgOiBcIlwiXHRcbi8vIH07XG5cblxuLy8gXCJsb2FkZWRfcGFnZXNcIiA6IFtcbi8vIFx0e1xuLy8gXHRcdGpzb25fbGluazogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvOFwiXG4vLyBcdFx0cGFnZV9pZDogOFxuLy8gXHRcdHBhZ2Vfc2x1ZzogXCJiaXJkcy1vZi1iZXJrc2hpcmUtYXRsYXNcIlxuLy8gXHRcdHBhZ2VfdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vYmlyZHMtb2YtYmVya3NoaXJlLWF0bGFzL1wiXHRcdFx0XG4vLyBcdH1cbi8vIF1cblxuXG4oZnVuY3Rpb24oJCkge1x0XG5cblx0JChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cblx0XHQvKiBTRVQgVVAgQU5JTUFUSU9OUyAqL1xuXHRcdHZhciB0aGVUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX3RpdGxlJyk7XG5cdFx0d3JhcExldHRlcnModGhlVGl0bGUpO1xuXG5cdFx0XG5cdFx0YW5pbWF0ZUhlYWRpbmcoKTtcblxuXG5cdFx0dmFyICRhbmltYXRpb25fZWxlbWVudHMgPSAkKCcjanNfYW5pbWF0ZV9oZWFkaW5nJyk7XHRcblx0XHR2YXIgaG9tZXBhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG9tZXBhZ2UnKTtcblx0XHRpblZpZXcoaG9tZXBhZ2UsICRhbmltYXRpb25fZWxlbWVudHMpO1xuXG5cdFx0dmFyIHggPSAkKCcjdGVzdGluZycpO1xuXHRcdGluVmlldyhob21lcGFnZSwgeCk7XG5cblxuXG5cblxuXG5cdFx0XHRcdFx0XG5cdFx0JCgnLndvcmtfbWVudV9saW5rJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0Ly8gdXBkYXRlcyByZXF1ZXN0IG9iamVjdFxuXHRcdFx0cmVxdWVzdCA9IHt9O1xuXHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcdFx0XHRcblx0XHRcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFx0XG5cblx0XHRcdGluamVjdFNwaW5uZXIoKTtcblxuXHRcdFx0Ly8gaWYgaXNMb2FkZWQgZ3JhYiB0aGUgY2h1bmsgZnJvbSBsb2NhbFN0b3JhZ2VcblxuXG5cblx0XHRcdC8vIGFqYXhDYWxsKHJlcXVlc3QpO1xuXG5cblx0XHRcdC8vIGxvY2FsIHRlc3RpbmcgXG5cdFx0XHQvLyBkZWxheSBmb3IgNTAwbXMgaW4gY2FzZSBvZiBmYXN0IGFqYXggIVxuXHRcdFx0d2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcblx0XHRcdFx0ZmlyZVRyYW5zaXRpb24oKTtcblxuXHRcdFx0fSwgNTAwKTtcdFxuXG5cdFx0XHRcdFx0XG5cblxuXHRcdFx0aWYgKE1vZGVybml6ci5oaXN0b3J5KSB7XG5cdFx0XHQgXHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCByZXF1ZXN0LmhyZWYpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblxuXHRcdC8qIEJBQ0sgVE8gTUVOVSAqL1xuXHRcdGRvbUVscy5iYWNrX3RvX21lbnVfYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIFx0XHRcdFx0XG5cdCAgICAgICAgLy8gZm9yIGJyb3dzZXJzeW5jIG9ubHkgLSBDSEFOR0UgVE86XG5cdCAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIHBvc3RkYXRhLnJvb3RfdXJsICk7XG5cdCAgICAgICAgXG5cdFx0XHQvLyBoaXN0b3J5LnB1c2hTdGF0ZSggbnVsbCwgbnVsbCwganJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsICk7XG5cdFx0fSk7XG5cblxuXG5cblxuXG5cblx0XHQvKiBUT0RPIC0gQlJPV1NFUlMgQkFDSyBCVVRUT04gKi9cblxuXHRcdC8vIHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpO1xuXHRcdC8vIGFkZHMgdGhlIHBvcHN0YXRlIGV2ZW50IGhhbmRsZXIgXG5cdFx0Ly8gbmVlZHMgcmV2aXNpb25cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cdFx0LyogVE9ETyAtIEhPVkVSICovXG5cdFx0Ly8gaWYgbm8gdG91Y2ggd2UgY2FuIGFudGljaXBhdGUgYSBjbGljayBhbmQgZmlyZSBhamF4Q2FsbCBvbiBtb3VzZW92ZXIgb2YgbWVudSBsaW5rc1xuXHRcdC8vIGlmICghTW9kZXJuaXpyLnRvdWNoZXZlbnRzKSB7XG5cblx0XHQvLyBcdCQoJyNhcHAnKS5vbignbW91c2VvdmVyJywgJ2EnLCBmdW5jdGlvbigpIHtcblxuXHRcdC8vIFx0XHRyZXF1ZXN0ID0ge307XG5cdFx0Ly8gXHRcdC8vIGdldCB0aGUgaHJlZlxuXHRcdC8vIFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdC8vIFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHQvLyBcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0Ly8gXHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFx0XHRcdFxuXHRcdC8vIFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0Ly8gXHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcblxuXHRcdC8vIFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0Ly8gXHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0Ly8gXHRcdH1cblxuXHRcdC8vIFx0fSk7XG5cdFx0Ly8gfVxuXG5cblxuXG5cdFx0LyogRklSU1QgQVRURU1QVCAtIENMSUNLICovXG5cblx0XHQvLyAkKCcjYXBwJykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0Ly8gXHRhbGVydChcInd0ZlwiKTtcblxuXHRcdC8vIFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcdFx0XG5cblx0XHQvLyBcdHJlcXVlc3QgPSB7fTtcdFx0XHRcdFxuXHRcdC8vIFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0Ly8gXHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdC8vIFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdC8vIFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdC8vIFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0Ly8gXHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcblx0XHQvLyBcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHQvLyBcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFxuXHRcdFx0XHRcdFxuXHRcdC8vIFx0Ly8gaXMgaXQgYWxyZWFkeSBsb2FkZWQgaW50byBET00/IENoZWNrIHRoZSBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcyBhcnJheVxuXHRcdC8vIFx0aWYgKCAhaXNMb2FkZWQocmVxdWVzdC5pZCwgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMsIHJlcXVlc3QpICkge1xuXHRcdC8vIFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblx0XHQvLyBcdH1cblx0XHRcblx0XHQvLyBcdGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdC8vIFx0IFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHQvLyBcdH1cblxuXHRcdC8vIH0pO1xuXG5cblxuXHRcdFxuXG5cblx0XHRcblxuXG5cdH0pO1xuXG5cbn0pKGpRdWVyeSk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYXB0aW9ucygpIHtcblxuICAvKiFcbiAgICogY2FwdGlvbnMuanNcbiAgICpcbiAgICogYXV0aG9yOiBFZmZlY2t0LmNzc1xuICAgKlxuICAgKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAgICovXG5cbiAgdmFyIGVmZmVja3RDYXB0aW9ucyA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5iaW5kVUlBY3Rpb25zKCk7XG4gICAgfSxcblxuICAgIGJpbmRVSUFjdGlvbnM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzOyAvL2tlZXAgYSByZWZlcmVuY2UgdG8gdGhpcyAoQ2FwdGlvbnMpIG9iamVjdC5cblxuICAgICAgJCgnW2RhdGEtZWZmZWNrdC10eXBlXScpLm9uKEVmZmVja3QuYnV0dG9uUHJlc3NlZEV2ZW50LCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBzZWxmLmFjdGl2YXRlQ2FwdGlvbnModGhpcyk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgYWN0aXZhdGVDYXB0aW9uczogZnVuY3Rpb24oZWwpIHtcbiAgICAgIHZhciBhY3RpdmVDbGFzcyA9ICdhY3RpdmUnO1xuXG4gICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QudG9nZ2xlKGFjdGl2ZUNsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciAkY2FwdGlvbiA9ICQoZWwpO1xuICAgICAgICAkY2FwdGlvbi50b2dnbGVDbGFzcyhhY3RpdmVDbGFzcyk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGVmZmVja3RDYXB0aW9ucy5pbml0KCk7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb3JlKCkge1xuXG47KGZ1bmN0aW9uKHdpbmRvdyl7XG5cbiAgdmFyXG4gICAgLy8gSXMgTW9kZXJuaXpyIGRlZmluZWQgb24gdGhlIGdsb2JhbCBzY29wZVxuICAgIE1vZGVybml6ciA9IHR5cGVvZiBNb2Rlcm5penIgIT09IFwidW5kZWZpbmVkXCIgPyBNb2Rlcm5penIgOiBmYWxzZSxcblxuICAgIC8vIEFsd2F5cyBleHBlY3QgYm90aCBraW5kcyBvZiBldmVudFxuICAgIGJ1dHRvblByZXNzZWRFdmVudCA9ICd0b3VjaHN0YXJ0IGNsaWNrJyxcblxuICAgIC8vIExpc3Qgb2YgYWxsIGFuaW1hdGlvbi90cmFuc2l0aW9uIHByb3BlcnRpZXNcbiAgICAvLyB3aXRoIGl0cyBhbmltYXRpb25FbmQvdHJhbnNpdGlvbkVuZCBldmVudFxuICAgIGFuaW1hdGlvbkVuZEV2ZW50TmFtZXMgPSB7XG4gICAgICAnV2Via2l0QW5pbWF0aW9uJyA6ICd3ZWJraXRBbmltYXRpb25FbmQnLFxuICAgICAgJ09BbmltYXRpb24nIDogJ29BbmltYXRpb25FbmQnLFxuICAgICAgJ21zQW5pbWF0aW9uJyA6ICdNU0FuaW1hdGlvbkVuZCcsXG4gICAgICAnYW5pbWF0aW9uJyA6ICdhbmltYXRpb25lbmQnXG4gICAgfSxcblxuICAgIHRyYW5zaXRpb25FbmRFdmVudE5hbWVzID0ge1xuICAgICAgJ1dlYmtpdFRyYW5zaXRpb24nIDogJ3dlYmtpdFRyYW5zaXRpb25FbmQnLFxuICAgICAgJ09UcmFuc2l0aW9uJyA6ICdvVHJhbnNpdGlvbkVuZCcsXG4gICAgICAnbXNUcmFuc2l0aW9uJyA6ICdNU1RyYW5zaXRpb25FbmQnLFxuICAgICAgJ3RyYW5zaXRpb24nIDogJ3RyYW5zaXRpb25lbmQnXG4gICAgfSxcblxuICAgIEVmZmVja3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH07XG5cbiAgLy8gQ3VycmVudCB2ZXJzaW9uLlxuICBFZmZlY2t0LnZlcnNpb24gPSAnMC4wLjEnO1xuXG4gIC8vIEluaXRpYWxpemF0aW9uIG1ldGhvZFxuICBFZmZlY2t0LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5idXR0b25QcmVzc2VkRXZlbnQgPSBidXR0b25QcmVzc2VkRXZlbnQ7XG5cbiAgICAvL2V2ZW50IHRyaWdnZXIgYWZ0ZXIgYW5pbWF0aW9uL3RyYW5zaXRpb24gZW5kLlxuICAgIHRoaXMudHJhbnNpdGlvbkVuZEV2ZW50TmFtZSA9IE1vZGVybml6ciA/IHRyYW5zaXRpb25FbmRFdmVudE5hbWVzW01vZGVybml6ci5wcmVmaXhlZCgndHJhbnNpdGlvbicpXSA6IGdldFRyYW5zaXRpb25FbmRFdmVudE5hbWVzKCk7XG4gICAgdGhpcy5hbmltYXRpb25FbmRFdmVudE5hbWUgID0gTW9kZXJuaXpyID8gYW5pbWF0aW9uRW5kRXZlbnROYW1lc1tNb2Rlcm5penIucHJlZml4ZWQoJ2FuaW1hdGlvbicpXSA6IGdldEFuaW1hdGlvbkVuZEV2ZW50TmFtZXMoKTtcbiAgICB0aGlzLnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCA9IHRoaXMuYW5pbWF0aW9uRW5kRXZlbnROYW1lICsgJyAnICsgdGhpcy50cmFuc2l0aW9uRW5kRXZlbnROYW1lO1xuICB9O1xuXG4gIEVmZmVja3QucHJvdG90eXBlLmdldFZpZXdwb3J0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZG9jRWxlbWVudCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgIGNsaWVudCA9IGRvY0VsZW1lbnRbJ2NsaWVudEhlaWdodCddLFxuICAgICAgaW5uZXIgPSB3aW5kb3dbJ2lubmVySGVpZ2h0J107XG5cbiAgICBpZiggY2xpZW50IDwgaW5uZXIgKVxuICAgICAgcmV0dXJuIGlubmVyO1xuICAgIGVsc2VcbiAgICAgIHJldHVybiBjbGllbnQ7XG4gIH07XG5cbiAgLy8gR2V0IGFsbCB0aGUgcHJvcGVydGllcyBmb3IgdHJhbnNpdGlvbi9hbmltYXRpb24gZW5kXG4gIGZ1bmN0aW9uIGdldFRyYW5zaXRpb25FbmRFdmVudE5hbWVzKCkge1xuICAgIHJldHVybiBfZ2V0RW5kRXZlbnROYW1lcyggdHJhbnNpdGlvbkVuZEV2ZW50TmFtZXMgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFuaW1hdGlvbkVuZEV2ZW50TmFtZXMoKSB7XG4gICAgcmV0dXJuIF9nZXRFbmRFdmVudE5hbWVzKCBhbmltYXRpb25FbmRFdmVudE5hbWVzICk7XG4gIH1cblxuICBmdW5jdGlvbiBfZ2V0RW5kRXZlbnROYW1lcyhvYmopIHtcbiAgICB2YXIgZXZlbnRzID0gW107XG5cbiAgICBmb3IgKCB2YXIgZXZlbnROYW1lIGluIG9iaiApIHtcbiAgICAgIGV2ZW50cy5wdXNoKCBvYmpbIGV2ZW50TmFtZSBdICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV2ZW50cy5qb2luKCcgJyk7XG4gIH1cblxuICAvLyBDcmVhdGVzIGEgRWZmZWNrdCBvYmplY3QuXG4gIHdpbmRvdy5FZmZlY2t0ID0gbmV3IEVmZmVja3QoKTtcblxufSkodGhpcyk7XG5cblx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFnZVRyYW5zaXRpb25zKCkge1xuXG52YXIgRWZmZWNrdFBhZ2VUcmFuc2l0aW9ucyA9IHtcblxuICBmcm9tUGFnZTogJycsXG4gIHRvUGFnZTogJycsXG4gIGlzQW5pbWF0aW5nOiBmYWxzZSxcbiAgaXNOZXh0UGFnZUVuZDogZmFsc2UsXG4gIGlzQ3VycmVudFBhZ2VFbmQ6IGZhbHNlLFxuICB0cmFuc2l0aW9uSW5FZmZlY3Q6ICcnLFxuICB0cmFuc2l0aW9uT3V0RWZmZWN0OiAnJyxcblxuICBpbml0OiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaW5pdFBhZ2VzKCk7XG4gICAgdGhpcy5iaW5kVUlBY3Rpb25zKCk7XG5cbiAgfSxcblxuICBpbml0UGFnZXM6IGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgJHBhZ2VzID0gJCgnW2RhdGEtZWZmZWNrdC1wYWdlXScpO1xuXG4gICAgdGhpcy5mcm9tUGFnZSA9ICRwYWdlcy5maXJzdCgpLmFkZENsYXNzKCdlZmZlY2t0LXBhZ2UtYWN0aXZlJyk7XG5cbiAgfSxcblxuICBiaW5kVUlBY3Rpb25zOiBmdW5jdGlvbigpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICQoJy5lZmZlY2t0LXBhZ2UtdHJhbnNpdGlvbi1idXR0b24nKS5vbiggRWZmZWNrdC5idXR0b25QcmVzc2VkRXZlbnQsIGZ1bmN0aW9uKGUpe1xuXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIHZhciB0cmFuc2l0aW9uSW5FZmZlY3QgID0gJCh0aGlzKS5kYXRhKCdlZmZlY2t0LXRyYW5zaXRpb24taW4nKSxcbiAgICAgICAgICB0cmFuc2l0aW9uT3V0RWZmZWN0ID0gJCh0aGlzKS5kYXRhKCdlZmZlY2t0LXRyYW5zaXRpb24tb3V0JyksXG4gICAgICAgICAgdHJhbnNpdGlvblBhZ2UgICAgICA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLXBhZ2UnKTtcblxuICAgICAgaWYgKCAkKHRoaXMpLmRhdGEoXCJlZmZlY2t0LW5lZWRzLXBlcnNwZWN0aXZlXCIpKSB7XG4gICAgICAgICQoXCJodG1sXCIpLmFkZENsYXNzKFwibWQtcGVyc3BlY3RpdmVcIik7XG4gICAgICB9XG5cbiAgICAgIHNlbGYudHJhbnNpdGlvblBhZ2UoIHRyYW5zaXRpb25QYWdlLCB0cmFuc2l0aW9uSW5FZmZlY3QsIHRyYW5zaXRpb25PdXRFZmZlY3QgKTtcblxuICAgIH0pO1xuICB9LFxuXG4gIHRyYW5zaXRpb25QYWdlOiBmdW5jdGlvbiggdHJhbnNpdGlvblBhZ2UsIHRyYW5zaXRpb25JbkVmZmVjdCwgdHJhbnNpdGlvbk91dEVmZmVjdCApIHtcblxuICAgIGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgfVxuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gICAgdGhpcy5pc0N1cnJlbnRQYWdlRW5kID0gZmFsc2U7XG4gICAgdGhpcy5pc05leHRQYWdlRW5kID0gZmFsc2U7XG4gICAgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QgPSB0cmFuc2l0aW9uSW5FZmZlY3Q7XG4gICAgdGhpcy50cmFuc2l0aW9uT3V0RWZmZWN0PSB0cmFuc2l0aW9uT3V0RWZmZWN0O1xuXG4gICAgLy8gR2V0IFBhZ2VzXG4gICAgdGhpcy5mcm9tUGFnZSA9ICQoJ1tkYXRhLWVmZmVja3QtcGFnZV0uZWZmZWNrdC1wYWdlLWFjdGl2ZScpO1xuICAgIHRoaXMudG9QYWdlICAgPSAkKCdbZGF0YS1lZmZlY2t0LXBhZ2U9XCInICsgdHJhbnNpdGlvblBhZ2UgKyAnXCJdJyk7XG5cbiAgICAvLyBBZGQgdGhpcyBjbGFzcyB0byBwcmV2ZW50IHNjcm9sbCB0byBiZSBkaXNwbGF5ZWRcbiAgICB0aGlzLnRvUGFnZS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyBlZmZlY2t0LXBhZ2UtYWN0aXZlICcgKyB0aGlzLnRyYW5zaXRpb25JbkVmZmVjdCk7XG4gICAgdGhpcy5mcm9tUGFnZS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZycpO1xuXG4gICAgLy8gU2V0IFRyYW5zaXRpb24gQ2xhc3NcbiAgICB0aGlzLmZyb21QYWdlLmFkZENsYXNzKHRoaXMudHJhbnNpdGlvbk91dEVmZmVjdCk7XG4gICAgXG4gICAgdmFyIHNlbGY9IHRoaXM7XG4gICAgXG4gICAgdGhpcy50b1BhZ2Uub24oIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbigpIHtcbiAgICAgIFxuICAgICAgc2VsZi50b1BhZ2Uub2ZmKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCApO1xuICAgICAgc2VsZi5pc05leHRQYWdlRW5kID0gdHJ1ZTtcblxuICAgICAgaWYgKCBzZWxmLmlzQ3VycmVudFBhZ2VFbmQgKSB7XG4gICAgICAgIHNlbGYucmVzZXRUcmFuc2l0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmZyb21QYWdlLm9uKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24gKCkge1xuXG4gICAgICBzZWxmLmZyb21QYWdlLm9mZiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgKTtcbiAgICAgIHNlbGYuaXNDdXJyZW50UGFnZUVuZCA9IHRydWU7XG5cbiAgICAgIGlmICggc2VsZi5pc05leHRQYWdlRW5kICkge1xuICAgICAgICBzZWxmLnJlc2V0VHJhbnNpdGlvbigpO1xuICAgICAgfVxuXG4gICAgfSk7XG5cbiAgfSxcblxuICByZXNldFRyYW5zaXRpb246IGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIHRoaXMuaXNDdXJyZW50UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNOZXh0UGFnZUVuZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5mcm9tUGFnZS5yZW1vdmVDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyBlZmZlY2t0LXBhZ2UtYWN0aXZlICcgKyB0aGlzLnRyYW5zaXRpb25PdXRFZmZlY3QpOy8vLmhpZGUoKTtcbiAgICB0aGlzLnRvUGFnZS5yZW1vdmVDbGFzcygnZWZmZWNrdC1wYWdlLWFuaW1hdGluZyAnICsgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QpO1xuXG4gICAgJChcImh0bWxcIikucmVtb3ZlQ2xhc3MoXCJtZC1wZXJzcGVjdGl2ZVwiKTtcbiAgfVxuXG59O1xuXG5FZmZlY2t0UGFnZVRyYW5zaXRpb25zLmluaXQoKTtcdFxuXHRcbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG52YXIgYnVpbGRUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vYnVpbGRUZW1wbGF0ZScpO1xudmFyIHBhZ2VTdGF0ZVVwRGF0ZSA9IHJlcXVpcmUoJy4vcGFnZVN0YXRlVXBEYXRlJyk7XG52YXIgZmlyZVRyYW5zaXRpb24gPSByZXF1aXJlKCcuL2ZpcmVUcmFuc2l0aW9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYWpheENhbGwocmVxdWVzdCkge1xuXG5cdCQuYWpheCh7XG5cdCAgICB1cmw6IHJlcXVlc3QuanNvbl91cmwsXG5cdCAgICBkYXRhVHlwZTogJ2pzb24nXG5cdH0pXG5cblx0LmRvbmUoZnVuY3Rpb24oZGF0YSl7XHRcblxuXHRcdC8vIGNsZWFyIGN1cnJlbnQgY29udGVudCAtIHRoaXMgY291bGQgYmUgc3RvcmVkXG5cdFx0ZG9tRWxzLnBhZ2VfY29udGFpbmVyLmVtcHR5KCk7XG5cblx0XHQvLyB1cGRhdGUgcGFnZV9zdGF0ZSBvYmplY3Rcblx0XHRwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSk7XHRcdFx0XHRcdFxuXHRcdFxuXHRcdC8vIHRlbXBsYXRlIHRoZSBkYXRhXG5cdFx0dmFyIGNodW5rID0gYnVpbGRUZW1wbGF0ZShkYXRhKTtcblxuXHRcdC8vIGluc2VydCBpbnRvIHRoZSBET01cdFx0XG5cdFx0ZG9tRWxzLnBhZ2VfY29udGFpbmVyLmFwcGVuZChjaHVuayk7XG5cblx0XHQvLyBkZWxheSBmb3IgNTAwbXMgaW4gY2FzZSBvZiBmYXN0IGFqYXggIVxuXHRcdHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHQkKCcjanNfbG9hZGluZycpLnJlbW92ZSgpO1xuICAgIFx0XHRmaXJlVHJhbnNpdGlvbigpO1xuXG5cdFx0fSwgNTAwKTtcblx0XHRcblx0XG5cdFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5naWZ5XG5cdFx0Ly8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYWdlX1wiICsgcmVxdWVzdC5pZCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdFxuXHRcdC8vIGlmIChNb2Rlcm5penIubG9jYWxzdG9yYWdlKSB7XG5cdFx0Ly8gXHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdcblx0XHQvLyBcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYWdlXycgKyByZXF1ZXN0LmlkLCBjaHVua1swXS5pbm5lckhUTUwpO1x0XHRcdFx0XG5cdFx0Ly8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdH0pXG5cblx0LmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coJ2Vycm9yJyk7XG5cdFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcblx0XHQvLyBhbGVydChcImVycm9yXCIpO1xuXHR9KVxuXG5cdC5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2NvbXBsZXRlIScpO1xuXHR9KTtcdFxuXG59OyIsInZhciB3cmFwTGV0dGVycyA9IHJlcXVpcmUoJy4vd3JhcExldHRlcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbmltYXRlSGVhZCgpIHtcblxuXHR2YXIgaGVhZGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX2hlYWRpbmcnKTtcblxuXHR3cmFwTGV0dGVycyhoZWFkaW5nKTtcblxuXHR2YXIgbGV0dGVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqc19hbmltYXRlX2hlYWRpbmcnKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdsZXR0ZXInKTtcblxuXHR2YXIgbiA9IDA7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsZXR0ZXJzLmxlbmd0aDsgaSsrKSB7XHRcdFxuXHRcdGxldHRlcnNbaV0uc3R5bGUudHJhbnNpdGlvbiA9ICdvcGFjaXR5ICcgKyBuICsgJ21zIGVhc2UnO1xuXHRcdG4rPSAxMDA7XG5cdH1cblxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vYmVuZGMvYW5pbWF0ZVxudmFyIGFuaW1hdGU9ZnVuY3Rpb24oKXt2YXIgZD17ZGVsYXk6MCxkdXJhdGlvbjo0MDAsZWFzaW5nOlwiZWFzZVwifSxnPWZ1bmN0aW9uKCl7cmV0dXJuIEFycmF5LnByb3RvdHlwZS5pbmNsdWRlcz9mdW5jdGlvbihiLGEpe3JldHVybiBiLmluY2x1ZGVzKGEpfTpmdW5jdGlvbihiLGEpe3JldHVybiBiLnNvbWUoZnVuY3Rpb24oYil7cmV0dXJuIGI9PT1hfSl9fSgpLGg9ZnVuY3Rpb24oKXt2YXIgYj1mdW5jdGlvbihhKXtyZXR1cm4vXFxEJC8udGVzdChhKT9hOmErXCJtc1wifTtyZXR1cm4gZnVuY3Rpb24oYSxjKXt2YXIgZj17cHJvcGVydHk6XCJvcGFjaXR5LFwiK2UoKSxkdXJhdGlvbjpiKGMuZHVyYXRpb258fGQuZHVyYXRpb24pLFwidGltaW5nLWZ1bmN0aW9uXCI6Yy5lYXNpbmd8fGQuZWFzaW5nLGRlbGF5OmIoYy5kZWxheXx8ZC5kZWxheSl9O09iamVjdC5rZXlzKGYpLmZvckVhY2goZnVuY3Rpb24oYil7YS5zdHlsZVtcInRyYW5zaXRpb24tXCIrYl09ZltiXX0pfX0oKSxrPWZ1bmN0aW9uKGIpe3ZhciBhPVxuZnVuY3Rpb24oYyl7Yy50YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRyYW5zaXRpb25lbmRcIixhKTtiLmNvbXBsZXRlJiZiLmNvbXBsZXRlLmNhbGwoYy50YXJnZXQpfTtyZXR1cm4gYX0sbD1mdW5jdGlvbihiLGEpe3ZvaWQgMCE9YS5vcGFjaXR5JiYoYi5zdHlsZS5vcGFjaXR5PWEub3BhY2l0eSl9LGU9ZnVuY3Rpb24oKXt2YXIgYjtyZXR1cm4gZnVuY3Rpb24oKXtifHwoYj1cInRyYW5zZm9ybVwiaW4gZG9jdW1lbnQuYm9keS5zdHlsZT9cInRyYW5zZm9ybVwiOlwiLXdlYmtpdC10cmFuc2Zvcm1cIik7cmV0dXJuIGJ9fSgpLG09ZnVuY3Rpb24oKXt2YXIgYj1bXCJjb21wbGV0ZVwiLFwiZWxcIixcIm9wYWNpdHlcIl0uY29uY2F0KE9iamVjdC5rZXlzKGQpKTtyZXR1cm4gZnVuY3Rpb24oYSl7cmV0dXJuIWcoYixhKX19KCksbj1mdW5jdGlvbihiKXtyZXR1cm4gT2JqZWN0LmtleXMoYikuZmlsdGVyKGZ1bmN0aW9uKGEpe3JldHVybiBtKGEpfSl9LHA9ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oYixcbmEpe3ZhciBjPW4oYSk7Yy5sZW5ndGgmJihiLnN0eWxlW2UoKV09Yy5tYXAoZnVuY3Rpb24oYil7dmFyIGM7Yz1hW2JdO2M9L1xcRCQvLnRlc3QoYyl8fC9zY2FsZS8udGVzdChiKT9jOi9yb3RhdGV8c2tldy8udGVzdChiKT9jK1wiZGVnXCI6YytcInB4XCI7cmV0dXJuIGIrXCIoXCIrYytcIilcIn0pLmpvaW4oXCIgXCIpKX19KCkscT1mdW5jdGlvbihiKXtyZXR1cm4gZnVuY3Rpb24oYSl7cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uKCl7W2gsbCxwXS5mb3JFYWNoKGZ1bmN0aW9uKGMpe2MoYSxiKX0pfSk7YS5hZGRFdmVudExpc3RlbmVyKFwidHJhbnNpdGlvbmVuZFwiLGsoYikpfX07cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVybiBmdW5jdGlvbihhKXtcIm9iamVjdFwiPT10eXBlb2YgYSYmYihhKX19KGZ1bmN0aW9uKGIpe3ZhciBhPWIuZWw7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEpdmFyIGM9ZG9jdW1lbnQsYT0vXltcXCMuXT9bXFx3LV0rJC8udGVzdChhKT9cIi5cIj09YVswXT9jLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYS5zbGljZSgxKSk6XG5cIiNcIj09YVswXT9jLmdldEVsZW1lbnRCeUlkKGEuc2xpY2UoMSkpOmMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYSk6Yy5xdWVyeVNlbGVjdG9yQWxsKGEpOyhhLm5vZGVUeXBlP1thXTpBcnJheS5pc0FycmF5KGEpP2E6W10uc2xpY2UuY2FsbChhKSkuZm9yRWFjaChxKGIpKX0pfSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICBhbmltYXRlOyIsInZhciBhbmltYXRlID0gcmVxdWlyZSgnLi9hbmltYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdGVzdEFuaW1hdGVKcygpIHtcblx0dmFyIHVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzX3Rlc3QnKTtcblx0dmFyIGxpID0gdWwuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyk7XG5cblx0YW5pbWF0ZSh7XG5cdCAgZWw6IGxpWzBdLFxuXHQgIHJvdGF0ZVg6IDE5MCxcblx0ICBvcGFjaXR5OiAuNSxcblx0ICBkdXJhdGlvbjogNTAwLFxuXHQgIGNvbXBsZXRlOiBmdW5jdGlvbigpIHsgXG5cdCAgXHRjb25zb2xlLmxvZyhcIkRvbmUhXCIpOyBcblx0ICB9XG5cdH0pO1xuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd2hpY2hBbmltYXRpb25FdmVudCgpIHtcblx0XG5cdHZhciBrZXk7XHRcbiAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlZWxlbWVudCcpO1xuXG5cdHZhciBhbmltYXRpb25zID0ge1xuXHRcdCdXZWJraXRBbmltYXRpb24nIDogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsXG5cdFx0J09BbmltYXRpb24nIDogJ29BbmltYXRpb25FbmQnLFxuXHRcdCdtc0FuaW1hdGlvbicgOiAnTVNBbmltYXRpb25FbmQnLFxuXHRcdCdhbmltYXRpb24nIDogJ2FuaW1hdGlvbmVuZCdcblx0fTtcblxuICAgIGZvcihrZXkgaW4gYW5pbWF0aW9ucyl7XG4gICAgICAgIGlmKCBlbC5zdHlsZVtrZXldICE9PSB1bmRlZmluZWQgKXtcbiAgICAgICAgICAgIHJldHVybiBhbmltYXRpb25zW2tleV07XG4gICAgICAgIH1cbiAgICB9XHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaFRyYW5zaXRpb25FdmVudCgpIHtcblxuXHR2YXIga2V5O1x0XG5cdHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VlbGVtZW50Jyk7XG5cblx0dmFyIHRyYW5zaXRpb25zID0ge1xuXHRcdCd0cmFuc2l0aW9uJzondHJhbnNpdGlvbmVuZCcsXG5cdFx0J09UcmFuc2l0aW9uJzonb1RyYW5zaXRpb25FbmQnLFxuXHRcdCdNb3pUcmFuc2l0aW9uJzondHJhbnNpdGlvbmVuZCcsXG5cdFx0J1dlYmtpdFRyYW5zaXRpb24nOid3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuXHR9O1xuXG5cdGZvcihrZXkgaW4gdHJhbnNpdGlvbnMpe1xuXHRcdGlmKCBlbC5zdHlsZVtrZXldICE9PSB1bmRlZmluZWQgKXtcblx0XHQgICAgcmV0dXJuIHRyYW5zaXRpb25zW2tleV07XG5cdFx0fVxuXHR9XHRcbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4uL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluVmlldyhjb250YWluZXIsICRlbCkge1xuXG5cdC8vIGh0dHA6Ly93d3cuaHRtbDVyb2Nrcy5jb20vZW4vdHV0b3JpYWxzL3NwZWVkL2FuaW1hdGlvbnMvI2RlYm91bmNpbmctc2Nyb2xsLWV2ZW50c1xuXG5cdHZhciAkYW5pbWF0aW9uX2VsZW1lbnRzID0gJGVsO1xuXG5cdHZhciBwYWdlID0gY29udGFpbmVyO1xuXG5cdHZhciBsYXRlc3RLbm93blNjcm9sbFkgPSAwLFxuXHRcdHRpY2tpbmcgPSBmYWxzZSxcblx0XHRwYWdlSGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxuXHRcdHRoZU9mZnNldCA9IDA7XG5cblx0ZnVuY3Rpb24gb25TY3JvbGwoKSB7XG5cdFx0bGF0ZXN0S25vd25TY3JvbGxZID0gJChob21lcGFnZSkuc2Nyb2xsVG9wKCk7XG5cdFx0cmVxdWVzdFRpY2soKTtcblx0fVxuXHRmdW5jdGlvbiByZXF1ZXN0VGljaygpIHtcblx0XHRpZighdGlja2luZykge1xuXHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG5cdFx0fVxuXHRcdHRpY2tpbmcgPSB0cnVlO1xuXHR9XG5cdGZ1bmN0aW9uIHVwZGF0ZSgpIHtcblx0XHQvLyByZXNldCB0aGUgdGljayBzbyB3ZSBjYW5cblx0XHQvLyBjYXB0dXJlIHRoZSBuZXh0IG9uU2Nyb2xsXG5cdFx0dGlja2luZyA9IGZhbHNlO1xuXG5cdFx0dmFyIGN1cnJlbnRTY3JvbGxZID0gbGF0ZXN0S25vd25TY3JvbGxZO1xuXG5cdFx0Ly8gcmVhZCBvZmZzZXQgb2YgRE9NIGVsZW1lbnRzXG5cdFx0dGhlT2Zmc2V0ID0gJGFuaW1hdGlvbl9lbGVtZW50cy5vZmZzZXQoKTtcblxuXHRcdC8vIGFuZCBjb21wYXJlIHRvIHRoZSBjdXJyZW50U2Nyb2xsWSB2YWx1ZVxuXHRcdC8vIHRoZW4gYXBwbHkgc29tZSBDU1MgY2xhc3Nlc1xuXHRcdC8vIHRvIHRoZSB2aXNpYmxlIGl0ZW1zXG5cdFx0aWYgKHRoZU9mZnNldC50b3AgPCBwYWdlSGVpZ2h0KSB7XG5cdFx0XHQkYW5pbWF0aW9uX2VsZW1lbnRzLmFkZENsYXNzKCdpbi12aWV3Jyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCRhbmltYXRpb25fZWxlbWVudHMucmVtb3ZlQ2xhc3MoJ2luLXZpZXcnKTtcblx0XHR9XG5cblx0XHQvLyBjb25zb2xlLmxvZyh0aGVPZmZzZXQudG9wKTtcblx0XHQvLyBjb25zb2xlLmxvZyhwYWdlSGVpZ2h0KTtcblxuXHR9XG5cblx0cGFnZS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBvblNjcm9sbCwgZmFsc2UpO1xuXHRcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdyYXBMZXR0ZXJzKGVsKSB7XG5cdHJldHVybiBlbC5pbm5lckhUTUwgPSBlbC50ZXh0Q29udGVudC5zcGxpdChcIlwiKS5tYXAoZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdHJldHVybiAnPHNwYW4gY2xhc3M9bGV0dGVyPicgKyBsZXR0ZXIgKyAnPC9zcGFuPic7XG5cdH0pLmpvaW4oXCJcIik7XHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFRlbXBsYXRlKGRhdGEpIHtcblxuXHR2YXIgaSA9IFwiXCI7XG5cdHZhciBrZXk7XG5cdHZhciB0aXRsZSA9IGRhdGEudGl0bGUucmVuZGVyZWQ7XG5cdHZhciBjb250ZW50ID0gZGF0YS5jb250ZW50LnJlbmRlcmVkO1xuXG5cdHZhciBpbWFnZXMgPSBkYXRhLmFjZi5pbWFnZXM7XG5cdHZhciBpbWFnZUl0ZW1zID0gXCJcIjtcblxuXHRpZiAoaW1hZ2VzLmxlbmd0aCkge1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8PSBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0Zm9yIChrZXkgaW4gaW1hZ2VzW2ldKSB7XG5cblx0XHRcdFx0aWYgKGltYWdlc1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0XHRpbWFnZUl0ZW1zICs9IFx0JzxsaT4nICtcblx0XHRcdFx0XHRcdFx0XHRcdGltYWdlc1tpXVtrZXldLnRpdGxlICsgXG5cdFx0XHRcdFx0XHRcdFx0XHQnIDogJyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPGltZyBzcmM9XCInICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRpbWFnZXNbaV1ba2V5XS5zaXplcy5sYXJnZSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0J1wiIC8+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPC9saT4nO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBcblx0XHRcdH0gXHRcdFxuXHRcdH1cdFx0XHRcblx0fSBcblxuXG5cblxuXG5cblx0dmFyIHRlc3RpbW9uaWFscyA9IGRhdGEuYWNmLnRlc3RpbW9uaWFscztcblx0dmFyIHRlc3RpbW9uaWFsSXRlbXMgPSBcIlwiO1xuXG5cdGlmICh0ZXN0aW1vbmlhbHMubGVuZ3RoKSB7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDw9IHRlc3RpbW9uaWFscy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRmb3IgKGtleSBpbiB0ZXN0aW1vbmlhbHNbaV0pIHtcblx0XHRcdFx0aWYgKHRlc3RpbW9uaWFsc1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0XHR0ZXN0aW1vbmlhbEl0ZW1zICs9IFx0JzxsaT4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRrZXkgKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnIDogJyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXY+JyArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRlc3RpbW9uaWFsc1tpXVtrZXldICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2xpPic7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IFxuXHRcdFx0fSBcdFx0XG5cdFx0fVx0XHRcdFxuXHR9IFxuXHRcblxuXG5cdHZhciB3cmFwcGVyID0gJCgnPGRpdi8+Jywge1xuXHRcdCdjbGFzcycgOiAnd3JhcHBlcicsXHRcdFxuXHR9KTtcblxuXHQkKCc8aDEvPicsIHtcblx0XHQnY2xhc3MnIDogJ3RpdGxlJyxcblx0XHRodG1sOiB0aXRsZVxuXHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcdFxuXG5cdCQoJzxkaXYvPicsIHtcblx0XHQnY2xhc3MnIDogJ2NvbnRlbnQnLFxuXHRcdGh0bWw6IGNvbnRlbnRcblx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cblx0aWYgKHRlc3RpbW9uaWFscy5sZW5ndGgpIHtcblxuXHRcdCQoJzx1bC8+Jywge1xuXHRcdFx0J2NsYXNzJyA6ICd0ZXN0aW1vbmlhbHMtbGlzdCcsXG5cdFx0XHRodG1sOiB0ZXN0aW1vbmlhbEl0ZW1zXG5cdFx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cdH1cblxuXG5cdGlmIChpbWFnZXMubGVuZ3RoKSB7XG5cblx0XHQkKCc8dWwvPicsIHtcblx0XHRcdCdjbGFzcycgOiAnaW1hZ2UtbGlzdCcsXG5cdFx0XHRodG1sOiBpbWFnZUl0ZW1zXG5cdFx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cdH1cblxuXG5cblx0cmV0dXJuIHdyYXBwZXI7XG5cdFxufTsiLCJ2YXIgZG9tRWxzID0ge1xuXHRcImFuaW1hdGlvbl9lbGVtZW50c1wiIDogJCgnI2pzX2FuaW1hdGVfaGVhZCcpLFxuXHRcInBhZ2VfY29udGFpbmVyXCIgOiAkKCcjanNfcGFnZV9zaW5nbGVfaXRlbScpLFxuXHRcImJhY2tfdG9fbWVudV9idG5cIiA6ICQoJyNqc19iYWNrX3RvX21lbnUnKSxcblx0XCJzcGlubmVyXCIgOiAkKCc8ZGl2IGlkPVwianNfbG9hZGluZ1wiPjxkaXYgY2xhc3M9XCJzcGlubmVyXCI+PC9kaXY+PC9kaXY+Jylcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBkb21FbHM7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaXJlVHJhbnNpdGlvbigpIHtcblx0JCgnLmVmZmVja3QgLnRoZS1idG4nKS50cmlnZ2VyKCdjbGljaycpO1xufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmplY3RTcGlubmVyKCkge1xuXHQkKCdib2R5JykuYXBwZW5kKGRvbUVscy5zcGlubmVyKTtcdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTG9hZGVkKGlkZW50aWZpZXIsIGFyciwgcmVxdWVzdCkge1xuXG5cdHZhciByZXMgPSBmYWxzZTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdFxuXHRcdGZvciAodmFyIGtleSBpbiBhcnJbaV0pIHtcblx0XHRcdFxuXHRcdFx0aWYgKGFycltpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0aWYgKGFycltpXVtrZXldID09PSBpZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIGlkZW50aWZpZXIgaXMgZm91bmQgdXBkYXRlIHJlcXVlc3QuaWRcblx0XHRcdFx0XHQvLyB1c2VkIGZvciB3aGVuIHRoZSBpZGVudGlmaWVyIGlzIG5vdCB0aGUgaWQgbnVtYmVyIChlZyBzbHVnKVxuXHRcdFx0XHRcdHJlcXVlc3QuaWQgPSBhcnJbaV0ucGFnZV9pZDtcblx0XHRcdFx0XHRyZXMgPSB0cnVlO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cdFx0XHRcdFxuXHR9XG5cdFxuXHRjb25zb2xlLmxvZyhcImlzTG9hZGVkIDogXCIgKyByZXMpO1xuXG5cdHJldHVybiByZXM7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSkge1xuXG5cdHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLnB1c2goe1xuXHRcdFwicGFnZV9pZFwiIDogZGF0YS5pZCxcblx0XHRcInBhZ2Vfc2x1Z1wiIDogZGF0YS5zbHVnLFxuXHRcdFwicGFnZV91cmxcIiA6IGRhdGEubGluayxcblx0XHRcImpzb25fbGlua1wiIDogZGF0YS5fbGlua3Muc2VsZlswXS5ocmVmXHRcdFx0XG5cdH0pO1xuXG5cdHJldHVybiBwYWdlX3N0YXRlO1xufTsiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9kb21FbHMnKTtcbnZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vaXNMb2FkZWQnKTtcbnZhciBpbmplY3RTcGlubmVyID0gcmVxdWlyZSgnLi9pbmplY3RTcGlubmVyJyk7XG52YXIgYWpheENhbGwgPSByZXF1aXJlKCcuL2FqYXhDYWxsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSkge1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZnVuY3Rpb24oZSkge1x0XHRcblxuXHRcdCAgICAvLyBnZXQgdGhlIHNsdWdcbiAgICAgICAgcGF0aEFycmF5ID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoICcvJyApO1xuICAgICAgICB0aGVJbmRleCA9IHBhdGhBcnJheS5sZW5ndGggLSAyO1xuICAgICAgICB0aGVTbHVnID0gcGF0aEFycmF5W3RoZUluZGV4XTtcdFxuICAgICAgICB0aGVSZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgLypcbiAgICAgICAgIFxuICAgICAgICAgaWYgdGhlU2x1ZyBpcyBpbiBwb3N0ZGF0YS5zbHVnIHVwZGF0ZSByZXF1ZXN0IGFuZCBmaXJlIGFqYXggLSB5b3UgYXJlIG9uIHRoZSBob21lcGFnZVxuICAgICAgICAgaWYgbm90IHRyaWdnZXIgYmFjayB0byBtZW51IGNsaWNrIFxuXG4gICAgICAgICovXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHBvc3RkYXRhLnNsdWcpIHtcblxuICAgICAgICAgIGlmIChwb3N0ZGF0YS5zbHVnLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coIGtleSArIFwiIDogXCIgKyBwb3N0ZGF0YS5zbHVnW2tleV0pO1xuXG4gICAgICAgICAgICBpZiAodGhlU2x1ZyA9PT0ga2V5KSB7XG5cbiAgICAgICAgICAgICAgdGhlUmVzdWx0ID0gdHJ1ZTsgXG4gICAgICAgICAgICAgIC8vIHVwZGF0ZXMgcmVxdWVzdCBvYmplY3RcbiAgICAgICAgICAgICAgcmVxdWVzdCA9IHt9O1xuICAgICAgICAgICAgICAvLyBnZXQgdGhlIGhyZWZcbiAgICAgICAgICAgICAgcmVxdWVzdC5ocmVmID0gXCJcIjtcbiAgICAgICAgICAgICAgLy8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuICAgICAgICAgICAgICByZXF1ZXN0LmlkID0gcG9zdGRhdGEuc2x1Z1trZXldOyAgIFxuICAgICAgICAgICAgICAvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3NcbiAgICAgICAgICAgICAgcmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdOyAgICAgICBcbiAgICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuICAgICAgICAgICAgICByZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gXG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYgKHRoZVJlc3VsdCkgeyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmplY3RTcGlubmVyKCk7XG4gICAgICAgICAgICAvLyBpZiBpc0xvYWRlZCBncmFiIHRoZSBjaHVuayBmcm9tIGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgYWpheENhbGwocmVxdWVzdCk7ICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgXG4gICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uYXNzaWduKGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCk7XG4gICAgICAgICAgLy8gIGZvciBicm93c2Vyc3luYyBvbmx5IC0gQ0hBTkdFIFRPOlxuICAgICAgICAgIFxuICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHBvc3RkYXRhLnJvb3RfdXJsKTsgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgIH0pOyAgICAgXHRcbn07XG5cblxuXG4iXX0=
