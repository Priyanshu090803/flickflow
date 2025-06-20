import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler= NextAuth(authOptions)    // wse docs mai is file m likhnah par ham authoptions m lake yha rakhre h 
export {handler as GET, handler as POST}