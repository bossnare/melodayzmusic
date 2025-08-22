import { SongCardSkeleton } from './SongCardSkeleton';

export const DashboardHomeSkeleton = () => {
  return (
    <section className="pt-10 pb-10 *:animate-pulse bg-gray-50 dark:bg-gray-950">
      {/* Title */}
      <h1 className="w-40 h-8 pb-2 ml-2 text-lg font-bold bg-gray-300 rounded dark:bg-gray-700 sm:text-2xl md:text-xl lg:text-4xl"></h1>

      {/* Discover Scrollable Items */}
      <div className="flex items-center w-full h-40 gap-4 p-2 mb-10 bg-gray-50 dark:bg-gray-950 flex-nowrap">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-full min-w-[calc(100%/2-4px)] lg:min-w-[calc(100%/3-6px)] bg-gray-200 dark:bg-gray-800 rounded-lg"
          ></div>
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[...Array(8)].map((_, index) => (
          <SongCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};
