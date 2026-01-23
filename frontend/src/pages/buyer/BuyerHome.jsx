import { useNavigate } from "react-router-dom";
import "./BuyerHome.css";

function BuyerHome() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* ---------- Banner ---------- */}
      <section className="hero">
        <h1>Fresh Produce Directly From Farmers</h1>
        <p>
          Farm to home. Fair prices. Fresh food.
        </p>
        <button
          className="hero-btn"
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>
      </section>

      {/* ---------- Categories ---------- */}
      <section className="categories">
        <h2>Shop by Category</h2>

        <div className="category-grid">
          <div className="category-card">
            <h3>Vegetables</h3>
            <p>Fresh & organic vegetables</p>
          </div>

          <div className="category-card">
            <h3>Fruits</h3>
            <p>Seasonal & juicy fruits</p>
          </div>

          <div className="category-card">
            <h3>Grains</h3>
            <p>Healthy grains & cereals</p>
          </div>

          <div className="category-card">
            <h3>Dairy</h3>
            <p>Milk, curd & dairy products</p>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <h3>GreenCart</h3>
        <p>
          Connecting farmers directly with buyers for a better tomorrow.
        </p>
        <span>© 2026 GreenCart. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default BuyerHome;
