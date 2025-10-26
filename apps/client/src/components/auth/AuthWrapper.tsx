import { type BaseProps } from '@/types/base.interface';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import { Tagline } from '../branding/tagline';
import { Overlay } from '@/components/motions/Overlay';

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
        transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 1.2 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const AuthPageWrapper = ({
  children,
  isPending,
  textLoading,
}: BaseProps & { isPending?: boolean; textLoading?: string }) => {
  return (
    <section
      className="relative flex flex-col items-center justify-between gap-4 sm:gap-6 lg:gap-2 pb-6
      sm:h-auto lg:h-dvh h-dvh md:pb-4"
    >
      {children}
      {/* Overlay */}
      <Overlay isPending={isPending} textLoading={textLoading} />
      {/* tag */}
      <footer className="flex flex-col items-center">
        <Tagline />
      </footer>
    </section>
  );
};

export { AuthPageWrapper, StepCardWrapper };
