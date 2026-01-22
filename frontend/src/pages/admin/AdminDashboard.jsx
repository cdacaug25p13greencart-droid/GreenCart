import { useState } from "react";
import ManageAccounts from "./ManageAccounts";
import ProductsList from "./ProductsList";
import OrdersList from "./OrdersList";

function AdminDashboard() {
  const [section, setSection] = useState("accounts");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#2e7d32", color: "#fff", padding: "20px" }}>
        <h2>Admin Panel</h2>
        <p onClick={() => setSection("accounts")} style={{ cursor: "pointer" }}>Manage Accounts</p>
        <p onClick={() => setSection("products")} style={{ cursor: "pointer" }}>Products</p>
        <p onClick={() => setSection("orders")} style={{ cursor: "pointer" }}>Orders</p>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {section === "accounts" && <ManageAccounts />}
        {section === "products" && <ProductsList />}
        {section === "orders" && <OrdersList />}
      </div>

    </div>
  );
}

export default AdminDashboard;
