'use client';

import api from '@/libs/api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DashboardSkeleton } from './skeleton/DashboardSkeleton';
import { SongCard } from './songs/SongCard';
import { SongInterface as Song } from '@/types/songs/song.interface';
import { ChartArea } from 'lucide-react';

export const Dashboard = () => {
  const fetchNewsFeed = async () => {
    const response = await api.get('/song', { timeout: 5000 });
    console.log(response.data);
    const data = response.data;
    return data;
  };

  const options = {
    queryKey: ['songs'],
    queryFn: fetchNewsFeed,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowsFocus: true,
  };
  const navTarget = 'dashboard';

  useEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${navTarget}`);
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll));
      console.log('yaaa: ', savedScroll);
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
    return <DashboardSkeleton />;
  }

  return (
    <section className="pt-10 pb-20 bg-gray-50 dark:bg-gray-950 sm:px-6 md:px-4">
      <h2 className="flex !items-center gap-2 px-2 mb-2 font-bold text-2xl md:text-3xl">
        <span>Top Charts</span> <ChartArea />
      </h2>
      <div
        className="w-full overflow-x-hidden h-40 flex-nowrap 
      mb-10 p-2 flex items-center *:h-full *:min-w-[calc(100%/2-4px)] *:lg:min-w-[calc(100%/3-6px)] 
      *:bg-gray-100 dark:*:bg-gray-900 gap-4 *:rounded-lg"
      >
        <div></div>
        <div>{/* <Roller /> */}</div>
        <div></div>
        <div></div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {songs.map((song) => (
          <SongCard key={song?.id} song={song} />
        ))}
      </div>
    </section>
  );
};
