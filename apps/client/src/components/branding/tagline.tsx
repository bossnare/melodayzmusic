'use client';

import { usePathname } from 'next/navigation';
import { ModeToggle } from '../themes/mode-toggle';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export const Tagline = ({ showMore = true }: { showMore?: boolean }) => {
  const [isNeedLogo, setIsNeddLogo] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsNeddLogo(pathname === '/auth/register/congratulation');
  }, [pathname]);

  return (
    <>
      {showMore && (
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
        </>
      )}

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
