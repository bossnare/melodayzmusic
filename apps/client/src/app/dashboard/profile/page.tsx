'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [isStar, setIsStar] = useState(false);

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
        <div className="space-y-1">
          <h3 className="text-2xl font-bold capitalize lg:text-3xl">
            Utilisateur(e)
          </h3>
          <p className="text-base text-muted-foreground lg:text-lg">
            Non défini
          </p>
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
