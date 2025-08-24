import { AlignLeft } from 'lucide-react';
import { MotionButtonLeft } from './motions/motionButton';

const NavMobile = () => {
  return (
    <nav className="sticky inset-x-0 px-1 top-0 left-0 py-1 flex md:hidden">
      <MotionButtonLeft>
        <AlignLeft className="size-auto" />
      </MotionButtonLeft>
    </nav>
  );
};

export default NavMobile;
