import { Box, List, Typography } from '@mui/material'

import { usePalletsPage } from './PageContext'
import { Row } from './Row'
import { SortButton } from './SortButton'
import { FilterMenu } from './FilterMenu'

export const PalletList = () => {
    const { displayRows } = usePalletsPage()

    // const assignedActive = getFilterValues(search, 'assigned').includes('true')

    // const criticalActive = getFilterValues(search, 'priority').includes('0')

    // const assignedCount = useMemo(() => rows.filter(pallet => pallet.assignedDate !== null).length, [rows])

    // const criticalCount = useMemo(() => rows.filter(pallet => pallet.priority === 0).length, [rows])

    return (
        <Box
            sx={{
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                flex: 1,
                overflow: 'hidden',
                boxShadow: t => t.shadows[5],
            }}
        >
            <Box
                sx={{
                    p: 0.5,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    justifyContent: 'flex-end',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <FilterMenu />

                <SortButton />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    overflow: 'auto',
                }}
            >
                <List
                    sx={{
                        gap: '.5rem',
                        bgcolor: 'background.default',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {displayRows.map(pallet => (
                        <Row key={pallet.lpn} pallet={pallet} />
                    ))}

                    {displayRows.length === 0 && (
                        <Box
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                color: 'text.secondary',
                            }}
                        >
                            <Typography variant="body2">No pallets match these filters.</Typography>
                        </Box>
                    )}
                </List>
            </Box>

            <Box
                sx={{
                    bgcolor: 'background.paper',
                    fontSize: '10px',
                    px: '1rem',
                    py: '0.25rem',
                    color: 'text.secondary',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                {displayRows.length} Results
            </Box>
        </Box>
    )
}
