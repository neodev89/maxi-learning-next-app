"use client";

import style from "./pageTech.module.sass";
import instance from "@/axios/instance";
import ControlledCheckbox from "../../checked/ControlledCheckbox";

import { Box, Button, CircularProgress, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Stack, Tooltip, Typography } from "@mui/material";
import { PropsTechTypes, TechListTypes } from "@/@types/techListType";
import { useGet, usePostMutation } from "@/tanstack-query/mutations/mutationData";
import { ChangeEvent, Dispatch, FormEvent, Fragment, SetStateAction, useEffect, useState } from "react";
import { redirect } from "next/navigation";

interface TechTabsProps {
    props: PropsTechTypes[];
}

interface checkboxProps extends TechTabsProps {
    check: {
        item: PropsTechTypes[] | [];
        stato: Record<string, boolean>;
    };
    setCheck: Dispatch<SetStateAction<{
        item: PropsTechTypes[] | [];
        stato: Record<string, boolean>;
    }>>
}

export default function PageTech() {
    const [check, setCheck] = useState<{
        item: PropsTechTypes[] | [],
        stato: Record<string, boolean>
    }>({
        item: [],
        stato: {}
    });

    const [selectedTech, setSelectedTech] = useState<PropsTechTypes[]>([]);

    const { data, error, isPending } = useGet<TechListTypes>({
        key: ['all-tech-get'],
        url: '/all-tech-list'
    });
    console.log("I dati sono presenti?", data);
    console.log("I dati di technologies dentro data sono: ", data?.data?.[0]?.technologies)

    const technologies = data?.data?.[0]?.technologies ?? [];
    const ide = data?.data?.[1]?.IDE ?? [];
    const versioning = data?.data?.[2]?.versioning ?? [];
    const allTech = [...technologies, ...ide, ...versioning];

    const postTech = usePostMutation<PropsTechTypes[]>({
        key: ["post-favourite-technologies"],
        url: '/api/favorite-tech'
    });

    const handleLogout = async () => {
        const res = await instance.post('/api/logout');
        if (!res) {
            console.error("Errore nel logout");
            return;
        }
        console.log("I dati delle response sono: ", res.data);
        redirect('/');
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Invia le tecnologie che usi di solito");
        const { item } = check;
        postTech.mutateAsync(
            item,
        );

        if (postTech.status === 'success') {
            console.log("Dati inviati correttamente")
        } else {
            console.error('Ops! Qualcosa è andato storto');
        }
    };

    const handleSelectTech = (idx: number) => {
        const includeTech = (selectedTech.length > 0) ? selectedTech.includes(technologies[idx]) : false;
        if (includeTech) {
            setSelectedTech(prev => [...prev]);
        } else {
            setSelectedTech(prev => [
                ...prev,
                technologies[idx],
            ]);
        }
    };

    const handleDeleteItem = (idx: number) => {
        const deleteItem = selectedTech.filter((_, index) => index !== idx);

        setSelectedTech(deleteItem)
    };

    useEffect(() => {
        console.log(selectedTech);

    }, [selectedTech]);

    return (
        <Box className={style.pageTech}>
            <Stack spacing={1} sx={{
                height: '100%',
                width: '100%',
            }}>
                {
                    isPending ? (
                        <CircularProgress size={50} />
                    ) : (
                        <>
                            {
                                error ? (
                                    <Typography>
                                        {error.message}
                                    </Typography>
                                ) : (
                                    <Box
                                        component={'form'}
                                        className={style.formPageTech}
                                        onSubmit={handleSubmit}
                                    >
                                        <Stack spacing={1} sx={{
                                            height: '100%',
                                            width: '100%',
                                        }}>

                                            <Box className={style.table}>
                                                <Grid container columns={12} spacing={0.1} sx={{
                                                    height: 'auto',
                                                    width: '100%',
                                                    overflowY: 'auto',
                                                    overflowX: 'hidden',
                                                }}>
                                                    <Grid size={1}>
                                                        <Typography
                                                            className={style.typographyGrid}
                                                        >
                                                            Check
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={2}>
                                                        <Typography
                                                            className={style.typographyGrid}
                                                        >
                                                            ID
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={2}>
                                                        <Typography
                                                            className={style.typographyGrid}
                                                        >
                                                            Name
                                                        </Typography>
                                                    </Grid>
                                                    <Grid size={7}>
                                                        <Typography
                                                            className={style.typographyGrid}
                                                        >
                                                            Description
                                                        </Typography>
                                                    </Grid>
                                                    {
                                                        (!data) ? (
                                                            <Typography>Non c'è nessun dato</Typography>
                                                        ) : (
                                                            <TechTable
                                                                props={allTech}
                                                                check={check}
                                                                setCheck={setCheck}
                                                            />
                                                        )
                                                    }
                                                </Grid>
                                            </Box>
                                            <Box className={style.table_Btn}>
                                                <Box className={style.logout}>
                                                    <Button
                                                        type='button'
                                                        variant="outlined"
                                                        color='secondary'
                                                        onClick={handleLogout}
                                                    >
                                                        Logout
                                                    </Button>
                                                </Box>
                                                <Box className={style.box_btn}>
                                                    <Button
                                                        type="submit"
                                                        color="primary"
                                                        size="medium"
                                                        variant="outlined"
                                                    >
                                                        Salva
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Stack>
                                    </Box>
                                )
                            }
                        </>
                    )
                }
                <Box className={style.selectedItem}>
                    <Stack spacing={0.5} className={style.itemDiv}>
                        {
                            technologies.map((el, idx) => {
                                const isThisSelected = selectedTech.some(el1 => el1.id === el.id)
                                return (
                                    <Box key={idx} className={style.itemTech}>
                                        <Typography variant="body1">{el.name}</Typography>

                                        <Button
                                            type="button"
                                            variant="contained"
                                            disabled={isThisSelected}
                                            onClick={() => handleSelectTech(idx)}
                                            color={'primary'}
                                        >
                                            Select
                                        </Button>
                                    </Box>
                                );
                            })

                        }
                    </Stack>
                    <Box className={style.itemDiv}>
                        <Stack spacing={0.5} className={style.itemTech}>
                            {
                                selectedTech.map((el, idx) => {
                                    return (
                                        <Box key={idx} className={style.itemTech}>
                                            <Typography variant="body1">
                                                {el.name}
                                            </Typography>
                                            <Button type="button" onClick={() => handleDeleteItem(idx)}>
                                                Delete
                                            </Button>
                                        </Box>
                                    )
                                })
                            }
                        </Stack>
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}

const TechTable = ({ props, check, setCheck }: checkboxProps) => {


    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = e.target;
        const selected = props.find(el => el.id === id);

        setCheck(prev => {
            let newItems = prev.item;

            if (checked && selected) {
                // aggiungi solo se non esiste già
                // la negazione significa che nessun elemento dev'essere uguale
                // all'id dell'evento
                if (!prev.item.some(el => el.id === id)) {
                    newItems = [...prev.item, selected];
                }
            } else {
                // rimuovi quando deselezionato
                newItems = prev.item.filter(el => el.id !== id);
            }

            return {
                ...prev,
                item: newItems,
                stato: {
                    ...prev.stato,
                    [id]: checked
                }
            };
        });
    };


    console.log("Voglio vedere il check ", check);

    return (
        <>
            {
                props.map((item) => {
                    return (
                        <Fragment key={item.id}>
                            <Grid size={1}>
                                <Typography
                                    className={style.typographyGrid}
                                >
                                    <ControlledCheckbox
                                        id={item.id}
                                        check={check.stato[item.id] ?? false}
                                        handleChange={handleCheck}
                                    />
                                </Typography>
                            </Grid>
                            <Grid size={2}>
                                <Typography
                                    className={style.typographyGrid}
                                >
                                    {item.id}
                                </Typography>
                            </Grid>
                            <Grid size={2}>
                                <Typography
                                    className={style.typographyGrid}
                                >
                                    {item.name}
                                </Typography>
                            </Grid>
                            <Grid size={7}>
                                <Typography
                                    className={style.typographyGrid}
                                >
                                    {item.description}
                                </Typography>
                            </Grid>
                        </Fragment>
                    )
                })
            }
        </>
    )
};

