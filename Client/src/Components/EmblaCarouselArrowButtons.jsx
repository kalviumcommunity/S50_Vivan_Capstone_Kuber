// EmblaCarouselArrowButtons.jsx
import React from 'react';

export const PrevButton = ({ onClick, disabled }) => (
  <button
    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-80 border-none p-2 cursor-pointer z-10"
    onClick={onClick}
    disabled={disabled}
  >
    <svg className="w-5 h-5 fill-current" viewBox="0 0 532 532">
      <path d="M399.39 121.51a26.39 26.39 0 0 1 0 37.28L224.2 334.4a26.39 26.39 0 0 1-37.29 0L79.51 227.39a26.39 26.39 0 0 1 0-37.28l37.28-37.29a26.39 26.39 0 0 1 37.28 0L212.65 225l112.18-112.18a26.39 26.39 0 0 1 37.28 0l37.28 37.29z"/>
    </svg>
  </button>
);

export const NextButton = ({ onClick, disabled }) => (
  <button
    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-80 border-none p-2 cursor-pointer z-10"
    onClick={onClick}
    disabled={disabled}
  >
    <svg className="w-5 h-5 fill-current" viewBox="0 0 532 532">
      <path d="M132.61 410.49a26.39 26.39 0 0 1 0-37.28l175.19-175.61a26.39 26.39 0 0 1 37.29 0L452.49 304.61a26.39 26.39 0 0 1 0 37.28l-37.28 37.29a26.39 26.39 0 0 1-37.28 0L319.35 307l-112.18 112.18a26.39 26.39 0 0 1-37.28 0l-37.28-37.29z"/>
    </svg>
  </button>
);

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = React.useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = React.useState(true);

  const onPrevButtonClick = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const onNextButtonClick = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick };
};
