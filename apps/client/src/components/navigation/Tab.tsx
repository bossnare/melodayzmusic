import { cn } from '@/lib/utils';
import { useActivePath } from '@/hooks/useActivePath';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import type { TabProps } from '@/types/navigation/tab.interface';
import { MotionTab } from '@/components/motions/motionButton';
import { Loader } from '@/components/motions/Loader';

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
            ? 'lg:bg-gradient-to-r lg:from-primary/4 lg:via-primary/8 lg:to-primary/4 text-primary lg:w-full'
            : 'hover:text-foreground/80 text-foreground lg:w-auto',
          'select-none flex flex-col p-1 md:p-2 w-[75%] md:w-[50%] active:rounded-lg lg:active:w-full active:bg-primary/14 font-medium text-xs lg:text-sm rounded-sm items-center font-montserrat justify-center gap-1 md:gap-2 md:flex-row lg:justify-start'
        )}
      >
        <MotionTab>
          {isPending && !isActive ? (
            <Loader className="border-foreground/90 size-7 lg:size-6" />
          ) : (
            <Icon
              className="size-7 lg:size-6"
              weight={isActive ? 'fill' : 'bold'}
            />
          )}
        </MotionTab>
        <span>{label}</span>
      </button>

      {/* Overlay */}
    </>
  );
};
