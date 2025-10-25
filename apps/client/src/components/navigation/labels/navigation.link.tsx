import {
  // CompassIcon,
  BinocularsIcon,
  FoldersIcon,
  UserIcon,
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
    id: 2,
    label: 'Explorer',
    href: '/dashboard/favoris',
    icon: BinocularsIcon //CompassIcon,
  },
  {
    id: 3,
    label: 'create',
    href: '/dashboard/create',
    icon: PlusIcon,
  },
  {
    id: 4,
    label: 'MyVibes',
    href: '/dashboard/myvibe',
    icon: FoldersIcon,
  },
  {
    id: 5,
    label: 'Moi',
    href: '/dashboard/profile',
    icon: UserIcon,
  },
];
