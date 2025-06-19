import mongoose, { Schema,model,models } from "mongoose";
import bcrypt from "bcryptjs";


export interface iUser{
    email:string;
    password:string;
    id?:mongoose.Types.ObjectId 
    createdAt?: Date;
    updatedAt?:Date
}

const UserSchema = new Schema<iUser>(
    {
        email:{
            type:String,
            required:true,
            unique:true,
           
        },
        password:{
            type:String,
            required:true,
            minlength:6,
            maxlength:40,
        }
    },{
        timestamps:true
    }
)

UserSchema.pre('save',async function(next){
    if(this.isModified(this.password))
    {
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

const User = models?.User || model<iUser>("User",UserSchema)  // next.js edge mai chlta hai, agr model hai to pehla use kro wrna dusre
export default User 