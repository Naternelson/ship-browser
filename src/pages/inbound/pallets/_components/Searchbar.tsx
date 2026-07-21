import { Box, InputBase } from '@mui/material'
import { Search } from '@mui/icons-material'

export const Searchbar = () => {
    return (
        <Box sx={{ width: '100%', my: '1rem' }}>
            <Box
                sx={{
                    border: '1px solid',
                    borderRadius: '5px',
                    borderColor: 'secondary.dark',
                    display: 'flex',
                    alignItems: 'center',
                    px: '0.25rem',
                    gap: '.5rem',
                    '&:focus-within': {
                        borderColor: 'secondary.main',
                        bgcolor: 'action.focus',
                    },
                }}
            >
                <Search fontSize="small" sx={{ color: 'text.secondary' }} />
                <InputBase sx={{ flex: '1' }} />
            </Box>
        </Box>
    )
}
