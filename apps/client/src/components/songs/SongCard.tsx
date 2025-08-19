import { Button } from '@/animations/motion/motionButton';
// import { Playing } from '@/animations/motion/Playing';
// import { formatDuration as format } from '@/libs/formatDuration';
import timeAgo from '@/libs/timeAgo';
import type { SongProps } from '@/types/songs/song.interface';
import { Ellipsis, Heart, Play, Pause } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';
import { useState } from 'react';
import clsx from 'clsx';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';

export const SongCard = ({ song }: SongProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="p-0 bg-transparent border-none rounded-none">
      <CardContent className="relative p-0">
        <AspectRatio
          ratio={1}
          className="overflow-hidden"
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

        <Button
          classname="absolute p-2 rounded-full bg-black/20 hover:*:fill-muted-foreground hover:*:stroke-muted-foreground backdrop-blur-sm right-2 bottom-2"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="size-10 sm:size-6 lg:size-6 fill-accent-foreground" />
          ) : (
            <Play className="size-10 sm:size-6 lg:size-6 fill-accent-foreground" />
          )}
        </Button>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 px-2 sm:p-0">
        <CardTitle className="text-xl capitalize truncate line-clamp-1 sm:text-base">
          {song.title}
        </CardTitle>
        <CardDescription className="flex items-center justify-between w-full">
          <span className="font-medium capitalize min-w-auto max-w-[70%] sm:max-w-[60%] truncate transition-colors duration-200 cursor-pointer select-none hover:text-accent-foreground text-md sm:text-sm text-wrap line-clamp-1">
            {song.artist}
          </span>
          <span className="mr-2 text-xs lg:text-[10px] text-right truncate line-clamp-1">
            {timeAgo(song.createdAt)}
          </span>
        </CardDescription>
        <CardDescription className="w-full truncate first-letter:capitalize text-wrap line-clamp-1 text-md sm:text-sm">
          {song.description}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
