'use client';

import { useState, useEffect } from 'react';
import { NavBar } from './Navbar';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isNotAtProfil, setIsNotAtProfil] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsNotAtProfil(pathname !== '/dashboard/profile');
  }, [pathname]);

  return (
    <>
      {isNotAtProfil && (
        <header className="sticky inset-x-0 top-0 w-full px-2 py-2 border-b sm:px-4 z-5 border-b-gray-200 dark:border-border lg:border-0 dark:bg-background">
          <NavBar />
        </header>
      )}
    </>
  );
};
