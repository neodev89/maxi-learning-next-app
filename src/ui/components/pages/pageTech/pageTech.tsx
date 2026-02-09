"use client";

import style from "./pageTech.module.sass";

import { Box, Button, CircularProgress, FormControlLabel, Grid, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { IdeBlock, PropsTechTypes, TechListTypes, TechnologiesBlock, VersioningBlock } from "@/@types/techListType";
import { useGet } from "@/tanstack-query/mutations/mutationData";
import { Fragment } from "react/jsx-runtime";
import { useState } from "react";
import instance from "@/axios/instance";
import { redirect } from "next/navigation";

interface TechTabsProps {
    props: PropsTechTypes[];
}

export default function PageTech() {
    const [selected, setSelected] = useState<"tech" | "ide" | "vers">("tech");

    const { data, error, isPending } = useGet<TechListTypes>({
        key: ['all-tech-get'],
        url: '/api/all-tech-list'
    });
    console.log("I dati sono presenti?", data);
    console.log("I dati di technologies dentro data sono: ", data?.data?.[0]?.technologies)

    const technologies = data?.data?.[0]?.technologies ?? [];
    const ide = data?.data?.[1]?.IDE ?? [];
    const versioning = data?.data?.[2]?.versioning ?? [];

    const handleLogout = async () => {
        const res = await instance.post('/api/logout');
        if (!res) {
            console.error("Errore nel logout");
            return;
        }
        console.log("I dati delle response sono: ", res.data);
        redirect('/');
    };

    return (
        <Box className={style.pageTech}>
            {
                isPending ? (
                    <CircularProgress size={50} />
                ) : (
                    <Box component={'form'} className={style.formPageTech}>
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
                                    <Grid size={8}>
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
                                            <TechTable props={technologies} />
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
                                <Box className={style.radio_group}>
                                    <RadioGroup
                                        aria-labelledby="choose-tech-to-save"
                                        defaultValue={selected}
                                        name="choose-radio-btn"
                                    >
                                        <FormControlLabel
                                            value="tech"
                                            control={<Radio />}
                                            label="Technologies"
                                            onClick={() => setSelected("tech")}
                                        />
                                        <FormControlLabel
                                            value="ide"
                                            control={<Radio />}
                                            label="IDE"
                                            onClick={() => setSelected("ide")}
                                        />
                                        <FormControlLabel
                                            value="vers"
                                            control={<Radio />}
                                            label="Versioning"
                                            onClick={() => setSelected("vers")}
                                        />
                                    </RadioGroup>
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
        </Box>
    )
}

const TechTable = ({ props }: TechTabsProps) => {
    return (
        <>
            {
                props.map((item) => {
                    return (
                        <>
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
                            <Grid size={8}>
                                <Typography
                                    className={style.typographyGrid}
                                >
                                    {item.description}
                                </Typography>
                            </Grid>
                        </>
                    )
                })
            }
        </>
    )
}