import { type BaseProps } from '@/types/base.interface';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import { Tagline } from '../branding/tagline';

const StepCardWrapper = ({
  key,
  children,
  initial,
  exit,
  className,
}: { key: React.Key; className?: string } & MotionProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        className={`w-full ${className}`}
        initial={initial}
        animate={{ x: 0, opacity: 1 }}
        exit={exit}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AuthPageWrapper = ({ children }: BaseProps) => {
  return (
    <section
      className="relative flex flex-col items-center justify-between gap-2 px-2 md:px-10 lg:px-4 bg-gradient-to-br pb-[2rem] dark:from-primary/8 
    via-transparent dark:to-ring/8 from-primary/25 to-ring/20 md:h-screen h-dvh md:pb-4"
    >
      {children}
      {/* tag */}
      <Tagline />
    </section>
  );
};

export { AuthPageWrapper, StepCardWrapper };
