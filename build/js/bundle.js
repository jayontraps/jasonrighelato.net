(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ajaxCall = require('./modules/ajaxCall');
var readAddressBar = require('./modules/readAddressBar');
var isLoaded = require('./modules/isLoaded');
// var transitionToPage = require('./modules/transitionToPage');
// var transitionBackToMenu = require('./modules/transitionBackToMenu');


// request = {
// 	"href" : "",
// 	"id" : 0,
// 	"id_str" : "",
// 	"json_url" : ""	
// };

request = {};


page_state = {
	"loaded_pages" : [],
	"fromPage" : "",
	"toPage" : ""
};

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

		/* HOVER */
		// if no touch we can anticipate a click and fire ajaxCall on mouseover
		if (!Modernizr.touchevents) {

			$('#app').on('mouseover', 'a', function(event) {

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
		$('#app').on('touchstart click', 'a', function(event) {

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

			// for local browsersync testing 
			// request.json_url = "http://192.168.1.71:3000/jasonrighelato/wp-json/wp/v2/portfolio/" + request.id;
		
			// is it already loaded into DOM? Check the page_state.loaded_pages array
			if ( !isLoaded(request.id, page_state.loaded_pages, request) ) {
				ajaxCall(request);
			}
		
			if (Modernizr.history) {
			 	history.pushState(null, null, request.href);
			}

		});



		/* BROWSERS BACK BUTTON */
		// add the popstate event handler on the page-portfolio and single-portfolio only
		// will the event handler remain on other pages??
		if ($('body').hasClass('work-page')) {
			readAddressBar(request, page_state);			
		}


		/* BACK TO MENU */
		$('#to-menu').on('click', function() {
			// build the 'work' URL
			var workMenuUrl = jr_portfolio.config.siteUrl + "/";
	        history.pushState( null, null, workMenuUrl );				
			// transitionBackToMenu();
		});



	});


})(jQuery);
},{"./modules/ajaxCall":2,"./modules/isLoaded":4,"./modules/readAddressBar":6}],2:[function(require,module,exports){
var buildTemplate = require('./buildTemplate');
var pageStateUpDate = require('./pageStateUpDate');

module.exports = function ajaxCall(request) {

	$.ajax({
	    url: request.json_url,
	    dataType: 'json'
	})

	.done(function(data){	

		// update page_state object
		pageStateUpDate(data, page_state);					
		
		// template the data
		var chunk = buildTemplate(data);

		// insert into the DOM

		console.log('#' + request.id_str);
		
		$('#' + request.id_str).append(chunk);
	


		// put the tempate in local storage as stringify
		// localStorage.setItem("page_" + request.id, JSON.stringify(data));
		
		// if (Modernizr.localstorage) {
		// 	// put the tempate in local storage as string
		// 	localStorage.setItem('page_' + request.id, chunk[0].innerHTML);				
		// }
															
	})

	.fail(function() {
		console.log('error');
	})

	.always(function() {
		// console.log('complete!');
	});	

};
},{"./buildTemplate":3,"./pageStateUpDate":5}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
module.exports = function pageStateUpDate(data, page_state) {

	page_state.loaded_pages.push({
		"page_id" : data.id,
		"page_slug" : data.slug,
		"page_url" : data.link,
		"json_link" : data._links.self[0].href			
	});

	return page_state;
};
},{}],6:[function(require,module,exports){
var isLoaded = require('./isLoaded');
var transitionToPage = require('./transitionToPage');
var transitionBackToMenu = require('./transitionBackToMenu');

module.exports = function readAddressBar(request, page_state) {

	window.addEventListener("popstate", function(e) {		

		    // get the slug
        pathArray = document.location.pathname.split( '/' );
        theIndex = pathArray.length - 2;
        slug = pathArray[theIndex];	

        // if it's back to the menu
        if (slug === jr_portfolio.config.siteUrl) {
          
          // transitionBackToMenu();
          return;
        }

        // if loaded, find it and show it
       	// if (isLoaded(slug, page_state.loaded_pages, request)) {

        //     request.id_str = 'page_' + request.id;
        //     transitionToPage(request);

       	// }

    });     	
};
},{"./isLoaded":4,"./transitionBackToMenu":7,"./transitionToPage":8}],7:[function(require,module,exports){
module.exports = function transitionBackToMenu(request) {
	
	$('.page-wrap').removeClass('on');
	$('.work_menu .page-wrap').addClass('on');
	console.log('transitionBackToMenu');
	
};
},{}],8:[function(require,module,exports){
module.exports = function transitionToPage(request) {
	
	$('.page-wrap').removeClass('on');
	var el = document.getElementById(request.id_str);
	$(el).addClass('on');	
	
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2J1aWxkVGVtcGxhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3RyYW5zaXRpb25CYWNrVG9NZW51LmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3RyYW5zaXRpb25Ub1BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhamF4Q2FsbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hamF4Q2FsbCcpO1xudmFyIHJlYWRBZGRyZXNzQmFyID0gcmVxdWlyZSgnLi9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyJyk7XG52YXIgaXNMb2FkZWQgPSByZXF1aXJlKCcuL21vZHVsZXMvaXNMb2FkZWQnKTtcbi8vIHZhciB0cmFuc2l0aW9uVG9QYWdlID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RyYW5zaXRpb25Ub1BhZ2UnKTtcbi8vIHZhciB0cmFuc2l0aW9uQmFja1RvTWVudSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90cmFuc2l0aW9uQmFja1RvTWVudScpO1xuXG5cbi8vIHJlcXVlc3QgPSB7XG4vLyBcdFwiaHJlZlwiIDogXCJcIixcbi8vIFx0XCJpZFwiIDogMCxcbi8vIFx0XCJpZF9zdHJcIiA6IFwiXCIsXG4vLyBcdFwianNvbl91cmxcIiA6IFwiXCJcdFxuLy8gfTtcblxucmVxdWVzdCA9IHt9O1xuXG5cbnBhZ2Vfc3RhdGUgPSB7XG5cdFwibG9hZGVkX3BhZ2VzXCIgOiBbXSxcblx0XCJmcm9tUGFnZVwiIDogXCJcIixcblx0XCJ0b1BhZ2VcIiA6IFwiXCJcbn07XG5cbi8vIFwibG9hZGVkX3BhZ2VzXCIgOiBbXG4vLyBcdHtcbi8vIFx0XHRqc29uX2xpbms6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzhcIlxuLy8gXHRcdHBhZ2VfaWQ6IDhcbi8vIFx0XHRwYWdlX3NsdWc6IFwiYmlyZHMtb2YtYmVya3NoaXJlLWF0bGFzXCJcbi8vIFx0XHRwYWdlX3VybDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL2JpcmRzLW9mLWJlcmtzaGlyZS1hdGxhcy9cIlx0XHRcdFxuLy8gXHR9XG4vLyBdXG5cblxuKGZ1bmN0aW9uKCQpIHtcdFxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG5cdFx0LyogSE9WRVIgKi9cblx0XHQvLyBpZiBubyB0b3VjaCB3ZSBjYW4gYW50aWNpcGF0ZSBhIGNsaWNrIGFuZCBmaXJlIGFqYXhDYWxsIG9uIG1vdXNlb3ZlclxuXHRcdGlmICghTW9kZXJuaXpyLnRvdWNoZXZlbnRzKSB7XG5cblx0XHRcdCQoJyNhcHAnKS5vbignbW91c2VvdmVyJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0XHRcdHJlcXVlc3QgPSB7fTtcblx0XHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0XHRcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHRcdFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1xuXHRcdFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0XHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcblxuXHRcdFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0XHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cblxuXG5cdFx0LyogQ0xJQ0sgKi9cblx0XHQkKCcjYXBwJykub24oJ3RvdWNoc3RhcnQgY2xpY2snLCAnYScsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHRcdFxuXG5cdFx0XHRyZXF1ZXN0ID0ge307XHRcdFx0XHRcblx0XHRcdC8vIGdldCB0aGUgaHJlZlxuXHRcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHRcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHRcdHJlcXVlc3QuaWQgPSAkKHRoaXMpLmRhdGEoJ2FwaScpO1x0XHRcblx0XHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1x0XG5cdFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0XHRyZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1x0XHRcblxuXHRcdFx0Ly8gZm9yIGxvY2FsIGJyb3dzZXJzeW5jIHRlc3RpbmcgXG5cdFx0XHQvLyByZXF1ZXN0Lmpzb25fdXJsID0gXCJodHRwOi8vMTkyLjE2OC4xLjcxOjMwMDAvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3J0Zm9saW8vXCIgKyByZXF1ZXN0LmlkO1xuXHRcdFxuXHRcdFx0Ly8gaXMgaXQgYWxyZWFkeSBsb2FkZWQgaW50byBET00/IENoZWNrIHRoZSBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcyBhcnJheVxuXHRcdFx0aWYgKCAhaXNMb2FkZWQocmVxdWVzdC5pZCwgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMsIHJlcXVlc3QpICkge1xuXHRcdFx0XHRhamF4Q2FsbChyZXF1ZXN0KTtcblx0XHRcdH1cblx0XHRcblx0XHRcdGlmIChNb2Rlcm5penIuaGlzdG9yeSkge1xuXHRcdFx0IFx0aGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgcmVxdWVzdC5ocmVmKTtcblx0XHRcdH1cblxuXHRcdH0pO1xuXG5cblxuXHRcdC8qIEJST1dTRVJTIEJBQ0sgQlVUVE9OICovXG5cdFx0Ly8gYWRkIHRoZSBwb3BzdGF0ZSBldmVudCBoYW5kbGVyIG9uIHRoZSBwYWdlLXBvcnRmb2xpbyBhbmQgc2luZ2xlLXBvcnRmb2xpbyBvbmx5XG5cdFx0Ly8gd2lsbCB0aGUgZXZlbnQgaGFuZGxlciByZW1haW4gb24gb3RoZXIgcGFnZXM/P1xuXHRcdGlmICgkKCdib2R5JykuaGFzQ2xhc3MoJ3dvcmstcGFnZScpKSB7XG5cdFx0XHRyZWFkQWRkcmVzc0JhcihyZXF1ZXN0LCBwYWdlX3N0YXRlKTtcdFx0XHRcblx0XHR9XG5cblxuXHRcdC8qIEJBQ0sgVE8gTUVOVSAqL1xuXHRcdCQoJyN0by1tZW51Jykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG5cdFx0XHQvLyBidWlsZCB0aGUgJ3dvcmsnIFVSTFxuXHRcdFx0dmFyIHdvcmtNZW51VXJsID0ganJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsICsgXCIvXCI7XG5cdCAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoIG51bGwsIG51bGwsIHdvcmtNZW51VXJsICk7XHRcdFx0XHRcblx0XHRcdC8vIHRyYW5zaXRpb25CYWNrVG9NZW51KCk7XG5cdFx0fSk7XG5cblxuXG5cdH0pO1xuXG5cbn0pKGpRdWVyeSk7IiwidmFyIGJ1aWxkVGVtcGxhdGUgPSByZXF1aXJlKCcuL2J1aWxkVGVtcGxhdGUnKTtcbnZhciBwYWdlU3RhdGVVcERhdGUgPSByZXF1aXJlKCcuL3BhZ2VTdGF0ZVVwRGF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFqYXhDYWxsKHJlcXVlc3QpIHtcblxuXHQkLmFqYXgoe1xuXHQgICAgdXJsOiByZXF1ZXN0Lmpzb25fdXJsLFxuXHQgICAgZGF0YVR5cGU6ICdqc29uJ1xuXHR9KVxuXG5cdC5kb25lKGZ1bmN0aW9uKGRhdGEpe1x0XG5cblx0XHQvLyB1cGRhdGUgcGFnZV9zdGF0ZSBvYmplY3Rcblx0XHRwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSk7XHRcdFx0XHRcdFxuXHRcdFxuXHRcdC8vIHRlbXBsYXRlIHRoZSBkYXRhXG5cdFx0dmFyIGNodW5rID0gYnVpbGRUZW1wbGF0ZShkYXRhKTtcblxuXHRcdC8vIGluc2VydCBpbnRvIHRoZSBET01cblxuXHRcdGNvbnNvbGUubG9nKCcjJyArIHJlcXVlc3QuaWRfc3RyKTtcblx0XHRcblx0XHQkKCcjJyArIHJlcXVlc3QuaWRfc3RyKS5hcHBlbmQoY2h1bmspO1xuXHRcblxuXG5cdFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5naWZ5XG5cdFx0Ly8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYWdlX1wiICsgcmVxdWVzdC5pZCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdFxuXHRcdC8vIGlmIChNb2Rlcm5penIubG9jYWxzdG9yYWdlKSB7XG5cdFx0Ly8gXHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdcblx0XHQvLyBcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYWdlXycgKyByZXF1ZXN0LmlkLCBjaHVua1swXS5pbm5lckhUTUwpO1x0XHRcdFx0XG5cdFx0Ly8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdH0pXG5cblx0LmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coJ2Vycm9yJyk7XG5cdH0pXG5cblx0LmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHQvLyBjb25zb2xlLmxvZygnY29tcGxldGUhJyk7XG5cdH0pO1x0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFRlbXBsYXRlKGRhdGEpIHtcblxuXHR2YXIgaSA9IFwiXCI7XG5cdHZhciB0aXRsZSA9IGRhdGEudGl0bGUucmVuZGVyZWQ7XG5cdHZhciBjb250ZW50ID0gZGF0YS5jb250ZW50LnJlbmRlcmVkO1xuXG5cdHZhciBpbWFnZXMgPSBkYXRhLmFjZi5pbWFnZXM7XG5cdHZhciBpbWFnZUl0ZW1zID0gXCJcIjtcblxuXHRpZiAoaW1hZ2VzLmxlbmd0aCkge1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8PSBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0Zm9yIChrZXkgaW4gaW1hZ2VzW2ldKSB7XG5cblx0XHRcdFx0aWYgKGltYWdlc1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0XHRpbWFnZUl0ZW1zICs9IFx0JzxsaT4nICtcblx0XHRcdFx0XHRcdFx0XHRcdGltYWdlc1tpXVtrZXldLnRpdGxlICsgXG5cdFx0XHRcdFx0XHRcdFx0XHQnIDogJyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPGltZyBzcmM9XCInICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRpbWFnZXNbaV1ba2V5XS5zaXplcy5sYXJnZSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0J1wiIC8+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPC9saT4nO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBcblx0XHRcdH0gXHRcdFxuXHRcdH1cdFx0XHRcblx0fSBcblxuXG5cblxuXG5cblx0dmFyIHRlc3RpbW9uaWFscyA9IGRhdGEuYWNmLnRlc3RpbW9uaWFscztcblx0dmFyIHRlc3RpbW9uaWFsSXRlbXMgPSBcIlwiO1xuXG5cdGlmICh0ZXN0aW1vbmlhbHMubGVuZ3RoKSB7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDw9IHRlc3RpbW9uaWFscy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRmb3IgKGtleSBpbiB0ZXN0aW1vbmlhbHNbaV0pIHtcblx0XHRcdFx0aWYgKHRlc3RpbW9uaWFsc1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0XHR0ZXN0aW1vbmlhbEl0ZW1zICs9IFx0JzxsaT4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRrZXkgKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnIDogJyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXY+JyArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRlc3RpbW9uaWFsc1tpXVtrZXldICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2xpPic7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IFxuXHRcdFx0fSBcdFx0XG5cdFx0fVx0XHRcdFxuXHR9IFxuXHRcblxuXG5cdHZhciB3cmFwcGVyID0gJCgnPGRpdi8+Jywge1xuXHRcdCdjbGFzcycgOiAnd3JhcHBlcicsXHRcdFxuXHR9KTtcblxuXHQkKCc8aDEvPicsIHtcblx0XHQnY2xhc3MnIDogJ3RpdGxlJyxcblx0XHRodG1sOiB0aXRsZVxuXHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcdFxuXG5cdCQoJzxkaXYvPicsIHtcblx0XHQnY2xhc3MnIDogJ2NvbnRlbnQnLFxuXHRcdGh0bWw6IGNvbnRlbnRcblx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cblx0aWYgKHRlc3RpbW9uaWFscy5sZW5ndGgpIHtcblxuXHRcdCQoJzx1bC8+Jywge1xuXHRcdFx0J2NsYXNzJyA6ICd0ZXN0aW1vbmlhbHMtbGlzdCcsXG5cdFx0XHRodG1sOiB0ZXN0aW1vbmlhbEl0ZW1zXG5cdFx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cdH1cblxuXG5cdGlmIChpbWFnZXMubGVuZ3RoKSB7XG5cblx0XHQkKCc8dWwvPicsIHtcblx0XHRcdCdjbGFzcycgOiAnaW1hZ2UtbGlzdCcsXG5cdFx0XHRodG1sOiBpbWFnZUl0ZW1zXG5cdFx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cdH1cblxuXG5cblx0cmV0dXJuIHdyYXBwZXI7XG5cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTG9hZGVkKGlkZW50aWZpZXIsIGFyciwgcmVxdWVzdCkge1xuXG5cdHZhciByZXMgPSBmYWxzZTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdFxuXHRcdGZvciAoa2V5IGluIGFycltpXSkge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXJyW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRpZiAoYXJyW2ldW2tleV0gPT09IGlkZW50aWZpZXIpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgaWRlbnRpZmllciBpcyBmb3VuZCB1cGRhdGUgcmVxdWVzdC5pZFxuXHRcdFx0XHRcdC8vIHVzZWQgZm9yIHdoZW4gdGhlIGlkZW50aWZpZXIgaXMgbm90IHRoZSBpZCBudW1iZXIgKGVnIHNsdWcpXG5cdFx0XHRcdFx0cmVxdWVzdC5pZCA9IGFycltpXS5wYWdlX2lkO1xuXHRcdFx0XHRcdHJlcyA9IHRydWU7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVx0XHRcdFx0XG5cdH1cblx0XG5cdGNvbnNvbGUubG9nKFwiaXNMb2FkZWQgOiBcIiArIHJlcyk7XG5cblx0cmV0dXJuIHJlcztcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZ2VTdGF0ZVVwRGF0ZShkYXRhLCBwYWdlX3N0YXRlKSB7XG5cblx0cGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMucHVzaCh7XG5cdFx0XCJwYWdlX2lkXCIgOiBkYXRhLmlkLFxuXHRcdFwicGFnZV9zbHVnXCIgOiBkYXRhLnNsdWcsXG5cdFx0XCJwYWdlX3VybFwiIDogZGF0YS5saW5rLFxuXHRcdFwianNvbl9saW5rXCIgOiBkYXRhLl9saW5rcy5zZWxmWzBdLmhyZWZcdFx0XHRcblx0fSk7XG5cblx0cmV0dXJuIHBhZ2Vfc3RhdGU7XG59OyIsInZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vaXNMb2FkZWQnKTtcbnZhciB0cmFuc2l0aW9uVG9QYWdlID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uVG9QYWdlJyk7XG52YXIgdHJhbnNpdGlvbkJhY2tUb01lbnUgPSByZXF1aXJlKCcuL3RyYW5zaXRpb25CYWNrVG9NZW51Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSkge1xuXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZnVuY3Rpb24oZSkge1x0XHRcblxuXHRcdCAgICAvLyBnZXQgdGhlIHNsdWdcbiAgICAgICAgcGF0aEFycmF5ID0gZG9jdW1lbnQubG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoICcvJyApO1xuICAgICAgICB0aGVJbmRleCA9IHBhdGhBcnJheS5sZW5ndGggLSAyO1xuICAgICAgICBzbHVnID0gcGF0aEFycmF5W3RoZUluZGV4XTtcdFxuXG4gICAgICAgIC8vIGlmIGl0J3MgYmFjayB0byB0aGUgbWVudVxuICAgICAgICBpZiAoc2x1ZyA9PT0ganJfcG9ydGZvbGlvLmNvbmZpZy5zaXRlVXJsKSB7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gdHJhbnNpdGlvbkJhY2tUb01lbnUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBsb2FkZWQsIGZpbmQgaXQgYW5kIHNob3cgaXRcbiAgICAgICBcdC8vIGlmIChpc0xvYWRlZChzbHVnLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkpIHtcblxuICAgICAgICAvLyAgICAgcmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcbiAgICAgICAgLy8gICAgIHRyYW5zaXRpb25Ub1BhZ2UocmVxdWVzdCk7XG5cbiAgICAgICBcdC8vIH1cblxuICAgIH0pOyAgICAgXHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2l0aW9uQmFja1RvTWVudShyZXF1ZXN0KSB7XG5cdFxuXHQkKCcucGFnZS13cmFwJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdCQoJy53b3JrX21lbnUgLnBhZ2Utd3JhcCcpLmFkZENsYXNzKCdvbicpO1xuXHRjb25zb2xlLmxvZygndHJhbnNpdGlvbkJhY2tUb01lbnUnKTtcblx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNpdGlvblRvUGFnZShyZXF1ZXN0KSB7XG5cdFxuXHQkKCcucGFnZS13cmFwJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJlcXVlc3QuaWRfc3RyKTtcblx0JChlbCkuYWRkQ2xhc3MoJ29uJyk7XHRcblx0XG59OyJdfQ==
