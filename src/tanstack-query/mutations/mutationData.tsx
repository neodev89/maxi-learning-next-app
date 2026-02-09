import { APIResponse } from "@/@types/apiRes";
import instance from "@/axios/instance";
import { useMutation, useQuery } from "@tanstack/react-query";


{/** Questi hooks vanno usati quando i dati derivano 
  da determinate occorrenze.
  In particolare la get che può essere chiamata dalla mutation 
  solo se si verifica una condizione
  come ad esempio un evento */}

interface MutationConfig {
  key: string[];
  url: string;
}

export function useGet<T>({ key, url }: MutationConfig) {
  return useQuery<APIResponse<T>>({
    queryKey: key,
    queryFn: async () => {
      const res = await instance.get<APIResponse<T>>(url);
      return res.data;
    }
  })
};

export function usePostMutation<T>({ key, url }: MutationConfig) {
  return useMutation<T, any, any>({
    mutationKey: key,
    mutationFn: async (params: any) => {
      const response = await instance.post(url, params);
      return response.data;
    },
  });
};

export function usePutMutation<T>({ key, url }: MutationConfig) {
  return useMutation<T, any, any>({
    mutationKey: key,
    mutationFn: async (params: any) => {
      const response = await instance.put(url, params);
      return response.data;
    },
  });
};

export function useDeleteMutation<T>({ key, url }: MutationConfig) {
  return useMutation<T, any, any>({
    mutationKey: key,
    mutationFn: async (params: any) => {
      const response = await instance.delete(url, { params });
      return response.data;
    },
  });
};

// se preferiamo un solo hook...
export function useApiMutation<TResponse, TVariables>({
  key,
  url,
  method,
}: {
  key: any;
  url: string;
  method: "get" | "post" | "put" | "delete";
}) {
  return useMutation<TResponse, any, TVariables>({
    mutationKey: key,
    mutationFn: async (variables: TVariables) => {
      switch (method) {
        case "get":
          return (await instance.get(url, { params: variables })).data;
        case "post":
          return (await instance.post(url, variables)).data;
        case "put":
          return (await instance.put(url, variables)).data;
        case "delete":
          return (await instance.delete(url, { data: variables })).data;
      }
    },
  });
}
