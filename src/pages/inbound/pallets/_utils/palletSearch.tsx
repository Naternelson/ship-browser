import type {
    InboundPalletType,
    ParsedSearch,
    SortBy,
} from '../types'

export const parseSearch = (
    input: string,
): ParsedSearch => {
    const filters: Record<
        string,
        string[]
    > = {}

    const search = input
        .replace(
            /(\w+):("[^"]*"|\S+)/g,
            (
                _,
                key: string,
                rawValue: string,
            ) => {
                const value =
                    rawValue.replace(
                        /^"|"$/g,
                        '',
                    )

                filters[key] ??= []
                filters[key].push(value)

                return ' '
            },
        )
        .replace(/\s+/g, ' ')
        .trim()

    return {
        ...filters,
        search,
    }
}

export const stringifySearch = (
    parsed: ParsedSearch,
): string => {
    const {
        search,
        ...filters
    } = parsed

    const filterParts =
        Object.entries(filters).flatMap(
            ([key, rawValues]) => {
                const values =
                    Array.isArray(
                        rawValues,
                    )
                        ? rawValues
                        : [rawValues]

                return values.map(value => {
                    const normalized =
                        value.trim()

                    if (!normalized) {
                        return ''
                    }

                    const formattedValue =
                        normalized.includes(
                            ' ',
                        )
                            ? `"${normalized}"`
                            : normalized

                    return `${key}:${formattedValue}`
                })
            },
        )

    return [
        ...filterParts,
        search,
    ]
        .filter(Boolean)
        .join(' ')
        .trim()
}

export const getFilterValues = (
    parsed: ParsedSearch,
    key: string,
): string[] => {
    const value = parsed[key]

    if (typeof value === 'string') {
        return [value]
    }

    return value ?? []
}

export const matchesSearch = (
    pallet: InboundPalletType,
    parsed: ParsedSearch,
): boolean => {
    const generalSearch =
        parsed.search
            .trim()
            .toLowerCase()

    if (generalSearch) {
        const searchableText = [
            pallet.lpn,
            pallet.palletId,
            pallet.sku,
            pallet.name,
            pallet.state,
            pallet.location,
        ]
            .join(' ')
            .toLowerCase()

        if (
            !searchableText.includes(
                generalSearch,
            )
        ) {
            return false
        }
    }

    const assignedFilters =
        getFilterValues(
            parsed,
            'assigned',
        )

    if (
        assignedFilters.includes(
            'true',
        ) &&
        pallet.assignedDate === null
    ) {
        return false
    }

    if (
        assignedFilters.includes(
            'false',
        ) &&
        pallet.assignedDate !== null
    ) {
        return false
    }

    const priorityFilters =
        getFilterValues(
            parsed,
            'priority',
        )

    if (
        priorityFilters.length > 0 &&
        !priorityFilters.includes(
            String(pallet.priority),
        )
    ) {
        return false
    }

    const stateFilters =
        getFilterValues(
            parsed,
            'state',
        ).map(value =>
            value.toLowerCase(),
        )

    if (
        stateFilters.length > 0 &&
        !stateFilters.includes(
            pallet.state.toLowerCase(),
        )
    ) {
        return false
    }

    const missingFilters =
        getFilterValues(
            parsed,
            'missing',
        )

    if (
        missingFilters.includes(
            'true',
        ) &&
        !pallet.missing
    ) {
        return false
    }

    if (
        missingFilters.includes(
            'false',
        ) &&
        pallet.missing
    ) {
        return false
    }

    return true
}

export const sortPallets = (
    pallets: InboundPalletType[],
    sort: SortBy,
): InboundPalletType[] => {
    return [...pallets].sort(
        (a, b) => {
            let comparison = 0

            switch (sort.type) {
                case 'sku':
                    comparison =
                        a.sku.localeCompare(
                            b.sku,
                            undefined,
                            {
                                numeric: true,
                            },
                        )
                    break

                case 'date': {
                    const aTime =
                        a.queuedDate
                            ? new Date(
                                  a.queuedDate,
                              ).getTime()
                            : 0

                    const bTime =
                        b.queuedDate
                            ? new Date(
                                  b.queuedDate,
                              ).getTime()
                            : 0

                    comparison =
                        aTime - bTime
                    break
                }
            }

            return sort.direction ===
                'asc'
                ? comparison
                : -comparison
        },
    )
}
