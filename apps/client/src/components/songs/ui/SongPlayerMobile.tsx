import { MotionButton } from '@/components/motions/motionButton';
import { usePlayer } from '@/context/playerContext';
import { PlayIcon, SkipForwardIcon } from '@phosphor-icons/react';
import { Music } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const SongPlayerMobile = () => {
  const { setTrue } = usePlayer();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        onClick={setTrue}
        style={{ boxShadow: '0 -10px 10px -5px rgba(0, 0, 0, 0.06)' }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        key={'PlayerMobile'}
        className="fixed w-[96%] md:w-[70%] md:left-[15%] active:brightness-120 overflow-hidden cursor-pointer rounded-[6.5px] left-[2%] h-15 lg:hidden bottom-[65px] bg-linear-to-br from-secondary/80 to-secondary/70 dark:from-[#2b2b2b]/80 dark:to-[#1a1a1a]/80 backdrop-blur-sm"
      >
        <section className="relative flex items-center gap-2 px-2 py-1 size-full font-montserrat">
          {/* grain */}
          <span
            className="absolute rounded-[6.5px] invert dark:invert-0 inset-0 opacity-10 pointer-events-none 
        mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
          ></span>
          {/* progress */}
          <div className="absolute bottom-0 left-[3%] overflow-hidden w-[94%] rounded-md h-[3px] bg-muted dark:bg-muted-foreground">
            <div className="h-full w-20 bg-foreground"></div>
          </div>
          <div className="p-1.5 border rounded-[5px] shadow-sm bg-linear-to-tr from-muted/20 via-muted to-muted/40 border-muted-foreground/20">
            <Music className="size-8 text-muted-foreground/80" />
          </div>
          {/* info */}
          <div className="flex flex-col items-start justify-center gap-0.5">
            <p className="text-sm font-bold text-muted-foreground/80">
              En attente de vibes
            </p>
            <p className="text-xs text-muted-foreground font-medium">
              Artiste inconnu
            </p>
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
