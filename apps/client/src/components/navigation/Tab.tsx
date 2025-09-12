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
            ? 'lg:bg-foreground/4 text-foreground lg:w-[95%]'
            : 'hover:text-foreground/50 text-foreground/80 lg:w-auto',
          'select-none flex flex-col p-1 md:p-2 w-[75%] md:w-[50%] font-semibold text-xs lg:text-sm rounded-sm items-center font-poppins justify-center gap-1 md:gap-2 md:flex-row lg:justify-start'
        )}
      >
        <MotionTab className="*:!size-6">
          {isPending && !isActive ? (
            <Loader className="border-foreground/90 !size-4" />
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
