import { useContext } from "react";
import { assets } from "../../assets/assets";
import "./Navbar.css";
import {Link, useNavigate,useLocation} from 'react-router-dom'
import { StoreContext } from "../../content/StoreContext";
const Navbar = ({setShowLogin}) => {
  const {getcartTotalAmount,token,setToken}= useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }
  
  return (
    <div className="navbar">
      <Link to='/' ><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to="/" className={currentPath === "/" ? "active" : ""}>Home</Link>
        <a href="#explore-menu" className={currentPath === "/menu" ? "active" : ""}>Menu</a>
        <a href="#app-download" className={currentPath === "/mobile-app" ? "active" : ""}>Mobile App</a>
        <Link to="/contact" className={currentPath === "/contact" ? "active" : ""}>Contact Us</Link>
      </ul>
      <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <Link to="/cart" > <img src={assets.basket_icon} alt="" /></Link>
          <div className={getcartTotalAmount()===0?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
          :
            <div className="navbar-profile">
              <img src={assets.profile_icon} alt="" /> 
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>     
            </div>
        }
        
      </div>
    </div>
  );
};

export default Navbar;
