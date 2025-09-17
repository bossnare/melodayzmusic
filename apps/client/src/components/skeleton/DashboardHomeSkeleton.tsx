import { Skeleton } from '../ui/skeleton';
import { SongCardSkeleton } from './SongCardSkeleton';

export const DashboardHomeSkeleton = () => {
  return (
    <div className="pt-6 pb-20 space-y-12 lg:space-y-14">
      {/* Title */}
      {/* <Skeleton className="w-40 h-8 mb-4 bg-gray-300 lg:mb-5 rounded-xl dark:bg-primary-foreground/20" /> */}

      {/* Top Artists Items */}
      {/* <div className="flex items-center w-full gap-4 mb-10 flex-nowrap">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className="rounded-full size-16 md:size-18 lg:size-22 dark:bg-primary-foreground/18"
          />
        ))}
      </div> */}

      {/* Grid Skeleton */}
      <div>
        <Skeleton className="w-30 h-6 mb-2 lg:mb-3 rounded-xl bg-foreground/25" />
        <div
          className="grid grid-flow-col auto-cols-[calc(100vw/2.5)] sm:auto-cols-[calc(100vw/4.5)] 
        lg:auto-cols-[calc(100vw/9)] xl:auto-cols-[calc(100vw/8.5)] gap-4 lg:gap-5"
        >
          {[...Array(8)].map((_, index) => (
            <SongCardSkeleton key={index} />
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-6 mb-2 w-35 lg:mb-3 rounded-xl bg-foreground/25" />
        <div
          className="grid grid-flow-col auto-cols-[calc(100vw/2)] sm:auto-cols-[calc(100vw/4.6)] 
        lg:auto-cols-[calc(100vw/9)] xl:auto-cols-[calc(100vw/7)] gap-4 lg:gap-5"
        >
          {[...Array(8)].map((_, index) => (
            <SongCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
