'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useToggle } from '@/hooks/use-toggle';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, fetchMe, isFetchingMe } = useUser();
  const { value: isStar, toggle } = useToggle();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <section>
      {/* Profile content */}
      <div className="flex gap-4 py-4 pt-15 lg:pt-16">
        <Avatar className="border size-20 lg:size-30 border-current/50 ring-2 -ring-offset-4 ring-muted ">
          <AvatarImage
            className="object-cover"
            alt="fallback"
            src="/img/fallback/man-pp.jpg"
          />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        {/* name */}
        <div className="relative py-2 grow">
          {isFetchingMe ? (
            <>
              <Skeleton className="h-8 w-8/9 lg:w-2/3 bg-foreground/30" />
              <Skeleton className="w-4/5 h-4 mt-2 lg:w-1/2 bg-foreground/30" />
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold capitalize font-montserrat lg:text-2xl">
                {user?.pseudo || 'Utilisateur(e)'}
              </h3>
              <p className="text-base text-muted-foreground lg:text-lg">
                @{user?.username || 'utilisateur'}
              </p>
            </>
          )}

          {/* btn action */}
          {!isFetchingMe && (
            <div className="absolute top-0 right-0 shrink-0">
              <MotionButton onClick={toggle}>
                <Star
                  className={cn(
                    isStar && 'fill-current stroke-current',
                    'size-8 lg:size-10'
                  )}
                />
              </MotionButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
