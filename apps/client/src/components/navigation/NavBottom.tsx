'use client';

import { navLabels } from './navigation.link';
import { Tabs } from './Tab';

export const NavBottom = () => {
  return (
    <ul className="flex items-center justify-center gap-2 pt-1 pb-10 transition-all duration-300 ease-in-out sm:pb-6 sm:gap-0 lg:hidden">
      {navLabels.map((tab) => (
        <li
          className="flex items-center justify-center w-[calc(100%/4)] md:w-[calc(100%/4-6px)] shrink-0 text-xs"
          key={tab.id}
        >
          <Tabs href={tab.href as string} icon={tab.icon} label={tab.label} />
        </li>
      ))}
    </ul>
  );
};
