import { MotionButton } from '@/components/motions/motionButton';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '../ui/progress';
import { cn } from '@/lib/utils';

export const StepNavigation = ({
  step,
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <nav className="flex flex-col items-center justify-center pb-4">
      <span>{step}/3</span>
      {/* step navigation */}
      <div className="flex items-center justify-between w-full">
        {/* nav left */}
        <MotionButton
          onClick={() => setStep(step - 1)}
          className={cn(
            step <= 1 && 'opacity-0 pointer-events-none',
            'text-muted-foreground hover:text-primary-foreground'
          )}
        >
          <ChevronLeft className="size-8" />
        </MotionButton>
        <span className="text-lg font-medium capitalize">étape {step}</span>
        {/* nav right */}
        <MotionButton
          onClick={() => setStep(step + 1)}
          className={cn(
            step >= 3 && 'opacity-0 pointer-events-none',
            'text-muted-foreground hover:text-primary-foreground'
          )}
        >
          <ChevronRight className="size-8" />
        </MotionButton>
      </div>
      <Progress value={(step / 3) * 100} className="w-[25%]" />
    </nav>
  );
};
