import { initNavToggle } from './nav-toggle';
import { initNavDropdowns } from './nav-dropdown';
import { initDialogs } from './dialog';
import { initLenis } from './lenis-init';

document.addEventListener('DOMContentLoaded', () => {
	initLenis();
	initNavToggle();
	initNavDropdowns();
	initDialogs();
});
