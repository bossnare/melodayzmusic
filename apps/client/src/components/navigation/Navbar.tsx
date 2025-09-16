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
  // for search bar behavior
  const [isNull, setIsNull] = useState(true);
  const [openSearch, setOpenSearch] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setNotHome(pathname !== '/dashboard');
  }, [pathname]);

  return (
    <nav className="relative flex items-center gap-3 lg:gap-4">
      {!openSearch && (
        <div className="lg:!hidden grow cursor-pointer active:opacity-80 hover:opacity-80">
          <figure className="flex items-center gap-1">
            <Image
              className={cn(
                notHome && '!w-6',
                'w-7 drop-shadow-md invert dark:invert-0'
              )}
              alt="MelodayzMusic"
              src={'/icons/icon_x32_dark.svg'}
              loading="lazy"
              width={1000}
              height={1000}
            />
            <h2
              className={cn(
                notHome && '!text-lg',
                'text-xl font-black will-change-auto transition-all tracking-wide ease-in-out duration-100 select-none font-montserrat'
              )}
            >
              MELODAYZMUSIC
            </h2>
          </figure>
        </div>
      )}
      {/* for search */}
      <SearchBar
        isNull={isNull}
        setIsNull={setIsNull}
        openSearch={openSearch}
        setOpenSearch={setOpenSearch}
      />

      {/* theme toggle */}
      <div className={cn(openSearch ? 'hidden' : 'block', 'lg:block ml-auto')}>
        <ModeToggle />
      </div>
      {/* for search recommendation */}
      <div
        className={`lg:${isNull ? 'hidden' : 'flex'} ${
          !openSearch ? 'hidden' : 'flex'
        } absolute z-20 flex-col gap-1 items-center 
          lg:justify-center justify-start w-full px-2 py-10 lg:rounded-xl lg:shadow-xl h-[calc(100dvh-5rem)] top-[54px] 
          lg:top-[54px] lg:w-6/7 bg-background lg:bg-muted/95 backdrop-blur-sm lg:h-80`}
      >
        <SearchIcon className="size-15 lg:size-20" />
        <span className="text-muted-foreground">Rechercher avec ta vibe.</span>
      </div>
    </nav>
  );
};
