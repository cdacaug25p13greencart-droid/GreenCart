 import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";
import { getAllAvailableProducts } from "../../api/buyerApi";
import "./BuyerHome.css";

function BuyerHome() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await getAllAvailableProducts();
            setProducts(data);
            setError(null);
        } catch (err) {
            setError("Failed to load products. Please try again later.");
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login", { replace: true });
    };

    // Get unique categories
    const categories = ["All", ...new Set(products.map(p => p.categoryName).filter(Boolean))];

    // Filter products
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.categoryName === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="buyer-home">
            {/* Header */}
            <header className="buyer-header">
                <div className="header-content">
                    <div className="brand">
                        <span className="brand-icon">🌱</span>
                        <h1>GreenCart</h1>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        🚪 Logout
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="buyer-main">
                <div className="welcome-section">
                    <h2>Welcome to GreenCart Marketplace</h2>
                    <p>Fresh farm products delivered to your doorstep</p>
                </div>

                {/* Search and Filter */}
                <div className="controls">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="category-filter">
                        {categories.map(category => (
                            <button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="loading">
                        <div className="spinner"></div>
                        <p>Loading fresh products...</p>
                    </div>
                ) : error ? (
                    <div className="error">
                        <span className="error-icon">⚠️</span>
                        <p>{error}</p>
                        <button onClick={fetchProducts} className="retry-btn">Try Again</button>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="no-products">
                        <span className="empty-icon">📦</span>
                        <p>No products found</p>
                    </div>
                ) : (
                    <div className="products-grid">
                        {filteredProducts.map(product => (
                            <div key={product.stockId} className="product-card">
                                <div className="product-image">
                                    {product.imagePath ? (
                                        <img
                                            src={product.imagePath}
                                            alt={product.productName}
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'flex';
                                            }}
                                        />
                                    ) : null}
                                    <div className="image-placeholder" style={{ display: product.imagePath ? 'none' : 'flex' }}>
                                        <span className="placeholder-icon">🌾</span>
                                    </div>
                                </div>

                                <div className="product-info">
                                    <h3 className="product-name">{product.productName}</h3>

                                    <div className="product-category">
                                        <span className="category-badge">{product.categoryName}</span>
                                        <span className="subcategory-text">{product.subCategoryName}</span>
                                    </div>

                                    {product.description && (
                                        <p className="product-description">{product.description}</p>
                                    )}

                                    <div className="product-details">
                                        <div className="price-section">
                                            <span className="price-label">Price</span>
                                            <span className="price">₹{product.price.toFixed(2)}</span>
                                            <span className="price-unit">per kg</span>
                                        </div>

                                        <div className="stock-section">
                                            <span className="stock-label">Available</span>
                                            <span className="stock-quantity">{product.quantity} kg</span>
                                        </div>
                                    </div>

                                    <button className="add-to-cart-btn">
                                        🛒 Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="buyer-footer">
                <p>© 2026 GreenCart - Fresh from Farm to Table</p>
            </footer>
        </div>
    );
}

export default BuyerHome;
