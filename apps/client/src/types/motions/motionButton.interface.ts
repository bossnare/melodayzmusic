import { type ReactNode } from 'react';
import { type ButtonProps } from '@/components/ui/button';

interface MotionButtonProps extends ButtonProps {
  className?: string;
  children: ReactNode;
}

export type { MotionButtonProps };
