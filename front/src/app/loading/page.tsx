"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

export default function LoadingPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const checkOrCreateUser = async () => {
      if (isLoading) return;

      if (user) {
        try {
          const response = await axios.post("http://localhost:3001/users/check-or-create", {
            auth0Sub: user.sub,
            email: user.email,
            name: user.name,
          });

          const { isRegistered } = response.data;

          if (isRegistered) {
            router.push("/");
          } else {
            router.push("/profile");
          }
        } catch (error) {
          console.error("Error checking or creating user:", error);
        }
      }
    };

    checkOrCreateUser();
  }, [user, isLoading, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
