import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  PlusIcon,
  WalletIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  HeartIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import logo_black from "../assets/logo-black.png";

const NavBar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isAccountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click outside account dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [accountRef]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/CouponShop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  // Navigation handlers
  const navigateTo = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 ${
        isScrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 lg:hidden text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
            <img
              src={logo_black}
              alt="Logo"
              className="h-8 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => navigateTo("/mainpage")}
            />
          </div>

          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-16 py-2.5 rounded-lg bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 px-4 flex items-center bg-amber-100 hover:bg-amber-200 rounded-r-lg transition-colors"
              >
                <MagnifyingGlassIcon className="h-5 w-5 text-amber-600" />
              </button>
            </form>
          </div>

          {/* Right Section - Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateTo("/CouponShop")}
                className="flex items-center gap-1.5 px-3 py-2 hover:bg-gray-50 rounded-lg group"
              >
                <WalletIcon className="h-5 w-5 text-gray-600 group-hover:text-amber-600" />
                <span className="text-gray-700 group-hover:text-amber-600">
                  Shop
                </span>
              </button>

              <button
                onClick={() => navigateTo("/Addnew")}
                className="flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors"
              >
                <PlusIcon className="h-5 w-5 text-amber-600" />
                <span className="text-amber-600 font-medium">Sell</span>
              </button>

              <button
                onClick={() => navigateTo("/Wishlist")}
                className="p-2.5 hover:bg-gray-50 rounded-lg text-gray-600 hover:text-amber-600"
              >
                <HeartIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Account Dropdown */}
            <div className="relative ml-2" ref={accountRef}>
              <button
                onClick={() => setAccountOpen(!isAccountOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-600" />
                <ChevronDownIcon
                  className={`h-4 w-4 text-gray-500 transition-transform ${
                    isAccountOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100">
                  <div className="p-2 space-y-1">
                    <button
                      className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-50 rounded-lg"
                      onClick={() => navigate("/profile")}
                    >
                      <UserCircleIcon className="h-5 w-5 text-gray-600" />
                      <span>Profile</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-50 rounded-lg">
                      <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
                      <span>Settings</span>
                    </button>
                    <button className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-gray-50 rounded-lg text-red-600">
                      <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute inset-x-0 top-16 bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 space-y-2">
              <button
                onClick={() => navigateTo("/CouponShop")}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <WalletIcon className="h-5 w-5 text-gray-600" />
                <span>Shop</span>
              </button>

              <button
                onClick={() => navigateTo("/Addnew")}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <PlusIcon className="h-5 w-5 text-amber-600" />
                <span>Sell</span>
              </button>

              <button
                onClick={() => navigateTo("/Wishlist")}
                className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg"
              >
                <HeartIcon className="h-5 w-5 text-gray-600" />
                <span>Wishlist</span>
              </button>

              <div className="border-t border-gray-100 my-2"></div>

              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <UserCircleIcon className="h-5 w-5 text-gray-600" />
                <span>Profile</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
                <Cog6ToothIcon className="h-5 w-5 text-gray-600" />
                <span>Settings</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg text-red-600">
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
