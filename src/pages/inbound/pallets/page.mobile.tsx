import { Box, Typography } from '@mui/material'
import { ActionbarMobile } from './_components/Actionbar.mobile'
import { PalletListMobile } from './_components/PalletList.mobile'
import { FilterBarMobile } from './_components/FilterBar'
import { usePalletsPage } from './_components/PageContext'
export const PalletsPageMobile = () => {
    const { displayRows } = usePalletsPage()

    return (
        <Box
            sx={{
                height: '100dvh',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                bgcolor: 'background.default',
                overflow: 'hidden',

                position: 'relative',
            }}
        >
            <Box
                component="header"
                sx={{
                    flexShrink: 0,
                    bgcolor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    px: 2,
                    pt: 1.5,
                    pb: 1,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        mb: 1,
                    }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        Inbound pallets
                    </Typography>

                    <Typography variant="caption" color="text.secondary">
                        {displayRows.length.toLocaleString()} results
                    </Typography>
                </Box>

                <FilterBarMobile />
            </Box>

            <Box
                component="main"
                sx={{
                    flex: 1,
                    minHeight: 0,
                    display: 'flex',
                    flexDirection: 'column',

                    position: 'relative',
                    pb: ' env(safe-area-inset-bottom)',
                }}
            >
                <Box sx={{ flex: '1', minHeight: '0', overflow: 'auto' }}>
                    <PalletListMobile />
                </Box>
                <ActionbarMobile />
            </Box>
        </Box>
    )
}
