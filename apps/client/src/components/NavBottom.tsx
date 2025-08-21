'use client';

import { ListMusic, Infinity, Heart, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

export const NavBottom = () => {
  const pathname = usePathname();

  const nav = [
    { id: 1, label: 'Flow', href: '/dashboard', icon: <Infinity /> },
    {
      id: 4,
      label: 'Favoris',
      href: '/dashboard/favoris',
      icon: <Heart />,
    },
    { id: 3, label: 'button' },
    {
      id: 2,
      label: 'MyVibe',
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
    <nav className="sticky bottom-0 left-0 flex items-center justify-center w-full px-2 border-t z-6 border-t-gray-200 dark:border-t-gray-800 h-15 sm:h-16 bg-gray-50 dark:bg-gray-950 gap-7 sm:gap-8 md:py-5">
      {/* mampiasa end, inona? raha samy misy dashboard ilay href dia ilay active foana active fa tsy miaraka index */}

      {nav.map((tab) =>
        tab.label === 'button' ? (
          <div
            key={tab.id}
            className="relative flex items-center justify-center w-22 md:w-70"
          >
            <Button
              size="icon"
              className={
                'cta absolute text-accent-foreground rounded-full shadow-sm select-none dark:text-accent-foreground font-medium w-full flex justify-center items-center gap-1 text-sm md:text-base md:gap-2 md:w-7/8'
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
            className="flex items-center justify-center py-1 text-xs md:text-base md:w-40 min-h-14 max-h-14"
            key={tab.id}
          >
            <>
              <Link
                href={tab.href as string}
                className={`${
                  pathname === tab.href
                    ? 'font-extrabold active-tab text-[#8A2BE2]'
                    : 'font-semibold text-muted-foreground hover:text-foreground'
                } select-none flex flex-col items-center justify-center gap-1 md:gap-2 md:flex-row`}
              >
                <span
                  className={`${
                    pathname === tab.href
                      ? 'bg-gray-950/90 rounded-full *:fill-[#8A2BE2]'
                      : ''
                  }`}
                >
                  {tab.icon}
                </span>{' '}
                <span>{tab.label}</span>
              </Link>
            </>
          </div>
        )
      )}
    </nav>
  );
};
