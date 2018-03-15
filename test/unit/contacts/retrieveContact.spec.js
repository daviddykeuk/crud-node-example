const assert = require("assert");
const ContactLogic = require("../../../src/contacts");
const helpers = require("../../helpers").contacts;
const mockedRepo = require("../../helpers").contacts.repository;

var contactLogic = new ContactLogic(mockedRepo);

const USER_ID = helpers.userID();

describe("Retrieve single contact requirements...", () => {
	describe("You can retrieve a contact if...", () => {
		it("it exists and is your contact", () => {
			var contact = helpers.existingContact();
			return contactLogic.get(contact.id, USER_ID).then((res) => {
				assert(res);
			});

		});

	});

	describe("You cannot retrieve a contact if...", () => {

		it("it doesn't exist", (done) => {
			contactLogic.get("notandid", USER_ID).then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("it's not your contact", (done) => {
			contactLogic.get("notandid", USER_ID).then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you don't provide an id", (done) => {
			contactLogic.get(null, USER_ID).then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you don't provide a user ID", (done) => {
			var contact = helpers.existingContact();
			contactLogic.get(contact.id, null).then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

	});
});



describe("Retrieve all contact requirements...", () => {
	describe("You can retrieve all contacts...", () => {
		it("if your are any user of the system", () => {
			return contactLogic.getAll(USER_ID).then((res) => {
				assert(res.length == 1);
			});
		});

	});
	describe("You cannot retrieve all contacts...", () => {
		it("if you don't provide a user ID", (done) => {
			contactLogic.getAll(null).then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

	});
});