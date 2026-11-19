/**
 * Scroll reveals — adds .is-visible to .reveal elements as they enter the
 * viewport; the animation itself is CSS (src/css/reveal.css).
 *
 * Progressive enhancement: the hidden starting state only exists once this
 * has added .reveal-ready to <html>, so without JS (or with reduced motion,
 * or no IntersectionObserver) everything is simply visible. Elements already
 * in view when this runs are shown immediately, in the same task as the class
 * is added, so they never flash hidden. Never runs in the block editor — that
 * has its own document and doesn't load theme.min.js.
 */
export function initReveal() {
	const items = document.querySelectorAll('.reveal');

	if (
		!items.length ||
		!('IntersectionObserver' in window) ||
		window.matchMedia('(prefers-reduced-motion: reduce)').matches
	) {
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('is-visible');
				observer.unobserve(entry.target);
			});
		},
		{ rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
	);

	items.forEach((item) => {
		if (item.getBoundingClientRect().top < window.innerHeight) {
			item.classList.add('is-visible');
		} else {
			observer.observe(item);
		}
	});

	document.documentElement.classList.add('reveal-ready');
}
