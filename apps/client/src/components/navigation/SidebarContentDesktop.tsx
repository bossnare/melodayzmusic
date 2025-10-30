'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useActivePath } from '@/hooks/useActivePath';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { Settings2 } from 'lucide-react';
import { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { Tabs } from './Tab';
import { navLabels } from './labels/navigation.link';

const SidebarContentDesktop = () => {
  const href = '/dashboard/profile';
  const { user, isFetchingMe, fetchMe } = useUser();
  const isActive = useActivePath(href);
  const { isPending, handleClickTab } = useLoadingPath(href);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <>
      <figure className="flex w-full gap-2 mt-4 mb-3">
        <figcaption
          onClick={handleClickTab}
          className="flex gap-3 cursor-pointer grow active:bg-muted/80 lg:hover:bg-muted/50"
        >
          <div className="relative">
            <Avatar
              className={cn(
                isActive ? 'ring-primary' : 'ring-muted',
                'size-10 border border-current/50 ring-2 -ring-offset-4'
              )}
            >
              <AvatarImage
                className="object-cover"
                alt="fallback"
                src="/img/profil/man-pp.jpg"
              />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {isPending && (
              <div className="absolute -translate-x-1/2 -translate-y-1/2 border-4 rounded-full left-1/2 top-1/2 size-12 border-primary/50 animate-spin border-t-transparent"></div>
            )}
          </div>
          <div className="flex flex-col grow">
            {isFetchingMe ? (
              <>
                <Skeleton className="h-5 rounded-sm w-8/9 bg-foreground/30" />
                <Skeleton className="w-4/5 h-3 mt-1 rounded-sm bg-foreground/30" />
              </>
            ) : (
              <>
                <span className="text-base font-semibold capitalize truncate line-clamp-1">
                  {user?.pseudo || 'Utilisateur(e)'}
                </span>
                <span className="text-xs text-muted-foreground">
                  @{user?.username || 'utilisateur'}
                </span>
              </>
            )}
          </div>
        </figcaption>
        <Settings2 className="cursor-pointer shrink-0 hover:opacity-60" />
      </figure>
      <Separator />
      <ul className="flex flex-col w-full p-1 mt-3 rounded-md bg-background/90 dark:bg-card/50">
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
