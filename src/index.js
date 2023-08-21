const xbox = require("./methods");
const token = require("./auth/authentication.js");
const login = require("./auth");

module.exports = {
  Account: xbox,
  Token: token,
  Login: login
};
