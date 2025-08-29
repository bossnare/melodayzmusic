import ChevronControl from './ChevronControl';
import SoftFade from './SoftFade';
import { type AlbumProps } from '@/types/songs/stream.interface';
import { useEmblaProgress } from '@/hooks/useEmblaProgress';

const AlbumStream = ({ children }: AlbumProps) => {
  const { emblaRef, showFadeStart, showFadeEnd } = useEmblaProgress(
    false,
    1,
    0.6
  );

  return (
    <section>
      <h3 className="text-section">Albums</h3>
      <div className="relative">
        <ChevronControl />
        <div
          ref={emblaRef}
          className="overflow-hidden overflow-x-auto scroll-smooth scrollbar-none"
        >
          <div className="grid grid-flow-col auto-cols-[calc(100vw/2)] sm:auto-cols-[calc(100vw/5)] lg:auto-cols-[calc(100vw/8)] gap-4 lg:gap-5">
            {children}
          </div>
        </div>
        <SoftFade showFadeStart={showFadeStart} showFadeEnd={showFadeEnd} />
      </div>
    </section>
  );
};

export default AlbumStream;
