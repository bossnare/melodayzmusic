import { cn } from '@/lib/utils';
import { useActivePath } from '@/hooks/useActivePath';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { LoaderCircle } from 'lucide-react';
import type { TabProps } from '@/types/navigation/tab.interface';

export const Tabs = ({ href, icon, label }: TabProps) => {
  const isActive = useActivePath(href);
  const { isPending, handleClickTab } = useLoadingPath(href);

  return (
    <>
      <button
        disabled={isPending}
        onClick={handleClickTab}
        className={cn(
          isActive
            ? 'font-semibold text-accent-foreground dark:lg:bg-primary-foreground/5'
            : 'font-medium hover:text-muted-foreground',
          'select-none flex flex-col p-2 lg:w-full rounded-xs items-center font-poppins justify-center gap-1 md:gap-2 md:flex-row lg:justify-start'
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
