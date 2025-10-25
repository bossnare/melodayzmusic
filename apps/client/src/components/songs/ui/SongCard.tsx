'use client';

// import { MotionButton } from '@/components/motions/motionButton';
// import { Playing } from '@/animations/motion/Playing';
// import { formatDuration as format } from '@/libs/formatDuration';
// import timeAgo from '@/libs/timeAgo';
import type { SongProps } from '@/types/songs/song.interface';
import Image from 'next/image';
import { useState } from 'react';
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
  const [imgLoading, setImgLoading] = useState(true);

  return (
    <Card className="p-0 bg-transparent border-none rounded-none shadow-none cursor-pointer lg:hover:bg-muted/30 active:bg-accent/50">
      <CardContent className="p-0 drop-shadow-xl">
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded"
          // onClick={() => {
          //   // playTrack(song, navigate);
          // }}
        >
          <Image
            src={song.songCover.coverUrl || song.defaultCover}
            alt={song.title + '-' + song.id}
            onLoad={() => setImgLoading(false)}
            className="object-cover size-full"
            loading="lazy"
            width={1200}
            height={1200}
          />
          {/* shimmer loader */}
          {imgLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/40 via-foreground/50 to-foreground/40 animate-pulse"></div>
          )}
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
        <CardTitle className="w-[90%] capitalize text-foreground truncate line-clamp-1 text-[14px] lg:text-sm font-montserrat">
          {song.title}
        </CardTitle>
        <CardDescription className="flex flex-col justify-between w-auto max-w-[90%] gap-2 sm:gap-0 sm:flex-row sm:items-center">
          <span
            className="font-medium capitalize
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
  const [imgLoading, setImgLoading] = useState(true);
  // const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="p-0 bg-transparent border-none rounded-none shadow-none cursor-pointer lg:hover:bg-muted/30 active:bg-accent/50">
      <CardContent className="p-0 drop-shadow-xl">
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded"
          // onClick={() => {
          //   // playTrack(song, navigate);..

          // }}
        >
          <Image
            src={song.songCover.coverUrl || song.defaultCover}
            alt={song.title}
            onLoad={() => setImgLoading(false)}
            className="object-cover size-full"
            loading="lazy"
            width={1200}
            height={1200}
          />
          {/* shimmer loader */}
          {imgLoading && (
            <div className="absolute inset-0 bg-gradient-to-br from-foreground/40 via-foreground/50 to-foreground/40 animate-pulse"></div>
          )}
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
        <CardTitle className="w-[90%] text-sm capitalize truncate text-foreground line-clamp-1 sm:text-[14px] md:text-base lg:text-sm font-montserrat">
          {song.title}
        </CardTitle>
        <CardDescription className="flex flex-col justify-between w-auto max-w-[90%] gap-2 sm:gap-0 sm:flex-row sm:items-center">
          <span
            className="font-medium capitalize 
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
