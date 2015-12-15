<?php 
	$args = array(
		'post_type' => 'post',
		'posts_per_page'=> -1,
		'orderby' => 'meta_value_num',
		'order' => 'ASC'
	);
	// the query
	$the_query = new WP_Query( $args ); ?>

	<?php if ( $the_query->have_posts() ) : ?>

		<?php $url_array = array(); ?>
		
		
		<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
									
			<div data-effeckt-page="page-<?php the_ID(); ?>">
		    	<div class="page-wrap" id="page_<?php the_ID(); ?>"></div>
		  	</div>
			
		<?php endwhile; ?>


		<?php wp_reset_postdata(); ?>

	<?php else : ?>
		<p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>