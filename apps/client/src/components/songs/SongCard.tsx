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
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';

export const SongCard = ({ song }: SongProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
          {/* <div className="absolute top-0 left-0 flex w-full px-4 py-2 z-5">
        <Button classname="flex items-center gap-2">
          <Ellipsis className="p-1 rounded-md size-10 sm:size-8 bg-black/10 hover:bg-black/20" />
        </Button>
        <span className="flex items-center gap-4 ml-auto">
          <Button
            classname="p-1 rounded-full bg-black/10 hover:bg-black/20"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart
              className={clsx(`size-10 sm:size-8 lg:size-6 xl:size-8`, {
                'fill-[#f7f7f7]': isFavorite,
              })}
            />
          </Button>
        </span>
      </div> */}
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
          classname="absolute p-2 rounded-full bg-black/40 backdrop-blur-sm right-2 bottom-2"
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
        <CardDescription
          className="font-medium capitalize truncate transition-colors duration-200 cursor-pointer hover:text-accent-foreground text-md sm:text-sm text-wrap line-clamp-1"
        >
          {song.artist}
        </CardDescription>
        <CardDescription className="truncate first-letter:capitalize text-wrap line-clamp-1">
          {song.description}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};
