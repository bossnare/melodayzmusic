'use client';

import AudioWave from '@/components/motions/AudioWave';
import { MotionButton } from '@/components/motions/motionButton';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { usePlayer } from '@/context/playerContext';
import { useToggle } from '@/hooks/use-toggle';
import { cn } from '@/lib/utils';
import { useAudioStore } from '@/store/audioStore';
import { type BaseProps } from '@/types/base.interface';
import { handleWait } from '@/utils/handle-wait';
import {
  DotsThreeVerticalIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  QueueIcon,
  SkipBackIcon,
  SkipForwardIcon,
  UserListIcon,
} from '@phosphor-icons/react/dist/ssr';
import { Portal } from '@radix-ui/react-portal';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import * as React from 'react';
import { PlayerSlider } from '@/components/songs/ui/player-slider';
import { PlayerAnimateDuration } from './player-animate-duration';
import { PlayerDrawer } from './player-drawer';
import { useIsMobile } from '@/hooks/use-mobile';
import {useCurrentSong} from '@/hooks/songs/use-current-song'

function OverlayPlayer({ children, open }: BaseProps & { open: boolean }) {
  const { isLoading } = useAudioStore();
  const isMobile = useIsMobile();

  if (!open) return null;
  return (
    <Portal>
      <motion.div
        initial={!isMobile ? { y: 20, opacity: 0 } : { y: 100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        // drag="y"
        // onDragEnd={(e, info) => {
        //   if (info.offset.y > 100) {
        //     hidePlayer();
        //   }
        // }}
        className={cn(
          open ? 'pointer-events-auto' : 'pointer-events-none',
          'fixed inset-0 z-50 overflow-y-auto scrollbar-none',
          isLoading
            ? 'bg-secondary-foreground/60 flex justify-center items-center dark:bg-background-layer/60'
            : 'bg-secondary-foreground dark:bg-background-layer'
        )}
      >
        {isLoading ? (
          <AudioWave active={isLoading} color="#FFFFFF" />
        ) : (
          children
        )}
      </motion.div>
    </Portal>
  );
}

const Player = () => {
  const { setFalse, dominantColor } = usePlayer();
  const { isPlaying } = useAudioStore();
  const togglePlay = useAudioStore((s) => s.togglePlay);
  const currentSong = useAudioStore((s) => s.currentSong);
  const togglePlaying = useAudioStore((s) => s.togglePlaying);
  const {title, artist, cover, username } = useCurrentSong()

  const { value: isFavorite, toggle } = useToggle();

  return (
    <div
      style={{ backgroundColor: `${dominantColor || '#000000'}` }}
      className="px-2 size-full font-montserrat text-[#E7E9EA] bg-linear-to-b from-transparent to-black/90 to-80% flex flex-col"
    >
      <Drawer>
        <div className="flex items-center justify-between h-16 py-1">
          <MotionButton
            onClick={() => (isPlaying ? setFalse() : handleWait(setFalse))}
            className="active:opacity-60 hover:bg-transparent! lg:hover:bg-accent/30!"
          >
            <ChevronDown className="size-8" />
          </MotionButton>

          <AudioWave active={isPlaying} />
          <DrawerTrigger asChild>
            <MotionButton className="active:opacity-80 hover:bg-transparent! lg:hover:bg-accent/30! active:bg-accent/30!">
              <DotsThreeVerticalIcon weight={'bold'} className="size-8" />
            </MotionButton>
          </DrawerTrigger>
        </div>
        <div className="flex flex-col items-center gap-3 lg:gap-6 px-4 md:flex-row md:items-start">
          <div className="w-full overflow-hidden transition-transform duration-150 active:scale-98 rounded-sm md:w-[30%] bg-linear-to-tr from-muted/20 to-muted/80 border-muted-foreground/20">
            <Image
              src={
                cover ||
                '/img/fallback/player_cover_fallback.png'
              }
              alt={title || 'melodayz'}
              className="object-cover"
              loading="lazy"
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex w-full">
            <div className="grow">
              <h3 className="text-xl lg:text-3xl font-bold">
                {title}
              </h3>
              <p className="text-sm lg:text-lg font-medium text-secondary-foreground/80 dark:text-foreground/80 font-inter">
                {artist} - {username}
              </p>
            </div>
            <div>
              <MotionButton
                onClick={toggle}
                className="p-0 mt-auto active:opacity-80 hover:bg-transparent! lg:hover:opacity-80"
              >
                <HeartIcon
                  className="size-10"
                  weight={isFavorite ? 'fill' : 'regular'}
                />
              </MotionButton>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 pb-16 md:pb-4 grow">
          {/* slider */}
          <PlayerSlider className="w-[calc(100%-2rem)]" />
          {/* minutaire */}
          <PlayerAnimateDuration className="w-[calc(100%-2rem)]" />
          <div className="flex items-center gap-6">
            <MotionButton
              disabled={true}
              className="active:opacity-80 active:bg-transparent! hover:bg-transparent! lg:hover:bg-accent/30!"
            >
              <UserListIcon weight={'bold'} className="size-8" />
            </MotionButton>
            <MotionButton className="active:opacity-80 active:bg-transparent! hover:bg-transparent! lg:hover:bg-accent/30!">
              <SkipBackIcon weight={'fill'} className="size-8" />
            </MotionButton>
            <MotionButton
              onClick={() => {
                togglePlaying();
                togglePlay();
              }}
              className="p-5 lg:p-4 bg-white active:bg-white/80! hover:bg-white! lg:hover:bg-white/80! active:opacity-80"
            >
              {isPlaying ? (
                <PauseIcon weight={'fill'} className="size-6 text-black/90" />
              ) : (
                <PlayIcon weight={'fill'} className="size-6 text-black/90" />
              )}
            </MotionButton>
            <MotionButton className="active:opacity-80 active:bg-transparent! hover:bg-transparent! lg:hover:bg-accent/30!">
              <SkipForwardIcon weight={'fill'} className="size-8" />
            </MotionButton>
            <MotionButton className="active:opacity-80 active:bg-transparent! hover:bg-transparent! lg:hover:bg-accent/30!">
              <QueueIcon weight={'bold'} className="size-8" />
            </MotionButton>
          </div>
        </div>

        {/* drawerContent */}
        <PlayerDrawer />
      </Drawer>
    </div>
  );
};

const MemoPlayer = React.memo(Player);

export { OverlayPlayer, MemoPlayer };
