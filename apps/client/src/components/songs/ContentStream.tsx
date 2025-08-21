'use client';

import api from '@/libs/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DashboardHomeSkeleton } from '../skeleton/DashboardHomeSkeleton';
import { SongCard } from './SongCard';
import { SongInterface as Song } from '@/types/songs/song.interface';
import { Star } from 'lucide-react';

export const ContentStream = () => {
  const fetchContentStream = async () => {
    const response = await api.get('/song', { timeout: 5000 });
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
    <section className="w-full pt-5 sm:pt-8 pb-30 bg-gray-50 dark:bg-gray-950">
      <h2 className="flex !items-center gap-2 sm:px-1 mb-4 font-bold text-2xl md:text-3xl">
        <span>Top Artists</span> <Star className="fill-accent-foreground" />
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
      <div className="grid grid-cols-2 gap-4 sm:gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {songs.map((song) => (
          <SongCard key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
};
