import consume from "@/app/core/consumer";
import { queryConsumer, userQueries } from "@/app/core/queries";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import secret from "../../../secret";

export const authOptions = {
  secret: secret.JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "email", type: "text" },
        passwd: { label: "passwd", type: "password" }
      },
      async authorize(credentials, req) {
        const { email, passwd } = credentials;

        let res = await consume(queryConsumer.apiUser, userQueries.loginUser, { email: email, passwd: passwd });

        if (res.msg == "Login Successful") {
          delete res.msg;
          return res;
        } else return null
      }
    })
  ],

  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    }
  },

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/login"
  }
}

export default NextAuth(authOptions)