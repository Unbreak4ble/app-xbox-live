'use strict';

const URL = {
			CLUB_FIND: (xuid) => `https://clubhub.xboxlive.com:443/clubs/search/decoration/detail?count=30&q=${xuid}&tags=&titles=`,
			CLUB_GET: (xuid) => `https://clubhub.xboxlive.com:443/clubs/ids(${xuid})/decoration/ClubPresence,Roster,Settings`,
			CLUB_CHAT: (xuid, amount) => `https://chatfd.xboxlive.com:443/channels/Club/${xuid}/messages/history?maxItems=${amount}`,
			CLUB_FEED_GET: (xuid, amount) => `https://avty.xboxlive.com:443/clubs/clubId(${xuid})/activity/feed?numItems=${amount}`,
			CLUB_FEED_SEND: () => `https://userposts.xboxlive.com:443/users/me/posts`,
			CHAT_INBOX_GET: () => `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/inbox/Secondary`,
			CHAT_AUTH_GET: (xuid) => `https://chat.xboxlive.com:443/users/xuid(${xuid})/chat/auth`,
			CHAT_MESSAGE_SEND: (xuid) => `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/conversations/users/xuid(${xuid})`,
			CHAT_MESSAGE_GET: (xuid, amount) => `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/conversations/users/xuid(${xuid})?maxItems=${amount}`,
			PEOPLE_PROFILE_GET: () => `https://profile.xboxlive.com:443/users/batch/profile/settings`,
			PEOPLE_SETTING_GET: (xuid) => `https://xblmessaging.xboxlive.com:443/network/xbox/users/xuid(${xuid})/safetySettings`,
			PEOPLE_SUMMARY_GET: (xuid) => `https://social.xboxlive.com:443/users/xuid(${xuid})/summary`,
			PEOPLE_GET: (xuid) => `https://peoplehub.xboxlive.com:443/users/me/people/xuids(${xuid})/decoration/detail,preferredColor,presenceDetail,multiplayerSummary`,
			PEOPLE_FIND: (gamertag, amount) => `https://peoplehub.xboxlive.com:443/users/me/people/search/decoration/detail,preferredColor?q=${gamertag}&maxItems=${amount}`,
			PEOPLE_ACTIVITY_GET: (xuid, amount) => `https://avty.xboxlive.com:443/users/xuid(${xuid})/activity/history?excludeTypes=Played&numItems=${amount}`,
			PEOPLE_SCREENSHOT_GET: (xuid, amount) => `https://avty.xboxlive.com:443/users/xuid(${xuid})/activity/history/unshared?activityTypes=Screenshot&numItems=${amount}uid`,
			PEOPLE_GAMES_GET: (xuid) => `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titlehistory/decoration/achievement,image,scid`,
			PEOPLE_ADD: () => `https://social.xboxlive.com:443/users/me/people/xuids?method=add`,
			PEOPLE_REMOVE: () => `https://social.xboxlive.com:443/users/me/people/xuids?method=remove`,
			PEOPLE_PRESENCE_GET: () => `https://userpresence.xboxlive.com:443/users/batch?level=all`,
			PEOPLE_RECOMMENDATION_GET: () => `https://peoplehub.xboxlive.com:443/users/me/people/recommendations`,
			PEOPLE_ACHIEVEMENT_TITLES_COMPLETE_GET: (xuid) => `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titlehistory/decoration/achievement,image,scid`,
			PEOPLE_ACHIEVEMENT_TITLES_GET: (xuid) => `https://usertitles.xboxlive.com:443/users/xuid(${xuid})/titles`,
			PEOPLE_ACHIEVEMENT_STATS_GET: () => `https://userstats.xboxlive.com:443/batch`,
			PEOPLE_ACHIEVEMENT_ALL_GET: (xuid) => `https://titlehub.xboxlive.com:443/users/xuid(${xuid})/titles/titleHistory/decoration/GamePass,Achievement,Stats`,
			PEOPLE_ACHIEVEMENT_GET: (xuid, titleId, amount) => `https://achievements.xboxlive.com:443/users/xuid(${xuid})/achievements?titleId=${titleId}&maxItems=${amount}`,
			PEOPLE_GAMECLIP_GET: (xuid, amount) => `https://activityhub.xboxlive.com:443/hot/users/xuid(${xuid})?maxItems=${amount}`,
			PEOPLE_CLUBS_GET: (xuid) => `https://clubhub.xboxlive.com:443/clubs/xuid(${xuid})/decoration/detail,settings`,
			PEOPLE_FRIENDS_GET: (xuid) => `https://peoplehub.xboxlive.com:443/users/xuid(${xuid})/people/social/decoration/multiplayersummary,preferredcolor`,
			TITLE_GET: (xuid) => `https://titlehub.xboxlive.com:443/titles/batch/decoration/detail,image,achievement,scid`,
			ME_ACCOUNT_PRIVACY_SETTING_GET: () => `https://privacy.xboxlive.com:443/users/me/privacy/settings`,
			ME_PROFILE_GET: () => `https://accounts.xboxlive.com:443/users/current/profile`,
			ME_PROFILE_FRIENDS_GET: () => `https://peoplehub.xboxlive.com:443/users/me/people/social/decoration/detail,preferredColor,presenceDetail,multiplayerSummary`,
			ME_PROFILE_FAMILY_GET: (xuid) => `https://accounts.xboxlive.com:443/family/memberXuid(${xuid})`,
			ME_REPORTS_GET: () => `https://editorial.xboxlive.com:443/Site/XboxLiveFeeds/Content/safety/reportingReasons/reportingReasons`,
			ME_FOLLOWERS_GET: () => `https://peoplehub.xboxlive.com:443/users/me/people/followers`,
			ME_GROUPS_GET: () => `https://xblmessaging.xboxlive.com:443/network/xbox/users/me/groups`,
			ME_GAMES_TITLEID_GET: () => `https://usertitles.xboxlive.com:443/users/me/titles`,
};

function mount_options(url=String, method="GET", version, token, data) {
	let opts = {
		url: url,
		method: method,
		headers: {
			accept: 'application/json',
			authorization: token,
			'accept-language': 'en-US',
			Connection: 'Keep-Alive',
			'Accept-Encoding': 'gzip',
			'User-Agent': 'okhttp/4.9.1'
		}
	};
	if(version != void 0)
		opts['headers']['x-xbl-contract-version'] = version;
	if(data != void 0)
		opts['data'] = data;
	return opts
}


module.exports = {
	mount_url: URL,
	mount_options
}
