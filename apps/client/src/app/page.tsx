'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-dvh dark:bg-sidebar">
      <Image
        className="dark:invert size-25 sm:size-28"
        src="/icons/icon_512x512.png"
        alt="skeleton_temp_icon"
        loading="lazy"
        width={1000}
        height={1000}
      />
      <p className="w-[80%] sm:w-[60%] lg:w-[40%] text-center">
        Our app is currently in development. Some features may not be fully
        available or may change frequently. Thank you for your patience and
        understanding as we work to improve your experience!
      </p>
      <Button variant="secondary">
        <Link href="/dashboard">Let&apos;s go</Link>
      </Button>
    </div>
  );
}
