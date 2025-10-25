import { MotionButton } from '@/components/motions/motionButton';
import { ChevronDown } from 'lucide-react';
import { usePlayer } from '@/context/playerContext';
import { PlayIcon, SkipForwardIcon, SkipBackIcon } from '@phosphor-icons/react';

const Player = () => {
  const { setFalse } = usePlayer();
  return (
    <div className="px-3 size-full font-montserrat bg-gradient-to-b from-foreground/70 to-[#1a1a1a]/80 flex flex-col">
      <div className="flex h-16 py-1">
        <MotionButton onClick={setFalse}>
          <ChevronDown className="size-8" />
        </MotionButton>
      </div>
      <div className="flex flex-col items-center gap-2 grow">
        <div className="rounded-xs size-80 bg-gradient-to-tr from-muted/20 to-muted/80 border-muted-foreground/20"></div>
        <div className="w-full">
          <h3 className="text-xl font-bold">Song Played</h3>
          <p className="text-muted-foreground font-semibold">Album/Playlist</p>
        </div>
      </div>
      <div className="pb-16 flex justify-center">
        <div className="flex opacit items-center gap-4">
          <MotionButton className="active:opacity-50">
            <SkipBackIcon weight={'fill'} className="size-8" />
          </MotionButton>
          <MotionButton className="bg-foreground/18 p-4">
            <PlayIcon weight={'fill'} className="size-7" />
          </MotionButton>
          <MotionButton className="active:opacity-50">
            <SkipForwardIcon weight={'fill'} className="size-8" />
          </MotionButton>
        </div>
      </div>
    </div>
  );
};

export { Player };
