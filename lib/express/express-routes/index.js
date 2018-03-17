var contactRoutes = require("./contacts");

exports.setupRoutes = (app, repo) => {
	contactRoutes.setupRoutes("/contacts", app, repo);
};