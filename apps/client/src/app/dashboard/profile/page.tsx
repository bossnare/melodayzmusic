'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/useUser';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const [isStar, setIsStar] = useState(false);
  const { user, handleFetchMe, isFetchingMe } = useUser();

  useEffect(() => {
    handleFetchMe();
  }, []);

  return (
    <section>
      {/* Profile content */}
      <div className="flex items-center gap-4 py-4 lg:pt-10">
        <Avatar className="border size-30 lg:size-38 dark:border-primary-foreground ring-4 ring-muted ">
          <AvatarImage
            className="object-cover"
            alt="omahlay"
            src="/img/profil/man-pp.jpg"
          />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        {/* name */}
        <div className="space-y-1 grow">
          {isFetchingMe ? (
            <>
              <Skeleton className="w-8/9 h-8 bg-foreground/30" />
              <Skeleton className="w-4/5 h-4 mt-2 bg-foreground/30" />
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold capitalize lg:text-3xl">
                {user?.pseudo}
              </h3>
              <p className="text-base text-muted-foreground lg:text-lg">
                @{user?.username}
              </p>
            </>
          )}
        </div>
        {/* btn action */}
        <div className="ml-auto">
          <MotionButton onClick={() => setIsStar(!isStar)}>
            <Star
              className={cn(
                isStar && 'fill-current stroke-current',
                'size-8 lg:size-10'
              )}
            />
          </MotionButton>
        </div>
      </div>
    </section>
  );
}
