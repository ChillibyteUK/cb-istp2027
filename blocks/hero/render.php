<?php
/**
 * Block template for Hero.
 *
 * @package cb-istp2027
 */

defined( 'ABSPATH' ) || exit;

$background_id  = (int) ( $attributes['backgroundId'] ?? 0 );
$background_url = $attributes['backgroundUrl'] ?? '';
$logo_id        = (int) ( $attributes['logoId'] ?? 0 );
$logo_url       = $attributes['logoUrl'] ?? '';
$logo_alt       = $attributes['logoAlt'] ?? '';
$eyebrow        = $attributes['eyebrow'] ?? '';
$title          = $attributes['title'] ?? '';
$details        = array_filter( array_map( 'trim', preg_split( '/\R/', $attributes['details'] ?? '' ) ) );

$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'hero' ) );
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
	<img class="hero__murmuration" src="<?php echo esc_url( add_query_arg( 'v', filemtime( get_theme_file_path( 'img/murmuration.svg' ) ), get_theme_file_uri( 'img/murmuration.svg' ) ) ); ?>" alt="" aria-hidden="true" fetchpriority="high">
	<div class="container hero__inner">
		<?php
		if ( $logo_id ) {
			echo wp_get_attachment_image( $logo_id, 'medium', false, array( 'class' => 'hero__logo', 'alt' => $logo_alt ) );
		} elseif ( $logo_url ) {
			?>
			<img class="hero__logo" src="<?php echo esc_url( $logo_url ); ?>" alt="<?php echo esc_attr( $logo_alt ); ?>">
			<?php
		}
		?>
		<div class="hero__text">
			<?php
			if ( $eyebrow ) {
				?>
				<p class="hero__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
				<?php
			}
			if ( $title ) {
				?>
				<h1 class="hero__title"><?php echo esc_html( $title ); ?></h1>
				<?php
			}
			if ( $details ) {
				?>
				<ul class="hero__details">
					<?php foreach ( $details as $detail ) { ?>
						<li><?php echo esc_html( $detail ); ?></li>
					<?php } ?>
				</ul>
				<?php
			}
			?>
		</div>
	</div>
</section>
