export interface DashboardProperties {
    id: number,
    name: string,
    subCategories: subCategories[]
}

export interface subCategories {
    id: number,
    name: string
    path: string
}

export const dashboardProperties: DashboardProperties[] = [
    {
        id: 1,
        name: 'My Orders',
        subCategories: [
            {
                id: 1,
                name: 'Active Orders',
                path: '/dashboard/my-orders'
            },
            {
                id: 2,
                name: 'Favorites',
                path: '/dashboard/my-favorites'
            }
        ]
    },
    {
        id: 2,
        name: 'My Profile',
        subCategories: [
            {
                id: 1,
                name: 'Addresses',
                path: '/dashboard/addresses'
            },
            {
                id: 2,
                name: 'Payments',
                path: '/dashboard/payments'
            },
            {
                id: 3,
                name: 'Profile Settings',
                path: '/profile'
            }
        ]
    }
];