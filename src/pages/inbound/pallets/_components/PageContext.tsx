import { createContext, useContext } from 'react'

import type { InboundPalletType, ParsedSearch, SortBy } from '../types'

export type PageContextType = {
    rows: InboundPalletType[]
    displayRows: InboundPalletType[]
    selected: Set<string>
    setSelected: React.Dispatch<React.SetStateAction<Set<string>>>
    search: ParsedSearch
    sort: SortBy
    toggleFilter: (key: string, value: string) => void
    setSort: (sort: SortBy) => void
}

export const PageContext = createContext<PageContextType | null>(null)

export const usePalletsPage = (): PageContextType => {
    const context = useContext(PageContext)

    if (!context) {
        throw new Error('usePalletsPage must be used inside PalletsPage')
    }

    return context
}
