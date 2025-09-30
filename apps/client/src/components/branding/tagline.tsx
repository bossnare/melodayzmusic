import { ModeToggle } from '../themes/mode-toggle';

export const Tagline = () => {
  return (
    <>
      <div className="pb-3 lg:hidden">
        <ModeToggle />
      </div>
      <div className="hidden md:block">
        &copy; {new Date().getFullYear()} |{' '}
        <span className="text-foreground/90">
          MelodayzMusic - Feel the Beat, Anywhere You Go.
        </span>{' '}
        | Tous Droits Réservés.
      </div>

      <div className="md:hidden flex flex-col gap-1 justify-center items-center">
        <span className="text-foreground/90">
          MelodayzMusic - Feel the Beat, Anywhere You Go.
        </span>{' '}
        &copy; 2025 | Tous Droits Réservés.
      </div>
    </>
  );
};
