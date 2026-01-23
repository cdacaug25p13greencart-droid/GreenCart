import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");   // ✅ added
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleLogin = (e) => {
    // console.log("login");

    e.preventDefault();
    setError(""); // clear previous error

    if (!username || !password) {
      setError("Please enter username and password");
      return;
    }

    if (username.length < 5 || username.length > 20) {
      setError("Username must be between 5 and 20 characters");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      setError("Password must be between 8 and 16 characters");
      return;
    }

   loginUser({ username, password })
  .then(res => {
    const role = res.data.role;

    if (!role) {
      setError("Role not received from server");
      return;
    }

    dispatch(loginSuccess({
      username: res.data.username,
      role
    }));

    switch (role) {
      case "ADMIN":
        navigate("/admin");
        break;
      case "FARMER":
        navigate("/farmer");
        break;
      case "BUYER":
        navigate("/buyer/home");
        break;
      default:
        navigate("/");
    }
  })
  .catch(err => {
    const message = err.response?.data;

    if (message === "ACCOUNT_NOT_VERIFIED") {
      alert("Your account is not yet verified by admin. Please wait for approval.");
    } else {
      setError(message || "Login failed");
    }
  });


  };


  return (
    <div className="login-container">
      <h2>Login</h2>
      <br />


      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && (
          <p style={{ color: "orange", marginBottom: "10px", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <button type="submit">Login</button>

        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
