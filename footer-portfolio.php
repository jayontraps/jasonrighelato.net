<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package jr_portfolio
 */

?>



	







<?php wp_footer(); ?>






<script type="text/html" id="itemTemplate">


	<div class="single-header">

		<div class="center-wrap">
			 <img data-src="heroImage" data-alt="title"/>	
		</div>

	</div>
	

	<div class="single-intro single-wrapper">   

		<h1 data-content="title"></h1>
		<div data-content="intro"></div>
		<hr class="single-hr" />	

	</div>


	<div class="single-wrapper">

		<div class="single-row">
			<div class="single-col">
				<img data-src="image_1" data-alt="title"/>
			</div>

			<div class="single-col">
				<div class="centered" data-content="details_1"></div>
			</div>	
			
		</div>

		<hr class="single-hr" />



		<div class="single-row">

			<div class="single-col">
				<div class="centered" data-content="details_2"></div>
			</div>	

			<div class="single-col">
				<img data-src="image_2" data-alt="title"/>
			</div>
					
		</div>

		<hr class="single-hr" />

	</div>


	<div class="single-wrapper">

		<div class="single-row">
			<div class="item-link" data-content="btnText" data-link="btnLink"></div>
		</div>

	</div>


	

 
</script>
















</body>
</html>
