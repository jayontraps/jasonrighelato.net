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

        <section class="section wrapper intro group">

            <div class="intro-item">

                <div class="web content-cell">
                    <h2>Web design and development</h2>
                    <p>Providing bespoke, modern, mobile friendly designs is a multi-step, collaborative process between designer and client. At each key stage we'll test and review design decisions and assess business goals. </p>
                </div>

                <div class="intro-item-inner-wrapper">
                    <div class="intro-item-inner wp-dev content-cell">
                        <h2>Wordpress development</h2>
                        <p>The Wordpress CMS is popular, flexible and undergoing rapid development. I have built themes from scratch and customized existing themes using the good old fashioned php templates, TWIG and more recently the WP REST API to create beautiful UIs. </p>
                    </div>
                    <div class="intro-item-inner space content-cell">
               <!--          <h2>Some heading</h2> -->
                    </div>                
                </div>                
            </div>

            <div class="intro-item design-temp content-cell">
                <div class="default-spacing">
                    <h2>Design to template development</h2>
                    <p>I have worked with a london-based agency for over 4 years converting their PSDs to working templates for a number of CMS platforms. Working closely with the designer to translate visual breifs into responsive templates.</p>
                </div>
                </div>

        </section>

        
<!--         <section class="section">
            
            <div class="wrapper">
                <h2 id="js_animate_heading">Trigger these animations on scroll as the element comes into view</h2>

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
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div>
        </section>

 -->
        <section class="section">
        <div class="wrapper">
    	   <?php  include "inc/inc-effeckt-buttons.php"; ?>
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

</div>
	


<a href="#" class="effeckt-page-transition-button back-to-menu" id="js_back_to_menu"
        data-effeckt-transition-in="slide-from-left" 
        data-effeckt-transition-out="slide-to-right" 
        data-effeckt-transition-page="page-1">
        <svg class="icon icon-chevron-thin-left"><use xlink:href="#icon-chevron-thin-left"></use></svg></a>



<?php get_footer("portfolio"); ?>
