import api from "@/libs/api";

export const poster = async <T>(url: string, chicken: any): Promise <T> => {
  const { data } = await api.post<T>(url, chicken);
  return data;
};
