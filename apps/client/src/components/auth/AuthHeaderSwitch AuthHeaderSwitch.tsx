import { Button } from '../ui/button';
import { useLoadingPath } from '@/hooks/useLoadingPath';

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
            className="rounded-full shadow-sm"
          >
            {isPending ? 'Création en cours...' : 'Créer un compte'}
          </Button>
        </>
      ) : (
        ''
      )}
    </nav>
  );
};

export { AuthHeaderSwitch };
