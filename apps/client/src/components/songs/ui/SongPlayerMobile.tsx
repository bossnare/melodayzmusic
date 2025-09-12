import { MotionButton } from '@/components/motions/motionButton';
import { Play, Music, SkipBack, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SongPlayerMobile = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        key={'PlayerMobile'}
        className="fixed inset-x-0 flex items-center h-20 gap-2 px-2 py-2 lg:hidden bottom-16 bg-nav"
      >
        <div className="p-1 border rounded-md shadow-sm border-foreground dark:border-secondary-foreground">
          <Music className="size-10 text-muted-foreground" />
        </div>
        {/* info */}
        <div className="flex flex-col items-start justify-center gap-1 text-muted-foreground">
          <p>Pas en lecture</p>
        </div>
        <div className="flex items-center gap-1 *:text-muted-foreground ml-auto">
          <MotionButton>
            <SkipBack className="fill-current size-auto" />
          </MotionButton>
          <MotionButton className="bg-background">
            <Play className="fill-current size-8" />
          </MotionButton>
          <MotionButton>
            <SkipForward className="fill-current size-auto" />
          </MotionButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export { SongPlayerMobile };
