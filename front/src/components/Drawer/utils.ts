export interface mainCategories {
    id: number,
    name: string,
    path: string,
    subCategories: subCategories[]
}

export interface subCategories {
    id: number,
    name: string
}

export const mainCategories: mainCategories[] = [
    {
        id: 1,
        name: 'Candles',
        path: '/products/&candles',
        subCategories: [
            {
                id: 1,
                name: 'Scented Candles'
            },
            {
                id: 2,
                name: 'Soy Candles'
            },
            {
                id: 3,
                name: 'Small Gifts'
            }
        ]
    },
    {
        id: 2,
        name: 'Scented Oils',
        path: '/products/&scented-oils',
        subCategories: [
            {
                id: 1,
                name: 'Natural Scents'
            },
            {
                id: 2,
                name: 'Classics'
            },
            {
                id: 3,
                name: 'Small Gifts'
            }
        ]
    },
    {
        id: 3,
        name: 'Diffusers',
        path: '/products/&diffusers',
        subCategories: [
            {
                id: 1,
                name: 'Perfumed Diffuser Oils'
            },
            {
                id: 2,
                name: 'Natural Diffuser Oils'
            },
            {
                id: 3,
                name: 'Small Gifts'
            }
        ]
    },
    {
        id: 4,
        name: 'Perfumes',
        path: '/products/&perfumes',
        subCategories: [
            {
                id: 1,
                name: 'Aromas & Fragrances'
            },
            {
                id: 2,
                name: 'Eau de Parfum'
            }
        ]
    }
]