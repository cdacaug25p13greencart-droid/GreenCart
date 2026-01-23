import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./pages/loginReg/Login";
import Register from "./pages/loginReg/Register";
import ForgotPassword from "./pages/loginReg/ForgotPassword";

import AdminDashboard from "./pages/admin/AdminDashboard";
import FarmerDashboard from "./pages/farmer/FarmerDashboard";

/* 🔹 Buyer Pages */
import BuyerHome from "./pages/buyer/BuyerHome";
import BrowseProducts from "./pages/buyer/BrowseProducts";
import BuyerNavbar from "./components/BuyerNavbar";

import "./App.css";

/* 🔒 Protected Route */
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

  /* ❌ Hide navbar on admin & farmer dashboards only */
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/farmer");

  return (
    <>
      {/* Buyer Navbar */}
      {!hideNavbar && <BuyerNavbar />}

      <Routes>
        {/* -------- Buyer Routes -------- */}
        <Route path="/" element={<BuyerHome />} />
        <Route path="/products" element={<BrowseProducts />} />

        {/* -------- Auth Routes -------- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* -------- Admin -------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* -------- Farmer -------- */}
        <Route
          path="/farmer"
          element={
            <ProtectedRoute allowedRole="FARMER">
              <FarmerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
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
