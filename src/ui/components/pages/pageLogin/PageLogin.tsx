'use client';

import styles from './style.module.sass';
import CustomInputs from '../../inputs/custom-inputs';

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Stack } from "@mui/material";
import { useForm } from 'react-hook-form';
import { formSignInInstance, formSignInType } from '@/zod/formSignIn';
import { useLoginMutation } from '@/tanstack-query/mutations/func-mutation/mutation-post';

export default function PageLogin() {
    const login = useLoginMutation();
    
    const { control, handleSubmit, setValue, watch } = useForm<formSignInType>({
        resolver: zodResolver(formSignInInstance),
    });

    const handleSubmitForm = async () => {
        console.log("Ok");
        const body = watch();
        login.mutate(body);
    };


    return (
        <Box
            component={'form'}
            className={styles.pageLogin}
        >
            <Stack spacing={2}>
                <CustomInputs
                    key={'email'}
                    icon={undefined}
                    control={control}
                    name={'email'}
                    label={'email'}
                    setValue={setValue}
                    />
                <CustomInputs
                    key={'password'}
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
    );
};