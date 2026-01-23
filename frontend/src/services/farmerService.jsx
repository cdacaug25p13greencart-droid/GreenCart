// src/services/farmerService.js
import api from "../api/api";

// export const addProduct = (data) => api.post("/farmer/products", data);
// export const getProducts = () => api.get("/farmer/products");
// export const deleteProduct = (id) => api.delete(`/farmer/products/${id}`);

// export const getOrders = () => api.get("/farmer/orders");
// export const updateOrderStatus = (orderId, status) =>
//   api.put(`/farmer/orders/${orderId}`, { status });


//-----DUMMY FOR FRONTEND TESTING
let products = [
  { id: 1, name: "Tomato", price: 30, quantity: 100 },
  { id: 2, name: "Potato", price: 20, quantity: 200 }
];

let orders = [
  { id: 101, buyerName: "Amit", productName: "Tomato", status: "PENDING" },
  { id: 102, buyerName: "Rohit", productName: "Potato", status: "PENDING" }
];

export const getProducts = () =>
  Promise.resolve({ data: products });

export const addProduct = (product) => {
  products.push({ id: Date.now(), ...product });
  return Promise.resolve();
};

export const deleteProduct = (id) => {
  products = products.filter(p => p.id !== id);
  return Promise.resolve();
};

export const getOrders = () =>
  Promise.resolve({ data: orders });

export const updateOrderStatus = (id, status) => {
  orders = orders.map(o =>
    o.id === id ? { ...o, status } : o
  );
  return Promise.resolve();
};
