import {
    Box,
    Checkbox,
    Chip,
    FormControlLabel,
} from '@mui/material'

import { usePalletsPage } from './PageContext'

type FilterButtonProps = {
    label: string
    filterKey: string
    filterValue: string
    count: number
    checked: boolean
}

export const FilterButton = ({
    label,
    filterKey,
    filterValue,
    count,
    checked,
}: FilterButtonProps) => {
    const { toggleFilter } =
        usePalletsPage()

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
            }}
        >
            <FormControlLabel
                sx={{
                    m: 0,
                }}
                slotProps={{
                    typography: {
                        sx: {
                            fontSize: 12,
                        },
                    },
                }}
                control={
                    <Checkbox
                        checked={checked}
                        onChange={() =>
                            toggleFilter(
                                filterKey,
                                filterValue,
                            )
                        }
                        disableRipple
                        sx={{
                            p: 0.5,

                            '& .MuiSvgIcon-root':
                                {
                                    fontSize: 14,
                                },
                        }}
                    />
                }
                label={label}
            />

            <Chip
                label={count}
                size="small"
                variant={
                    checked
                        ? 'filled'
                        : 'outlined'
                }
                sx={{
                    height: 18,
                    fontSize: 10,
                }}
            />
        </Box>
    )
}