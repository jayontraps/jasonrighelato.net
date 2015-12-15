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
		};




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
			var workMenuUrl = jr_portfolio.config.siteUrl + "/work/";
	        history.pushState( null, null, workMenuUrl );				
			transitionBackToMenu();
		});



	});


})(jQuery);