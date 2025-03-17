import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import google from "../assets/Google.png";
import Facebook from "../assets/Facebook.png";
import Email from "../assets/Email.png";
import EmailSignUpModal from "./EmailSignModal";

function SignUpModal({ onClose }) {
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);

  const handleEmailSignUp = () => setShowEmailSignUp(true);
  const handleGoogleSignUp = () => window.location.href = "http://localhost:3000/auth/google";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md relative shadow-2xl">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Kuber</h2>
          <p className="text-gray-500">Start saving today</p>
        </div>

        {!showEmailSignUp ? (
          <div className="space-y-4">
            {/* Google Button */}
            <button
              onClick={handleGoogleSignUp}
              className="flex items-center justify-center w-full gap-3 px-6 py-3.5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300"
            >
              <img src={google} alt="Google" className="w-6 h-6" />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>

            {/* Facebook Button */}
            <button
              className="flex items-center justify-center w-full gap-3 px-6 py-3.5 rounded-xl border border-gray-200 hover:border-blue-600 hover:bg-blue-100 transition-all duration-300"
            >
              <img src={Facebook} alt="Facebook" className="w-6 h-6" />
              <span className="text-gray-700 font-medium">Continue with Facebook</span>
            </button>

            {/* Email Button */}
            <button
              onClick={handleEmailSignUp}
              className="flex items-center justify-center w-full gap-3 px-6 py-3.5 rounded-xl border border-transparent bg-amber-400 hover:bg-amber-500 transition-all duration-300"
            >
              <img src={Email} alt="Email" className="w-6 h-6" />
              <span className="text-gray-900 font-medium">Continue with Email</span>
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-400">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Existing User */}
            <p className="text-center text-gray-500">
              Already have an account?{" "}
              <button 
                onClick={onClose}
                className="text-blue-500 hover:text-blue-600 font-semibold transition-colors"
              >
                Log in
              </button>
            </p>
          </div>
        ) : (
          <EmailSignUpModal onClose={onClose} />
        )}
      </div>
    </div>
  );
}

export default SignUpModal;