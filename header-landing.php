<?php
/**
 * Header for the Landing template — no navigation. Everything else in the
 * site uses header.php.
 *
 * @package cb-istp2027
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>

<body <?php body_class( 'landing' ); ?>>
<a class="skip-link" href="#main">Skip to content</a>
<?php wp_body_open(); ?>

<main id="main">
