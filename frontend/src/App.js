// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserFromStorage } from "./redux/authSlice";

// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   NavLink,
//   useLocation,
//   Navigate
// } from "react-router-dom";
// import { useSelector } from "react-redux";

// import Login from "./pages/loginReg/Login";
// import Register from "./pages/loginReg/Register";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import FarmerDashboard from "./pages/farmer/FarmerDashboard";
// import ForgotPassword from "./pages/loginReg/ForgotPassword";

// import "./App.css";
// import { FaShoppingCart } from "react-icons/fa";

// /* 🔒 Protected Route Component */
// function ProtectedRoute({ children, allowedRole }) {
//   const { isAuthenticated, role } = useSelector((state) => state.auth);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRole && role !== allowedRole) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// function Layout() {
//   const location = useLocation();

//   // Hide navbar on admin & farmer dashboards
//   const hideNavbar =
//     location.pathname.startsWith("/admin") ||
//     location.pathname.startsWith("/farmer");

//   return (
//     <>
//       {!hideNavbar && (
//         <nav className="navbar">
//           {/* Left side */}
//           <div className="nav-left">
//             <FaShoppingCart className="cart-icon" />
//             <span className="brand-name">GreenCart</span>
//           </div>

//           {/* Right side */}
//           <div className="nav-right">
//             <NavLink
//               to="/login"
//               className={({ isActive }) =>
//                 isActive ? "nav-link active" : "nav-link"
//               }
//             >
//               Login
//             </NavLink>

//             <NavLink
//               to="/register"
//               className={({ isActive }) =>
//                 isActive ? "nav-link active" : "nav-link"
//               }
//             >
//               Register
//             </NavLink>
//           </div>
//         </nav>
//       )}

//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/register" element={<Register />} />

//         {/* 🔒 Protected Admin Route */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRole="ADMIN">
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* 🔒 Protected Farmer Route */}
//         <Route
//           path="/farmer"
//           element={
//             <ProtectedRoute allowedRole="FARMER">
//               <FarmerDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="*" element={<Login />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     try {
//       const user = localStorage.getItem("user");
//       if (user) {
//         dispatch(setUserFromStorage(JSON.parse(user)));
//       }
//     } catch (e) {
//       console.warn("localStorage not accessible");
//     }
//   }, [dispatch]);

//   return (
//     <Router>
//       <Layout />
//     </Router>
//   );
// }


// export default App;


import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserFromStorage, logout } from "./redux/authSlice";
import { store } from "./redux/store";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  Navigate
} from "react-router-dom";

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
          <div className="nav-left">
            <FaShoppingCart className="cart-icon" />
            <span className="brand-name">GreenCart</span>
          </div>

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

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

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
  const dispatch = useDispatch();

  // ⚠️ Cannot hydrate from storage due to SES restrictions
  useEffect(() => {
    console.warn("⚠️ SES (Secure ECMAScript) is blocking browser storage access");
    console.warn("⚠️ User authentication will NOT persist across page refreshes");
    console.log("ℹ️ To fix this, disable SES in your project or use a backend session token");
  }, [dispatch]);

  // 🔒 Check token expiration every 5 seconds (for testing 30s expiration)
  useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      const state = store.getState();
      if (state.auth.tokenExpiry && Date.now() > state.auth.tokenExpiry) {
        console.warn('⏰ Token expired, logging out...');
        dispatch(logout());
      }
    }, 5000); // Check every 5 seconds for testing

    return () => clearInterval(checkTokenExpiration);
  }, [dispatch]);

  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
