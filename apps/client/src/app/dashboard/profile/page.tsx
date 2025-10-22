'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@/hooks/useUser';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [isStar, setIsStar] = useState(false);
  const { user, fetchMe, isFetchingMe } = useUser();

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <section>
      {/* Profile content */}
      <div className="flex flex-col gap-4 py-4 md:items-center md:flex-row lg:pt-10">
        <Avatar className="border size-40 lg:size-38 border-current ring-2 -ring-offset-4 ring-muted ">
          <AvatarImage
            className="object-cover"
            alt="fallback"
            src="/img/profil/man-pp.jpg"
          />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        {/* name */}
        <div className="relative grow">
          {isFetchingMe ? (
            <>
              <Skeleton className="h-8 w-8/9 bg-foreground/30" />
              <Skeleton className="w-4/5 h-4 mt-2 bg-foreground/30" />
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold capitalize font-montserrat lg:text-3xl">
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
              <MotionButton onClick={() => setIsStar(!isStar)}>
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
