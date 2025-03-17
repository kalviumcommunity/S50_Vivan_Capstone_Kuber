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

  const toggleLoginModal = () => setLoginModalVisible(!isLoginModalVisible);
  const toggleSignUpModal = () => setSignUpModalVisible(!isSignUpModalVisible);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <nav className="fixed w-full  z-50 bg-blue-900/95 backdrop-blur-md border-b border-cyan-300/20 shadow-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center ">
          
          <div className="relative group">
            <div className="absolute -inset-1 bg-cyan-400/30 blur-lg opacity-70 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center space-x-2">
              <img
                src={logo}
                alt="logo"
                className="w-32 md:w-48 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-transform hover:scale-105"
              />
              <img
                src={doller}
                className="absolute -top-0 -right-8 w-16 animate-bounce hover:rotate-[30deg] transition-transform"
                alt="doller"
              />
            </div>
          </div>

         
          <button
            onClick={toggleLoginModal}
            className="relative overflow-hidden px-8 py-2 bg-yellow-400 rounded-full font-bold text-blue-900 hover:text-white transition-all duration-300 group"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-cyan-400 w-0 group-hover:w-full transition-all duration-300 mix-blend-multiply"></div>
          </button>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 py-12 flex flex-col md:flex-row items-center pt-[250px]">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900 leading-tight mb-6">
            We search for the internet's best coupons
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 mb-8">
            Stop wasting time and money. Kuber helps you find coupon codes
            automatically.
          </p>
          <button
            onClick={toggleSignUpModal}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-3 px-8 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Get Started Free
          </button>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img src={klg} alt="Kuber" className="max-w-md w-full" />
        </div>
      </section>
      {/* How It Works */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12">
          <img
            src={works}
            alt="How it works"
            className="mx-auto w-full max-w-4xl"
          />
        </div>
      </section>
      {/* Automatic Coupons */}
      <section className="bg-cyan-100 py-20">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Automatic Coupon Application
            </h2>
            <p className="text-lg md:text-xl text-blue-700 leading-relaxed">
              We continuously monitor for the best available codes and
              automatically apply the most savings to your cart. Focus on
              shopping while we handle the discounts!
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={auto}
              alt="Automatic Coupons"
              className="max-w-md w-full rounded-xl shadow-xl"
            />
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Why Millions Trust Kuber
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold text-yellow-400 mb-4">
                $126+
              </div>
              <p className="text-xl">Yearly Average Savings</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-yellow-400 mb-4">
                30K+
              </div>
              <p className="text-xl">Participating Merchants</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-yellow-400 mb-4">
                17.9%
              </div>
              <p className="text-xl">Average Discount</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-8">
            Start Saving Today - It's Free!
          </h2>
          <button
            onClick={toggleSignUpModal}
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-4 px-12 rounded-full transform transition-all duration-300 hover:scale-105 shadow-lg text-xl"
          >
            Join Kuber Now
          </button>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img src={logo} alt="Logo" className="w-32 mb-4" />
              <p className="text-sm opacity-75">
                Making online shopping affordable for everyone
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm opacity-75">
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-yellow-400 transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm opacity-75">
            © 2023 Kuber. All rights reserved.
          </div>
        </div>
      </footer>
      {isLoginModalVisible && <LoginModal onClose={toggleLoginModal} />}
      {isSignUpModalVisible && <SignUpModal onClose={toggleSignUpModal} />}
    </div>
  );
}

export default LandingPage;
