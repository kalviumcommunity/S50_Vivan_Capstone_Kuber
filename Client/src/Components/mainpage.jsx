import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo_black from "../assets/logo-black.png";
import add from "../assets/add.png";
import down from "../assets/down.png";
import wallet from "../assets/Wallet.png";
import wonder from "../assets/wonder.png";
import off from "../assets/off.png";
import Newtokuber from "./Display-coupon/newtokuber";

function MainPage() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  // Function to navigate to the Add New Page
  const goToAddNewPage = () => {
    navigate("/Addnew");
  };

  // Function to navigate to the Main Page
  const goToMainPage = () => {
    navigate("/mainpage");
  };

  // Fetching coupons data from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/coupons")
      .then((response) => response.json())
      .then((data) => setCoupons(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="flex justify-between items-center py-4 px-6 ">
          <div className="flex justify-between items-center space-x-4 w-1/2 rounded-lg">
            <img src={logo_black} alt="logo" className="h-14" />
            <input
              type="text"
              placeholder="Search For Items"
              className="px-4 w-9/12 py-2 bg-slate-200 border rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <button className="bg-transparent items-center flex text-black text-xl font-semibold  py-2 px-4">
                Shop
                <img src={down} alt="down " className="h-4 " />
              </button>
            </div>

            <div className="flex items-center  space-x-2">
              <button className="bg-transparent  items-center flex text-black text-xl font-semibold py-2 px-4">
                Wallet
                <img src={wallet} alt="wallet" className="h-6 ml-2" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-transparent items-center flex text-black text-xl font-semibold py-2 px-4" onClick={goToAddNewPage}>
                Add New
                <img src={add} alt="add" className="h-4 ml-1 mt-1" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className=" items-center flex text-black text-xl  font-semibold py-2 px-4">
              Cart 0
            </button>
          </div>
        </div>
      </div>
      <div className="bg-cyan-200 h-96 justify-evenly flex ">
        <h1 className="text-5xl w-2/4 mr-10 flex mt-40 font-semibold text-center">
          Earn Gold Coins with Kuber, redeem them for gift cards!
        </h1>
        <img className="h-4/6 mt-20" src={wonder} alt={wonder} />
      </div>

      <Newtokuber />

      <div className="ml-20 mt-8">
        <div className="bg-white rounded-lg p-6 space-y-4">
          <div>
            <h1 className="text-3xl font-bold">
              Stores with the Most Successful Coupons
            </h1>
          </div>
          <div className="flex">
            <div className="bg-sky-300 h-32 w-96 rounded-lg flex items-center space-x-4 p-4">
              <img
                className="h-24 w-24 border-gray-950 border-2 rounded-lg"
                src={wonder}
                alt="logo_black"
              />
              <div>
                <h1 className="text-lg font-bold">Kuber Deals</h1>
                <h3 className="text-sm">Earn 10 Gold coins</h3>
              </div>
            </div>
            <div className="bg-sky-300 ml-20 h-32 w-96 rounded-lg flex items-center space-x-4 p-4">
              <img
                className="h-24 w-24 border-gray-950 border-2 rounded-lg"
                src={wonder}
                alt="logo_black"
              />
              <div>
                <h1 className="text-lg font-bold">Kuber Deals</h1>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div>
              <h1 className="text-3xl font-bold">Newly Added Coupons</h1>
            </div>
            <div className="flex">
              <div className="bg-sky-300 h-32  rounded-lg flex items-center space-x-4 p-4">
                <img
                  className="h-24 w-24 border-gray-950 border-2 rounded-lg"
                  src={wonder}
                  alt="logo_black"
                />
              </div>
              <div className="bg-sky-300 ml-20 h-32  rounded-lg flex items-center space-x-4 p-4">
                <img
                  className="h-24 w-24 border-gray-950 border-2 rounded-lg"
                  src={wonder}
                  alt="logo_black"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-amber-200 rounded-xl w-[90%] h-72 flex justify-evenly ml-24 mt-10">
        <div className="mt-20">
          <h1 className="text-4xl mb-5">See stores with more deals</h1>
          <h2 className="text-2xl">Browse our store directory</h2>
        </div>
        <div>
          <img className="w-80  flex justify-center" src={off} alt="" />
        </div>
      </div>
      <div className="bg-black w-screen h-[40vh] mt-20">
        <div className="flex pt-10">
          <h1 className="text-white text-2xl ml-10">Company</h1>
          <h1 className="text-white text-2xl ml-10">Help</h1>
          <h1 className="text-white text-2xl ml-10">News</h1>
          <h1 className="text-white text-2xl ml-10">Careers</h1>
        </div>
      </div>
    </>
  );
}

export default MainPage;
