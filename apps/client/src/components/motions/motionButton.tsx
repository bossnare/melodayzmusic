import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { type MotionButtonProps } from '@/types/motions/motionButton.interface';

const MotionButton = ({ children, className, ...props }: MotionButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.95 }}
      // transition={{ type: 'spring', stiffness: 200 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'p-2 shadow-none bg-transparent size-auto hover:text-inherit rounded-full',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

const MotionButtonLeft = ({
  children,
  className,
  ...props
}: MotionButtonProps) => {
  return (
    <motion.div
      whileHover={{ x: 1.01, scale: 1.01 }}
      whileTap={{ x: 4, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          'p-2 shadow-none bg-transparent size-auto rounded-full',
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

const MotionTab = ({ children, ...props }: { children: React.ReactNode }) => {
  return (
    <motion.div whileTap={{ scale: 0.8 }} {...props}>
      {children}
    </motion.div>
  );
};

export { MotionButton, MotionButtonLeft, MotionTab };
