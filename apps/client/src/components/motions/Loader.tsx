import { cn } from '@/lib/utils';

export const Loader = ({ className }: { className: string }) => {
  return (
    <div
      className={cn(
        'animate-spin border-3 rounded-full !border-t-transparent',
        className
      )}
    ></div>
  );
};
