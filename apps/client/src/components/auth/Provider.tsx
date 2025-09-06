import { providerLabels } from '../navigation/labels/label.provider';
import { Button } from '../ui/button';
import Image from 'next/image';

export function Provider() {
  return (
    <ul className="px-2 space-y-3 md:flex md:justify-center md:items-center md:flex-col md:flex-1 md:p-0">
      {providerLabels.map((provider) => (
        <li key={provider.id}>
          <Button variant="secondary" className="w-full rounded-full md:w-auto">
            {provider.label === 'Google' ? (
              <Image
                src={provider.icon as string}
                alt={provider.label}
                className="w-4 lg:w-5"
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
