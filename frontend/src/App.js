import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/loginReg/Login";
import Register from "./pages/loginReg/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";
import ForgotPassword from "./pages/loginReg/ForgotPassword";

import "./App.css";
import { FaShoppingCart } from "react-icons/fa";

/* 🔒 Protected Route Component */
function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

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

        {/* 🔒 Protected Admin Route */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 🔒 Protected Farmer Route */}
        <Route
          path="/farmer"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

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
