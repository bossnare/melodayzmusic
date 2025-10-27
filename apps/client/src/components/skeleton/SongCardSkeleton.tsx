import { AspectRatio } from '../ui/aspect-ratio';
import { Skeleton } from '../ui/skeleton';

export const SongCardSkeleton = () => {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <AspectRatio ratio={1}>
          <Skeleton className="rounded-[2px] size-full bg-foreground/30" />
        </AspectRatio>
        <div className="space-y-2">
          <Skeleton className="h-4 bg-foreground/30 w-[90%]" />
          <Skeleton className="h-4 bg-foreground/25 w-[70%]" />
        </div>
      </div>
    </>
  );
};
