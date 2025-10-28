import { useIsMobile } from '@/hooks/use-mobile';
import type { BaseProps } from '@/types/base.interface';
import { motion } from 'motion/react';

const Wrapper = ({ children }: BaseProps) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -50, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 50,
        mass: 1.2,
      }}
      className="space-y-4"
    >
      {children}
    </motion.div>
  );
};

const WhileTapMotion = ({
  children,
  scale = 0.95,
}: BaseProps & { scale?: number }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      whileHover={!isMobile ? { scale: 1.01 } : {}}
      whileTap={{ scale: scale }}
    >
      {children}
    </motion.div>
  );
};

export { WhileTapMotion, Wrapper };
