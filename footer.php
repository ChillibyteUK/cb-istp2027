</main>

<?php
$footer_logos = cb_istp2027_get_repeater_setting( 'footer_logos' );
$footer_email = cb_istp2027_get_setting( 'email' );
?>
<footer id="footer">
	<div class="container">
		<?php
		wp_nav_menu(
			array(
				'theme_location' => 'footer',
				'menu_class'     => 'navbar-nav',
				'container'      => false,
				'fallback_cb'    => false,
			)
		);
		?>
		<div class="footer__inner">
			<ul class="footer__logos">
				<?php
				foreach ( $footer_logos as $footer_logo ) {
					$logo_id = absint( $footer_logo['logo'] ?? 0 );
					if ( ! $logo_id ) {
						continue;
					}
					?>
					<li>
						<?php
						echo wp_get_attachment_image(
							$logo_id,
							'medium',
							false,
							array( 'alt' => $footer_logo['name'] ?? '' )
						);
						?>
					</li>
					<?php
				}
				?>
			</ul>
			<div class="footer__meta">
				<?php
				if ( $footer_email ) {
					?>
					<a class="footer__email" href="mailto:<?php echo esc_attr( antispambot( $footer_email ) ); ?>">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
						<?php echo esc_html( antispambot( $footer_email ) ); ?>
					</a>
					<?php
				}
				?>
				<a class="footer__cookies" href="<?php echo esc_url( home_url( '/cookie-policy/' ) ); ?>">Cookies</a>
			</div>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
