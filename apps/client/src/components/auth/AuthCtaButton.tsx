import { Button } from '@/components/ui/button';
import type { BaseProps } from '@/types/base.interface';
import { Loader } from '../motions/Loader';
import { cn } from '@/lib/utils';

export const AuthCtaButton = ({
  children,
  className,
  isPending,
  handleClickTab,
}: BaseProps & {
  className: string;
  isPending?: boolean;
  handleClickTab?: () => void;
}) => {
  const handleClick = () => {
    if (!handleClickTab) return;
    handleClickTab();
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className={cn(
        isPending && 'pointer-events-none opacity-80',
        'relative overflow-hidden cta',
        className
      )}
      type="submit"
    >
      {isPending && <Loader className="size-5 dark:border-foreground" />}
      {isPending ? 'Loading...' : children}
      {/* grain overlay */}
      <span
        className="absolute inset-0 opacity-20 pointer-events-none 
        mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
      ></span>
    </Button>
  );
};
