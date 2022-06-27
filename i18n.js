module.exports = {
  locales: ["ko", "en"],
  defaultLocale: "ko",
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
