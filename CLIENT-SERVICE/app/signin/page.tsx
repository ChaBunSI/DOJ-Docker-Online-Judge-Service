"use client";

import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";
import axios from "axios";
import { useInput } from "@/hook/useInput";
import { BASE_URL, LOCAL_STORAGE_JWT_KEY, fetchGroup } from "@/global";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignIn() {
  const router = useRouter();

  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Link href={"/"} className={styles.logo_wrapper}>
          <Image
            className={styles.logo}
            src="/dojb.png"
            alt="Next.js Logo"
            width={64}
            height={36}
            priority
          />
        </Link>
      </div>
      <div className={styles.center}>
        <div className={styles.auth_wrapper}>
          <div className={styles.auth_title}>Sign In</div>
          <div className={styles.auth_line}>
            <label htmlFor="email" className={styles.auth_label}>
              Email
            </label>
            <input
              type="text"
              id="email"
              className={styles.auth_input}
              value={email}
              onChange={onChangeEmail}
            />
          </div>
          <div className={styles.auth_line}>
            <label htmlFor="password" className={styles.auth_label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.auth_input}
              value={password}
              onChange={onChangePassword}
            />
          </div>
          <div className={styles.auth_line}>
            <button
              className={styles.auth_button}
              onClick={async () => {
                try {
                  const { data } = await axios.post(
                    "https://api.goodpose.shop/auth/login",
                    {
                      email,
                      password,
                    }
                  );

                  localStorage.setItem(LOCAL_STORAGE_JWT_KEY, data.accessToken);

                  fetchGroup.api = fetchGroup.api = axios.create({
                    baseURL: BASE_URL,
                    headers: {
                      Authorization: "Bearer " + data.accessToken,
                    },
                  });

                  toast.success("Login Success");
                  router.push("/");
                } catch {
                  toast.error("Login Failed");
                }
              }}
            >
              Sign In
            </button>
          </div>
          <div className={styles.auth_line}>
            <Link href={"/signup"} className={styles.auth_link}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
