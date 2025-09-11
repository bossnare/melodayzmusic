'use client';

import { Loader } from '@/components/motions/Loader';
import { Button } from '@/components/ui/button';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import Image from 'next/image';

export default function Page() {
  const { isPending, handleClickTab } = useLoadingPath('/auth/login');

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-dvh bg-gradient-to-br dark:from-primary/10 dark:via-card/4 dark:to-ring/10 backdrop-blur-sm">
      <Image
        className="dark:invert size-25 sm:size-28"
        src="/icons/icon_512x512.png"
        alt="skeleton_temp_icon"
        loading="lazy"
        width={1000}
        height={1000}
      />
      <span className="text-xl font-bold select-none hover:text-primary-foreground/90 text-primary-foreground lg:text-2xl font-poppins">
        MelodayzMusic
      </span>
      <p className="w-[80%] sm:w-[60%] lg:w-[40%] text-center text-muted-foreground">
        Our app is currently in development. Some features may not be fully
        available or may change frequently. Thank you for your patience and
        understanding as we work to improve your experience!
      </p>
      <Button
        disabled={isPending}
        className="min-w-20"
        onClick={handleClickTab}
        variant="outline"
        size="lg"
      >
        {isPending ? (
          <Loader className="dark:border-primary-foreground size-5" />
        ) : (
          'Get started'
        )}
      </Button>
    </div>
  );
}
