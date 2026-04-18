import "./Hamburger.css";

const Hamburger = ({ visible , setShowHamburger}) => {
  if (!visible) return null;

  return (
    <div className="hamburger" onClick={()=> setShowHamburger(!visible  )}>
      <div className="hamburger-line"></div>
      <div className="hamburger-line"></div>
      <div className="hamburger-line"></div>
    </div>
  );
};

export default Hamburger;