import { useState } from "react";
import "./BrowseProducts.css";

function BrowseProducts() {
  // Hardcoded filter data
  const cities = ["Pune", "Mumbai", "Nashik"];
  const categories = {
    Vegetables: ["Tomato", "Potato", "Onion"],
    Fruits: ["Apple", "Banana", "Orange"],
    Grains: ["Wheat", "Rice", "Jowar"],
    Dairy: ["Milk", "Curd", "Paneer"]
  };

  // Filters state
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [search, setSearch] = useState("");

  // Dummy products
  const products = [
    { id: 1, name: "Tomato", category: "Vegetables", city: "Pune", price: 30 },
    { id: 2, name: "Potato", category: "Vegetables", city: "Nashik", price: 25 },
    { id: 3, name: "Apple", category: "Fruits", city: "Mumbai", price: 120 },
    { id: 4, name: "Milk", category: "Dairy", city: "Pune", price: 50 }
  ];

  const filteredProducts = products.filter(p => {
    return (
      (!city || p.city === city) &&
      (!category || p.category === category) &&
      (!subcategory || p.name === subcategory) &&
      (!search || p.name.toLowerCase().includes(search.toLowerCase()))
    );
  });

  // 🔄 Reset filters
  const handleReset = () => {
    setCity("");
    setCategory("");
    setSubcategory("");
    setSearch("");
  };

  return (
    <div className="browse-container">
      {/* ---------- Filters ---------- */}
      <aside className="filters">
        <h3>Filters</h3>

        <select value={city} onChange={e => setCity(e.target.value)}>
          <option value="">Select City</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={category}
          onChange={e => {
            setCategory(e.target.value);
            setSubcategory("");
          }}
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <select
          value={subcategory}
          onChange={e => setSubcategory(e.target.value)}
          disabled={!category}
        >
          <option value="">Select Subcategory</option>
          {category &&
            categories[category].map(sc => (
              <option key={sc} value={sc}>{sc}</option>
            ))}
        </select>

        <input
          type="text"
          placeholder="Search product"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        {/* Reset Button */}
        <button className="reset-btn" onClick={handleReset}>
          Reset Filters
        </button>
      </aside>

      {/* ---------- Products ---------- */}
      <main className="products">
        <h2>Products</h2>

        {filteredProducts.length === 0 && (
          <p className="empty">No products found</p>
        )}

        <div className="product-grid">
          {filteredProducts.map(p => (
            <div className="product-card" key={p.id}>
              <div className="img-placeholder">Image</div>
              <h4>{p.name}</h4>
              <p className="price">₹ {p.price}</p>
              <button className="add-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default BrowseProducts;
