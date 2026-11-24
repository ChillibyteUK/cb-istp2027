<?php
/**
 * Block template for CTA.
 *
 * @package cb-istp2027
 */

defined( 'ABSPATH' ) || exit;

$title       = $attributes['title'] ?? '';
$link_text   = $attributes['linkText'] ?? '';
$link_url    = $attributes['linkUrl'] ?? '';
$link_target = ! empty( $attributes['linkTarget'] );
$style       = $attributes['buttonStyle'] ?? 'secondary';

$has_link = $link_text && $link_url;

if ( ! $title && ! $has_link ) {
	return;
}

$button_classes = array(
	'primary'   => 'btn btn-primary',
	'secondary' => 'btn',
	'light'     => 'btn btn-light',
);
$button_class   = $button_classes[ $style ] ?? $button_classes['secondary'];

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'cta' ) );
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() already escapes. ?>>
	<div class="container">
		<div class="cta__inner reveal">
			<?php
			if ( $title ) {
				?>
				<h2 class="cta__title"><?php echo esc_html( $title ); ?></h2>
				<?php
			}

			if ( $has_link ) {
				?>
				<a class="<?php echo esc_attr( $button_class ); ?>" href="<?php echo esc_url( $link_url ); ?>"<?php echo $link_target ? ' target="_blank" rel="noopener noreferrer"' : ''; ?>><?php echo cb_istp2027_is_external_url( $link_url ) ? cb_istp2027_external_link_icon() : ''; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static SVG. ?><?php echo esc_html( $link_text ); ?></a>
				<?php
			}
			?>
		</div>
	</div>
</section>
