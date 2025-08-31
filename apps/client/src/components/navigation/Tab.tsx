import { cn } from '@/lib/utils';
import { useActivePath } from '@/hooks/useActivePath';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { LoaderCircle } from 'lucide-react';
import type { TabProps } from '@/types/navigation/tab.interface';
import { MotionTab } from '../motions/motionButton';

export const Tabs = ({ href, icon, label }: TabProps) => {
  const isActive = useActivePath(href);
  const { isPending, handleClickTab } = useLoadingPath(href);

  return (
    <>
      <MotionTab
        disabled={isPending}
        onClick={handleClickTab}
        translate="no"
        className={cn(
          isActive
            ? 'font-semibold text-accent-foreground dark:bg-primary-foreground/4 backdrop-blur-xs'
            : 'font-medium hover:text-muted-foreground text-foreground/80',
          'select-none flex flex-col p-1 md:p-2 w-full text-xs rounded-md lg:rounded-sm items-center font-poppins justify-center gap-1 md:gap-2 md:flex-row lg:justify-start'
        )}
      >
        <span
          className={cn(
            isActive && label !== 'Explorer' && label !== 'Discover'
              ? '*:fill-accent-foreground '
              : '',
            '*:!size-auto'
          )}
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : icon}
        </span>
        <span>{label}</span>
      </MotionTab>

      {/* Overlay */}
    </>
  );
};
