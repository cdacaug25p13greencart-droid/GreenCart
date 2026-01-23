// import { useEffect, useState } from "react";
// import {
//   addProduct,
//   getProducts,
// <<<<<<< HEAD
//   deleteProduct
// } from "../../services/farmerService";

// function FarmerProducts() {
//   const [products, setProducts] = useState([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");

//   useEffect(() => {
//     loadProducts();
// =======
//   deleteProduct,
//   getCategories,
//   getSubcategories
// } from "../../services/farmerService";
// import "./FarmerProducts.css";

// function FarmerProducts() {
//   const [products, setProducts] = useState([]);

//   // Product fields
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");

//   // Category fields
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [categoryId, setCategoryId] = useState("");
//   const [subcategoryId, setSubcategoryId] = useState("");

//   // Image fields
//   const [images, setImages] = useState([]);        // File[]
//   const [imageUrls, setImageUrls] = useState([]);  // Cloudinary URLs
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     loadProducts();
//     loadCategories();
// >>>>>>> omkar
//   }, []);

//   const loadProducts = () => {
//     getProducts().then(res => setProducts(res.data));
//   };

// <<<<<<< HEAD
//   const handleAdd = (e) => {
//     e.preventDefault();
//     addProduct({ name, price, quantity }).then(() => {
//       setName("");
//       setPrice("");
//       setQuantity("");
// =======
//   const loadCategories = () => {
//     getCategories().then(res => setCategories(res.data));
//   };

//   const handleCategoryChange = (e) => {
//     const id = e.target.value;
//     setCategoryId(id);
//     setSubcategoryId("");
//     setSubcategories([]);

//     if (id) {
//       getSubcategories(id).then(res =>
//         setSubcategories(res.data)
//       );
//     }
//   };

//   // 🔹 Helper: get subcategory name (used as product name)
//   const getSubcategoryName = (id) =>
//     subcategories.find(sc => sc.id === Number(id))?.name;

//   /* ----------------------------
//      Cloudinary – Multiple Upload
//   ----------------------------- */
//   const uploadImages = async () => {
//     if (!images.length) {
//       alert("Please select images");
//       return;
//     }

//     setUploading(true);
//     const uploaded = [];

//     for (const image of images) {
//       const formData = new FormData();
//       formData.append("file", image);
//       formData.append("upload_preset", "greencart_products");
//       formData.append("folder", "greencart/products");

//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dizsy3fze/image/upload",
//         {
//           method: "POST",
//           body: formData
//         }
//       );

//       const data = await res.json();
//       uploaded.push(data.secure_url);
//     }

//     setImageUrls(uploaded);
//     setUploading(false);
//   };

//   const handleAdd = async (e) => {
//     e.preventDefault();

//     if (!subcategoryId) {
//       alert("Please select subcategory");
//       return;
//     }

//     if (!imageUrls.length) {
//       alert("Upload product images first");
//       return;
//     }

//     const productData = {
//       name: getSubcategoryName(subcategoryId), // ✅ AUTO NAME
//       price,
//       quantity,
//       categoryId,
//       subcategoryId,
//       images: imageUrls.map(url => ({ imageUrl: url }))
//     };

//     addProduct(productData).then(() => {
//       setPrice("");
//       setQuantity("");
//       setCategoryId("");
//       setSubcategoryId("");
//       setSubcategories([]);
//       setImages([]);
//       setImageUrls([]);
// >>>>>>> omkar
//       loadProducts();
//     });
//   };

//   return (
// <<<<<<< HEAD
//     <div>
//       <h2>📦 My Products</h2>

//       <form onSubmit={handleAdd}>
//         <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
//         <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
//         <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
//         <button>Add Product</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Qty</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(p => (
//             <tr key={p.id}>
//               <td>{p.name}</td>
//               <td>{p.price}</td>
//               <td>{p.quantity}</td>
//               <td>
//                 <button onClick={() => deleteProduct(p.id).then(loadProducts)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
// =======
//     <div className="farmer-container">
//       <h2 className="page-title">My Products</h2>

//       {/* Add Product Card */}
//       <div className="card">
//         <h3>Add New Product</h3>


//         <form className="product-form" onSubmit={handleAdd}>

//           <div className="form-row">
//             <select value={categoryId} onChange={handleCategoryChange} required>
//               <option value="">Select Category</option>
//               {categories.map(c => (
//                 <option key={c.id} value={c.id}>{c.name}</option>
//               ))}
//             </select>

