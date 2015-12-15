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
        if (slug === "work") {
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