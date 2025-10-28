import { useIsMobile } from '@/hooks/use-mobile';
import type { BaseProps } from '@/types/base.interface';
import { motion } from 'motion/react';
import { useState } from 'react';

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

const WhileTapMotion = ({ children }: BaseProps) => {
  const isMobile = useIsMobile();
  const [isScrolling, setIsScrolling] = useState(false);
  return (
    <motion.div
      onTapStart={() => setIsScrolling(false)}
      onTapCancel={() => setIsScrolling(true)}
      whileHover={!isMobile ? { scale: 1.01 } : {}}
      whileTap={!isScrolling ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.div>
  );
};

export { WhileTapMotion, Wrapper };
