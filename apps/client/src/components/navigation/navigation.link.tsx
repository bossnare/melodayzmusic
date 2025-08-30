import { Compass, ListMusic, SparkleIcon, Home, Plus } from 'lucide-react';

export const navLabels = [
  {
    id: 1,
    label: 'Accueil',
    href: '/dashboard',
    icon: <Home />,
  },
  {
    id: 4,
    label: 'Explorer',
    href: '/dashboard/favoris',
    icon: <Compass />,
  },
  {
    id: 6,
    label: 'create',
    href: '/dashboard/create',
    icon: <Plus />,
  },
  {
    id: 5,
    label: 'Discover',
    href: '/dashboard/discover',
    icon: <SparkleIcon />,
  },
  {
    id: 2,
    label: 'MyVibes',
    href: '/dashboard/myvibe',
    icon: <ListMusic />,
  },
];
