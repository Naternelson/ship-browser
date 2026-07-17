import type { SkuSummary } from './type'

export const skuSummary: SkuSummary = {
    id: 'sample-sku:123456',
    sku: '123456',
    name: 'Sample SKU Example',
    upc: ['012345678905', '012345678912'],

    active: true,
    taughtIn: true,
    eligible: true,
    autoDepal: true,

    qtyAvailable: 350,
    qtyAllocated: 50,
    qtyUnfulfilled: 300,
    qtyCommitted: 2000,
    qtyOnHold: 20,
    qtyTotalSuspect: 25,
    qtyDrainable: 10,
    qtyManualRemoval: 10,
    qtyPending: 5,

    slotCode: '8C',

    minimum: 100,
    maximum: 1000,

    sunsetting: null,
    goLive: '2026-01-01T00:00:00.000Z',

    ti: 10,
    hi: 10,
    palletSize: 100,

    packagingType: 'Sturdy Cardboard',
}