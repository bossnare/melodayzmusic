'use client';

import Image from 'next/image';
import { SheetContent, SheetTitle, SheetDescription } from '../ui/sheet';
import { SidebarContentDesktop } from './SidebarContentDesktop';

export const Sidebar = () => {
  return (
    <>
      {/* sidebar desktop */}
      <aside
        id="side-bar"
        className="fixed lg:w-62 top-0 left-0 overflow-y-auto hidden 
        z-6 lg:block bg-sidebar md:h-[calc(100dvh-5rem)] px-2 border-r dark:border-border"
      >
        <div className="hidden px-2 py-2 lg:block">
          <figure className="flex items-center gap-1">
            <Image
              className="w-7 drop-shadow-md"
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
        <SheetContent side="left" className="w-8/9">
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </div>
    </>
  );
};
