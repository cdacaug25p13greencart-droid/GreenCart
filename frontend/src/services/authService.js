import api from "../api/api";

export const registerUser = (data) => {
  return api.post("/user/register", data);
};

export const getSecurityQuestions = () => {
  return api.get("/security/questions");
};

export const loginUser = (data) => {
  return api.post("/user/login", data);
};

export const verifySecurityAnswer = (data) => {
  return api.post("/user/forgot-password/verify", data);
};

export const resetPassword = (data) => {
  return api.post("/user/forgot-password/reset", data);
};

// Fetch security question for a specific user (forgot password)
export const getUserSecurityQuestion = (email) => {
  return api.get("/user/forgot-password/question", {
    params: { email }
  });
};

// ✅ FIXED: use api instead of axios
export const getCities = () => {
  return api.get("/location/cities");
};

export const getAreasByCity = (cityId) => {
  return api.get(`/location/areas/${cityId}`);
};
