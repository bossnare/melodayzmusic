import { cn } from '@/lib/utils';
import { useActivePath } from '@/hooks/useActivePath';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import type { TabProps } from '@/types/navigation/tab.interface';
import { MotionTab } from '../motions/motionButton';
import { Loader } from '../motions/Loader';

export const Tabs = ({ href, Icon, label }: TabProps) => {
  const isActive = useActivePath(href);
  const { isPending, handleClickTab } = useLoadingPath(href);

  return (
    <>
      <button
        disabled={isPending}
        onClick={handleClickTab}
        translate="no"
        className={cn(
          isActive
            ? 'dark:lg:bg-primary-foreground/2 backdrop-blur-xs'
            : 'font-medium hover:text-muted-foreground text-foreground/80',
          'select-none flex flex-col p-1 md:p-2 w-[75%] md:w-[95%] text-xs lg:text-sm rounded-sm items-center font-poppins justify-center gap-1 md:gap-2 md:flex-row lg:justify-start'
        )}
      >
        <MotionTab className="*:!size-6">
          {isPending ? (
            <Loader className="dark:border-primary-foreground/90 size-3" />
          ) : (
            <Icon weight={isActive ? 'fill' : 'bold'} />
          )}
        </MotionTab>
        <span>{label}</span>
      </button>

      {/* Overlay */}
    </>
  );
};
