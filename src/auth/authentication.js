'use strict';

const axios = require("axios");
const querystring = require("query-string");
const cookie_parser = require('cookie');
const config = require("../constants.js");
const { throwError, newError } = require("../errors.js");

function requiresIdentityConfirmation(body){
   try{
    const m1 = body.match(/id=\"fmHF\" action=\"(.*?)\"/)[1];
    const m2 = (m1 || '').match(/identity\/confirm/)[0];
    
    return m2 !== null;
   }catch{
     throwError({reason: "Could not authenticate. Invalid credentials, incorrect email or password"});
   }
};

const xstsToken = (token) => new Promise((callback, reject) =>{
  var payload = {
    'RelyingParty': 'http://xboxlive.com',
    'TokenType': 'JWT',
    'Properties': {
      'SandboxId': 'RETAIL',
      'UserTokens': [token]
    }
  };
  var options = {
    url: config.default.uris.XSTSAuthorize,
    method: "POST",
    headers:{
      "User-Agent": config.default.queries.userAgent
    },
    data: payload
  }
  
	axios(options).then(tok =>callback(tok.data)).catch(reject);
});

const getToken = (token) => new Promise((callback, reject) =>{
		const accessToken = decodeURI(token);
	  var payload = {
		"Properties":{
			"AuthMethod":"RPS",
			"RpsTicket": "t=" + accessToken,
			"SiteName":"user.auth.xboxlive.com"
		},
		"RelyingParty":"http://auth.xboxlive.com",
		"TokenType":"JWT"
		};

  var options = {
    url: config.default.uris.userAuthenticate,
    method: "POST",
    headers: {
     'Authorization': 'Bearer ' + accessToken,
     'Accept-Language': "en-US,e",
			"Content-Type": "application/json; charset=utf-8",
			"x-xbl-contract-version": 1,
			Connection: "Keep-Alive",
	  	"User-Agent": config.default.queries.userAgent
    },
    data: payload
  }
  
	axios(options).then(response =>callback(response.data)).catch(reject);
});

const loadSite = () => new Promise((resolve, reject) => {
	var post_vals = unescape(querystring.stringify(Object.assign({}, config.default.queries.authorize)));
  axios({
			"method": "GET",
			"url": config.default.uris.authorize + "?" + post_vals,
			"headers": 	{
				"Content-Type": "application/x-www-form-urlencoded",
		   	"User-Agent": config.default.queries.userAgent,
				"Content-Length": 0,
    	}
	}).then(res =>{
      let str = res.data;
	    const url_post = str.match(/urlPost:'([A-Za-z0-9:\?_\-\.&\\/=]+)/)[1];
  	  const ppft_re = str.match(/sFTTag:'.*value=\"(.*)\"\/>'/)[1];
    	var cookie = res.headers['set-cookie'];
      var cookies = '';
      var a_cookie;
      for(var i = 0; i < cookie.length; i++) {
        a_cookie = cookie_parser.parse(cookie[i]);
        var keys = Object.keys(a_cookie);
        var desired_key = keys[0];
        var desired_value = a_cookie[desired_key]; 
        cookies += desired_key + "=" + desired_value;
        
        if (i < cookie.length - 1)
          cookies += "; ";
      }
    resolve({url_post: url_post, ppft_re: ppft_re, cookie: cookies});
  }).catch(reject);
});

const getPreAuth = (email, pass, callback) => new Promise((callback, reject) =>{
  var access_token_callback = function (response, urlPoster) {
    var _a;
    let hash = "";
    const { responseUrl = '' } = ((_a = response.request) === null || _a === void 0 ? void 0 : _a.res) || {};
    
    try{
	    hash = responseUrl.split('#')[1];
    }catch{}
    
    if (hash === void 0) {
        const errorMessage = requiresIdentityConfirmation(response.data) === true
            ? `Activity confirmation required. Unauthorized access!`
            : `Invalid credentials or 2FA enabled.`;
        reject(newError("authentication", errorMessage));
    }else if (responseUrl === urlPoster) {
       reject(newError("authentication", 'Invalid credentials. Incorrect email or password.'));
    }
    const access_token = responseUrl.match(/access_token=(.+?)&/)[1];
    const expires = responseUrl.match(/expires_in=(.+?)&/)[1];
    const scope = responseUrl.match(/scope=(.+?)&/)[1];
    const token_type = responseUrl.match(/token_type=(.+?)&/)[1];
  	callback({token: access_token, tokenType: token_type, expireDate: expires, scope: scope, nowCookie: response.headers["set-cookie"]});
  };
    
  loadSite().then(data => {
	  var post_vals = {
          'login': email,
          'loginfmt': email,
          'passwd': pass,
          'PPFT': data.ppft_re,
          'PPSX': 'Passpor',
          'SI': "Sign In",
          'type': '11',
          'NewUser': '1',
          'LoginOptions': '1',
          'i3': '36728',
          'm1': '768',
          'm2': '1184',
          'm3': '0',
          'i12': '1',
          'i17': '0',
          'i18': '__Login_Host|1'
  	};
	  var post_vals_qs = querystring.stringify(post_vals);
  	const opts ={
    	url: data.url_post,
	    method: "POST",
  	  headers:{
				"Content-Type": "application/x-www-form-urlencoded",
      	"User-Agent": config.default.queries.userAgent,
				"Content-Length": Buffer.byteLength(post_vals_qs,'utf8'),
				Cookie: data.cookie
    	},
	    data: post_vals_qs
  	};
	  axios(opts).then((resp)=>{
    	access_token_callback(resp, data.url_post)
	  }).catch(reject);
  }).catch(reject);
});

const getAuth = (email, pass, callback) => new Promise((callback, reject) =>{
  getPreAuth(email, pass).then(calc =>{
    getToken(calc.token).then(dat =>{
     	xstsToken(dat.Token).then(data => {
	  		const xui = data.DisplayClaims.xui[0];
      	return callback([data.Token, xui.uhs]);
	  	});
    });
  }).catch(reject);
});

function checkToken(token, callback){
  const opts = {
			url: `https://privacy.xboxlive.com:443/users/me/privacy/settings`,
      method: "GET",
      headers: {
		   "x-xbl-contract-version": 4,
				accept: "application/json",
				authorization: token,
				"accept-language": "en-US",
				Connection: "Keep-Alive",
				"Accept-Encoding": "gzip",
				"User-Agent": "okhttp/4.9.1"
			 }
	};
      
  axios(opts).then(res =>{
  	callback(true);
	}).catch(err =>{
    try{
  		callback(err.response.statusCode === 401);
    }catch{
    	callback(false)
  	}
	});
}

module.exports = (email, pass) => new Promise((resolve, reject) =>{
	getAuth(email, pass).then(resolve).catch(reject);
});
