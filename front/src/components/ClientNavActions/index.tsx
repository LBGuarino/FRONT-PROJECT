"use client";

import React from "react";
import { Alert, Skeleton } from "@mui/material";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import AccountMenu from "../AccountMenu";

/**
 * Componente principal para renderizar el botón de Login o el menú de usuario
 */
export default function ClientNavActions() {
  const { user, error, isLoading } = useUser();

  return (
    <>
      {error && <Alert severity="error">Error: {error.message}</Alert>}

      {isLoading && (
        <Skeleton variant="circular">
          <AccountMenu />
        </Skeleton>
      )}

      <div className="flex flex-row justify-center">
        {user ? (
          <AccountMenu />
        ) : (
          !isLoading && (
            <div className="flex flex-row">
              {/* Reemplaza <a> por Link de Next.js para mejor SEO y SPA */}
              <Link
                href="/api/auth/login"
                className="inline-flex font-normal gap-2 uppercase mb-1 text-yellow-950 transition duration-150 ease-in-out hover:text-white"
              >
                <img
                  src="/icons/user.svg"
                  width={16}
                  height={16}
                  alt="user icon"
                />
                Login
              </Link>
            </div>
          )
        )}
      </div>
    </>
  );
}
