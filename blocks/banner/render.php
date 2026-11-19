<?php
/**
 * Block template for Banner.
 *
 * @package cb-istp2027
 */

defined( 'ABSPATH' ) || exit;

$content = $attributes['content'] ?? '';

if ( ! $content ) {
	return;
}

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'banner' ) );
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() already escapes. ?>>
	<div class="container">
		<div class="banner__box">
			<svg class="banner__icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
			<div class="banner__content"><?php echo wp_kses_post( $content ); ?></div>
		</div>
	</div>
</section>
