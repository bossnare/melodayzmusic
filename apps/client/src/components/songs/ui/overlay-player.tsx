'use client';

import { MotionButton } from '@/components/motions/motionButton';
import { usePlayer } from '@/context/playerContext';
import { useToggle } from '@/hooks/use-toggle';
import { type BaseProps } from '@/types/base.interface';
import {
  DotsThreeVerticalIcon,
  HeartIcon,
  PauseIcon,
  PlayIcon,
  QueueIcon,
  SkipBackIcon,
  SkipForwardIcon,
  UserListIcon,
} from '@phosphor-icons/react';
import { ChevronDown, Minus, Plus } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { Bar, BarChart, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Portal } from '@radix-ui/react-portal';
import { motion } from 'motion/react';

const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function Content({ className }: { className?: string }) {
  const [goal, setGoal] = React.useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  return (
    <DrawerContent className={className}>
      <div className="w-full max-w-sm mx-auto">
        <DrawerHeader>
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full shrink-0"
              onClick={() => onClick(-10)}
              disabled={goal <= 200}
            >
              <Minus />
              <span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="font-bold tracking-tighter text-7xl">{goal}</div>
              <div className="text-muted-foreground text-[0.70rem] uppercase">
                Calories/day
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="w-8 h-8 rounded-full shrink-0"
              onClick={() => onClick(10)}
              disabled={goal >= 400}
            >
              <Plus />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
          <div className="mt-3 h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="goal"
                  style={
                    {
                      fill: 'hsl(var(--foreground))',
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}

function OverlayPlayer({ children, open }: BaseProps & { open: boolean }) {
  if (!open) return null;
  return (
    <Portal>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        className={cn(
          open ? 'pointer-events-auto' : 'pointer-events-none',
          'fixed inset-0 z-50 bg-secondary-foreground dark:bg-background-layer overflow-y-auto scrollbar-none'
        )}
      >
        {children}
      </motion.div>
    </Portal>
  );
}

const Player = () => {
  const {
    setFalse,
    togglePlaying,
    isPlaying,
    dominantColor,
    imgRef,
    currentSong,
  } = usePlayer();
  const { value: isFavorite, toggle } = useToggle();

  return (
    <div
      style={{
        backgroundColor: `${dominantColor}`,
      }}
      className="px-2 size-full font-montserrat text-[#E7E9EA] bg-linear-to-b from-transparent to-black/90 to-80% flex flex-col"
    >
      <Drawer>
        <div className="flex justify-between h-16 py-1">
          <MotionButton onClick={setFalse}>
            <ChevronDown className="size-8" />
          </MotionButton>

          <DrawerTrigger asChild>
            <MotionButton className="active:opacity-80 hover:bg-transparent! lg:hover:bg-accent/30! active:bg-accent/30!">
              <DotsThreeVerticalIcon weight={'bold'} className="size-8" />
            </MotionButton>
          </DrawerTrigger>
        </div>
        <div className="flex flex-col items-center gap-3 px-4 md:flex-row">
          <div className="w-full overflow-hidden transition-transform duration-150 active:scale-98 rounded-sm md:w-[30%] bg-linear-to-tr from-muted/20 to-muted/80 border-muted-foreground/20">
            <Image
              ref={imgRef}
              src={currentSong?.songCover.coverUrl || '/img/b1.jpg'}
              alt={currentSong?.title || 'melodayz'}
              className="object-cover"
              width={1000}
              height={1000}
            />
          </div>
          <div className="flex w-full">
            <div className="grow">
              <h3 className="text-xl font-bold">Song Played</h3>
              <p className="text-sm font-semibold text-secondary-foreground/80 dark:text-foreground/80 font-inter">
                Album/Playlist
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
        <div className="flex justify-center pb-16 md:pb-4 grow">
          <div className="flex items-center gap-5">
            <MotionButton
              disabled={true}
              className="active:opacity-80 active:bg-transparent! hover:bg-transparent! lg:hover:bg-accent/30!"
            >
              <UserListIcon weight={'bold'} className="size-9" />
            </MotionButton>
            <MotionButton className="active:opacity-80 active:bg-transparent! hover:bg-transparent! lg:hover:bg-accent/30!">
              <SkipBackIcon weight={'fill'} className="size-9" />
            </MotionButton>
            <MotionButton
              onClick={togglePlaying}
              className="p-5 bg-white active:bg-white/80! hover:bg-white! lg:hover:bg-white/80! active:opacity-80"
            >
              {isPlaying ? (
                <PauseIcon weight={'fill'} className="size-7 text-black/90" />
              ) : (
                <PlayIcon weight={'fill'} className="size-7 text-black/90" />
              )}
            </MotionButton>
            <MotionButton className="active:opacity-80 active:bg-transparent! hover:bg-transparent! lg:hover:bg-accent/30!">
              <SkipForwardIcon weight={'fill'} className="size-9" />
            </MotionButton>
            <MotionButton className="active:opacity-80 active:bg-transparent! hover:bg-transparent! lg:hover:bg-accent/30!">
              <QueueIcon weight={'bold'} className="size-9" />
            </MotionButton>
          </div>
        </div>

        {/* drawerContent */}
        <Content />
      </Drawer>
    </div>
  );
};

export { OverlayPlayer, Player };
