"use client";
import { Alert, Skeleton } from '@mui/material';
import AccountMenu from '../AccountMenu';
import { useUser } from '@auth0/nextjs-auth0/client';


export default function ClientNavActions() {
    const { user, error, isLoading } = useUser();

    return (
        <>
            {error && <Alert severity="error"> Error: {error.message} </Alert>}
            {isLoading && <>
                <Skeleton variant='circular'>
                    <AccountMenu />
                </Skeleton>
            </>
            }
            <div className="flex flex-row justify-center">
                {user ?
                    <div>
                        <AccountMenu />
                    </div> : null}
                {!user && !isLoading && <>
                    <div className="flex flex-row">
                        <a href="/api/auth/login" className="inline-flex font-normal gap-2 uppercase mb-1 text-yellow-950 transition duration-150 ease-in-out hover:text-white">
                            <img src="/icons/user.svg" width={16} height={16} /> Login
                        </a>
                    </div>
                </>}
            </div>
        </>
    )
}   