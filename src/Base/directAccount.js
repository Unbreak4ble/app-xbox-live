const token = require("./token.js");
const account = require("./index.js");

module.exports = (email, password) => new Promise(async (resolve, reject) => {
  token(email, password).then(token => resolve(new account(`XBL3.0 x=${token[1]};${token[0]}`))).catch(reject);
});
