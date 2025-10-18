import { fetcher } from '@/utils/fetcher';
import { useState } from 'react';
import { type UserInterface } from '@/types/users/user.interface';

export const useUser = () => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [isFetchingMe, setIsFetchingMe] = useState(false);

  const handleFetchMe = async () => {
    try {
      setIsFetchingMe(true);
      const user = await fetcher('/auth/me');
      setUser(user);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetchingMe(false);
    }
  };

  return { user, handleFetchMe, isFetchingMe };
};
