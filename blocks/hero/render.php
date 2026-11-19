<?php
/**
 * Block template for Hero.
 *
 * @package cb-istp2027
 */

defined( 'ABSPATH' ) || exit;

$background_id  = (int) ( $attributes['backgroundId'] ?? 0 );
$background_url = $attributes['backgroundUrl'] ?? '';
$overlay        = max( 0, min( 100, (int) ( $attributes['overlayOpacity'] ?? 55 ) ) );
$logo_id        = (int) ( $attributes['logoId'] ?? 0 );
$logo_url       = $attributes['logoUrl'] ?? '';
$logo_alt       = $attributes['logoAlt'] ?? '';
$title          = $attributes['title'] ?? '';
$subtitle       = $attributes['subtitle'] ?? '';
$intro          = $attributes['intro'] ?? '';

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'hero',
		'style' => '--hero-overlay: ' . ( $overlay / 100 ),
	)
);
?>
<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- get_block_wrapper_attributes() already escapes. ?>>
	<?php
	if ( $background_id ) {
		echo wp_get_attachment_image(
			$background_id,
			'full',
			false,
			array(
				'class'         => 'hero__bg',
				'alt'           => '',
				'sizes'         => '100vw',
				'loading'       => 'eager',
				'fetchpriority' => 'high',
			)
		);
	} elseif ( $background_url ) {
		?>
		<img class="hero__bg" src="<?php echo esc_url( $background_url ); ?>" alt="" fetchpriority="high">
		<?php
	}
	?>
	<div class="hero__overlay" aria-hidden="true"></div>
	<div class="container hero__inner">
		<?php
		if ( $logo_id ) {
			echo wp_get_attachment_image(
				$logo_id,
				'medium',
				false,
				array(
					'class' => 'hero__logo',
					'alt'   => $logo_alt,
				)
			);
		} elseif ( $logo_url ) {
			?>
			<img class="hero__logo" src="<?php echo esc_url( $logo_url ); ?>" alt="<?php echo esc_attr( $logo_alt ); ?>">
			<?php
		}
		if ( $title ) {
			?>
			<h1 class="hero__title"><?php echo esc_html( $title ); ?></h1>
			<?php
		}
		if ( $subtitle ) {
			?>
			<p class="hero__subtitle"><?php echo esc_html( $subtitle ); ?></p>
			<?php
		}
		if ( $intro ) {
			?>
			<p class="hero__intro"><?php echo esc_html( $intro ); ?></p>
			<?php
		}
		?>
	</div>
</section>
