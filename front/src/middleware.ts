import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@auth0/nextjs-auth0/edge";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const skipPaths = [
    "/api/auth",
    "/_next",
    "/favicon.ico",
    "/error",
  ];
  if (skipPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const session = await getSession(req, res);

  if (pathname.startsWith("/profile")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }
    return res;
  }

  if (pathname.startsWith("/shopping&bag")) {
    if (!session?.user) {
      return NextResponse.redirect(new URL("/api/auth/login", req.url));
    }

    try {
      const { user } = session;
      const { sub, email, name } = user;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/check-or-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth0Sub: sub,
          email,
          name,
        }),
      });

      const data = await response.json();
      const isRegistered = data.isRegistered;

      if (!isRegistered) {
        return NextResponse.redirect(new URL("/profile", req.url));
      }

      return res;

    } catch (error) {
      console.error("Error checking or creating user:", error);
      return NextResponse.redirect(new URL("/error", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/shopping&bag/:path*"],
};
