'use client';

import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { MotionButton } from '@/components/motions/motionButton';
import { Slider } from '@/components/ui/slider';

const Player = () => {
  const [isGo, setIsGo] = useState(false);
  return (
    <div className="items-center justify-center hidden w-full h-full gap-4 py-1 lg:flex">
      {/* for image cover */}
      <div className="xl:w-64">
        <div className="overflow-hidden rounded-lg w-25 h-23 aspect-square">
          <Image
            src="/img/p9.jpg"
            alt="coverImage"
            className="object-cover size-full"
            height={1000}
            width={1000}
            loading="lazy"
          />
        </div>
      </div>
      {/* for minimal info and controls */}
      <div className="flex flex-col flex-wrap items-center justify-center h-full space-y-3 grow">
        {/* forward and back, pause/play controls */}
        <div className="flex items-center justify-center w-full space-x-4">
          <MotionButton className="text-muted-foreground">
            <SkipBack className="size-auto" />
          </MotionButton>
          <MotionButton
            className="text-muted-foreground bg-background *:stroke-0 *:fill-current"
            onClick={() => setIsGo(!isGo)}
          >
            {isGo ? <Pause className="size-8" /> : <Play className="size-8" />}
          </MotionButton>
          <MotionButton className="text-muted-foreground">
            <SkipForward className="size-auto" />
          </MotionButton>
        </div>
        {/* Slider control */}
        <div className="w-[20%] pb-3">
          <Slider />
        </div>
      </div>
    </div>
  );
};

export default Player;
