import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions, User } from "next-auth";
import { createUser, getUserByEmail, signIn } from "../../../backend/controllers/userController";
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

    signIn: async ({ profile, user }) => {
      if (profile) {
        const loggedUser = await getUserByEmail(profile.email);
  
        if (loggedUser?._id) {
          user.id = loggedUser._id.toString();
          user.role = loggedUser.role;
          return true;
        }
  
        else {
          const dbUser = await createUser(user.email, randomUUID());
          console.log(dbUser?._id.toString());
          if (!dbUser?._id.toString()) 
            return false;
          else {
            user.id = dbUser._id.toString();
            user.role = dbUser.role;
            return true;
          }
        } 
      }
      return true;
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
        const user = await signIn(email, password);
        if (user?._id.toString()) {
          const jwtUser = { 
            email: email,
            password: password,
            id: user._id.toString(),
            role: user.role,
          }
          return jwtUser;
        }
        else return null;
      },
    })
  ],
}