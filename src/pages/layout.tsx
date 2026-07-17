import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { Outlet } from 'react-router'
import { theme } from './theme'
import { Appbar } from './_components/Appbar'
import { PrimarySidebar } from './_components/PrimarySidebar'
import { navigation } from '../navigation/navigation'

export const Layout = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ height: '100vh', minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <Appbar />
                <Box sx={{ display: 'flex', flexDirection: 'row', flex: 1, minHeight: '0', overflow: 'hidden' }}>
                    <PrimarySidebar navigationConfig={navigation} />
                    <Outlet />
                </Box>
            </Box>
        </ThemeProvider>
    )
}
