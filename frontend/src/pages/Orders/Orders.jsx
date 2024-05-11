import { useContext, useState } from 'react'
import './Order.css'
import { StoreContext } from '../../content/StoreContext'

const Orders = () => {

  const{getcartTotalAmount,token,food_list,cartItems,url}= useContext(StoreContext);

  const [data , setData]= useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:'',
    state:'',
    zipcode:"",
    country:"",
    phone:''
  })

  const onChangeHandler =(event)=>{
    const name= event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder= async(event)=>{
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id.lenght]>0){
        let itemInfo= item;
        itemInfo["quantity"]= cartItems[item._id];
        orderItems.push(itemInfo)
        }
      })
      console.log(orderItems);
  }

  return (
    <form onSubmit={placeOrder} className='place-order'> 
      <div className='place-order-left'>
        <div className="title">
          <div className="multi-fields">
            <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First name' />
            <input name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last name' />
          </div>
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address' />
            <input name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
          <div className="multi-fields">
            <input name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
          </div>
          <div className="multi-fields">
            <input name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
            <input name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
          </div>
          <input name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
        </div>
      </div>
      <div className="place-order-right">
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
          {/* below code try using Link to redirect or navigate */}
          <button type='submit'>PROCEED TO PAYMENT</button> 
        </div>
      </div>
    </form>
    
  )
}

export default Orders