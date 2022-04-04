module.exports = {
  locales: ["ko", "en"],
  defaultLocale: "ko",
  pages: {
    "*": ["common"],
    "/": ["common"],
  },
  loadLocaleFrom: (locale, namespace) =>
    import(`./src/locales/${locale}/${namespace}`).then((m) => m.default),
};
