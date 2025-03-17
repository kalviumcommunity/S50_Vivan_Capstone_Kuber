import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUpModal({ onClose, onSignUpSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const history = useNavigate();

  const handleSignUpSuccess = () => {
    history("/mainpage"); 
  };


  const validateInput = () => {
    const errors = {};
    if (!username.trim() || username.length < 3) {
      errors.username = '*Username must be at least 3 characters long';
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = '*Please enter a valid email address';
    }
    if (!password || password.length < 6) {
      errors.password = '*Password must be at least 6 characters long';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateInput()) {
      console.error("Validation failed:", validationErrors);
      return; 
    }

    try {
      const response = await axios.post('http://localhost:3000/users', {
        User_Name: username,
        Email: email,
        Password: password
      });

      console.log("User signed up successfully:", response.data);
      onSignUpSuccess(); 
      onClose(); 
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border-2 border-slate-500 p-2 rounded"
      />
      {validationErrors.username && <p className="text-red-500 text-xs">{validationErrors.username}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border-2 border-slate-500 p-2 rounded"
      />
      {validationErrors.email && <p className="text-red-500 text-xs">{validationErrors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border-2 border-slate-500 p-2 rounded"
      />
      {validationErrors.password && <p className="text-red-500 text-xs">{validationErrors.password}</p>}
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={termsAccepted}
          onChange={() => setTermsAccepted(!termsAccepted)}
          className="mr-2"
        />
        <label htmlFor="terms" className="text-sm text-gray-700">
          I accept the terms and conditions
        </label>
      </div>
      <button
        onClick={handleSignUpSuccess}
        className="w-full bg-amber-300 text-black p-2 rounded"
        disabled={!termsAccepted}
      >
        Sign Up
      </button>
    </div>
  );
}

export default SignUpModal;
