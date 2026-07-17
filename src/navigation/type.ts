import type { SvgIconProps } from '@mui/material'
import type { ComponentType } from 'react'

export type DomainItem = {
    id: string
    label: string
    icon: ComponentType<SvgIconProps>
    children?: NavigationItem[]
    path?: string
    badge?: string | number
    disabled?: boolean
}

export type NavigationItem = {
    id: string
    label: string
    path?: string
    icon?: ComponentType<SvgIconProps>
    children?: NavigationItem[]
    badge?: string | number
    disabled?: boolean
}
