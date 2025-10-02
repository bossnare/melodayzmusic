import api from '../api';

export const checkField = async <TResponse, TData extends object>(
  url: string,
  data: TData
) => {
  const res = await api.post<TResponse & { exist: boolean }>(url, data);
  return res.data;
};
