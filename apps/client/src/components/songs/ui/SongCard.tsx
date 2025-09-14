'use client';

// import { MotionButton } from '@/components/motions/motionButton';
// import { Playing } from '@/animations/motion/Playing';
// import { formatDuration as format } from '@/libs/formatDuration';
// import timeAgo from '@/libs/timeAgo';
import type { SongProps } from '@/types/songs/song.interface';
import Image from 'next/image';
// import { useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';

// Vibe Card
const VibeCard = ({ song }: SongProps) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="p-0 bg-transparent border-none rounded-none shadow-none cursor-pointer active:bg-accent">
      <CardContent className="p-0 drop-shadow-xl">
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded-md"
          // onClick={() => {
          //   // playTrack(song, navigate);
          // }}
        >
          <Image
            src={song.songCover.coverUrl || song.defaultCover}
            alt={song.title}
            className="object-cover size-full"
            loading="lazy"
            width={1200}
            height={1200}
          />
          {/* <div className="absolute flex justify-end bottom-2 left-2">
            <MotionButton
              className="bg-gradient-to-t from-black/60 to-transparent shrink-0"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="stroke-0 size-6 lg:size-5 fill-white dark:fill-foreground" />
              ) : (
                <Play className="stroke-0 size-6 lg:size-5 fill-white dark:fill-foreground" />
              )}
            </MotionButton>
          </div> */}
        </AspectRatio>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 p-0">
        <CardTitle className="w-full capitalize text-foreground truncate line-clamp-1 text-[14px] lg:text-sm">
          {song.title}
        </CardTitle>
        <CardDescription className="flex flex-col justify-between w-full gap-2 sm:gap-0 sm:flex-row sm:items-center">
          <span
            className="font-medium capitalize min-w-auto sm:max-w-[70%] 
          truncate transition-colors duration-100 ease-in cursor-pointer select-none hover:text-foreground text-xs lg:text-xs line-clamp-1"
          >
            {song.artist}
          </span>
        </CardDescription>
        <CardDescription className="!hidden w-full text-base truncate lg:!block sm:text-sm lg:text-xs first-letter:capitalize line-clamp-1">
          {song.description}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

// Album Card
const AlbumCard = ({ song }: SongProps) => {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="p-0 bg-transparent border-none rounded-none shadow-none cursor-pointer active:bg-accent">
      <CardContent className="p-0 drop-shadow-xl">
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded-lg"
          // onClick={() => {
          //   // playTrack(song, navigate);
          // }}
        >
          <Image
            src={song.songCover.coverUrl || song.defaultCover}
            alt={song.title}
            className="object-cover size-full"
            loading="lazy"
            width={1200}
            height={1200}
          />
          {/* <div className="absolute flex justify-end bottom-2 left-2">
            <MotionButton
              className="bg-gradient-to-t from-black/60 to-transparent shrink-0"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="stroke-0 size-7 sm:size-5 md:size-7 lg:size-5 fill-foreground" />
              ) : (
                <Play className="stroke-0 size-7 sm:size-5 md:size-7 lg:size-5 fill-foreground" />
              )}
            </MotionButton>
          </div> */}
        </AspectRatio>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 p-0">
        <CardTitle className="w-full capitalize truncate text-foreground line-clamp-1 sm:text-base lg:text-sm">
          {song.title}
        </CardTitle>
        <CardDescription className="flex flex-col justify-between w-full gap-2 sm:gap-0 sm:flex-row sm:items-center">
          <span
            className="font-medium capitalize min-w-auto sm:max-w-[70%] 
          truncate transition-colors duration-100 ease-in cursor-pointer select-none hover:text-foreground sm:text-sm lg:text-xs line-clamp-1"
          >
            {song.artist}
          </span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export { VibeCard, AlbumCard };
