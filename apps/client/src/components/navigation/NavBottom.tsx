'use client';

import { MotionButton } from '../motions/motionButton';
import { navLabels } from './labels/navigation.link';
import { Tabs } from './Tab';
import { DrawerTrigger, Drawer } from '@/components/ui/drawer';
import { Content } from '@/components/songs/ui/overlay-player';

export const NavBottom = () => {
  return (
    <ul className="flex items-center justify-center h-full gap-1 py-2 transition-all duration-300 ease-in-out lg:hidden">
      <Drawer>
        {navLabels.map((tab) => (
          <li
            className="flex items-center justify-center w-[calc(100%/4.9)] md:w-[calc(100%/5-10px)] shrink-0"
            key={tab.id}
          >
            {tab.label === 'create' ? (
              <div className="active:bg-muted">
                <DrawerTrigger asChild>
                  <MotionButton className="*:stroke-2 *:size-6! *:stroke-current text-foreground/70 active:text-muted-foreground lg:hover:text-muted-foreground bg-muted p-3 border-border border">
                    <tab.icon weight="bold" />
                  </MotionButton>
                </DrawerTrigger>
              </div>
            ) : (
              <Tabs
                href={tab.href as string}
                Icon={tab.icon}
                label={tab.label}
              />
            )}
          </li>
        ))}
        {/* content for this drawer */}
        <Content className="bg-linear-to-b from-80% from-background to-muted" />
      </Drawer>
    </ul>
  );
};
