<?php 
	$args = array(
		'post_type' => 'portfolio',
		'posts_per_page'=> -1,
		'orderby' => 'meta_value_num',
		'order' => 'ASC'
	);
	// the query
	$the_query = new WP_Query( $args ); ?>

	<?php if ( $the_query->have_posts() ) : ?>

		<?php $url_array = array(); ?>

		<div data-effeckt-page="page-list" class="work_menu" >

	    	<div class="page-wrap on" id="page_<?php the_ID(); ?>">
	
				<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>
					<?php
						// build the REST API URL
						$root = get_site_url();
						$apiroot = 'wp-json/wp/v2/portfolio';
						$id = get_the_ID();								
						$apiEndPoint = $root . '/' . $apiroot . '/' . $id;

						$url_array[$id] = $apiEndPoint;
					?>			
						<a 
							href="<?php the_permalink(); ?>" 
							class="work_menu_items effeckt-page-transition-button" 
							data-api="<?php the_ID(); ?>" 					
							data-effeckt-transition-in="slide-from-left" 
							data-effeckt-transition-out="slide-to-right" 
							data-effeckt-transition-page="page-<?php the_ID(); ?>">
				        		<?php the_title(); ?>
			        	</a>
				<?php endwhile; ?>

			</div>

		</div>

		<?php 
			// Use wp_localize_script to pass array of values to js
			wp_localize_script( 'jr_portfolio-bundle', 'postdata',
				array(
					'json_url' => $url_array
				)
			);
		?>


		<?php wp_reset_postdata(); ?>

	<?php else : ?>
		<p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>