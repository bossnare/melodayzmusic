import { type BaseProps } from '@/types/base.interface';
import { AnimatePresence, motion } from 'motion/react';
import { Tagline } from '../branding/tagline';

const StepCardWrapper = ({ children, key }: BaseProps & { key: string }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        className="w-full"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AuthPageWrapper = ({ children }: BaseProps) => {
  return (
    <section className="relative flex flex-col items-center justify-between gap-1 px-4 bg-gradient-to-br pb-[2rem] dark:from-primary/4 via-transparent dark:to-ring/4 from-primary/10 to-ring/8 md:h-screen h-dvh md:pb-4">
      {children}
      {/* tag */}
      <Tagline />
    </section>
  );
};

export { AuthPageWrapper, StepCardWrapper };
