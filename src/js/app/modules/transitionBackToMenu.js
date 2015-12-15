module.exports = function transitionBackToMenu(request) {
	
	$('.page-wrap').removeClass('on');
	$('.work_menu .page-wrap').addClass('on');
	console.log('transitionBackToMenu');
	
};