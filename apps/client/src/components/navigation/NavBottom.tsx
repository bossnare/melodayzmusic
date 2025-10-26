'use client';

import { MotionButton } from '../motions/motionButton';
import { navLabels } from './labels/navigation.link';
import { Tabs } from './Tab';

export const NavBottom = () => {
  return (
    <ul className="flex items-center justify-center h-full gap-1 py-2 transition-all duration-300 ease-in-out lg:hidden">
      {navLabels.map((tab) => (
        <li
          className="flex items-center justify-center w-[calc(100%/4.9)] md:w-[calc(100%/5-10px)] shrink-0"
          key={tab.id}
        >
          {tab.label === 'create' ? (
            <div>
              <MotionButton className="*:stroke-2 *:size-6! *:stroke-current focus:text-foreground text-foreground/70 hover:text-muted-foreground bg-background/40 dark:bg-nav hover:bg-transparent! p-3 border-border border">
                <tab.icon weight="bold" />
              </MotionButton>
            </div>
          ) : (
            <Tabs href={tab.href as string} Icon={tab.icon} label={tab.label} />
          )}
        </li>
      ))}
    </ul>
  );
};
