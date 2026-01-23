import { useEffect, useState } from "react";
import {
  addProduct,
  getProducts,
  deleteProduct,
  getCategories,
  getSubcategories
} from "../../services/farmerService";
import "./FarmerProducts.css";

function FarmerProducts() {
  const [products, setProducts] = useState([]);

  // Category
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  // Product fields
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Image
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = () => {
    getProducts().then(res => setProducts(res.data));
  };

  const loadCategories = () => {
    getCategories().then(res => setCategories(res.data));
  };

  const handleCategoryChange = (e) => {
    const id = e.target.value;
    setCategoryId(id);
    setSubcategoryId("");
    setSubcategories([]);

    if (id) {
      getSubcategories(id).then(res => setSubcategories(res.data));
    }
  };

  const getSubcategoryName = () =>
    subcategories.find(sc => sc.id === Number(subcategoryId))?.name || "";

  /* ---------------- Image Upload (Cloudinary) ---------------- */
  const uploadImages = async () => {
    if (!images.length) {
      alert("Please select images");
      return;
    }

    setUploading(true);
    const uploaded = [];

    for (const image of images) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "greencart_products");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dizsy3fze/image/upload",
        { method: "POST", body: formData }
      );

      const data = await res.json();
      uploaded.push(data.secure_url);
    }

    setImageUrls(uploaded);
    setUploading(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!subcategoryId) return alert("Select subcategory");
    if (!imageUrls.length) return alert("Upload product image");

    const payload = {
      name: getSubcategoryName(), // ✅ product name = subcategory
      price,
      quantity,
      categoryId,
      subcategoryId,
      images: imageUrls.map(url => ({ imageUrl: url }))
    };

    addProduct(payload).then(() => {
      setPrice("");
      setQuantity("");
      setCategoryId("");
      setSubcategoryId("");
      setSubcategories([]);
      setImages([]);
      setImageUrls([]);
      loadProducts();
    });
  };

  return (
    <div className="farmer-container">
      <h2 className="page-title">My Products</h2>

      {/* ---------- Add Product ---------- */}
      <div className="card">
        <h3>Add Product</h3>

        <form className="product-form" onSubmit={handleAdd}>
          <div className="form-row">
            <select value={categoryId} onChange={handleCategoryChange} required>
              <option value="">Select Category</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <select
              value={subcategoryId}
              onChange={e => setSubcategoryId(e.target.value)}
              disabled={!subcategories.length}
              required
            >
              <option value="">Select Subcategory</option>
              {subcategories.map(sc => (
                <option key={sc.id} value={sc.id}>{sc.name}</option>
              ))}
            </select>
          </div>

          {subcategoryId && (
            <div className="auto-name">
              Product Name: <span>{getSubcategoryName()}</span>
            </div>
          )}

          <div className="form-row">
            <input
              type="number"
              placeholder="Price (₹)"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <input
              type="file"
              accept="image/*"
              onChange={e => setImages([...e.target.files])}
            />

            <button
              type="button"
              className="btn secondary"
              onClick={uploadImages}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>

          {imageUrls.length > 0 && (
            <div className="image-preview">
              {imageUrls.map((url, i) => (
                <img key={i} src={url} alt="preview" />
              ))}
            </div>
          )}

          <button className="btn primary">Add Product</button>
        </form>
      </div>

      {/* ---------- Product List ---------- */}
      <div className="card">
        <h3>My Products</h3>

        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    <img
                      src={p.images?.[0]?.imageUrl}
                      alt=""
                      className="table-img"
                    />
                  </td>
                  <td>{p.name}</td>
                  <td>₹ {p.price}</td>
                  <td>{p.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FarmerProducts;
