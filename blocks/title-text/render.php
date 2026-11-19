<?php
/**
 * Block template for Title & Text.
 *
 * @package cb-istp2027
 */

defined( 'ABSPATH' ) || exit;

$title = $attributes['title'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'title-text' ) );
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() already escapes. ?>>
	<div class="container">
		<div class="row">
			<div class="col-12 col-lg-4">
				<?php
				if ( $title ) {
					?>
					<h2 class="title-text__title"><?php echo esc_html( $title ); ?></h2>
					<?php
				}
				?>
			</div>
			<div class="col-12 col-lg-8 title-text__body">
				<?php
				if ( trim( $content ) ) {
					echo wp_kses_post( $content );
				}
				?>
			</div>
		</div>
	</div>
</section>
