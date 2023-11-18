"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { BASE_URL, LOCAL_STORAGE_JWT_KEY, axiosGroup } from "@/global";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);
    if (jwt) {
      axiosGroup.api = axios.create({
        baseURL: BASE_URL,
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });
    }
  }, []);

  return (
    <html lang="dden">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
