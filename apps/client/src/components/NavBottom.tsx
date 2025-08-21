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
      label: 'Vibe',
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
    <nav className="sticky bottom-0 left-0 flex items-center justify-center w-full px-2 border-t z-6 border-t-gray-200 dark:border-t-gray-800 h-18 sm:h-16 bg-gray-50 dark:bg-gray-950 md:gap-8 md:py-5">
      {/* mampiasa end, inona? raha samy misy dashboard ilay href dia ilay active foana active fa tsy miaraka index */}

      {nav.map((tab) =>
        tab.label === 'button' ? (
          <div
            key={tab.id}
            className="relative flex items-center justify-center px-4 w-30 md:w-70"
          >
            <Button
              size="lg"
              className={
                'cta absolute text-accent-foreground rounded-full shadow-sm select-none dark:text-accent-foreground drop-shadow-md text-center font-medium w-26 flex justify-center items-center gap-1 text-base md:gap-2 md:w-1/2'
              }
            >
              <>
                <Plus strokeWidth={2.6} className="size-6" />
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



