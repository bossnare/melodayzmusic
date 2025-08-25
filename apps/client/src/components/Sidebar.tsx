'use client';

import Image from 'next/image';
import { SheetContent, SheetTitle } from './ui/sheet';

export const Sidebar = () => {
  return (
    <>
      {/* sidebar desktop */}
      <aside
        id="side-bar"
        className="fixed lg:w-64 top-0 left-0 flex-none overflow-y-auto hidden bg-white 
        z-6 lg:block dark:bg-gray-950/90 md:h-[calc(100dvh-5rem)]"
      >
        <div className="hidden px-2 pt-4 pb-2 lg:block">
          <figure className="flex items-center gap-2">
            <Image
              className="w-8"
              alt="meloicon"
              src={'/icons/icon_x32.svg'}
              loading="lazy"
              width={100}
              height={100}
            />
            <h2 className="text-2xl font-black select-none font-poppins text-gradient">
              MelodayzMusic
            </h2>
          </figure>
        </div>
      </aside>

      {/* sidebar mobile  */}
      <div className="block lg:!hidden">
        <SheetContent side="left" className="bg-gray-950 dark:border-gray-800">
          <SheetTitle></SheetTitle>
        </SheetContent>
      </div>
    </>
  );
};
