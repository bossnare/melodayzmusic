'use client';

import { Heart, Infinity, LoaderCircle, ListMusic, Plus, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface Tab {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavTab = ({ href, icon, label }: Tab) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push(href);
  };

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <>
      <Link
        onClick={handleClick}
        href={href}
        className={`${
          pathname === href
            ? 'font-extrabold active-tab text-[#8A2BE2]'
            : 'font-semibold text-muted-foreground hover:text-foreground'
        } select-none flex flex-col items-center justify-center gap-1 md:gap-2 md:flex-row`}
      >
        <span className={`${pathname === href ? '*:fill-[#8A2BE2]' : ''}`}>
          {isLoading ? <LoaderCircle className="animate-spin" /> : icon}
        </span>
        <span>{label}</span>
      </Link>

      {/* Overlay */}
    </>
  );
};

export const NavBottom = () => {
  const navs = [
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

      {navs.map((tab) =>
        tab.label === 'button' ? (
          <div
            key={tab.id}
            className="relative flex items-center justify-center w-22 md:w-70"
          >
            <Button
              size="icon"
              className={
                'cta absolute text-accent-foreground rounded-full shadow-sm select-none dark:text-accent-foreground font-medium w-full flex justify-center items-center gap-1 text-sm md:text-base md:gap-2 md:w-1/2'
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
            className="flex items-center justify-center py-1 text-xs md:text-base md:w-40"
            key={tab.id}
          >
            <NavTab
              href={tab.href as string}
              icon={tab.icon}
              label={tab.label}
            />
          </div>
        )
      )}
    </nav>
  );
};

