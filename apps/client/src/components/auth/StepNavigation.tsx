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
  const totalSteps = 4;

  return (
    <nav className="flex flex-col items-center justify-center gap-0 pb-2">
      <h3 className="mb-4 text-base text-foreground/80 font-semibold md:hidden">
        Crée ton compte et rejoins le groove
      </h3>
      <span>
        {step}/{totalSteps}
      </span>
      {/* step navigation */}
      <div className="flex items-center justify-between w-full">
        {/* nav left */}
        <MotionButton
          onClick={() => setStep(step - 1)}
          className={cn(
            step <= 1 && 'opacity-0 pointer-events-none',
            'text-muted-foreground hover:text-foreground p-3'
          )}
        >
          <ChevronLeft className="size-8" />
        </MotionButton>
        <span className="text-lg font-bold capitalize">étape {step}</span>
        {/* nav right */}
        <MotionButton
          onClick={() => setStep(step + 1)}
          className={cn(
            step >= totalSteps && 'opacity-0 pointer-events-none',
            'text-muted-foreground hover:text-foreground p-3'
          )}
        >
          <ChevronRight className="size-8" />
        </MotionButton>
      </div>
      <Progress value={(step / totalSteps) * 100} className="w-[25%]" />
    </nav>
  );
};
