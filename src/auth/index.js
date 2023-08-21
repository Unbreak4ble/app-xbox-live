const authenticate = require("./authentication");
const account = require("../methods/index.js");
const { encode_auth } = require("../utils.js");

module.exports = (email, password) => new Promise(async (resolve, reject) => {
  authenticate(email, password).then(token => resolve(new account(encode_auth(token[1], token[0])))).catch(reject);
});
