'use client';

import { Overlay } from '@/components/motions/Overlay';
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
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { type UserInterface } from '@/types/users/user.interface';
import { LogOut, Settings2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Logo } from '../branding/logo';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import {
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetTitle,
} from '../ui/sheet';
import { SidebarContentDesktop } from './SidebarContentDesktop';
import { Wrapper } from '@/components/motions/wrapper/wrapper';
import { getInitials } from '@/utils/get-name.strings';

type Props = {
  user: UserInterface | null;
};

export const Sidebar = ({
  user,
  isFetchingMe,
}: Props & { isFetchingMe?: boolean }) => {
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
    }, 2500);
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
      <div className="block bg-sidebar lg:hidden!">
        <SheetContent side="left" className="w-6/7">
          <SheetTitle className="p-2">
            <Logo />
          </SheetTitle>
          {/* content */}
          <SheetDescription className="px-4 space-y-4">
            <figure className="w-full mt-2 space-y-2">
              <figcaption className="flex justify-between">
                <Avatar className="border border-current/50 size-14 ring-2 -ring-offset-4 ring-muted">
                  {isFetchingMe ? (
                    <Skeleton className="size-full rounded-full bg-foreground/30" />
                  ) : (
                    <div className="size-full text-muted-foreground flex justify-center items-center bg-muted text-lg font-black font-montserrat">
                      {getInitials(user?.pseudo)}
                    </div>
                  )}
                </Avatar>
                {!isFetchingMe && (
                  <Settings2 className="p-2 cursor-pointer active:bg-muted size-12 active:opacity-60 text-foreground lg:hover:opacity-60" />
                )}
              </figcaption>
              {isFetchingMe ? (
                <div className="w-full">
                  <Skeleton className="h-6 rounded-sm w-8/9 bg-foreground/30" />
                  <Skeleton className="w-4/5 h-4 mt-1 rounded-sm bg-foreground/30" />
                </div>
              ) : (
                <div className="inline-flex flex-col cursor-pointer active:bg-muted lg:hover:bg-muted/50">
                  <span className="text-lg font-bold capitalize font-montserrat text-foreground">
                    {user?.pseudo || 'Utilisateur(e)'}
                  </span>
                  <span className="text-[14px] text-muted-foreground truncate line-clamp-1">
                    @{user?.username || 'utilisateur'} -{' '}
                    {user?.role === 'USER'
                      ? 'Fan'
                      : user?.role?.toLocaleUpperCase() || 'Fan'}
                  </span>
                </div>
              )}
            </figure>

            <Separator />
          </SheetDescription>
          <SheetFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="hover:text-inherit! font-montserrat lg:hover:text-primary active:text-primary! active:bg-muted"
                  size="xl"
                >
                  <LogOut /> Quitter l&apos;espace
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Wrapper>
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
                    <AlertDialogCancel className="font-montserrat h-12 lg:h-auto border-none bg-muted">
                      Non
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="font-montserrat h-12 lg:h-auto bg-secondary font-semibold text-secondary-foreground"
                      onClick={logout}
                    >
                      Oui, quitter
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </Wrapper>
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
