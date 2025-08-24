import { AlignLeft } from 'lucide-react';
import { MotionButton } from './motions/motionButton';

const NavMobile = () => {
  return (
    <nav className="sticky w-full px-1 py-1 md:hidden">
      <MotionButton>
        <AlignLeft className="size-auto" />
      </MotionButton>
    </nav>
  );
};

export default NavMobile;
