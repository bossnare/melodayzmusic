import { usePathname } from 'next/navigation';

export function useActivePath(href: string) {
  const pathname = usePathname();
  return pathname === href;
}
