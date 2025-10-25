import { MotionButton } from '@/components/motions/motionButton';
import { PlayIcon, SkipForwardIcon } from '@phosphor-icons/react';
import { Music } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

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
        className="fixed w-[98%] md:w-[70%] md:left-[15%] overflow-hidden rounded left-[1%] h-16 lg:hidden bottom-[65px] bg-gradient-to-br from-[#1c1c1c]/80 to-[#2a2a2a]/80 backdrop-blur-sm"
      >
        <section className="relative flex items-center gap-2 px-2 py-1 size-full font-montserrat">
          {/* grain */}
          <span
            className="absolute rounded-lg invert dark:invert-0 inset-0 opacity-25 pointer-events-none 
        mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
          ></span>
          <div className="p-[6px] border rounded-md shadow-sm bg-gradient-to-tr from-muted/20 via-muted to-muted/40 border-muted-foreground/20">
            <Music className="size-8 text-muted-foreground/80" />
          </div>
          {/* info */}
          <div className="flex flex-col items-start justify-center gap-[2px]">
            <p className="font-semibold text-muted-foreground/80">
              En attente de vibes
            </p>
            <p className="text-xs text-muted-foreground">Artiste inconnu</p>
          </div>
          <div className="flex opacit items-center gap-2 *:text-muted-foreground/80 ml-auto">
            {/* <MotionButton disabled={true}>
              <SkipBackIcon weight={'fill'} className="size-5" />
            </MotionButton> */}
            <MotionButton disabled={true} className="bg-foreground/18">
              <PlayIcon weight={'fill'} className="size-7" />
            </MotionButton>
            <MotionButton disabled={true}>
              <SkipForwardIcon weight={'fill'} className="size-5" />
            </MotionButton>
          </div>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};

export { SongPlayerMobile };
