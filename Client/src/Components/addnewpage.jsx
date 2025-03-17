import React, { useState, useEffect } from "react";
import { storage } from "./firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff, Store, Tag, Calendar, IndianRupee, Link as LinkIcon, Check } from "lucide-react";
import NavBar from "./navbar";

const AddNewPage = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMinDate(today);

    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:3000/auth/user", { withCredentials: true });
        setUserId(response.data.userId);
        localStorage.setItem("userId", response.data.userId);
      } catch (error) {
        setUserId(null);
        localStorage.removeItem("userId");
      }
    };

    const storedUserId = localStorage.getItem("userId");
    storedUserId ? setUserId(storedUserId) : fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!termsAccepted) {
      toast.error("Please accept the terms & conditions");
      return;
    }

    if (!userId) {
      toast.error("Please log in to submit a coupon.");
      return;
    }

    const formData = new FormData(e.target);
    const file = formData.get("image");
    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    const couponData = {
      Brand_Name: formData.get("Brand_Name"),
      Category: formData.get("Category"),
      Date: formData.get("Date").split("-").reverse().join("/"),
      Price: formData.get("Price"),
      Description: formData.get("Description"),
      Code: formData.get("Code"),
      Link: formData.get("Link"),
      userId
    };

    setLoading(true);
    try {
      const storageRef = ref(storage, `coupons/${file.name}-${Date.now()}`);
      await uploadBytes(storageRef, file);
      couponData.image = await getDownloadURL(storageRef);

      const response = await axios.post(
        "http://localhost:3000/coupons",
        couponData
      );

      if (response.status === 201) {
        toast.success("Coupon submitted successfully!");
        e.target.reset();
        setTermsAccepted(false);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12">
          <header className="text-center mb-10 space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">Sell Your Coupon</h1>
            <p className="text-gray-600">Reach thousands of potential buyers</p>
          </header>

          <div className="space-y-6">
            {/* Brand Name */}
            <div className="relative">
              <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="Brand_Name"
                placeholder="Brand Name"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>

            {/* Category */}
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                name="Category"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all appearance-none bg-white"
                required
              >
                <option value="">Select Category</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Food">Food & Beverage</option>
                <option value="Travel">Travel</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health & Beauty</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Date & Price */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  name="Date"
                  min={minDate}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="Price"
                  placeholder="Price"
                  min="0"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <textarea
                name="Description"
                placeholder="Coupon details (optional)"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all h-32"
              />
            </div>

            {/* Coupon Code */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">#</div>
              <input
                type={showCode ? "text" : "password"}
                name="Code"
                placeholder="Coupon Code"
                className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                {showCode ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Redeem Link */}
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="url"
                name="Link"
                placeholder="Redemption URL"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="relative">
              <label className="block">
                <span className="sr-only">Upload coupon image</span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100
                    transition-colors cursor-pointer"
                  required
                />
              </label>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="peer hidden"
                required
              />
              <label
                htmlFor="terms"
                className="flex items-center select-none cursor-pointer text-sm"
              >
                <div className={`mr-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                  ${termsAccepted ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}
                >
                  <Check className={`w-4 h-4 text-white ${termsAccepted ? 'block' : 'hidden'}`} />
                </div>
                <span className="text-gray-600">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    terms & conditions
                  </a>
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !termsAccepted}
              className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center disabled:opacity-80 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "List My Coupon"
              )}
            </button>
          </div>
        </form>

        {/* Pricing Information */}
        <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl border border-blue-100">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              Transparent Pricing
            </h2>
            <p className="text-sm text-gray-600">
              5% platform fee deducted only upon successful sale
            </p>
          </div>
        </div>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          theme="colored"
        />
      </div>
    </>
  );
};

export default AddNewPage;