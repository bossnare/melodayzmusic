import ChevronControl from './ChevronControl';
import { useEffect, useRef, useState } from 'react';
import SoftFade from './SoftFade';
import { type AlbumProps } from '@/types/songs/stream.interface';
import useEmblaCarousel from 'embla-carousel-react';

const AlbumStream = ({ children }: AlbumProps) => {
  const [showFadeStart, setShowFadeStart] = useState(false);
  const [showFadeEnd, setShowFadeEnd] = useState(true);
  const albumRef = useRef<HTMLDivElement>(null);
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  useEffect(() => {
    const el = albumRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShowFadeStart(el.scrollLeft > 0);
      setShowFadeEnd(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [albumRef]);

  return (
    <section>
      <h3 className="text-section">Albums</h3>
      <div className="relative">
        <ChevronControl />
        <div
          ref={(node) => {
            emblaRef(node);
            albumRef.current = node;
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

export default AlbumStream;
