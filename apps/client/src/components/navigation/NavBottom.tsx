'use client';

import { MotionButton } from '../motions/motionButton';
import { navLabels } from './navigation.link';
import { Tabs } from './Tab';

export const NavBottom = () => {
  return (
    <ul className="flex items-center justify-center gap-1 pt-1 pb-10 transition-all duration-300 ease-in-out sm:pb-6 sm:gap-0 md:py-2 lg:hidden">
      {navLabels.map((tab) => (
        <li
          className="flex items-center justify-center w-[calc(100%/4.9)] md:w-[calc(100%/4-10px)] shrink-0"
          key={tab.id}
        >
          {tab.label === 'create' ? (
            <div>
              <MotionButton className="*:!size-auto *:stroke-2 *:stroke-current text-foreground/80 hover:text-muted-foreground hover:!bg-transparent p-[10px] border-border border">
                {tab.icon}
              </MotionButton>
            </div>
          ) : (
            <Tabs href={tab.href as string} icon={tab.icon} label={tab.label} />
          )}
        </li>
      ))}
    </ul>
  );
};
