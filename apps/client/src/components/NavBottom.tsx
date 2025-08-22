'use client';

import { Heart, Home, LoaderCircle, ListMusic, Plus, User } from 'lucide-react';
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
    if (pathname === href) return;
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
            ? 'font-medium text-accent-foreground'
            : 'font-normal text-muted-foreground hover:text-foreground'
        } select-none transition-transform duration-200 ease-in-out flex flex-col p-2 items-center justify-center gap-1 md:gap-2 md:flex-row`}
      >
        <span
          className={`${pathname === href ? '*:fill-accent-foreground' : ''}`}
        >
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
    { id: 1, label: 'Flow', href: '/dashboard', icon: <Home /> },
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
    <nav className="sticky bottom-0 left-0 flex items-center justify-center w-full h-auto px-2 pb-10 border-t md:pb-auto z-6 border-t-gray-200 dark:border-t-gray-800 sm:h-16 bg-gray-50 dark:bg-gray-950 gap-7 sm:gap-8 md:py-5">
      {/* mampiasa end, inona? raha samy misy dashboard ilay href dia ilay active foana active fa tsy miaraka index */}

      {navs.map((tab) =>
        tab.label === 'button' ? (
          <div
            key={tab.id}
            className="relative flex flex-col items-center justify-center px-4"
          >
            <Button
              size="icon"
              className={
                '!text-muted-foreground absolute hover:text-accent p-4 hover:bg-gray-900 bg-gray-900 rounded-full shadow-sm select-none dark:text-accent-foreground font-medium flex justify-center items-center gap-1 text-sm md:text-base md:gap-2'
              }
            >
              <Plus strokeWidth={2} className="size-7" />
            </Button>
          </div>
        ) : (
          <div
            className="flex items-center justify-center text-xs md:text-base grow"
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
