import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password!");
      return;
    }

    loginUser({ username, password })
      .then(res => {
        alert("Welcome " + res.data.username);
        // Navigate based on role or default dashboard
        navigate("/");
      })
      .catch(err => alert(err.response?.data?.message || "Login failed"));
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

        <button type="submit">Login</button>

        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
