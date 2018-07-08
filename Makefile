debug: app.js
	DEBUG=rock-paper-scissors:* npm start

minify:
	./node_modules/node-minify/bin/cli.js \
		--compressor babel-minify \
		--input 'public/javascripts/src/*.js' \
		--output 'public/javascripts/app.min.js'

specs: test/
	./node_modules/mocha/bin/mocha test/**/*.js
