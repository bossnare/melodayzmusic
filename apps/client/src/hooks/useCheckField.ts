'use client';

import { useState } from 'react';
import api from '@/libs/api';

export function useCheckField() {
  const [isChecking, setIsChecking] = useState(false);
  const checkField = async <TResponse, TData extends object>(
    url: string,
    data: TData
  ) => {
    try {
      setIsChecking(true);
      const res = await api.post<TResponse & { exist: boolean }>(url, data);
      if (res.data.exist) {
        return true;
      }

      return false;
    } finally {
      setIsChecking(false);
    }
  };

  return { checkField, isChecking };
}
