<?php

function enqueue_styles_scripts() { 
	wp_enqueue_style( 'jr_portfolio-compiled-style', get_template_directory_uri() . '/build/css/main.css', array(), '121' );
	
	wp_enqueue_script( 'jr_portfolio-modenizr', get_template_directory_uri() . '/build/js/vendor/modernizr-custom.js', array(), false);		

	wp_enqueue_script( 'jr_portfolio-config', get_template_directory_uri() . '/build/js/config.js', array(), array(), false);	


	// wp_enqueue_style('gfonts', 'http://fonts.googleapis.com/css?family=Roboto|Roboto+Slab');
	
	wp_enqueue_script( 'jr_portfolio-mustache', get_template_directory_uri() . '/build/js/vendor/mustache.js', array('jquery'));

	wp_enqueue_script( 'jr_portfolio-bundle', get_template_directory_uri() . '/build/js/bundle.js', array('jquery'),'121', true);	

	wp_enqueue_script( 'jr_portfolio-all', get_template_directory_uri() . '/build/js/all.js', array('jquery'),'121', true);	


	// production
	// wp_enqueue_script( 'jr_portfolio-bundle', get_template_directory_uri() . '/build/js/all.min.js', array('jquery'),'121', true);	
	
} 

add_action('wp_enqueue_scripts', 'enqueue_styles_scripts');





/**
  * Add REST API support to an already registered post type.
  * http://v2.wp-api.org/extending/custom-content-types/
*/
  
// add_action( 'init', 'my_custom_post_type_rest_support', 25 );

// function my_custom_post_type_rest_support() {

// 	global $wp_post_types;

// 	//be sure to set this to the name of your post type!
// 	$post_type_name = 'portfolio';
// 	if( isset( $wp_post_types[ $post_type_name ] ) ) {
// 	    $wp_post_types[$post_type_name]->show_in_rest = true;
// 	    $wp_post_types[$post_type_name]->rest_base = $post_type_name;
// 	    $wp_post_types[$post_type_name]->rest_controller_class = 'WP_REST_Posts_Controller';
// 	}

// }




