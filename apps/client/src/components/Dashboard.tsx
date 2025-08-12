'use client';

import api from '@/libs/api';
import { useQuery } from '@tanstack/react-query';
// import { SongCard } from './Userapi/SongCard';
import { useEffect } from 'react';
import { DashboardSkeleton } from './skeleton/DashboardSkeleton';
import { SongCard } from './songs/SongCard';

export const Dashboard = () => {
  const fetchNewsFeed = async () => {
    const response = await api.get('/song', { timeout: 10000 });
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
    error,
    isError,
    refetch,
  }: any = useQuery(options);

  if (isError) {
    return <div>Error !</div>;
    // return <UserProfileOverlay refetch={refetch} />;
  }

  if (isPending) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <p>error {error.message}</p>;
  }

  return (
    <section className="pb-70 pt-20 bg-gray-50 w-full md:px-4">
      <h1 className="text-lg px-2 sm:text-2xl md:text-xl lg:text-4xl font-bold pb-2">
        Discover
      </h1>
      <div className="w-full overflow-x-auto md:overflow-x-hidden bg-gray-50 h-40 lg:h-40 flex-nowrap mb-10 p-2 flex items-center *:h-full *:min-w-[calc(100%/2-4px)] *:lg:min-w-[calc(100%/3-6px)] *:bg-gray-100 gap-4 *:rounded-lg">
        <div></div>
        <div>{/* <Roller /> */}</div>
        <div></div>
        <div></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {songs.map((song: any) => (
          <SongCard key={song?.id} song={song} />
        ))}
      </div>
    </section>
  );
};
