import foodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req,res)=>{

    const { name, description, price, category } = req.body;
    let image = `${req.file.filename}`;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image
    })

    try {
        await food.save();
        res.json({success:true, message:"Food has been Added"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}

//  all food list

const listFood = async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});
    }
}

//remove food item

const removeFood = async (req,res)=>{
    const {id} = req.body;
    try {
        const food = await foodModel.findById(id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(id);
        res.json({success:true,message:"Food Removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"});
    }
}


export {addFood , listFood,removeFood}
