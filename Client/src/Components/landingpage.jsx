import React, { useState } from "react";
import klg from "../assets/klogo.png";
import logo from "../assets/logo.png";
import works from "../assets/works.png";
import auto from "../assets/auto.png";
import doller from "../assets/Doller.png";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

function LandingPage() {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);

  const toggleLoginModal = () => {
    setLoginModalVisible(!isLoginModalVisible);
  };
 
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
      <div className="ml-96 mt-[-6%]">
        <img src={works} alt="works" />
      </div>
      <div className="bg-cyan-300 w-screen h-[60vh] mt-20 flex justify-evenly">
        <div className="w-2/6 mt-40">
          <h1 className="text-4xl mt-10 text-center text-black font-semibold">
            Automatic coupons
          </h1>
          <h2 className="text-2xl mt-4 text-center">
            Still looking for codes on your own? We'll search for them so you
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
      {isSignUpModalVisible && <SignUpModal onClose={toggleSignUpModal}  />}
    </>
  );
}

export default LandingPage;
