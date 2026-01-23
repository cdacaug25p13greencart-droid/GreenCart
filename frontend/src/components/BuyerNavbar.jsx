import { NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./BuyerNavbar.css";

function BuyerNavbar() {
  const navigate = useNavigate();

  return (
    <nav className="buyer-navbar">
      {/* Left */}
      <div className="nav-left" onClick={() => navigate("/")}>
        <FaShoppingCart className="cart-icon" />
        <span className="brand-name">GreenCart</span>
      </div>

      {/* Center */}
      <div className="nav-center">
        <button
          className="browse-btn"
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>
      </div>

      {/* Right */}
      <div className="nav-right">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Login
        </NavLink>

        <NavLink
          to="/register"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Register
        </NavLink>
      </div>
    </nav>
  );
}

export default BuyerNavbar;
