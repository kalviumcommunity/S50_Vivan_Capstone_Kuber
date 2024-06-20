import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Routes

import Firstpage from "./Components/landingpage";
import Coupon from "./Components/coupon";
import MainPage from './Components/mainpage'
import Addnew from './Components/addnewpage'

function App() {
  return (  
    // <Router>
      <Routes> {/* Wrap Routes around Route components */}
        <Route path="/" element={<Firstpage />} />
        <Route path="/Mainpage" element={<MainPage />} />
        <Route path="/Coupon" element={<Coupon />} />
        <Route path="/Addnew" element={<Addnew />} />
        <Route path="/coupon/:id" element={<Coupon />} />
      </Routes>
    // </Router>
  );
}

export default App;

