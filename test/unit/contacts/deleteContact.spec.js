const assert = require("assert");
const ContactLogic = require("../../../src/contacts");
const helpers = require("../../helpers").contacts;
const mockedRepo = require("../../helpers").contacts.repository;

var contactLogic = new ContactLogic(mockedRepo);

const USER_ID = helpers.userID();

describe("Deleting contacts requirements...", () => {
	describe("You can delete a contact if...", () => {

		it("it exists and is your contact", () => {
			var contact = helpers.existingContact();
			return contactLogic.delete(contact.id, USER_ID).then(() => {
				assert(true);
			});
		});

	});

	describe("You cannot delete a contact if...", () => {

		it("it doesn't exist", (done) => {
			contactLogic.delete("anunknowncontact", USER_ID).then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you don't provide and id", (done) => {
			contactLogic.delete(null, USER_ID).then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("it's not your contact", (done) => {
			var contact = helpers.existingContact();
			contactLogic.delete(contact.id, "nottherightuser").then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

		it("you don't provide a user ID", (done) => {
			var contact = helpers.existingContact();
			contactLogic.delete(contact.id, null).then(() => {
				done(new Error("This should not have succeded"));
			}).catch((err) => {
				done(!err);
			});
		});

	});
});