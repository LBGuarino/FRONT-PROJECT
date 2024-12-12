"use client";
import { useState } from 'react';
import FormInput from '../FormInput';
import { signupConfig } from '@/config/signupConfig';
import styles from './index.module.css';
import Link from 'next/link';

export default function SignUpForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        confirmPassword: '',
    }); 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [property]: value });
    };

    return (
        <div className={styles.container}> 
            <div className={styles.animatedBorder}>
                <form className={styles.form}>
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

                        <button className={styles.button}>Sign Up</button>

                </form>
            </div>
        </div> 
    );
};  