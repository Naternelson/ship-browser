import { Box, Checkbox, Chip, ListItem, ListItemButton } from '@mui/material'
import type { InboundPalletType } from '../types'
import { AssignmentOutlined, Check, Print, PriorityHigh, Warning } from '@mui/icons-material'
import { usePalletsPage } from './PageContext'
import { useEffect } from 'react'
export const Row = ({ pallet }: { pallet: InboundPalletType }) => {
    const { selected, setSelected } = usePalletsPage()

    const isSelected = selected.has(pallet.lpn)

    useEffect(() => {
        if (isSelected) console.log(pallet.lpn)
    }, [isSelected])

    const toggleSelected = () => {
        setSelected(previous => {
            const next = new Set(previous)

            if (next.has(pallet.lpn)) {
                next.delete(pallet.lpn)
            } else {
                next.clear()
                next.add(pallet.lpn)
            }

            return next
        })
    }

    return (
        <ListItem
            disablePadding
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    xs: '25px 80px minmax(0, 1fr) 70px',
                    md: '28px 90px minmax(0, 1fr) 90px 110px',
                },
                py: '0.25rem',
                bgcolor: isSelected ? 'action.selected' : 'background.paper',
            }}
        >
            <Checkbox
                checked={isSelected}
                onChange={() => {
                    setSelected(p => {
                        const next = new Set(p)
                        if (next.has(pallet.lpn)) {
                            next.delete(pallet.lpn)
                        } else {
                            next.add(pallet.lpn)
                        }

                        return next
                    })
                }}
                disableRipple
                size="small"
                sx={{
                    p: 0.5,

                    '& .MuiSvgIcon-root': {
                        fontSize: 16,
                    },
                }}
            />

            <ListItemButton
                component="div"
                onClick={toggleSelected}
                selected={isSelected}
                disableGutters
                disableRipple
                sx={{
                    display: 'contents',
                    color: 'text.secondary',
                    py: '.25rem',
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                    <Box sx={{ minWidth: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {pallet.assignedDate && <AssignmentOutlined sx={{ color: 'text.secondary', fontSize: '14px' }} />}
                    </Box>
                    <Box>{pallet.palletId}</Box>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        minWidth: 0,
                    }}
                >
                    <Box
                        sx={{
                            width: 20,
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }}
                    >
                        {pallet.priority === 0 && (
                            <Warning
                                sx={{
                                    fontSize: 16,
                                    color: 'warning.dark',
                                }}
                            />
                        )}
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            minWidth: 0,
                        }}
                    >
                        <Box
                            sx={{
                                color: 'text.primary',
                                fontSize: 14,
                            }}
                        >
                            {pallet.sku}
                        </Box>

                        <Box
                            sx={{
                                minWidth: 0,
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            {pallet.name}
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '5px', justifyContent: 'flex-end' }}>
                    <Box>{pallet.qtyReceived.toLocaleString()}</Box>
                    <Box>/</Box>
                    <Box>{pallet.qtyExpected.toLocaleString()}</Box>
                </Box>
                <Box
                    sx={{
                        display: {
                            xs: 'none',
                        },
                    }}
                >
                    Received: 0
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Chip label={pallet.state} size="small" sx={{ color: 'text.secondary' }} />
                </Box>
            </ListItemButton>
        </ListItem>
    )
}
