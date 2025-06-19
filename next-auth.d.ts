import NextAuth from "next-auth"
import { DefaultSession } from "next-auth"  // next auth hme sessions deta h
declare module "next-auth" {
   
  interface Session {
    user: {
      id: string
    }&DefaultSession['user']
  }
}