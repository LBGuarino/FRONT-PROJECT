'use client';
import { initialValues, signupConfig } from "@/config/signupConfig";
import { useUser } from "@auth0/nextjs-auth0/client"
import { useState } from "react";
import FormInput from "../FormInput";
import { Alert } from "@mui/material";
import styles from "./index.module.css"

export default function ProfileForm() {
    const { user, error, isLoading } = useUser();
    const [form, setForm] = useState(initialValues);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [property]: value });
    };

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
                <>
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
                </>
            }
        </>
    );
}