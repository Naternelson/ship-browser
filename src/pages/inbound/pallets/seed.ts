import type { InboundPalletType } from './types'

type SeedPalletsOptions = {
    size: number
}

const PALLET_STATES = ['Conventional', 'Pooled', 'Queued', 'Processing', 'Waiting', 'Rejected', 'Storing', 'Returning', 'Complete'] as const

const PRODUCT_NAMES = [
    'Classic Potato Chips',
    'Nacho Cheese Tortilla Chips',
    'Sparkling Water',
    'Chocolate Sandwich Cookies',
    'Peanut Butter Crackers',
    'Vanilla Protein Shakes',
    'Fruit Snack Pouches',
    'Original Beef Jerky',
    'Honey Granola Bars',
    'Salted Pretzels',
]

const INBOUND_CELLS = ['AIB-204', 'AIB-205']

const randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const randomItem = <T>(items: readonly T[]): T => {
    return items[randomInt(0, items.length - 1)]
}

const randomNumericString = (length: number): string => {
    return Array.from({ length }, () => randomInt(0, 9)).join('')
}

const randomDateBetween = (start: Date, end: Date): Date => {
    const startTime = start.getTime()
    const endTime = end.getTime()

    return new Date(randomInt(startTime, endTime))
}

const addMonths = (date: Date, months: number): Date => {
    const result = new Date(date)
    result.setMonth(result.getMonth() + months)
    return result
}

const addYears = (date: Date, years: number): Date => {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() + years)
    return result
}

const createConventionalLocation = (): string => {
    const aisle = randomInt(10, 99).toString()
    const bay = randomInt(1, 999).toString().padStart(3, '0')
    const level = String.fromCharCode(randomInt(65, 90))

    return `${aisle}-${bay}${level}`
}

const createLocation = (state: InboundPalletType['state']): string => {
    switch (state) {
        case 'Processing':
        case 'Rejected':
        case 'Storing':
            return randomItem(INBOUND_CELLS)

        case 'Pooled':
        case 'Queued':
        case 'Waiting':
            return '30-G'

        case 'Conventional':
        case 'Returning':
        case 'Complete':
        default:
            return createConventionalLocation()
    }
}

const createQtyReceived = (state: InboundPalletType['state'], qtyExpected: number, _ti: number): number => {
    switch (state) {
        case 'Processing':
            return randomInt(1, Math.max(1, qtyExpected - 1))

        case 'Waiting':
        case 'Rejected':
            return randomInt(1, qtyExpected)

        case 'Storing':
        case 'Complete':
            return qtyExpected

        case 'Returning':
            return randomInt(0, qtyExpected)

        default:
            return 0
    }
}

const createQueuedDate = (state: InboundPalletType['state'], now: Date): string | null => {
    const queuedStates = new Set(['Queued', 'Processing', 'Waiting', 'Rejected', 'Storing'])

    if (!queuedStates.has(state)) {
        return null
    }

    const twelveHoursAgo = new Date(now.getTime() - 12 * 60 * 60 * 1000)

    // Favor dates from within the last hour.
    const useRecentDate = Math.random() < 0.7
    const start = useRecentDate ? new Date(now.getTime() - 60 * 60 * 1000) : twelveHoursAgo

    return randomDateBetween(start, now).toISOString()
}

const createAssignedDate = (state: InboundPalletType['state'], queuedDate: string | null, now: Date): string | null => {
    const assignedStates = new Set(['Processing', 'Waiting', 'Rejected', 'Storing', 'Returning', 'Complete'])

    if (!assignedStates.has(state)) {
        return null
    }

    const earliestDate = queuedDate ? new Date(queuedDate) : new Date(now.getTime() - 12 * 60 * 60 * 1000)

    return randomDateBetween(earliestDate, now).toISOString()
}

export const seedPallets = ({ size }: SeedPalletsOptions): InboundPalletType[] => {
    if (!Number.isInteger(size) || size < 0) {
        throw new Error('seedPallets size must be a non-negative integer.')
    }

    const now = new Date()
    const expirationStart = addMonths(now, 2)
    const expirationEnd = addYears(now, 2)

    return Array.from({ length: size }, (_, _index) => {
        const lpn = randomNumericString(12)
        const state = randomItem(PALLET_STATES)

        const ti = randomInt(6, 16)
        const layers = randomInt(4, 12)
        const qtyExpected = ti * layers

        const queuedDate = createQueuedDate(state, now)
        const assignedDate = createAssignedDate(state, queuedDate, now)

        return {
            lpn,
            palletId: lpn.slice(0, 7),
            sku: randomNumericString(6),
            name: randomItem(PRODUCT_NAMES),
            expiration: randomDateBetween(expirationStart, expirationEnd).toISOString(),
            qtyExpected,
            qtyReceived: createQtyReceived(state, qtyExpected, ti),
            layers,
            ti,
            queuedDate,
            state,
            location: createLocation(state),
            priority: randomInt(-1, 6),
            assignedDate,
            missing: Math.random() < 0.05,
        }
    })
}
