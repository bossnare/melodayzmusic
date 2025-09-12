import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MotionButton } from '@/components/motions/motionButton';

const ChevronControl = () => {
  return (
    <>
      {/* Prev */}
      <div className="absolute -left-2 z-3 top-[30%] hidden lg:block -translate-y-1/2">
        <MotionButton className="bg-background/50 text-foreground/90 hover:text-foreground">
          <ChevronLeft className="size-10" />
        </MotionButton>
      </div>
      {/* Next */}
      <div className="absolute -right-2 z-3 top-[30%] hidden lg:block -translate-y-1/2">
        <MotionButton className="bg-background/50 text-foreground/90 hover:text-foreground">
          <ChevronRight className="size-10" />
        </MotionButton>
      </div>
    </>
  );
};

export default ChevronControl;
