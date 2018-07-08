lint:
	./node_modules/.bin/eslint --ignore-pattern '*.min.js' .

minify:
	./node_modules/node-minify/bin/cli.js \
		--compressor babel-minify \
		--input 'public/javascripts/src/*.js' \
		--output 'public/javascripts/app.min.js'

debug: app.js
	DEBUG=rock-paper-scissors:* npm start
