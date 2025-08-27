'use client';

import { LoaderCircle } from 'lucide-react';
import { navs } from './navigation.link';
import { cn } from '@/lib/utils';
import { useActivePath } from '@/hooks/useActivePath';
import { useLoadingPath } from '@/hooks/useLoadingPath';
interface Tab {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavTab = ({ href, icon, label }: Tab) => {
  const isActive = useActivePath(href);
  const { isPending, handleClickNav } = useLoadingPath(href);

  return (
    <>
      <button
        disabled={isPending}
        onClick={handleClickNav}
        className={cn(
          isActive
            ? 'font-semibold text-accent-foreground'
            : 'font-medium text-muted-foreground hover:text-foreground',
          'select-none flex flex-col p-2 items-center justify-center gap-1 md:gap-2 md:flex-row'
        )}
      >
        <span>
          {isPending ? <LoaderCircle className="animate-spin" /> : icon}
        </span>
        <span>{label}</span>
      </button>

      {/* Overlay */}
    </>
  );
};

export const NavBottom = () => {
  return (
    <ul className="flex items-center justify-center gap-2 pb-10 sm:pb-8 transition-all duration-300 ease-in-out md:py-2 sm:gap-0 lg:hidden">
      {navs.map((tab) => (
        <li
          className="flex items-center justify-center w-[calc(100%/4)] md:w-[calc(100%/4-6px)] shrink-0 text-sm font-poppins"
          key={tab.id}
        >
          <NavTab href={tab.href as string} icon={tab.icon} label={tab.label} />
        </li>
      ))}
    </ul>
  );
};
