export interface IUser {
    id: number,
    name: string,
    email: string,
    address: string,
    phone: string,
    role: string,
    credentials: {
        id: number,
        password: string
    };
    orders: [];
}