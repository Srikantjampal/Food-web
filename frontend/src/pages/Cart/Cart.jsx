import { useContext, useState } from "react";
import "./Cart.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../content/StoreContext";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react";
import CartTracking from "../../components/CartTracking";

const Cart = ({ visible, setShowHamburger }) => {
  const {
    cartItem,
    food_list,
    removeToCart,
    getcartTotalAmount,
    addToCart,
    url,
    removeAllItemFromCartById,
    validatePromoCode,
    discount,
    discountPercentage,
    getCalculatedTotalAmount,
    clearAllItemFromCart,
  } = useContext(StoreContext);

  const [promoCode, setPromoCode] = useState("");
  const navigate = useNavigate();

  return (
    <div className="cart">
      {!visible && (
        <CartTracking onClose={() => setShowHamburger(!visible)} />
      )}
      <div className="clearout">
        <button
          className="clear-cart-button"
          onClick={() => {
            if (getcartTotalAmount() !== 0) {
              const confirmClear = window.confirm(
                "Are you sure you want to clear all items from the cart?"
              );
              if (confirmClear) {
                clearAllItemFromCart();
              }
            } else {
              alert("Your Cart is already empty");
            }
          }}
        >
          <Trash />
        </button>
      </div>
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
                <div className="cart-items-title cart-items-item">
                  <img src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <div className="quantity-section d-flex ">
                    <img
                      className="btn remove"
                      onClick={() => removeToCart(item._id)}
                      src={assets.remove_icon_red}
                      alt=""
                    />
                    <p>{cartItem[item._id]}</p>
                    <img
                      className="btn "
                      onClick={() => addToCart(item._id)}
                      src={assets.add_icon_white}
                      alt=""
                    />
                  </div>
                  <p>₹{item.price * cartItem[item._id]}</p>
                  <p
                    onClick={() => removeAllItemFromCartById(item._id)}
                    className="cross"
                  >
                    <Trash />
                  </p>
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
            {discount > 0 && (
              <>
                <div className="cart-total-details">
                  <p>Discount</p>
                  <p>
                    -₹{discount} ({discountPercentage})
                  </p>
                </div>
                <hr />
              </>
            )}
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{getcartTotalAmount() !== 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ₹
                {getCalculatedTotalAmount() !== 0
                  ? getCalculatedTotalAmount()
                  : 0}
              </b>
            </div>
          </div>

          <button
            onClick={() => {
              if (getcartTotalAmount() != 0) {
                navigate("/orders");
              } else {
                alert("Your Cart is Empty");
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <input
                type="text"
                placeholder="promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button onClick={() => validatePromoCode(promoCode)}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
