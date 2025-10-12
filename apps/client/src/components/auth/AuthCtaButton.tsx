import { Button } from '@/components/ui/button';
import type { BaseProps } from '@/types/base.interface';
import { cn } from '@/lib/utils';
import { Spinner } from '../ui/spinner';

export const AuthCtaButton = ({
  children,
  className,
  isPending,
  onClick,
  type = 'button',
  size = 'lg',
  textLoading = 'Un instant...',
}: BaseProps & {
  className?: string;
  isPending?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  size?: 'lg' | 'xl';
  textLoading?: string;
}) => {
  const handleClick = () => {
    if (!onClick) return;
    onClick();
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
        <Spinner className="text-white size-6 dark:text-foreground" />
      )}
      {isPending ? textLoading : children}
      {/* grain overlay */}
      <span
        className="absolute inset-0 opacity-30 pointer-events-none 
        mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
      ></span>
    </Button>
  );
};
