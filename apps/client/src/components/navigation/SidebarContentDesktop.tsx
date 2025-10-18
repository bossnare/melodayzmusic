'use client';

import { Settings2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Tabs } from './Tab';
import { navLabels } from './labels/navigation.link';
import { useUser } from '@/hooks/useUser';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const SidebarContentDesktop = () => {
  const { user, isFetchingMe, fetchMe } = useUser();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <>
      <figure className="flex w-full gap-2 mt-4 mb-3">
        <figcaption className="flex gap-3 cursor-pointer grow active:bg-muted/80 lg:hover:bg-muted/50">
          <Avatar className="size-10 ring-2 ring-primary">
            <AvatarImage
              className="object-cover"
              alt="omahlay"
              src="/img/profil/man-pp.jpg"
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col grow">
            {isFetchingMe ? (
              <>
                <Skeleton className="h-5 rounded-sm w-8/9 bg-foreground/30" />
                <Skeleton className="w-4/5 h-3 mt-1 rounded-sm bg-foreground/30" />
              </>
            ) : (
              <>
                <span className="text-base font-semibold capitalize">
                  {user?.pseudo || 'Utilisateur(e)'}
                </span>
                <span className="text-xs text-muted-foreground">
                  @{user?.username || 'utilisateur'}
                </span>
              </>
            )}
          </div>
        </figcaption>
        <Settings2 className="cursor-pointer hover:opacity-60" />
      </figure>
      <Separator />
      <ul className="flex flex-col w-full p-1 mt-3 rounded-md bg-background/60 dark:bg-card/50">
        {navLabels.map((tab) => (
          <li key={tab.id}>
            {tab.label === 'Moi' || tab.label === 'create' ? null : (
              <Tabs href={tab.href} Icon={tab.icon} label={tab.label} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export { SidebarContentDesktop };
