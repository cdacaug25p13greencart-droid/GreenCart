import { useState } from "react";
import { loginUser } from "../services/authService";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password!");
      return;
    }

    loginUser({ username, password })
      .then(res => alert("Welcome " + res.data.username))
      .catch(err => alert(err.response?.data?.message || "Login failed"));
  };

  const handleForgotPassword = () => {
    const emailOrUsername = prompt("Enter your username or email to reset password:");
    if (emailOrUsername) {
     
      alert(`Password reset link sent to ${emailOrUsername}`);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
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

        
        <p className="forgot-password" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
      </form>
    </div>
  );
}
