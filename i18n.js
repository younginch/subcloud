module.exports = {
  locales: ["ko", "en", "es", "ja"],
  defaultLocale: "en",
  pages: {
    "*": ["common", "marginals", "routes"],

    "/": ["landing"],

    "/auth": ["auth"],

    "rgx:^/buy": ["goods", "buyPageProcess", "buyPageSuccess", "buyPageFail"],

    "/editor": ["editor"],

    "/uninstall": ["uninstall"],

    "rgx:^/video": ["create", "uploadSub", "videoRequest"],

    "rgx:^/user": ["publicProfile"],

    "rgx:^/user/my": ["privateProfile"],

    "/qna": ["qna"],

    "/info/terms": ["terms"],

    "rgx:^/ranking": ["rankings"],
  },
};
