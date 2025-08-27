import { cn } from '@/lib/utils';

interface SoftFadeProps {
  showFadeStart: boolean;
  showFadeEnd: boolean;
}

const SoftFade = ({ showFadeStart, showFadeEnd }: SoftFadeProps) => {
  return (
    <>
      {/* left overlay */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-8 sm:w-10 transition-opacity duration-300 ease-in-out pointer-events-none md:w-12 bg-gradient-to-r from-gray-950/65 to-transparent z-2',
          !showFadeStart && 'opacity-0'
        )}
      ></div>
      {/* right overlay */}
      <div
        className={cn(
          'absolute inset-y-0 right-0 transition-opacity duration-300 ease-in-out w-8 sm:w-10 pointer-events-none md:w-12 bg-gradient-to-l from-gray-950/65 to-transparent z-2',
          !showFadeEnd && 'opacity-0'
        )}
      ></div>
    </>
  );
};

export default SoftFade;
