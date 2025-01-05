export interface SubCategory {
    id: number;
    name: string;
  }
  
  export interface MainCategory {
    id: number;
    name: string;
    path: string;
    subCategories: SubCategory[];
  }
  
  export const mainCategories: MainCategory[] = [
    {
      id: 1,
      name: 'Candles',
      path: '/products/Candles',
      subCategories: [
        { id: 1, name: 'Scented Candles' },
        { id: 2, name: 'Soy Candles' },
        { id: 3, name: 'Small Gifts' },
      ],
    },
    {
      id: 2,
      name: 'Scented Oils',
      path: '/products/Scented-Oils',
      subCategories: [
        { id: 1, name: 'Natural Scents' },
        { id: 2, name: 'Classics' },
        { id: 3, name: 'Small Gifts' },
      ],
    },
    {
      id: 3,
      name: 'Diffusers',
      path: '/products/Diffusers',
      subCategories: [
        { id: 1, name: 'Perfumed Diffuser Oils' },
        { id: 2, name: 'Natural Diffuser Oils' },
        { id: 3, name: 'Small Gifts' },
      ],
    },
    {
      id: 4,
      name: 'Perfumes',
      path: '/products/Perfumes',
      subCategories: [
        { id: 1, name: 'Aromas & Fragrances' },
        { id: 2, name: 'Eau de Parfum' },
      ],
    },
  ];
  