const axios = require("axios");

class Account {
	constructor(Token) {
		this_token = Token;
	}

	//---------------- Custom ------------------

	request(options) {
		return new Promise((resolve, reject) => {
			if (options["url"] && options["method"]) {
				if (
					typeof options["url"] === "string" &&
					typeof options["method"] === "string"
				) {
					if (options["data"]) {
						let opts = {
							url: options["url"],
							method: options["method"],
							headers: {},
						};
						if (options["headers"]) opts["headers"] = options["headers"];

						opts["headers"]["authorization"] = this_token;
						opts["headers"]["User-Agent"] = "okhttp/4.9.1";

						opts["data"] = options["data"];

						axios(opts)
							.then(res => {
								resolve(res.data);
							})
							.catch(err => {
								if (err.response.status === 401) reject("Invalid token.");
								else reject(`${err}`);
							});
					} else {
						let opts = {
							url: options["url"],
							method: options["method"],
							headers: {},
						};

						if (options["headers"]) opts["headers"] = options["headers"];

						opts["headers"]["authorization"] = this._token;
						opts["headers"]["User-Agent"] = "okhttp/4.9.1";

						axios(opts)
							.then(res => {
								resolve(res.data);
							})
							.catch(err => {
								if (err.response.status === 401) reject("Invalid token.");
								else reject(`${err}`);
							});
					}
				} else
					reject("The types of the URL or Method property must be string.");
			} else reject("you need the URL and the request method.");
		});
	}

	//---------------- club ------------------

	findClub(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://clubhub.xboxlive.com:443/clubs/search/decoration/detail?count=30&q=${xuid}&tags=&titles=`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject(`${err}`);
				});
		});
	}

	getClub(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://clubhub.xboxlive.com:443/clubs/ids(${xuid})/decoration/ClubPresence,Roster,Settings`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 2,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	//------------------ chat ------------------

	getChatInbox() {
		return new Promise((resolve, reject) => {
			const opts = {
				url:
					"https://xblmessaging.xboxlive.com:443/network/xbox/users/me/inbox/Secondary",
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getChatAuth(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://chat.xboxlive.com:443/users/xuid(${xuid})/chat/auth`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	sendChatMessage(message, xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/conversations/users/xuid(${xuid})`,
				method: "POST",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
				data: {
					parts: [
						{
							contentType: "text",
							version: 0,
							text: message,
						},
					],
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getChatMessage(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/conversations/users/xuid(${xuid})?maxItems=100`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	//------------------ People ------------------

	getPeopleProfile(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://profile.xboxlive.com:443/users/batch/profile/settings`,
				method: "POST",
				headers: {
					"x-xbl-contract-version": 2,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
				data: {
					settings: [
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
						"RealName",
					],
					userIds: [xuid],
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getPeopleSettings(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://xblmessaging.xboxlive.com:443/network/xbox/users/xuid(${xuid})/safetySettings`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 2,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getPeopleSumary(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://social.xboxlive.com:443/users/xuid(${xuid})/summary`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 2,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getPeople(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://peoplehub.xboxlive.com:443/users/me/people/xuids(${xuid})/decoration/detail,preferredColor,presenceDetail,multiplayerSummary`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getPeopleAchivement(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titleHistory/decoration/GamePass,Achievement,Stats`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 2,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					//
					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	findPeopleByGamertag(gamertag) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://peoplehub.xboxlive.com:443/users/me/people/search/decoration/detail,preferredColor?q=${gamertag}&maxItems=15`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getPeopleActivity(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://avty.xboxlive.com:443/users/xuid(${xuid})/activity/history?excludeTypes=Played&numItems=50`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getPeopleScreenshot(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://avty.xboxlive.com:443/users/xuid(${xuid})/activity/history/unshared?activityTypes=Screenshot&numItems=100uid`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 2,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(async res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getPeopleGames(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titlehistory/decoration/achievement,image,scid`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 2,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	// ------------------ me ------------------

	getSettings() {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://privacy.xboxlive.com:443/users/me/privacy/settings`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getProfile() {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://accounts.xboxlive.com:443/users/current/profile`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 3,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getFriends() {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://peoplehub.xboxlive.com:443/users/me/people/social/decoration/detail,preferredColor,presenceDetail,multiplayerSummary`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getFamily(xuid) {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://accounts.xboxlive.com:443/family/memberXuid(${xuid})`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getReports() {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://editorial.xboxlive.com:443/Site/XboxLiveFeeds/Content/safety/reportingReasons/reportingReasons`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getFollwers() {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://peoplehub.xboxlive.com:443/users/me/people/followers`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getGroups() {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/groups`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 2,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}

	getGamesTilesId() {
		return new Promise((resolve, reject) => {
			const opts = {
				url: `https://usertitles.xboxlive.com:443/users/me/titles`,
				method: "GET",
				headers: {
					"x-xbl-contract-version": 4,

					accept: "application/json",
					authorization: this._token,
					"accept-language": "en-US",

					Connection: "Keep-Alive",
					"Accept-Encoding": "gzip",
					"User-Agent": "okhttp/4.9.1",
				},
			};

			axios(opts)
				.then(res => {
					resolve(res.data);
				})
				.catch(err => {
					if (err.response.status === 401) reject("Invalid token.");
					else reject("Unknown error.");
				});
		});
	}
}

module.exports = Account;
