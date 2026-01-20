"use client";
import instance from "@/axios/instance";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface mutationProps<T> {
    url: string;
    body: T;
    pathSuccess: string;
    pathErrorCredential: string;
    pathError: string;
    pathRegister?: string;
}

export function useCustomMutation<T>(mutationKey: string[]) {
    const router = useRouter();

    const request = async ({ url, body }: mutationProps<T>) => {
        const res = await instance.post(url, body, {
            validateStatus: () => true,
        });
        return { status: res.status, data: res.data };
    };

    return useMutation({
        mutationKey,
        mutationFn: request,
        onSuccess: (result, variables) => {
            if (result.status === 200 || result.status === 201) router.push(variables.pathSuccess);
            else if (result.status === 401) router.push(variables.pathErrorCredential);
            else if (result.status >= 404 && variables.pathRegister)
                router.push(variables.pathRegister);
        },
        onError: (_error, variables) => {
            router.push(variables.pathError);
        },
    });
}
