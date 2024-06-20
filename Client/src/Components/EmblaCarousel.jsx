import React from 'react';
import { useEmblaCarousel } from 'embla-carousel-react';
import { PrevButton, NextButton, usePrevNextButtons } from '../EmblaCarouselArrowButtons';

const EmblaCarousel = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

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

export default EmblaCarousel;
