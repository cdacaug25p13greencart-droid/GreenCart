import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart, updateCartItemSuccess, removeCartItemSuccess, clearCartSuccess, setLoading } from "../../redux/cartSlice";
import { getCart, updateCartItem, removeCartItem, clearCart, placeOrder } from "../../api/buyerApi";
import "./Cart.css";

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { items, totalAmount, itemCount, loading } = useSelector((state) => state.cart);
    const [notification, setNotification] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("COD");

    useEffect(() => {
        if (user?.userId) {
            fetchCart();
        }
    }, []);

    const fetchCart = async () => {
        try {
            dispatch(setLoading(true));
            const cartData = await getCart(user.userId);
            dispatch(setCart(cartData));
        } catch (err) {
            showNotification("Failed to load cart", "error");
        }
    };

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity <= 0) return;

        try {
            const updatedItem = await updateCartItem(cartItemId, newQuantity);
            dispatch(updateCartItemSuccess(updatedItem));
            showNotification("Quantity updated", "success");
        } catch (err) {
            showNotification(err.response?.data?.error || "Failed to update quantity", "error");
        }
    };

    const handleRemoveItem = async (cartItemId) => {
        try {
            await removeCartItem(cartItemId);
            dispatch(removeCartItemSuccess(cartItemId));
            showNotification("Item removed from cart", "success");
        } catch (err) {
            showNotification("Failed to remove item", "error");
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm("Are you sure you want to clear your cart?")) return;

        try {
            await clearCart(user.userId);
            dispatch(clearCartSuccess());
            showNotification("Cart cleared", "success");
        } catch (err) {
            showNotification("Failed to clear cart", "error");
        }
    };

    const handlePlaceOrder = async () => {
        if (items.length === 0) {
            showNotification("Your cart is empty", "error");
            return;
        }

        if (!window.confirm(`Place order with ${paymentMethod} payment?`)) return;

        try {
            dispatch(setLoading(true));
            const order = await placeOrder(user.userId, paymentMethod);
            dispatch(clearCartSuccess());
            showNotification(`Order placed successfully! Bill Number: ${order.payment.billNumber}`, "success");
            setTimeout(() => navigate(`/buyer/orders/${order.orderId}`), 2000);
        } catch (err) {
            showNotification(err.response?.data?.error || "Failed to place order", "error");
        }
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="cart-page">
            {/* Notification */}
            {notification && (
                <div className={`notification ${notification.type}`}>
                    {notification.message}
                </div>
            )}

            {/* Header */}
            <header className="cart-header">
                <div className="header-content">
                    <button onClick={() => navigate("/buyer/home")} className="back-btn">
                        ← Back to Shopping
                    </button>
                    <h1>🛒 My Cart</h1>
                    <div className="cart-count">{itemCount} {itemCount === 1 ? 'item' : 'items'}</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="cart-main">
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading cart...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="empty-cart">
                        <span className="empty-icon">🛒</span>
                        <h2>Your cart is empty</h2>
                        <p>Add some fresh products to get started!</p>
                        <button onClick={() => navigate("/buyer/home")} className="shop-now-btn">
                            Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="cart-content">
                        <div className="cart-items">
                            {items.map((item) => (
                                <div key={item.cartItemId} className="cart-item">
                                    <div className="item-image">
                                        {item.imagePath ? (
                                            <img src={item.imagePath} alt={item.productName} />
                                        ) : (
                                            <div className="image-placeholder">
                                                <span>🌾</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="item-details">
                                        <h3>{item.productName}</h3>
                                        <div className="item-category">
                                            <span className="category">{item.categoryName}</span>
                                            {item.subCategoryName && (
                                                <span className="subcategory">{item.subCategoryName}</span>
                                            )}
                                        </div>
                                        <div className="item-price">
                                            ₹{item.unitPrice.toFixed(2)} per kg
                                        </div>
                                    </div>

                                    <div className="item-quantity">
                                        <label>Quantity (kg)</label>
                                        <div className="quantity-controls">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity - 0.5)}
                                                disabled={item.quantity <= 0.5}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => handleUpdateQuantity(item.cartItemId, parseFloat(e.target.value))}
                                                min="0.5"
                                                step="0.5"
                                            />
                                            <button
                                                onClick={() => handleUpdateQuantity(item.cartItemId, item.quantity + 0.5)}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <div className="item-total">
                                        <span className="total-label">Total</span>
                                        <span className="total-price">₹{item.totalPrice.toFixed(2)}</span>
                                    </div>

                                    <button
                                        className="remove-btn"
                                        onClick={() => handleRemoveItem(item.cartItemId)}
                                    >
                                        🗑️
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Items ({itemCount})</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total Amount</span>
                                <span>₹{totalAmount.toFixed(2)}</span>
                            </div>

                            <div className="payment-method">
                                <label>Payment Method</label>
                                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="COD">Cash on Delivery (COD)</option>
                                    <option value="UPI">UPI</option>
                                    <option value="CARD">Card</option>
                                    <option value="NET_BANKING">Net Banking</option>
                                </select>
                            </div>

                            <button className="checkout-btn" onClick={handlePlaceOrder}>
                                Place Order
                            </button>
                            <button className="clear-cart-btn" onClick={handleClearCart}>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

export default Cart;
