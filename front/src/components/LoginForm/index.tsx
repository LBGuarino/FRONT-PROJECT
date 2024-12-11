'use client';
import { loginConfig } from '@/config/loginConfig';
import FormInput from '../FormInput';
import { useState } from 'react';

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

        <form>
            <div className="form-group">
                {loginConfig.map(({ name, label, type, placeholder }) => {
                    return (
                        <FormInput
                            name={name}
                            label={label}
                            type={type}
                            value={form[name as keyof typeof form]}
                            onChange={handleChange}
                            placeholder={placeholder}
                        />
                    )
                })}
            </div>
        </form>
    );
  };
  