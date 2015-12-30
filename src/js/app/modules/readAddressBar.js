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



