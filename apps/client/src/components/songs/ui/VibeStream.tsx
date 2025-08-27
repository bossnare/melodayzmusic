import { useEmblaProgress } from '@/hooks/useEmblaProgress';
import ChevronControl from './ChevronControl';
import SoftFade from './SoftFade';
import { type VibeProps } from '@/types/songs/stream.interface';

const VibeStream = ({ children }: VibeProps) => {
  const { emblaRef, showFadeStart, showFadeEnd } = useEmblaProgress();

  return (
    <section>
      <h3 className="text-section">Fresh Vibes</h3>
      <div className="relative">
        <ChevronControl />
        <div
          ref={emblaRef}
          className="overflow-x-auto overflow-hidden scroll-smooth scrollbar-none"
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
