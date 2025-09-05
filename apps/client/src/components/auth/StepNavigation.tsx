import { MotionButton } from '@/components/motions/motionButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '../ui/progress';

export const StepNavigation = ({ step }: { step: number }) => {
  return (
    <nav className="flex flex-col items-center justify-center pb-4">
      <span>{step}/3</span>
      {/* step navigation */}
      <div className="flex items-center justify-between w-full">
        <MotionButton className="text-muted-foreground hover:text-primary-foreground">
          <ChevronLeft className="size-8" />
        </MotionButton>
        <span className="text-lg font-medium capitalize">étape {step}</span>
        <MotionButton className="text-muted-foreground hover:text-primary-foreground">
          <ChevronRight className="size-8" />
        </MotionButton>
      </div>
      <Progress value={0} className="w-[20%]" />
    </nav>
  );
};
