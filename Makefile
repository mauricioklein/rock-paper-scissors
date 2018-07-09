minify: public/javascripts/src/app.js
	./node_modules/browserify/bin/cmd.js public/javascripts/src/app.js | \
	./node_modules/uglify-es/bin/uglifyjs -cm -o public/javascripts/bundle.min.js

debug: app.js
	DEBUG=rock-paper-scissors:* npm start
