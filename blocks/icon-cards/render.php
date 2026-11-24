<?php
/**
 * Block template for Icon Cards.
 *
 * @package cb-istp2027
 */

defined( 'ABSPATH' ) || exit;

$title = $attributes['title'] ?? '';
$cards = array_values(
	array_filter(
		(array) ( $attributes['cards'] ?? array() ),
		static function ( $card ) {
			return ! empty( $card['title'] ) || ! empty( $card['content'] ) || ! empty( $card['icon'] );
		}
	)
);

if ( ! $title && ! $cards ) {
	return;
}

// Three to a row for 3, 5 or 6+ cards; two to a row for 1, 2 or 4.
$count     = count( $cards );
$per_row   = ( 0 === $count % 3 || $count >= 5 ) ? 3 : 2;
$col_class = 3 === $per_row ? 'col-12 col-lg-4' : 'col-12 col-md-6';

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'icon-cards' ) );
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() already escapes. ?>>
	<div class="container">
		<?php
		if ( $title ) {
			?>
			<h2 class="icon-cards__title reveal"><?php echo esc_html( $title ); ?></h2>
			<?php
		}

		if ( $cards ) {
			?>
			<div class="row icon-cards__row">
				<?php
				foreach ( $cards as $index => $card ) {
					$icon_id    = absint( $card['icon'] ?? 0 );
					$card_title = $card['title'] ?? '';
					$card_text  = $card['content'] ?? '';
					?>
					<div class="<?php echo esc_attr( $col_class ); ?>">
						<div class="icon-cards__card reveal" style="--reveal-delay: <?php echo esc_attr( min( $index, 5 ) * 0.1 ); ?>s">
							<?php
							if ( $icon_id ) {
								echo wp_get_attachment_image(
									$icon_id,
									'medium',
									false,
									array(
										'class'    => 'icon-cards__icon',
										'alt'      => '',
										'loading'  => 'lazy',
										'decoding' => 'async',
									)
								);
							}
							?>
							<div class="icon-cards__body">
								<?php
								if ( $card_title ) {
									?>
									<h3 class="icon-cards__card-title"><?php echo esc_html( $card_title ); ?></h3>
									<?php
								}

								if ( $card_text ) {
									echo wp_kses_post( wpautop( esc_html( $card_text ) ) );
								}
								?>
							</div>
						</div>
					</div>
					<?php
				}
				?>
			</div>
			<?php
		}
		?>
	</div>
</section>
