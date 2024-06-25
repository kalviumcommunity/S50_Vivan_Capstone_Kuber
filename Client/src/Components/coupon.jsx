// coupon component
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logo_black from "../assets/logo-black.png";
import add from "../assets/add.png";
import down from "../assets/down.png";
import wallet from "../assets/Wallet.png";
import coupon1 from "../assets/dummy1.jpg";
import coupon2 from "../assets/dummy2.jpg";
import like from "../assets/like.png";
import share from "../assets/share.png";
import wonder from "../assets/wonder.png";

const Coupon = () => {
  const { id } = useParams();
  console.log('ID:', id); // Logging the coupon ID for debugging
  const [coupon, setCoupon] = useState(null);

  // Fetch the coupon data from the server when the component mounts or the ID changes
  useEffect(() => {
    fetch(`http://localhost:3000/coupons/${id}`) 
      .then(response => response.json())
      .then(data => setCoupon(data))
      .catch(error => console.error('Error fetching coupon:', error));
  }, [id]);

  // Show a loading message while the coupon data is being fetched
  if (!coupon) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <div className="bg-white border-b-2">
        <div className="flex justify-between items-center py-4 px-6">
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
              <button className="bg-transparent items-center flex text-black text-xl font-semibold py-2 px-4">
                Shop
                <img src={down} alt="down" className="h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button className="bg-transparent items-center flex text-black text-xl font-semibold py-2 px-4">
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
            <button className="items-center flex text-black text-xl font-semibold py-2 px-4">
              Cart 0
            </button>
          </div>
        </div>
      </div>

      <div className="flex p-24 pt-14">
        <div className="w-2/3 m-0.5">
          <div className="bg-slate-100 border-2 p-6 flex justify-center">
            <img className="w-56" src={coupon.image} alt="" />
          </div>

          <div className="bg-slate-100 border-2 mt-1 flex justify-start p-5">
            <img className="w-20 mr-14 ml-15" src={coupon.image} alt="" />
            <img className="w-20" src={coupon.image} alt="" />
          </div>

          <div className="bg-slate-100 border-2 mt-1">
            <div className="bg-slate-100 ml-14 pt-5">
              <h1 className="text-2xl">Details</h1>
              <div className="flex justify-start pt-5 pb-5 border-b-2">
                <h2 className="mr-24">Brand</h2>
                <h2>{coupon.Brand_Name}</h2>
              </div>
            </div>
            <div className="ml-14">
              <h1 className="text-2xl pt-4 pb-5">Description</h1>
              <h3>{coupon.Description}</h3>
            </div>
          </div>
        </div>

        <div className="w-1/3 m-0.5">
          <div className="bg-slate-100 border-2">
            <div className="flex justify-between h-14">
              <h1 className="text-4xl font-semibold m-5">${coupon.Price}</h1>
              <div className="flex justify-evenly">
                <img className="w-10 h-10 m-5" src={share} alt="" />
                <img className="w-10 h-10 m-5" src={like} alt="" />
              </div>
            </div>
            <div className="text-2xl flex justify-between m-2">
              <h1 className="m-4">Timeleft - {coupon.Timeleft}</h1>
              <h1 className="m-4">{coupon.Date}</h1>
            </div>
          </div>

          <div className="bg-slate-100 border-2 flex justify-evenly h-28 items-center mt-1">
            <div>
              <img
                className="h-24 w-24 border-gray-950 border-2 rounded-full"
                src={wonder}
                alt=""
              />
            </div>
            <div>
              <div className="text-2xl text-center">KUBER USER</div>
              <div className="bg-yellow-300 text-center w-52 h-8">
                Chat with user
              </div>
            </div>
          </div>

          <div className="bg-slate-100 border-2 h-28 pl-12 mt-1">
            <h1 className="text-3xl mt-2">Post Details</h1>
            <h1 className="text-xl">posted on : {coupon.Posted_On}</h1>
            <h1 className="text-xl">Exp Date : {coupon.Date}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coupon;
