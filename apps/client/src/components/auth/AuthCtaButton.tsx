import { Button } from '@/components/ui/button';
import type { BaseProps } from '@/types/base.interface';
import { Loader } from '../motions/Loader';
import { cn } from '@/lib/utils';

export const AuthCtaButton = ({
  children,
  className,
  isPending,
  handleClickTab,
  type = 'button',
  size = 'lg',
}: BaseProps & {
  className: string;
  isPending?: boolean;
  handleClickTab?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'lg' | 'xl';
}) => {
  const handleClick = () => {
    if (!handleClickTab) return;
    handleClickTab();
  };

  return (
    <Button
      onClick={handleClick}
      size={size}
      className={cn(
        isPending && 'pointer-events-none',
        'relative overflow-hidden bg-premium',
        className
      )}
      type={type}
    >
      {isPending && (
        <Loader className="size-6 border-white dark:border-foreground" />
      )}
      {isPending ? 'Loading...' : children}
      {/* grain overlay */}
      <span
        className="absolute inset-0 opacity-30 pointer-events-none 
        mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
      ></span>
    </Button>
  );
};
