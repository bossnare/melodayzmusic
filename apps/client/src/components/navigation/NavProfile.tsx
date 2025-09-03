import { MotionButton } from '@/components/motions/motionButton';
import { ChevronLeft } from 'lucide-react';

const NavProfile = () => {
  return (
    <nav className="flex justify-between py-1">
      <div>
        <MotionButton className="text-muted-foreground">
          <ChevronLeft className="size-10 lg:size-10" />
        </MotionButton>
      </div>
    </nav>
  );
};

export default NavProfile;
