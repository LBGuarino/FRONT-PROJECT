'use client';
import { loginConfig } from '@/config/loginConfig';
import FormInput from '../FormInput';
import { useState } from 'react';
import styles from './index.module.css';
import Link from 'next/link';

export default function LoginForm(){
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const property = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [property]: value });
    };

    return (

            <form className={styles.form}>
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

                <button className={styles.button}>Log In</button>
            </form>
    );
  };
  