import { type BaseProps } from '@/types/base.interface';
import { AnimatePresence, motion } from 'motion/react';

const StepCardWrapper = ({ children, key }: BaseProps & { key: string }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={key}
        className="w-full lg:w-3/4"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AuthPageWrapper = ({ children }: BaseProps) => {
  return (
    <section className="flex flex-col items-center justify-between gap-1 pb-[env(safe-area-inset-bottom)] lg:pb-6 max-h-dvh md:pb-4">
      {children}
    </section>
  );
};

export { AuthPageWrapper, StepCardWrapper };
