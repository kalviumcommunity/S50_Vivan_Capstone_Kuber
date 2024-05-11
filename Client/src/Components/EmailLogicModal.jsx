import React, { useState } from "react";

function EmailLoginModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    onClose();
  };

  return (
    <div className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border-2 mt-5 border-slate-500 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border-2 border-slate-500 p-2 border rounded"
      />
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
        onClick={handleLogin}
        className="w-full bg-amber-300 text-black p-2 rounded"
        disabled={!termsAccepted}
      >
        Login
      </button>
      <div className="ml-2 mt-4">
        <span>Not a member? </span>
        <a href="/signup" className="text-blue-500 hover:text-blue-700">
          Join now
        </a>
      </div>
    </div>
  );
}

export default EmailLoginModal;
