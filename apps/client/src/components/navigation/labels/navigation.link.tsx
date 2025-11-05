import {
  // CompassIcon,
  BinocularsIcon,
  FoldersIcon,
  HouseIcon,
  PlusIcon,
  UserIcon,
} from '@phosphor-icons/react/dist/ssr';

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
    href: '/dashboard/explore',
    icon: BinocularsIcon, //CompassIcon,
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
    href: '/dashboard/library',
    icon: FoldersIcon,
  },
  {
    id: 5,
    label: 'Moi',
    href: '/dashboard/profile',
    icon: UserIcon,
  },
];
