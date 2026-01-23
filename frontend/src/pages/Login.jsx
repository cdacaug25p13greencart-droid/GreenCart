import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state (FULL STATE FOR DEBUG)
  const authState = useSelector((state) => state.auth);
  console.log("Redux Auth State:", authState);

  const { isAuthenticated, role, loading, error } = authState;

  const handleLogin = (e) => {
    e.preventDefault();
    setLocalError("");

    // Frontend validation
    if (!username || !password) {
      setLocalError("Please enter username and password");
      return;
    }

    if (username.length < 5 || username.length > 20) {
      setLocalError("Username must be between 5 and 20 characters");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      setLocalError("Password must be between 8 and 16 characters");
      return;
    }

    // Dispatch Redux async action
    dispatch(login({ username, password }));
  };

  // Redirect after successful login
  useEffect(() => {
    if (isAuthenticated && role) {
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
    }
  }, [isAuthenticated, role, navigate]);

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
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Local validation error */}
        {localError && (
          <p style={{ color: "orange", marginBottom: "10px", fontSize: "14px" }}>
            {localError}
          </p>
        )}

        {/* Backend / Redux error */}
        {error && (
          <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>
            {error === "ACCOUNT_NOT_VERIFIED"
              ? "Your account is not yet verified by admin. Please wait for approval."
              : error}
          </p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link to="/forgot-password" className="forgot-password-link">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
