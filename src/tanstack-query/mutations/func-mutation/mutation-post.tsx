import instance from "@/axios/instance";
import { formSignInType } from "@/zod/formSignIn";
import { useMutation } from "@tanstack/react-query";


export function useLoginMutation() {
    return useMutation({
        mutationKey: ['post-login'],
        mutationFn: async (body: formSignInType) => {
            const res = await instance.post(
                '/submitForm',
                body,
            );
            return res.data;
        },
    });
};