"use client";
import { useState } from 'react';
import FormInput from '../FormInput';
import { signupConfig } from '@/config/signupConfig';

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
        <form>
            <div className="form-group">
                {signupConfig.map(({ name, label, type, placeholder }) => {
                    return (
                    <FormInput
                        name={name}
                        label={label}
                        type={type}
                        value={form[name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={placeholder}
                    />
                    );
                })}
            </div>
        </form>
    );
};  