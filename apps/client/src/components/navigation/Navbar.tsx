'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import SearchBar from './SeachBar';
import { ModeToggle } from '../themes/mode-toggle';
import { SearchIcon } from 'lucide-react';

export const NavBar = () => {
  const [notHome, setNotHome] = useState(false);
  const [isNull, setIsNull] = useState(true); // for search bar behavior
  const pathname = usePathname();

  useEffect(() => {
    setNotHome(pathname !== '/dashboard');
  }, [pathname]);

  return (
    <nav className="relative flex items-center gap-3 lg:gap-4">
      <div className="lg:!hidden grow">
        <figure className="flex items-center gap-1">
          <Image
            className={cn(notHome && '!w-6', 'w-7')}
            alt="meloicon"
            src={'/icons/icon_x32.svg'}
            loading="lazy"
            width={1000}
            height={1000}
          />
          <h2
            className={cn(
              notHome && '!text-lg',
              'text-xl font-black will-change-auto transition-all ease-in-out duration-100 select-none font-poppins text-gradient'
            )}
          >
            MelodayzMusic
          </h2>
        </figure>
      </div>
      <SearchBar isNull={isNull} setIsNull={setIsNull} />

      {/* theme toggle */}
      <div className="ml-auto">
        <ModeToggle />
      </div>
      {/* for result recommendation */}
      {!isNull && (
        <div
          className="absolute z-20 flex flex-col gap-1 items-center 
      lg:justify-center justify-start w-full px-2 py-10 lg:rounded-xl shadow-3xl h-[calc(100dvh-5rem)] top-[49px] 
      lg:top-[50px] lg:w-6/7 bg-background lg:bg-muted/95 backdrop-blur-sm lg:h-80"
        >
          <SearchIcon className="size-15 lg:size-20" />
          <span className="text-muted-foreground">Aucun résultat.</span>
        </div>
      )}
    </nav>
  );
};
