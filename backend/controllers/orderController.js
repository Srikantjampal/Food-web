import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend 

const placeorder = async(req,res)=>{

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await UserModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_item = req.body.items.map((i)=>({
            price_data:{
                currency:"INR",
                product_data:{
                    name:i.name
                },
                unit_amount:i.price*100*80
            },
            quantity:i.quantity
        }))

        line_item.push({
            price_data:{
                currency:"INR",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        });

        const session = await stripe.checkout.sessions.create({
            line_items:line_item,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
    }
}


// try this using webhooks to verify the orders

const verifyOrder = async(req,res)=>{
    const {orderId, success}= req.body;
    try {
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}


// orders to display at frontend

const userOrder =async(req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:true,message:error});
    }
}


// displaying orders into admin panel

const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}

// upadting order status

const UpdateStatus= async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
    }
}

export {placeorder,verifyOrder,userOrder,listOrders,UpdateStatus};