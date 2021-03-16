const sveltePreprocess = require('svelte-preprocess')
const path = require('path')
module.exports = {
	preprocess: sveltePreprocess(),
	kit: {
		adapter: '@sveltejs/adapter-static',
		target: '#svelte',
		paths: {
			assets: '/laserquest', 
			base: '/laserquest'
		}
	}
};


