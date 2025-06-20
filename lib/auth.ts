import { NextAuthOptions } from "next-auth"
  import CredentialsProvider from "next-auth/providers/credentials"
import { connectToDatabase } from "./db"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export const authOptions:NextAuthOptions ={      
providers: [
  CredentialsProvider({ 
     name: 'Credentials',  // optional,.. strategy name
     credentials:{
        email:{ label: "email", type: "text"},
        password:{ label: "password", type: "password"}
     },
      async authorize(credentials, req) {
        if(!credentials?.email || !credentials?.password){
            throw new Error("Email or password is missing or wrong!")
        }
        try {
           await connectToDatabase()
           const user = await User.findOne({email:credentials.email})
           if(!user){
            throw new Error("No user found!")
           }
          const isValid= await bcrypt.compare(credentials.password,user.password)
          if(!isValid){
            throw new Error("Password is not valid!")
           }
           return{
             id: user._id.toString(),   //
             email:user.email
            }
        } catch (error) {
            console.error('Auth error')
            throw error
        }
      }
  })
],

callbacks:{
   async jwt({ token, user}) {
    if(user){
      token.id= user.id;
    }
      return token;
  },
    async session({ session, token }) {
      if(token){
        session.user.id= token.id as string
      }
      return session
    },
},
pages:{
  signIn:'/login',
  error:'/login'
},
session:{
  strategy:'jwt',
  maxAge:30 * 24 * 60 * 60
},
secret: process.env.NEXTAUTH_SECRET
}