const axios = require("axios");

class Account {
  #_token;
  constructor(Token){
    this.#_token = Token;
  };
  
  //---------------- Custom ------------------
  
  
  request = (options) =>{
    return new Promise ((resolve, reject) =>{
    if(options["url"] && options["method"]){
      if(typeof options["url"] === "string" && typeof options["method"] === "string"){
        
      if(options["data"]){
  
          let opts = {
      url: options["url"],
      method: options["method"],
      headers: {}
         };
         if(options["headers"])
         opts["headers"] = options["headers"];
         
         
opts["headers"]["authorization"] = this.#_token;
      opts["headers"]["User-Agent"] = "okhttp/4.9.1";
      
      opts["data"] = options["data"];
      

      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject(`${err}`);
});
        
      }else{
         let opts = {
      url: options["url"],
      method: options["method"],
      headers: {}
         };
         
        if(options["headers"])
        opts["headers"] = options["headers"];
         
         
opts["headers"]["authorization"] = this.#_token;
      opts["headers"]["User-Agent"] = "okhttp/4.9.1";
      
     

      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject(`${err}`);
});
       }
      
    }else
      reject ("The types of the URL or Method property must be string.");
    
    
    }else
reject("you need the URL and the request method.");
});
  };
  
  
  
  
  
  
  
  
  //---------------- club ------------------
  
 
  club = {
  find: (xuid) => {
    return new Promise((resolve, reject) =>{
   
      const opts = {
      url: `https://clubhub.xboxlive.com:443/clubs/search/decoration/detail?count=30&q=${xuid}&tags=&titles=`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      

      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject(`${err}`);
});
    });
  },
  get: (xuid) =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://clubhub.xboxlive.com:443/clubs/ids(${xuid})/decoration/ClubPresence,Roster,Settings`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 2,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  },
  chat: {
    get: (xuid, amount) =>{
      return new Promise((resolve, reject) =>{
    if(amount && xuid){
        if((typeof amount).toLowerCase() !== "number") reject("The type of the amount argument must be numeric.");
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string");
        
      }else{
        reject("Invalid parameter.");
      }
      
    
      const opts = {
        url: `https://chatfd.xboxlive.com:443/channels/Club/${xuid}/messages/history?maxItems=${amount}`,
      method: "GET",
      headers: {
  // "x-xbl-contract-version": 2,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
    }
  },
  feed: {
    get: (xuid, amount) =>{
      return new Promise((resolve, reject) =>{
     if(amount && xuid){
        if((typeof amount).toLowerCase() !== "number") reject("The type of the amount argument must be numeric.");
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string");
        
      }else{
        reject("Invalid parameter.");
      }
      
      
      const opts = {
        url: `https://avty.xboxlive.com:443/clubs/clubId(${xuid})/activity/feed?numItems=${amount}`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 13,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",

Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
    },
    send: (xuid, message) =>{
      return new Promise((resolve, reject) =>{
     if(message && xuid){
        if((typeof message).toLowerCase() !== "string") reject("The type of the message argument must be numeric.");
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string");
        
      }else{
        reject("Invalid parameter.");
      }
      
      const dat = {
	"postText":message,
	"postType":"Text",
	"timelines":[
		{
			"timelineOwner":xuid,
			"timelineType":"Club"
		}
	]
}
      
      
      const opts = {
        url: `https://userposts.xboxlive.com:443/users/me/posts`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 2,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
"Content-Length": Buffer.byteLength(JSON.stringify(dat), "utf8"),
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 },
 data: dat
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
    }
  }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //------------------ chat ------------------
  
  chat = {
  inbox: {
    get: () => {
    return new Promise((resolve, reject) =>{
      const opts = {
        url: "https://xblmessaging.xboxlive.com:443/network/xbox/users/me/inbox/Secondary",
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  auth:{
    get: (xuid) => {
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://chat.xboxlive.com:443/users/xuid(${xuid})/chat/auth`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  message: {
  send: (xuid, message) => {
    return new Promise((resolve, reject) =>{
    if(message && xuid){
        if((typeof message).toLowerCase() !== "string") reject("The type of the message argument must be numeric.");
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string");
        
      }else{
        reject("Invalid parameter.");
      }
      
    
      const opts = {
        url: `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/conversations/users/xuid(${xuid})`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 },
 data: {
	"parts":[
		{
			"contentType":"text",
			"version": 0,
			"text": message
		}
	]
}
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  },
    get: (xuid, amount) => {
    return new Promise((resolve, reject) =>{
      
      if(amount && xuid){
        if((typeof amount).toLowerCase() !== "number") reject("The type of the amount argument must be numeric.");
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string");
        
      }else{
        reject("Invalid parameter.");
      }
      
      const opts = {
        url: `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/conversations/users/xuid(${xuid})?maxItems=${amount}`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  //------------------ People ------------------
  
  
  people = {
    profile:{
      get: (xuid) =>{
    return new Promise((resolve, reject) =>{
      const opts = {
      url: `https://profile.xboxlive.com:443/users/batch/profile/settings`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 2,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 },
 data: {
	"settings":[
		"GameDisplayName",
		"AppDisplayName",
		"AppDisplayPicRaw",
		"Gamerscore",
		"Gamertag",
		"GameDisplayPicRaw",
		"AccountTier",
		"TenureLevel",
		"XboxOneRep",
		"PreferredColor",
		"Location",
		"Bio",
		"Watermarks",
		"RealName"
	],
	"userIds": Array.isArray(xuid) ? xuid : [xuid]
}
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    },
    setting:{
      get: (xuid) =>{
    return new Promise((resolve, reject) =>{
      const opts ={
      url: `https://xblmessaging.xboxlive.com:443/network/xbox/users/xuid(${xuid})/safetySettings`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 2,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
      }
    },
    summary:{
      get: (xuid) =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://social.xboxlive.com:443/users/xuid(${xuid})/summary`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 2,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    },
    get: (xuid) =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://peoplehub.xboxlive.com:443/users/me/people/xuids(${xuid})/decoration/detail,preferredColor,presenceDetail,multiplayerSummary`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  },
  find: (gamertag, amount) =>{
    return new Promise((resolve, reject) =>{
      if(amount && gamertag){
        if((typeof amount).toLowerCase() !== "number") reject("The type of the amount argument must be numeric.");
        
        if((typeof gamertag).toLowerCase() !== "string") reject("The type of gamertag argument must be string");
        
      }else{
        reject("Invalid parameter.");
      }
      
      const opts = {
        url: `https://peoplehub.xboxlive.com:443/users/me/people/search/decoration/detail,preferredColor?q=${gamertag}&maxItems=${amount}`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  },
  activity:{
    get: (xuid, amount) =>{
    return new Promise((resolve, reject) =>{
      if(amount && xuid){
        if((typeof amount).toLowerCase() !== "number") reject("The type of the amount argument must be numeric.");
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string");
        
      }else{
        reject("Invalid parameter.");
      }
      
      const opts = {
        url: `https://avty.xboxlive.com:443/users/xuid(${xuid})/activity/history?excludeTypes=Played&numItems=${amount}`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  screenshot:{
    get: (xuid, amount) =>{
    return new Promise((resolve, reject) =>{
      if(amount && xuid){
        if((typeof amount).toLowerCase() !== "number") reject("The type of the amount argument must be numeric.");
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string");
        
      }else{
        reject("Invalid parameter.");
      }
      
      const opts = {
        url: `https://avty.xboxlive.com:443/users/xuid(${xuid})/activity/history/unshared?activityTypes=Screenshot&numItems=${amount}uid`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 2,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(async res =>{
        
      resolve(res.data)
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  games:{
    get: (xuid) =>{
    return new Promise((resolve, reject) =>{
   if(!xuid) return;
   
      const opts = {
        url: `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titlehistory/decoration/achievement,image,scid`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 2,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  add: (xuid) => {
    return new Promise((resolve, reject) =>{
   if(!xuid) return;
   
   
      const dat = {
	"xuids": Array.isArray(xuid) ? xuid : [xuid]
      }
      
      const opts = {
        url: `https://social.xboxlive.com:443/users/me/people/xuids?method=add`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 1,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
"Content-Length": Buffer.byteLength(JSON.stringify(dat), "utf8"),
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 },
 data: dat
      };
      
      axios(opts).then(res =>{
        resolve();
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else if(err.response.status === 400 && err.response.data)
    reject(err.response.data);
  else
  reject("Unknown error. " + err);
});
    });
  },
  remove: (xuid) => {
       return new Promise((resolve, reject) =>{
     if(!xuid) return;
     
      const dat = {
	"xuids": Array.isArray(xuid) ? xuid : [xuid]
      }
      
      const opts = {
        url: `https://social.xboxlive.com:443/users/me/people/xuids?method=remove`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 1,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
"Content-Length": Buffer.byteLength(JSON.stringify(dat), "utf8"),
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 },
 data: dat
      };
      
      axios(opts).then(res =>{
        resolve();
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else if(err.response.status === 400 && err.response.data)
    reject(err.response.data);
  else
  reject("Unknown error. " + err);
});
    });
  },
  presence: {
    get: (xuid) =>{
      return new Promise((resolve, reject) =>{
        const dat = {
          "level":"all",
	"users": Array.isArray(xuid) ? xuid : [xuid]
        }
        
      const opts = {
        url: `https://userpresence.xboxlive.com:443/users/batch?level=all`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 3,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
"Content-Length": Buffer.byteLength(JSON.stringify(dat), "utf8"),
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 },
 data: dat
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
    }
  },
  recommendation:{
      get: () =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://peoplehub.xboxlive.com:443/users/me/people/recommendations`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 1,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    },
    achievement:{
      titles: {
        complete: {
    get: (xuid) =>{
    return new Promise((resolve, reject) =>{
  
  if(xuid){
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string.");
        
      }else{
        reject("Invalid parameter.");
      }
  
  
      const opts = {
        url: `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titlehistory/decoration/achievement,image,scid`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 2,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
        },
        get: (xuid) =>{
         return new Promise((resolve, reject) =>{
   if(!xuid) return;
   
    
    
      const opts = {
        url: `https://usertitles.xboxlive.com:443/users/xuid(${xuid})/titles`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 1,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
      }
      },
    stats:{
      get: (xuid, titleId) =>{
         return new Promise((resolve, reject) =>{
   if(!xuid || !titleId) return;
   
    let dat = {
      "arrangebyfield":"xuid",
	"stats":[
		{
			"name":"MinutesPlayed",
			"titleid": titleId
		}
	],
	"xuids": Array.isArray(xuid) ? xuid : [xuid]
    }
    
      const opts = {
        url: `https://userstats.xboxlive.com:443/batch`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 2,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
"Content-Length": Buffer.byteLength(JSON.stringify(dat), "utf8"),
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 },
 data: dat
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
      }
    },
    all:{
    get: (xuid) =>{
    return new Promise((resolve, reject) =>{
  if(!xuid) return;
  
      const opts = {
        url: `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titleHistory/decoration/GamePass,Achievement,Stats`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 2,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    },
    get: (xuid, titleId, amount) =>{
    return new Promise((resolve, reject) =>{
      if(xuid && amount && titleId){
        if((typeof amount).toLowerCase() !== "number") reject("The type of the amount argument must be numeric.");
        
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string.");
        
      }else{
        reject("Invalid parameter.");
      }
      
      
      const opts = {
        url: `https://achievements.xboxlive.com:443/users/xuid(${xuid})/achievements?titleId=${titleId}&maxItems=${amount}`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  gameclip:{
    get: (xuid, amount) =>{
    return new Promise((resolve, reject) =>{
  
  if(xuid && amount){
        if((typeof amount).toLowerCase() !== "number") reject("The type of the amount argument must be numeric.");
        
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string.");
        
      }else{
        reject("Invalid parameter.");
      }
  
  const dat = {
    "categories":[
		"Gameclips"
	]
  }
  
      const opts = {
        url: `https://activityhub.xboxlive.com:443/hot/users/xuid(${xuid})?maxItems=${amount}`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 1,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
"Content-Length": Buffer.byteLength(JSON.stringify(dat), "utf8"),
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 },
 data: dat
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    },
    clubs:{
    get: (xuid) =>{
    return new Promise((resolve, reject) =>{
  
  if(xuid){
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string.");
      }else{
        reject("Invalid parameter.");
      }
  
  
      const opts = {
        url: `https://clubhub.xboxlive.com:443/clubs/xuid(${xuid})/decoration/detail,settings`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    },
    friends:{
    get: (xuid) =>{
    return new Promise((resolve, reject) =>{
  
  if(xuid){
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string.");
        
      }else{
        reject("Invalid parameter.");
      }
  

  
      const opts = {
        url: `https://peoplehub.xboxlive.com:443/users/xuid(${xuid})/people/social/decoration/multiplayersummary,preferredcolor`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 1,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    }
    /*
        followers:{
    get: (xuid) =>{
    return new Promise((resolve, reject) =>{
  
  if(xuid){
        
        if((typeof xuid).toLowerCase() !== "string") reject("The type of xuid argument must be string.");
        
      }else{
        reject("Invalid parameter.");
      }
  

  
      const opts = {
        url: `https://peoplehub.xboxlive.com:443/users/xuid(${xuid})/people/followers/decoration/multiplayersummary,preferredcolor`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 1,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    }
    */
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  //------------------ title ------------------
  title = {
    get: (xuid) =>{
      return new Promise((resolve, reject) =>{
      if(!xuid) return;
      
        const dat = {
	"titleIds": Array.isArray(xuid) ? xuid : [xuid]
        }
        
      const opts = {
        url: `https://titlehub.xboxlive.com:443/titles/batch/decoration/detail,image,achievement,scid`,
      method: "POST",
      headers: {
   "x-xbl-contract-version": 2,
accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",
"Content-Length": Buffer.byteLength(JSON.stringify(dat), "utf8"),
Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"
 },
 data: dat
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
    }
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  
  
  // ------------------ me ------------------
  
  me = {
    account:{
      privacy:{
        settings:{
          get: () =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://privacy.xboxlive.com:443/users/me/privacy/settings`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    }
      }
    },
    profile:{
      get: () => {
    return new Promise((resolve, reject) =>{
   
      const opts = {
      url: `https://accounts.xboxlive.com:443/users/current/profile`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 3,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      

      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  },
  friends:{
    get: () =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://peoplehub.xboxlive.com:443/users/me/people/social/decoration/detail,preferredColor,presenceDetail,multiplayerSummary`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  family:{
    get: (xuid) =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://accounts.xboxlive.com:443/family/memberXuid(${xuid})`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    }
    
    
    
    },
  reports:{ 
    get: () =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://editorial.xboxlive.com:443/Site/XboxLiveFeeds/Content/safety/reportingReasons/reportingReasons`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
   followers:{
     get: () =>{
    return new Promise((resolve, reject) =>{
      const opts = {
      url: `https://peoplehub.xboxlive.com:443/users/me/people/followers`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  groups:{
    get: () =>{
    return new Promise((resolve, reject) =>{
      const opts = {
      url: `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/groups`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 2,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
  },
  games:{
    titlesId:{
      get: () =>{
    return new Promise((resolve, reject) =>{
      const opts = {
        url: `https://usertitles.xboxlive.com:443/users/me/titles`,
      method: "GET",
      headers: {
   "x-xbl-contract-version": 4,

accept: "application/json",
authorization: this.#_token,
"accept-language": "en-US",




Connection: "Keep-Alive",
"Accept-Encoding": "gzip",
"User-Agent": "okhttp/4.9.1"

 }
      };
      
      axios(opts).then(res =>{
        resolve(res.data);
      }).catch(err =>{
  if(err.response.status === 401)
  reject("Invalid token.");
  else
  reject("Unknown error. " + err);
});
    });
  }
    }
  }
   
  };
  
};


module.exports = Account;
