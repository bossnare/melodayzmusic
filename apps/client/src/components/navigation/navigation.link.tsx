import {
  CompassIcon,
  PlaylistIcon,
  SparkleIcon,
  HouseIcon,
  PlusIcon,
} from '@phosphor-icons/react';

export const navLabels = [
  {
    id: 1,
    label: 'Accueil',
    href: '/dashboard',
    icon: HouseIcon,
  },
  {
    id: 4,
    label: 'Explorer',
    href: '/dashboard/favoris',
    icon: CompassIcon,
  },
  {
    id: 6,
    label: 'create',
    href: '/dashboard/create',
    icon: PlusIcon,
  },
  {
    id: 5,
    label: 'Discover',
    href: '/dashboard/discover',
    icon: SparkleIcon,
  },
  {
    id: 2,
    label: 'MyVibes',
    href: '/dashboard/myvibe',
    icon: PlaylistIcon,
  },
];
