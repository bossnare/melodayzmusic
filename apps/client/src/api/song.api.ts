// import { fetcher } from '@/lib/fetcher';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { SongInterface } from '@/types/songs/song.interface';
import axios from 'axios';

const fetchContentStream = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_MOCK_API}/song`, {
    timeout: 10000,
  });
  const data = response.data;
  return data;
};

export function useSong() {
  return useQuery({
    queryKey: ['song'],
    queryFn: fetchContentStream,
    staleTime: 1000 * 60 * 5, // 5min
  });
}

export function useSongCache() {
  const queryClient = useQueryClient();
  return queryClient.getQueriesData<SongInterface>({
    queryKey: ['song'],
  });
}
