<?php
/**
 * Template Name: Landing
 *
 * Block-built page with no header navigation (see header-landing.php).
 * Blocks provide their own containers.
 *
 * @package cb-istp2027
 */

get_header( 'landing' );

while ( have_posts() ) {
	the_post();
	the_content();
}

get_footer();
