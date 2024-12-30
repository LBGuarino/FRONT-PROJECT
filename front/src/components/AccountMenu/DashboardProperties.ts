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
                path: '/profile/my-orders'
            },
            {
                id: 2,
                name: 'Favorites',
                path: '/profile/my-favorites'
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
                path: '/profile/addresses'
            },
            {
                id: 2,
                name: 'Payments',
                path: '/profile/payments'
            },
            {
                id: 3,
                name: 'Profile Settings',
                path: '/profile'
            }
        ]
    }
];