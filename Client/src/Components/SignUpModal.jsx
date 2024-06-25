import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import google from "../assets/Google.png";
import Facebook from "../assets/Facebook.png";
import Email from "../assets/Email.png";
import EmailSignUpModal from "./EmailSignModal";

function SignUpModal({ onClose }) {
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);

  // Function to show the email sign-up form
  const handleEmailSignUp = () => {
    setShowEmailSignUp(true);
  };

  // Function to handle Google sign-up by redirecting to the Google OAuth URL
  const handleGoogleSignUp = () => {
    window.location.href = "http://localhost:3000/auth/google";
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-200 w-1/4 p-5 rounded-lg">
        <button onClick={onClose} className="float-right font-bold">
          X
          </button>
        <h2 className="text-xl mb-2">Sign Up for Kuber</h2>
        {!showEmailSignUp ? (
          <div className="space-y-4">
            <button
              className="flex justify-evenly items-center gap-2 w-full py-2 rounded-lg border-2 border-slate-500 text-base font-medium text-gray-700 bg-white"
              onClick={handleGoogleSignUp}
            >
              <img className="h-6 w-8" src={google} alt="Google" />
              Sign-up with Google
            </button>
           

            <button
              className="flex justify-evenly items-center gap-2 w-full py-2 rounded-lg border-2 border-slate-500 text-base font-medium text-gray-700 bg-white"
              onClick={handleEmailSignUp}
            >
              <img className="h-6 w-8" src={Facebook} alt="Facebook" />
              Sign-up with Facebook
            </button>
            <button
              className="flex justify-evenly items-center gap-2 w-full py-2 rounded-lg border-2 border-slate-500 text-base font-medium text-gray-700 bg-amber-300"
              onClick={handleEmailSignUp}
            >
              <img className="h-6 w-8" src={Email} alt="Email" />
              Sign-up with Email
            </button>
            <div className="ml-2 mt-4">
              <span>Already a member? </span>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-700"
                onClick={onClose}
              >
                Login
              </a>
            </div>
          </div>
        ) : (
          <EmailSignUpModal onClose={onClose} />
        )}
      </div>
    </div>
  );
}

export default SignUpModal;
