/* eslint-disable */
'use client';
import axios from 'axios';
import { initialLoginValues, loginConfig } from '@/config/loginConfig';
import FormInput from '../FormInput';
import {  useState } from 'react';
import styles from './index.module.css';
import Link from 'next/link';
import { Alert, AlertTitle, CircularProgress, Stack } from '@mui/material';

export default function LoginForm() {
    const [form, setForm] = useState(initialLoginValues);
    const [state, setState] = useState({
        error: null,
        loading: false,
        showErrorAlert: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, form
            );
            console.log(response.data);
        
        } catch (error:any) {
            setState((prev) => ({
                ...prev,
                error: error.response?.data?.message || 'Something went wrong',
                showErrorAlert: true,
            }));
            setTimeout(() =>
                setState((prev) => ({ ...prev, showErrorAlert: false })),
                3000);
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
            setForm(initialLoginValues);
        }
    };

    return (
        <>
            {state.loading ? (
                <div className={styles.loadingContainer}>
                    <CircularProgress />
                    <p>please wait...</p>
                </div>
            ) : (

                <>

                    {state.showErrorAlert && (
                        <Stack spacing={2} sx={{ width: '100%' }}>
                            <Alert severity="error">
                                <AlertTitle>Error</AlertTitle>
                                {state.error}
                            </Alert>
                        </Stack>
                    )}

                    <form className={styles.form} onSubmit={handleSubmit}>
                        {loginConfig.map(({ name, label, type, placeholder }) => {
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

                            )
                        })}

                        <p className="mt-2 text-center font-light text-base">
                            Don't have an account yet? <Link href='/auth/signup' className="p-1 text-blue-500 hover:underline">Sign Up</Link>
                        </p>

                        <button className={styles.button} type="submit">
                            Login
                        </button>
                    </form>
                </>
            )}
        </>
    );
};
