const assert = require("assert");
const ContactLogic = require("../../../src/contacts");
const helpers = require("../../helpers").contacts;
const mockedRepo = require("../../helpers").contacts.repository;

var contactLogic = new ContactLogic(mockedRepo);

const USER_ID = helpers.userID();

describe("Updating contacts requirements...", () => {
	describe("You can update a contact if...", () => {
		it("you have the required properties and it is your contact", () => {
			var contact = helpers.existingContact();
			return contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				assert(res);
			});
		});
	});

	describe("You CANNOT add a new contact if...", () => {

		it("a user id isn't supplied", (done) => {
			let contact = helpers.existingContact();
			contactLogic.update(contact.id, contact, null).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("it isn't your contact", (done) => {
			let contact = helpers.existingContact();
			contactLogic.update(contact.id, contact, "notarealuser").then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you don't provide an id", (done) => {
			let contact = helpers.existingContact();
			contactLogic.update(null, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("the contact doesn't exist", (done) => {
			let contact = helpers.existingContact();
			contactLogic.update("notarealid", contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you don't provide a first name", (done) => {
			let contact = helpers.existingContact();
			delete contact.first_name;
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you provide an empty first name", (done) => {
			let contact = helpers.existingContact();
			contact.first_name = "";
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you provide a first name of over 30 characters", (done) => {
			let contact = helpers.existingContact();
			contact.first = "123456789012345678901234567890more";
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you don't provide a last name", (done) => {
			let contact = helpers.existingContact();
			delete contact.last_name;
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you provide an empty last name", (done) => {
			let contact = helpers.existingContact();
			contact.last_name = "";
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you provide a last name of over 30 characters", (done) => {
			let contact = helpers.existingContact();
			contact.last_name = "123456789012345678901234567890more";
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you don't provide an email address", (done) => {
			let contact = helpers.existingContact();
			delete contact.email;
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you provide an empty email address", (done) => {
			let contact = helpers.existingContact();
			contact.email = "";
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you provide an invalid email address", (done) => {
			let contact = helpers.existingContact();
			contact.email = "thisisnotanemail";
			contactLogic.update(contact.id, contact, USER_ID).then((res) => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});
	});
});