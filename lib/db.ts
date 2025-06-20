// db connection

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!

if(!MONGODB_URI){
    throw new Error('MongoDb URI is not correct!')
}

let cached = global.mongoose;
if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}

export async function connectToDatabase(){
    if(cached.conn){    // cached.conn agr nahi hoga to check krenge kahi promise mai to nahi h connection abhi
        return cached.conn
    } // agr promise m bhi nhi hua to , connection bnaenge
    if(!cached.promise){  // promise hi nahi h, to connection bhi nhi hoga , to yha pe connect krlenge
        mongoose.connect(MONGODB_URI)
        .then(()=>mongoose.connection)
    }
    // Promise ara h, agr promise mila to try, agr nahi mila to catch
    try {          // ye promise k ane ki state h
    cached.conn = await cached.promise  // yha pe promise k liye rukenge by await
    } // connection bna k bhi nahi mila to conn mai null dal do 
    catch (error) {
    cached.conn = null
    }
    return cached.conn
}