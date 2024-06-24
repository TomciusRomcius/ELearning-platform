import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { createUser, doesUserExist, signIn } from "../../../backend/controllers/userController";
import { navigate } from "@/utils/navigation";
import { randomUUID } from "crypto";

export interface CustomUser extends User {
  role: number;
  id: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const customUser = user as CustomUser;
        token.id = customUser.id;
        token.role = customUser.role;
      }
      return token;
    },

    signIn: async ({ user }) => {
      if (!user.email) throw new Error("No email provided!");
      const exists = await doesUserExist(user.email);
      console.log(exists);
      if (exists) {
        return true;
      }
      else {
        const id = await createUser(user.email, randomUUID());
        if (!id) 
          return false;
        else {
          user.id = id;
          return true;
        }
      } 
    },

    session: async ({ session, user, token }) => {
      // Send properties to the client, like an access_token and user id from a provider.
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session
    }
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "Email",
        },
        password: {
          label: "Password:",
          type: "text",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;
        const id = await signIn(email, password);
        if (id) {
          let user = { 
            email: email,
            password: password,
            id: id,
          }
          return user;
        }
        else return null;
      },
    })
  ],
}