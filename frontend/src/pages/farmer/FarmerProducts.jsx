import { useEffect, useState } from "react";
import {
  addProduct,
  getProducts,
  deleteProduct
} from "../../services/farmerService";

function FarmerProducts() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    getProducts().then(res => setProducts(res.data));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addProduct({ name, price, quantity }).then(() => {
      setName("");
      setPrice("");
      setQuantity("");
      loadProducts();
    });
  };

  return (
    <div>
      <h2>📦 My Products</h2>

      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input placeholder="Quantity" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <button>Add Product</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.quantity}</td>
              <td>
                <button onClick={() => deleteProduct(p.id).then(loadProducts)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FarmerProducts;
