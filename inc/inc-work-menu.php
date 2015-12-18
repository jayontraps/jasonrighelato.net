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

			<a
				href="<?php the_permalink(); ?>" 
				class="work_menu_items" 
				data-api="<?php the_ID(); ?>">
	        		<?php the_title(); ?>
        	</a>

		<?php endwhile; ?>


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