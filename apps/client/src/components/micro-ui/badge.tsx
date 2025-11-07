import { ROLE } from '@/constants/constants';
import { Badge, Headphones, Gamepad2, Music3 } from 'lucide-react';

type UserBadgeType = {
  userRole?: string;
};

const { USER, ARTIST, DEV } = ROLE;

const UserBadge = ({ userRole = USER }: UserBadgeType) => {
  const renderIcon = () => {
    switch (userRole) {
      case USER:
        return <Headphones />;
      case ARTIST:
        return <Music3 />;
      case DEV:
        return <Gamepad2 />;
    }
  };

  return (
    <div className="w-auto relative">
      <Badge className="size-6 fill-primary stroke-primary" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inset-0 flex items-center justify-center *:size-3">
        {renderIcon()}
      </div>
    </div>
  );
};

export { UserBadge };
