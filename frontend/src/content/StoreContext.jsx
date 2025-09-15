/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const StoreContext = createContext(null)

const StoreContextProvider = (props)=>{

    const [cartItem,setCartItem]=useState({});
    const Localurl = "http://localhost:7777";
    // For Vite, use import.meta.env; for Create React App, use process.env
        const url =
            (import.meta.env && import.meta.env.VITE_LIVE === "production")
                ? import.meta.env.VITE_BACKEND_API_URL
                : import.meta.env.VITE_API_URL;
    const [token,setToken]= useState("");
    const [food_list,setFood_list] = useState([]);





    const addToCart= async(itemId)=>{
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post((url+"/api/cart/add"),{itemId},{headers:{token}})
        }
    }

    const removeToCart = async(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post((url+"/api/cart/remove"),{itemId},{headers:{token}})
        }
    }



    const getcartTotalAmount =()=>{
        let totalAmt= 0;
        for(const item in cartItem){
            if(cartItem[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item);
                totalAmt += itemInfo.price* cartItem[item]
            }
        }
        return totalAmt;
    }


    const fetchFoodList= async()=>{
        const response= await axios.get(url +"/api/food/list");
        setFood_list(response.data.data)
    }

    const loadCartData = async(token)=>{
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
        setCartItem(response.data.cartData);
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

    const contextValue ={
        food_list , cartItem,setCartItem , addToCart,removeToCart,getcartTotalAmount,url, token,setToken
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;