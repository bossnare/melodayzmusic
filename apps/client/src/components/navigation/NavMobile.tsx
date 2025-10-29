import { AlignLeft } from 'lucide-react';
import { MotionButtonLeft } from '../motions/motionButton';

const NavMobile = () => {
  return (
    <nav className="sticky inset-x-0 top-0 left-0 flex px-0.5 py-1 lg:hidden">
      <MotionButtonLeft className="sm:p-1">
        <AlignLeft className="size-auto" />
      </MotionButtonLeft>
    </nav>
  );
};

export default NavMobile;
