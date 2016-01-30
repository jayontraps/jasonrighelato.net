module.exports = function getAnimationEvents() {

	// Initialise needed variables
	var prefixes = ["webkit", "moz", "MS", "o"];
	var elem = document.createElement('div');
	var i;

	// Animation Start
	window.animationStart = "animationstart";
	for (i = 0; i < prefixes.length; i++) {
	    if (elem.style[prefixes[i] + "AnimationStart"] !== undefined){
	        window.animationStart = prefixes[i] + "AnimationStart";
	        break;
	    }
	}

	// Animation Iteration
	window.animationIteration = "animationiteration";
	for (i = 0; i < prefixes.length; i++) {
	    if (elem.style[prefixes[i] + "AnimationIteration"] !== undefined){
	        window.animationIteration = prefixes[i] + "AnimationIteration";
	        break;
	    }
	}

	// Animation End
	window.animationEnd = "animationend";
	for (i = 0; i < prefixes.length; i++) {
	    if (elem.style[prefixes[i] + "AnimationEnd"] !== undefined){
	        window.animationEnd = prefixes[i] + "AnimationEnd";
	        break;
	    }
	}

};