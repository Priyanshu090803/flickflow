import { model, models, Schema } from "mongoose";
import mongoose  from "mongoose";


export const VIDEO_DIMENSIONS={
    width:1080,
    height:1920
}as const
export interface iVideo{
    _id?: mongoose.Types.ObjectId;
    videoUrl:string;
    title:string;
    description:string;
    thumbnailUrl:string;
    controls?:boolean;
    transformation?:{
        height:number;
        width:number;
        quality?:number
    }
}
const videoSchema = new Schema<iVideo>({
    videoUrl:{
        type:String,
        required:true
    },
    title:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    description:{
        type:String,
        minlength:5,
        maxlength:50,
        required:true
    },
    thumbnailUrl:{
        type:String,
        required:true
    },
    controls:{
        default:true
    },
    transformation:{
        height:{type:Number,default:VIDEO_DIMENSIONS.height},
        width:{type:Number,default:VIDEO_DIMENSIONS.width},
        quality:{type:Number,min:1,max:100}
    }
},{timestamps:true})


const Video = models?.Video || model<iVideo>('Video',videoSchema)

export default Video