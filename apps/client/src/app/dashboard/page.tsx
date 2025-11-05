'use client';

import { ContentStream } from '@/components/songs/ContentStream';
import { useEffect } from 'react';
import { DashboardHomeSkeleton } from '@/components/skeleton/DashboardHomeSkeleton';
import { Button } from '@/components/ui/button';
import { useSong } from '@/api/song.api';

export default function DashboardHome() {
  const { data: songs, isPending, isError, refetch } = useSong();
  const navTarget = 'dashboard';

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${navTarget}`);
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${navTarget}`, String(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isError) {
    return (
      <div className="flex flex-col gap-3 mx-auto justify-center items-center py-10">
        Erreur inattendue !
        <Button onClick={async () => refetch()} size="lg" variant="secondary">
          Actualiser
        </Button>
      </div>
    );
  }

  if (isPending) {
    return <DashboardHomeSkeleton />;
  }

  return <ContentStream songs={songs} />;
}
