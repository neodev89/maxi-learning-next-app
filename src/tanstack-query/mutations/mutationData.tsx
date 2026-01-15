import instance from "@/axios/instance";
import { useMutation } from "@tanstack/react-query";


{/** Questi hooks vanno usati quando i dati derivano da determinate occorrenze.
  In particolare la get che può essere chiamata dalla mutation solo se si verifica una condizione
  come ad esempio un evento */}

interface MutationConfig {
  mutationKey: string[];
  url: string;
}

export function useGetMutation<T>({ mutationKey, url }: MutationConfig) {
  return useMutation<T, any, any>({
    mutationKey,
    mutationFn: async (params: any) => {
      const response = await instance.get(
        url, 
        { params }
      );
      return response.data;
    },
  });
};

export function usePostMutation<T>({ mutationKey, url }: MutationConfig) {
  return useMutation<T, any, any>({
    mutationKey,
    mutationFn: async (params: any) => {
      const response = await instance.post(url, params);
      return response.data;
    },
  });
};

export function usePutMutation<T>({ mutationKey, url }: MutationConfig) {
  return useMutation<T, any, any>({
    mutationKey,
    mutationFn: async (params: any) => {
      const response = await instance.put(url, params);
      return response.data;
    },
  });
};

export function useDeleteMutation<T>({ mutationKey, url }: MutationConfig) {
  return useMutation<T, any, any>({
    mutationKey,
    mutationFn: async (params: any) => {
      const response = await instance.delete(url, { params });
      return response.data;
    },
  });
};

// se preferiamo un solo hook...
export function useApiMutation<TResponse, TVariables>({
  mutationKey,
  url,
  method,
}: {
  mutationKey: any;
  url: string;
  method: "get" | "post" | "put" | "delete";
}) {
  return useMutation<TResponse, any, TVariables>({
    mutationKey,
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
