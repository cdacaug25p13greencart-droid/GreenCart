import api from "./api";

/**
 * Get all available products from Order Service
 * Endpoint: GET http://localhost:8083/api/products/available
 */
export const getAllAvailableProducts = async () => {
    try {
        const response = await api.get("http://localhost:8082/api/products/available");
        return response.data;
    } catch (error) {
        console.error("Error fetching available products:", error);
        throw error;
    }
};
