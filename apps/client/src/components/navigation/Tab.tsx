import { Loader } from '@/components/motions/Loader';
import { MotionTab } from '@/components/motions/motionButton';
import { useActivePath } from '@/hooks/useActivePath';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { cn } from '@/lib/utils';
import type { TabProps } from '@/types/navigation/tab.interface';

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
            ? 'lg:bg-gradient-to-r lg:from-foreground/4 lg:via-foreground/10 lg:to-foreground/4 text-foreground lg:w-full lg:font-bold'
            : 'hover:text-foreground/85 text-foreground/70 lg:w-auto',
          'select-none flex flex-col p-1 md:p-2 w-[75%] md:w-[50%] active:rounded-md lg:active:w-full active:bg-primary/10 font-medium lg:font-semibold text-xs lg:text-sm rounded-sm items-center font-montserrat justify-center gap-1 md:gap-2 md:flex-row lg:justify-start'
        )}
      >
        <MotionTab>
          {isPending && !isActive ? (
            <Loader className="border-foreground/90 size-[30px] lg:size-6" />
          ) : (
            <Icon
              className="size-[30px] lg:size-6"
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
