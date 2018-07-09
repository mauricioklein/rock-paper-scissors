minify: public/javascripts/src/app.js
	browserify public/javascripts/src/app.js -o public/javascripts/bundle.js

debug: app.js
	DEBUG=rock-paper-scissors:* npm start
