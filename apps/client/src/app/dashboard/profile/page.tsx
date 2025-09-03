'use client';

import { MotionButton } from '@/components/motions/motionButton';
import NavProfile from '@/components/navigation/NavProfile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [isStar, setIsStar] = useState(false);

  return (
    <section>
      <NavProfile />

      {/* Profile content */}
      <div className="py-2 flex gap-4 items-center">
        <Avatar className="size-30 lg:size-38 ring-4 ring-muted ">
          <AvatarImage
            className="object-cover"
            alt="lildurk"
            src="/img/profil/lil-durk.jpg"
          />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
        {/* name */}
        <div className="space-y-1">
          <h3 className="text-2xl lg:text-3xl font-bold capitalize">
            Lil Durk
          </h3>
          <p className="text-muted-foreground text-base lg:text-lg">Artiste</p>
        </div>
        {/* btn action */}
        <div className="ml-auto">
          <MotionButton onClick={() => setIsStar(!isStar)}>
            <Star
              className={cn(
                isStar && 'fill-current stroke-0',
                'size-8 lg:size-10'
              )}
            />
          </MotionButton>
        </div>
      </div>
      {/* About */}
      {/* <Card className="p-0 border-none">
        <CardContent>
          <p>Artist</p>
        </CardContent>
        <CardTitle>ArtistName</CardTitle>
      </Card> */}
    </section>
  );
}

