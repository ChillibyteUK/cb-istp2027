<?php
/**
 * Block template for Banner.
 *
 * @package cb-istp2027
 */

defined( 'ABSPATH' ) || exit;

$title    = $attributes['title'] ?? '';
$content  = $attributes['content'] ?? '';
$icon_id  = absint( $attributes['iconId'] ?? 0 );
$icon_url = $icon_id ? wp_get_attachment_url( $icon_id ) : '';

if ( ! $title && ! $content ) {
	return;
}

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'banner' ) );
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() already escapes. ?>>
	<div class="container">
		<div class="banner__box reveal">
			<?php
			if ( $icon_url ) {
				// Root-relative so the mask isn't a cross-origin fetch on a second hostname.
				?>
				<span class="banner__icon" style="--icon-url: url('<?php echo esc_url( wp_make_link_relative( $icon_url ) ); ?>')" aria-hidden="true"></span>
				<span class="banner__divider" aria-hidden="true"></span>
				<?php
			}
			?>
			<div class="banner__content">
				<?php
				if ( $title ) {
					?>
					<h2 class="banner__title"><?php echo esc_html( $title ); ?></h2>
					<?php
				}

				if ( $content ) {
					echo wp_kses_post( $content );
				}
				?>
			</div>
		</div>
	</div>
</section>
