'use client';

import { MotionButton } from '../motions/motionButton';
import { navLabels } from './labels/navigation.link';
import { Tabs } from './Tab';

export const NavBottom = () => {
  return (
    <ul className="flex items-center justify-center gap-1 py-1 transition-all duration-300 ease-in-out md:py-2 lg:hidden bg-gradient-to-r dark:from-nav via-primary/15 dark:via-primary/4 dark:to-nav from-background to-background">
      {navLabels.map((tab) => (
        <li
          className="flex items-center justify-center w-[calc(100%/4.9)] md:w-[calc(100%/5-10px)] shrink-0"
          key={tab.id}
        >
          {tab.label === 'create' ? (
            <div>
              <MotionButton className="*:stroke-2 *:!size-6 *:stroke-current hover:text-muted-foreground hover:!bg-transparent p-[12px] border-border border">
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
