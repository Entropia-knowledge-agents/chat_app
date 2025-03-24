import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import { getUser } from "@/lib/db/queries/usersquery";
import clientPromise from "@/lib/db/mongodb";



export const authConfig: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required.");
        }

        const user = await getUser(credentials.email);
        if (!user) {
          throw new Error("No user found with the provided email.");
        }

        const passwordsMatch = await compare(credentials.password, user.password);
        if (!passwordsMatch) {
          throw new Error("Incorrect password.");
        }

        const client = await clientPromise;
        const db = client.db("bid");
        const logs = db.collection("logs");
        await logs.insertOne({
          email: credentials.email,
          action: "login",
          date: new Date(),
        });

        return {
          id: user.id,
          email: user.email,
          name: user.username,
        }; 
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.email) {
        session.user.email = token.email;
      }
      return session;
    },
  },
};
