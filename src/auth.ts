import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProfile from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";
import type { NextAuthOptions, User } from "next-auth";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Github credentiaals are not provided.");
}

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
//   throw new Error("Google credentiaals are not provided.");
// }

export const nextAuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in",
  },
  adapter: PrismaAdapter(db),
  providers: [
    // GoogleProfile({
    //   clientId: "",
    //   clientSecret: "",
    // }),
    GithubProvider({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }: { session: any; user: User }) {
      if (session && session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };

//TODO
// When you are not logged in, redirect every page to sign-in
