import { SongCardSkeleton } from './SongCardSkeleton';

export const DashboardSkeleton = () => {
  return (
    <section className="pt-10 pb-10 md:px-4 animate-pulse bg-gray-50">
      {/* Title */}
      <h1 className="w-40 h-6 pb-2 ml-2 text-lg font-bold bg-gray-300 rounded sm:text-2xl md:text-xl lg:text-4xl"></h1>

      {/* Discover Scrollable Items */}
      <div className="flex items-center w-full h-40 gap-4 p-2 mb-10 overflow-x-auto md:overflow-x-hidden bg-gray-50 lg:h-50 flex-nowrap">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="h-full min-w-[calc(100%/2-4px)] lg:min-w-[calc(100%/3-6px)] bg-gray-200 rounded-lg"
          ></div>
        ))}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-4 pt-2 border-t sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 border-t-gray-200">
        {[...Array(8)].map((_, index) => (
          <SongCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};
