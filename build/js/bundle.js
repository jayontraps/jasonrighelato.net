(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ajaxCall = require('./modules/ajaxCall');
var readAddressBar = require('./modules/readAddressBar');
var isLoaded = require('./modules/isLoaded');
var transitionToPage = require('./modules/transitionToPage');
var transitionBackToMenu = require('./modules/transitionBackToMenu');

/* page transitions */
// var core = require('./modules/animations/core');
// var pageTransitions = require('./modules/animations/pageTransitions');


request = {
	"href" : "",
	"id" : 0,
	"id_str" : "",
	"json_url" : ""	
};

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

			$('.work_menu').on('mouseover', 'a', function(event) {

				// get the href
				request.href = $(this).attr("href");
				// Get items ID from the DOM
				request.id = $(this).data('api');		
				// Get REST URL from WordPress
				request.json_url = postdata.json_url[request.id];	

				if ( !isLoaded(request.id, page_state.loaded_pages, request) ) {
					ajaxCall(request);
				}

			});
		}




		/* CLICK */
		$('.work_menu').on('click', 'a', function(event) {

			event.preventDefault();			
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
			if ( isLoaded(request.id, page_state.loaded_pages, request) ) {
						
				transitionToPage(request);

			} else {

				ajaxCall(request);						
				transitionToPage(request);				
			}
		
			if (Modernizr.history) {
			 	history.pushState(null, null, request.href);
			}

		});



		/* BROWSERS BACK BUTTON */
		// add the popstate event handler on the page-portfolio and single-portfolio only
		// will the event handler remain on other pages??
		if ($('#primary').hasClass('work-page')) {
			readAddressBar(request, page_state);			
		}


		/* BACK TO MENU */
		$('#to-menu').on('click', function() {
			// build the 'work' URL
			var workMenuUrl = jr_portfolio.config.siteUrl + "/" + jr_portfolio.config.workPage + "/";
	        history.pushState( null, null, workMenuUrl );				
			transitionBackToMenu();
		});



	});


})(jQuery);
},{"./modules/ajaxCall":2,"./modules/isLoaded":4,"./modules/readAddressBar":6,"./modules/transitionBackToMenu":7,"./modules/transitionToPage":8}],2:[function(require,module,exports){
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
		$('#page_' + request.id).append(chunk);
	


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
        if (slug === jr_portfolio.config.workPage) {
          transitionBackToMenu();
          return;
        }

        // if loaded, find it and show it
       	if (isLoaded(slug, page_state.loaded_pages, request)) {

            request.id_str = 'page_' + request.id;
            transitionToPage(request);

       	}

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2J1aWxkVGVtcGxhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3RyYW5zaXRpb25CYWNrVG9NZW51LmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3RyYW5zaXRpb25Ub1BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgYWpheENhbGwgPSByZXF1aXJlKCcuL21vZHVsZXMvYWpheENhbGwnKTtcbnZhciByZWFkQWRkcmVzc0JhciA9IHJlcXVpcmUoJy4vbW9kdWxlcy9yZWFkQWRkcmVzc0JhcicpO1xudmFyIGlzTG9hZGVkID0gcmVxdWlyZSgnLi9tb2R1bGVzL2lzTG9hZGVkJyk7XG52YXIgdHJhbnNpdGlvblRvUGFnZSA9IHJlcXVpcmUoJy4vbW9kdWxlcy90cmFuc2l0aW9uVG9QYWdlJyk7XG52YXIgdHJhbnNpdGlvbkJhY2tUb01lbnUgPSByZXF1aXJlKCcuL21vZHVsZXMvdHJhbnNpdGlvbkJhY2tUb01lbnUnKTtcblxuLyogcGFnZSB0cmFuc2l0aW9ucyAqL1xuLy8gdmFyIGNvcmUgPSByZXF1aXJlKCcuL21vZHVsZXMvYW5pbWF0aW9ucy9jb3JlJyk7XG4vLyB2YXIgcGFnZVRyYW5zaXRpb25zID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FuaW1hdGlvbnMvcGFnZVRyYW5zaXRpb25zJyk7XG5cblxucmVxdWVzdCA9IHtcblx0XCJocmVmXCIgOiBcIlwiLFxuXHRcImlkXCIgOiAwLFxuXHRcImlkX3N0clwiIDogXCJcIixcblx0XCJqc29uX3VybFwiIDogXCJcIlx0XG59O1xuXG5wYWdlX3N0YXRlID0ge1xuXHRcImxvYWRlZF9wYWdlc1wiIDogW10sXG5cdFwiZnJvbVBhZ2VcIiA6IFwiXCIsXG5cdFwidG9QYWdlXCIgOiBcIlwiXG59O1xuXG4vLyBcImxvYWRlZF9wYWdlc1wiIDogW1xuLy8gXHR7XG4vLyBcdFx0anNvbl9saW5rOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy84XCJcbi8vIFx0XHRwYWdlX2lkOiA4XG4vLyBcdFx0cGFnZV9zbHVnOiBcImJpcmRzLW9mLWJlcmtzaGlyZS1hdGxhc1wiXG4vLyBcdFx0cGFnZV91cmw6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by9iaXJkcy1vZi1iZXJrc2hpcmUtYXRsYXMvXCJcdFx0XHRcbi8vIFx0fVxuLy8gXVxuXG5cbihmdW5jdGlvbigkKSB7XHRcblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuXHRcdC8qIEhPVkVSICovXG5cdFx0Ly8gaWYgbm8gdG91Y2ggd2UgY2FuIGFudGljaXBhdGUgYSBjbGljayBhbmQgZmlyZSBhamF4Q2FsbCBvbiBtb3VzZW92ZXJcblx0XHRpZiAoIU1vZGVybml6ci50b3VjaGV2ZW50cykge1xuXG5cdFx0XHQkKCcud29ya19tZW51Jykub24oJ21vdXNlb3ZlcicsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHRcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0XHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcblxuXHRcdFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0XHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cblxuXG5cdFx0LyogQ0xJQ0sgKi9cblx0XHQkKCcud29ya19tZW51Jykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1x0XHRcdFxuXHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcblx0XHRcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFxuXG5cdFx0XHQvLyBmb3IgbG9jYWwgYnJvd3NlcnN5bmMgdGVzdGluZyBcblx0XHRcdC8vIHJlcXVlc3QuanNvbl91cmwgPSBcImh0dHA6Ly8xOTIuMTY4LjEuNzE6MzAwMC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3BvcnRmb2xpby9cIiArIHJlcXVlc3QuaWQ7XG5cdFx0XG5cdFx0XHQvLyBpcyBpdCBhbHJlYWR5IGxvYWRlZCBpbnRvIERPTT8gQ2hlY2sgdGhlIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzIGFycmF5XG5cdFx0XHRpZiAoIGlzTG9hZGVkKHJlcXVlc3QuaWQsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSApIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHR0cmFuc2l0aW9uVG9QYWdlKHJlcXVlc3QpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGFqYXhDYWxsKHJlcXVlc3QpO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHR0cmFuc2l0aW9uVG9QYWdlKHJlcXVlc3QpO1x0XHRcdFx0XG5cdFx0XHR9XG5cdFx0XG5cdFx0XHRpZiAoTW9kZXJuaXpyLmhpc3RvcnkpIHtcblx0XHRcdCBcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHJlcXVlc3QuaHJlZik7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXG5cblx0XHQvKiBCUk9XU0VSUyBCQUNLIEJVVFRPTiAqL1xuXHRcdC8vIGFkZCB0aGUgcG9wc3RhdGUgZXZlbnQgaGFuZGxlciBvbiB0aGUgcGFnZS1wb3J0Zm9saW8gYW5kIHNpbmdsZS1wb3J0Zm9saW8gb25seVxuXHRcdC8vIHdpbGwgdGhlIGV2ZW50IGhhbmRsZXIgcmVtYWluIG9uIG90aGVyIHBhZ2VzPz9cblx0XHRpZiAoJCgnI3ByaW1hcnknKS5oYXNDbGFzcygnd29yay1wYWdlJykpIHtcblx0XHRcdHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpO1x0XHRcdFxuXHRcdH1cblxuXG5cdFx0LyogQkFDSyBUTyBNRU5VICovXG5cdFx0JCgnI3RvLW1lbnUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0XHRcdC8vIGJ1aWxkIHRoZSAnd29yaycgVVJMXG5cdFx0XHR2YXIgd29ya01lbnVVcmwgPSBqcl9wb3J0Zm9saW8uY29uZmlnLnNpdGVVcmwgKyBcIi9cIiArIGpyX3BvcnRmb2xpby5jb25maWcud29ya1BhZ2UgKyBcIi9cIjtcblx0ICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSggbnVsbCwgbnVsbCwgd29ya01lbnVVcmwgKTtcdFx0XHRcdFxuXHRcdFx0dHJhbnNpdGlvbkJhY2tUb01lbnUoKTtcblx0XHR9KTtcblxuXG5cblx0fSk7XG5cblxufSkoalF1ZXJ5KTsiLCJ2YXIgYnVpbGRUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vYnVpbGRUZW1wbGF0ZScpO1xudmFyIHBhZ2VTdGF0ZVVwRGF0ZSA9IHJlcXVpcmUoJy4vcGFnZVN0YXRlVXBEYXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYWpheENhbGwocmVxdWVzdCkge1xuXG5cdCQuYWpheCh7XG5cdCAgICB1cmw6IHJlcXVlc3QuanNvbl91cmwsXG5cdCAgICBkYXRhVHlwZTogJ2pzb24nXG5cdH0pXG5cblx0LmRvbmUoZnVuY3Rpb24oZGF0YSl7XHRcblxuXHRcdC8vIHVwZGF0ZSBwYWdlX3N0YXRlIG9iamVjdFxuXHRcdHBhZ2VTdGF0ZVVwRGF0ZShkYXRhLCBwYWdlX3N0YXRlKTtcdFx0XHRcdFx0XG5cdFx0XG5cdFx0Ly8gdGVtcGxhdGUgdGhlIGRhdGFcblx0XHR2YXIgY2h1bmsgPSBidWlsZFRlbXBsYXRlKGRhdGEpO1xuXG5cdFx0Ly8gaW5zZXJ0IGludG8gdGhlIERPTVxuXHRcdCQoJyNwYWdlXycgKyByZXF1ZXN0LmlkKS5hcHBlbmQoY2h1bmspO1xuXHRcblxuXG5cdFx0Ly8gcHV0IHRoZSB0ZW1wYXRlIGluIGxvY2FsIHN0b3JhZ2UgYXMgc3RyaW5naWZ5XG5cdFx0Ly8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwYWdlX1wiICsgcmVxdWVzdC5pZCwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuXHRcdFxuXHRcdC8vIGlmIChNb2Rlcm5penIubG9jYWxzdG9yYWdlKSB7XG5cdFx0Ly8gXHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdcblx0XHQvLyBcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwYWdlXycgKyByZXF1ZXN0LmlkLCBjaHVua1swXS5pbm5lckhUTUwpO1x0XHRcdFx0XG5cdFx0Ly8gfVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XG5cdH0pXG5cblx0LmZhaWwoZnVuY3Rpb24oKSB7XG5cdFx0Y29uc29sZS5sb2coJ2Vycm9yJyk7XG5cdH0pXG5cblx0LmFsd2F5cyhmdW5jdGlvbigpIHtcblx0XHQvLyBjb25zb2xlLmxvZygnY29tcGxldGUhJyk7XG5cdH0pO1x0XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFRlbXBsYXRlKGRhdGEpIHtcblxuXHR2YXIgaSA9IFwiXCI7XG5cdHZhciB0aXRsZSA9IGRhdGEudGl0bGUucmVuZGVyZWQ7XG5cdHZhciBjb250ZW50ID0gZGF0YS5jb250ZW50LnJlbmRlcmVkO1xuXG5cdHZhciBpbWFnZXMgPSBkYXRhLmFjZi5pbWFnZXM7XG5cdHZhciBpbWFnZUl0ZW1zID0gXCJcIjtcblxuXHRpZiAoaW1hZ2VzLmxlbmd0aCkge1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8PSBpbWFnZXMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0Zm9yIChrZXkgaW4gaW1hZ2VzW2ldKSB7XG5cblx0XHRcdFx0aWYgKGltYWdlc1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0XHRpbWFnZUl0ZW1zICs9IFx0JzxsaT4nICtcblx0XHRcdFx0XHRcdFx0XHRcdGltYWdlc1tpXVtrZXldLnRpdGxlICsgXG5cdFx0XHRcdFx0XHRcdFx0XHQnIDogJyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPGltZyBzcmM9XCInICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRpbWFnZXNbaV1ba2V5XS5zaXplcy5sYXJnZSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0J1wiIC8+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHQnPC9saT4nO1x0XHRcdFx0XHRcblx0XHRcdFx0fSBcblx0XHRcdH0gXHRcdFxuXHRcdH1cdFx0XHRcblx0fSBcblxuXG5cblxuXG5cblx0dmFyIHRlc3RpbW9uaWFscyA9IGRhdGEuYWNmLnRlc3RpbW9uaWFscztcblx0dmFyIHRlc3RpbW9uaWFsSXRlbXMgPSBcIlwiO1xuXG5cdGlmICh0ZXN0aW1vbmlhbHMubGVuZ3RoKSB7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDw9IHRlc3RpbW9uaWFscy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRmb3IgKGtleSBpbiB0ZXN0aW1vbmlhbHNbaV0pIHtcblx0XHRcdFx0aWYgKHRlc3RpbW9uaWFsc1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cblx0XHRcdFx0XHR0ZXN0aW1vbmlhbEl0ZW1zICs9IFx0JzxsaT4nICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRrZXkgKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnIDogJyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzxkaXY+JyArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHRlc3RpbW9uaWFsc1tpXVtrZXldICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvZGl2PicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCc8L2xpPic7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IFxuXHRcdFx0fSBcdFx0XG5cdFx0fVx0XHRcdFxuXHR9IFxuXHRcblxuXG5cdHZhciB3cmFwcGVyID0gJCgnPGRpdi8+Jywge1xuXHRcdCdjbGFzcycgOiAnd3JhcHBlcicsXHRcdFxuXHR9KTtcblxuXHQkKCc8aDEvPicsIHtcblx0XHQnY2xhc3MnIDogJ3RpdGxlJyxcblx0XHRodG1sOiB0aXRsZVxuXHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcdFxuXG5cdCQoJzxkaXYvPicsIHtcblx0XHQnY2xhc3MnIDogJ2NvbnRlbnQnLFxuXHRcdGh0bWw6IGNvbnRlbnRcblx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cblx0aWYgKHRlc3RpbW9uaWFscy5sZW5ndGgpIHtcblxuXHRcdCQoJzx1bC8+Jywge1xuXHRcdFx0J2NsYXNzJyA6ICd0ZXN0aW1vbmlhbHMtbGlzdCcsXG5cdFx0XHRodG1sOiB0ZXN0aW1vbmlhbEl0ZW1zXG5cdFx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cdH1cblxuXG5cdGlmIChpbWFnZXMubGVuZ3RoKSB7XG5cblx0XHQkKCc8dWwvPicsIHtcblx0XHRcdCdjbGFzcycgOiAnaW1hZ2UtbGlzdCcsXG5cdFx0XHRodG1sOiBpbWFnZUl0ZW1zXG5cdFx0fSkuYXBwZW5kVG8od3JhcHBlcik7XG5cdH1cblxuXG5cblx0cmV0dXJuIHdyYXBwZXI7XG5cdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzTG9hZGVkKGlkZW50aWZpZXIsIGFyciwgcmVxdWVzdCkge1xuXG5cdHZhciByZXMgPSBmYWxzZTtcblxuXHRmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuXHRcdFxuXHRcdGZvciAoa2V5IGluIGFycltpXSkge1xuXHRcdFx0XG5cdFx0XHRpZiAoYXJyW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRpZiAoYXJyW2ldW2tleV0gPT09IGlkZW50aWZpZXIpIHtcblx0XHRcdFx0XHQvLyBpZiB0aGUgaWRlbnRpZmllciBpcyBmb3VuZCB1cGRhdGUgcmVxdWVzdC5pZFxuXHRcdFx0XHRcdC8vIHVzZWQgZm9yIHdoZW4gdGhlIGlkZW50aWZpZXIgaXMgbm90IHRoZSBpZCBudW1iZXIgKGVnIHNsdWcpXG5cdFx0XHRcdFx0cmVxdWVzdC5pZCA9IGFycltpXS5wYWdlX2lkO1xuXHRcdFx0XHRcdHJlcyA9IHRydWU7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVx0XHRcdFx0XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xuXG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFnZVN0YXRlVXBEYXRlKGRhdGEsIHBhZ2Vfc3RhdGUpIHtcblxuXHRwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcy5wdXNoKHtcblx0XHRcInBhZ2VfaWRcIiA6IGRhdGEuaWQsXG5cdFx0XCJwYWdlX3NsdWdcIiA6IGRhdGEuc2x1Zyxcblx0XHRcInBhZ2VfdXJsXCIgOiBkYXRhLmxpbmssXG5cdFx0XCJqc29uX2xpbmtcIiA6IGRhdGEuX2xpbmtzLnNlbGZbMF0uaHJlZlx0XHRcdFxuXHR9KTtcblxuXHRyZXR1cm4gcGFnZV9zdGF0ZTtcbn07IiwidmFyIGlzTG9hZGVkID0gcmVxdWlyZSgnLi9pc0xvYWRlZCcpO1xudmFyIHRyYW5zaXRpb25Ub1BhZ2UgPSByZXF1aXJlKCcuL3RyYW5zaXRpb25Ub1BhZ2UnKTtcbnZhciB0cmFuc2l0aW9uQmFja1RvTWVudSA9IHJlcXVpcmUoJy4vdHJhbnNpdGlvbkJhY2tUb01lbnUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZWFkQWRkcmVzc0JhcihyZXF1ZXN0LCBwYWdlX3N0YXRlKSB7XG5cblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmdW5jdGlvbihlKSB7XHRcdFxuXG5cdFx0ICAgIC8vIGdldCB0aGUgc2x1Z1xuICAgICAgICBwYXRoQXJyYXkgPSBkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zcGxpdCggJy8nICk7XG4gICAgICAgIHRoZUluZGV4ID0gcGF0aEFycmF5Lmxlbmd0aCAtIDI7XG4gICAgICAgIHNsdWcgPSBwYXRoQXJyYXlbdGhlSW5kZXhdO1x0XG5cbiAgICAgICAgLy8gaWYgaXQncyBiYWNrIHRvIHRoZSBtZW51XG4gICAgICAgIGlmIChzbHVnID09PSBqcl9wb3J0Zm9saW8uY29uZmlnLndvcmtQYWdlKSB7XG4gICAgICAgICAgdHJhbnNpdGlvbkJhY2tUb01lbnUoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBsb2FkZWQsIGZpbmQgaXQgYW5kIHNob3cgaXRcbiAgICAgICBcdGlmIChpc0xvYWRlZChzbHVnLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkpIHtcblxuICAgICAgICAgICAgcmVxdWVzdC5pZF9zdHIgPSAncGFnZV8nICsgcmVxdWVzdC5pZDtcbiAgICAgICAgICAgIHRyYW5zaXRpb25Ub1BhZ2UocmVxdWVzdCk7XG5cbiAgICAgICBcdH1cblxuICAgIH0pOyAgICAgXHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2l0aW9uQmFja1RvTWVudShyZXF1ZXN0KSB7XG5cdFxuXHQkKCcucGFnZS13cmFwJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdCQoJy53b3JrX21lbnUgLnBhZ2Utd3JhcCcpLmFkZENsYXNzKCdvbicpO1xuXHRjb25zb2xlLmxvZygndHJhbnNpdGlvbkJhY2tUb01lbnUnKTtcblx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNpdGlvblRvUGFnZShyZXF1ZXN0KSB7XG5cdFxuXHQkKCcucGFnZS13cmFwJykucmVtb3ZlQ2xhc3MoJ29uJyk7XG5cdHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJlcXVlc3QuaWRfc3RyKTtcblx0JChlbCkuYWRkQ2xhc3MoJ29uJyk7XHRcblx0XG59OyJdfQ==
