import { MotionButton } from '@/components/motions/motionButton';
import { ArrowLeft } from 'lucide-react';

const NavProfile = () => {
  return (
    <nav className="flex justify-between py-1">
      <div>
        <MotionButton className="text-muted-foreground">
          <ArrowLeft className="size-auto lg:size-7" />
        </MotionButton>
      </div>
    </nav>
  );
};

export default NavProfile;