//             <select
//               value={subcategoryId}
//               onChange={e => setSubcategoryId(e.target.value)}
//               disabled={!subcategories.length}
//               required
//             >
//               <option value="">Select Subcategory</option>
//               {subcategories.map(sc => (
//                 <option key={sc.id} value={sc.id}>{sc.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Show auto product name */}
//           {subcategoryId && (
//             <div style={{ color: "#2e7d32", fontWeight: "bold" }}>
//               Product: {getSubcategoryName(subcategoryId)}
//             </div>
//           )}


//           <div className="form-row">
//             <input
//               placeholder="Price (₹)"
//               value={price}
//               onChange={e => setPrice(e.target.value)}
//               required
//             />
//             <input
//               placeholder="Quantity"
//               value={quantity}
//               onChange={e => setQuantity(e.target.value)}
//               required
//             />
//           </div>

          
//           <div className="form-row">
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={e => setImages([...e.target.files])}
//             />

//             <button
//               type="button"
//               className="btn secondary"
//               onClick={uploadImages}
//               disabled={uploading}
//             >
//               {uploading ? "Uploading..." : "Upload Images"}
//             </button>
//           </div>

//           {imageUrls.length > 0 && (
//             <div className="image-preview">
//               {imageUrls.map((url, i) => (
//                 <img key={i} src={url} alt="preview" />
//               ))}
//             </div>
//           )}

//           <button className="btn primary">Add Product</button>
//         </form>
//       </div>

//       {/* Product List */}
//       <div className="card">
//         <h3>My Product List</h3>

//         <table className="product-table">
//           <thead>
//             <tr>
//               <th>Image</th>
//               <th>Product</th>
//               <th>Price</th>
//               <th>Qty</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(p => (
//               <tr key={p.id}>
//                 <td>
//                   {p.images?.[0]?.imageUrl && (
//                     <img
//                       src={p.images[0].imageUrl}
//                       alt=""
//                       className="table-img"
//                     />
//                   )}
//                 </td>
//                 <td>{p.name}</td>
//                 <td>₹ {p.price}</td>
//                 <td>{p.quantity}</td>
//                 <td>
//                   <button
//                     className="btn danger"
//                     onClick={() => deleteProduct(p.id).then(loadProducts)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
// >>>>>>> omkar
//     </div>
//   );
// }

// export default FarmerProducts;


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

  // Product fields
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Category fields
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");

  // Image fields
  const [images, setImages] = useState([]);        // File[]
  const [imageUrls, setImageUrls] = useState([]);  // Cloudinary URLs
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
      getSubcategories(id).then(res =>
        setSubcategories(res.data)
      );
    }
  };

  // 🔹 Helper: get subcategory name (used as product name)
  const getSubcategoryName = (id) =>
    subcategories.find(sc => sc.id === Number(id))?.name;

  /* ----------------------------
     Cloudinary – Multiple Upload
  ----------------------------- */
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
      formData.append("folder", "greencart/products");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dizsy3fze/image/upload",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();
      uploaded.push(data.secure_url);
    }

    setImageUrls(uploaded);
    setUploading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!subcategoryId) {
      alert("Please select subcategory");
      return;
    }

    if (!imageUrls.length) {
      alert("Upload product images first");
      return;
    }

    const productData = {
      name: getSubcategoryName(subcategoryId), // ✅ AUTO NAME
      price,
      quantity,
      categoryId,
      subcategoryId,
      images: imageUrls.map(url => ({ imageUrl: url }))
    };

    addProduct(productData).then(() => {
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

      {/* Add Product Card */}
      <div className="card">
        <h3>Add New Product</h3>

        <form className="product-form" onSubmit={handleAdd}>

          <div className="form-row">
            <input
              placeholder="Price (₹)"
              value={price}
              onChange={e => setPrice(e.target.value)}
              required
            />
            <input
              placeholder="Quantity"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              required
            />
          </div>

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

          {/* Show auto product name */}
          {subcategoryId && (
            <div style={{ color: "#2e7d32", fontWeight: "bold" }}>
              Product: {getSubcategoryName(subcategoryId)}
            </div>
          )}

          <div className="form-row">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={e => setImages([...e.target.files])}
            />

            <button
              type="button"
              className="btn secondary"
              onClick={uploadImages}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Images"}
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

      {/* Product List */}
      <div className="card">
        <h3>My Product List</h3>

        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  {p.images?.[0]?.imageUrl && (
                    <img
                      src={p.images[0].imageUrl}
                      alt=""
                      className="table-img"
                    />
                  )}
                </td>
                <td>{p.name}</td>
                <td>₹ {p.price}</td>
                <td>{p.quantity}</td>
                <td>
                  <button
                    className="btn danger"
                    onClick={() => deleteProduct(p.id).then(loadProducts)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FarmerProducts;
