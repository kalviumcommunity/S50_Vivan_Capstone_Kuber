import React from "react";
import logo_black from "../assets/logo-black.png";
import add from "../assets/add.png";
import down from "../assets/down.png";
import wallet from "../assets/Wallet.png";
import fox from "../assets/fox.png";
import discount from "../assets/discount.png";

const addnewpage = () => {
  return (
    <>
      <div className="bg-white">
        <div className="flex justify-between items-center py-4 px-6  ">
          <div className="flex justify-between items-center space-x-4 w-1/2  rounded-lg">
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
              <button className="bg-transparent items-center flex text-black text-xl font-semibold py-2 px-4">
                Add New
                <img src={add} alt="add" className="h-4 ml-1 mt-1" />
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className=" items-center flex text-black text-xl  font-semibold py-2 px-4">
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-evenly ">
        <div>
          <h1 className="ml-20 mb-20 text-5xl mt-14 w-5/6">
            Sell your Unused coupon here{" "}
          </h1>
          <img className="ml-28" src={discount} alt="" />
        </div>
        <div className="w-3/6">
            <div className="bg-amber-200 w-6/12 rounded-2xl ">
            <div className="text-center text-2xl mb-5 pt-3">Coupon Detail</div>
            <div  className="flex justify-center">
          <input type="text" placeholder="brand" className="mb-5 w-9/12 text-center p-2 rounded-2xl " />
          </div>
          <div  className="flex justify-evenly w-9/12 ml-14">
            <input type="date" placeholder="exp" className="mb-5 bg-white w-44 text-center p-2 rounded-2xl" />
            <input type="number" placeholder="Price" className=" mb-5 bg-white w-44 text-center p-2 rounded-2xl" />
          </div>
          <div className="flex justify-center">
            <input type="text" placeholder="Description" className="mb-5 bg-white w-9/12 text-center p-2 rounded-2xl" />
          </div >
          <div className="flex justify-center">
            <input type="text" placeholder="Code" className="mb-5 bg-white w-9/12 text-center p-2 rounded-2xl" />
          </div>
          <div className="flex justify-center ">
            <input type="text" placeholder="Upload Img" className="mb-5 bg-white w-9/12 text-center p-2 rounded-2xl" />
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default addnewpage;