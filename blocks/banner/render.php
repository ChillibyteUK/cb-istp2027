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
			<svg class="banner__icon" viewBox="0 0 134 140" fill="currentColor" aria-hidden="true"><path d="M126.91,37.67l-.05,79.04c0,7.64-5.66,15.35-14.14,15.35H21.3c-8.48,0-14.13-7.69-14.14-15.35l-.07-78.56c-.01-7.79,4.9-15.63,13.28-15.81l13.93-.3.08-10.01c0-1.67,2.67-4.16,4.14-4.1,1.47.07,4.3,2.46,4.29,4.09l-.05,10.08h48.49s0-10.09,0-10.09c0-1.64,2.7-4.14,4.17-4.08,1.46.07,4.27,2.45,4.27,3.95v10.12s13.16.24,13.16.24C120.93,22.38,126.92,29.34,126.91,37.67ZM99.55,41.04c-.02,1.39-2.79,3.58-4.03,3.46-1.23-.12-4.01-2.05-4.04-3.3l-.3-10.81-48.38-.03-.02,9.98c0,1.67-2.59,4.18-4.06,4.14-1.26-.03-4.08-2.01-4.13-3.32l-.37-10.73-12.15-.09c-3.87.09-6.65,2.94-6.65,6.76l.07,14.49h103.04s.06-14.49.06-14.49c.02-3.81-2.79-6.69-6.63-6.75l-12.21.05L99.55,41.04ZM112.4,123.89c3.62-.35,6.15-2.97,6.15-6.09l.02-57.73H15.44s.03,57.73.03,57.73c0,3.54,3.12,6.11,6.63,6.09h90.3Z"/></svg>
			<span class="banner__divider" aria-hidden="true"></span>
			<div class="banner__content"><?php echo wp_kses_post( $content ); ?></div>
		</div>
	</div>
</section>
