'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Logo } from '../branding/logo';
import { SheetContent, SheetDescription, SheetTitle } from '../ui/sheet';
import { SidebarContentDesktop } from './SidebarContentDesktop';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Settings2 } from 'lucide-react';

export const Sidebar = () => {
  const router = useRouter();

  return (
    <>
      {/* desktop sidebar */}
      <aside
        id="side-bar"
        className="fixed text-sidebar-foreground lg:w-64 top-0 left-0 overflow-y-auto hidden 
        z-6 lg:block bg-sidebar md:h-[calc(100dvh-5rem)] px-3 border-r dark:border-border"
      >
        <div
          className="hidden py-2 cursor-pointer lg:block active:opacity-80 lg:hover:opacity-80"
          onClick={() => router.push('/dashboard')}
        >
          <figure className="flex items-center gap-1">
            <Image
              className="w-8 drop-shadow-md dark:invert"
              alt="MelodayzMusic"
              src={'/icons/icon_x32.svg'}
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
          {/* content */}
          <SheetDescription className="px-4">
            <figure className="flex items-center w-full gap-4 mt-2 mb-3">
              <figcaption className="flex gap-3 cursor-pointer grow active:bg-muted/80 lg:hover:bg-muted/50">
                <Avatar className="size-10 ring-2 ring-primary">
                  <AvatarImage
                    className="object-cover"
                    alt="omahlay"
                    src="/img/profil/omah_lay.jpg"
                  />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base font-semibold">John Doe</span>
                  <span className="text-xs text-muted-foreground">Fan</span>
                </div>
              </figcaption>
              <Settings2 className="cursor-pointer hover:opacity-60" />
            </figure>
          </SheetDescription>
        </SheetContent>
      </div>
    </>
  );
};
