module.exports = function(){
	var config = {
		"port": 8000,
		"dev": {
			"less": "./www/styles/main.less",
			"js": [
				"!node_modules/**",
				"./www/*.js",
				"./www/**/*.js"],
			"templates": "./www/views/**/*.jade",
			"images": ['www/images/*',
				"www/images/**/*"]
		},
		"public" : {
			"styles": "./public/styles",
			"bundle-css": "./public/styles/bundle.css",
			"js": "./public/js",
			"bundle-js": './public/js/bundle.js',
			"templates": "./public/views",
			"html": ["index.html", 
				"./public/views/**/*.html"],
			"images": "./public/images"
		}
	}

	return config;
};