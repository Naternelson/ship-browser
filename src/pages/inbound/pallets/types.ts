export type InboundPalletType = {
    /**12 digit character of numbers */
    lpn: string
    /** First 7 digits of the lpn */
    palletId: string
    /** 6 Digit character of numbers */
    sku: string
    /** Product name */
    name: string
    /** Expiration. For seeding, make it a datetime between 2 months and 2 years from now */
    expiration: string
    /** Number based off a tihi of a pallet. So a 10x 10 pallet should be 100 cases */
    qtyExpected: number
    /** Only if the state is 'processing' | 'storing' should there be a positive value for this */
    qtyReceived: number
    /** Number of layers of product on this pallet*/
    layers: number
    /** Number of cases of product per layer */
    ti: number
    /** Datetime should be some time in the last 12 hours, preferabley in the last hour */
    queuedDate: string | null
    /** In Conventional, Pooled, Queued, Processing, Waiting, Rejected, Storing, Returning, Complete */
    state: string
    /** When in processing (Processing, waiting, rejected, storing) should be the inbound cells (AIB-204, AIB-205). * When in Pooled, Quered, Waiting, should be in 30-G. When in conventional, should follow this pattern (##-###[A-Z]). Like 55-123A */
    location: string
    /** Determine from the critical nature of the sku. For instance 0 refers to critical, 1 to Zero balance on hand. 2 To Less than a days worth, 3 less than 2 days worth and so on. -1 should be sent back to conventional either due to sunsetting the product, or too much on hand in the structure */
    priority: number
    /** If null, this pallet has not been assigned, otherwise show the datetime of its assignment */
    assignedDate: string | null //* Whether a pallet is not where it says it its */ missing: boolean;
    missing: boolean
}

export type ParsedSearch = {
    search: string
    [filter: string]: string | string[]
}
export type SortOption = 'sku' | 'date'
export type SortDirection = 'asc' | 'desc'

export type SortBy = {
    type: SortOption
    direction: SortDirection
}
