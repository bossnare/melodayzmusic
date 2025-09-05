import { cn } from '@/lib/utils';
import { Loader } from '../motions/Loader';
import { Button } from '../ui/button';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import { MelodayzMusic } from '../branding/logo';

const AuthHeaderSwitch = ({
  href,
  type,
}: {
  href: string;
  type: 'login' | 'register';
}) => {
  const { isPending, handleClickTab } = useLoadingPath(href);

  return (
    <nav className="flex items-center justify-between w-full gap-12 py-3">
      {type === 'login' ? (
        <>
          <p className="text-sm">Vos vibes n&apos;attendent que vous.</p>
          <Button
            onClick={handleClickTab}
            disabled={isPending}
            variant="outline"
            size="lg"
            className={cn('rounded-full shadow-sm')}
          >
            {isPending ? (
              <Loader className="size-4 lg:size-6 dark:border-secondary" />
            ) : (
              'Créer un compte'
            )}
          </Button>
        </>
      ) : (
        <>
          <MelodayzMusic />
          <Button
            onClick={handleClickTab}
            disabled={isPending}
            variant="outline"
            size="lg"
            className={cn('rounded-full shadow-sm')}
          >
            {isPending ? (
              <Loader className="size-4 lg:size-6 dark:border-secondary" />
            ) : (
              'Connectez-vous'
            )}
          </Button>
        </>
      )}
    </nav>
  );
};

export { AuthHeaderSwitch };
