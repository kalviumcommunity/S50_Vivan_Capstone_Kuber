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
    <section className="relative">
      <div className="embla__viewport overflow-hidden w-full" ref={emblaRef}>
        <div className="embla__container flex select-none touch-pan-y">
          {slides.map((slide, index) => (
            <div className="embla__slide min-w-1/5" key={index}>
              {slide}
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
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
      className="bg-sky-300 h-32 w-72 rounded-lg flex items-center ml-3 space-x-4 p-4 cursor-pointer"
      onClick={() => handleCouponClick(coupon)}
    >
      <img
        className="h-24 w-24 border-gray-950 border-2 rounded-full"
        src={wonder}
        alt={coupon.Brand_Name}
      />
      <div>
        <h1 className="text-lg font-bold">{coupon.Brand_Name}</h1>
        <h3 className="text-sm">Only for RS {coupon.Price}</h3>
      </div>
    </div>
  ));

  return (
    <div className="flex ml-20">
      <div className="bg-white rounded-lg p-6 space-y-4 w-full">
        <h1 className="text-3xl font-bold">New To Kuber</h1>
        <EmblaCarousel slides={slides} options={{ slidesToScroll: 3 }} />
      </div>
    </div>
  );
};

export default Newtokuber;
