'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import SearchBar from './SeachBar';
import { useLoadingPath } from '@/hooks/useLoadingPath';

export const NavBar = () => {
  const [notHome, setNotHome] = useState(false);
  const pathname = usePathname();
  const { isPending, handleClickTab } = useLoadingPath('/dashboard/profile');

  useEffect(() => {
    setNotHome(pathname !== '/dashboard');
  }, [pathname]);

  return (
    <nav className="flex items-center gap-3 lg:gap-4">
      {/* mampiasa end, inona? raha samy misy dashboard ilay route dia ilay active foana active fa tsy miaraka index */}
      {/* <button
        className={
          '!hidden rounded-full bg-black/5 border-gray-300 border font-black'
        }
      >
        <Columns2 size={30} />
      </button> */}
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
      {/* <Avatar
        onClick={handleClickTab}
        className={cn(
          isPending && 'animate-pulse',
          'ml-auto cursor-pointer hover:opacity-80 ring-2 ring-border shadow-2xs'
        )}
      >
        <AvatarImage
          className="object-cover"
          alt="fallback"
          src="/img/profil/lil-durk.jpg"
        />
        <AvatarFallback>
          <span className="text-xs">US</span>
        </AvatarFallback>
      </Avatar>*/}
    </nav>
  );
};


