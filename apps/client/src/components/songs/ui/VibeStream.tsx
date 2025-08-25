import ChevronControl from '../ChevronControl';
import { useEffect, useRef, useState } from 'react';
import SoftFade from '../SoftFade';

interface AlbumProps {
  children: React.ReactNode;
}

const VibeStream = ({ children }: AlbumProps) => {
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const vibeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = vibeRef.current;
    if (!el) return;

    const handleScroll = () => {
      setAtStart(el.scrollLeft === 0);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth);
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
          ref={vibeRef}
          className="overflow-x-auto overflow-y-hidden scrollbar-none"
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

export default VibeStream;
