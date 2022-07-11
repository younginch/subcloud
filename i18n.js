module.exports = {
  locales: ["ko", "en"],
  defaultLocale: "en",
  pages: {
    "*": [
      "common",
      "routes",
      "menu",
      "privateProfile",
      "publicProfile",
      "qna",
      "rankings",
    ],
    "/": ["common"],
  },
};
