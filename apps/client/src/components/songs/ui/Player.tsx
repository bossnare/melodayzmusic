import { MotionButton } from '@/components/motions/motionButton';
import { ChevronDown } from 'lucide-react';
import { usePlayer } from '@/context/playerContext';
import {
  PlayIcon,
  SkipForwardIcon,
  SkipBackIcon,
  QueueIcon,
  UserListIcon,
  DotsThreeVerticalIcon,
} from '@phosphor-icons/react';
import Image from 'next/image';
import ColorThief from 'colorthief';
import { useEffect, useRef, useState } from 'react';

const Player = () => {
  const { setFalse } = usePlayer();
  const imgRef = useRef<HTMLImageElement>(null);
  const [dominantColor, setDominantColor] = useState<string | null>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const img = imgRef.current;
    img.onload = () => {
      if (img.naturalWidth === 0 || img.naturalHeight === 0) return; // image not loaded properly
      const colorThief = new ColorThief();
      const color = colorThief.getColor(img);
      setDominantColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
    };
  }, [imgRef]);

  return (
    <div
      style={{
        backgroundColor: `${dominantColor}`,
      }}
      className="px-2 size-full font-montserrat bg-linear-to-b from-transparent to-black/90 to-90% flex flex-col"
    >
      <div className="flex h-16 py-1 justify-between">
        <MotionButton onClick={setFalse}>
          <ChevronDown className="size-8" />
        </MotionButton>
        <MotionButton>
          <DotsThreeVerticalIcon className="size-8" />
        </MotionButton>
      </div>
      <div className="flex flex-col items-center gap-2 px-4 md:flex-row">
        <div className="w-full overflow-hidden rounded-sm md:w-[30%] bg-linear-to-tr from-muted/20 to-muted/80 border-muted-foreground/20">
          <Image
            ref={imgRef}
            src="/img/b4.jpg"
            alt="fallback_cover"
            className="object-cover"
            width={1000}
            height={1000}
          />
        </div>
        <div className="w-full">
          <h3 className="text-xl font-bold">Song Played</h3>
          <p className="font-semibold text-muted-foreground">Album/Playlist</p>
        </div>
      </div>
      <div className="flex justify-center pb-16 md:pb-4 grow">
        <div className="flex items-center gap-5">
          <MotionButton
            disabled={true}
            className="active:opacity-80 active:bg-transparent!"
          >
            <UserListIcon weight={'bold'} className="size-9" />
          </MotionButton>
          <MotionButton className="active:opacity-80 active:bg-transparent!">
            <SkipBackIcon weight={'fill'} className="size-9" />
          </MotionButton>
          <MotionButton className="p-5 bg-white hover:bg-white/80! active:opacity-80">
            <PlayIcon weight={'fill'} className="size-7 text-black/90" />
          </MotionButton>
          <MotionButton className="active:opacity-80 active:bg-transparent!">
            <SkipForwardIcon weight={'fill'} className="size-9" />
          </MotionButton>
          <MotionButton className="active:opacity-80 active:bg-transparent!">
            <QueueIcon weight={'bold'} className="size-9" />
          </MotionButton>
        </div>
      </div>
    </div>
  );
};

export { Player };
