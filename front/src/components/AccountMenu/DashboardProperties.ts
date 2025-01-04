export interface SubCategory {
    id: number;
    name: string;
    path: string;
  }
  
  export interface DashboardProperty {
    id: number;
    name: string;
    subCategories: SubCategory[];
  }
  
  export const dashboardProperties: DashboardProperty[] = [
    {
      id: 1,
      name: "My Orders",
      subCategories: [
        {
          id: 1,
          name: "Active Orders",
          path: "/profile/my-orders",
        },
        {
          id: 2,
          name: "Favorites",
          path: "/profile/my-favorites",
        },
      ],
    },
    {
      id: 2,
      name: "My Profile",
      subCategories: [
        {
          id: 1,
          name: "Addresses",
          path: "/profile/addresses",
        },
        {
          id: 2,
          name: "Payments",
          path: "/profile/payments",
        },
        {
          id: 3,
          name: "Profile Settings",
          path: "/profile",
        },
      ],
    },
  ];
  