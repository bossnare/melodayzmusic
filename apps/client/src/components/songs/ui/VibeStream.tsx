import ChevronControl from './ChevronControl';
import { useEffect, useRef, useState } from 'react';
import SoftFade from './SoftFade';
import { type VibeProps } from '@/types/songs/stream.interface';
import useEmblaCarousel from 'embla-carousel-react';

const VibeStream = ({ children }: VibeProps) => {
  const [showFadeStart, setShowFadeStart] = useState(false);
  const [showFadeEnd, setShowFadeEnd] = useState(true);
  const vibeRef = useRef<HTMLDivElement>(null);
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  useEffect(() => {
    const el = vibeRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowFadeStart(el.scrollLeft > 0);
      setShowFadeEnd(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [vibeRef]);

  return (
    <section>
      <h3 className="text-section">Fresh Vibes</h3>
      <div className="relative">
        <ChevronControl />
        <div
          ref={(node) => {
            emblaRef(node);
            vibeRef.current = node;
          }}
          className="overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-none"
        >
          <div className="grid grid-flow-col auto-cols-[calc(100vw/2)] sm:auto-cols-[calc(100vw/4)] lg:auto-cols-[calc(100vw/7)] gap-5 sm:gap-6">
            {children}
          </div>
        </div>
        <SoftFade showFadeStart={showFadeStart} showFadeEnd={showFadeEnd} />
      </div>
    </section>
  );
};

export default VibeStream;
