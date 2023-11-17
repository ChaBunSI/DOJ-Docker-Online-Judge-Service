"use client";

import styles from "./page.module.css";
import { LOCAL_STORAGE_JWT_KEY } from "@/global";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NameComponent() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem(LOCAL_STORAGE_JWT_KEY);

      if (jwt === null || jwt === undefined) {
        return;
      }

      const userJson = JSON.parse(decodeURIComponent(atob(jwt.split(".")[1])));
      const name = userJson.userName;

      setUserName(name);
    })();
  }, []);

  return (
    <div>
      {userName === "" ? (
        <Link href={"/signin"} className={styles.description_auth_link}>
          Sign In/Up
        </Link>
      ) : (
        <div>{userName} loggedIn</div>
      )}
    </div>
  );
}
