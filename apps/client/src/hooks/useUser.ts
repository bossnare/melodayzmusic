import { type UserInterface } from '@/types/users/user.interface';
import { fetcher } from '@/utils/fetcher';
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
