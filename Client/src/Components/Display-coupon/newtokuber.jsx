import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import wonder from '../assets/wonder.png';
import { PrevButton, NextButton, usePrevNextButtons } from '../EmblaCarouselArrowButtons';

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="relative group">
      <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
        <div className="embla__container flex select-none touch-pan-y -ml-4">
          {slides.map((slide, index) => (
            <div className="embla__slide min-w-[320px] pl-4" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </section>
  );
};

const Newtokuber = () => {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/coupons")
      .then((response) => response.json())
      .then((data) => setCoupons(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCouponClick = (coupon) => {
    navigate(`/coupon/${coupon._id}`); 
  };

  const slides = coupons.map((coupon, index) => (
    <div
      key={index}
      className="relative bg-gradient-to-br from-blue-400 to-cyan-400 h-48 w-80 rounded-2xl flex items-center p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group"
      onClick={() => handleCouponClick(coupon)}
    >
      <div className="absolute inset-0 bg-noise-pattern opacity-10 rounded-2xl"></div>
      <div className="relative z-10 flex items-center space-x-6">
        <div className="relative">
          <div className="absolute inset-0 bg-white/30 blur-2xl rounded-full"></div>
          <img
            className="h-28 w-28 border-4 border-white/20 rounded-full object-cover shadow-xl"
            src={wonder}
            alt={coupon.Brand_Name}
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">{coupon.Brand_Name}</h1>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium text-white">
              Limited Offer
            </span>
          </div>
          <h3 className="text-3xl font-bold text-white">₹{coupon.Price}</h3>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full">
          <svg 
            className="w-4 h-4 text-white"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-8 shadow-xl border border-gray-100">
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
            New to Kuber
          </h2>
          <p className="text-lg text-gray-600 mt-2">Exclusive offers for new members</p>
        </div>
        
        <EmblaCarousel 
          slides={slides} 
          options={{ 
            loop: true,
            align: 'start',
            dragFree: true
          }} 
        />
      </div>
    </div>
  );
};

export default Newtokuber;