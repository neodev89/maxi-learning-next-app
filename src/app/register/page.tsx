"use client";

import GlobalWrapper from "@/ui/components/global-wrapper/GlobalWrapper";
import Link from "next/link";
import style from "../login/style.module.sass";
import CustomInputs from "@/ui/components/inputs/custom-inputs";

import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useCustomMutation } from "@/tanstack-query/mutations/func-mutation/mutation-post";
import { formSignInInstance, formSignInType } from "@/zod/formSignIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function Register() {
    const register = useCustomMutation<formSignInType>(["post-register"]);

    const { control, handleSubmit, setValue, watch } = useForm<formSignInType>({
        resolver: zodResolver(formSignInInstance),
    });

    const handleSubmitForm = async () => {
        try {
            register.mutate({
                url: "/api/register",
                body: watch(),
                pathSuccess: "/dashboard",
                pathErrorCredential: "/login",
                pathError: "/",
            });
            if (register.isSuccess) {
                setValue("email", "");
                setValue("password", "");
            }
        } catch (error: any) {
            console.error("Errore nella chiamata API: ", error);
        }
    };

    return (
        <GlobalWrapper>
            {
                (register.isPending || register.isSuccess) ? (
                    <>
                        <CircularProgress size={50} />
                    </>
                ) : (
                    <>
                        <div className={style.login}>
                            <div className={style.navigate}>
                                <Link href={'/'} className={style.buttons}>Indietro</Link>
                            </div>
                            <div className={style.content}>
                                <Box
                                    component={'form'}
                                    className={style.pageLogin}
                                >
                                    <Stack spacing={2}>
                                        <CustomInputs
                                            type={'email'}
                                            icon={undefined}
                                            control={control}
                                            name={'email'}
                                            label={'email'}
                                            setValue={setValue}
                                        />
                                        <CustomInputs
                                            type={'password'}
                                            icon={undefined}
                                            control={control}
                                            name={'password'}
                                            label={'password'}
                                            setValue={setValue}
                                        />
                                        <Button
                                            type="submit"
                                            variant={'contained'}
                                            onClick={handleSubmit(handleSubmitForm)}
                                        >
                                            Invia
                                        </Button>
                                    </Stack>
                                </Box>
                            </div>
                        </div>
                    </>
                )
            }
        </GlobalWrapper>
    )
}