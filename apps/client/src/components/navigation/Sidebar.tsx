'use client';

import { Settings2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Logo } from '../branding/logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetFooter,
} from '../ui/sheet';
import { SidebarContentDesktop } from './SidebarContentDesktop';
import { useTransition, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Loader } from '../motions/Loader';

export const Sidebar = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const pending = isPending || isLoading;

  const logout = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.removeItem('access_token');
      startTransition(() => router.replace('/auth/login'));
    }, 3000);
  };

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
              <figcaption className="flex gap-3 cursor-pointer grow active:bg-muted lg:hover:bg-muted/50">
                <Avatar className="size-12 ring-2 ring-primary">
                  <AvatarImage
                    className="object-cover"
                    alt="omahlay"
                    src="/img/profil/omah_lay.jpg"
                  />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-base font-semibold text-foreground">
                    Omah Lay
                  </span>
                  <span className="text-xs text-muted-foreground">Artiste</span>
                </div>
              </figcaption>
              <Settings2 className="active:bg-muted size-8 cursor-pointer active:opacity-60 lg:hover:opacity-60" />
            </figure>
          </SheetDescription>
          <SheetFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:!text-inherit lg:hover:text-primary active:!text-primary"
                >
                  <LogOut /> Quitter l&apos;espace
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Confirmation de déconnexion
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Tu vas couper le son et clore ta session — prêt·e à te
                    déconnecter du groove ?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuler</AlertDialogCancel>
                  <AlertDialogAction onClick={logout}>
                    Oui, quitter
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>

          {/* ✅ Overlay corrigé */}
          <div
            className={cn(
              'bg-black/50 z-[999] fixed inset-0 flex items-center justify-center',
              pending
                ? 'opacity-0 pointer-events-auto'
                : 'opacity-100 pointer-events-none'
            )}
          >
            <Loader className="size-8 border-6 border-white" />
          </div>
        </SheetContent>
      </div>
    </>
  );
};

