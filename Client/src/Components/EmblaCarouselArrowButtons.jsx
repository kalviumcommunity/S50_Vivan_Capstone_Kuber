import React from 'react';

export const PrevButton = ({ onClick, disabled }) => (
  <button
    className={`absolute top-1/2 left-4 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
    } bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-amber-400`}
    onClick={onClick}
    disabled={disabled}
    aria-label="Previous slide"
  >
    <svg 
      className="w-6 h-6 text-gray-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

export const NextButton = ({ onClick, disabled }) => (
  <button
    className={`absolute top-1/2 right-4 transform -translate-y-1/2 p-3 rounded-full shadow-lg z-10 transition-all ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
    } bg-white/90 backdrop-blur-sm border border-gray-200 hover:border-amber-400`}
    onClick={onClick}
    disabled={disabled}
    aria-label="Next slide"
  >
    <svg 
      className="w-6 h-6 text-gray-700"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const onPrevButtonClick = React.useCallback(() => {
    emblaApi?.scrollPrev();
    // Remove window.scrollTo
  }, [emblaApi]);

  const onNextButtonClick = React.useCallback(() => {
    emblaApi?.scrollNext();
    // Remove window.scrollTo
  }, [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    
    // Initialize and set up event listeners
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();

    // Cleanup
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return { 
    prevBtnDisabled, 
    nextBtnDisabled, 
    onPrevButtonClick, 
    onNextButtonClick 
  };
};