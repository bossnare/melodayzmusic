'use client';

import { Button } from '@/animations/motion/motionButton';
import { Activity, House, HeartPlus, Plus, UserCircle } from 'lucide-react';
import Link from 'next/link';

export const NavBottom = () => {
  const nav = [
    { id: '1', label: 'Accueil', route: '/dashboard', icon: <House /> },
    {
      id: '4',
      label: 'Favoris',
      route: '/dashboard/favoris',
      icon: <HeartPlus />,
    },
    { id: '3', label: 'button' },
    {
      id: '2',
      label: 'Activité',
      route: '/dashboard/activity',
      icon: <Activity />,
    },
    {
      id: '5',
      label: 'Profile',
      route: '/dashboard/profile',
      icon: <UserCircle />,
    },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 flex items-center justify-center w-full gap-6 px-2 text-sm border-t z-6 border-t-gray-200 md:text-base sm:px-0 h-18 md:h-14 bg-gray-50 md:gap-5 md:py-5 lg:gap-2">
      {/* mampiasa end, inona? raha samy misy dashboard ilay route dia ilay active foana active fa tsy miaraka index */}

      {nav.map((tab) =>
        tab.label === 'button' ? (
          <div
            key={tab.id}
            className="relative flex items-center justify-center px-4 text-white w-30 md:w-70 text-md md:text-lg lg:text-xl"
          >
            <Button
              classname={
                'cta absolute drop-shadow-md py-2.5 md:py-2 text-center font-medium w-22 flex justify-center items-center gap-1 md:gap-2 md:w-1/2 border-gray-200 border-1  rounded-lg'
              }
            >
              <>
                <Plus className="size-6" />
                <span>Créer</span>
              </>
            </Button>
          </div>
        ) : (
          <Link
            className="flex flex-col items-center justify-center gap-1 py-1 text-xs font-semibold md:gap-2 md:flex-row bg-amber-20 md:text-base w-22 md:w-40 min-h-14 max-h-14"
            href={'tab.route'}
            key={tab.id}
          >
            <>
              {tab.icon}
              <span className={`select-none`}>{tab.label}</span>
            </>
          </Link>
        )
      )}
    </nav>
  );
};
