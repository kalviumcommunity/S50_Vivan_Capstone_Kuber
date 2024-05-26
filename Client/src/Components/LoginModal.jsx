import React, { useState } from "react";
import google from "../assets/Google.png";
import Facebook from "../assets/Facebook.png";
import Email from "../assets/Email.png";
import EmailLoginModal from "./EmailLogicModal";

function LoginModal({ onClose }) {
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  const handleEmailLogin = () => {
    setShowEmailLogin(true);
  };

  const handleGoogleSignUp = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-slate-200 w-1/4 p-5 rounded-lg">
      <button onClick={onClose} className="float-right font-bold">
        X
      </button>
      <h2 className="text-xl mb-2">Login to Kuber</h2>
      {!showEmailLogin ? (
        <div className="space-y-4">
          <button className="flex justify-evenly items-center gap-2 w-full py-2 rounded-lg border-2 border-slate-500 text-base font-medium text-gray-700 bg-white" onClick={handleGoogleSignUp}>
            <img className="h-6 w-8" src={google} alt="Google" />
            Login with Google
          </button>
          <button
            className="flex justify-evenly items-center gap-2 w-full py-2 rounded-lg border-2 border-slate-500 text-base font-medium text-gray-700 bg-white"
            onClick={handleEmailLogin}
          >
            <img className="h-6 w-8" src={Facebook} alt="Facebook" />
            Login with Facebook
          </button>
          <button
            className="flex justify-evenly items-center gap-2 w-full py-2 rounded-lg border-2 border-slate-500 text-base font-medium text-gray-700 bg-amber-300"
            onClick={handleEmailLogin}
          >
            <img className="h-6 w-8 " src={Email} alt="Email" />
            Login with Email
          </button>
          <div className="ml-2 mt-4">
            <span>Not a member? </span>
            <a href="/signup" className="text-blue-500 hover:text-blue-700" >
              Join now
            </a>
          </div>
        </div>
      ) : (
        <EmailLoginModal onClose={onClose} />
      )}
    </div>
  </div>
  );
}

export default LoginModal;

