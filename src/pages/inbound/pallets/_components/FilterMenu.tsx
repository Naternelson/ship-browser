import { useRef, useState } from 'react'
import {
    Box,
    Button,
    Checkbox,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fade,
    FormControlLabel,
    IconButton,

} from '@mui/material'
import { ArrowDropDown, Close, Filter } from '@mui/icons-material'

export const FilterMenu = () => {
    const anchorEl = useRef<HTMLButtonElement>(null)
    const [open, setOpen] = useState(false)

    return (
        <Box sx={{ display: 'flex', color: 'text.secondary' }}>
            <Button
                ref={anchorEl}
                onClick={() => {
                    setOpen(true)
                }}
                color={'inherit'}
                size="small"
                variant="outlined"
                startIcon={<Filter fontSize="small" />}
                endIcon={<ArrowDropDown />}
            >
                Filter
            </Button>
            <Dialog fullScreen open={open} onClose={() => setOpen(false)} slots={{ transition: Fade }}>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box> Inbound Pallet Filters</Box>
                    <Box>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close fontSize="small" />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Container sx={{ my: '1rem' }}>
                        <Box
                            sx={{
                                width: '100px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1rem',
                            }}
                        >
                            <FormControlLabel
                                control={<Checkbox />}
                                label={'Assigned'}
                                slotProps={{ typography: { sx: { color: 'text.secondary' } } }}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label={'Criticals'}
                                slotProps={{ typography: { sx: { color: 'text.secondary' } } }}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label={'Completed'}
                                slotProps={{ typography: { sx: { color: 'text.secondary' } } }}
                            />
                        </Box>
                    </Container>
                </DialogContent>
                <DialogActions>
                    <Button sx={{ color: 'text.secondary', minWidth: '100px' }}>Cancel</Button>
                    <Button variant="contained" size="small" sx={{ minWidth: '100px' }}>
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
