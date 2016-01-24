<?php
/*
	Template Name: portfolio page
*/

get_header("portfolio"); ?>


<div id="homepage" data-effeckt-page="page-1">

    <!-- <div class="page-border"></div> -->

    <div class="page-wrap" id="page-wrap">

        
        <header class="header">

            <div class="wrapper">
                
                <h1 class="site-title" id="js_animate_title">Jason&nbsp;Righelato</h1>

                <!--     <h1 id="js_animate_heading">Jason Righelato</h1> -->

                <div class="site-intro">
                
                    <h2><?php echo get_bloginfo ( 'description' ); ?></h2>

                    <p>A freelance front-end web developer with over 5 years professional experience, I work with agencies, small businesses, arts groups and charities. I design and build fast loading, responsive websites with modular &amp; maintainable code. </p>


                </div>
            
            </div>

        </header>

        <div class="header-block"></div>

        <div class="section-wrap">

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
                        <p>The Wordpress CMS is popular, flexible and undergoing rapid development. I can build themes from scratch and customized existing themes using php templates and more recently the WP REST API. </p>
                    </div>
                    <div class="intro-item-inner space content-cell"></div>                
                </div>                
            </div>

            <div class="intro-item design-temp content-cell">
                <div class="default-spacing">
                    <h2>Design to template development</h2>
                    <p>I have worked with a london-based agency for over 4 years converting their PSDs to working templates for a number of CMS platforms. Working closely with the designer to translate visual briefs into responsive templates.</p>
                </div>
                </div>

        </section>

<!--         
        <section class="section">
        <div class="wrapper">
    	   <?php //  include "inc/inc-effeckt-buttons.php"; ?>
           </div>
        </section>       
 -->

        <?php include "inc/inc-footer-list.php"; ?>

        </div>

        <button id="js_trigger_transition"
        class="effeckt-page-transition-button trigger-transition" 
        data-effeckt-transition-in="scale-down-slide-from-right-me" 
        data-effeckt-transition-out="scale-down-to-behind-me" 
        data-effeckt-transition-page="page-single-item" 
        data-effeckt-needs-perspective="true">Jason</button>
    
    </div>

</div><!-- #homepage -->















<div data-effeckt-page="page-single-item" class="single-item" id="js_page_2">

    <div id="js_page_single_item" class="page-wrap" ></div>
    <?php include "inc/inc-footer-list.php"; ?>

</div>
	


<a href="#" class="effeckt-page-transition-button back-to-menu" id="js_back_to_menu"
        data-effeckt-transition-in="slide-from-left" 
        data-effeckt-transition-out="slide-to-right" 
        data-effeckt-transition-page="page-1">
        <svg class="icon icon-chevron-thin-left"><use xlink:href="#icon-chevron-thin-left"></use></svg></a>



<?php get_footer("portfolio"); ?>
