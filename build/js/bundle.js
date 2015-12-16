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
		$('#app').on('click', 'a', function(event) {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2J1aWxkVGVtcGxhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3RyYW5zaXRpb25CYWNrVG9NZW51LmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3RyYW5zaXRpb25Ub1BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBhamF4Q2FsbCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9hamF4Q2FsbCcpO1xudmFyIHJlYWRBZGRyZXNzQmFyID0gcmVxdWlyZSgnLi9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyJyk7XG52YXIgaXNMb2FkZWQgPSByZXF1aXJlKCcuL21vZHVsZXMvaXNMb2FkZWQnKTtcbi8vIHZhciB0cmFuc2l0aW9uVG9QYWdlID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RyYW5zaXRpb25Ub1BhZ2UnKTtcbi8vIHZhciB0cmFuc2l0aW9uQmFja1RvTWVudSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90cmFuc2l0aW9uQmFja1RvTWVudScpO1xuXG5cbi8vIHJlcXVlc3QgPSB7XG4vLyBcdFwiaHJlZlwiIDogXCJcIixcbi8vIFx0XCJpZFwiIDogMCxcbi8vIFx0XCJpZF9zdHJcIiA6IFwiXCIsXG4vLyBcdFwianNvbl91cmxcIiA6IFwiXCJcdFxuLy8gfTtcblxucmVxdWVzdCA9IHt9O1xuXG5cbnBhZ2Vfc3RhdGUgPSB7XG5cdFwibG9hZGVkX3BhZ2VzXCIgOiBbXSxcblx0XCJmcm9tUGFnZVwiIDogXCJcIixcblx0XCJ0b1BhZ2VcIiA6IFwiXCJcbn07XG5cbi8vIFwibG9hZGVkX3BhZ2VzXCIgOiBbXG4vLyBcdHtcbi8vIFx0XHRqc29uX2xpbms6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3Bvc3RzLzhcIlxuLy8gXHRcdHBhZ2VfaWQ6IDhcbi8vIFx0XHRwYWdlX3NsdWc6IFwiYmlyZHMtb2YtYmVya3NoaXJlLWF0bGFzXCJcbi8vIFx0XHRwYWdlX3VybDogXCJodHRwOi8vbG9jYWxob3N0L2phc29ucmlnaGVsYXRvL2JpcmRzLW9mLWJlcmtzaGlyZS1hdGxhcy9cIlx0XHRcdFxuLy8gXHR9XG4vLyBdXG5cblxuKGZ1bmN0aW9uKCQpIHtcdFxuXG5cdCQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXG5cdFx0LyogSE9WRVIgKi9cblx0XHQvLyBpZiBubyB0b3VjaCB3ZSBjYW4gYW50aWNpcGF0ZSBhIGNsaWNrIGFuZCBmaXJlIGFqYXhDYWxsIG9uIG1vdXNlb3ZlclxuXHRcdGlmICghTW9kZXJuaXpyLnRvdWNoZXZlbnRzKSB7XG5cblx0XHRcdCQoJyNhcHAnKS5vbignbW91c2VvdmVyJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0XHRcdHJlcXVlc3QgPSB7fTtcblx0XHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0XHRcdC8vIEdldCBpdGVtcyBJRCBmcm9tIHRoZSBET01cblx0XHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHRcdFx0cmVxdWVzdC5qc29uX3VybCA9IHBvc3RkYXRhLmpzb25fdXJsW3JlcXVlc3QuaWRdO1xuXHRcdFx0XHQvLyBjcmVhdGUgdGhlIERPTSBlbCBpZCBzdHJpbmcgXG5cdFx0XHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcblxuXHRcdFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0XHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cblxuXG5cdFx0LyogQ0xJQ0sgKi9cblx0XHQkKCcjYXBwJykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1x0XHRcblxuXHRcdFx0cmVxdWVzdCA9IHt9O1x0XHRcdFx0XG5cdFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHRcdHJlcXVlc3QuaHJlZiA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XG5cdFx0XHQvLyBHZXQgaXRlbXMgSUQgZnJvbSB0aGUgRE9NXG5cdFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0XHQvLyBHZXQgUkVTVCBVUkwgZnJvbSBXb3JkUHJlc3Ncblx0XHRcdHJlcXVlc3QuanNvbl91cmwgPSBwb3N0ZGF0YS5qc29uX3VybFtyZXF1ZXN0LmlkXTtcdFxuXHRcdFx0Ly8gY3JlYXRlIHRoZSBET00gZWwgaWQgc3RyaW5nIFxuXHRcdFx0cmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcdFx0XG5cblx0XHRcdC8vIGZvciBsb2NhbCBicm93c2Vyc3luYyB0ZXN0aW5nIFxuXHRcdFx0Ly8gcmVxdWVzdC5qc29uX3VybCA9IFwiaHR0cDovLzE5Mi4xNjguMS43MTozMDAwL2phc29ucmlnaGVsYXRvL3dwLWpzb24vd3AvdjIvcG9ydGZvbGlvL1wiICsgcmVxdWVzdC5pZDtcblx0XHRcblx0XHRcdC8vIGlzIGl0IGFscmVhZHkgbG9hZGVkIGludG8gRE9NPyBDaGVjayB0aGUgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMgYXJyYXlcblx0XHRcdGlmICggIWlzTG9hZGVkKHJlcXVlc3QuaWQsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSApIHtcblx0XHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0XHR9XG5cdFx0XG5cdFx0XHRpZiAoTW9kZXJuaXpyLmhpc3RvcnkpIHtcblx0XHRcdCBcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHJlcXVlc3QuaHJlZik7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXG5cblx0XHQvKiBCUk9XU0VSUyBCQUNLIEJVVFRPTiAqL1xuXHRcdC8vIGFkZCB0aGUgcG9wc3RhdGUgZXZlbnQgaGFuZGxlciBvbiB0aGUgcGFnZS1wb3J0Zm9saW8gYW5kIHNpbmdsZS1wb3J0Zm9saW8gb25seVxuXHRcdC8vIHdpbGwgdGhlIGV2ZW50IGhhbmRsZXIgcmVtYWluIG9uIG90aGVyIHBhZ2VzPz9cblx0XHRpZiAoJCgnYm9keScpLmhhc0NsYXNzKCd3b3JrLXBhZ2UnKSkge1xuXHRcdFx0cmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSk7XHRcdFx0XG5cdFx0fVxuXG5cblx0XHQvKiBCQUNLIFRPIE1FTlUgKi9cblx0XHQkKCcjdG8tbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gYnVpbGQgdGhlICd3b3JrJyBVUkxcblx0XHRcdHZhciB3b3JrTWVudVVybCA9IGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCArIFwiL1wiO1xuXHQgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKCBudWxsLCBudWxsLCB3b3JrTWVudVVybCApO1x0XHRcdFx0XG5cdFx0XHQvLyB0cmFuc2l0aW9uQmFja1RvTWVudSgpO1xuXHRcdH0pO1xuXG5cblxuXHR9KTtcblxuXG59KShqUXVlcnkpOyIsInZhciBidWlsZFRlbXBsYXRlID0gcmVxdWlyZSgnLi9idWlsZFRlbXBsYXRlJyk7XG52YXIgcGFnZVN0YXRlVXBEYXRlID0gcmVxdWlyZSgnLi9wYWdlU3RhdGVVcERhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhamF4Q2FsbChyZXF1ZXN0KSB7XG5cblx0JC5hamF4KHtcblx0ICAgIHVybDogcmVxdWVzdC5qc29uX3VybCxcblx0ICAgIGRhdGFUeXBlOiAnanNvbidcblx0fSlcblxuXHQuZG9uZShmdW5jdGlvbihkYXRhKXtcdFxuXG5cdFx0Ly8gdXBkYXRlIHBhZ2Vfc3RhdGUgb2JqZWN0XG5cdFx0cGFnZVN0YXRlVXBEYXRlKGRhdGEsIHBhZ2Vfc3RhdGUpO1x0XHRcdFx0XHRcblx0XHRcblx0XHQvLyB0ZW1wbGF0ZSB0aGUgZGF0YVxuXHRcdHZhciBjaHVuayA9IGJ1aWxkVGVtcGxhdGUoZGF0YSk7XG5cblx0XHQvLyBpbnNlcnQgaW50byB0aGUgRE9NXG5cblx0XHRjb25zb2xlLmxvZygnIycgKyByZXF1ZXN0LmlkX3N0cik7XG5cdFx0XG5cdFx0JCgnIycgKyByZXF1ZXN0LmlkX3N0cikuYXBwZW5kKGNodW5rKTtcblx0XG5cblxuXHRcdC8vIHB1dCB0aGUgdGVtcGF0ZSBpbiBsb2NhbCBzdG9yYWdlIGFzIHN0cmluZ2lmeVxuXHRcdC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicGFnZV9cIiArIHJlcXVlc3QuaWQsIEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcblx0XHRcblx0XHQvLyBpZiAoTW9kZXJuaXpyLmxvY2Fsc3RvcmFnZSkge1xuXHRcdC8vIFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5nXG5cdFx0Ly8gXHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncGFnZV8nICsgcmVxdWVzdC5pZCwgY2h1bmtbMF0uaW5uZXJIVE1MKTtcdFx0XHRcdFxuXHRcdC8vIH1cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFxuXHR9KVxuXG5cdC5mYWlsKGZ1bmN0aW9uKCkge1xuXHRcdGNvbnNvbGUubG9nKCdlcnJvcicpO1xuXHR9KVxuXG5cdC5hbHdheXMoZnVuY3Rpb24oKSB7XG5cdFx0Ly8gY29uc29sZS5sb2coJ2NvbXBsZXRlIScpO1xuXHR9KTtcdFxuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRUZW1wbGF0ZShkYXRhKSB7XG5cblx0dmFyIGkgPSBcIlwiO1xuXHR2YXIgdGl0bGUgPSBkYXRhLnRpdGxlLnJlbmRlcmVkO1xuXHR2YXIgY29udGVudCA9IGRhdGEuY29udGVudC5yZW5kZXJlZDtcblxuXHR2YXIgaW1hZ2VzID0gZGF0YS5hY2YuaW1hZ2VzO1xuXHR2YXIgaW1hZ2VJdGVtcyA9IFwiXCI7XG5cblx0aWYgKGltYWdlcy5sZW5ndGgpIHtcblxuXHRcdGZvciAoaSA9IDA7IGkgPD0gaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGZvciAoa2V5IGluIGltYWdlc1tpXSkge1xuXG5cdFx0XHRcdGlmIChpbWFnZXNbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdFx0aW1hZ2VJdGVtcyArPSBcdCc8bGk+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRpbWFnZXNbaV1ba2V5XS50aXRsZSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0JyA6ICcgK1xuXHRcdFx0XHRcdFx0XHRcdFx0JzxpbWcgc3JjPVwiJyArIFxuXHRcdFx0XHRcdFx0XHRcdFx0aW1hZ2VzW2ldW2tleV0uc2l6ZXMubGFyZ2UgKyBcblx0XHRcdFx0XHRcdFx0XHRcdCdcIiAvPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0JzwvbGk+JztcdFx0XHRcdFx0XG5cdFx0XHRcdH0gXG5cdFx0XHR9IFx0XHRcblx0XHR9XHRcdFx0XG5cdH0gXG5cblxuXG5cblxuXG5cdHZhciB0ZXN0aW1vbmlhbHMgPSBkYXRhLmFjZi50ZXN0aW1vbmlhbHM7XG5cdHZhciB0ZXN0aW1vbmlhbEl0ZW1zID0gXCJcIjtcblxuXHRpZiAodGVzdGltb25pYWxzLmxlbmd0aCkge1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8PSB0ZXN0aW1vbmlhbHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0Zm9yIChrZXkgaW4gdGVzdGltb25pYWxzW2ldKSB7XG5cdFx0XHRcdGlmICh0ZXN0aW1vbmlhbHNbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdFx0dGVzdGltb25pYWxJdGVtcyArPSBcdCc8bGk+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0a2V5ICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JyA6ICcgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8ZGl2PicgKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0ZXN0aW1vbmlhbHNbaV1ba2V5XSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2Rpdj4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9saT4nO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBcblx0XHRcdH0gXHRcdFxuXHRcdH1cdFx0XHRcblx0fSBcblx0XG5cblxuXHR2YXIgd3JhcHBlciA9ICQoJzxkaXYvPicsIHtcblx0XHQnY2xhc3MnIDogJ3dyYXBwZXInLFx0XHRcblx0fSk7XG5cblx0JCgnPGgxLz4nLCB7XG5cdFx0J2NsYXNzJyA6ICd0aXRsZScsXG5cdFx0aHRtbDogdGl0bGVcblx0fSkuYXBwZW5kVG8od3JhcHBlcik7XHRcblxuXHQkKCc8ZGl2Lz4nLCB7XG5cdFx0J2NsYXNzJyA6ICdjb250ZW50Jyxcblx0XHRodG1sOiBjb250ZW50XG5cdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXG5cdGlmICh0ZXN0aW1vbmlhbHMubGVuZ3RoKSB7XG5cblx0XHQkKCc8dWwvPicsIHtcblx0XHRcdCdjbGFzcycgOiAndGVzdGltb25pYWxzLWxpc3QnLFxuXHRcdFx0aHRtbDogdGVzdGltb25pYWxJdGVtc1xuXHRcdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXHR9XG5cblxuXHRpZiAoaW1hZ2VzLmxlbmd0aCkge1xuXG5cdFx0JCgnPHVsLz4nLCB7XG5cdFx0XHQnY2xhc3MnIDogJ2ltYWdlLWxpc3QnLFxuXHRcdFx0aHRtbDogaW1hZ2VJdGVtc1xuXHRcdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1xuXHR9XG5cblxuXG5cdHJldHVybiB3cmFwcGVyO1xuXHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0xvYWRlZChpZGVudGlmaWVyLCBhcnIsIHJlcXVlc3QpIHtcblxuXHR2YXIgcmVzID0gZmFsc2U7XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcblx0XHRmb3IgKGtleSBpbiBhcnJbaV0pIHtcblx0XHRcdFxuXHRcdFx0aWYgKGFycltpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0aWYgKGFycltpXVtrZXldID09PSBpZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0Ly8gaWYgdGhlIGlkZW50aWZpZXIgaXMgZm91bmQgdXBkYXRlIHJlcXVlc3QuaWRcblx0XHRcdFx0XHQvLyB1c2VkIGZvciB3aGVuIHRoZSBpZGVudGlmaWVyIGlzIG5vdCB0aGUgaWQgbnVtYmVyIChlZyBzbHVnKVxuXHRcdFx0XHRcdHJlcXVlc3QuaWQgPSBhcnJbaV0ucGFnZV9pZDtcblx0XHRcdFx0XHRyZXMgPSB0cnVlO1x0XHRcdFx0XHRcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cdFx0XHRcdFxuXHR9XG5cdFxuXHRjb25zb2xlLmxvZyhcImlzTG9hZGVkIDogXCIgKyByZXMpO1xuXG5cdHJldHVybiByZXM7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSkge1xuXG5cdHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLnB1c2goe1xuXHRcdFwicGFnZV9pZFwiIDogZGF0YS5pZCxcblx0XHRcInBhZ2Vfc2x1Z1wiIDogZGF0YS5zbHVnLFxuXHRcdFwicGFnZV91cmxcIiA6IGRhdGEubGluayxcblx0XHRcImpzb25fbGlua1wiIDogZGF0YS5fbGlua3Muc2VsZlswXS5ocmVmXHRcdFx0XG5cdH0pO1xuXG5cdHJldHVybiBwYWdlX3N0YXRlO1xufTsiLCJ2YXIgaXNMb2FkZWQgPSByZXF1aXJlKCcuL2lzTG9hZGVkJyk7XG52YXIgdHJhbnNpdGlvblRvUGFnZSA9IHJlcXVpcmUoJy4vdHJhbnNpdGlvblRvUGFnZScpO1xudmFyIHRyYW5zaXRpb25CYWNrVG9NZW51ID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uQmFja1RvTWVudScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpIHtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZ1bmN0aW9uKGUpIHtcdFx0XG5cblx0XHQgICAgLy8gZ2V0IHRoZSBzbHVnXG4gICAgICAgIHBhdGhBcnJheSA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgdGhlSW5kZXggPSBwYXRoQXJyYXkubGVuZ3RoIC0gMjtcbiAgICAgICAgc2x1ZyA9IHBhdGhBcnJheVt0aGVJbmRleF07XHRcblxuICAgICAgICAvLyBpZiBpdCdzIGJhY2sgdG8gdGhlIG1lbnVcbiAgICAgICAgaWYgKHNsdWcgPT09IGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCkge1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIHRyYW5zaXRpb25CYWNrVG9NZW51KCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgbG9hZGVkLCBmaW5kIGl0IGFuZCBzaG93IGl0XG4gICAgICAgXHQvLyBpZiAoaXNMb2FkZWQoc2x1ZywgcGFnZV9zdGF0ZS5sb2FkZWRfcGFnZXMsIHJlcXVlc3QpKSB7XG5cbiAgICAgICAgLy8gICAgIHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XG4gICAgICAgIC8vICAgICB0cmFuc2l0aW9uVG9QYWdlKHJlcXVlc3QpO1xuXG4gICAgICAgXHQvLyB9XG5cbiAgICB9KTsgICAgIFx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNpdGlvbkJhY2tUb01lbnUocmVxdWVzdCkge1xuXHRcblx0JCgnLnBhZ2Utd3JhcCcpLnJlbW92ZUNsYXNzKCdvbicpO1xuXHQkKCcud29ya19tZW51IC5wYWdlLXdyYXAnKS5hZGRDbGFzcygnb24nKTtcblx0Y29uc29sZS5sb2coJ3RyYW5zaXRpb25CYWNrVG9NZW51Jyk7XG5cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zaXRpb25Ub1BhZ2UocmVxdWVzdCkge1xuXHRcblx0JCgnLnBhZ2Utd3JhcCcpLnJlbW92ZUNsYXNzKCdvbicpO1xuXHR2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyZXF1ZXN0LmlkX3N0cik7XG5cdCQoZWwpLmFkZENsYXNzKCdvbicpO1x0XG5cdFxufTsiXX0=
