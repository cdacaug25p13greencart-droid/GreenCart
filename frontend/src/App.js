import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import ForgotPassword from "./pages/ForgotPassword";

import "./App.css";
import { FaShoppingCart } from "react-icons/fa";

function Layout() {
  const location = useLocation();

  // Hide navbar on admin & farmer dashboards
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/farmer");

  return (
    <>
      {!hideNavbar && (
        <nav className="navbar">
          {/* Left side */}
          <div className="nav-left">
            <FaShoppingCart className="cart-icon" />
            <span className="brand-name">GreenCart</span>
          </div>

          {/* Right side */}
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
      )}

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
