import type { RouteObject } from 'react-router'
import { Layout } from './layout'
import { inventoryRoute } from './inventory/route'

export const DefaultRoute: RouteObject = {
    path: '/',
    Component: Layout,
    children: [inventoryRoute],
}
