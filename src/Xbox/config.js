const CLIENT_IDS = {
	MY_XBOX_LIVE: "0000000048093EE3",
	XBOX_APP: "000000004C12AE6F",
};

exports.default = {
	uris: {
		authorize: "https://login.live.com/oauth20_authorize.srf",
		userAuthenticate: "https://user.auth.xboxlive.com/user/authenticate",
		XSTSAuthorize: "https://xsts.auth.xboxlive.com/xsts/authorize",
	},
	queries: {
		userAgent:
			"XboxServicesAPI/2017.08.0.0 Chrome/89.0.4389.105 Mozilla Safari/537.36",
		authorize: {
			client_id: CLIENT_IDS.XBOX_APP,
			redirect_uri: "https://login.live.com/oauth20_desktop.srf",
			scope: "service::user.auth.xboxlive.com::MBI_SSL",
			display: "touch",
			response_type: "token",
			locale: "en",
		},
	},
	defaultRelyingParty: "http://xboxlive.com",
};
