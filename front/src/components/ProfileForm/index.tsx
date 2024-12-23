'use client';
import { initialValues, signupConfig } from "@/config/signupConfig";
import { useUser } from "@auth0/nextjs-auth0/client"
import { useState } from "react";
import FormInput from "../FormInput";
import { Alert } from "@mui/material";
import styles from "./index.module.css"
import axios from "axios";
import getToken from "@/helpers/getToken";

export default function ProfileForm() {
    const { user, error, isLoading } = useUser();
    const [form, setForm] = useState(initialValues);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [property]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const token = await getToken();
            if (!token) {
                throw new Error("Failed to fetch token");
            }

        const response = await axios.post("http://localhost:3001/users/register", {...form, 
        auth0Sub: user?.sub, 
        email: user?.email, 
        name: user?.name,
        password: token
    })
        console.log("Server response:", response.data);  
        } catch (error) {
            console.error("Error posting new user:", error);
        }
    }


    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <Alert />}
            {user &&
                <ul className="flex flex-col justify-between">
                    <img src={user?.picture || undefined} alt="profile picture" className=" w-1/2 h-1/2 object-cover rounded-full ml-auto mr-auto mt-4 mb-2" />

                    <li>
                        <p className={styles.label}>
                            Name:
                        </p>
                        {user?.name && <p className={styles.input}>{user?.name}</p>}
                    </li>

                    <li>
                        <p className={styles.label}>
                            Email:
                        </p>
                        {user?.email && <p className={styles.input}>{user?.email}</p>}
                    </li>

                    <li>
                        <p className={styles.label}>
                            Last Update:
                        </p>
                        {user?.updated_at && <p className={styles.input}>{user?.updated_at}</p>}
                    </li>
                </ul>
            }

            {user &&
                <form onSubmit={handleSubmit}>
                    {signupConfig.map(({ name, label, type, placeholder }) => {
                        return (
                            <FormInput
                                key={name}
                                name={name}
                                label={label}
                                type={type}
                                value={form[name as keyof typeof form]}
                                onChange={handleChange}
                                placeholder={placeholder}
                            />
                        );
                    })}
                    <button type="submit" className="">Submit</button>
                </form>
            }
        </>
    );
}