module.exports = function fireTransition() {

	$('.effeckt .the-btn').trigger('click');

	window.setTimeout(function() {	
		$('#js_loading').remove();
	}, 1200);

};