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
        transition={{ type: 'spring', stiffness: 300, damping: 35 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AuthPageWrapper = ({ children }: BaseProps) => {
  return (
    <section className="relative flex flex-col items-center gap-1 justify-between h-[calc(100dvh-5rem)] md:h-screen lg:h-dvh md:pb-4">
      {children}
      {/* tag */}
      <Tagline />
    </section>
  );
};

export { AuthPageWrapper, StepCardWrapper };
