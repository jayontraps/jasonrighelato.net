(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var domEls = require('./modules/domEls');
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
},{"./modules/Effeckt/core":2,"./modules/Effeckt/pageTransitions":3,"./modules/ajaxCall":4,"./modules/domEls":6,"./modules/fireTransition":7,"./modules/injectSpinner":8,"./modules/isLoaded":9,"./modules/readAddressBar":11}],2:[function(require,module,exports){
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
},{"./buildTemplate":5,"./domEls":6,"./fireTransition":7,"./pageStateUpDate":10}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
var domEls = {
	"page_container" : $('#js_page_single_item'),
	"back_to_menu_btn" : $('#js_back_to_menu'),
	"spinner" : $('<div id="js_loading"><div class="spinner"></div></div>')
};


module.exports = domEls;
},{}],7:[function(require,module,exports){
module.exports = function fireTransition() {
	$('.effeckt .the-btn').trigger('click');
};
},{}],8:[function(require,module,exports){
var domEls = require('./domEls');

module.exports = function injectSpinner() {
	$('body').append(domEls.spinner);	
};
},{"./domEls":6}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
module.exports = function pageStateUpDate(data, page_state) {

	page_state.loaded_pages.push({
		"page_id" : data.id,
		"page_slug" : data.slug,
		"page_url" : data.link,
		"json_link" : data._links.self[0].href			
	});

	return page_state;
};
},{}],11:[function(require,module,exports){
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
           window.location.assign(postdata.root_url);           
        }


    });     	
};




},{"./ajaxCall":4,"./domEls":6,"./injectSpinner":8,"./isLoaded":9}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL0VmZmVja3QvY29yZS5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9FZmZlY2t0L3BhZ2VUcmFuc2l0aW9ucy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9hamF4Q2FsbC5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9idWlsZFRlbXBsYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2RvbUVscy5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9maXJlVHJhbnNpdGlvbi5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9pbmplY3RTcGlubmVyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2lzTG9hZGVkLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3BhZ2VTdGF0ZVVwRGF0ZS5qcyIsInNyYy9qcy9hcHAvbW9kdWxlcy9yZWFkQWRkcmVzc0Jhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZG9tRWxzID0gcmVxdWlyZSgnLi9tb2R1bGVzL2RvbUVscycpO1xudmFyIGluamVjdFNwaW5uZXIgPSByZXF1aXJlKCcuL21vZHVsZXMvaW5qZWN0U3Bpbm5lcicpO1xudmFyIGFqYXhDYWxsID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FqYXhDYWxsJyk7XG52YXIgcmVhZEFkZHJlc3NCYXIgPSByZXF1aXJlKCcuL21vZHVsZXMvcmVhZEFkZHJlc3NCYXInKTtcbnZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pc0xvYWRlZCcpO1xuLy8gdmFyIHRyYW5zaXRpb25Ub1BhZ2UgPSByZXF1aXJlKCcuL21vZHVsZXMvdHJhbnNpdGlvblRvUGFnZScpO1xuLy8gdmFyIHRyYW5zaXRpb25CYWNrVG9NZW51ID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RyYW5zaXRpb25CYWNrVG9NZW51Jyk7XG52YXIgZmlyZVRyYW5zaXRpb24gPSByZXF1aXJlKCcuL21vZHVsZXMvZmlyZVRyYW5zaXRpb24nKTtcblxuLyogRWZmZWNrdCAqL1xudmFyIGNvcmUgPSByZXF1aXJlKCcuL21vZHVsZXMvRWZmZWNrdC9jb3JlJyk7XG52YXIgcGFnZVRyYW5zaXRpb25zID0gcmVxdWlyZSgnLi9tb2R1bGVzL0VmZmVja3QvcGFnZVRyYW5zaXRpb25zJyk7XG4vLyBpbml0IEVmZmVja3RcbmNvcmUoKTtcbnBhZ2VUcmFuc2l0aW9ucygpO1xuXG5cblxuLy8gR0xPQkFMIEZPUiBERVZcbnJlcXVlc3QgPSB7fTtcblxuLy8gR0xPQkFMIEZPUiBERVZcbnBhZ2Vfc3RhdGUgPSB7XG5cdFwibG9hZGVkX3BhZ2VzXCIgOiBbXSxcblx0XCJmcm9tUGFnZVwiIDogXCJcIixcblx0XCJ0b1BhZ2VcIiA6IFwiXCJcbn07XG5cbi8vIEVYQU1QTEVTXG5cbi8vIHBvc3RkYXRhIHtcbi8vIFx0anNvbl91cmwgOiB7XG4vLyBcdFx0MjggOiAgXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvMjhcIixcbi8vIFx0XHQzMDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9zdHMvMzBcIlxuLy8gXHR9LFxuLy8gXHRyb290X3VybDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvXCIsXG4vL1x0c2x1Zzoge1xuLy9cdFx0XCJhY2VcIiA6IDI4LFxuLy9cdFx0XCJib2NcIiA6IDMwXG4vLyBcdH1cbi8vIH1cblxuLy8gcmVxdWVzdCA9IHtcbi8vIFx0XCJocmVmXCIgOiBcIlwiLFxuLy8gXHRcImlkXCIgOiAwLFxuLy8gXHRcImlkX3N0clwiIDogXCJcIixcbi8vIFx0XCJqc29uX3VybFwiIDogXCJcIlx0XG4vLyB9O1xuXG5cbi8vIFwibG9hZGVkX3BhZ2VzXCIgOiBbXG4vLyBcdHtcbi8vIFx0XHRqc29uX2xpbms6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzhcIlxuLy8gXHRcdHBhZ2VfaWQ6IDhcbi8vIFx0XHRwYWdlX3NsdWc6IFwiYmlyZHMtb2YtYmVya3NoaXJlLWF0bGFzXCJcbi8vIFx0XHRwYWdlX3VybDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL2JpcmRzLW9mLWJlcmtzaGlyZS1hdGxhcy9cIlx0XHRcdFxuLy8gXHR9XG4vLyBdXG5cblxuKGZ1bmN0aW9uKCQpIHtcdFxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFxuXHRcdCQoJy53b3JrX21lbnVfaXRlbXMnKS5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHQvLyB1cGRhdGVzIHJlcXVlc3Qgb2JqZWN0XG5cdFx0XHRyZXF1ZXN0ID0ge307XG5cdFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFx0XHRcdFxuXHRcdFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFx0XHRcblxuXHRcdFx0aW5qZWN0U3Bpbm5lcigpO1xuXG5cdFx0XHQvLyBpZiBpc0xvYWRlZCBncmFiIHRoZSBjaHVuayBmcm9tIGxvY2FsU3RvcmFnZVxuXG5cdFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblxuXHRcdFx0aWYgKE1vZGVybml6ci5oaXN0b3J5KSB7XG5cdFx0XHQgXHRoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCByZXF1ZXN0LmhyZWYpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cblxuXHRcdC8qIEJBQ0sgVE8gTUVOVSAqL1xuXHRcdGRvbUVscy5iYWNrX3RvX21lbnVfYnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHQgICAgICAgIFx0XHRcdFx0XG5cdCAgICAgICAgLy8gZm9yIGJyb3dzZXJzeW5jIG9ubHkgLSBDSEFOR0UgVE86XG5cdCAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIHBvc3RkYXRhLnJvb3RfdXJsICk7XG5cdCAgICAgICAgXG5cdFx0XHQvLyBoaXN0b3J5LnB1c2hTdGF0ZSggbnVsbCwgbnVsbCwganJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsICk7XG5cdFx0fSk7XG5cblxuXG5cblx0XHQvKiBCUk9XU0VSUyBCQUNLIEJVVFRPTiAqL1xuXHRcdC8vIGFkZCB0aGUgcG9wc3RhdGUgZXZlbnQgaGFuZGxlciBvbiB0aGUgcGFnZS1wb3J0Zm9saW8gYW5kIHNpbmdsZS1wb3J0Zm9saW8gb25seVxuXHRcdC8vIHdpbGwgdGhlIGV2ZW50IGhhbmRsZXIgcmVtYWluIG9uIG90aGVyIHBhZ2VzPz9cblxuXHRcdGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3dvcmstcGFnZScpKSB7XG5cdFx0XHRyZWFkQWRkcmVzc0JhcihyZXF1ZXN0LCBwYWdlX3N0YXRlKTtcdFx0XHRcblx0XHR9XG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXHRcdC8qIEhPVkVSICovXG5cdFx0Ly8gaWYgbm8gdG91Y2ggd2UgY2FuIGFudGljaXBhdGUgYSBjbGljayBhbmQgZmlyZSBhamF4Q2FsbCBvbiBtb3VzZW92ZXJcblx0XHRpZiAoIU1vZGVybml6ci50b3VjaGV2ZW50cykge1xuXG5cdFx0XHQkKCcjYXBwJykub24oJ21vdXNlb3ZlcicsICdhJywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0cmVxdWVzdCA9IHt9O1xuXHRcdFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHRcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0XHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcdFx0XHRcblx0XHRcdFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdFx0XHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XG5cblx0XHRcdFx0aWYgKCAhaXNMb2FkZWQocmVxdWVzdC5pZCwgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMsIHJlcXVlc3QpICkge1xuXHRcdFx0XHRcdGFqYXhDYWxsKHJlcXVlc3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdH0pO1xuXHRcdH1cblxuXG5cblxuXHRcdC8qIENMSUNLICovXG5cdFx0JCgnI2FwcCcpLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0YWxlcnQoXCJ3dGZcIik7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHRcdFxuXG5cdFx0XHRyZXF1ZXN0ID0ge307XHRcdFx0XHRcblx0XHRcdC8vIGdldCB0aGUgaHJlZlxuXHRcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHRcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHRcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1x0XG5cdFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0XHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XHRcblx0XHRcdFx0XHRcblx0XHRcdC8vIGlzIGl0IGFscmVhZHkgbG9hZGVkIGludG8gRE9NPyBDaGVjayB0aGUgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMgYXJyYXlcblx0XHRcdGlmICggIWlzTG9hZGVkKHJlcXVlc3QuaWQsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSApIHtcblx0XHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0XG5cdFx0XHRpZiAoTW9kZXJuaXpyLmhpc3RvcnkpIHtcblx0XHRcdCBcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHJlcXVlc3QuaHJlZik7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXG5cblx0XHRcblxuXG5cdFx0XG5cblxuXHR9KTtcblxuXG59KShqUXVlcnkpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29yZSgpIHtcblxuOyhmdW5jdGlvbih3aW5kb3cpe1xuXG4gIHZhclxuICAgIC8vIElzIE1vZGVybml6ciBkZWZpbmVkIG9uIHRoZSBnbG9iYWwgc2NvcGVcbiAgICBNb2Rlcm5penIgPSB0eXBlb2YgTW9kZXJuaXpyICE9PSBcInVuZGVmaW5lZFwiID8gTW9kZXJuaXpyIDogZmFsc2UsXG5cbiAgICAvLyBBbHdheXMgZXhwZWN0IGJvdGgga2luZHMgb2YgZXZlbnRcbiAgICBidXR0b25QcmVzc2VkRXZlbnQgPSAndG91Y2hzdGFydCBjbGljaycsXG5cbiAgICAvLyBMaXN0IG9mIGFsbCBhbmltYXRpb24vdHJhbnNpdGlvbiBwcm9wZXJ0aWVzXG4gICAgLy8gd2l0aCBpdHMgYW5pbWF0aW9uRW5kL3RyYW5zaXRpb25FbmQgZXZlbnRcbiAgICBhbmltYXRpb25FbmRFdmVudE5hbWVzID0ge1xuICAgICAgJ1dlYmtpdEFuaW1hdGlvbicgOiAnd2Via2l0QW5pbWF0aW9uRW5kJyxcbiAgICAgICdPQW5pbWF0aW9uJyA6ICdvQW5pbWF0aW9uRW5kJyxcbiAgICAgICdtc0FuaW1hdGlvbicgOiAnTVNBbmltYXRpb25FbmQnLFxuICAgICAgJ2FuaW1hdGlvbicgOiAnYW5pbWF0aW9uZW5kJ1xuICAgIH0sXG5cbiAgICB0cmFuc2l0aW9uRW5kRXZlbnROYW1lcyA9IHtcbiAgICAgICdXZWJraXRUcmFuc2l0aW9uJyA6ICd3ZWJraXRUcmFuc2l0aW9uRW5kJyxcbiAgICAgICdPVHJhbnNpdGlvbicgOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICAgJ21zVHJhbnNpdGlvbicgOiAnTVNUcmFuc2l0aW9uRW5kJyxcbiAgICAgICd0cmFuc2l0aW9uJyA6ICd0cmFuc2l0aW9uZW5kJ1xuICAgIH0sXG5cbiAgICBFZmZlY2t0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmluaXQoKTtcbiAgICB9O1xuXG4gIC8vIEN1cnJlbnQgdmVyc2lvbi5cbiAgRWZmZWNrdC52ZXJzaW9uID0gJzAuMC4xJztcblxuICAvLyBJbml0aWFsaXphdGlvbiBtZXRob2RcbiAgRWZmZWNrdC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYnV0dG9uUHJlc3NlZEV2ZW50ID0gYnV0dG9uUHJlc3NlZEV2ZW50O1xuXG4gICAgLy9ldmVudCB0cmlnZ2VyIGFmdGVyIGFuaW1hdGlvbi90cmFuc2l0aW9uIGVuZC5cbiAgICB0aGlzLnRyYW5zaXRpb25FbmRFdmVudE5hbWUgPSBNb2Rlcm5penIgPyB0cmFuc2l0aW9uRW5kRXZlbnROYW1lc1tNb2Rlcm5penIucHJlZml4ZWQoJ3RyYW5zaXRpb24nKV0gOiBnZXRUcmFuc2l0aW9uRW5kRXZlbnROYW1lcygpO1xuICAgIHRoaXMuYW5pbWF0aW9uRW5kRXZlbnROYW1lICA9IE1vZGVybml6ciA/IGFuaW1hdGlvbkVuZEV2ZW50TmFtZXNbTW9kZXJuaXpyLnByZWZpeGVkKCdhbmltYXRpb24nKV0gOiBnZXRBbmltYXRpb25FbmRFdmVudE5hbWVzKCk7XG4gICAgdGhpcy50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgPSB0aGlzLmFuaW1hdGlvbkVuZEV2ZW50TmFtZSArICcgJyArIHRoaXMudHJhbnNpdGlvbkVuZEV2ZW50TmFtZTtcbiAgfTtcblxuICBFZmZlY2t0LnByb3RvdHlwZS5nZXRWaWV3cG9ydEhlaWdodCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGRvY0VsZW1lbnQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICBjbGllbnQgPSBkb2NFbGVtZW50WydjbGllbnRIZWlnaHQnXSxcbiAgICAgIGlubmVyID0gd2luZG93Wydpbm5lckhlaWdodCddO1xuXG4gICAgaWYoIGNsaWVudCA8IGlubmVyIClcbiAgICAgIHJldHVybiBpbm5lcjtcbiAgICBlbHNlXG4gICAgICByZXR1cm4gY2xpZW50O1xuICB9O1xuXG4gIC8vIEdldCBhbGwgdGhlIHByb3BlcnRpZXMgZm9yIHRyYW5zaXRpb24vYW5pbWF0aW9uIGVuZFxuICBmdW5jdGlvbiBnZXRUcmFuc2l0aW9uRW5kRXZlbnROYW1lcygpIHtcbiAgICByZXR1cm4gX2dldEVuZEV2ZW50TmFtZXMoIHRyYW5zaXRpb25FbmRFdmVudE5hbWVzICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRBbmltYXRpb25FbmRFdmVudE5hbWVzKCkge1xuICAgIHJldHVybiBfZ2V0RW5kRXZlbnROYW1lcyggYW5pbWF0aW9uRW5kRXZlbnROYW1lcyApO1xuICB9XG5cbiAgZnVuY3Rpb24gX2dldEVuZEV2ZW50TmFtZXMob2JqKSB7XG4gICAgdmFyIGV2ZW50cyA9IFtdO1xuXG4gICAgZm9yICggdmFyIGV2ZW50TmFtZSBpbiBvYmogKSB7XG4gICAgICBldmVudHMucHVzaCggb2JqWyBldmVudE5hbWUgXSApO1xuICAgIH1cblxuICAgIHJldHVybiBldmVudHMuam9pbignICcpO1xuICB9XG5cbiAgLy8gQ3JlYXRlcyBhIEVmZmVja3Qgb2JqZWN0LlxuICB3aW5kb3cuRWZmZWNrdCA9IG5ldyBFZmZlY2t0KCk7XG5cbn0pKHRoaXMpO1xuXG5cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZ2VUcmFuc2l0aW9ucygpIHtcblxudmFyIEVmZmVja3RQYWdlVHJhbnNpdGlvbnMgPSB7XG5cbiAgZnJvbVBhZ2U6ICcnLFxuICB0b1BhZ2U6ICcnLFxuICBpc0FuaW1hdGluZzogZmFsc2UsXG4gIGlzTmV4dFBhZ2VFbmQ6IGZhbHNlLFxuICBpc0N1cnJlbnRQYWdlRW5kOiBmYWxzZSxcbiAgdHJhbnNpdGlvbkluRWZmZWN0OiAnJyxcbiAgdHJhbnNpdGlvbk91dEVmZmVjdDogJycsXG5cbiAgaW5pdDogZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmluaXRQYWdlcygpO1xuICAgIHRoaXMuYmluZFVJQWN0aW9ucygpO1xuXG4gIH0sXG5cbiAgaW5pdFBhZ2VzOiBmdW5jdGlvbigpe1xuXG4gICAgdmFyICRwYWdlcyA9ICQoJ1tkYXRhLWVmZmVja3QtcGFnZV0nKTtcblxuICAgIHRoaXMuZnJvbVBhZ2UgPSAkcGFnZXMuZmlyc3QoKS5hZGRDbGFzcygnZWZmZWNrdC1wYWdlLWFjdGl2ZScpO1xuXG4gIH0sXG5cbiAgYmluZFVJQWN0aW9uczogZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAkKCcuZWZmZWNrdC1wYWdlLXRyYW5zaXRpb24tYnV0dG9uJykub24oIEVmZmVja3QuYnV0dG9uUHJlc3NlZEV2ZW50LCBmdW5jdGlvbihlKXtcblxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICB2YXIgdHJhbnNpdGlvbkluRWZmZWN0ICA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLWluJyksXG4gICAgICAgICAgdHJhbnNpdGlvbk91dEVmZmVjdCA9ICQodGhpcykuZGF0YSgnZWZmZWNrdC10cmFuc2l0aW9uLW91dCcpLFxuICAgICAgICAgIHRyYW5zaXRpb25QYWdlICAgICAgPSAkKHRoaXMpLmRhdGEoJ2VmZmVja3QtdHJhbnNpdGlvbi1wYWdlJyk7XG5cbiAgICAgIGlmICggJCh0aGlzKS5kYXRhKFwiZWZmZWNrdC1uZWVkcy1wZXJzcGVjdGl2ZVwiKSkge1xuICAgICAgICAkKFwiaHRtbFwiKS5hZGRDbGFzcyhcIm1kLXBlcnNwZWN0aXZlXCIpO1xuICAgICAgfVxuXG4gICAgICBzZWxmLnRyYW5zaXRpb25QYWdlKCB0cmFuc2l0aW9uUGFnZSwgdHJhbnNpdGlvbkluRWZmZWN0LCB0cmFuc2l0aW9uT3V0RWZmZWN0ICk7XG5cbiAgICB9KTtcbiAgfSxcblxuICB0cmFuc2l0aW9uUGFnZTogZnVuY3Rpb24oIHRyYW5zaXRpb25QYWdlLCB0cmFuc2l0aW9uSW5FZmZlY3QsIHRyYW5zaXRpb25PdXRFZmZlY3QgKSB7XG5cbiAgICBpZiAoIHRoaXMuaXNBbmltYXRpbmcgKSB7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIH1cblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICAgIHRoaXMuaXNDdXJyZW50UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMuaXNOZXh0UGFnZUVuZCA9IGZhbHNlO1xuICAgIHRoaXMudHJhbnNpdGlvbkluRWZmZWN0ID0gdHJhbnNpdGlvbkluRWZmZWN0O1xuICAgIHRoaXMudHJhbnNpdGlvbk91dEVmZmVjdD0gdHJhbnNpdGlvbk91dEVmZmVjdDtcblxuICAgIC8vIEdldCBQYWdlc1xuICAgIHRoaXMuZnJvbVBhZ2UgPSAkKCdbZGF0YS1lZmZlY2t0LXBhZ2VdLmVmZmVja3QtcGFnZS1hY3RpdmUnKTtcbiAgICB0aGlzLnRvUGFnZSAgID0gJCgnW2RhdGEtZWZmZWNrdC1wYWdlPVwiJyArIHRyYW5zaXRpb25QYWdlICsgJ1wiXScpO1xuXG4gICAgLy8gQWRkIHRoaXMgY2xhc3MgdG8gcHJldmVudCBzY3JvbGwgdG8gYmUgZGlzcGxheWVkXG4gICAgdGhpcy50b1BhZ2UuYWRkQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgZWZmZWNrdC1wYWdlLWFjdGl2ZSAnICsgdGhpcy50cmFuc2l0aW9uSW5FZmZlY3QpO1xuICAgIHRoaXMuZnJvbVBhZ2UuYWRkQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcnKTtcblxuICAgIC8vIFNldCBUcmFuc2l0aW9uIENsYXNzXG4gICAgdGhpcy5mcm9tUGFnZS5hZGRDbGFzcyh0aGlzLnRyYW5zaXRpb25PdXRFZmZlY3QpO1xuICAgIFxuICAgIHZhciBzZWxmPSB0aGlzO1xuICAgIFxuICAgIHRoaXMudG9QYWdlLm9uKCBFZmZlY2t0LnRyYW5zaXRpb25BbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24oKSB7XG4gICAgICBcbiAgICAgIHNlbGYudG9QYWdlLm9mZiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQgKTtcbiAgICAgIHNlbGYuaXNOZXh0UGFnZUVuZCA9IHRydWU7XG5cbiAgICAgIGlmICggc2VsZi5pc0N1cnJlbnRQYWdlRW5kICkge1xuICAgICAgICBzZWxmLnJlc2V0VHJhbnNpdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5mcm9tUGFnZS5vbiggRWZmZWNrdC50cmFuc2l0aW9uQW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uICgpIHtcblxuICAgICAgc2VsZi5mcm9tUGFnZS5vZmYoIEVmZmVja3QudHJhbnNpdGlvbkFuaW1hdGlvbkVuZEV2ZW50ICk7XG4gICAgICBzZWxmLmlzQ3VycmVudFBhZ2VFbmQgPSB0cnVlO1xuXG4gICAgICBpZiAoIHNlbGYuaXNOZXh0UGFnZUVuZCApIHtcbiAgICAgICAgc2VsZi5yZXNldFRyYW5zaXRpb24oKTtcbiAgICAgIH1cblxuICAgIH0pO1xuXG4gIH0sXG5cbiAgcmVzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmlzQ3VycmVudFBhZ2VFbmQgPSBmYWxzZTtcbiAgICB0aGlzLmlzTmV4dFBhZ2VFbmQgPSBmYWxzZTtcblxuICAgIHRoaXMuZnJvbVBhZ2UucmVtb3ZlQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgZWZmZWNrdC1wYWdlLWFjdGl2ZSAnICsgdGhpcy50cmFuc2l0aW9uT3V0RWZmZWN0KTsvLy5oaWRlKCk7XG4gICAgdGhpcy50b1BhZ2UucmVtb3ZlQ2xhc3MoJ2VmZmVja3QtcGFnZS1hbmltYXRpbmcgJyArIHRoaXMudHJhbnNpdGlvbkluRWZmZWN0KTtcblxuICAgICQoXCJodG1sXCIpLnJlbW92ZUNsYXNzKFwibWQtcGVyc3BlY3RpdmVcIik7XG4gIH1cblxufTtcblxuRWZmZWNrdFBhZ2VUcmFuc2l0aW9ucy5pbml0KCk7XHRcblx0XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xudmFyIGJ1aWxkVGVtcGxhdGUgPSByZXF1aXJlKCcuL2J1aWxkVGVtcGxhdGUnKTtcbnZhciBwYWdlU3RhdGVVcERhdGUgPSByZXF1aXJlKCcuL3BhZ2VTdGF0ZVVwRGF0ZScpO1xudmFyIGZpcmVUcmFuc2l0aW9uID0gcmVxdWlyZSgnLi9maXJlVHJhbnNpdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFqYXhDYWxsKHJlcXVlc3QpIHtcblxuXHQkLmFqYXgoe1xuXHQgICAgdXJsOiByZXF1ZXN0Lmpzb25fdXJsLFxuXHQgICAgZGF0YVR5cGU6ICdqc29uJ1xuXHR9KVxuXG5cdC5kb25lKGZ1bmN0aW9uKGRhdGEpe1x0XG5cblx0XHQvLyBjbGVhciBjdXJyZW50IGNvbnRlbnQgLSB0aGlzIGNvdWxkIGJlIHN0b3JlZFxuXHRcdGRvbUVscy5wYWdlX2NvbnRhaW5lci5lbXB0eSgpO1xuXG5cdFx0Ly8gdXBkYXRlIHBhZ2Vfc3RhdGUgb2JqZWN0XG5cdFx0cGFnZVN0YXRlVXBEYXRlKGRhdGEsIHBhZ2Vfc3RhdGUpO1x0XHRcdFx0XHRcblx0XHRcblx0XHQvLyB0ZW1wbGF0ZSB0aGUgZGF0YVxuXHRcdHZhciBjaHVuayA9IGJ1aWxkVGVtcGxhdGUoZGF0YSk7XG5cblx0XHQvLyBpbnNlcnQgaW50byB0aGUgRE9NXHRcdFxuXHRcdGRvbUVscy5wYWdlX2NvbnRhaW5lci5hcHBlbmQoY2h1bmspO1xuXG5cdFx0Ly8gZGVsYXkgZm9yIDUwMG1zIGluIGNhc2Ugb2YgZmFzdCBhamF4ICFcblx0XHR3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuXHRcdFx0JCgnI2pzX2xvYWRpbmcnKS5yZW1vdmUoKTtcbiAgICBcdFx0ZmlyZVRyYW5zaXRpb24oKTtcblxuXHRcdH0sIDUwMCk7XG5cdFx0XG5cdFxuXHRcdC8vIHB1dCB0aGUgdGVtcGF0ZSBpbiBsb2NhbCBzdG9yYWdlIGFzIHN0cmluZ2lmeVxuXHRcdC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicGFnZV9cIiArIHJlcXVlc3QuaWQsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHRcblx0XHQvLyBpZiAoTW9kZXJuaXpyLmxvY2Fsc3RvcmFnZSkge1xuXHRcdC8vIFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5nXG5cdFx0Ly8gXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGFnZV8nICsgcmVxdWVzdC5pZCwgY2h1bmtbMF0uaW5uZXJIVE1MKTtcdFx0XHRcdFxuXHRcdC8vIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHR9KVxuXG5cdC5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKCdlcnJvcicpO1xuXHRcdCQoJyNqc19sb2FkaW5nJykucmVtb3ZlKCk7XG5cdFx0Ly8gYWxlcnQoXCJlcnJvclwiKTtcblx0fSlcblxuXHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKCdjb21wbGV0ZSEnKTtcblx0fSk7XHRcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoZGF0YSkge1xuXG5cdHZhciBpID0gXCJcIjtcblx0dmFyIHRpdGxlID0gZGF0YS50aXRsZS5yZW5kZXJlZDtcblx0dmFyIGNvbnRlbnQgPSBkYXRhLmNvbnRlbnQucmVuZGVyZWQ7XG5cblx0dmFyIGltYWdlcyA9IGRhdGEuYWNmLmltYWdlcztcblx0dmFyIGltYWdlSXRlbXMgPSBcIlwiO1xuXG5cdGlmIChpbWFnZXMubGVuZ3RoKSB7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDw9IGltYWdlcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRmb3IgKGtleSBpbiBpbWFnZXNbaV0pIHtcblxuXHRcdFx0XHRpZiAoaW1hZ2VzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRcdGltYWdlSXRlbXMgKz0gXHQnPGxpPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0aW1hZ2VzW2ldW2tleV0udGl0bGUgKyBcblx0XHRcdFx0XHRcdFx0XHRcdCcgOiAnICtcblx0XHRcdFx0XHRcdFx0XHRcdCc8aW1nIHNyYz1cIicgKyBcblx0XHRcdFx0XHRcdFx0XHRcdGltYWdlc1tpXVtrZXldLnNpemVzLmxhcmdlICsgXG5cdFx0XHRcdFx0XHRcdFx0XHQnXCIgLz4nICtcblx0XHRcdFx0XHRcdFx0XHRcdCc8L2xpPic7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IFxuXHRcdFx0fSBcdFx0XG5cdFx0fVx0XHRcdFxuXHR9IFxuXG5cblxuXG5cblxuXHR2YXIgdGVzdGltb25pYWxzID0gZGF0YS5hY2YudGVzdGltb25pYWxzO1xuXHR2YXIgdGVzdGltb25pYWxJdGVtcyA9IFwiXCI7XG5cblx0aWYgKHRlc3RpbW9uaWFscy5sZW5ndGgpIHtcblxuXHRcdGZvciAoaSA9IDA7IGkgPD0gdGVzdGltb25pYWxzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGZvciAoa2V5IGluIHRlc3RpbW9uaWFsc1tpXSkge1xuXHRcdFx0XHRpZiAodGVzdGltb25pYWxzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRcdHRlc3RpbW9uaWFsSXRlbXMgKz0gXHQnPGxpPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGtleSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCcgOiAnICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdj4nICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGVzdGltb25pYWxzW2ldW2tleV0gKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvbGk+JztcdFx0XHRcdFx0XG5cdFx0XHRcdH0gXG5cdFx0XHR9IFx0XHRcblx0XHR9XHRcdFx0XG5cdH0gXG5cdFxuXG5cblx0dmFyIHdyYXBwZXIgPSAkKCc8ZGl2Lz4nLCB7XG5cdFx0J2NsYXNzJyA6ICd3cmFwcGVyJyxcdFx0XG5cdH0pO1xuXG5cdCQoJzxoMS8+Jywge1xuXHRcdCdjbGFzcycgOiAndGl0bGUnLFxuXHRcdGh0bWw6IHRpdGxlXG5cdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1x0XG5cblx0JCgnPGRpdi8+Jywge1xuXHRcdCdjbGFzcycgOiAnY29udGVudCcsXG5cdFx0aHRtbDogY29udGVudFxuXHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblxuXHRpZiAodGVzdGltb25pYWxzLmxlbmd0aCkge1xuXG5cdFx0JCgnPHVsLz4nLCB7XG5cdFx0XHQnY2xhc3MnIDogJ3Rlc3RpbW9uaWFscy1saXN0Jyxcblx0XHRcdGh0bWw6IHRlc3RpbW9uaWFsSXRlbXNcblx0XHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblx0fVxuXG5cblx0aWYgKGltYWdlcy5sZW5ndGgpIHtcblxuXHRcdCQoJzx1bC8+Jywge1xuXHRcdFx0J2NsYXNzJyA6ICdpbWFnZS1saXN0Jyxcblx0XHRcdGh0bWw6IGltYWdlSXRlbXNcblx0XHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblx0fVxuXG5cblxuXHRyZXR1cm4gd3JhcHBlcjtcblx0XG59OyIsInZhciBkb21FbHMgPSB7XG5cdFwicGFnZV9jb250YWluZXJcIiA6ICQoJyNqc19wYWdlX3NpbmdsZV9pdGVtJyksXG5cdFwiYmFja190b19tZW51X2J0blwiIDogJCgnI2pzX2JhY2tfdG9fbWVudScpLFxuXHRcInNwaW5uZXJcIiA6ICQoJzxkaXYgaWQ9XCJqc19sb2FkaW5nXCI+PGRpdiBjbGFzcz1cInNwaW5uZXJcIj48L2Rpdj48L2Rpdj4nKVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUVsczsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpcmVUcmFuc2l0aW9uKCkge1xuXHQkKCcuZWZmZWNrdCAudGhlLWJ0bicpLnRyaWdnZXIoJ2NsaWNrJyk7XG59OyIsInZhciBkb21FbHMgPSByZXF1aXJlKCcuL2RvbUVscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluamVjdFNwaW5uZXIoKSB7XG5cdCQoJ2JvZHknKS5hcHBlbmQoZG9tRWxzLnNwaW5uZXIpO1x0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNMb2FkZWQoaWRlbnRpZmllciwgYXJyLCByZXF1ZXN0KSB7XG5cblx0dmFyIHJlcyA9IGZhbHNlO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XG5cdFx0Zm9yIChrZXkgaW4gYXJyW2ldKSB7XG5cdFx0XHRcblx0XHRcdGlmIChhcnJbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdGlmIChhcnJbaV1ba2V5XSA9PT0gaWRlbnRpZmllcikge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBpZGVudGlmaWVyIGlzIGZvdW5kIHVwZGF0ZSByZXF1ZXN0LmlkXG5cdFx0XHRcdFx0Ly8gdXNlZCBmb3Igd2hlbiB0aGUgaWRlbnRpZmllciBpcyBub3QgdGhlIGlkIG51bWJlciAoZWcgc2x1Zylcblx0XHRcdFx0XHRyZXF1ZXN0LmlkID0gYXJyW2ldLnBhZ2VfaWQ7XG5cdFx0XHRcdFx0cmVzID0gdHJ1ZTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XHRcdFx0XHRcblx0fVxuXHRcblx0Y29uc29sZS5sb2coXCJpc0xvYWRlZCA6IFwiICsgcmVzKTtcblxuXHRyZXR1cm4gcmVzO1xuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFnZVN0YXRlVXBEYXRlKGRhdGEsIHBhZ2Vfc3RhdGUpIHtcblxuXHRwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcy5wdXNoKHtcblx0XHRcInBhZ2VfaWRcIiA6IGRhdGEuaWQsXG5cdFx0XCJwYWdlX3NsdWdcIiA6IGRhdGEuc2x1Zyxcblx0XHRcInBhZ2VfdXJsXCIgOiBkYXRhLmxpbmssXG5cdFx0XCJqc29uX2xpbmtcIiA6IGRhdGEuX2xpbmtzLnNlbGZbMF0uaHJlZlx0XHRcdFxuXHR9KTtcblxuXHRyZXR1cm4gcGFnZV9zdGF0ZTtcbn07IiwidmFyIGRvbUVscyA9IHJlcXVpcmUoJy4vZG9tRWxzJyk7XG52YXIgaXNMb2FkZWQgPSByZXF1aXJlKCcuL2lzTG9hZGVkJyk7XG52YXIgaW5qZWN0U3Bpbm5lciA9IHJlcXVpcmUoJy4vaW5qZWN0U3Bpbm5lcicpO1xudmFyIGFqYXhDYWxsID0gcmVxdWlyZSgnLi9hamF4Q2FsbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpIHtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZ1bmN0aW9uKGUpIHtcdFx0XG5cblx0XHQgICAgLy8gZ2V0IHRoZSBzbHVnXG4gICAgICAgIHBhdGhBcnJheSA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgdGhlSW5kZXggPSBwYXRoQXJyYXkubGVuZ3RoIC0gMjtcbiAgICAgICAgdGhlU2x1ZyA9IHBhdGhBcnJheVt0aGVJbmRleF07XHRcbiAgICAgICAgdGhlUmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIC8qXG4gICAgICAgICBcbiAgICAgICAgIGlmIHRoZVNsdWcgaXMgaW4gcG9zdGRhdGEuc2x1ZyB1cGRhdGUgcmVxdWVzdCBhbmQgZmlyZSBhamF4IC0geW91IGFyZSBvbiB0aGUgaG9tZXBhZ2VcbiAgICAgICAgIGlmIG5vdCB0cmlnZ2VyIGJhY2sgdG8gbWVudSBjbGljayBcblxuICAgICAgICAqL1xuXG4gICAgICAgIGZvciAoa2V5IGluIHBvc3RkYXRhLnNsdWcpIHtcblxuICAgICAgICAgIGlmIChwb3N0ZGF0YS5zbHVnLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coIGtleSArIFwiIDogXCIgKyBwb3N0ZGF0YS5zbHVnW2tleV0pO1xuXG4gICAgICAgICAgICBpZiAodGhlU2x1ZyA9PT0ga2V5KSB7XG5cbiAgICAgICAgICAgICAgdGhlUmVzdWx0ID0gdHJ1ZTsgXG4gICAgICAgICAgICAgIC8vIHVwZGF0ZXMgcmVxdWVzdCBvYmplY3RcbiAgICAgICAgICAgICAgcmVxdWVzdCA9IHt9O1xuICAgICAgICAgICAgICAvLyBnZXQgdGhlIGhyZWZcbiAgICAgICAgICAgICAgcmVxdWVzdC5ocmVmID0gXCJcIjtcbiAgICAgICAgICAgICAgLy8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuICAgICAgICAgICAgICByZXF1ZXN0LmlkID0gcG9zdGRhdGEuc2x1Z1trZXldOyAgIFxuICAgICAgICAgICAgICAvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3NcbiAgICAgICAgICAgICAgcmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdOyAgICAgICBcbiAgICAgICAgICAgICAgLy8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuICAgICAgICAgICAgICByZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gXG4gICAgICAgIH0gXG5cbiAgICAgICAgaWYgKHRoZVJlc3VsdCkgeyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmplY3RTcGlubmVyKCk7XG4gICAgICAgICAgICAvLyBpZiBpc0xvYWRlZCBncmFiIHRoZSBjaHVuayBmcm9tIGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgYWpheENhbGwocmVxdWVzdCk7ICAgICAgICAgIFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgXG4gICAgICAgICAvLyB3aW5kb3cubG9jYXRpb24uYXNzaWduKGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCk7XG4gICAgICAgICAgLy8gIGZvciBicm93c2Vyc3luYyBvbmx5IC0gQ0hBTkdFIFRPOlxuICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHBvc3RkYXRhLnJvb3RfdXJsKTsgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgIH0pOyAgICAgXHRcbn07XG5cblxuXG4iXX0=
