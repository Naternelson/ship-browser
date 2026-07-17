export type SkuSummary = {
    id: string
    sku: string
    name: string
    upc: string[]
    active: boolean
    taughtIn: boolean
    eligible: boolean
    autoDepal: boolean
    qtyAvailable: number
    qtyAllocated: number
    qtyUnfulfilled: number
    qtyCommitted: number
    qtyOnHold: number
    qtyTotalSuspect: number
    qtyDrainable: number
    qtyManualRemoval: number
    qtyPending: number
    slotCode: string
    minimum: number
    maximum: number
    sunsetting: string | null
    goLive: string | null
    ti: number | null
    hi: number | null
    palletSize: number | null
    packagingType: string | null
}

export type SkuNotes = {
    creation: {
        date: string
        user: string
    }
    updated: { date: string; user: string }[]
    note: string
}

export type SkuCommit = {
    type: 'fpp' | 'case'
    qty: number
    date: string
    updatedOn: string
}

export type SkuOrder = {
    orderNumber: string
    customerNumber: string
    customerName: string
    deliveryDate: string
    gateDate: string
    gate: string
    qtyPalletized: number
    qtyScratched: number
    qtyOrdered: number
    qtyAllocated: number
    state: string
    updatedOn: string
}

export type SkuInbound = {
    lpn: string
    palletId: string
    exp: string | null
    qtyExpected: number
    qtyReceived: number
    createdOn: string
    state: string
}

type SkuBaseTask = {
    sku: string
    createdOn: string
    status: string
    updatedOn: string
}

type SkuExpirationDrainTask = SkuBaseTask & {
    exp?: string
    before?: string
    after?: string
    type: 'drain by expiration'
}
export type SkuTask = SkuExpirationDrainTask
