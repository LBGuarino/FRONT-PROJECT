"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import axios from "axios";

export default function LoadingPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    const handleUserFlow = async () => {
      if (user)
      try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/check-or-create`, {
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
        console.error("Error al manejar el flujo del usuario:", error);
        router.push("/error");
      }
    };

    handleUserFlow();
  }, [isLoading, user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Loading...</p>
    </div>
  );
}
