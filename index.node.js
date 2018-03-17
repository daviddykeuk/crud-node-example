require("dotenv").config();

const expressApp = require("./lib/express");
const repo = require("./test/helpers/contacts/mockedRepository");

var app = expressApp(null, repo);

app.listen(process.env.PORT | 8080, function () {
	console.log("Example app listening on port %s", process.env.PORT | 8080);
});
 
