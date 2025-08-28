import { Skeleton } from '../ui/skeleton';
import { SongCardSkeleton } from './SongCardSkeleton';

export const DashboardHomeSkeleton = () => {
  return (
    <div className="pt-10 pb-20">
      {/* Title */}
      <Skeleton className="w-40 h-8 mb-4 bg-gray-300 lg:mb-5 rounded-xl dark:bg-primary-foreground/20" />

      {/* Top Artists Items */}
      <div className="flex items-center w-full gap-4 mb-10 flex-nowrap">
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className="rounded-full size-16 md:size-18 lg:size-22 dark:bg-primary-foreground/18"
          />
        ))}
      </div>

      {/* Grid Skeleton */}
      <Skeleton className="h-8 mb-4 bg-gray-300 w-50 lg:mb-5 rounded-xl dark:bg-primary-foreground/20" />
      <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {[...Array(8)].map((_, index) => (
          <SongCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};
