"use client";
import styles from './index.module.css';
import { Avatar } from '@mui/material';    
import AccountMenu from '../AccountMenu/AccountMenu';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function ClientNavActions() {
    const { user, error, isLoading } = useUser();
    {error && <p> Error: {error.message} </p>}

return (
    <div className="flex flex-row justify-center">

        {user ?
        <div>
            <AccountMenu />
        </div> :
            <a href="/api/auth/login" className="inline-flex font-normal uppercase mb-1 text-yellow-950 transition duration-150 ease-in-out  hover:text-white"> Login </a>}


    </div>
    )
}   