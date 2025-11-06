'use client';

import {
  HeartIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from '@phosphor-icons/react/dist/ssr';
import { ChevronUp } from 'lucide-react';

import { MotionButton } from '@/components/motions/motionButton';
import { useToggle } from '@/hooks/use-toggle';
import Image from 'next/image';
import { useCurrentSong } from '@/hooks/songs/use-current-song';
import { usePlayer } from '@/context/playerContext';
import { useAudioStore } from '@/store/audioStore';
import { PlayerSlider } from './player-slider';
import { motion, AnimatePresence } from 'motion/react';

const MiniPlayer = () => {
  const { value: isFavorite, toggle } = useToggle();
  const { title, cover, artist } = useCurrentSong();
  const { dominantColor, setTrue, show } = usePlayer();
  const currentSong = useAudioStore((s) => s.currentSong);
  const isPlaying = useAudioStore((s) => s.isPlaying);
  const togglePlaying = useAudioStore((s) => s.togglePlaying);
  const togglePlay = useAudioStore((s) => s.togglePlay);

  return (
    <div className="items-center relative justify-center hidden w-full h-full gap-4 py-1 lg:flex">
      <AnimatePresence>
        {currentSong && !show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
              mass: 1.2,
            }}
            className="absolute right-6 -top-5"
          >
            <MotionButton
              onClick={setTrue}
              className="p-3 border border-muted-foreground/20 bg-muted backdrop-blur-xs shadow-md"
            >
              <ChevronUp className="size-8" />
            </MotionButton>
          </motion.div>
        )}
      </AnimatePresence>
      {/* for image cover */}
      <div className="flex justify-start h-full gap-3 xl:min-w-64">
        <div className="overflow-hidden rounded-lg w-25 h-23 aspect-square">
          <Image
            src={cover || '/img/fallback/player_cover_fallback.png'}
            alt="coverImage"
            className="object-cover size-full"
            height={1000}
            width={1000}
            loading="lazy"
          />
        </div>
        {/* Title & other */}
        {!currentSong ? (
          <div className="flex flex-col items-start h-full pt-1 text-muted-foreground font-montserrat">
            <h3 className="font-bold">En attentes de vibes</h3>
            <p className="text-sm">Artiste inconnue</p>
          </div>
        ) : (
          <div className="flex flex-col items-start h-full pt-1 font-montserrat">
            <h3 style={{ color: `${dominantColor}` }} className="font-bold">
              {title}
            </h3>
            <p style={{ color: `${dominantColor}` }} className="text-sm">
              {artist}
            </p>
            <MotionButton onClick={toggle} className="p-0 mt-auto">
              <HeartIcon
                className="size-8"
                weight={isFavorite ? 'fill' : 'regular'}
              />
            </MotionButton>
          </div>
        )}
      </div>
      {/* for minimal info and controls */}
      <div className="flex flex-col flex-wrap items-center justify-center h-full space-y-4 grow">
        {/* forward and back, pause/play controls */}
        {!currentSong ? (
          <div className="flex items-center justify-center *:text-muted-foreground w-full space-x-4">
            <MotionButton disabled={true}>
              <SkipBackIcon weight={'fill'} className="size-7" />
            </MotionButton>
            <MotionButton
              disabled={true}
              className="shadow-xs bg-muted-foreground/40"
            >
              <PlayIcon weight={'fill'} className="size-8" />
            </MotionButton>
            <MotionButton disabled={true}>
              <SkipForwardIcon weight={'fill'} className="size-7" />
            </MotionButton>
          </div>
        ) : (
          <div className="flex items-center justify-center *:text-muted-foreground w-full space-x-4">
            <MotionButton>
              <SkipBackIcon weight={'fill'} className="size-7" />
            </MotionButton>
            <MotionButton
              className="shadow-xs bg-muted-foreground/40"
              onClick={() => {
                togglePlaying();
                togglePlay();
              }}
            >
              {isPlaying ? (
                <PauseIcon weight={'fill'} className="size-8" />
              ) : (
                <PlayIcon weight={'fill'} className="size-8" />
              )}
            </MotionButton>
            <MotionButton>
              <SkipForwardIcon weight={'fill'} className="size-7" />
            </MotionButton>
          </div>
        )}
        {/* Slider control */}
        {currentSong && (
          <div className="w-[20%] pb-3">
            <PlayerSlider needOveride={false} className="w-full shadow-xs" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniPlayer;
