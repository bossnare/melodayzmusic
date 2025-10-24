import { providerLabels } from '../navigation/labels/label.provider';
import { Button } from '../ui/button';
import Image from 'next/image';

export function Provider({ size = 'lg' }: { size?: 'lg' | 'xl' }) {
  return (
    <ul className="space-y-2 md:flex md:justify-center md:items-center md:flex-col md:flex-1">
      {providerLabels.map((provider) => (
        <li key={provider.id}>
          <Button
            onClick={provider.fn}
            className="w-full rounded-full !bg-secondary-2 !text-secondary-2-foreground 
            dark:text-secondary-foreground hover:!bg-secondary-2/80 dark:!bg-secondary 
            dark:hover:!bg-secondary/80 hover:!text-secondary-2-foreground/80 active:brightness-50 dark:hover:!text-secondary-foreground/80 
            md:w-auto"
            size={size}
          >
            {provider.label === 'Google' || provider.label === 'Spotify' ? (
              <Image
                src={provider.icon as string}
                alt={provider.label}
                className="w-5 lg:w-6"
                height={500}
                width={500}
              />
            ) : (
              provider.icon
            )}
            Continuer avec {provider.label}
          </Button>
        </li>
      ))}
    </ul>
  );
}
