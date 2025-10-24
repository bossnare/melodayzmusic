'use client';

import { providerLabels } from '../navigation/labels/label.provider';
import { Button } from '../ui/button';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface ProviderProps {
  size?: 'lg' | 'xl';
}

export function Provider({ size = 'lg' }: ProviderProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleClick = async (providerName: string) => {
    try {
      setIsPending(true);
      const res = await signIn(providerName, {
        callbackUrl: '/dashboard',
        redirect: false,
      });
      if (res?.error) {
        setError(res.error);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ul className="space-y-2 md:flex md:justify-center md:items-center md:flex-col md:flex-1">
      <li className="text-center">
        <p className="text-destructive/50">{error}</p>
      </li>
      {providerLabels.map((provider) => (
        <li key={provider.id}>
          <Button
            disabled={isPending}
            onClick={() => handleClick(provider.name)}
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
