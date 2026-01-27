import axios from "axios";

const API_URL = "http://localhost:8083/api/admin";

const adminService = {
    getFarmers: async () => {
        const response = await axios.get(`${API_URL}/farmers`);
        return response.data;
    },

    getBuyers: async () => {
        const response = await axios.get(`${API_URL}/buyers`);
        return response.data;
    },

    approveFarmer: async (id) => {
        const response = await axios.post(`${API_URL}/farmers/${id}/approve`);
        return response.data;
    },

    suspendUser: async (id) => {
        const response = await axios.post(`${API_URL}/users/${id}/suspend`);
        return response.data;
    },

    getProducts: async () => {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    },

    toggleStockVisibility: async (id) => {
        const response = await axios.post(`${API_URL}/products/stock/${id}/toggle-visibility`);
        return response.data;
    },

    deleteStockItem: async (id) => {
        await axios.delete(`${API_URL}/products/stock/${id}`);
    },

    getOrders: async () => {
        const response = await axios.get(`${API_URL}/orders`);
        return response.data;
    },

    // --- Category Management ---
    getCategories: async () => {
        const response = await axios.get(`${API_URL}/categories`);
        return response.data;
    },
    saveCategory: async (category) => {
        const response = await axios.post(`${API_URL}/categories`, category);
        return response.data;
    },
    deleteCategory: async (id) => {
        await axios.delete(`${API_URL}/categories/${id}`);
    },

    // --- SubCategory Management ---
    getSubCategories: async () => {
        const response = await axios.get(`${API_URL}/subcategories`);
        return response.data;
    },
    saveSubCategory: async (subcategory) => {
        const response = await axios.post(`${API_URL}/subcategories`, subcategory);
        return response.data;
    },
    deleteSubCategory: async (id) => {
        await axios.delete(`${API_URL}/subcategories/${id}`);
    },
};

export default adminService;
