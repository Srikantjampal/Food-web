import { useContext } from "react";
import "./Cart.css";
import { assets } from '../../assets/assets';
import { StoreContext } from "../../content/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItem, food_list, removeToCart,getcartTotalAmount,addToCart,url } = useContext(StoreContext);
  const navigate = useNavigate();
  console.log(cartItem);
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <div key={index}>
                <div  className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  {/* here try adding the quantity increment and decrement  */}
                  <div className="quantity-section">
                    <img className="btn remove" onClick={()=>removeToCart(item._id)} src={assets.remove_icon_red} alt="" />
                      <p>{cartItem[item._id]}</p>
                    <img className='btn ' onClick={()=>addToCart(item._id)} src={assets.add_icon_white} alt=''/>                        
                  </div>
                  <p>₹{item.price * cartItem[item._id]}</p>
                  <p onClick={()=>removeToCart(item._id)} className="cross">x</p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getcartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getcartTotalAmount()!=0?2:0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getcartTotalAmount()!=0?getcartTotalAmount()+2:0}</b>
            </div>
          </div>
          
          <button 
            onClick={
              ()=>{ if(getcartTotalAmount()!=0){
                navigate('/orders')
                }else{
                  alert("Your Cart is Empty");
                }
              }} >PROCEED TO CHECKOUT</button> 
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
