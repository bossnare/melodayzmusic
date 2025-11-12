import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MotionButton } from '@/components/motions/motionButton';
import { cn } from '@/lib/utils';

interface ControlInterface {
  className: string;
  onClickLeft: () => void;
  onClickRight: () => void;
}

const ChevronControl = ({
  className,
  onClickLeft,
  onClickRight,
}: ControlInterface) => {
  return (
    <>
      {/* Prev */}
      <div
        className={cn(
          className,
          'absolute -left-2 z-6 hidden lg:block -translate-y-1/2'
        )}
      >
        <MotionButton
          onClick={onClickLeft}
          className="bg-background/50 text-foreground/90 hover:text-foreground"
        >
          <ChevronLeft className="size-10" />
        </MotionButton>
      </div>
      {/* Next */}
      <div
        className={cn(
          className,
          'absolute -right-2 z-6 hidden lg:block -translate-y-1/2'
        )}
      >
        <MotionButton
          onClick={onClickRight}
          className="bg-background/50 text-foreground/90 hover:text-foreground"
        >
          <ChevronRight className="size-10" />
        </MotionButton>
      </div>
    </>
  );
};

export default ChevronControl;
