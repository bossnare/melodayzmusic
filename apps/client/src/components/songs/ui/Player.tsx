import { MotionButton } from '@/components/motions/motionButton';
import { ChevronDown } from 'lucide-react';
import { usePlayer } from '@/context/playerContext';
import { PlayIcon, SkipForwardIcon, SkipBackIcon } from '@phosphor-icons/react';

const Player = () => {
  const { setFalse } = usePlayer();
  return (
    <div className="px-3 size-full font-montserrat bg-linear-to-b from-foreground/70 to-[#1a1a1a]/80 flex flex-col">
      <div className="flex h-16 py-1">
        <MotionButton onClick={setFalse}>
          <ChevronDown className="size-8" />
        </MotionButton>
      </div>
      <div className="flex flex-col items-center gap-2 grow">
        <div className="rounded-xs size-85 bg-linear-to-tr from-muted/20 to-muted/80 border-muted-foreground/20"></div>
        <div className="w-full">
          <h3 className="text-xl font-bold">Song Played</h3>
          <p className="font-semibold text-muted-foreground">Album/Playlist</p>
        </div>
      </div>
      <div className="flex justify-center pb-16">
        <div className="flex items-center gap-6 opacit">
          <MotionButton className="active:opacity-50">
            <SkipBackIcon weight={'fill'} className="size-11" />
          </MotionButton>
          <MotionButton className="p-4 bg-foreground/18">
            <PlayIcon weight={'fill'} className="size-10" />
          </MotionButton>
          <MotionButton className="active:opacity-50">
            <SkipForwardIcon weight={'fill'} className="size-11" />
          </MotionButton>
        </div>
      </div>
    </div>
  );
};

export { Player };
