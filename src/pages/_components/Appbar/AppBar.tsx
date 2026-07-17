import { Box } from '@mui/material'
import { Searchbar } from './Searchbar'

export const Appbar = () => {
    return (
        <Box
            sx={{
                height: '40px',
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}
        >
            <Searchbar />
        </Box>
    )
}
