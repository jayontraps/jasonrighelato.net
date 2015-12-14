var isLoaded = require('./isLoaded');
var transitionToPage = require('./transitionToPage');

module.exports = function popstate(request, page_state) {

	window.addEventListener("popstate", function(e) {		

		// get the slug
        var pathArray = document.location.pathname.split( '/' );
        var theIndex = pathArray.length - 2;
        var slug = pathArray[theIndex];	

        // if loaded, find it and show it
       	if (isLoaded(slug, page_state.loaded_pages, request)) {

            request.id_str = 'page_' + request.id;
            transitionToPage(request);

       	}

    });     	
};