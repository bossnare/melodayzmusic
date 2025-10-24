'use client';

export const Tagline = () => {
  return (
    <>
      <div className="hidden text-xs md:block font-montserrat text-muted-foreground">
        &copy; {new Date().getFullYear()} |{' '}
        <span className="text-foreground/90">
          MelodayzMusic - Feel the Beat, Anywhere You Go.
        </span>{' '}
        | Tous Droits Réservés.
      </div>

      <div className="flex flex-col items-center justify-center gap-1 text-xs text-muted-foreground md:hidden font-montserrat">
        <span className="text-foreground/90">
          MelodayzMusic - Feel the Beat, Anywhere You Go.
        </span>{' '}
        &copy; 2025 | Tous Droits Réservés.
      </div>
    </>
  );
};
