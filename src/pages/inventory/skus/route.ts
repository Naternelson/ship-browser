import type { RouteObject } from "react-router";
import { skuItemRoute } from "./[sku]/route";

export const skusRoute:RouteObject = {
    path: 'skus',
    children: [skuItemRoute]
}