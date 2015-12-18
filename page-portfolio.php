<?php
/*
	Template Name: portfolio page
*/

get_header("portfolio"); ?>


<div data-effeckt-page="page-1">
    <div class="page-wrap no-transitions" id="page-wrap">


    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
   		    

 	<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>



	<?php include "inc/inc-work-menu.php"; ?>


	<?php include "inc/inc-effeckt-buttons.php"; ?>

	


    </div>


  </div>




<?php // include "inc/inc-work-sections.php"; ?>





    <div data-effeckt-page="page-single-item">

        <div class="page-wrap" >

            <div id="js_page_single_item"></div>

            <button class="effeckt-page-transition-button back-to-menu" id="js_back_to_menu"
            data-effeckt-transition-in="slide-from-left" 
            data-effeckt-transition-out="slide-to-right" 
            data-effeckt-transition-page="page-1">Slide From Left</button>

        </div>

    </div>
		

<?php get_footer("portfolio"); ?>
