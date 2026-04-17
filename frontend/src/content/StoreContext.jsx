/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const Localurl = "http://localhost:7777";
  // For Vite, use import.meta.env; for Create React App, use process.env
  const url =
    import.meta.env && import.meta.env.VITE_LIVE === "production"
      ? import.meta.env.VITE_BACKEND_API_URL
      : import.meta.env.VITE_API_URL;
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const validatePromoCode = async (code) => {
    try {
      const res = await axios.post(`${url}/api/promoCode/validate`, {
        code,
        orderAmount: getcartTotalAmount(),
      });
      const data = res.data;
      if (data.success) {
        setDiscount(data.data.discount);
        setDiscountPercentage(data.data.discountPercentage);
        alert("Promo code applied successfully!");
      } else {
        alert(data.message || "Failed to apply promo code.");
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      alert("An error occurred while applying the promo code.");
    }
  };

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeToCart = async (itemId) => {
    if (cartItem[itemId] === 1) {
      const confirmRemove = window.confirm(
        "Quantity is already 1. Do you want to remove this item from the cart?"
      );
      if (confirmRemove) {
        const updatedCart = { ...cartItem };
        delete updatedCart[itemId];
        setCartItem(updatedCart);
        if (token) {
          await axios.post(
            url + "/api/cart/remove",
            { itemId },
            { headers: { token } }
          );
        }
      }
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
      if (token) {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      }
    }
  };

  const removeAllFromCart = async (itemId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this item from the cart?"
    );
    if (confirmRemove) {
      const updatedCart = { ...cartItem };
      delete updatedCart[itemId];
      setCartItem(updatedCart);
      if (token) {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { token } }
        );
      }
    }
  };

  const getcartTotalAmount = () => {
    let totalAmt = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmt += itemInfo.price * cartItem[item];
      }
    }
    return totalAmt;
  };

  const getCalculatedTotalAmount = () => {
    let totalAmt = 0;
    let totalAmount = getcartTotalAmount();
    if (discountPercentage > 0) {
      totalAmt = totalAmount - (totalAmount * discountPercentage) / 100;
    } else {
      totalAmt = totalAmount - discount;
    }
    return totalAmt >= 0 ? totalAmt : 0;
  }
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFood_list(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItem(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);
  const contextValue = {
    food_list,
    cartItem,
    discount,
    discountPercentage,
    setCartItem,
    addToCart,
    removeToCart,
    removeAllFromCart,
    getcartTotalAmount,
    url,
    token,
    setToken,
    validatePromoCode,
    getCalculatedTotalAmount
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
