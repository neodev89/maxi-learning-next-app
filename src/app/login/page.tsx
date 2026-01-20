"use client";

import GlobalWrapper from '@/ui/components/global-wrapper/GlobalWrapper';
import style from './style.module.sass';
import Link from 'next/link';
import PageLogin from '@/ui/components/pages/pageLogin/PageLogin';

import { useCustomMutation } from '@/tanstack-query/mutations/func-mutation/mutation-post';
import { formSignInType, formSignInInstance } from '@/zod/formSignIn';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@mui/material';

export default function Login() {
    const login = useCustomMutation<formSignInType>(["post-login"]);

    const { control, handleSubmit, setValue, watch } = useForm<formSignInType>({
        resolver: zodResolver(formSignInInstance),
    });

    const handleSubmitForm = async () => {
        try {
            login.mutate({
                url: "/api/login",
                body: watch(),
                pathSuccess: "/dashboard",
                pathErrorCredential: "/login",
                pathError: '/',
                pathRegister: '/register',
            });
            setValue("email", "");
            setValue("password", "");
        } catch (error: any) {
            console.error("Errore nella chiamata API: ", error);
        }
    };

    return (
        <GlobalWrapper>
            {
                login.isPending ? (
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
                                <PageLogin
                                    control={control}
                                    setValue={setValue}
                                    handleSubmit={handleSubmit}
                                    handleSubmitForm={handleSubmitForm}
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </GlobalWrapper >
    )
}