import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";


export async function POST(request:NextRequest){
    try {
    const {email,password} = await request.json()     // next.js use krre hai , edge m hota h to, user ka data await mai aega
    if(!email){
       return NextResponse.json(
        {error:"Email is not present!"},
        {status:404}
    )
    }
    if(!password){
       return NextResponse.json(
        {error:"Password is not present!"},
        {status:404}
    )
}
    await connectToDatabase()
    const existingUser = await User.findOne(
        email
    )
    if(existingUser){
        return NextResponse.json(
            {error:'User exists already'},
            {status:404}
        )
    }
    const user = await User.create(
        email,
        password
    )
    return NextResponse.json(
        {message:'User registered sucessfully'},
        {status:200}
    )
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            {error:"Failed to register user"},
            {status:404}
        )
    }
}


