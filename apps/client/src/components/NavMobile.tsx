import { AlignLeft } from 'lucide-react';
import { MotionButtonLeft } from './motions/motionButton';

const NavMobile = () => {
  return (
    <nav className="sticky inset-x-0 top-0 left-0 flex px-1 py-1 sm:px-6 lg:hidden">
      <MotionButtonLeft>
        <AlignLeft className="size-auto" />
      </MotionButtonLeft>
    </nav>
  );
};

export default NavMobile;
