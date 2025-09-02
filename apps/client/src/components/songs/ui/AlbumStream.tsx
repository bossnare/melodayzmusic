import ChevronControl from './ChevronControl';
import SoftFade from './SoftFade';
import { type AlbumProps } from '@/types/songs/stream.interface';
import { useEmblaProgress } from '@/hooks/useEmblaProgress';

const AlbumStream = ({ children }: AlbumProps) => {
  const { emblaRef, showFadeStart, showFadeEnd } = useEmblaProgress(
    true,
    1,
    0.6,
    'center'
  );

  return (
    <section>
      <h3 className="text-section">Albums</h3>
      <div className="relative">
        <ChevronControl />
        <div
          ref={emblaRef}
          className="overflow-hidden scroll-smooth scrollbar-none"
        >
          <div className="grid grid-flow-col auto-cols-[calc(100vw)] sm:auto-cols-[calc(100vw/4.6)] lg:auto-cols-[calc(100vw/8)] gap-4 lg:gap-5">
            {children}
          </div>
        </div>
        <SoftFade showFadeStart={showFadeStart} showFadeEnd={showFadeEnd} />
      </div>
    </section>
  );
};

export default AlbumStream;
