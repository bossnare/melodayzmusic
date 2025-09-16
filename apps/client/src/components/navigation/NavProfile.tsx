import { MotionButton } from '@/components/motions/motionButton';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NavProfile = () => {
  const router = useRouter();

  return (
    <nav className="fixed inset-x-0 top-0 flex justify-between py-1 z-5 bg-background">
      <div>
        <MotionButton
          onClick={() => router.back()}
          className="p-1 text-muted-foreground"
        >
          <ChevronLeft className="size-10" />
        </MotionButton>
      </div>
    </nav>
  );
};

export default NavProfile;
