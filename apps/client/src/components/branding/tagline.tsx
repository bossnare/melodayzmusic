'use client';

import { usePathname } from 'next/navigation';
import { ModeToggle } from '../themes/mode-toggle';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const Tagline = () => {
  const [isNeedLogo, setIsNeddLogo] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsNeddLogo(pathname === '/auth/register/congratulation');
  }, [pathname]);

  return (
    <>
      {!isNeedLogo ? (
        <div className="pb-3 lg:hidden">
          <ModeToggle />
        </div>
      ) : (
        <div className="pb-2">
          <Image
            alt="MelodayzMusic"
            className="size-10 dark:invert"
            width={1000}
            height={1000}
            src="/icons/icon_x32.svg"
          />
        </div>
      )}

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
