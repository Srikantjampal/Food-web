import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://Srijamp30:4eb426d8@cluster0.a8keswg.mongodb.net/Food-web').then(()=>console.log('DB is Connected'));
}