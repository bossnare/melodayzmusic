'use client';

import { ChevronDown, ChevronUp, Settings, ShieldUser } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

export const Aside = () => {
  const [isDown, setIsDown] = useState(true);

  return (
    <aside
      id="side-bar"
      className="fixed top-0 left-0 flex-none overflow-y-auto -translate-x-full bg-white z-6 xl:translate-x-0 dark:bg-gray-950/98 h-dvh"
    >
      <div className="hidden px-2 pt-4 pb-2 lg:block">
        <figure className="flex items-center gap-2">
          <Image
            className="w-8"
            alt="meloicon"
            src={'/icons/meloicon_x65.svg'}
            loading="lazy"
            width={100}
            height={100}
          />
          <h2 className="text-2xl font-extrabold select-none text-gradient">
            MelodayzMusic
          </h2>
        </figure>
      </div>
      <div className="relative h-full select-none">
        <div
          className="*:py-3 *:px-1 *:min-w-10 *:text-left *:rounded-md flex flex-col *:flex *:gap-2 
        *:items-center *:hover:bg-gray-100 dark:*:hover:bg-gray-900 *:transition-all *:duration-200 
        *:ease-in gap-1 pt-2 pb-10 px-2"
        >
          <div className="flex flex-col *:px-2 *:flex !p-0 *:py-3 *:w-full overflow-hidden !gap-0">
            <div
              className="gap-2 cursor-pointer"
              onClick={() => {
                setIsDown(!isDown);
              }}
            >
              <ShieldUser className="text-xl" />{' '}
              <span className="hidden font-semibold lg:block">Moi</span>
              <button className={'ml-auto'}>
                {isDown ? <ChevronUp /> : <ChevronDown />}
              </button>
            </div>
            <ul
              className={`flex-col bg-gray-50 dark:bg-gray-900 dark:*:hover:!bg-gray-900 gap-4 *:hover:!bg-gray-100 *:text-gray-700 dark:*:text-gray-300
                *:!bg-transparent **:bg-transparent *:flex **:flex **:items-center *:items-center *:gap-2 
                **:gap-2 !px-2 !py-0 border border-gray-200 dark:border-gray-800 rounded-md rounded-t-none overflow-hidden 
                transition-opacity ease-in-out duration-500 will-change-auto ${
                  isDown
                    ? 'min-h-20 !pt-2 !pb-2 opacity-100'
                    : 'opacity-0 h-0 border-0'
                }`}
            >
              <Link href="">
                <Settings />
                <span>Paramètres</span>
              </Link>
            </ul>
          </div>
          {/* <Link
            className={({ isActive }) => (isActive ? "active" : "undefined")}
            to="/dashboard/profile"
          >
            <User className="text-2xl" />
            <span className="select-none">Profil</span>
          </Link> */}
        </div>
        {/* <a className={` sticky container right-0 flex justify-center bg-gray-100/50 items-center bottom-0 h-14 w-full font-bold`}>
          <button
            onClick={logout}
            className="w-48 py-2 rounded-md"
          >
            Deconnexion
          </button>
        </a> */}
      </div>
    </aside>
  );
};
