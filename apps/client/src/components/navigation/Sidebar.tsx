'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Logo } from '../branding/logo';
import { SheetContent, SheetDescription, SheetTitle } from '../ui/sheet';
import { SidebarContentDesktop } from './SidebarContentDesktop';

export const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      {/* desktop sidebar */}
      <aside
        id="side-bar"
        className="fixed lg:w-64 top-0 left-0 overflow-y-auto hidden 
        z-6 lg:block bg-sidebar md:h-[calc(100dvh-5rem)] px-2 border-r dark:border-border"
      >
        <div
          className="hidden px-2 py-2 cursor-pointer lg:block active:opacity-80 lg:hover:opacity-80"
          onClick={() => router.push('/dashboard')}
        >
          <figure className="flex items-center gap-1">
            <Image
              className="w-7 drop-shadow-md invert dark:invert-0"
              alt="MelodayzMusic"
              src={'/icons/icon_x32_dark.svg'}
              loading="lazy"
              width={1000}
              height={1000}
            />
            <h2 className="text-xl font-black select-none font-montserrat">
              MELODAYZMUSIC
            </h2>
          </figure>
        </div>

        {/* content */}
        <SidebarContentDesktop />
      </aside>

      {/*  mobile sidebar  */}
      <div className="block bg-sidebar lg:!hidden">
        <SheetContent side="left" className="w-6/7">
          <SheetTitle className="p-2">
            <Logo onClick={() => router.push('/dashboard')} />
          </SheetTitle>
          <SheetDescription className="p-4">This a sidebar</SheetDescription>
        </SheetContent>
      </div>
    </>
  );
};
