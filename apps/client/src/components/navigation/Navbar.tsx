'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import SearchBar from './SeachBar';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { ModeToggle } from '../themes/mode-toggle';

export const NavBar = () => {
  const [notHome, setNotHome] = useState(false);
  const pathname = usePathname();
  const { isPending, handleClickTab } = useLoadingPath('/dashboard/profile');

  useEffect(() => {
    setNotHome(pathname !== '/dashboard');
  }, [pathname]);

  return (
    <nav className="flex items-center gap-3 lg:gap-4">
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
      <SearchBar />

      {/* theme toggle */}
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </nav>
  );
};
