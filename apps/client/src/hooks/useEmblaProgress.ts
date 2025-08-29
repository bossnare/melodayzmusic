import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

const useEmblaProgress = (
  dragFree: boolean,
  slidesScroll: number,
  threshold: number
) => {
  const [showFadeStart, setShowFadeStart] = useState(false);
  const [showFadeEnd, setShowFadeEnd] = useState(true);
  const [progress, setProgress] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: dragFree,
    slidesToScroll: slidesScroll,
    inViewThreshold: threshold,
    containScroll: 'trimSnaps',
  });

  useEffect(() => {
    if (!emblaApi) return;

    const updateProgress = () => {
      setProgress(emblaApi.scrollProgress());
      setShowFadeStart(progress > 0);
      setShowFadeEnd(progress < 1);
    };

    emblaApi.on('scroll', updateProgress);
    emblaApi.on('reInit', updateProgress);
  }, [emblaApi, progress]);

  return { emblaRef, progress, emblaApi, showFadeStart, showFadeEnd };
};

export { useEmblaProgress };
