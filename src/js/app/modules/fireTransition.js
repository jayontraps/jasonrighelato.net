var domEls = require('./domEls');

module.exports = function fireTransition() {

	$('.effeckt .the-btn').trigger('click');

	window.setTimeout(function() {	
		
		domEls.back_to_menu_btn
			.addClass('on');

		$('#js_loading').remove();

	}, 1200);

};