'use client';

import { PauseCircle, PlayCircle, SkipBack, SkipForward } from 'lucide-react';
import { MotionButton } from './motions/motionButton';
import { useState } from 'react';
import Image from 'next/image';

const Player = () => {
  const [isGo, setIsGo] = useState(false);
  return (
    <div className="items-center py-1 justify-center hidden w-full h-full gap-4 lg:flex">
      {/* for image cover */}
      <div className="xl:w-64">
        <div className="w-25 h-23 aspect-square rounded-lg overflow-hidden">
          <Image
            src="/img/p6.jpg"
            alt="coverImage"
            className="object-cover size-full"
            height={1000}
            width={1000}
            loading="lazy"
          />
        </div>
      </div>
      {/* for minimal info and controls */}
      <div className="flex items-center justify-center h-full space-x-4 grow">
        <MotionButton className="text-muted-foreground">
          <SkipBack className="size-auto" />
        </MotionButton>
        <MotionButton
          className="text-muted-foreground"
          onClick={() => setIsGo(!isGo)}
        >
          {isGo ? (
            <PauseCircle className="size-12" />
          ) : (
            <PlayCircle className="size-12" />
          )}
        </MotionButton>
        <MotionButton className="text-muted-foreground">
          <SkipForward className="size-auto" />
        </MotionButton>
      </div>
    </div>
  );
};

export default Player;
