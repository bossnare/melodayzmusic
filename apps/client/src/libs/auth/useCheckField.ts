'use client';

import { useState } from 'react';
import api from '../api';

export function useCheckField() {
  const [isPending, setIsPending] = useState(false);
  const checkField = async <TResponse, TData extends object>(
    url: string,
    data: TData
  ) => {
    try {
      const res = await api.post<TResponse & { exist: boolean }>(url, data);
      if (res.data.exist) {
        return true;
      }

      return false;
    } finally {
      setIsPending(false);
    }
  };

  return { checkField, isPending };
}
