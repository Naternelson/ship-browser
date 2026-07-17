import { DashboardOutlined } from '@mui/icons-material'
import type { DomainItem } from './type'

export const navigation: DomainItem[] = [
    {
        id: 'overview',
        label: 'Overview',
        icon: DashboardOutlined,
        children: [
            {
                id: "sample-sku",
                path: '/inventory/skus/1234',
                "label": 'Sample Sku Page',
                
            }
        ]
    },
]
