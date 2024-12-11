import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authConfig } from "@/app/(auth)/auth.config";
import { compare } from "bcrypt-ts";
import { getUser } from "@/lib/db/queries/usersquery";



const handler = NextAuth({
  ...authConfig,
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

        const passwordsMatch = await compare(credentials.password, user.password!);
        if (!passwordsMatch) {
          throw new Error("Incorrect password.");
        }

        return {
          email: user.email,
          name: user.username,
        }; 
      },
    }),
  ],
});

export { handler as GET, handler as POST };
