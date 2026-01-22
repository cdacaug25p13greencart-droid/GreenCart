import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getUserSecurityQuestion,
  verifySecurityAnswer,
  resetPassword
} from "../services/authService";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState(null);
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Fetch security question for the given email
  const fetchUserQuestion = async () => {
    if (!email) return;

    try {
      const res = await getUserSecurityQuestion(email);
      setQuestion(res.data.question);
      setQuestionId(res.data.questionId);
    } catch (err) {
      alert(err.response?.data || "User not found");
      setQuestion("");
      setQuestionId(null);
    }
  };

  // Verify answer
  const handleVerify = async (e) => {
    e.preventDefault();

    if (!email || !questionId || !answer) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await verifySecurityAnswer({
        email,
        questionId,
        answer
      });

      alert("Answer verified! Please set your new password.");
      setStep(2);
    } catch (err) {
      alert(err.response?.data || "Verification failed");
    }
  };

  // Reset password
  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await resetPassword({
        email,
        newPassword
      });

      alert("Password reset successfully! Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Reset failed");
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>{step === 1 ? "Forgot Password" : "Reset Password"}</h2>

        {step === 1 ? (
          <form onSubmit={handleVerify}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={fetchUserQuestion}
              required
            />

            <label>Security Question</label>
            <input
              type="text"
              value={question}
              readOnly
            />

            <label>Answer</label>
            <input
              type="text"
              placeholder="Enter your answer"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              required
            />

            <button type="submit">Verify</button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Reset Password</button>
          </form>
        )}

        <Link to="/login" className="back-link">
          Back to Login
        </Link>
      </div>
    </div>
  );
}
