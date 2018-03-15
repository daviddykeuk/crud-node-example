exports.userID = () => {
	return "abcdefgh12345678";
};

exports.validNewContact = () => {
	return {
		first_name: "Joe",
		last_name: "Bloggs",
		email: "joe@bloggs.com.au"
	};
};

exports.existingContact = () => {
	return {
		id: "1234567890123456",
		first_name: "Joe",
		last_name: "Bloggs",
		email: "joe@bloggs.com.au",
		user_id: this.userID()
	};
};

exports.repository = require("./mockedRepository");