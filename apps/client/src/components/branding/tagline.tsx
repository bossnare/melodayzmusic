import { ModeToggle } from '../themes/mode-toggle';

export const Tagline = () => {
  return (
    <>
      <div className="pb-3 lg:hidden">
        <ModeToggle />
      </div>
      <div className="hidden md:block">
        copyright &copy; {new Date().getFullYear()} |{' '}
        <span className="text-foreground/90">
          Feel the Beat, Anywhere You Go.
        </span>{' '}
        | All Rights Reserved.
      </div>

      <div className="md:hidden flex flex-col gap-1 justify-center items-center">
        <span className="text-foreground/90">
          Feel the Beat, Anywhere You Go.
        </span>{' '}
        copyright &copy; 2025 | All Rights Reserved.
      </div>
    </>
  );
};
