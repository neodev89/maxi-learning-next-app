"use client"

import GlobalWrapper from "@/ui/components/global-wrapper/GlobalWrapper";
import PageTech from "@/ui/components/pages/pageTech/pageTech";
import { Box, Stack } from "@mui/material";

export default function Dashboard() {

    return (
        <div>
            <GlobalWrapper>
                <Box sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                }}>
                    <Box sx={{
                        position: 'relative',
                        display: 'flex',
                        height: '80px',
                        width: '100%',
                    }}>
                        Scegli quale tecnologia sai usare
                    </Box>
                    <PageTech />
                </Box>
            </GlobalWrapper>
        </div>
    );
}
