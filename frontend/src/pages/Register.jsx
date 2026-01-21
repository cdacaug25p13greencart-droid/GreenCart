import { useState } from "react";
import { registerUser } from "../services/authService";
import "./Register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState("");
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [city, setCity] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !roleId || !questionId || !answer) {
      alert("Please fill all required fields!");
      return;
    }

    registerUser({
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      roleId,
      aadhaarNo: roleId === "2" ? aadhaarNo : null,
      city,
      questionId,
      answer
    })
      .then(() => alert("Registered successfully"))
      .catch(err => alert(err.response?.data?.message || "Registration failed"));
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
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

        <label>First Name</label>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />

        <label>Role</label>
        <select
          value={roleId}
          onChange={e => setRoleId(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="2">Farmer</option>
          <option value="3">Buyer</option>
        </select>

        {roleId === "2" && (
          <>
            <label>Aadhaar Number</label>
            <input
              type="text"
              placeholder="Aadhaar Number"
              value={aadhaarNo}
              onChange={e => setAadhaarNo(e.target.value)}
              maxLength={12}
            />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Phone</label>
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          maxLength={15}
        />

        <label>City</label>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={e => setCity(e.target.value)}
        />

        <label>Security Question</label>
        <select
          value={questionId}
          onChange={e => setQuestionId(e.target.value)}
          required
        >
          <option value="">Select Security Question</option>
          <option value="1">Mother's name</option>
          <option value="2">Father's name</option>
          <option value="3">Favorite food</option>
        </select>

        <label>Answer</label>
        <input
          type="text"
          placeholder="Answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
