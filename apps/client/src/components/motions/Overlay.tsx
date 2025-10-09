import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

export const Overlay = ({
  isPending,
  textLoading,
}: {
  isPending?: boolean;
  textLoading?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-black/50 z-60 fixed inset-0 flex items-center gap-2 flex-col md:flex-row justify-center backdrop-blur-sm',
        isPending
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      )}
    >
      <Spinner className="text-white size-10 md:size-6" />
      <span>{textLoading}</span>
    </div>
  );
};
