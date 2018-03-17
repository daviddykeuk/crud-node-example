const ContactLogic = require("../../../src/contacts");

exports.setupRoutes = (route, app, repo) => {
	var contactLogic = new ContactLogic(repo, null);

	app.get(route, (req, res) => {
		var user_id = req.headers.user_id;
		contactLogic.getAll(user_id).then((contacts)=>{
			res.send(contacts);
		}).catch((err) => {
			res.status(400).send(err.message);
		});
	});

	app.post(route, (req, res) => {
		var user_id = req.headers.user_id;
		var contact = req.body;

		contactLogic.create(contact, user_id).then((contact)=>{
			res.status(201).send(contact);
		}).catch((err) => {
			res.status(400).send(err.message);
		});
	});

	app.get(route + "/:id", (req, res) => {
		var user_id = req.headers.user_id;
		var contact_id = req.params.id;

		contactLogic.get(contact_id, user_id).then((contact)=>{
			res.send(contact);
		}).catch((err) => {
			res.status(400).send(err.message);
		});

	});

	app.put(route + "/:id", (req, res) => {
		var user_id = req.headers.user_id;
		var contact_id = req.params.id;
		var contact = req.body;

		contactLogic.update(contact_id, contact, user_id).then((contact)=>{
			res.send(contact);
		}).catch((err) => {
			res.status(400).send(err.message);
		});

	});

	app.delete(route + "/:id", (req, res) => {
		var user_id = req.headers.user_id;
		var contact_id = req.params.id;

		contactLogic.delete(contact_id, user_id).then(()=>{
			res.status(204).send()
		}).catch((err) => {
			res.status(400).send(err.message);
		});

	});
};