"use client";

import style from "./pageTech.module.sass";

import { Box, Grid, Stack, Typography } from "@mui/material";


export default function PageTech() {

    return (
        <Box className={style.pageTech}>
            <Box component={'form'} className={style.formPageTech}>
                <Stack spacing={0.1} sx={{
                    height: '100%',
                    width: '100%',
                }}>
                    <Grid container columns={16} spacing={0.1} sx={{
                        height: '10%',
                        width: '100%',
                        border: '1px solid white',
                    }}>
                        <Grid size={4}>
                            <Typography
                                className={style.typographyGrid}
                            >
                                Ciao
                            </Typography>
                        </Grid>
                        <Grid size={4}>
                            <Typography
                                className={style.typographyGrid}
                            >
                                Bella!
                            </Typography>
                        </Grid>
                        <Grid size={4}>
                            <Typography
                                className={style.typographyGrid}
                            >
                                Come
                            </Typography>
                        </Grid>
                        <Grid size={4}>
                            <Typography
                                className={style.typographyGrid}
                            >
                                Stai?
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box className={style.table}>
                        <Grid container columns={16} spacing={0.1} sx={{
                            height: '90%',
                            width: '100%',
                            border: '1px solid white',
                        }}>

                        </Grid>
                    </Box>
                </Stack>
            </Box>
        </Box>
    )
}