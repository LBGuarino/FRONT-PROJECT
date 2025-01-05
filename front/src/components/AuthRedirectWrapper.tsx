"use client";

import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AuthRedirectWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (user) {
        try {
          const response = await axios.post("http://localhost:3001/users/check-or-create", {
            auth0Sub: user.sub,
            email: user.email,
            name: user.name,
          });

          const { isRegistered } = response.data;

          if (!isRegistered) {
            router.push("/register"); 
          }
        } catch (error) {
          console.error("Error checking or creating user:", error);
        }
      }
    };

    if (!isLoading) {
      checkOrCreateUser();
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
