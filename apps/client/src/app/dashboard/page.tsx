'use client';

import { ContentStream } from '@/components/songs/ContentStream';
import RefreshWrapper from './pull-to-refresh';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DashboardHomeSkeleton } from '@/components/skeleton/DashboardHomeSkeleton';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { SongInterface as Song } from '@/types/songs/song.interface';

export default function DashboardHome() {
  const fetchContentStream = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_MOCK_API}/song`,
      { timeout: 10000 }
    );
    const data = response.data;
    return data;
  };

  const options = {
    queryKey: ['songs'],
    queryFn: fetchContentStream,
    // refetchOnReconnect: true,
    // refetchOnMount: true,
    // refetchOnWindowsFocus: true,
  };
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

  const {
    data: songs,
    isPending,
    isError,
    refetch,
  } = useQuery<Song[], Error>(options);

  if (isError) {
    return (
      <div className="flex flex-col gap-3 mx-auto justify-center items-center py-10">
        Erreur inattendue !
        <Button onClick={async () => refetch} size="lg" variant="secondary">
          Actualiser
        </Button>
      </div>
    );
  }

  if (isPending) {
    return <DashboardHomeSkeleton />;
  }

  return (
    <RefreshWrapper
      onRefresh={async () => {
        await refetch();
      }}
    >
      <ContentStream songs={songs} />
    </RefreshWrapper>
  );
}
