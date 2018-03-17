"use strict";

const express = require("express");

const appInitializer = require("./express.initializer");
const requestLifecycle = require("./request-lifecycle/");

const expressRoutes = require("./express-routes");

var app = function (args, repo) {
	let app = express();

	app.use(requestLifecycle.beginRequest);

	appInitializer({
		app: app,
		options: args
	});

	expressRoutes.setupRoutes(app, repo);

	app.use(requestLifecycle.endRequest);

	return app;
};

module.exports = app;
