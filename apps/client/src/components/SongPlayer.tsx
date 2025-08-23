'use client';

import { PauseCircle, PlayCircle, SkipBack, SkipForward } from 'lucide-react';
import { MotionButton } from './motions/motionButton';
import { useState } from 'react';
import Image from 'next/image';
import { Slider } from './ui/slider';

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
      <div className="flex items-center justify-center flex-col flex-wrap h-full space-y-3 grow">
        {/* forward and back, pause/play controls */}
        <div className="space-x-4 w-full flex items-center justify-center">
          <MotionButton className="text-muted">
            <SkipBack className="size-auto" />
          </MotionButton>
          <MotionButton className="text-muted" onClick={() => setIsGo(!isGo)}>
            {isGo ? (
              <PauseCircle className="size-11" />
            ) : (
              <PlayCircle className="size-11" />
            )}
          </MotionButton>
          <MotionButton className="text-muted">
            <SkipForward className="size-auto" />
          </MotionButton>
        </div>
        {/* Slider control */}
        <div className="w-[30%] pb-3">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Player;
