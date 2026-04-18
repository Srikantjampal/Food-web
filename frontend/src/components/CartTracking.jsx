import "../pages/Cart/Cart.css";
import { useContext } from "react";
import { StoreContext } from "../content/StoreContext";

const CartTracking = ({ onClose }) => {
  const { cartItem, food_list, url } = useContext(StoreContext);

  return (
    <div className="cart-tracking">
      <div className="track-head">
        <h3>Cart Tracking</h3>
        <button className="close-button" onClick={onClose}>
          X
        </button>
      </div>
      <div className="tracking-steps">
        <div className="tracking-step completed">Added to Cart</div>
        <div className="tracking-step">Proceed to Checkout</div>
        <div className="tracking-step">Ordered Successfully</div>
      </div>
      <ul>
        {food_list.map((item) => {
          if (cartItem[item._id] > 0) {
            return (
              <li key={item._id} className="cart-tracking-item">
                <img src={url + "/images/" + item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>Quantity: {cartItem[item._id]}</p>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default CartTracking;
