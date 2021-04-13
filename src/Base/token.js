const axios = require("axios");
const querystring = require("query-string");
const cookie_parser = require('cookie');
const config = require("./config.js");


function requiresIdentityConfirmation(body){
   try{
    const m1 = body.match(/id=\"fmHF\" action=\"(.*?)\"/)[1];
    const m2 = (m1 || '').match(/identity\/confirm/)[0];
    
    return m2 !== null;
   }catch{
     throw new Error("Could not authenticate. Invalid credentials, incorrect email or password");
   }
};

function xstsToken(token){
  return new Promise((callback, reject) =>{
  var datar = {
    'RelyingParty': 'http://xboxlive.com',
    'TokenType': 'JWT',
    'Properties': {
      'SandboxId': 'RETAIL',
      'UserTokens': [token]
    }
  };

  let datarr = querystring.stringify(datar);

  var options = {
    url: config.default.uris.XSTSAuthorize,
    method: "POST",
    headers:{
      "User-Agent": config.default.queries.userAgent
    },
    data: datar
  }
  
axios(options).then(tok =>callback(tok.data)).catch(reject);
});
}

function getToken(token){
  return new Promise((callback, reject) =>{
 const accessToken = token.replace(/%([0-9]{1})b/gim, '+');
  var datar = {
	"Properties":{
		"AuthMethod":"RPS",
		"RpsTicket": "t=" + accessToken,
		"SiteName":"user.auth.xboxlive.com"
	},
	"RelyingParty":"http://auth.xboxlive.com",
	"TokenType":"JWT"
};

  let datarr = querystring.stringify(datar);

  var options = {
    url: config.default.uris.userAuthenticate,
    method: "POST",
    headers: {
     'Authorization': 'Bearer ' + accessToken,
     'Accept-Language': "en-US,e",
"Content-Length": Buffer.byteLength(datarr, 'utf8'),
"Content-Type": "application/json; charset=utf-8",
"x-xbl-contract-version": 1,
Connection: "Keep-Alive",
   "User-Agent": config.default.queries.userAgent
    },
    data: datar
  }
  
axios(options).then(tok =>callback(tok.data)).catch(reject);
});
}

function loadSite(callback){
    var post_vals = unescape(querystring.stringify(Object.assign({}, config.default.queries.authorize)));
  
  axios.get(config.default.uris.authorize + "?" + post_vals,{
"Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": config.default.queries.userAgent,
"Content-Length": 0
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
    
    return callback({url_post: url_post, ppft_re: ppft_re, cookie: cookies});
  });
};




function getPreAuth(email, pass, callback){
  return new Promise((callback, reject) =>{
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
        throw new Error(errorMessage);
    }else if (responseUrl === urlPoster) {
       reject('Invalid credentials. Incorrect email or password.');
    }
    
    
         const access_token = responseUrl.match(/access_token=(.+?)&/)[1];
         const expires = responseUrl.match(/expires_in=(.+?)&/)[1];
         const scope = responseUrl.match(/scope=(.+?)&/)[1];
         const token_type = responseUrl.match(/token_type=(.+?)&/)[1];
          
          
          callback({token: access_token, tokenType: token_type, expireDate: expires, scope: scope, nowCookie: response.headers["set-cookie"]});
  };
    
    
  loadSite(data =>{
    
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
  
  
  return axios(opts).then((resp)=>{
    try{
      access_token_callback(resp, data.url_post)
    }
    catch(err)
    {
     reject(err);
    }
  }).catch(reject);
  });
  });
};


function getAuth(email, pass, callback){
  return new Promise((callback, reject) =>{
  getPreAuth(email, pass).then(calc =>{
    const tokens = [];
   
   try{
    getToken(calc.token).then(dat =>{
      try{
      xstsToken(dat.Token).then(data =>{
      const xui = data.DisplayClaims.xui[0];
      tokens.push(data.Token)
      tokens.push(xui.uhs);
      return callback(tokens);
      }).catch(reject);
      }catch(err){reject(err)};
    }).catch(reject);
   }catch(err){reject(err)};
  }).catch(function(err){
    reject(err);
  });
  });
};


function checkToken(token, callback){
  const opts = {
        url: `https://privacy.xboxlive.com:443/users/me/privacy/settings`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: token,
"accept-language": "en-US",

//"ms-cv": "pTuWcmraL1aXXunJnTWqX/.35",

//"xbl-experiments": "tasmigration027,vates905,multitenanttasmigration_127,xbaat333,party-badging,gpspotlight-randrecco1,grouped-followerscf,basicachievements",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        return true;
      }).catch(err =>{
        try{
  if(err.response.statusCode === 401)
  return callback(false);
  else
  return callback(null);
  
        }catch{
          return callback(null)
        }
});
}



module.exports = (email, pass) =>{
  return new Promise((resolve, reject) =>{
  
 getAuth(email, pass).then(data =>{
   const tokens = [];
   tokens.push(data[0]);
   tokens.push(data[1]);
  
   resolve(tokens);
}).catch(function(err){reject(err)});
  });
};
