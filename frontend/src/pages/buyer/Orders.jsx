import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders } from "../../api/buyerApi";
import "./Orders.css";

function Orders() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.userId) {
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const data = await getOrders(user.userId);
            setOrders(data);
        } catch (err) {
            setError("Failed to load orders");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "SUCCESS":
                return "status-success";
            case "PENDING":
                return "status-pending";
            case "FAILED":
                return "status-failed";
            default:
                return "status-pending";
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="orders-page">
            <header className="orders-header">
                <div className="header-content">
                    <button onClick={() => navigate("/buyer/home")} className="back-btn">
                        ← Back to Home
                    </button>
                    <h1>📦 My Orders</h1>
                    <div className="order-count">{orders.length} {orders.length === 1 ? 'order' : 'orders'}</div>
                </div>
            </header>

            <main className="orders-main">
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading orders...</p>
                    </div>
                ) : error ? (
                    <div className="error-message">
                        <span className="error-icon">⚠️</span>
                        <h2>{error}</h2>
                        <button onClick={fetchOrders} className="retry-btn">Try Again</button>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="empty-orders">
                        <span className="empty-icon">📦</span>
                        <h2>No orders yet</h2>
                        <p>Start shopping and place your first order!</p>
                        <button onClick={() => navigate("/buyer/home")} className="shop-now-btn">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="orders-list">
                        {orders.map((order) => (
                            <div
                                key={order.orderId}
                                className="order-card"
                                onClick={() => navigate(`/buyer/orders/${order.orderId}`)}
                            >
                                <div className="order-header">
                                    <div className="order-info">
                                        <h3>Order #{order.orderId}</h3>
                                        <p className="order-date">{formatDate(order.orderDate)}</p>
                                    </div>
                                    <span className={`status-badge ${getStatusBadgeClass(order.payment?.paymentStatus)}`}>
                                        {order.payment?.paymentStatus || "PENDING"}
                                    </span>
                                </div>

                                <div className="order-details">
                                    <div className="detail-row">
                                        <span className="label">Bill Number:</span>
                                        <span className="value">{order.payment?.billNumber}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Payment Method:</span>
                                        <span className="value">{order.payment?.paymentMethod}</span>
                                    </div>
                                    <div className="detail-row">
                                        <span className="label">Items:</span>
                                        <span className="value">{order.items?.length} items</span>
                                    </div>
                                </div>

                                <div className="order-footer">
                                    <div className="total-amount">
                                        <span className="label">Total Amount</span>
                                        <span className="amount">₹{order.totalAmount?.toFixed(2)}</span>
                                    </div>
                                    <button className="view-details-btn">
                                        View Details →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Orders;
