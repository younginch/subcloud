module.exports = {
  apps: [
    {
      name: "subcloud-strapi",
      cwd: "/home/ubuntu/subcloud-strapi",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        NEXTAUTH_URL: "https://test.subcloud.app",
        NEXTAUTH_SECRET: "WdHfDXg2yXnBZWczLp960YCyJ63jrwcDcutEQRsLjAw=",
        DATABASE_URL:
          "postgresql://sub:dlalsrbditmaktmxj@subcloud-prod.c66c7hkpmaeq.ap-northeast-2.rds.amazonaws.com/prod",
        CHROME_EXTENSION_ID: "jekpacppociidhmfenohpnajdmjdddel",
        S3_ACCESS_KEY_ID: "AKIAYG6VFG2RQ4CV2NFO",
        S3_SECRET_ACCESS_KEY: "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",
        GITHUB_ID: "1b47f3c7bec692352e38",
        GITHUB_SECRET: "c9d1534485070f49482e96170ce1984170c852b0",
        GOOGLE_ID:
          "418361484087-0d7m5mvpu12pa0tl1t0p1n3ntn5ueadm.apps.googleusercontent.com",
        GOOGLE_SECRET: "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",
        FACEBOOK_ID: "524516109290489",
        FACEBOOK_SECRET: "71e4d7dc5eea3c95c2376cb88c0741f2",
      },
    },
  ],
};
