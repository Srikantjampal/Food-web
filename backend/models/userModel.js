import mongoose, { mongo } from "mongoose";

const user_Schema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    cartData:{type:Object,default:{}},
},{minimize:false})

const UserModel = mongoose.model.user || mongoose.model("user",user_Schema);
export default UserModel;