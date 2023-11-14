import Link from "next/link";
import styles from "../page.module.css";
import Image from "next/image";

export default function SignIn() {
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
            <input type="text" id="email" className={styles.auth_input} />
          </div>
          <div className={styles.auth_line}>
            <label htmlFor="password" className={styles.auth_label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.auth_input}
            />
          </div>
          <div className={styles.auth_line}>
            <button className={styles.auth_button}>Sign In</button>
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
