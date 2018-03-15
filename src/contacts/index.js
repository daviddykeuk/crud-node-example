var contactsModel = require("./model");

// errors
const CONTACT_NOT_FOUND_ERROR = "Contact not found";
const USER_ID_NOT_PROVIDED_ERROR = "USER_ID not provided";
const DATABASE_ERROR = "Could not contact database";

var contactLogic = function(repository, monitoring) {
	this.repo = repository;
	this.monitor = monitoring;

	this.get = (id, user_id) => {
		let self = this;
		return new Promise(function(resolve, reject) {
			if (!user_id) {
				reject(new Error(USER_ID_NOT_PROVIDED_ERROR));
			} else {
				self.repo.get(id, (err, contact) => {
					if (err) {
						reject(new Error(DATABASE_ERROR));
					} else if (contact.user_id == user_id) {
						resolve(contact);
					} else {
						reject(new Error(CONTACT_NOT_FOUND_ERROR));
					}
				});
			}
		});
	};

	this.getAll = (user_id) => {
		let self = this;
		return new Promise(function(resolve, reject) {
			if (!user_id) {
				reject(new Error(USER_ID_NOT_PROVIDED_ERROR));
			} else {
				self.repo.getByUserID(user_id, (err, contacts) => {
					if (err) {
						reject(new Error(DATABASE_ERROR));
					} else {
						resolve(contacts);
					}
				});
			}
		});
	};

	this.create = (contact, user_id) => {
		let self = this;
		return new Promise(function(resolve, reject) {
			if (user_id) {
				var valid = contactsModel.validate(contact);
				if (valid.error) {
					reject(new Error(valid.error));
				} else {
					contact.user_id = user_id;
					self.repo.create(contact, (err, res) => {
						if (err) {
							reject(new Error(err));
						} else {
							resolve(res);
						}
					});
				}
			} else {
				reject(new Error(USER_ID_NOT_PROVIDED_ERROR));
			}
		});
	};

	this.update = (id, contact, user_id) => {
		let self = this;
		return new Promise(function(resolve, reject) {
			let valid = contactsModel.validate(contact);
			if (valid.error) {
				reject(new Error(valid.error));
			} else {
				self.get(id, user_id).then((existingContact) => {
					if (existingContact.user_id == user_id) {
						contact.user_id = user_id; // ensure the user_id on the contact being updated is the same
						self.repo.update(id, contact, (err, res) => {
							if (err) {
								reject(new Error(DATABASE_ERROR));
							} else {
								resolve(res);
							}
						});
					} else {
						reject(new Error(CONTACT_NOT_FOUND_ERROR));
					}
				}).catch((err) => {
					reject(new Error(err));
				});
			}
		});
	};

	this.delete = (id, user_id) => {
		let self = this;
		return new Promise(function(resolve, reject) {
			self.get(id, user_id).then((existingContact) => {
				if (existingContact.user_id == user_id) {
					self.repo.delete(id, (err) => {
						if (err) {
							reject(new Error(DATABASE_ERROR));
						} else {
							resolve();
						}
					});
				} else {
					reject(new Error(CONTACT_NOT_FOUND_ERROR));
				}
			}).catch((err) => {
				reject(new Error(err));
			});
		});
	};
};

module.exports = contactLogic;