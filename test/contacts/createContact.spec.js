const assert = require("assert");
const ContactLogic = require("../../src/contacts");
const helpers = require("./helpers");
const mockedRepo = require("./helpers/mockedRepository")

var contactLogic = new ContactLogic(mockedRepo)

const USER_ID = helpers.userID()

describe("Adding new contacts requirements...", () => {
    describe("You can add a new contact if...", () => {
        it("you have the required properties", () => {
            var contact = helpers.validNewContact();
            return contactLogic.create(contact, USER_ID).then(function(res) {
                assert(res);
            });
        })
    })

    describe("You CANNOT add a new contact if...", () => {
        it("you don't supply a user_id", (done) => {
            var contact = helpers.validNewContact();
            contactLogic.create(contact, null).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        })
        it("you supply an empty user_id", (done) => {
            var contact = helpers.validNewContact();
            contactLogic.create(contact, "").then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        })

        it("your contact has no first name", (done) => {
            var contact = helpers.validNewContact();
            delete contact.first_name;
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });

        it("your contact has an empty first name", (done) => {
            var contact = helpers.validNewContact();
            contact.first_name = "";
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });

        it("your contact has a first name of over 30 characters", (done) => {
            var contact = helpers.validNewContact();
            contact.first_name = "123456789012345678901234567890more";
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });

        it("your contact has no last name", (done) => {
            var contact = helpers.validNewContact();
            delete contact.last_name;
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });

        it("your contact has an empty last name", (done) => {
            var contact = helpers.validNewContact();
            contact.last_name = "";
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });

        it("your contact has a last name of over 30 characters", (done) => {
            var contact = helpers.validNewContact();
            contact.last_name = "123456789012345678901234567890more";
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });

        it("your contact has no email", (done) => {
            var contact = helpers.validNewContact();
            delete contact.email;
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });

        it("your contact has an empty email", (done) => {
            var contact = helpers.validNewContact();
            contact.email = "";
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });

        it("your contact has an invalid email", (done) => {
            var contact = helpers.validNewContact();
            contact.email = "thisisnotanemail";
            contactLogic.create(contact, USER_ID).then((res) => {
                done(new Error("This should not have succeded"))
            }).catch((err) => {
                done(!err)
            });
        });
    })
})