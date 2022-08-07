module.exports = {
  locales: ["ko", "en", "es", "ja", "zh"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "marginals", "routes", "notify", "profileModal"],

    "/": ["landing"],

    "rgx:^/auth": ["auth"],

    "rgx:^/buy": ["goods", "buyPageProcess", "buyPageSuccess", "buyPageFail"],

    "/editor": ["editor"],

    "/uninstall": ["uninstall"],

    "rgx:^/video": ["create", "uploadSub", "videoRequest"],

    "rgx:^/user": ["publicProfile"],

    "rgx:^/user/my": ["privateProfile"],

    "/qna": ["qna"],

    "/info/terms": ["terms"],

    "/info/privacy": ["privacy"],

    "rgx:^/info/dmca": ["dmca"],

    "rgx:^/ranking": ["rankings"],
  },
};
