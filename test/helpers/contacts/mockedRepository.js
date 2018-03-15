const helpers = require("./index");

exports.get = (id, next) => {
	if (id == "1234567890123456") {
		next(null, helpers.existingContact());
	} else {
		next(new Error("Contact not found"));
	}
};

exports.getByUserID = (userId, next) => {
	next(null, [helpers.existingContact()]);
};

exports.create = (contact, next) => {
	contact.id = "1234567890123456";
	next(null, helpers.existingContact());
};

exports.update = (id, contact, next) => {
	if (contact.id == "1234567890123456") {
		next(null, helpers.existingContact());
	} else {
		next(new Error("Contact not found"));
	}
};

exports.delete = (id, next) => {
	if (id == "1234567890123456") {
		next(null);
	} else {
		next(new Error("Contact not found"));
	}
};