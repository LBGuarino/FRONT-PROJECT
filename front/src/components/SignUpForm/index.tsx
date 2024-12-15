"use client";
import axios from 'axios';  
import { useState } from 'react';
import FormInput from '../FormInput';
import { initialValues, signupConfig } from '@/config/signupConfig';
import styles from './index.module.css';
import Link from 'next/link';

export default function SignUpForm() {
    const [form, setForm] = useState(initialValues); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [property]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, form)
        .then((res) => {
            console.log(res.data);
        })
        .catch((error) => {
            console.log(error.response.data);
        });
        setForm(initialValues);
    }

    return (
        <div className={styles.container}> 
                <form className={styles.form} onSubmit={handleSubmit}>
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

                        <p className="text-center font-light text-base">
                        Already have an account ? <Link href='./login' className="p-1 text-blue-500 hover:underline">Log In</Link>
                        </p>

                        <button className={styles.button} type="submit">
                            Sign Up
                        </button>

                </form>
        </div>
    );
};  