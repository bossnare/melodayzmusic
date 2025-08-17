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

export const SongCard = ({ song }: SongProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <AspectRatio
      ratio={1 / 1}
      className="relative overflow-hidden sm:rounded-lg"
      // onClick={() => {
      //   // playTrack(song, navigate);
      // }}
    >
      <div className="absolute top-0 left-0 flex w-full px-4 py-2 z-5">
        <Button classname="flex items-center gap-2">
          <Ellipsis className="p-1 rounded-md size-10 sm:size-8 bg-black/10 hover:bg-black/20" />
          {/* {format(song.duration)} */}
        </Button>
        <span className="flex items-center gap-4 ml-auto">
          {/* <Play className="text-white transition-all duration-100 ease-in-out drop-shadow-2xl lg:text-2xl " /> */}
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
      </div>
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

      <div className="absolute inset-0 flex items-center justify-center z-3">
        <Button
          classname="p-2 rounded-md bg-black/40 backdrop-blur-sm"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="size-16 sm:size-12 lg:size-6 xl:size-7" />
          ) : (
            <Play className="size-16 sm:size-12 lg:size-6 xl:size-7" />
          )}
        </Button>
      </div>

      <div
        className="absolute bottom-0 left-0 pointer-events-none right-0 flex flex-wrap gap-2 px-4 pt-4 lg:pb-0.5 lg:pt-1 xl:pb-2 pb-2 sm:px-2 z-4 
      bg-gradient-to-b from-black/1 to-black/90"
      >
        <div className="flex items-center w-full mb-0">
          <h4 className="text-lg font-semibold truncate sm:text-md md:text-lg lg:text-xs xl:text-md xl:font-bold text-nowrap">
            {song.title}
          </h4>
          <span className="ml-auto text-xs text-right w-18 lg:w-20 text-white/90">
            {timeAgo(song.createdAt)}
          </span>
        </div>

        <div className="flex items-center w-full gap-1">
          <Avatar className="border-2 border-gray-100 dark:border-gray-200">
            <AvatarImage
              src={
                song.userOwner.activateProfilePicture?.pictureUrl ||
                song.userOwner.defaultPicture
              }
              alt="photoDP"
            />
            <AvatarFallback>
              <div className="bg-gray-200 dark:bg-gray-100 animate-spin"></div>
            </AvatarFallback>
          </Avatar>
          <span className="w-full h-6 font-semibold truncate text-nowrap text-md sm:text-sm opacity-90 line-clamp-1 grow">
            {song.userOwner.username}
          </span>
        </div>

        <p className="flex-none w-full text-sm truncate cursor-pointer text-wrap line-clamp-2 sm:line-clamp-1">
          {song.description}
        </p>
      </div>
    </AspectRatio>
  );
};
