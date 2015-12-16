(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ajaxCall = require('./modules/ajaxCall');
var readAddressBar = require('./modules/readAddressBar');
var isLoaded = require('./modules/isLoaded');
var transitionToPage = require('./modules/transitionToPage');
var transitionBackToMenu = require('./modules/transitionBackToMenu');


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
		if ($('body').hasClass('work-page')) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwL2VudHJ5Iiwic3JjL2pzL2FwcC9tb2R1bGVzL2FqYXhDYWxsLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL2J1aWxkVGVtcGxhdGUuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvaXNMb2FkZWQuanMiLCJzcmMvanMvYXBwL21vZHVsZXMvcGFnZVN0YXRlVXBEYXRlLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3JlYWRBZGRyZXNzQmFyLmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3RyYW5zaXRpb25CYWNrVG9NZW51LmpzIiwic3JjL2pzL2FwcC9tb2R1bGVzL3RyYW5zaXRpb25Ub1BhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGFqYXhDYWxsID0gcmVxdWlyZSgnLi9tb2R1bGVzL2FqYXhDYWxsJyk7XG52YXIgcmVhZEFkZHJlc3NCYXIgPSByZXF1aXJlKCcuL21vZHVsZXMvcmVhZEFkZHJlc3NCYXInKTtcbnZhciBpc0xvYWRlZCA9IHJlcXVpcmUoJy4vbW9kdWxlcy9pc0xvYWRlZCcpO1xudmFyIHRyYW5zaXRpb25Ub1BhZ2UgPSByZXF1aXJlKCcuL21vZHVsZXMvdHJhbnNpdGlvblRvUGFnZScpO1xudmFyIHRyYW5zaXRpb25CYWNrVG9NZW51ID0gcmVxdWlyZSgnLi9tb2R1bGVzL3RyYW5zaXRpb25CYWNrVG9NZW51Jyk7XG5cblxucmVxdWVzdCA9IHtcblx0XCJocmVmXCIgOiBcIlwiLFxuXHRcImlkXCIgOiAwLFxuXHRcImlkX3N0clwiIDogXCJcIixcblx0XCJqc29uX3VybFwiIDogXCJcIlx0XG59O1xuXG5wYWdlX3N0YXRlID0ge1xuXHRcImxvYWRlZF9wYWdlc1wiIDogW10sXG5cdFwiZnJvbVBhZ2VcIiA6IFwiXCIsXG5cdFwidG9QYWdlXCIgOiBcIlwiXG59O1xuXG4vLyBcImxvYWRlZF9wYWdlc1wiIDogW1xuLy8gXHR7XG4vLyBcdFx0anNvbl9saW5rOiBcImh0dHA6Ly9sb2NhbGhvc3QvamFzb25yaWdoZWxhdG8vd3AtanNvbi93cC92Mi9wb3N0cy84XCJcbi8vIFx0XHRwYWdlX2lkOiA4XG4vLyBcdFx0cGFnZV9zbHVnOiBcImJpcmRzLW9mLWJlcmtzaGlyZS1hdGxhc1wiXG4vLyBcdFx0cGFnZV91cmw6IFwiaHR0cDovL2xvY2FsaG9zdC9qYXNvbnJpZ2hlbGF0by9iaXJkcy1vZi1iZXJrc2hpcmUtYXRsYXMvXCJcdFx0XHRcbi8vIFx0fVxuLy8gXVxuXG5cbihmdW5jdGlvbigkKSB7XHRcblxuXHQkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblxuXHRcdC8qIEhPVkVSICovXG5cdFx0Ly8gaWYgbm8gdG91Y2ggd2UgY2FuIGFudGljaXBhdGUgYSBjbGljayBhbmQgZmlyZSBhamF4Q2FsbCBvbiBtb3VzZW92ZXJcblx0XHRpZiAoIU1vZGVybml6ci50b3VjaGV2ZW50cykge1xuXG5cdFx0XHQkKCcud29ya19tZW51Jykub24oJ21vdXNlb3ZlcicsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdFx0XHQvLyBnZXQgdGhlIGhyZWZcblx0XHRcdFx0cmVxdWVzdC5ocmVmID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcblx0XHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0XHRyZXF1ZXN0LmlkID0gJCh0aGlzKS5kYXRhKCdhcGknKTtcdFx0XG5cdFx0XHRcdC8vIEdldCBSRVNUIFVSTCBmcm9tIFdvcmRQcmVzc1xuXHRcdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcblxuXHRcdFx0XHRpZiAoICFpc0xvYWRlZChyZXF1ZXN0LmlkLCBwYWdlX3N0YXRlLmxvYWRlZF9wYWdlcywgcmVxdWVzdCkgKSB7XG5cdFx0XHRcdFx0YWpheENhbGwocmVxdWVzdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cblxuXG5cdFx0LyogQ0xJQ0sgKi9cblx0XHQkKCcud29ya19tZW51Jykub24oJ2NsaWNrJywgJ2EnLCBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1x0XHRcdFxuXHRcdFx0Ly8gZ2V0IHRoZSBocmVmXG5cdFx0XHRyZXF1ZXN0LmhyZWYgPSAkKHRoaXMpLmF0dHIoXCJocmVmXCIpO1xuXHRcdFx0Ly8gR2V0IGl0ZW1zIElEIGZyb20gdGhlIERPTVxuXHRcdFx0cmVxdWVzdC5pZCA9ICQodGhpcykuZGF0YSgnYXBpJyk7XHRcdFxuXHRcdFx0Ly8gR2V0IFJFU1QgVVJMIGZyb20gV29yZFByZXNzXG5cdFx0XHRyZXF1ZXN0Lmpzb25fdXJsID0gcG9zdGRhdGEuanNvbl91cmxbcmVxdWVzdC5pZF07XHRcblx0XHRcdC8vIGNyZWF0ZSB0aGUgRE9NIGVsIGlkIHN0cmluZyBcblx0XHRcdHJlcXVlc3QuaWRfc3RyID0gJ3BhZ2VfJyArIHJlcXVlc3QuaWQ7XHRcdFxuXG5cdFx0XHQvLyBmb3IgbG9jYWwgYnJvd3NlcnN5bmMgdGVzdGluZyBcblx0XHRcdC8vIHJlcXVlc3QuanNvbl91cmwgPSBcImh0dHA6Ly8xOTIuMTY4LjEuNzE6MzAwMC9qYXNvbnJpZ2hlbGF0by93cC1qc29uL3dwL3YyL3BvcnRmb2xpby9cIiArIHJlcXVlc3QuaWQ7XG5cdFx0XG5cdFx0XHQvLyBpcyBpdCBhbHJlYWR5IGxvYWRlZCBpbnRvIERPTT8gQ2hlY2sgdGhlIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzIGFycmF5XG5cdFx0XHRpZiAoIGlzTG9hZGVkKHJlcXVlc3QuaWQsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSApIHtcblx0XHRcdFx0XHRcdFxuXHRcdFx0XHR0cmFuc2l0aW9uVG9QYWdlKHJlcXVlc3QpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGFqYXhDYWxsKHJlcXVlc3QpO1x0XHRcdFx0XHRcdFxuXHRcdFx0XHR0cmFuc2l0aW9uVG9QYWdlKHJlcXVlc3QpO1x0XHRcdFx0XG5cdFx0XHR9XG5cdFx0XG5cdFx0XHRpZiAoTW9kZXJuaXpyLmhpc3RvcnkpIHtcblx0XHRcdCBcdGhpc3RvcnkucHVzaFN0YXRlKG51bGwsIG51bGwsIHJlcXVlc3QuaHJlZik7XG5cdFx0XHR9XG5cblx0XHR9KTtcblxuXG5cblx0XHQvKiBCUk9XU0VSUyBCQUNLIEJVVFRPTiAqL1xuXHRcdC8vIGFkZCB0aGUgcG9wc3RhdGUgZXZlbnQgaGFuZGxlciBvbiB0aGUgcGFnZS1wb3J0Zm9saW8gYW5kIHNpbmdsZS1wb3J0Zm9saW8gb25seVxuXHRcdC8vIHdpbGwgdGhlIGV2ZW50IGhhbmRsZXIgcmVtYWluIG9uIG90aGVyIHBhZ2VzPz9cblx0XHRpZiAoJCgnYm9keScpLmhhc0NsYXNzKCd3b3JrLXBhZ2UnKSkge1xuXHRcdFx0cmVhZEFkZHJlc3NCYXIocmVxdWVzdCwgcGFnZV9zdGF0ZSk7XHRcdFx0XG5cdFx0fVxuXG5cblx0XHQvKiBCQUNLIFRPIE1FTlUgKi9cblx0XHQkKCcjdG8tbWVudScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Ly8gYnVpbGQgdGhlICd3b3JrJyBVUkxcblx0XHRcdHZhciB3b3JrTWVudVVybCA9IGpyX3BvcnRmb2xpby5jb25maWcuc2l0ZVVybCArIFwiL1wiICsganJfcG9ydGZvbGlvLmNvbmZpZy53b3JrUGFnZSArIFwiL1wiO1xuXHQgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKCBudWxsLCBudWxsLCB3b3JrTWVudVVybCApO1x0XHRcdFx0XG5cdFx0XHR0cmFuc2l0aW9uQmFja1RvTWVudSgpO1xuXHRcdH0pO1xuXG5cblxuXHR9KTtcblxuXG59KShqUXVlcnkpOyIsInZhciBidWlsZFRlbXBsYXRlID0gcmVxdWlyZSgnLi9idWlsZFRlbXBsYXRlJyk7XG52YXIgcGFnZVN0YXRlVXBEYXRlID0gcmVxdWlyZSgnLi9wYWdlU3RhdGVVcERhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhamF4Q2FsbChyZXF1ZXN0KSB7XG5cblx0JC5hamF4KHtcblx0ICAgIHVybDogcmVxdWVzdC5qc29uX3VybCxcblx0ICAgIGRhdGFUeXBlOiAnanNvbidcblx0fSlcblxuXHQuZG9uZShmdW5jdGlvbihkYXRhKXtcdFxuXG5cdFx0Ly8gdXBkYXRlIHBhZ2Vfc3RhdGUgb2JqZWN0XG5cdFx0cGFnZVN0YXRlVXBEYXRlKGRhdGEsIHBhZ2Vfc3RhdGUpO1x0XHRcdFx0XHRcblx0XHRcblx0XHQvLyB0ZW1wbGF0ZSB0aGUgZGF0YVxuXHRcdHZhciBjaHVuayA9IGJ1aWxkVGVtcGxhdGUoZGF0YSk7XG5cblx0XHQvLyBpbnNlcnQgaW50byB0aGUgRE9NXG5cdFx0JCgnI3BhZ2VfJyArIHJlcXVlc3QuaWQpLmFwcGVuZChjaHVuayk7XG5cdFxuXG5cblx0XHQvLyBwdXQgdGhlIHRlbXBhdGUgaW4gbG9jYWwgc3RvcmFnZSBhcyBzdHJpbmdpZnlcblx0XHQvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInBhZ2VfXCIgKyByZXF1ZXN0LmlkLCBKU09OLnN0cmluZ2lmeShkYXRhKSk7XG5cdFx0XG5cdFx0Ly8gaWYgKE1vZGVybml6ci5sb2NhbHN0b3JhZ2UpIHtcblx0XHQvLyBcdC8vIHB1dCB0aGUgdGVtcGF0ZSBpbiBsb2NhbCBzdG9yYWdlIGFzIHN0cmluZ1xuXHRcdC8vIFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3BhZ2VfJyArIHJlcXVlc3QuaWQsIGNodW5rWzBdLmlubmVySFRNTCk7XHRcdFx0XHRcblx0XHQvLyB9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcblx0fSlcblxuXHQuZmFpbChmdW5jdGlvbigpIHtcblx0XHRjb25zb2xlLmxvZygnZXJyb3InKTtcblx0fSlcblxuXHQuYWx3YXlzKGZ1bmN0aW9uKCkge1xuXHRcdC8vIGNvbnNvbGUubG9nKCdjb21wbGV0ZSEnKTtcblx0fSk7XHRcblxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVGVtcGxhdGUoZGF0YSkge1xuXG5cdHZhciBpID0gXCJcIjtcblx0dmFyIHRpdGxlID0gZGF0YS50aXRsZS5yZW5kZXJlZDtcblx0dmFyIGNvbnRlbnQgPSBkYXRhLmNvbnRlbnQucmVuZGVyZWQ7XG5cblx0dmFyIGltYWdlcyA9IGRhdGEuYWNmLmltYWdlcztcblx0dmFyIGltYWdlSXRlbXMgPSBcIlwiO1xuXG5cdGlmIChpbWFnZXMubGVuZ3RoKSB7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDw9IGltYWdlcy5sZW5ndGg7IGkrKykge1xuXG5cdFx0XHRmb3IgKGtleSBpbiBpbWFnZXNbaV0pIHtcblxuXHRcdFx0XHRpZiAoaW1hZ2VzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRcdGltYWdlSXRlbXMgKz0gXHQnPGxpPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0aW1hZ2VzW2ldW2tleV0udGl0bGUgKyBcblx0XHRcdFx0XHRcdFx0XHRcdCcgOiAnICtcblx0XHRcdFx0XHRcdFx0XHRcdCc8aW1nIHNyYz1cIicgKyBcblx0XHRcdFx0XHRcdFx0XHRcdGltYWdlc1tpXVtrZXldLnNpemVzLmxhcmdlICsgXG5cdFx0XHRcdFx0XHRcdFx0XHQnXCIgLz4nICtcblx0XHRcdFx0XHRcdFx0XHRcdCc8L2xpPic7XHRcdFx0XHRcdFxuXHRcdFx0XHR9IFxuXHRcdFx0fSBcdFx0XG5cdFx0fVx0XHRcdFxuXHR9IFxuXG5cblxuXG5cblxuXHR2YXIgdGVzdGltb25pYWxzID0gZGF0YS5hY2YudGVzdGltb25pYWxzO1xuXHR2YXIgdGVzdGltb25pYWxJdGVtcyA9IFwiXCI7XG5cblx0aWYgKHRlc3RpbW9uaWFscy5sZW5ndGgpIHtcblxuXHRcdGZvciAoaSA9IDA7IGkgPD0gdGVzdGltb25pYWxzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdGZvciAoa2V5IGluIHRlc3RpbW9uaWFsc1tpXSkge1xuXHRcdFx0XHRpZiAodGVzdGltb25pYWxzW2ldLmhhc093blByb3BlcnR5KGtleSkpIHtcblxuXHRcdFx0XHRcdHRlc3RpbW9uaWFsSXRlbXMgKz0gXHQnPGxpPicgK1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGtleSArIFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdCcgOiAnICtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPGRpdj4nICsgXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dGVzdGltb25pYWxzW2ldW2tleV0gKyBcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQnPC9kaXY+JyArXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0JzwvbGk+JztcdFx0XHRcdFx0XG5cdFx0XHRcdH0gXG5cdFx0XHR9IFx0XHRcblx0XHR9XHRcdFx0XG5cdH0gXG5cdFxuXG5cblx0dmFyIHdyYXBwZXIgPSAkKCc8ZGl2Lz4nLCB7XG5cdFx0J2NsYXNzJyA6ICd3cmFwcGVyJyxcdFx0XG5cdH0pO1xuXG5cdCQoJzxoMS8+Jywge1xuXHRcdCdjbGFzcycgOiAndGl0bGUnLFxuXHRcdGh0bWw6IHRpdGxlXG5cdH0pLmFwcGVuZFRvKHdyYXBwZXIpO1x0XG5cblx0JCgnPGRpdi8+Jywge1xuXHRcdCdjbGFzcycgOiAnY29udGVudCcsXG5cdFx0aHRtbDogY29udGVudFxuXHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblxuXHRpZiAodGVzdGltb25pYWxzLmxlbmd0aCkge1xuXG5cdFx0JCgnPHVsLz4nLCB7XG5cdFx0XHQnY2xhc3MnIDogJ3Rlc3RpbW9uaWFscy1saXN0Jyxcblx0XHRcdGh0bWw6IHRlc3RpbW9uaWFsSXRlbXNcblx0XHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblx0fVxuXG5cblx0aWYgKGltYWdlcy5sZW5ndGgpIHtcblxuXHRcdCQoJzx1bC8+Jywge1xuXHRcdFx0J2NsYXNzJyA6ICdpbWFnZS1saXN0Jyxcblx0XHRcdGh0bWw6IGltYWdlSXRlbXNcblx0XHR9KS5hcHBlbmRUbyh3cmFwcGVyKTtcblx0fVxuXG5cblxuXHRyZXR1cm4gd3JhcHBlcjtcblx0XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNMb2FkZWQoaWRlbnRpZmllciwgYXJyLCByZXF1ZXN0KSB7XG5cblx0dmFyIHJlcyA9IGZhbHNlO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XG5cdFx0Zm9yIChrZXkgaW4gYXJyW2ldKSB7XG5cdFx0XHRcblx0XHRcdGlmIChhcnJbaV0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuXG5cdFx0XHRcdGlmIChhcnJbaV1ba2V5XSA9PT0gaWRlbnRpZmllcikge1xuXHRcdFx0XHRcdC8vIGlmIHRoZSBpZGVudGlmaWVyIGlzIGZvdW5kIHVwZGF0ZSByZXF1ZXN0LmlkXG5cdFx0XHRcdFx0Ly8gdXNlZCBmb3Igd2hlbiB0aGUgaWRlbnRpZmllciBpcyBub3QgdGhlIGlkIG51bWJlciAoZWcgc2x1Zylcblx0XHRcdFx0XHRyZXF1ZXN0LmlkID0gYXJyW2ldLnBhZ2VfaWQ7XG5cdFx0XHRcdFx0cmVzID0gdHJ1ZTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XHRcdFx0XHRcblx0fVxuXG5cdHJldHVybiByZXM7XG5cbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWdlU3RhdGVVcERhdGUoZGF0YSwgcGFnZV9zdGF0ZSkge1xuXG5cdHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLnB1c2goe1xuXHRcdFwicGFnZV9pZFwiIDogZGF0YS5pZCxcblx0XHRcInBhZ2Vfc2x1Z1wiIDogZGF0YS5zbHVnLFxuXHRcdFwicGFnZV91cmxcIiA6IGRhdGEubGluayxcblx0XHRcImpzb25fbGlua1wiIDogZGF0YS5fbGlua3Muc2VsZlswXS5ocmVmXHRcdFx0XG5cdH0pO1xuXG5cdHJldHVybiBwYWdlX3N0YXRlO1xufTsiLCJ2YXIgaXNMb2FkZWQgPSByZXF1aXJlKCcuL2lzTG9hZGVkJyk7XG52YXIgdHJhbnNpdGlvblRvUGFnZSA9IHJlcXVpcmUoJy4vdHJhbnNpdGlvblRvUGFnZScpO1xudmFyIHRyYW5zaXRpb25CYWNrVG9NZW51ID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uQmFja1RvTWVudScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlYWRBZGRyZXNzQmFyKHJlcXVlc3QsIHBhZ2Vfc3RhdGUpIHtcblxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZ1bmN0aW9uKGUpIHtcdFx0XG5cblx0XHQgICAgLy8gZ2V0IHRoZSBzbHVnXG4gICAgICAgIHBhdGhBcnJheSA9IGRvY3VtZW50LmxvY2F0aW9uLnBhdGhuYW1lLnNwbGl0KCAnLycgKTtcbiAgICAgICAgdGhlSW5kZXggPSBwYXRoQXJyYXkubGVuZ3RoIC0gMjtcbiAgICAgICAgc2x1ZyA9IHBhdGhBcnJheVt0aGVJbmRleF07XHRcblxuICAgICAgICAvLyBpZiBpdCdzIGJhY2sgdG8gdGhlIG1lbnVcbiAgICAgICAgaWYgKHNsdWcgPT09IGpyX3BvcnRmb2xpby5jb25maWcud29ya1BhZ2UpIHtcbiAgICAgICAgICB0cmFuc2l0aW9uQmFja1RvTWVudSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGxvYWRlZCwgZmluZCBpdCBhbmQgc2hvdyBpdFxuICAgICAgIFx0aWYgKGlzTG9hZGVkKHNsdWcsIHBhZ2Vfc3RhdGUubG9hZGVkX3BhZ2VzLCByZXF1ZXN0KSkge1xuXG4gICAgICAgICAgICByZXF1ZXN0LmlkX3N0ciA9ICdwYWdlXycgKyByZXF1ZXN0LmlkO1xuICAgICAgICAgICAgdHJhbnNpdGlvblRvUGFnZShyZXF1ZXN0KTtcblxuICAgICAgIFx0fVxuXG4gICAgfSk7ICAgICBcdFxufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zaXRpb25CYWNrVG9NZW51KHJlcXVlc3QpIHtcblx0XG5cdCQoJy5wYWdlLXdyYXAnKS5yZW1vdmVDbGFzcygnb24nKTtcblx0JCgnLndvcmtfbWVudSAucGFnZS13cmFwJykuYWRkQ2xhc3MoJ29uJyk7XG5cdGNvbnNvbGUubG9nKCd0cmFuc2l0aW9uQmFja1RvTWVudScpO1xuXHRcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2l0aW9uVG9QYWdlKHJlcXVlc3QpIHtcblx0XG5cdCQoJy5wYWdlLXdyYXAnKS5yZW1vdmVDbGFzcygnb24nKTtcblx0dmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocmVxdWVzdC5pZF9zdHIpO1xuXHQkKGVsKS5hZGRDbGFzcygnb24nKTtcdFxuXHRcbn07Il19
