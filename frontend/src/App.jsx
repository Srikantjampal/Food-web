import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Orders from "./pages/Orders/Orders";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import Login from "./components/Login/Login";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import Contact from "./components/Contact";
import Hamburger from "./components/Hamburger";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showHamburger, setShowHamburger] = useState(true);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <>
                <Cart
                  visible={showHamburger}
                  setShowHamburger={setShowHamburger}
                />
                <Hamburger
                  visible={showHamburger}
                  setShowHamburger={setShowHamburger}
                />
              </>
            }
          />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
