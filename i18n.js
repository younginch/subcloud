module.exports = {
  locales: ["ko", "en", "es", "ja", "zh"],
  defaultLocale: "en",
  pages: {
    "*": [
      "common",
      "marginals",
      "routes",
      "notify",
      "profileModal",
      "badges",
      "advertisement",
    ],

    "/": ["landing", "create", "videoRequest"],

    "rgx:^/auth": ["auth"],

    "rgx:^/buy": ["goods", "buyPageProcess", "buyPageSuccess", "buyPageFail"],

    "/editor": ["editor"],

    "/uninstall": ["uninstall"],

    "rgx:^/video": ["create", "uploadSub", "videoRequest"],

    "rgx:^/user": ["publicProfile"],

    "rgx:^/user/my": ["privateProfile", "banks"],

    "/qna": ["qna"],

    "/info/terms": ["terms"],

    "/info/privacy": ["privacy"],

    "rgx:^/info/dmca": ["dmca"],

    "rgx:^/ranking": ["rankings"],

    "rgx:^/channel": ["channel", "rankings"],
  },
};
