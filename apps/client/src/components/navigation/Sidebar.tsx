'use client';

import Image from 'next/image';
import { SheetContent, SheetTitle } from '../ui/sheet';
import { SidebarContentDesktop } from './SidebarContentDesktop';

export const Sidebar = () => {
  return (
    <>
      {/* sidebar desktop */}
      <aside
        id="side-bar"
        className="fixed lg:w-62 xl:w-64 top-0 left-0 overflow-y-auto hidden bg-white 
        z-6 lg:block dark:bg-sidebar md:h-[calc(100dvh-5rem)] px-2 border-r dark:border-border"
      >
        <div className="hidden px-2 py-2 lg:block">
          <figure className="flex items-center gap-1">
            <Image
              className="w-7"
              alt="meloicon"
              src={'/icons/icon_x32.svg'}
              loading="lazy"
              width={100}
              height={100}
            />
            <h2 className="text-[22px] font-black select-none font-poppins text-gradient">
              MelodayzMusic
            </h2>
          </figure>
        </div>

        {/* content */}
        <SidebarContentDesktop />
      </aside>

      {/* sidebar mobile  */}
      <div className="block bg-sidebar lg:!hidden">
        <SheetContent side="left">
          <SheetTitle></SheetTitle>
        </SheetContent>
      </div>
    </>
  );
};
