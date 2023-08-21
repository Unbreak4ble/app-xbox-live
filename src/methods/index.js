'use strict';

const axios = require('axios');
const { mount_url, mount_options } = require("./api_utils.js");
const {EMPTY_VALUE} = require("../errors.js");

function handle_request(resolve, reject, opts) {
	axios(opts)
	.then(res => {
		resolve(res.data);
	})
	.catch(err => {
		if (err.response.status === 401)
			reject('Authorization failed');
		else
			reject(err);
	}).catch(reject);
}

function validate_values(...args) {
	for (let arg of args) {
		if(arg == void 0){
			return false;
		}
	}
	return true
}

class Account {
	#_token;
	constructor(Token) {
		this.#_token = Token;
	}

	tokenSet = () => !!this.#_token;

	//---------------- Custom ------------------

	request = options => new Promise((resolve, reject) => {
			if(!validate_values(options))
				reject(EMPTY_VALUE);
			options["headers"]["authorization"] = this.#_token;
			handle_request(resolve, reject, opts);
	});

	//---------------- club ------------------

	club = {
		find: xuid => new Promise((resolve, reject) => {
			if(!validate_values(xuid))
				reject(EMPTY_VALUE);
			const url = mount_url.CLUB_FIND(xuid);
			const opts = mount_options(url, "GET", 4, this.#_token);
			handle_request(resolve, reject, opts);
		}),
		get: xuid => {
			return new Promise((resolve, reject) => {
				if(!validate_values(xuid))
					reject(EMPTY_VALUE);
				const url = mount_url.CLUB_GET(xuid);
				const opts = mount_options(url, "GET", 2, this.#_token);
				handle_request(resolve, reject, opts);
			});
		},
		chat: {
			get: (xuid, amount) => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid, amount))
						reject(EMPTY_VALUE);

					const url = mount_url.CLUB_CHAT_GET(xuid, amount);
					const opts = mount_options(url, "GET", 2, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		feed: {
			get: (xuid, amount) => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid, amount))
						reject(EMPTY_VALUE);

					const url = mount_url.CLUB_FEED_GET(xuid, amount);
					const opts = mount_options(url, "GET", 13, this.#_token);
					handle_request(resolve, reject, opts);
				});
			},
			send: (xuid, message) => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid, message))
						reject(EMPTY_VALUE);

					const data = {
						postText: message,
						postType: 'Text',
						timelines: [
							{
								timelineOwner: xuid,
								timelineType: 'Club'
							}
						]
					};

					const url = mount_url.CLUB_FEED_SEND();
					const opts = mount_options(url, "POST", 2, this.#_token, data);
					handle_request(resolve, reject, opts);
				});
			}
		}
	};

	//------------------ chat ------------------

	chat = {
		inbox: {
			get: () => {
				return new Promise((resolve, reject) => {
					const url = mount_url.CHAT_INBOX_GET();
					const opts = mount_options(url, "GET", 4, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		auth: {
			get: xuid => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid))
						reject(EMPTY_VALUE);

					const url = mount_url.CHAT_AUTH_GET(xuid);
					const opts = mount_options(url, "GET", 4, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		message: {
			send: (xuid, message) => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid, message))
						reject(EMPTY_VALUE);

					const data = {
							parts: [
								{
									contentType: 'text',
									version: 0,
									text: message
								}
							]
					};

					const url = mount_url.CHAT_MESSAGE_SEND(xuid);
					const opts = mount_options(url, "POST", 4, this.#_token, data);
					handle_request(resolve, reject, opts);
				});
			},
			get: (xuid, amount) => {
				return new Promise((resolve, reject) => {
				if(!validate_values(xuid, amount))
					reject(EMPTY_VALUE);

				const url = mount_url.CHAT_MESSAGE_GET(xuid, amount);
				const opts = mount_options(url, "GET", 4, this.#_token);
				handle_request(resolve, reject, opts);
				});
			}
		}
	};

	//------------------ People ------------------

	people = {
		profile: {
			get: xuid => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid))
						reject(EMPTY_VALUE);

					const data = {
							settings: [
								'GameDisplayName',
								'AppDisplayName',
								'AppDisplayPicRaw',
								'Gamerscore',
								'Gamertag',
								'GameDisplayPicRaw',
								'AccountTier',
								'TenureLevel',
								'XboxOneRep',
								'PreferredColor',
								'Location',
								'Bio',
								'Watermarks',
								'RealName'
							],
							userIds: Array.isArray(xuid) ? xuid : [xuid]
					};

					const url = mount_url.PEOPLE_PROFILE_GET(xuid);
					const opts = mount_options(url, "GET", 2, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		setting: {
			get: xuid => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid))
						reject(EMPTY_VALUE);

					const url = mount_url.PEOPLE_SETTING_GET(xuid);
					const opts = mount_options(url, "GET", 2, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		summary: {
			get: xuid => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid))
						reject(EMPTY_VALUE);

					const url = mount_url.PEOPLE_SUMMARY_GET(xuid);
					const opts = mount_options(url, "GET", 2, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		get: xuid => {
			return new Promise((resolve, reject) => {
				if(!validate_values(xuid))
					reject(EMPTY_VALUE);

				const url = mount_url.PEOPLE_GET(xuid);
				const opts = mount_options(url, "GET", 4, this.#_token);
				handle_request(resolve, reject, opts);
			});
		},
		find: (gamertag, amount) => {
			return new Promise((resolve, reject) => {
				if(!validate_values(gamertag, amount))
					reject(EMPTY_VALUE);

				const url = mount_url.PEOPLE_FIND(gamertag, amount);
				const opts = mount_options(url, "GET", 4, this.#_token);
				handle_request(resolve, reject, opts);
			});
		},
		activity: {
			get: (xuid, amount) => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid, amount))
						reject(EMPTY_VALUE);

					const url = mount_url.PEOPLE_ACTIVITY_GET(xuid, amount);
					const opts = mount_options(url, "GET", 4, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		screenshot: {
			get: (xuid, amount) => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid, amount))
						reject(EMPTY_VALUE);

					const url = mount_url.PEOPLE_SCRENSHOT_GET(xuid, amount);
					const opts = mount_options(url, "GET", 2, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		games: {
			get: xuid => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid))
						reject(EMPTY_VALUE);

					const url = mount_url.PEOPLE_GAMES_GET(xuid);
					const opts = mount_options(url, "GET", 2, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		add: xuid => {
			return new Promise((resolve, reject) => {
				if(!validate_values(xuid))
					reject(EMPTY_VALUE);


				const data = {
					xuids: Array.isArray(xuid) ? xuid : [xuid]
				};

				const url = mount_url.PEOPLE_ADD();
				const opts = mount_options(url, "POST", 1, this.#_token, data);
				handle_request(resolve, reject, opts);
			});
		},
		remove: xuid => {
			return new Promise((resolve, reject) => {
				if(!validate_values(xuid))
					reject(EMPTY_VALUE);

				const data = {
					xuids: Array.isArray(xuid) ? xuid : [xuid]
				};

				const url = mount_url.PEOPLE_REMOVE();
				const opts = mount_options(url, "POST", 1, this.#_token, data);
				handle_request(resolve, reject, opts);
			});
		},
		presence: {
			get: xuid => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid))
						reject(EMPTY_VALUE);

					const data = {
						level: 'all',
						users: Array.isArray(xuid) ? xuid : [xuid]
					};

					const url = mount_url.PEOPLE_PRESENCE_GET();
					const opts = mount_options(url, "POST", 3, this.#_token, data);
					handle_request(resolve, reject, opts);
				});
			}
		},
		recommendation: {
			get: () => {
				return new Promise((resolve, reject) => {
					const url = mount_url.PEOPLE_RECOMMENDATION_GET();
					const opts = mount_options(url, "GET", 1, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		achievement: {
			titles: {
				complete: {
					get: xuid => {
						return new Promise((resolve, reject) => {
							if(!validate_values(xuid))
								reject(EMPTY_VALUE);

							const url = mount_url.PEOPLE_ACHIEVEMENT_TITLES_COMPLETE_GET();
							const opts = mount_options(url, "GET", 2, this.#_token);
							handle_request(resolve, reject, opts);
						});
					}
				},
				get: xuid => {
					return new Promise((resolve, reject) => {
						if(!validate_values(xuid))
							reject(EMPTY_VALUE);

						const url = mount_url.PEOPLE_ACHIEVEMENT_TITLES_GET(xuid);
						const opts = mount_options(url, "GET", 1, this.#_token);
						handle_request(resolve, reject, opts);
					});
				}
			},
			stats: {
				get: (xuid, titleId) => {
					return new Promise((resolve, reject) => {
						if(!validate_values(xuid, titleId))
							reject(EMPTY_VALUE);

						const data = {
							arrangebyfield: 'xuid',
							stats: [
								{
									name: 'MinutesPlayed',
									titleid: titleId
								}
							],
							xuids: Array.isArray(xuid) ? xuid : [xuid]
						};

						const url = mount_url.PEOPLE_ACHIEVEMENT_STATS_GET();
						const opts = mount_options(url, "POST", 2, this.#_token, data);
						handle_request(resolve, reject, opts);
					});
				}
			},
			all: {
				get: xuid => {
					return new Promise((resolve, reject) => {
						if(!validate_values(xuid))
							reject(EMPTY_VALUE);

						const url = mount_url.PEOPLE_ACHIEVEMENT_ALL_GET(xuid);
						const opts = mount_options(url, "GET", 2, this.#_token);
						handle_request(resolve, reject, opts);
					});
				}
			},
			get: (xuid, titleId, amount) => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid, titleId, amount))
						reject(EMPTY_VALUE);

					const url = mount_url.PEOPLE_ACHIEVEMENT_GET(xuid, titleId, amount);
					const opts = mount_options(url, "GET", 4, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		gameclip: {
			get: (xuid, amount) => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid, amount))
						reject(EMPTY_VALUE);

					const data = {
						categories: ['Gameclips']
					};

					const url = mount_url.PEOPLE_GAMECLIP_GET(xuid, amount);
					const opts = mount_options(url, "POST", 1, this.#_token, data);
					handle_request(resolve, reject, opts);
				});
			}
		},
		clubs: {
			get: xuid => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid))
						reject(EMPTY_VALUE);

					const url = mount_url.PEOPLE_CLUBS_GET(xuid);
					const opts = mount_options(url, "GET", 4, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		friends: {
			get: xuid => {
				return new Promise((resolve, reject) => {
					if(!validate_values(xuid))
						reject(EMPTY_VALUE);

					const url = mount_url.PEOPLE_FRIENDS_GET(xuid);
					const opts = mount_options(url, "GET", 1, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		}
	};

	//------------------ title ------------------
	title = {
		get: xuid => {
			return new Promise((resolve, reject) => {
				if(!validate_values(xuid))
					reject(EMPTY_VALUE);

				const data = {
					titleIds: Array.isArray(xuid) ? xuid : [xuid]
				};

				const url = mount_url.TITLE_GET();
				const opts = mount_options(url, "POST", 2, this.#_token, data);
				handle_request(resolve, reject, opts);
			});
		}
	};

	// ------------------ me ------------------

	me = {
		account: {
			privacy: {
				settings: {
					get: () => {
						return new Promise((resolve, reject) => {
							const url = mount_url.ME_ACCOUNT_PRIVACY_SETTING_GET();
							const opts = mount_options(url, "GET", 4, this.#_token);
							handle_request(resolve, reject, opts);
						});
					}
				}
			}
		},
		profile: {
			get: () => {
				return new Promise((resolve, reject) => {
					const url = mount_url.ME_PROFILE_GET();
					const opts = mount_options(url, "GET", 3, this.#_token);
					handle_request(resolve, reject, opts);
				});
			},
			friends: {
				get: () => {
					return new Promise((resolve, reject) => {
						const url = mount_url.ME_PROFILE_FRIENDS_GET();
						const opts = mount_options(url, "GET", 4, this.#_token);
						handle_request(resolve, reject, opts);
					});
				}
			},
			family: {
				get: xuid => {
					return new Promise((resolve, reject) => {
						if(!validate_values(xuid))
							reject(EMPTY_VALUE);

						const url = mount_url.ME_PROFILE_FAMILY_GET(xuid);
						const opts = mount_options(url, "GET", 4, this.#_token);
						handle_request(resolve, reject, opts);
					});
				}
			}
		},
		reports: {
			get: () => {
				return new Promise((resolve, reject) => {
					const url = mount_url.ME_REPORTS_GET();
					const opts = mount_options(url, "GET", 4, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		followers: {
			get: () => {
				return new Promise((resolve, reject) => {
					const url = mount_url.ME_FOLLOWERS_GET();
					const opts = mount_options(url, "GET", 4, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		groups: {
			get: () => {
				return new Promise((resolve, reject) => {
					const url = mount_url.ME_GROUPS_GET();
					const opts = mount_options(url, "GET", 2, this.#_token);
					handle_request(resolve, reject, opts);
				});
			}
		},
		games: {
			titlesId: {
				get: () => {
					return new Promise((resolve, reject) => {
						const url = mount_url.ME_GAMES_TITLEID_GET();
						const opts = mount_options(url, "GET", 4, this.#_token);
						handle_request(resolve, reject, opts);
					});
				}
			}
		}
	};
}

module.exports = Account;
