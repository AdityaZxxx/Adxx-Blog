import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

import { getServerSession, NextAuthOptions, Session } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./connect";

// Deklarasi tipe untuk authOptions
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_ID as string,
        clientSecret: process.env.FACEBOOK_SECRET as string,
      }),
  ],
};

// Deklarasi tipe return untuk getAuthSession
export const getAuthSession = (): Promise<Session | null> => getServerSession(authOptions);
