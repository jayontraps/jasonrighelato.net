<?php
/*
	Template Name: portfolio page
*/

get_header("portfolio"); ?>


<div id="homepage" data-effeckt-page="page-1">

    <div class="page-wrap" id="page-wrap">

        <!-- <h1 class="site-title" id="js_animate_title">Jason Righelato</h1> -->
        <header class="header">

            <div class="wrapper">

                <h1 id="js_animate_heading">Jason Righelato</h1>

                <h2><?php echo get_bloginfo ( 'description' ); ?></h2>

                <p>I'm a freelance frontend web developer with over 5 years professional experience. I've worked with small businesses, arts groups and conservation trusts to design and build bespoke websites. </p>

                <p>The goal is to build fast loading, responsive websites which work today and in the future — on every device, be it laptop, smartphone, tv or fridge.</p>

            </div>

        </header>

        <section class="section">
    	   <?php include "inc/inc-work-menu.php"; ?>
        </section>

        
        <section class="section">
            
            <div class="wrapper">
                <!-- <h2 id="js_animate_heading">Trigger these animations on scroll as the element comes into view</h2> -->

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

            </div>

        </section>
        
        <section class="section">

            <div id="testing"></div> 
        </section>
                   
        <section class="section">

            <div class="wrapper">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </section>


        <section class="section">
        <div class="wrapper">
    	   <?php include "inc/inc-effeckt-buttons.php"; ?>
           </div>
        </section>       
	


        <footer id="colophon" class="site-footer" role="contentinfo">
            <div class="site-info wrapper">
                <ul>
                    <li>Items</li>
                    <li>Items</li>
                    <li>Items</li>
                </ul>
            </div><!-- .site-info -->
        </footer><!-- #colophon -->    
    
    </div>

</div><!-- #homepage -->















<div data-effeckt-page="page-single-item" class="single-item" id="target">

    <div class="page-wrap" >
                
        <div id="js_page_single_item"></div>

        

    </div>

</div>
	


<button class="effeckt-page-transition-button back-to-menu" id="js_back_to_menu"
        data-effeckt-transition-in="slide-from-left" 
        data-effeckt-transition-out="slide-to-right" 
        data-effeckt-transition-page="page-1">Slide From Left</button>



<?php get_footer("portfolio"); ?>
