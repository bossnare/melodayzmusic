import api from "@/libs/api";

export const fetcher = async <T>(url: string): Promise <T> => {
  const { data } = await api.get<T>(url);
  return data;
};
