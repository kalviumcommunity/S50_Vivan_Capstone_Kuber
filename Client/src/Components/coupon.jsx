import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./navbar";
import { HeartIcon, ShoppingBagIcon, ArrowLeftIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import LoadingSkeleton from "./LoadingSkeleton"; 

const Coupon = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Fetch user and coupon data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user
        const userResponse = await axios.get("http://localhost:3000/auth/user", { withCredentials: true });
        if (userResponse.data?.userId) {
          localStorage.setItem("userId", userResponse.data.userId);
          setUserId(userResponse.data.userId);
        }

        // Fetch coupon
        const couponResponse = await axios.get(`http://localhost:3000/coupons/${id}`);
        setCoupon(couponResponse.data);

        // Check wishlist status
        if (userResponse.data?.userId) {
          const wishlistResponse = await axios.get(
            `http://localhost:3000/wishlist/${userResponse.data.userId}`,
            { withCredentials: true }
          );
          setIsInWishlist(wishlistResponse.data.some(item => item.coupon._id === id));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load coupon details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddToWishlist = async () => {
    if (!userId) {
      toast.info("Please login to save coupons", { position: "bottom-right" });
      return;
    }

    try {
      if (isInWishlist) {
        await axios.delete(`http://localhost:3000/wishlist/${userId}/${id}`, { withCredentials: true });
        setIsInWishlist(false);
        toast.success("Removed from wishlist", { position: "bottom-right" });
      } else {
        await axios.post(
          "http://localhost:3000/wishlist",
          { userId, couponId: id },
          { withCredentials: true }
        );
        setIsInWishlist(true);
        toast.success("Added to wishlist!", { position: "bottom-right" });
      }
    } catch (error) {
      toast.error("Operation failed. Please try again.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coupon.Code);
    toast.success("Copied to clipboard!", { position: "bottom-right" });
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <>
      <NavBar />
      
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        theme="colored"
        transition={Bounce}
        style={{ bottom: "80px" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Results
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
          {/* Image Section */}
          <div className="relative lg:w-1/2 bg-gradient-to-br from-blue-50 to-cyan-50 p-8">
            <div className="aspect-w-1 aspect-h-1">
              <img
                className="w-full h-full object-contain rounded-2xl shadow-xl transform hover:scale-105 transition-transform"
                src={coupon.image}
                alt={coupon.Brand_Name}
              />
            </div>
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium shadow-sm">
              🔥 {coupon.Category}
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-8">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{coupon.Brand_Name}</h1>
                <p className="text-lg text-gray-600 mb-6">{coupon.Description}</p>
                
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-full">
                    <span className="text-2xl font-bold">₹{coupon.Price}</span>
                  </div>
                  <div className="text-gray-500">
                    <div className="font-medium">Expires:</div>
                    <div className="text-sm">{new Date(coupon.Date).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleAddToWishlist}
                      className={`flex items-center px-8 py-3 rounded-full font-semibold transition-all ${
                        isInWishlist 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      {isInWishlist ? (
                        <HeartSolidIcon className="h-6 w-6 mr-2" />
                      ) : (
                        <HeartIcon className="h-6 w-6 mr-2" />
                      )}
                      {isInWishlist ? 'Remove from' : 'Add to'} Wishlist
                    </button>

                    <button
                      onClick={() => window.open(coupon.Link, "_blank")}
                      className="flex items-center px-8 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition-colors"
                    >
                      <ShoppingBagIcon className="h-6 w-6 mr-2" />
                      Visit Store
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">COUPON CODE</span>
                    <button
                      onClick={copyToClipboard}
                      className="text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 mr-1" />
                      Copy
                    </button>
                  </div>
                  <div className="font-mono text-2xl bg-white p-4 rounded-lg shadow-inner">
                    {coupon.Code}
                  </div>
                </div>
              </div>

              {/* Seller Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      className="h-14 w-14 rounded-full border-2 border-white shadow-lg"
                      src={coupon.image}
                      alt="Seller"
                    />
                    <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Kuber Verified Seller</h3>
                    <p className="text-sm text-gray-600">98% Positive Ratings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">CATEGORY</h4>
            <p className="text-lg text-gray-900">{coupon.Category}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">VALIDITY</h4>
            <p className="text-lg text-gray-900">{new Date(coupon.Date).toLocaleDateString()}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h4 className="text-sm font-semibold text-gray-500 mb-2">USAGE LIMIT</h4>
            <p className="text-lg text-gray-900">{coupon.UsageLimit || 'Unlimited'}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;