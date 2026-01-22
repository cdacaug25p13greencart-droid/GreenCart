// import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:8080/api",
// });

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

export default api;
