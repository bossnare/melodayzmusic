import { useEmblaProgress } from '@/hooks/useEmblaProgress';
import { type TopArtistProps } from '@/types/songs/stream.interface';

const TopArtist = ({ children, pseudo }: TopArtistProps) => {
  const { emblaRef } = useEmblaProgress(true, 2, 0.6, 'start', true);

  return (
    <section>
      <h3 className="flex items-center gap-2 pb-4 text-section">
        Artistes recommandés pour {pseudo || 'vous'}
      </h3>
      <div
        ref={emblaRef}
        className="p-1 overflow-hidden scroll-smooth scrollbar-none"
      >
        <div
          className="grid grid-flow-col auto-cols-[calc(100vw/3)] sm:auto-cols-[calc(100vw/6)] 
        lg:auto-cols-[calc(100vw/8)] gap-4 lg:gap-5"
        >
          {children}
        </div>
      </div>
    </section>
  );
};

export default TopArtist;
