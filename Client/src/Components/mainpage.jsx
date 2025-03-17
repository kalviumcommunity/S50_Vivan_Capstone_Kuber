import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "./navbar";
import Newtokuber from "./Display-coupon/newtokuber";
import wonder from "../assets/wonder.png";
import off from "../assets/off.png";

function MainPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/user", { withCredentials: true })
      .then((response) => {
        localStorage.setItem("userId", response.data.userId);
      })
      .catch(() => {
        console.log("❌ Not logged in");
        localStorage.removeItem("userId");
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/coupons")
      .then((response) => response.json())
      .then((data) => {
        setCoupons(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-400 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading Amazing Deals...</p>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-cyan-400 to-blue-600 min-h-[70vh] flex flex-col lg:flex-row justify-center items-center px-6 py-16 lg:py-0 gap-8 overflow-hidden">
            <div className="relative z-10 text-center lg:text-left max-w-2xl space-y-6">
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight animate-fade-in-up">
                Earn Gold Coins with Kuber, 
                <span className="block mt-4 bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                  Redeem for Rewards!
                </span>
              </h1>
              <button 
                className="bg-amber-400 hover:bg-amber-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
                onClick={() => navigate('/rewards')}
              >
                Explore Rewards →
              </button>
            </div>
            <img 
              className="relative z-10 h-64 lg:h-96 animate-float" 
              src={wonder} 
              alt="Rewards illustration" 
            />
            <div className="absolute inset-0 bg-noise-pattern opacity-10"></div>
          </div>

          <Newtokuber />

          {/* Trending Coupons Section */}
          <div className="container mx-auto px-6 py-16">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
                Trending Coupons
                <span className="block mt-2 text-amber-500 text-xl font-medium">Fresh deals updated daily</span>
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coupons.slice(0, 6).map((coupon, index) => (
                  <div
                    key={index}
                    className="group relative bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/20 to-blue-100/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="h-24 w-24 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">{coupon.discount}%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-xl font-bold text-gray-900">{coupon.storeName}</h2>
                        <p className="text-gray-600 line-clamp-2">{coupon.description || "Exciting discounts available now!"}</p>
                        <button className="text-amber-600 font-medium flex items-center hover:text-amber-700">
                          View Deal
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-7xl mx-6 lg:mx-auto my-16 relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-400 to-amber-500">
            <div className="flex flex-col lg:flex-row justify-between items-center px-8 py-12">
              <div className="text-center lg:text-left max-w-xl space-y-6">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  Discover More Exclusive Deals
                </h1>
                <p className="text-lg text-gray-800">
                  Explore our curated collection of premium offers
                </p>
                <button 
                  className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors"
                  onClick={() => navigate('/stores')}
                >
                  Browse Stores Now
                </button>
              </div>
              <img 
                className="mt-8 lg:mt-0 h-56 lg:h-72 animate-pulse-slow" 
                src={off} 
                alt="Special offers" 
              />
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-6 py-16">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white">Kuber</h3>
                  <p className="text-sm">Your ultimate destination for smart savings and exclusive rewards.</p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-amber-400 transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors">Blog</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Support</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-amber-400 transition-colors">FAQ</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors">Contact</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold">Connect</h4>
                  <div className="flex space-x-4">
                    {['facebook', 'twitter', 'instagram'].map((social) => (
                      <a key={social} href="#" className="p-2 bg-gray-800 rounded-full hover:bg-amber-500 transition-colors">
                        <img 
                          src={`/icons/${social}.svg`} 
                          alt={social} 
                          className="h-5 w-5" 
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm">
                © {new Date().getFullYear()} Kuber. All rights reserved.
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
}

export default MainPage;