const { XBL_TAG } = require("./constants.js");
const { EMPTY_VALUE } = require("./errors.js");

function encode_auth(id = String, jwt = String) {
    if(!(id.length && jwt.length))
        throw new Error(EMPTY_VALUE);
    return `${XBL_TAG} x=${id};${jwt}`;
}

function get_program_args() {
	return process.argv.slice(2);
}

module.exports = {
	get_program_args,
	encode_auth
};
