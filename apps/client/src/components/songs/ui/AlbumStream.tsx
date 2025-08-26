import ChevronControl from './ChevronControl';
import { useEffect, useRef, useState } from 'react';
import SoftFade from './SoftFade';
import { type AlbumProps } from '@/types/songs/stream.interface';
import useEmblaCarousel from 'embla-carousel-react';

const AlbumStream = ({ children }: AlbumProps) => {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const albumRef = useRef<HTMLDivElement>(null);
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps',
  });

  useEffect(() => {
    const el = albumRef.current;
    if (!el) return;

    const handleScroll = () => {
      setAtStart(el.scrollLeft === 0);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth);
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
        <SoftFade atStart={atStart} atEnd={atEnd} />
      </div>
    </section>
  );
};

export default AlbumStream;
