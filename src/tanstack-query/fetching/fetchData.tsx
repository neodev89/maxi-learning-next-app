import instance from "@/axios/instance";
import { useQuery } from "@tanstack/react-query";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

interface FetchDataProps<P> {
  endpoint: string;
  method?: HttpMethod;
  params?: P;
  body?: any;
  staleTime?: number;
  enabled?: boolean;
}

export function fetchData<T, P = Record<string, any>>({
  endpoint,
  method = "get",
  params,
  body,
  staleTime = 0,
  enabled,
}: FetchDataProps<P>) {
  return useQuery<T>({
    queryKey: [endpoint, params, method],
    queryFn: async () => {
      const response = await instance.request<T>({
        url: endpoint,
        method,
        params,
        data: body,
      });

      return response.data;
    },
    staleTime,
    enabled,
  });
}
