var domEls = require('./domEls');

module.exports = function fireTransition() {

	domEls.trigger_transition.trigger('click');

	window.setTimeout(function() {	
		
		domEls.back_to_menu_btn
			.addClass('on');

		$('#js_loading').remove();

	}, 1200);

};