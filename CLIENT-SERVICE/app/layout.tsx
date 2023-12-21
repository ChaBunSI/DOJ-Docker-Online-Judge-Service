"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { BASE_URL, LOCAL_STORAGE_JWT_KEY, fetchGroup } from "@/global";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
    if (jwt) {
      fetchGroup.api = axios.create({
        baseURL: BASE_URL,
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
    }
  }, []);

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
