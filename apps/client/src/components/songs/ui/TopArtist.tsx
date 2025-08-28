import { useEmblaProgress } from '@/hooks/useEmblaProgress';
import { type TopArtistProps } from '@/types/songs/stream.interface';

const TopArtist = ({ children }: TopArtistProps) => {
  const { emblaRef } = useEmblaProgress();

  return (
    <section>
      <h2 className="flex items-center gap-2 text-section">Top Artists</h2>
      <div 
        ref={emblaRef}
        className="overflow-hidden overflow-x-auto scroll-smooth scrollbar-none">
        <div
          className="grid grid-flow-col auto-cols-[calc(100vw/4)] sm:auto-cols-[calc(100vw/8)] 
        lg:auto-cols-[calc(100vw/12)] gap-4 lg:gap-5"
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default TopArtist;
