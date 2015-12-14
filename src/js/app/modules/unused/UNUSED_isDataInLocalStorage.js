var ajaxCall = require('./ajaxCall');

module.exports = function isDataInLocalStorage(request) {

	if (Modernizr.localstorage) {

		// is the data already in local storage? 
		if (localStorage.getItem("page_" + request.id)) {
					
			// fetch the js object from localStorage
			// var dataObj = JSON.parse(localStorage.getItem("page_" + request.id)); 	

			// fetch the string from localStorage			
			var storedChunk = localStorage.getItem("page_" + request.id); 	

			// insert into the DOM
			$('#page_' + request.id).append(storedChunk).addClass('on');	


		} else {

			ajaxCall(request);
							
		}

	} else {
		ajaxCall(request);
	}

	console.log("isDataInLocalStorage has fired");

};