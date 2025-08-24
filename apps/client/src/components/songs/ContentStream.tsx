'use client';

import api from '@/libs/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DashboardHomeSkeleton } from '../skeleton/DashboardHomeSkeleton';
import { SongCard } from './SongCard';
import { SongInterface as Song } from '@/types/songs/song.interface';

export const ContentStream = () => {
  const fetchContentStream = async () => {
    const response = await api.get('/song', { timeout: 10000 });
    console.log(response.data);
    const data = response.data;
    return data;
  };

  const options = {
    queryKey: ['songs'],
    queryFn: fetchContentStream,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowsFocus: true,
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
    // refetch,
  } = useQuery<Song[], Error>(options);

  if (isError) {
    return <div>Error !</div>;
    // return <UserProfileOverlay refetch={refetch} />;
  }

  if (isPending) {
    return <DashboardHomeSkeleton />;
  }

  return (
    <section className="pt-8 pb-60 md:pb-50">
      <h2 className="flex items-center gap-2 text-section sm:px-1">
        Top Artists
      </h2>
      <div
        className="max-w-full h-20 flex-nowrap overflow-x-hidden
      mb-10 flex items-center sm:px-1 *:size-16 md:*:size-20
      *:bg-gray-100 dark:*:bg-gray-900 gap-4 *:rounded-full"
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3 className="text-section">Fresh Vibes</h3>
      <div className="grid grid-cols-2 gap-5 sm:gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
      <h3 className="text-section mt-6">Albums</h3>
    </section>
  );
};
