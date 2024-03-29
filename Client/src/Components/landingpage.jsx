import React, { useState } from "react";
import klg from "../assets/klogo.png";
import logo from "../assets/logo.png";
import works from "../assets/works.png";
import auto from "../assets/auto.png";
import doller from "../assets/Doller.png";
import google from "../assets/Google.png";
import Facebook from "../assets/Facebook.png";
import Email from "../assets/Email.png";

function LoginModal({ onClose }) {
  const [showEmailLogin, setShowEmailLogin] = useState(false);

  const handleEmailLogin = () => {
    setShowEmailLogin(true);
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
            <button className="flex justify-evenly items-center gap-2 w-full py-2 rounded-lg border-2 border-slate-500 text-base font-medium text-gray-700 bg-white">
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

function SignUpModal({ onClose }) {
  const [showEmailSignUp, setShowEmailSignUp] = useState(false);

  const handleEmailSignUp = () => {
    setShowEmailSignUp(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-slate-200 w-1/4 p-5 rounded-lg">
        <button onClick={onClose} className="float-right font-bold">X</button>
        <h2 className="text-xl mb-2">Sign Up for Kuber</h2>
        {!showEmailSignUp ? (
          <div className="space-y-4">
            <button className="flex justify-evenly items-center gap-2 w-full py-2 rounded-lg border-2 border-slate-500 text-base font-medium text-gray-700 bg-white">

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
              <a href="#" className="text-blue-500 hover:text-blue-700" onClick={onClose}>
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

function EmailSignUpModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSignUp = () => {
    console.log("Signing up with:", email, password);
    onClose();
  };

  return (
    <div className="flex flex-col space-y-4">
       <input
        type="text"
        placeholder="Username"
        value={Text}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border-2 border-slate-500 p-2 rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border-2 border-slate-500 p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border-2 border-slate-500 p-2 rounded"
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
        onClick={handleSignUp}
        className="w-full bg-amber-300 text-black p-2 rounded"
        disabled={!termsAccepted}
      >
        Sign Up
      </button>
    </div>
  );
}


function LandingPage() {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalVisible(!isLoginModalVisible);
  };
 
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);

  const toggleSignUpModal = () => {
    setSignUpModalVisible(!isSignUpModalVisible);
  };

  return (
    <>
      <div className="h-screen w-screen flex">
        <div>
          <img
            src={logo}
            alt="logo"
            className="w-[190px] h-[120px] ml-[20px] pt-[20px] absolute"
          />
          <img
            src={doller}
            className="absolute animate-bounce ml-60 mt-32"
            alt="doller"
          />
          <img src={klg} alt="klg" className="mr-96" />
        </div>

        <div>
          <div className="justify-end text-center ml-[90%] mt-5 border-b-2 w-12 cursor-pointer">
            <h3 onClick={toggleLoginModal}>Login</h3>
          </div>
          <div className="text-7xl ml-24 mt-20 w-7/12 text-blue-900 font-semibold">
            <h1>We search for the internet's best coupons</h1>
          </div>
          <div className="text-3xl ml-24 mt-10 w-2/5 text-blue-900 font-semibold">
            <h1>
              Stop wasting time and money Kuber helps you find coupon codes.
            </h1>
          </div>
          <button className="font-semibold text-2xl w-40 ml-24 h-12 text-white bg-yellow-300 mt-14 rounded-l"  onClick={toggleSignUpModal}>
            Sign-up
          </button>
        </div>
      </div>
      <div className="ml-96">
        <img src={works} alt="works" />
      </div>
      <div className="bg-cyan-300 w-screen h-[60vh] mt-20 flex justify-evenly">
        <div className="w-2/6 mt-40">
          <h1 className="text-4xl mt-10 text-center text-black font-semibold">
            Automatic coupons
          </h1>
          <h2 className="text-2xl mt-4 text-center">
            Still looking for codes on your own? We’ll search for them so you
            don’t have to. If we find working codes, we’ll automatically apply
            the best one to your cart.
          </h2>
        </div>
        <div className="mt-28">
          <img className="w-5/6" src={auto} alt="Automatic Coupons" />
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-center text-8xl mt-28 w-5/6">
          “Become a coupon pro”
        </h1>
      </div>
      <div className="flex justify-center mt-28">
        <div className="bg-cyan-300 w-5/6 h-[45vh]">
          <div className="flex justify-center text-6xl mt-24">
            <h1>What Kuber members are getting:</h1>
          </div>
          <div className="flex justify-evenly text-4xl mt-20">
            <h2 className="w-96 text-center">$126 Yearly Average Savings</h2>
            <h2 className="w-96 text-center">
              30,000+ Participating Merchants
            </h2>
            <h2 className="w-96 text-center">17.9% Average Discount</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <h1 className="text-center text-7xl mt-28 w-5/6">
          Too good to pass up, right? Start saving now.
        </h1>
      </div>
      <div className="flex justify-center">
        <button className="font-semibold text-2xl w-52 h-12 text-white bg-yellow-300 mt-14 rounded-l"  onClick={toggleSignUpModal}>
          Sign-up
        </button>
      </div>
      <div className="bg-black w-screen h-[40vh] mt-20">
        <div className="flex pt-10">
          <h1 className="text-white text-2xl ml-10">Company</h1>
          <h1 className="text-white text-2xl ml-10">Help</h1>
          <h1 className="text-white text-2xl ml-10">News</h1>
          <h1 className="text-white text-2xl ml-10">Careers</h1>
        </div>
      </div>
      {isLoginModalVisible && <LoginModal onClose={toggleLoginModal} />}
      {isSignUpModalVisible && <SignUpModal onClose={toggleSignUpModal} />}

    </>
  );
}
export default LandingPage;
