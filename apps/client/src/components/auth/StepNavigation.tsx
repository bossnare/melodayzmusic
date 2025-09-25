import { MotionButton } from '@/components/motions/motionButton';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Progress } from '../ui/progress';
import { StepCardWrapper } from './AuthWrapper';

export const totalSteps = 4;
export const encouragements = [
  'Crée ton compte et rejoins le groove',
  'Trop bien, on continue',
  'Encore un petit effort',
  'Tu y es presque',
];

export function Encouragement({
  step,
  dir,
  className,
}: {
  step: number;
  dir: 'prev' | 'next';
  className?: string;
}) {
  return (
    <StepCardWrapper
      key={step}
      initial={{ x: dir === 'prev' ? 100 : -100, opacity: 0 }}
      exit={{ x: dir === 'prev' ? -100 : 100, opacity: 0 }}
      className={cn('!w-auto', className)}
    >
      <h3 className="text-base text-foreground/80 font-medium">
        {encouragements[step - 1]}
      </h3>
    </StepCardWrapper>
  );
}

export const StepNavigation = ({
  step,
  setStep,
  setDir,
  dir,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setDir: React.Dispatch<React.SetStateAction<'prev' | 'next'>>;
  dir: 'prev' | 'next';
}) => {
  return (
    <nav className="flex flex-col items-center justify-center gap-0 pb-3 lg:gap-2">
      <Encouragement step={step} dir={dir} className="lg:hidden mb-4" />
      <span>
        {step}/{totalSteps}
      </span>
      {/* step navigation */}
      <div className="flex items-center justify-between w-full">
        {/* nav left */}
        <MotionButton
          onClick={() => {
            setStep(step - 1);
            setDir('prev');
          }}
          className={cn(
            step <= 1 && 'opacity-0 pointer-events-none',
            'text-muted-foreground hover:text-foreground p-3 lg:hidden'
          )}
        >
          <ChevronLeft className="size-8" />
        </MotionButton>
        <span className="text-lg font-bold capitalize">étape {step}</span>
        {/* nav right */}
        <MotionButton
          onClick={() => {
            setStep(step + 1);
            setDir('next');
          }}
          className={cn(
            step >= totalSteps && 'opacity-0 pointer-events-none',
            'text-muted-foreground hover:text-foreground p-3 lg:hidden'
          )}
        >
          <ChevronRight className="size-8" />
        </MotionButton>
      </div>
      <Progress value={(step / totalSteps) * 100} className="w-[25%]" />
    </nav>
  );
};
