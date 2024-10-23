"use client";

import { ToasterProvider } from "@/components/providers/toaster-provider";
import "./globals.css";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useAuthStore } from "@/store/use-auth-store";
import { AUTH_TOKEN_KEY } from "@/constants/local-storage-key";
import { useEffect } from "react";
import { isClient } from "@/lib/is-client";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Courses Management",
//   description: "Website for managing courses",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Getting the token value from a cookie
  const token = isClient() ? localStorage.getItem(AUTH_TOKEN_KEY) : null;

  // Getting the setAuthentication function from the authentication store
  const setAuthentication = useAuthStore((state) => state.setAuthentication);

  // Running a side effect whenever the token value changes
  useEffect(() => {
    console.log(token); // Logging the token value for debugging purposes
    if (token) {
      setAuthentication(true); // Setting the authentication status to true if a token exists
    }
  }, [setAuthentication, token]);

  return (
    <html lang="en">
      <head>
        <title>Courses Management</title>
        <meta name="description" content="Website for managing courses" />
      </head>
      <body className={inter.className}>
        <ToasterProvider />
        {children}
      </body>
    </html>
  );
}
