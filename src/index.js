<<<<<<< HEAD
const xbox = require("./methods");
const token = require("./auth/authentication.js");
const login = require("./auth");
=======
const xbox = require("./Base");
const token = require("./Base/token.js");
const login = require("./Base/directAccount.js");
>>>>>>> main

module.exports = {
  Account: xbox,
  Token: token,
  Login: login
};
