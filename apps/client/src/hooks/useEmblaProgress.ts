import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

const useEmblaProgress = () => {
  const [showFadeStart, setShowFadeStart] = useState(false);
  const [showFadeEnd, setShowFadeEnd] = useState(true);
  const [progress, setProgress] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: false,
    watchDrag: false,
    align: 'center',
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
