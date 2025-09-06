import { Button } from '@/components/ui/button';
import type { BaseProps } from '@/types/base.interface';

export const AuthCtaButton = ({ children }: BaseProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="relative overflow-hidden rounded-full cta"
      type="submit"
    >
      {children}
      {/* grain overlay */}
      <span
        className="absolute inset-0 opacity-20 pointer-events-none 
                         mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
      ></span>
    </Button>
  );
};
