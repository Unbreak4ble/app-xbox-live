const xbox = require("./Base");
const token = require("./Base/token.js");
const login = require("./Base/directAccount.js");

module.exports = {
  Account: xbox,
  Token: token,
  Login: login
};
