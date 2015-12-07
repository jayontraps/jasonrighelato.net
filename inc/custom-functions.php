<?php

function enqueue_styles_scripts() { 
	wp_enqueue_style( 'jr_portfolio-compiled-style', get_template_directory_uri() . '/build/screen.css', array(), '121' );
	
	// wp_enqueue_script( 'jr_portfolio-modenizr', get_template_directory_uri() . '/js/vendor/modernizr.custom.98000.js', array(), false);		

	// wp_enqueue_style('gfonts', 'http://fonts.googleapis.com/css?family=Roboto|Roboto+Slab');
	
	wp_enqueue_script( 'jr_portfolio-mustache', get_template_directory_uri() . '/js/vendor/mustache.js', array('jquery'));

	wp_enqueue_script( 'jr_portfolio-bundle', get_template_directory_uri() . '/build/bundle.js', array('jquery'),'121', true);	
	
} 

add_action('wp_enqueue_scripts', 'enqueue_styles_scripts');