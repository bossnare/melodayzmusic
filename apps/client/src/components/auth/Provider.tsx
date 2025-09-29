import { providerLabels } from '../navigation/labels/label.provider';
import { Button } from '../ui/button';
import Image from 'next/image';

export function Provider() {
  return (
    <ul className="space-y-2 md:flex md:justify-center md:items-center md:flex-col md:flex-1">
      {providerLabels.map((provider) => (
        <li key={provider.id}>
          <Button
            variant="secondary"
            className="w-full rounded-full md:w-auto"
            size="xl"
          >
            {provider.label === 'Google' ? (
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
