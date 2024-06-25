import React, { useState } from "react";
import { storage } from "./firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from 'axios';
import logo_black from "../assets/logo-black.png";
import add from "../assets/add.png";
import down from "../assets/down.png";
import wallet from "../assets/Wallet.png";
import fox from "../assets/fox.png";
import discount from "../assets/discount.png";

const AddNewPage = () => {
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("image/");

    try {
      if (!file) {
        throw new Error('Please select an image');
      }

      const storageRef = ref(storage, "image" + file.name);
      const uploadTask = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(uploadTask.ref);


      formData.set("image", downloadURL);

      const response = await axios.post('http://localhost:3000/coupons', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);

      if (response.status === 201) {
        alert('Coupon submitted successfully!');
        e.target.reset();
        setError(null);
      } else {
        throw new Error('Failed to submit coupon');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit coupon');
    }
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
                <img src={down} alt="down " className="h-4" />
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
             cart 0
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex justify-evenly h-5/6">
          <div>
            <h1 className="ml-20 mb-20 text-5xl text-blue-900 font-semibold text-center mt-14 w-5/6">
              Sell your Unused coupon here{" "}
            </h1>
            <img
              className="ml-28 mt-36 animate-bounce"
              src={discount}
              alt="discount"
            />
          </div>
          <div className="w-3/6 mt-28 h-3/6">
            <div className="bg-amber-200 w-7/12 rounded-2xl h-4/6 ml-36">
              <div className="text-center text-2xl mb-8 pt-3">Coupon Detail</div>
              <div className="flex justify-center">
                <input
                  type="text"
                  name="Brand_Name"
                  placeholder="Brand"
                  className="mb-8 w-9/12 text-center p-2 rounded-2xl font-semibold"
                />
              </div>
              <div className="flex justify-evenly w-9/12 ml-14">
                <input
                  type="date"
                  name="Date"
                  placeholder="Expiration Date"
                  className="mb-8 bg-white w-44 text-center p-2 rounded-2xl font-semibold"
                />
                <input
                  type="number"
                  name="Price"
                  placeholder="Price"
                  className="mb-8 bg-white w-44 text-center p-2 rounded-2xl font-semibold"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  name="Description"
                  placeholder="Description"
                  className="mb-8 bg-white w-9/12 text-center p-2 rounded-2xl font-semibold"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  name="Code"
                  placeholder="Code"
                  className="mb-8 bg-white w-9/12 text-center p-2 rounded-2xl font-semibold"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="text"
                  name="Link"
                  placeholder="Redeem Now Link"
                  className="mb-8 bg-white w-9/12 text-center p-2 rounded-2xl font-semibold"
                />
              </div>
              <div className="flex justify-center">
                <input
                  type="file"
                  name="image/"
                  className="mb-8 bg-white w-9/12 text-center p-2 rounded-2xl font-semibold"
                />
              </div>
              <div className="flex items-center ml-20">
                <input type="checkbox" className="mr-2" id="terms" />
                <label htmlFor="terms" className="text-sm text-gray-700">
                  I accept the terms and conditions
                </label>
              </div>
              <button type="submit" className="w-36 bg-amber-300 text-black p-2 rounded-lg mt-5 mb-5 ml-52 font-semibold">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="flex w-screen justify-evenly">
        <div className="font-semibold text-center w-2/5">
          <h1 className="text-3xl text-cyan-400">
            What is the charge for selling my gift card/voucher?
          </h1>
          <h2 className="text-xl">
            There is a flat of 5% fee for selling your gift card/voucher on cansell. This fee is not levied at the time of posting, shall be deducted during payouts
          </h2>
          <h1 className="text-3xl text-cyan-400">
            How will I be notified about the progress?
          </h1>
          <h2 className="text-xl">
            At the time of listing, you shall be contacted if there is information needed on your posting, once all the information is approved, you post shall go live. At the time of go live, you shall be intimated via SMS. On purchase, you shall be notified via SMS to your registered phone. Payouts shall happen on purchase confirmation, team from Cansell will reach out to you for payout options.
          </h2>
          <h1 className="text-3xl text-cyan-400">
            What are the payout options?
          </h1>
          <h2 className="text-xl">
            You can choose from the following Payout options
          </h2>
        </div>
        <div>
          <img src={fox} alt="fox" />
        </div>
      </div>
    </>
  );
};

export default AddNewPage;
