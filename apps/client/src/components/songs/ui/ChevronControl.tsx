import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MotionButton } from '@/components/motions/motionButton';

const ChevronControl = () => {
  return (
    <>
      {/* Prev */}
      <div className="absolute -left-2 z-3 top-[30%] hidden lg:block -translate-y-1/2">
        <MotionButton className="bg-black/50 text-primary-foreground/80 hover:text-primary-foreground">
          <ChevronLeft className="size-10" />
        </MotionButton>
      </div>
      {/* Next */}
      <div className="absolute -right-2 z-3 top-[30%] hidden lg:block -translate-y-1/2">
        <MotionButton className="bg-black/50 text-primary-foreground/80 hover:text-primary-foreground">
          <ChevronRight className="size-10" />
        </MotionButton>
      </div>
    </>
  );
};

export default ChevronControl;
