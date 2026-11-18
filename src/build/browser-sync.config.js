module.exports = {
	proxy: 'istp.local/',
	host: 'istp.local',
	open: 'external',
	notify: false,
	files: ['./css/*.min.css', './js/*.min.js', './**/*.php'],
};
