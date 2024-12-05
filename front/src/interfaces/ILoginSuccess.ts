import { IUser } from "./IUser"

export interface ILoginSuccess {
    login: boolean,
    user: IUser,
    token: string
};
