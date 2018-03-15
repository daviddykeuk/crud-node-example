var contactsModel = require("./model")

var contactLogic = function(repository, monitoring) {
    this.repo = repository;
    this.monitor = monitoring;

    this.get = (id, user_id) => {
        return new Promise(function(resolve, reject) {
            resolve();
        })
    }

    this.getAll = (user_id) => {
        return new Promise(function(resolve, reject) {
            resolve();
        })
    }

    this.create = (contact, user_id) => {
        var self = this;
        return new Promise(function(resolve, reject) {
            if (user_id) {
                var valid = contactsModel.validate(contact);
                if (valid.error) {
                    reject(valid.error)
                } else {
                    contact.user_id = user_id;
                    self.repo.create(contact, (err, res) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(res);
                        }
                    });
                }
            } else {
                reject("user_id was not provided");
            }
        })
    }

    this.update = (id, contact, user_id) => {
        return new Promise(function(resolve, reject) {
            resolve();
        })
    }

    this.delete = (id, user_id) => {
        return new Promise(function(resolve, reject) {
            resolve();
        })
    }
}

module.exports = contactLogic;