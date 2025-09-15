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
      <div className="flex items-center gap-6 xl:min-w-64">
        <div className="overflow-hidden rounded-lg w-25 h-23 aspect-square">
          <Image
            src="/img/p4.webp"
            alt="coverImage"
            className="object-cover size-full"
            height={1000}
            width={1000}
            loading="lazy"
          />
        </div>
        {/* Title & other */}
        <span className="text-muted-foreground">Pas en lecture</span>
      </div>
      {/* for minimal info and controls */}
      <div className="flex flex-col flex-wrap items-center justify-center h-full space-y-4 grow">
        {/* forward and back, pause/play controls */}
        <div className="flex items-center justify-center *:text-muted-foreground w-full space-x-4">
          <MotionButton disabled={true}>
            <SkipBack className="fill-current stroke-0 size-8" />
          </MotionButton>
          <MotionButton
            disabled={true}
            className="bg-muted-foreground/40 *:stroke-0 *:fill-current shadow-xs"
            onClick={() => setIsGo(!isGo)}
          >
            {isGo ? (
              <Pause className="size-9" />
            ) : (
              <Play className="size-9" />
            )}
          </MotionButton>
          <MotionButton disabled={true}>
            <SkipForward className="fill-current stroke-0 size-8" />
          </MotionButton>
        </div>
        {/* Slider control */}
        <div className="w-[20%] pb-3">
          <Slider className="shadow-xs" />
        </div>
      </div>
    </div>
  );
};

export default Player;
