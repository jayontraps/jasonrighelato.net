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

		<?php 
			$url_array = array(); 
			$slug_array = array(); 
			$root = get_site_url(); 
		?>

		<div class="work_menu">

		<?php while ( $the_query->have_posts() ) : $the_query->the_post(); ?>

			<?php
				// build the REST API URL for each post and store in $url_array				
				$apiroot = 'wp-json/wp/v2/posts';
				$id = get_the_ID();								
				$apiEndPoint = $root . '/' . $apiroot . '/' . $id;
				$url_array[$id] = $apiEndPoint;
				$slug = $post->post_name;
				$slug_array[$slug] = $id;
			?>	

			<div class="work_menu_item">

				<a
					href="<?php the_permalink(); ?>" 
					class="work_menu_link" 
					data-api="<?php the_ID(); ?>">
		        		<?php // the_title(); ?>
		        		<img src="<?php echo get_stylesheet_directory_uri(); ?>/img/300x300.png">

	        	</a>

        	</div>

		<?php endwhile; ?>

		</div><!-- .grid -->


		<?php 
			// Use wp_localize_script to pass array of values to js
			wp_localize_script( 'jr_portfolio-bundle', 'postdata',
				array(
					'json_url' => $url_array,
					'root_url' => $root,
					'slug' => $slug_array
				)
			);
		?>


		<?php wp_reset_postdata(); ?>

	<?php else : ?>
		<p><?php _e( 'Sorry, no posts matched your criteria.' ); ?></p>
	<?php endif; ?>