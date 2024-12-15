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
            {error && <Alert/>}
                <form className="flex flex-col justify-between">
                    <label className={styles.label}>
                    Name:
                    </label> 
                    <input 
                    className={styles.input}
                    type="text" 
                    value={user?.name || undefined} 
                    readOnly/>    

                    <label className={styles.label}>
                        Email:
                    </label> 
                    <input 
                    className={styles.input} 
                    type="text" 
                    value={user?.email || undefined} 
                    readOnly/>    
                    
                    <label className={styles.label}>
                        Last Update:
                    </label> 
                    <input 
                    className={styles.input} 
                    type="text" 
                    value={user?.updated_at || undefined} 
                    readOnly/>
                </form>

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
    );
}