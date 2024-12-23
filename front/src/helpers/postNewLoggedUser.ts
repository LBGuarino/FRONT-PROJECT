import { IRegister } from "@/interfaces/IRegister";
import getToken from "./getToken";
import axios from "axios";


const postNewLoggedUser = async (user: IRegister | null) => {
    try {
        const token = await getToken();
        if (!token) {
            throw new Error("Failed to fetch token");
        }

        const response = await axios.post("http://localhost:3001/users/register", user );

        if (!response) {
            throw new Error("Failed to post new user");
        }

        const data = await response.data();
        return data;
    } catch (error) {
        console.error("Error posting new user:", error);
        return null;
    }
}

export default postNewLoggedUser;