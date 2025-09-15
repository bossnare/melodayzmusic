import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export function useLoadingPath(href?: string) {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const handleClickTab = () => {
    startTransition(() => {
      if (pathname === href) return;
      if (!href) return;

      router.push(href, undefined, {shallow: true}); // shallow: no reload route of switching
    });
  };

  return { isPending, handleClickTab, pathname };
}
