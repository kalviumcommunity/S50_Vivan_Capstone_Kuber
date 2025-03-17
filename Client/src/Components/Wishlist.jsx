import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ShoppingBagIcon, XCircleIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import NavBar from "./navbar.jsx";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("Please login to view your wishlist");
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/wishlist/${userId}`,
          { withCredentials: true }
        );
        
        const validItems = data.filter(item => (
          item?.coupon?._id && !isNaN(parseFloat(item.coupon?.Price))
        ));
        setWishlist(validItems);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  const removeFromWishlist = async (couponId) => {
    try {
      await axios.delete(
        `http://localhost:3000/wishlist/${userId}/${couponId}`,
        { withCredentials: true }
      );
      setWishlist(prev => prev.filter(item => item.coupon?._id !== couponId));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to remove item");
    }
  };

  const totalPrice = wishlist.reduce(
    (sum, item) => sum + (Number(item.coupon?.Price) || 0),
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading your wishlist...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 max-w-md">
          <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-500 text-white px-6 py-2 rounded-lg hover:bg-amber-600 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Your Wishlist
              <span className="text-amber-500">.</span>
            </h1>
            <p className="text-gray-600">Your curated collection of favorite items</p>
          </div>

          {wishlist.length === 0 ? (
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="flex flex-col items-center justify-center py-12"
            >
              <ShoppingBagIcon className="h-32 w-32 text-gray-300 mb-8" />
              <p className="text-xl text-gray-600 mb-4">Your wishlist is empty</p>
              <button
                onClick={() => window.location.href = "/"}
                className="bg-amber-500 text-white px-8 py-3 rounded-full font-medium
                          hover:bg-amber-600 transition-colors shadow-lg flex items-center"
              >
                <CheckBadgeIcon className="w-5 h-5 mr-2" />
                Start Shopping
              </button>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8">
              <div className="grid grid-cols-1 gap-6">
                {wishlist.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 rounded-xl
                              hover:bg-white transition-all border border-gray-200 hover:border-amber-100
                              hover:shadow-md group"
                  >
                    <div className="flex items-center flex-1 w-full mb-4 sm:mb-0">
                      <div className="relative flex-shrink-0">
                        <img
                          src={item.coupon?.image || "/placeholder-product.jpg"}
                          alt={item.coupon?.Brand_Name || "Coupon image"}
                          className="w-20 h-20 object-cover rounded-xl shadow-sm transform group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.coupon?.Brand_Name || "Unknown Brand"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {item.coupon?.description || "Special offer"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 w-full sm:w-auto">
                      <p className="text-2xl font-bold text-amber-600">
                        ₹{(Number(item.coupon?.Price) || 0).toFixed(2)}
                      </p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => removeFromWishlist(item.coupon?._id)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                          aria-label="Remove item"
                          disabled={!item.coupon?._id}
                        >
                          <XCircleIcon className="w-6 h-6" />
                        </button>
                        <button
                          className="flex items-center bg-amber-500 text-white px-6 py-2 rounded-lg
                                    hover:bg-amber-600 transition-colors font-medium"
                        >
                          <ShoppingBagIcon className="w-5 h-5 mr-2" />
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 pt-6 border-t border-gray-200"
              >
                <div className="flex justify-end items-center space-x-6">
                  <div className="text-right">
                    <p className="text-gray-600">Total Price:</p>
                    <p className="text-3xl font-bold text-amber-600">
                      ₹{totalPrice.toFixed(2)}
                    </p>
                  </div>
                  <button
                    className="bg-green-500 text-white px-8 py-3 rounded-xl font-semibold
                              hover:bg-green-600 transition-colors transform hover:scale-[1.02]
                              shadow-lg flex items-center"
                  >
                    <CheckBadgeIcon className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Wishlist;