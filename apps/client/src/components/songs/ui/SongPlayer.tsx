'use client';

import {
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  HeartIcon,
} from '@phosphor-icons/react';

import Image from 'next/image';
import { useState } from 'react';
import { MotionButton } from '@/components/motions/motionButton';
import { Slider } from '@/components/ui/slider';
import { useToggle } from '@/hooks/use-toggle';

const Player = () => {
  const [isGo, setIsGo] = useState(false);
  const { value: isFavorite, toggle } = useToggle();
  return (
    <div className="items-center justify-center hidden w-full h-full gap-4 py-1 lg:flex">
      {/* for image cover */}
      <div className="flex justify-start h-full gap-3 xl:min-w-64">
        <div className="overflow-hidden rounded-lg w-25 h-23 aspect-square">
          <Image
            src="/img/Aurora-Cover.jpg"
            alt="coverImage"
            className="object-cover size-full"
            height={1000}
            width={1000}
            loading="lazy"
          />
        </div>
        {/* Title & other */}
        <div className="flex flex-col items-start h-full pt-1 text-muted-foreground font-montserrat">
          <h3 className="font-bold"> En attente de vibes</h3>
          <p className="text-sm">Artiste inconnu</p>
          <MotionButton onClick={toggle} className="p-0 mt-auto">
            <HeartIcon
              className="size-10"
              weight={isFavorite ? 'fill' : 'regular'}
            />
          </MotionButton>
        </div>
      </div>
      {/* for minimal info and controls */}
      <div className="flex flex-col flex-wrap items-center justify-center h-full space-y-4 grow">
        {/* forward and back, pause/play controls */}
        <div className="flex items-center justify-center *:text-muted-foreground w-full space-x-4">
          <MotionButton disabled={true}>
            <SkipBackIcon weight={'fill'} className="size-7" />
          </MotionButton>
          <MotionButton
            disabled={true}
            className="shadow-xs bg-muted-foreground/40"
            onClick={() => setIsGo(!isGo)}
          >
            {isGo ? (
              <PauseIcon weight={'fill'} className="size-8" />
            ) : (
              <PlayIcon weight={'fill'} className="size-8" />
            )}
          </MotionButton>
          <MotionButton disabled={true}>
            <SkipForwardIcon weight={'fill'} className="size-7" />
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
