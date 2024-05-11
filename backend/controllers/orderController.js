import orderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placing user order from frontend 

const placeorder = async(req,res)=>{

    const frontend_url = "http://localhost:7777"

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
            priceData:{
                currency:"INR",
                productData:{
                    name:item.name
                },
                unitAmount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_item.push({
            priceData:{
                currency:"INR",
                productData:{
                    name:"Delivery Charges"
                },
                unitAmount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_item,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error})
    }
}

export {placeorder}