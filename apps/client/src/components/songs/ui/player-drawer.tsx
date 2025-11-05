'use client';

import { useCurrentSong } from '@/hooks/songs/use-current-song';
import { playerLabel } from '@/components/navigation/labels/player.label';
import {
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useAudioStore } from '@/store/audioStore';
import Image from 'next/image';
import AudioWave from '@/components/motions/AudioWave';

export function PlayerDrawer({ className }: { className?: string }) {
  const { title, artist, cover } = useCurrentSong();
  const isPlaying = useAudioStore((s) => s.isPlaying);

  return (
    <DrawerContent className={className}>
      <div className="w-full max-w-sm mx-auto">
        <DrawerHeader className="text-left bg-muted rounded-sm my-2">
          <div className="flex gap-3">
            <div className="rounded-[5px] overflow-hidden size-12 shadow-sm bg-linear-to-tr from-muted/20 via-muted to-muted/40 border-muted-foreground/20">
              <Image
                src={cover || '/img/fallback/player_cover_fallback.png'}
                className="object-cover"
                alt={title || 'melodayz'}
                loading="lazy"
                width={1000}
                height={1000}
              />
            </div>
            <div className="grow">
              <DrawerTitle className="text-left">{title}</DrawerTitle>
              <DrawerDescription className="text-left">
                {artist}
              </DrawerDescription>
            </div>
            <div className="shrink-0 size-12 flex justify-center items-center">
              <AudioWave active={isPlaying} color="#FFFFFF" />
            </div>
          </div>
        </DrawerHeader>
        <div className="p-4 pb-0 bg-muted rounded-sm">
          <div className="flex flex-col justify-center space-x-2">
            <ul className="space-y-3 md:space-y-2 text-lg font-medium font-montserrat">
              {playerLabel.map((label) => (
                <li key={label.id}>
                  {' '}
                  <Button
                    variant="ghost"
                    size="xl"
                    className="w-full justify-start rounded hover:text-inherit! hover:bg-transparent!
                  active:bg-muted-foreground! lg:hover:bg-muted-foreground! lg:active:opacity-80"
                  >
                    <label.icon className="size-7 md:size-6" /> {label.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DrawerFooter></DrawerFooter>
      </div>
    </DrawerContent>
  );
}
