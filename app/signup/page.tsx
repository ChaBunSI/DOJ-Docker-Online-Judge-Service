"use client";

import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";
import { useInput } from "@/hook/useInput";
import axios from "axios";

export default function SignUp() {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordVerify, onChangePasswordVerify] = useInput("");
  const [name, onChangeName] = useInput("");

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
          <div className={styles.auth_title}>Sign Up</div>
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
            <label htmlFor="name" className={styles.auth_label}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className={styles.auth_input}
              value={name}
              onChange={onChangeName}
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
            <label htmlFor="password" className={styles.auth_label}>
              Password Verify
            </label>
            <input
              type="password"
              id="password"
              className={styles.auth_input}
              value={passwordVerify}
              onChange={onChangePasswordVerify}
            />
          </div>
          <div className={styles.auth_line}>
            <button
              className={styles.auth_button}
              onClick={async () => {
                if (password !== passwordVerify) {
                  alert("비밀번호가 일치하지 않습니다.");
                  return;
                }

                const { data } = await axios.post(
                  "http://34.64.213.211/auth/join",
                  {
                    email,
                    password,
                    name,
                  }
                );

                console.log(data);
              }}
            >
              Sign Up
            </button>
          </div>
          <div className={styles.auth_line}>
            <Link href={"/signin"} className={styles.auth_link}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
