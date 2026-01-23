import { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus
} from "../../services/farmerService";

function FarmerOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    getOrders().then(res => setOrders(res.data));
  };

  const updateStatus = (id, status) => {
    updateOrderStatus(id, status).then(loadOrders);
  };

  return (
    <div>
      <h2>🧾 Buyer Orders</h2>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Buyer</th>
            <th>Product</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.buyerName}</td>
              <td>{o.productName}</td>
              <td>{o.status}</td>
              <td>
                <button onClick={() => updateStatus(o.id, "APPROVED")}>
                  Approve
                </button>
                <button onClick={() => updateStatus(o.id, "REJECTED")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmerOrders;
