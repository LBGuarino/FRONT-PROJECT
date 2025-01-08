export interface NavItem {
    text: string,
    path: string,
    icon: string,
}

export const NavConfig: NavItem[] = [
    {
        text: 'contact us',
        path: '/contact',
        icon: '/icons/contact.svg'
            
    },
    {
        text: 'Wish List',
        path: '/wish-list',
        icon: '/icons/wishlist.svg'
    }
]   
