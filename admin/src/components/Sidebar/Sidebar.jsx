import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './SIdebar.css'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Order Items</p>
            </NavLink>
            <NavLink to='/promo-codes' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Promo Code</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar