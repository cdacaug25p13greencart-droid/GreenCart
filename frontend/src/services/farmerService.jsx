// src/services/farmerService.js
import api from "../api/api";

/*
------------------------------------
 REAL BACKEND (enable later)
------------------------------------

// export const addProduct = (data) => api.post("/farmer/products", data);
// export const getProducts = () => api.get("/farmer/products");
// export const deleteProduct = (id) => api.delete(`/farmer/products/${id}`);

// export const getCategories = () => api.get("/categories");
// export const getSubcategories = (categoryId) =>
//   api.get(`/categories/${categoryId}/subcategories`);

------------------------------------
 DUMMY DATA FOR FRONTEND TESTING
------------------------------------
*/

// -------- Categories --------
let categories = [
  { id: 1, name: "Vegetables" },
  { id: 2, name: "Fruits" }
];

// -------- Subcategories --------
let subcategories = [
  { id: 101, name: "Leafy", categoryId: 1 },
  { id: 102, name: "Root", categoryId: 1 },
  { id: 201, name: "Citrus", categoryId: 2 },
  { id: 202, name: "Tropical", categoryId: 2 }
];

// -------- Products --------
let products = [
  {
    id: 1,
    name: "Tomato",
    price: 30,
    quantity: 100,
    categoryId: 1,
    subcategoryId: 102
  },
  {
    id: 2,
    name: "Potato",
    price: 20,
    quantity: 200,
    categoryId: 1,
    subcategoryId: 102
  }
];

// -------- Orders --------
let orders = [
  { id: 101, buyerName: "Amit", productName: "Tomato", status: "PENDING" },
  { id: 102, buyerName: "Rohit", productName: "Potato", status: "PENDING" }
];

/* -----------------------------
   CATEGORY APIs (DUMMY)
------------------------------ */

export const getCategories = () =>
  Promise.resolve({ data: categories });

export const getSubcategories = (categoryId) =>
  Promise.resolve({
    data: subcategories.filter(
      sc => sc.categoryId === Number(categoryId)
    )
  });

/* -----------------------------
   PRODUCT APIs (DUMMY)
------------------------------ */

export const getProducts = () =>
  Promise.resolve({ data: products });

export const addProduct = (product) => {
  products.push({
    id: Date.now(),
    ...product
  });
  return Promise.resolve();
};

export const deleteProduct = (id) => {
  products = products.filter(p => p.id !== id);
  return Promise.resolve();
};

/* -----------------------------
   ORDER APIs (DUMMY)
------------------------------ */

export const getOrders = () =>
  Promise.resolve({ data: orders });

export const updateOrderStatus = (id, status) => {
  orders = orders.map(o =>
    o.id === id ? { ...o, status } : o
  );
  return Promise.resolve();
};
