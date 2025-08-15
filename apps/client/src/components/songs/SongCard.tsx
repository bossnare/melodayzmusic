import { Button } from '@/animations/motion/motionButton';
// import { Playing } from '@/animations/motion/Playing';
// import { formatDuration as format } from '@/libs/formatDuration';
import timeAgo from '@/libs/timeAgo';
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
      <div className="absolute top-0 left-0 flex w-full px-2 py-1 text-white z-5">
        <Button classname="flex items-center gap-2">
          <Ellipsis className="p-1 rounded-md size-8 hover:bg-black/10" />
          {/* {format(song.duration)} */}
        </Button>
        <span className="flex items-center gap-4 ml-auto">
          {/* <Play className="text-white transition-all duration-100 ease-in-out drop-shadow-2xl lg:text-2xl " /> */}
          <Button classname="p-1 rounded-full hover:bg-black/10">
            <Heart />
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
          <Play className="p-2 rounded-md size-12 md:size-10 bg-black/10 backdrop-blur-sm" />
        </Button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex flex-wrap px-2 pt-2 pb-1 z-4 bg-gradient-to-b from-black/1 to-black/70 text-gray-50">
        <div className="flex flex-wrap gap-2">
          <h3 className="w-full font-bold text-white truncate text-nowrap">
            {song.title}
          </h3>
          <div className="overflow-hidden border-gray-200 rounded-full border-1 size-10 md:size-7 shrink-0 outline-hidden ">
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
          <span className=" md:w-[calc(100%-170px)] truncate text-nowrap md:text-sm shrink-0 w-[calc(100%-200px)] mt-1 md:mt-0 inline-block font-bold line-clamp-1 grow h-10 md:h-auto">
            {song.userOwner.username}
          </span>
          <span className="w-auto pt-2 text-xs text-right lg:w-20 md:pt-1 text-white/80">
            {timeAgo(song.createdAt)}
          </span>
          <p className="flex-none w-full text-sm font-medium truncate cursor-pointer text-wrap line-clamp-2 lg:line-clamp-1">
            {song.description}
          </p>
        </div>
      </div>
    </AspectRatio>
  );
};
