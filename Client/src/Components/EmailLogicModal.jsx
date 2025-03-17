import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailLoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      // Fetch all users
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      // Find user by email
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Invalid credentials or user not found");
      }

      // Successful login
      onClose();
      navigate("/mainpage");
    } catch (error) {
      setErrorMessage(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4">
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
        />
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="terms"
            checked={termsAccepted}
            onChange={() => setTermsAccepted(!termsAccepted)}
            className="h-4 w-4 text-amber-500 rounded border-gray-300 focus:ring-amber-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
            I accept the terms and conditions
          </label>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={!termsAccepted || isLoading}
          className={`w-full p-3 rounded-lg font-medium transition-colors ${
            termsAccepted && !isLoading
              ? "bg-amber-400 hover:bg-amber-500"
              : "bg-gray-200 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Processing..." : "Login"}
        </button>
      </div>

      <div className="text-center text-sm text-gray-600 mt-4">
        Not a member?{" "}
        <a
          href="/signup"
          className="text-amber-600 hover:text-amber-700 font-medium underline"
        >
          Join now
        </a>
      </div>
    </form>
  );
}

export default EmailLoginModal;