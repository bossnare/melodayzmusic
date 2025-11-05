import { fetcher } from '@/lib/fetcher';
import { type UserInterface } from '@/types/users/user.interface';
import { useCallback, useState } from 'react';

export const useUser = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isFetchingMe, setIsFetchingMe] = useState(false);

  const fetchMe = useCallback(async () => {
    try {
      setIsFetchingMe(true);
      const user = await fetcher('/auth/me');
      setUser(user);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetchingMe(false);
    }
  }, []);

  return { user, fetchMe, isFetchingMe };
};
