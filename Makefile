debug: app.js
	DEBUG=rock-paper-scissors:* npm start

specs: test/
	./node_modules/mocha/bin/mocha
