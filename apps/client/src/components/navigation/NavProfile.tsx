import { MotionButton } from '@/components/motions/motionButton';
import { ChevronLeft } from 'lucide-react';

const NavProfile = () => {
  return (
    <nav className="flex justify-between py-1 fixed inset-x-0 top-0">
      <div>
        <MotionButton className="text-muted-foreground p-1">
          <ChevronLeft className="size-10" />
        </MotionButton>
      </div>
    </nav>
  );
};

export default NavProfile;
