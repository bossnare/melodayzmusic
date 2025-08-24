import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MotionButton } from '../motions/motionButton';

const ChevronControl = () => {
  return (
    <>
      {/* Prev */}
      <div className="absolute left-2 z-2 top-[40%] hidden lg:block -translate-y-1/2">
        <MotionButton className="bg-black/60">
          <ChevronLeft className="size-10" />
        </MotionButton>
      </div>
      {/* Next */}
      <div className="absolute right-2 z-2 top-[40%] hidden lg:block -translate-y-1/2">
        <MotionButton className="bg-black/60">
          <ChevronRight className="size-10" />
        </MotionButton>
      </div>
    </>
  );
};

export default ChevronControl;
