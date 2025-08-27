import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function useLoadingPath(href: string) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleClickNav = () => {
    startTransition(() => {
      if (pathname === href) return;
      router.push(href);
    });
  };

  return { isPending, handleClickNav };
}
