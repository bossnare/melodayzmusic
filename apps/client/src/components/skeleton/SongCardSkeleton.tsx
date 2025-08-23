import { AspectRatio } from '../ui/aspect-ratio';
import { Skeleton } from '../ui/skeleton';

export const SongCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-4">
      <AspectRatio ratio={1}>
        <Skeleton className="size-full dark:bg-gray-700 rounded-xl" />
      </AspectRatio>
      <div className="space-y-2">
        <Skeleton className="h-4 dark:bg-gray-700 w-[80%]" />
        <Skeleton className="h-4 dark:bg-gray-700 w-[60%]" />
      </div>
    </div>
  );
};
