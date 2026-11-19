import { initNavToggle } from './nav-toggle';
import { initNavDropdowns } from './nav-dropdown';
import { initDialogs } from './dialog';
import { initLenis } from './lenis-init';
import { initReveal } from './reveal';

document.addEventListener('DOMContentLoaded', () => {
	initReveal();
	initLenis();
	initNavToggle();
	initNavDropdowns();
	initDialogs();
});
