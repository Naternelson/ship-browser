import { Box, InputBase, Typography, type SvgIconProps } from '@mui/material'

import type { SkuSummary } from './type'
import { skuSummary } from './sampleData'
import type { ComponentType } from 'react'
import { Pallet } from '@mui/icons-material'

export const Page = () => {
    return (
        <Box
            sx={{
                flex: 1,
                minHeight: 0,
                overflow: 'auto',
            }}
        >
            <Header item={skuSummary} />

            <Box
                sx={{
                    width: '100%',
                    maxWidth: 1000,
                    mx: 'auto',
                    px: 2,
                    my: '2rem',
                }}
            >
                <Node value={skuSummary.sku} label="SKU" />

                <Node value={skuSummary.name} label="Name" />
                <Node value={skuSummary.slotCode} label="Slot Code" />
                <Node value={skuSummary.packagingType} label="Packaging Type" />
                {skuSummary.upc.map(upc => (
                    <Node value={upc} label="UPC" />
                ))}
                <Node value={skuSummary.ti} label="Ti" />
                <Node value={skuSummary.ti} label="Hi" />
                <Node value={skuSummary.palletSize} label="Pallet Size" icon={Pallet} />
            </Box>
        </Box>
    )
}

const Header = ({ item }: { item: SkuSummary }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 2,
                mx: 2,
                py: 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Typography variant="h1" sx={{ color: 'text.primary' }}>
                {item.sku}
            </Typography>

            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                {item.name}
            </Typography>
        </Box>
    )
}

type NodeProps = {
    label: string
    value: string | number | null
    icon?: ComponentType<SvgIconProps>
}

const Node = ({ label, value, icon }: NodeProps) => {
    const Icon = icon
    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '120px minmax(0, 1fr)',
                minHeight: 40,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 0.5,
                    pr: 2,
                    borderRight: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {label}
                </Typography>
            </Box>

            <Box
                onClick={e => {
                    const target = e.currentTarget.querySelector('input')
                    target?.focus()
                    target?.select()
                }}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    my: 0.5,
                    ml: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    fontSize: '12px',
                    '&:focus-within': {
                        outline: '1px solid',
                        outlineColor: 'primary.main',
                        outlineOffset: '-2px',
                    },
                }}
            >
                <Box sx={{ width: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {Icon && <Icon fontSize="small" sx={{ fontSize: '14px', color: 'text.secondary', opacity: .5 }} />}
                </Box>
                <InputBase
                    value={String(value)}
                    slotProps={{
                        input: {
                            readOnly: true,
                            'aria-label': label,
                            onFocus: event => {
                                event.currentTarget.select()
                            },

                            style: {
                                cursor: 'default',
                            },
                        },
                    }}
                    sx={{
                        minWidth: 240,
                        paddingRight: 1.25,
                        py: 0.25,
                        fontSize: 'inherit',
                        '& input': {
                            cursor: 'default',
                        },
                    }}
                />
            </Box>
        </Box>
    )
}
