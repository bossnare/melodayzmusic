import { MotionButton } from '@/components/motions/motionButton';
import { Pause, Music, Heart, SkipBack, SkipForward } from 'lucide-react';

const SongPlayerMobile = () => {
  return (
    <div className="fixed inset-x-0 flex justify-between h-16 gap-2 px-2 py-2 lg:hidden bottom-16 dark:bg-nav">
      <div className="p-2 border rounded-md shadow-sm border-secondary-foreground">
        <Music className="size-10 text-muted-foreground" />
      </div>
      {/* info */}
      <div className="flex flex-col items-start justify-center gap-1 text-muted-foreground">
        <p>Aucune lecture</p>
        <span>
          <MotionButton className="p-0">
            <Heart className="size-auto" />
          </MotionButton>
        </span>
      </div>
      <div className="flex items-center gap-1 *:text-muted-foreground">
        <MotionButton>
          <SkipBack className="size-auto" />
        </MotionButton>
        <MotionButton>
          <Pause className="fill-current size-8" />
        </MotionButton>
        <MotionButton>
          <SkipForward className="size-auto" />
        </MotionButton>
      </div>
    </div>
  );
};

export { SongPlayerMobile };
