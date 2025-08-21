'use client';

import { MotionButton } from '@/components/motions/motionButton';
// import { Playing } from '@/animations/motion/Playing';
// import { formatDuration as format } from '@/libs/formatDuration';
import timeAgo from '@/libs/timeAgo';
import type { SongProps } from '@/types/songs/song.interface';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '../ui/card';

export const SongCard = ({ song }: SongProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="p-0 bg-transparent border-none rounded-none">
      <CardContent className="relative p-0">
        <AspectRatio
          ratio={1}
          className="overflow-hidden rounded-sm sm:rounded-none"
          // onClick={() => {
          //   // playTrack(song, navigate);
          // }}
        >
          <div className="absolute bottom-0 left-0 flex w-full px-4 py-2 z-5"></div>
          <Image
            src={song.songCover.coverUrl || song.defaultCover}
            alt={song.title}
            className="object-cover w-full h-full"
            loading="lazy"
            width={1200}
            height={1200}
          />
          {/* <div */}
          {/* // className= */}
          {`
                  // isPlaying && currentTrack.id === song.id
                    // ? 'opacity-100'
                    // : 'opacity-0'
                //  bg-black/12 absolute top-0 w-full h-full left-0 p-2 transition-opacity duration-400 ease-in-out`}
          {/* > */}
          {/* <Waveform className="text-5xl text-violet-600 md:text-3xl lg:text-5xl" /> */}
          {/* <Playing /> */}
          {/* </div> */}
        </AspectRatio>

        <div className="absolute right-2 bottom-2">
          <MotionButton
            className="bg-black/20 backdrop-blur-sm"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <Pause className="size-8 lg:size-6 fill-accent-foreground" />
            ) : (
              <Play className="size-8 lg:size-6 fill-accent-foreground" />
            )}
          </MotionButton>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 p-0">
        <CardTitle className="text-lg w-full capitalize truncate line-clamp-1 sm:text-base">
          {song.title}
        </CardTitle>
        <CardDescription className="flex flex-col gap-1 sm:gap-0 sm:flex-row sm:items-center justify-between w-full">
          <span
            className="font-medium capitalize min-w-auto sm:max-w-[60%] 
          truncate transition-colors duration-100 ease-in cursor-pointer select-none hover:text-accent-foreground text-base sm:text-sm line-clamp-1"
          >
            {song.artist}
          </span>
          <span className="mr-2 text-xs lg:text-[10px] sm:text-right truncate line-clamp-1">
            {timeAgo(song.createdAt)}
          </span>
        </CardDescription>
        <CardDescription className="!hidden w-full text-base truncate sm:!block sm:text-sm first-letter:capitalize line-clamp-1">
          {song.description}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
