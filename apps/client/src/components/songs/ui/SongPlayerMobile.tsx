import { MotionButton } from '@/components/motions/motionButton';
import { Play, Music, SkipBack, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SongPlayerMobile = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        style={{ boxShadow: '0 -10px 10px -5px rgba(0, 0, 0, 0.06)' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        key={'PlayerMobile'}
        className="fixed w-[96%] md:w-[70%] md:left-[15%] overflow-hidden rounded-lg left-[2%] h-20 lg:hidden bottom-17 bg-gradient-to-br from-secondary/80 via-secondary to-secondary/70 backdrop-blur-sm"
      >
        <section className="relative flex items-center gap-2 px-2 py-2 size-full">
          {/* grain */}
          <span
            className="absolute rounded-lg invert dark:invert-0 inset-0 opacity-20 pointer-events-none 
        mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
          ></span>
          <div className="p-1 border rounded-md shadow-sm bg-gradient-to-tr from-muted/20 via-muted to-muted/40 border-muted-foreground/20">
            <Music className="size-10 text-muted-foreground" />
          </div>
          {/* info */}
          <div className="flex flex-col items-start justify-center gap-1 text-muted-foreground">
            <p>Pas en lecture</p>
          </div>
          <div className="flex items-center gap-1 *:text-muted-foreground/80 ml-auto">
            <MotionButton disabled={true}>
              <SkipBack className="fill-current stroke-0 size-7" />
            </MotionButton>
            <MotionButton disabled={true} className="bg-foreground/18">
              <Play className="fill-current stroke-0 size-8" />
            </MotionButton>
            <MotionButton disabled={true}>
              <SkipForward className="fill-current stroke-0 size-7" />
            </MotionButton>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export { SongPlayerMobile };
