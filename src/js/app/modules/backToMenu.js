var domEls = require('./domEls');

module.exports = function backToMenu() {

	// update page_state
	page_state.current_page = 'js_page_1';

	// hide the button 
	$(domEls.back_to_menu_btn)
				.addClass('off');


	// scroll the single item page back to top
	window.setTimeout(function() {

		$('#js_page_2').scrollTop( 0 );

		$(domEls.back_to_menu_btn)
			.removeClass('on off');

	}, 300);
		        				    	
};