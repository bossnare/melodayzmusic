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
import { motion } from 'motion/react';
import { Overlay } from '@/components/motions/Overlay';
import { type UserInterface } from '@/types/users/user.interface';

type Props = {
  user: UserInterface | null;
};

export const Sidebar = ({
  user,
  fetchingMe,
}: Props & { fetchingMe?: boolean }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const pending = isPending || isLoading;

  const logout = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.removeItem('access_token');
      sessionStorage.removeItem('ignore_otp');
      startTransition(() => router.replace('/auth/login'));
    }, 4000);
  };

  return (
    <>
      {/* desktop sidebar */}
      <aside
        id="side-bar"
        className="fixed text-sidebar-foreground lg:w-64 top-0 left-0 overflow-y-auto hidden 
        z-6 lg:block bg-sidebar md:h-[calc(100dvh-5rem)] px-3 border-r dark:border-border"
      >
        <div className="hidden py-2 cursor-pointer lg:block active:opacity-80 lg:hover:opacity-80">
          <figure className="flex items-center gap-1">
            <Image
              className="w-8 drop-shadow-md dark:invert"
              alt="MelodayzMusic"
              src={'/icons/icon_x32.svg'}
              loading="lazy"
              width={1000}
              height={1000}
            />
            <h2
              translate="no"
              className="text-xl font-black select-none font-montserrat"
            >
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
            <Logo />
          </SheetTitle>
          {/* content */}
          <SheetDescription className="px-4">
            <figure className="flex w-full gap-4 mt-2 mb-3">
              <figcaption className="flex gap-3 cursor-pointer grow active:bg-muted lg:hover:bg-muted/50">
                <Avatar className="size-14 ring-2 border border-current ring-muted">
                  <AvatarImage
                    className="object-cover"
                    alt="omahlay"
                    src="/img/profil/man-pp.jpg"
                  />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-full">
                  {fetchingMe ? (
                   <>
                    <div className="w-8/9 h-5 rounded-sm bg-foreground/30 animate-pulse"></div>
                     <div className="w-4/5 h-2 mt-1 rounded-sm bg-foreground/30 animate-pulse"></div>
                   </>
                  ) : (
                    <>
                      <span className="text-base capitalize font-semibold font-montserrat text-foreground/80">
                        {user?.pseudo}
                      </span>
                      <span className="text-[14px] text-muted-foreground">
                        @{user?.username} • {user?.role === 'USER' ? 'Fan' : 'Utilisateur(e)'}
                      </span>
                    </>
                  )}
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
                  className="hover:!text-inherit lg:hover:text-primary active:!text-primary active:bg-muted"
                >
                  <LogOut /> Quitter l&apos;espace
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <motion.div
                  key={'logout'}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 50 }}
                  className="space-y-4"
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Confirmation de déconnexion
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Tu vas couper le son et clore ta session, prêt(e) à te
                      déconnecter du groove ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="font-montserrat">
                      Non
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="font-montserrat"
                      onClick={logout}
                    >
                      Oui, quitter
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </motion.div>
              </AlertDialogContent>
            </AlertDialog>
          </SheetFooter>
        </SheetContent>

        {/* ✅ Overlay */}
        <Overlay textLoading="Déconnexion..." isPending={pending} />
      </div>
    </>
  );
};

