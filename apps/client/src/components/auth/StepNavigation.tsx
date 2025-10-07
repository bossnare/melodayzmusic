import { MotionButton } from '@/components/motions/motionButton';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  Smile,
  HeartHandshake,
  Flame,
  Sparkles,
} from 'lucide-react';
import { Progress } from '../ui/progress';
import { StepCardWrapper } from './AuthWrapper';

export const totalSteps = 5;
export const encouragements = [
  'Crée ton compte et rejoins le groove',
  'Trop bien, on continue',
  'Encore un petit effort',
  'Tu y es presque',
];
export const encouragementIcons = [
  <Smile key="1" />,
  <HeartHandshake key="2" />,
  <Flame key="3" />,
  <Sparkles key="4" />,
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
      <h3 className="text-base flex items-center gap-1 font-medium text-foreground/80">
        {encouragements[step - 1]} {encouragementicons[step - 1]}
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
    <nav className="flex flex-col items-center justify-center pb-3 gap-2">
      <Encouragement step={step} dir={dir} className="mb-2 lg:hidden" />
      <span>
        {step}/{totalSteps}
      </span>
      {/* step navigation */}
      <div className="flex items-center justify-center w-full relative">
        {/* nav left */}
        <div className="lg:hidden absolute left-0 -top-4">
          <MotionButton
            onClick={() => {
              setStep(step - 1);
              setDir('prev');
            }}
            className={cn(
              step <= 1 && 'opacity-0 pointer-events-none',
              'text-muted-foreground hover:text-foreground p-3'
            )}
          >
            <ChevronLeft className="size-8" />
          </MotionButton>
        </div>
        <span className="text-lg font-bold capitalize">étape {step}</span>
      </div>
      <Progress value={(step / totalSteps) * 100} className="w-[25%]" />
    </nav>
  );
};
