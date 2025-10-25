import { useEmblaProgress } from '@/hooks/useEmblaProgress';
import ChevronControl from './ChevronControl';
import SoftFade from './SoftFade';
import { type VibeProps } from '@/types/songs/stream.interface';

const VibeStream = ({ children, pseudo }: VibeProps & {pseudo?: string}) => {
  const { emblaRef, showFadeStart, showFadeEnd } = useEmblaProgress(
    false,
    1,
    0.25,
    'start',
    true
  );

  return (
    <section>
      <h3 className="text-section">Fait pour {pseudo || 'vous'}</h3>
      <div className="relative">
        <ChevronControl className="top-[30%]" />
        <div
          ref={emblaRef}
          className="overflow-hidden scroll-smooth scrollbar-none"
        >
          <div className="grid grid-flow-col auto-cols-[calc(100vw/2.5)] sm:auto-cols-[calc(100vw/4.6)] lg:auto-cols-[calc(100vw/8)] gap-4 lg:gap-5">
            {children}
          </div>
        </div>
        <SoftFade showFadeStart={showFadeStart} showFadeEnd={showFadeEnd} />
      </div>
    </section>
  );
};

export default VibeStream;
