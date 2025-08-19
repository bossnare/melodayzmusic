'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Button, type ButtonProps } from '../ui/button';
import { type ReactNode } from 'react';

interface MotionButtonProps extends ButtonProps {
  className?: string;
  children: ReactNode;
}

export const MotionButton = ({
  children,
  className,
  ...props
}: MotionButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      // transition={{ type: 'spring', stiffness: 300 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn('p-2 shadow-none size-auto rounded-full', className)}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};
