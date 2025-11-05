import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useMap = () => {
  const [isAtProfil, setIsAtProfil] = useState(false);
  const [isAtHome, setIsAtHome] = useState(false);
  const [isAtLibrary, setIsAtLibrary] = useState(false);
  const [isAtExplore, setIsAtExplore] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsAtProfil(pathname === '/dashboard/profile');
    setIsAtHome(pathname === '/dashboard');
    setIsAtLibrary(pathname === '/dashboard/library');
    setIsAtExplore(pathname === '/dashboard/explore');
  }, [pathname]);

  return { isAtHome, isAtProfil, isAtExplore, isAtLibrary };
};
