'use client';

// import { MotionButton } from '@/components/motions/motionButton';
// import { Playing } from '@/animations/motion/Playing';
// import { formatDuration as format } from '@/libs/formatDuration';
// import timeAgo from '@/libs/timeAgo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import type { SongProps } from '@/types/songs/song.interface';
import Image from 'next/image';
import { useState } from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import AudioWave from '@/components/motions/AudioWave';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { usePlayer } from '@/context/playerContext';
import { useAudioElement } from '@/context/audioContext';
import { useAudioStore } from '@/store/audioStore';

// Vibe Card
const VibeCard = ({ song }: SongProps) => {
  const [imgLoading, setImgLoading] = useState(true);
  const { setTrue } = usePlayer();
  const { setSong, isPlaying, setIsPlaying, currentSong } = useAudioStore();
  const isCurrent = useAudioStore((s) => s.isCurrentSong(song.id));
  const audio = useAudioElement();

  return (
    <Card
      onClick={async () => {
        if (!currentSong) return;
        setSong(song);
        audio.src = currentSong.audioUrl;
        await audio.play();
        setIsPlaying(true);
        setTrue();
      }}
      className="p-0 bg-transparent border-none rounded-none shadow-none cursor-pointer active:opacity-80 active:scale-95 font-montserrat lg:hover:bg-muted/30 active:bg-accent/50"
    >
      <CardContent className="p-0 drop-shadow-xl">
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded-[6.5px]"
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
            <div className="absolute inset-0 bg-linear-to-br from-foreground/40 via-foreground/50 to-foreground/40 animate-pulse"></div>
          )}
          {isCurrent && (
            <div className="absolute top-2 right-2">
              <AudioWave active={isPlaying} />
            </div>
          )}
        </AspectRatio>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-2 p-0">
        <CardTitle className="w-[90%] capitalize text-foreground truncate line-clamp-1 text-[14px] lg:text-sm font-bold">
          {song.title}
        </CardTitle>
        <CardDescription className="flex flex-col justify-between w-auto max-w-[90%] gap-2 sm:gap-0 sm:flex-row sm:items-center">
          <span className="text-xs font-semibold capitalize truncate transition-colors duration-100 ease-in cursor-pointer select-none hover:text-foreground lg:text-xs line-clamp-1">
            {song.artist}
          </span>
        </CardDescription>
        <CardDescription className="hidden! w-full text-base truncate lg:block! sm:text-sm lg:text-xs first-letter:capitalize line-clamp-1">
          {song.description}
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

// Album Card
const AlbumCard = ({ song }: SongProps) => {
  const [imgLoading, setImgLoading] = useState(true);
  const { setTrue } = usePlayer();
  const { setSong } = useAudioStore();

  return (
    <Card
      onClick={() => {
        setSong(song);
        setTrue();
      }}
      className="p-0 bg-transparent border-none rounded-none shadow-none cursor-pointer active:opacity-80 active:scale-95 font-montserrat lg:hover:bg-muted/30 active:bg-accent/50"
    >
      <CardContent className="p-0 drop-shadow-xl">
        <AspectRatio
          ratio={1}
          className="relative overflow-hidden rounded-[6.5px]"
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
            <div className="absolute inset-0 bg-linear-to-br from-foreground/40 via-foreground/50 to-foreground/40 animate-pulse"></div>
          )}
          {/* <div className="absolute flex justify-end bottom-2 left-2">
            <MotionButton
              className="bg-linear-to-t from-black/60 to-transparent shrink-0"
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
        <CardTitle className="w-[90%] text-sm capitalize truncate text-foreground line-clamp-1 sm:text-[14px] md:text-base lg:text-sm font-bold">
          {song.title}
        </CardTitle>
        <CardDescription className="flex flex-col justify-between w-auto max-w-[90%] gap-2 sm:gap-0 sm:flex-row sm:items-center">
          <span className="text-xs font-semibold capitalize truncate transition-colors duration-100 ease-in cursor-pointer select-none hover:text-foreground lg:text-xs line-clamp-1">
            {song.artist}
          </span>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export { AlbumCard, VibeCard };
