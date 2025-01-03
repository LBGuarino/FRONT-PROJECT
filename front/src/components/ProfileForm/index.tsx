'use client';
import { initialValues, signupConfig } from "@/config/signupConfig";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import FormInput from "../FormInput";
import { Alert } from "@mui/material";
import styles from "./index.module.css";
import axios from "axios";
import getToken from "@/helpers/getToken";

export default function ProfileForm() {
    const { user, error, isLoading } = useUser();
    const [form, setForm] = useState(initialValues);
    const [alert, setAlert] = useState<{
        show: boolean;
        severity: "success" | "error" | "info" | "warning";
        message: string;
    }>({ show: false, severity: "info", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [property]: value });
    };

    const showAlert = (severity: "success" | "error" | "info" | "warning", message: string) => {
        setAlert({ show: true, severity, message });
        setTimeout(() => {
            setAlert({ show: false, severity: "info", message: "" });
        }, 3000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const token = await getToken();
            if (!token) {
                throw new Error("Failed to fetch token");
            }

            const response = await axios.post("http://localhost:3001/users/register", {
                ...form,
                auth0Sub: user?.sub,
                email: user?.email,
                name: user?.name,
                password: token,
            });

            if (response.status === 201) {
                showAlert("success", "User registered successfully!");
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        /* eslint-disable */
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || error.message || "An error occurred";
            showAlert("error", `Failed to register user: ${errorMessage}`);
        /* eslint-enable */
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <Alert severity="error">Error: {error.message}</Alert>}
            {alert.show && <Alert severity={alert.severity}>{alert.message}</Alert>}
            {user && (
                <ul className="flex flex-col justify-between w-1/2">
                    <img
                        src={user?.picture || undefined}
                        alt="profile picture"
                        className="w-1/2 h-1/2 object-cover rounded-full ml-auto mr-auto mt-4 mb-2"
                    />
                    <li>
                        <p className={styles.label}>Name:</p>
                        {user?.name && <p className={styles.input}>{user?.name}</p>}
                    </li>
                    <li>
                        <p className={styles.label}>Email:</p>
                        {user?.email && <p className={styles.input}>{user?.email}</p>}
                    </li>
                    <li>
                        <p className={styles.label}>Last Update:</p>
                        {user?.updated_at && (
                            <p className={styles.input}>{user?.updated_at.trim().split("T")[0]}</p>
                        )}
                    </li>
                </ul>
            )}

            {user && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
                    {signupConfig.map(({ name, label, type, placeholder }) => (
                        <FormInput
                            key={name}
                            name={name}
                            label={label}
                            type={type}
                            value={form[name as keyof typeof form]}
                            onChange={handleChange}
                            placeholder={placeholder}
                        />
                    ))}
                    <button
                        type="submit"
                        className="transition duration-150 ease-in-out bg-slate-400 text-white p-2 hover:bg-slate-600 rounded mt-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            )}
        </>
    );
}
