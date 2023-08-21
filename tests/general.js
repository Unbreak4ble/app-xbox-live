const { throwError} = require("../src/errors.js");
const app = require("../src");
const { get_program_args } = require("../src/utils.js");
const [email, pass] = get_program_args();
const methods = require("./methods");

if(!(email && pass))
	throwError("missing email or password arguments");

app.Login(email, pass)
.then((account) => (console.log("authentication passed"), methods(account)))
.catch((err) => {
	const msg = "general test failed\nreason: "+err;
	throwError(msg);
});
