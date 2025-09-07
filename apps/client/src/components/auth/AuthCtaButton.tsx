import { Button } from '@/components/ui/button';
import type { BaseProps } from '@/types/base.interface';
import { Loader } from '../motions/Loader';

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
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!handleClickTab) return;
    handleClickTab();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      size="lg"
      className={`relative overflow-hidden ${className} cta`}
      type="submit"
    >
      {isPending && (
        <Loader className="size-5 dark:border-primary-foreground" />
      )}
      {isPending ? 'Loading...' : children}
      {/* grain overlay */}
      <span
        className="absolute inset-0 opacity-20 pointer-events-none 
                         mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
      ></span>
    </Button>
  );
};
