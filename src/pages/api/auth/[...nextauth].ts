import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import KakaoProvider from "next-auth/providers/kakao";
import GitHubProvider from "next-auth/providers/github";
import { JWT } from "next-auth/jwt";
import prisma from "../../../utils/prisma";

const providers = [
  CredentialsProvider({
    name: "email-password",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "test@test.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      const email = credentials?.email;
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        if (credentials?.password !== user?.password) {
          throw new Error("아이디 혹은 패스워드가 틀립니다.");
        }
        return user;
      } else {
        return null;
      }
    },
  }),
  EmailProvider({
    server: {
      host: "email-smtp.ap-northeast-2.amazonaws.com",
      port: 587,
      auth: {
        user: "AKIAYG6VFG2R33NRRLFP",
        pass: "BDFuwxG7EZGO/NtrRQuIkdyEOpucqjAgXI0f99lWExmS",
      },
    },
    from: "account@younginch.com",
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_ID!,
    clientSecret: process.env.GOOGLE_SECRET!,
  }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_ID!,
    clientSecret: process.env.FACEBOOK_SECRET!,
  }),
  KakaoProvider({
    clientId: process.env.KAKAO_ID!,
    clientSecret: process.env.KAKAO_SECRET!,
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
];

type SessionParams = {
  session: Session;
  user: User;
  token: JWT;
};

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    verifyRequest: "/auth/verify-request",
  },
  providers,
  callbacks: {
    async session({ session, user }: SessionParams) {
      session.user.id = user.id;
      session.user.role = user.role;
      session.user.point = user.point as number;
      return Promise.resolve(session);
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      else {
        return `${baseUrl}/auth/callback?open=${encodeURIComponent(url)}`;
      }
    },
  },
});
