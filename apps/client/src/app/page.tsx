'use client';

import { Loader } from '@/components/motions/Loader';
import { Button } from '@/components/ui/button';
import { useLoadingPath } from '@/hooks/useLoadingPath';
import Image from 'next/image';
import AuthGuard from '@/components/auth/AuthGuard';

export default function Page() {
  const { isPending, handleClickTab } = useLoadingPath('/auth/login');

  return (
    <AuthGuard requireAuth={false}>
      <div className="flex flex-col items-center justify-center gap-4 h-dvh bg-gradient-to-br dark:from-primary/16 dark:via-card/6 dark:to-ring/16 from-primary/20 via-card/8 to-ring/20">
        <div className="flex flex-col items-center gap-2">
          <Image
            className="dark:invert size-25 sm:size-28 drop-shadow-lg"
            src="/icons/icon_x32.svg"
            alt="skeleton_temp_icon"
            loading="lazy"
            width={1000}
            height={1000}
          />
          <span className="text-xl font-extrabold select-none hover:text-foreground/90 text-foreground dark:text-primary-foreground lg:text-2xl font-montserrat">
            MelodayzMusic
          </span>
        </div>
        <p className="w-[80%] sm:w-[60%] lg:w-[40%] text-center text-muted-foreground">
          Our app is currently in development. Some features may not be fully
          available or may change frequently. Thank you for your patience and
          understanding as we work to improve your experience!
        </p>
        <Button
          disabled={isPending}
          className="min-w-20 font-montserrat"
          onClick={handleClickTab}
          variant="outline"
          size="lg"
        >
          {isPending ? (
            <Loader className="border-foreground size-5" />
          ) : (
            'Get started'
          )}
        </Button>
      </div>
    </AuthGuard>
  );
}
