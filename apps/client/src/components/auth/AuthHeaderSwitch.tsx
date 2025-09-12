'use client';

import { cn } from '@/lib/utils';
import { Loader } from '../motions/Loader';
import { Button } from '../ui/button';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { MelodayzMusic } from '../branding/logo';
import { ArrowLeft } from 'lucide-react';
import { MotionButton } from '../motions/motionButton';
import { useRouter } from 'next/navigation';

const AuthHeaderSwitch = ({
  href,
  type,
  step,
}: {
  href?: string;
  type: 'login' | 'register' | 'back';
  step?: number;
}) => {
  const { isPending, handleClickTab } = useLoadingPath(href);
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between w-full gap-12 py-3">
      {type === 'login' && (
        <>
          <p className="text-sm">Vos vibes n&apos;attendent que vous.</p>
          <Button
            onClick={handleClickTab}
            disabled={isPending}
            variant="outline"
            size="lg"
            className={cn('rounded-full')}
          >
            {isPending ? (
              <Loader className="size-5 lg:size-6 border-foreground" />
            ) : (
              'Créer un compte'
            )}
          </Button>
        </>
      )}

      {type === 'register' && (
        <>
          <MelodayzMusic />
          <Button
            onClick={handleClickTab}
            disabled={isPending}
            variant="outline"
            size="lg"
            className={cn(
              step && step > 1 && 'pointer-events-none opacity-0',
              'rounded-full'
            )}
          >
            {isPending ? (
              <Loader className="size-5 lg:size-6 border-foreground" />
            ) : (
              'Déjà inscrit'
            )}
          </Button>
        </>
      )}

      {type === 'back' && (
        <>
          <MotionButton
            className="shadow-sm hover:text-muted-foreground active:text-muted-foreground"
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
