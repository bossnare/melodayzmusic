import { ModeToggle } from '../themes/mode-toggle';

export const Tagline = () => {
  return (
    <div className="text-xs text-foreground/90 font-montserrat flex flex-col items-center">
      <div className="py-2 lg:hidden">
        <ModeToggle />
      </div>
      Feel the Beat, Anywhere You Go.
    </div>
  );
};
