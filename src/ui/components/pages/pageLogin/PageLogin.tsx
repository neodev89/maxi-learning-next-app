'use client';

import styles from './style.module.sass';
import Inputs from '../../inputs/inputs';
import instance from '@/axios/instance';

import { zodResolver } from "@hookform/resolvers/zod";
import { formSign } from '@/datas/formSign';
import { Box, Button, Stack } from "@mui/material";
import { formSignInstance, formSignTypes } from '@/zod/formZOd';
import { useState } from 'react';
import { formTypeProps } from '@/@types/formTypes';
import { useForm } from 'react-hook-form';

export default function PageLogin() {
    const handleSubmitForm = async () => {
        console.log("Ok");
    };

    const [mappedForm, setMappedForm] = useState<formTypeProps[]>([]);

    const { control, handleSubmit } = useForm<formSignTypes>({
        resolver: zodResolver(formSignInstance),
    })


    return (
        <Box component={'form'} className={styles.pageLogin}>
            <Stack spacing={2}>
                
            </Stack>
            <Button type="submit" onClick={handleSubmit(handleSubmitForm)}>Invia</Button>
        </Box>
    )
}