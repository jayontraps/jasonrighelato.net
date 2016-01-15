<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package jr_portfolio
 */

get_header(); ?>
	
<?php while ( have_posts() ) : the_post(); ?>

<?php 
	$header_image = get_field('header_image'); 
	$image_1 = get_field('image_1');
	$image_2 = get_field('image_2');
?>




<div class="header-block"></div>




<div class="single-header">

	<div class="center-wrap">
		<img src="<?php echo $header_image['url']; ?>" />
	</div>
	
</div>	





<div class="single-item" >
			
	<div class="single-intro single-wrapper"> 
		<?php the_title( '<h1 class="title">', '</h1>' ); ?>
		<p><?php the_field('long_description') ?></p>
		<hr class="single-hr" />
	</div>


	<div class="single-wrapper">

		<div class="single-row">
			<div class="single-col">
				<img src="<?php echo $image_1['url']; ?>" />
			</div>

			<div class="single-col">
				<div class="centered">
					<?php the_field('details_1'); ?>
				</div>
			</div>	
			
		</div>

		<hr class="single-hr" />



		<div class="single-row">

			<div class="single-col">
				<div class="centered">
					<?php the_field('details_2'); ?>
				</div>
			</div>	

			<div class="single-col">
				<img src="<?php echo $image_2['url']; ?>" />
			</div>
					
		</div>

		<hr class="single-hr" />

	</div>

	<div class="single-wrapper">

		<div class="single-row">
			<div class="item-link">
				<a href="<?php the_field('site_url'); ?>">Visit the site</a>
			</div>
		</div>

	</div>

	<footer id="colophon" class="site-footer" role="contentinfo">
        <div class="site-info wrapper">
            <ul>
                <li>Items</li>
                <li>Items</li>
                <li>Items</li>
            </ul>
        </div>
    </footer>

</div>	
	


<?php endwhile; // End of the loop. ?>


<a class="back-to-menu" href="<?php bloginfo('url'); ?>">
	<svg class="icon icon-chevron-thin-left"><use xlink:href="#icon-chevron-thin-left"></use></svg>
</a>


<?php get_footer(); ?>
