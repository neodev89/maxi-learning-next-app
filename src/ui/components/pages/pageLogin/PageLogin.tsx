'use client';

import styles from './style.module.sass';
import CustomInputs from '../../inputs/custom-inputs';

import { Box, Button, Stack } from "@mui/material";
import { loginProps } from '@/@types/formTypes';

export default function PageLogin<T extends Record<string, any>>({
    control,
    setValue,
    handleSubmit,
    handleSubmitForm
}: loginProps<T>) {
    
    return (
        <Box
            component={'form'}
            className={styles.pageLogin}
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
    );
};