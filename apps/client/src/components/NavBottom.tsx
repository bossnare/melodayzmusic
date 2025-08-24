'use client';

import { Heart, Home, LoaderCircle, ListMusic, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
        } select-none flex flex-col p-2 items-center justify-center gap-1 md:gap-2 md:flex-row`}
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
    { id: 1, label: 'Home', href: '/dashboard', icon: <Home /> },
    {
      id: 4,
      label: 'Favoris',
      href: '/dashboard/favoris',
      icon: <Heart />,
    },
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
    <div className="flex items-center justify-center gap-10 pb-8 md:py-2 sm:gap-8 md:gap-4 lg:hidden">
      {navs.map((tab) => (
        <div
          className="flex items-center justify-center flex-1 text-sm font-poppins sm:text-base"
          key={tab.id}
        >
          <NavTab href={tab.href as string} icon={tab.icon} label={tab.label} />
        </div>
      ))}
    </div>
  );
};

{
  /* <MotionButton
             size="icon"
              className={
                 'dark:hover:text-accent-foreground hover:bg-gray-900 bg-gray-900 shadow-sm select-none dark:text-muted-foreground font-medium flex justify-center items-center gap-1 text-sm md:text-base md:gap-2'
              }
            >
              <Plus strokeWidth={2} className="size-7" />
             </MotionButton> */
}
