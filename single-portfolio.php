<?php
/**
 * The template for displaying all single portfolio posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package jr_portfolio
 */

get_header(); ?>

	<div id="primary" class="content-area work">
		<main id="main" class="site-main" role="main">
	
		<?php include "inc/inc-work-menu.php"; ?>
	
			<h1>SINGLE TEMPLATE</h1>

			<?php while ( have_posts() ) : the_post(); ?>



			<div data-effeckt-page="page-default">
				<div class="page-wrap on" id="page_default">

					<!-- TEMPLATE AS buildTemplate.js -->
					
					<?php the_title( '<h1 class="title">', '</h1>' ); ?>

					<div class="entry-content">
						<?php the_content(); ?>						
					</div><!-- .entry-content -->

				</div>
			</div>	
				


			<?php endwhile; // End of the loop. ?>


			<?php include "inc/inc-work-sections.php"; ?>


		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
