'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
var serve = require('koa-static-server');
var Koa = require('koa');

var server = new Koa();

server.use(serve({ rootDir: 'web' }));

process.on('SIGTERM', async () => {
	console.log('EXITING GRACEFULLY...');
	process.exit(0);
});
process.on('SIGINT', async () => {
	console.log('EXITING GRACEFULLY...');
	process.exit(0);
});

console.log('listening on port 3000');

server.listen(3000);

// This is required for TestCafe 
function withHttps() {
	const config = {
		domain: 'localhost', // your domain
		https: {
			port: 4000, // any port that is open and not already used on your server
			options: {
				passphrase: 'fabian',
				pfx: fs.readFileSync(
					path.resolve(process.cwd(), 'cert/CA/testingdomain.pfx')
				),
			},
		},
	};

	const serverCallback = server.callback();

	try {
		const httpsServer = https.createServer(
			config.https.options,
			serverCallback
		);

		httpsServer.listen(config.https.port, function (err) {
			if (!!err) {
				console.error('HTTPS server FAIL: ', err, err && err.stack);
			} else {
				console.log(
					`HTTPS server OK: https://${config.domain}:${config.https.port}`
				);
			}
		});
	} catch (ex) {
		console.error('Failed to start HTTPS server\n', ex, ex && ex.stack);
	}
}
