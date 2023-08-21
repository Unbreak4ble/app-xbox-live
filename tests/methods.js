const { throwError } = require("../src/errors.js");

const TEST_ARGS = {
	PEOPLE_FIND: ["diego", 1]
};

/* some methods */
function get_tests(account){
	return {
		"PEOPLE_FIND": account.people.find(TEST_ARGS.PEOPLE_FIND[0], TEST_ARGS.PEOPLE_FIND[1]),
		"PEOPLE_RECOMMENDATION_GET": account.people.recommendation.get(),
		"CHAT_INBOX_GET": account.chat.inbox.get(),
		"ME_ACCOUNT_PRIVACY_SETTING_GET": account.me.account.privacy.settings.get(),
		"ME_PROFILE_GET": account.me.profile.get(),
		"ME_PROFILE_FRIENDS_GET": account.me.profile.friends.get(),
		"ME_REPORTS_GET": account.me.reports.get(),
		"ME_FOLLOWERS_GET": account.me.followers.get(),
		"ME_GROUPS_GET": account.me.groups.get(),
		"ME_GAMES_TITLESID_GET": account.me.games.titlesId.get(),
	};
}

function test(account) {
	let promises = [];
	const TESTS = get_tests(account);
	for(const key in TESTS){
		const promise = TESTS[key];
		promises.push([promise, key]);
	}
	run(promises);
}

function run(promises){
	(async() => {
		let working=0;
		for (const promise of promises) {
			try {
				const result = await promise[0];
				console.log("[passed] " +promise[1]);
				++working;
			}catch(err){
				console.log("[failed] " +promise[1]);
				console.log("- response: " + JSON.stringify(err.response.data))
			}
		}
		console.log(`${working}/${promises.length} methods working`);
	})();
}

module.exports = test;
