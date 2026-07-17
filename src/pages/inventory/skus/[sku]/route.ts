import type { RouteObject } from "react-router";
import { Page } from "./page";

export const skuItemRoute:RouteObject = {
    path: ':sku',
    Component: Page
}