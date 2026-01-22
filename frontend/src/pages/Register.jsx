// import "./Register.css";
// import { useState, useEffect } from "react";
// import { registerUser, getSecurityQuestions } from "../services/authService";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [roleId, setRoleId] = useState("");
//   const [aadhaarNo, setAadhaarNo] = useState("");
//   const [city, setCity] = useState("");
//   const [questionId, setQuestionId] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [answer, setAnswer] = useState("");

//   useEffect(() => {
//     getSecurityQuestions()
//       .then(res => setQuestions(res.data))
//       .catch(() => alert("Failed to load security questions"));
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!username || !password || !roleId || !questionId || !answer) {
//       alert("Please fill all required fields!");
//       return;
//     }

//     if (roleId === 2 && !aadhaarNo) {
//       alert("Aadhaar number is required for Farmer");
//       return;
//     }

//     registerUser({
//       username,
//       password,
//       firstName,
//       lastName,
//       email,
//       phone,
//       roleId,
//       aadhaarNo: roleId === 2 ? aadhaarNo : undefined,
//       city,
//       questionId,
//       answer
//     })
//       .then(() => alert("Registered successfully"))
//       .catch(err =>
//         alert(err.response?.data?.message || "Registration failed")
//       );
//   };

//   return (
//     <div className="form-container">
//       <h2>Register</h2>

//       <form onSubmit={handleSubmit}>
//         <label>Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={e => setUsername(e.target.value)}
//           required
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           required
//         />

//         <label>First Name</label>
//         <input
//           type="text"
//           value={firstName}
//           onChange={e => setFirstName(e.target.value)}
//         />

//         <label>Last Name</label>
//         <input
//           type="text"
//           value={lastName}
//           onChange={e => setLastName(e.target.value)}
//         />

//         <label>Role</label>
//         <select
//           value={roleId}
//           onChange={e =>
//             setRoleId(e.target.value === "" ? "" : Number(e.target.value))
//           }
//           required
//         >
//           <option value="">Select Role</option>
//           <option value={2}>Farmer</option>
//           <option value={3}>Buyer</option>
//         </select>

//         {roleId === 2 && (
//           <>
//             <label>Aadhaar Number</label>
//             <input
//               type="text"
//               value={aadhaarNo}
//               onChange={e => setAadhaarNo(e.target.value)}
//               maxLength={12}
//               required
//             />
//           </>
//         )}

//         <label>Email</label>
//         <input
//           type="email"
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//         />

//         <label>Phone</label>
//         <input
//           type="text"
//           value={phone}
//           onChange={e => setPhone(e.target.value)}
//           maxLength={15}
//         />

//         <label>City</label>
//         <input
//           type="text"
//           value={city}
//           onChange={e => setCity(e.target.value)}
//         />

//         <label>Security Question</label>
//         <select
//           value={questionId}
//           onChange={e =>
//             setQuestionId(e.target.value === "" ? "" : Number(e.target.value))
//           }
//           required
//         >
//           <option value="">Select Security Question</option>

//           {questions.map(q => (
//             <option key={q.questionId} value={q.questionId}>
//               {q.question}
//             </option>
//           ))}
//         </select>


//         <label>Answer</label>
//         <input
//           type="text"
//           value={answer}
//           onChange={e => setAnswer(e.target.value)}
//           required
//         />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }



import "./Register.css";
import { useState, useEffect } from "react";
import { registerUser, getSecurityQuestions } from "../services/authService";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState("");          // keep as STRING
  const [aadhaarNo, setAadhaarNo] = useState("");
  const [city, setCity] = useState("");
  const [questionId, setQuestionId] = useState("");  // keep as STRING
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    getSecurityQuestions()
      .then(res => setQuestions(res.data))
      .catch(() => alert("Failed to load security questions"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password || !roleId || !questionId || !answer) {
      alert("Please fill all required fields!");
      return;
    }

    if (roleId === "2" && !aadhaarNo) {
      alert("Aadhaar number is required for Farmer");
      return;
    }

    registerUser({
      username,
      password,
      firstName,
      lastName,
      email,
      phone,
      roleId: Number(roleId),              // convert HERE
      aadhaarNo: roleId === "2" ? aadhaarNo : undefined,
      city,
      questionId: Number(questionId),      // convert HERE
      answer
    })
      .then(() => alert("Registered successfully"))
      .catch(err =>
        alert(err.response?.data?.message || "Registration failed")
      );
  };

  return (
    <div className="form-container">
      <h2>Register</h2>

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
        <input
          type="text"
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

          {questions.map(q => (
            <option
              key={q.questionId}                 // ✅ unique key
              value={String(q.questionId)}       // ✅ always string
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
