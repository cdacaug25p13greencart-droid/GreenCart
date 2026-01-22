import api from "../api/api";

export const registerUser = (data) => {
  return api.post("/seller/register", data);
};

export const getSecurityQuestions = () => {
  return api.get("/security/questions");
};

export const loginUser = (data) => {
  return api.post("/seller/login", data);
};
