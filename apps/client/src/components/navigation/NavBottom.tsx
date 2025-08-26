'use client';

import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navs } from './navigation.link';
import { cn } from '@/lib/utils';

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
        className={cn(
          pathname === href
            ? 'font-semibold text-accent-foreground'
            : 'font-medium text-muted-foreground hover:text-foreground',
          'select-none flex flex-col p-2 items-center justify-center gap-1 md:gap-2 md:flex-row'
        )}
      >
        <span>
          {isLoading ? <LoaderCircle className="animate-spin" /> : icon}
        </span>
        <span>{label}</span>
      </Link>

      {/* Overlay */}
    </>
  );
};

export const NavBottom = () => {
  return (
    <div className="flex items-center justify-center gap-2 pb-8 transition-all duration-300 ease-in-out md:py-2 sm:gap-0 lg:hidden">
      {navs.map((tab) => (
        <div
          className="flex items-center justify-center w-[calc(100%/4)] md:w-[calc(100%/4-6px)] shrink-0 text-sm font-poppins"
          key={tab.id}
        >
          <NavTab href={tab.href as string} icon={tab.icon} label={tab.label} />
        </div>
      ))}
    </div>
  );
};
