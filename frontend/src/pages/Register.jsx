import "./Register.css";
import { useState, useEffect } from "react";
import {
  registerUser,
  getSecurityQuestions,
  getCities,
  getAreasByCity
} from "../services/authService";



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
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [errors, setErrors] = useState({});

 const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [cityId, setCityId] = useState("");
  const [areaId, setAreaId] = useState("");



  useEffect(() => {
    getSecurityQuestions()
      .then(res => setQuestions(res.data))
      .catch(() => alert("Failed to load security questions"));
  }, []);


  useEffect(() => {
  getCities()
    .then(res => {
      console.log("Cities API response:", res.data);
      setCities(res.data);
    })
    .catch(() => console.log("Failed to load cities"));
}, []);


  useEffect(() => {
    if (cityId) {
      getAreasByCity(cityId)
        .then(res => setAreas(res.data))
        .catch(() => console.log("Failed to load areas"));
    } else {
      setAreas([]);
      setAreaId("");
    }
  }, [cityId]);



  const handleSubmit = (e) => {

    e.preventDefault();

  let newErrors = {};

  // 1️⃣ Username
  if (!username || username.length < 5 || username.length > 20) {
    newErrors.username = "Username must be 5–20 characters";
  }

  // 2️⃣ Password
  if (!password || password.length < 8 || password.length > 16) {
    newErrors.password = "Password must be 8–16 characters";
  }

  // 3️⃣ First Name
  if (!firstName || !/^[A-Za-z]{2,30}$/.test(firstName)) {
    newErrors.firstName = "First name must contain only alphabets (2–30 chars)";
  }

  // 4️⃣ Last Name
  if (!lastName || !/^[A-Za-z]{2,30}$/.test(lastName)) {
    newErrors.lastName = "Last name must contain only alphabets (2–30 chars)";
  }

  // 5️⃣ Role
  if (!roleId) {
    newErrors.roleId = "Please select a role";
  }

  // 6️⃣ Email
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Enter a valid email address";
  }

  // 7️⃣ Phone
  if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
    newErrors.phone = "Phone must be 10 digits and not start with 0";
  }

  // 8️⃣ City
if (!cityId) {
  newErrors.city = "Please select a city";
}

 // 8️⃣ Area
if (!areaId) {
  newErrors.area = "Please select an area";
}

  // 9️⃣ Security Question
  if (!questionId) {
    newErrors.questionId = "Please select a security question";
  }

  // 🔟 Answer
  if (!answer || answer.trim().length < 2) {
    newErrors.answer = "Answer must be at least 2 characters";
  }

  // Aadhaar (Farmer only)
  if (roleId === "2" && !aadhaarNo) {
    newErrors.aadhaarNo = "Aadhaar number is required for Farmer";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

      console.log("Register payload →", {
      username,
      roleId: Number(roleId),
      questionId: Number(questionId),
      answer
    });

  setErrors({});

    registerUser({
        username,
        password,
        firstName,
        lastName,
        roleId: Number(roleId),
        aadhaarNo: roleId === "2" ? aadhaarNo : null,
        email,
        phone,
        areaId: Number(areaId),
        questionId: Number(questionId),
        answer: answer.trim()
      })
      .then(res => {
    if (res.status === 200) {
      alert("Registration successful");
    }
  })
  .catch(err => {
    if (err.response?.status === 409) {
      alert("Username already exists");
    } else {
      alert("Registration failed");
    }
  });



  };

  return (
    <div className="form-container">
      <h2>Register</h2>

      {/* Error msg prints here */}
      {Object.keys(errors).length > 0 && (
        <div style={{ color: "orange", marginBottom: "10px", fontSize: "13px" }}>
          {Object.values(errors).map((err, index) => (
            <div key={index}>{err}</div>
          ))}
        </div>
      )}


      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <label>First Name</label>
        <input
          type="text"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />

        <label>Last Name</label>
        <input
          type="text"
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
              value={aadhaarNo}
              onChange={e => setAadhaarNo(e.target.value)}
              maxLength={12}
              required
            />
          </>
        )}

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          maxLength={15}
        />

        <label>City</label>
        <select
          value={cityId}
          onChange={e => setCityId(e.target.value)}
          required
        >
          <option value="">Select City</option>
          {cities.map(city => (
            <option key={city.cityId} value={city.cityId}>
              {city.cityName}
            </option>
          ))}
        </select>

          <label>Area</label>
          <select
            value={areaId}
            onChange={e => setAreaId(e.target.value)}
            disabled={!cityId}
            required
          >
            <option value="">Select Area</option>
            {areas.map(area => (
              <option key={area.areaId} value={area.areaId}>
                {area.areaName}
              </option>
            ))}
          </select>
            


        {errors.city && (
          <p style={{ color: "orange", fontSize: "12px" }}>{errors.city}</p>
        )}


        <label>Security Question</label>

        <select
          value={questionId}
          onChange={e => setQuestionId(e.target.value)}
          required
        >
          <option value="">Select Security Question</option>

          {questions.map(q => (
            <option
              key={q.question_id}
              value={String(q.question_id)}
            >
              {q.question}
            </option>
          ))}
        </select>

        <label>Answer</label>
        <input
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
