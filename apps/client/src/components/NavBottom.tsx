'use client';

import { ListMusic, Infinity, HeartPlus, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export const NavBottom = () => {
  const nav = [
    { id: 1, label: 'Flow', href: '/dashboard', icon: <Infinity /> },
    {
      id: 4,
      label: 'Favoris',
      href: '/dashboard/favoris',
      icon: <HeartPlus />,
    },
    { id: 3, label: 'button' },
    {
      id: 2,
      label: 'Ma vibe',
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

  return (
    <nav className="sticky bottom-0 left-0 flex items-center justify-center w-full gap-6 px-2 text-sm border-t z-6 border-t-gray-200 dark:border-t-gray-800 md:text-base sm:px-0 h-18 sm:h-16 bg-gray-50 dark:bg-gray-950 md:gap-5 md:py-5 lg:gap-2">
      {/* mampiasa end, inona? raha samy misy dashboard ilay href dia ilay active foana active fa tsy miaraka index */}

      {nav.map((tab) =>
        tab.label === 'button' ? (
          <div
            key={tab.id}
            className="relative flex items-center justify-center px-4 bg-red-200 w-30 md:w-70 text-md md:text-lg lg:text-xl"
          >
            <Button
              className={
                'cta absolute text-accent-foreground select-none dark:text-accent-foreground drop-shadow-md py-2.5 md:py-2 text-center font-medium w-22 flex justify-center items-center gap-1 md:gap-2 md:w-1/2'
              }
            >
              <>
                <Plus strokeWidth={2.5} className="size-6" />
                <span>Créer</span>
              </>
            </Button>
          </div>
        ) : (
          <div
            className="flex items-center justify-center py-1 text-xs font-semibold md:text-base w-22 md:w-40 min-h-14 max-h-14"
            key={tab.id}
          >
            <>
              <Link
                href={tab.href as string}
                className={`select-none flex flex-col items-center hover:text-muted-foreground justify-center gap-1 md:gap-2 md:flex-row`}
              >
                {tab.icon} {tab.label}
              </Link>
            </>
          </div>
        )
      )}
    </nav>
  );
};
