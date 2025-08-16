export const SongCardSkeleton = () => {
  return (
    <div className="col-span-1 hover:bg-gray-50 dark:bg-gray-950 animate-pulse">
      <div className="flex-col sm:flex sm:flex-row sm:flex-wrap sm:items-start md:flex-nowrap md:items-stretch md:flex-col border-gray-900/80">
        {/* Image Skeleton */}
        <div className="relative overflow-hidden cursor-pointer sm:flex-1/3 shrink-0 rounded-t-md">
          <figure className="w-full bg-gray-300 dark:bg-gray-700 shrink h-50 md:h-40 lg:h-40 xl:h-34" />
        </div>

        {/* Info Skeleton */}
        <div className="flex flex-wrap gap-2 p-2 grow sm:flex-1/2">
          {/* Profile Picture Skeleton */}
          <div className="bg-gray-300 border-2 border-gray-200 rounded-full size-10 md:size-8 shrink-0 dark:bg-gray-700" />

          {/* Username Skeleton */}
          <span className="md:w-[calc(100%-50px)] mt-1 shrink-0 w-full inline-block bg-gray-300 dark:bg-gray-700 h-4 rounded" />

          {/* Date Skeleton */}
          <span className="h-4 mt-1 bg-gray-300 rounded sm:py-4 w-30 lg:w-full dark:bg-gray-700" />
        </div>

        {/* Action Buttons Skeleton */}
      </div>
    </div>
  );
};
