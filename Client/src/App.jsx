import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes

import Firstpage from "./Components/landingpage";
import Coupon from "./Components/coupon";
import MainPage from './Components/mainpage'
import Addnew from './Components/addnewpage'
import Wishlist from './Components/Wishlist'
import WalletPage from './Components/WalletPage';
import CouponShop from './Components/CouponShop';
import ProfilePage from './Components/ProfilePage';

function App() {
  return (  
    // <Router>
      <Routes> {/* Wrap Routes around Route components */}
        <Route path="/" element={<Firstpage />} />
        <Route path="/WalletPage" element={<WalletPage />} />
        <Route path="/CouponShop" element={<CouponShop />} />
        <Route path="/Mainpage" element={<MainPage />} />
        <Route path="/Coupon" element={<Coupon />} />
        <Route path="/Addnew" element={<Addnew />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/coupon/:id" element={<Coupon />} />
        <Route path="/Wishlist" element={<Wishlist />} />
      </Routes>
    // </Router>
  );
}

export default App;

