'use client';

import { cn } from '@/lib/utils';
import { Loader } from '../motions/Loader';
import { Button } from '../ui/button';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { MelodayzMusic } from '../branding/logo';
import { ArrowLeft } from 'lucide-react';
import { MotionButton } from '../motions/motionButton';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '../themes/mode-toggle';
import { Encouragement } from './StepNavigation';

const AuthHeaderSwitch = ({
  href,
  type,
  step,
  dir,
}: {
  href?: string;
  type: 'login' | 'register' | 'back';
  step?: number;
  dir?: 'prev' | 'next';
}) => {
  const { isPending, handleClickTab } = useLoadingPath(href);
  const router = useRouter();

  return (
    <nav className={cn("flex items-center justify-between w-full gap-12 lg:gap-0 py-2")}>
      {type === 'login' && (
        <>
          <p className="text-sm font-montserrat">
            Vos vibes n&apos;attendent que vous.
          </p>
          {!isPending && (
            <div className="hidden lg:block">
              <ModeToggle />
            </div>
          )}
          <Button
            onClick={handleClickTab}
            disabled={isPending}
            variant="ghost"
            size="lg"
            className={cn(
              'rounded-full font-montserrat border border-current/50'
            )}
          >
            {isPending && (
              <Loader className="size-5 lg:size-6 border-foreground" />
            )}
            {isPending ? 'Loading...' : 'Créer un compte'}
          </Button>
        </>
      )}

      {type === 'register' && (
        <>
          <div className="lg:w-[20%] flex justify-start"><MelodayzMusic /></div>
          <Encouragement step={step} dir={dir} className="hidden lg:block grow my-1" />
          <div className="lg:w-[20%] flex justify-end"><Button
            onClick={handleClickTab}
            disabled={isPending}
            variant="ghost"
            size="lg"
            className={cn(
              step && step > 1 && 'hidden',
              'rounded-full font-montserrat border border-current/50'
            )}
          >
            {isPending && (
              <Loader className="size-5 lg:size-6 border-foreground" />
            )}
            {isPending ? 'Loading...' : 'Déjà inscrit'}
          </Button></div>
        </>
      )}

      {type === 'back' && (
        <>
          <MotionButton
            className="hover:text-muted-foreground active:text-muted-foreground"
            onClick={() => router.back()}
          >
            <ArrowLeft className="size-7 lg:size-8" />
          </MotionButton>
        </>
      )}
    </nav>
  );
};

export { AuthHeaderSwitch };
