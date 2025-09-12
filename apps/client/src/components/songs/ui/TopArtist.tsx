import { useEmblaProgress } from '@/hooks/useEmblaProgress';
import { type TopArtistProps } from '@/types/songs/stream.interface';

const TopArtist = ({ children }: TopArtistProps) => {
  const { emblaRef } = useEmblaProgress(true, 2, 0.6, 'start', true);

  return (
    <section>
      <h2 className="flex items-center gap-2 text-section pb-4">Top Artists</h2>
      <div
        ref={emblaRef}
        className="overflow-hidden scroll-smooth scrollbar-none p-1"
      >
        <div
          className="grid grid-flow-col auto-cols-[calc(100vw/6)] sm:auto-cols-[calc(100vw/8)] 
        lg:auto-cols-[calc(100vw/12)] gap-4 lg:gap-5"
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default TopArtist;
