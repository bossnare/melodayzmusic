import { Button } from '@/animations/motion/motionButton';
// import { Playing } from '@/animations/motion/Playing';
// import { formatDuration as format } from '@/libs/formatDuration';
// import timeAgo from '@/libs/timeAgo';
import type { SongProps } from '@/types/songs/song.interface';
import { Ellipsis, Heart, Play } from 'lucide-react';
import Image from 'next/image';
import { AspectRatio } from '../ui/aspect-ratio';

export const SongCard = ({ song }: SongProps) => {
  return (
    <AspectRatio
      ratio={1 / 1}
      className="relative overflow-hidden shrink-0 sm:rounded-lg"
      // onClick={() => {
      //   // playTrack(song, navigate);
      // }}
    >
      <div className="absolute top-0 left-0 flex w-full px-4 py-2 text-white z-5">
        <Button classname="flex items-center gap-2">
          <Ellipsis className="p-1 rounded-md size-10 sm:size-8 bg-black/10 hover:bg-black/20" />
          {/* {format(song.duration)} */}
        </Button>
        <span className="flex items-center gap-4 ml-auto">
          {/* <Play className="text-white transition-all duration-100 ease-in-out drop-shadow-2xl lg:text-2xl " /> */}
          <Button classname="p-1 rounded-full bg-black/10 hover:bg-black/20">
            <Heart className="size-10 sm:size-8 lg:size-6 xl:size-8" />
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
      <div
        className={`
                  // isPlaying && currentTrack.id === song.id
                    // ? 'opacity-100'
                    // : 'opacity-0'
                 bg-black/12 absolute top-0 w-full h-full left-0 p-2 transition-opacity duration-400 ease-in-out`}
      >
        {/* <Waveform className="text-5xl text-violet-600 md:text-3xl lg:text-5xl" /> */}
        {/* <Playing /> */}
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-white z-3">
        <Button>
          <Play className="p-2 rounded-md size-16 sm:size-12 lg:size-10 xl:size-12 bg-black/40 backdrop-blur-sm" />
        </Button>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-2 px-4 pt-4 lg:pb-0.5 lg:pt-1 xl:pt-4 xl:pb-2 pb-2 sm:px-2 z-4 
      bg-gradient-to-b from-black/1 to-black/90 text-gray-50"
      >
        <h4 className="w-full pb-1 text-lg font-semibold text-white truncate sm:text-sm md:text-md lg:text-xs xl:text-md text-nowrap">
          {song.title}
          {/* <span className="w-auto text-xs text-right lg:w-20 text-white/80">
            {timeAgo(song.createdAt)}
          </span> */}
        </h4>

        <div className="overflow-hidden border-2 border-gray-100 rounded-full size-10 sm:size-7 shrink-0 ">
          <Image
            src={
              song.userOwner.activateProfilePicture?.pictureUrl ||
              song.userOwner.defaultPicture
            }
            alt="photoDP"
            loading="lazy"
            className="object-cover w-full h-full"
            width={1200}
            height={1200}
          />
        </div>
        <span
          className="w-[calc(100%-170px)] truncate text-nowrap text-md sm:text-sm 
        opacity-90 shrink-0 mt-0 inline-block font-semibold line-clamp-1 grow h-6"
        >
          {song.userOwner.username}
        </span>
        <p className="flex-none w-full text-sm truncate cursor-pointer text-wrap line-clamp-2 sm:line-clamp-1">
          {song.description}
        </p>
      </div>
    </AspectRatio>
  );
};
