var domEls = require('./domEls');

module.exports = function backToMenu() {

	// update page_state
	page_state.current_page = "homepage";

	// hide the button 
	$(domEls.back_to_menu_btn)
		.removeClass('on')
			.addClass('off');

	// scroll the single item page back to top
	window.setTimeout(function() {

		$('#js_page_2').scrollTop( 0 );

		$(domEls.back_to_menu_btn)
			.removeClass('off');

	}, 600);
		        				    	
};