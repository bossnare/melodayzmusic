import { cn } from '@/lib/utils';

interface SoftFadeProps {
  atStart: boolean;
  atEnd: boolean;
}

const SoftFade = ({ atStart, atEnd }: SoftFadeProps) => {
  return (
    <>
      {/* left overlay */}
      <div
        className={cn(
          'absolute inset-y-0 left-0 w-8 transition-opacity duration-300 ease-in-out pointer-events-none sm:w-12 bg-gradient-to-r from-gray-950/60 to-transparent z-2',
          atStart && 'opacity-0'
        )}
      ></div>
      {/* right overlay */}
      <div
        className={cn(
          'absolute inset-y-0 right-0 transition-opacity duration-300 ease-in-out w-8 pointer-events-none sm:w-12 bg-gradient-to-l from-gray-950/60 to-transparent z-2',
          atEnd && 'opacity-0'
        )}
      ></div>
    </>
  );
};

export default SoftFade;
