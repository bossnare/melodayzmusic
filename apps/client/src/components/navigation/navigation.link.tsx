import { Heart, Compass, ListMusic, User } from 'lucide-react';

export const navs = [
  {
    id: 1,
    label: 'Explorer',
    href: '/dashboard',
    icon: <Compass />,
  },
  {
    id: 4,
    label: 'Favoris',
    href: '/dashboard/favoris',
    icon: <Heart />,
  },
  {
    id: 2,
    label: 'MyVibes',
    href: '/dashboard/myvibe',
    icon: <ListMusic />,
  },
  {
    id: 5,
    label: 'Moi',
    href: '/dashboard/profile',
    icon: <User />,
  },
];
