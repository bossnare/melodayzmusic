'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-dvh">
      <Image
        className="dark:invert size-30 sm:size-32"
        src="/icons/icon_512x512.png"
        alt="skeleton_temp_icon"
        width={1000}
        height={1000}
      />
      <Button>
        <Link href="/dashboard">Go to your Dashboard</Link>
      </Button>
    </div>
  );
}
