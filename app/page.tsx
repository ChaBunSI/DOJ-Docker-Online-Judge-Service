"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Head from "next/head";
import NameComponent from "./NameComponent";

export default function Home() {
  return (
    <main className={styles.main}>
      <Head>
        <title>Docker Online Judege</title>
      </Head>
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
        <div className={styles.description_auth}>
          <NameComponent />
        </div>
      </div>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/dojb.png"
          alt="Next.js Logo"
          width={160}
          height={90}
          priority
        />
      </div>

      <div className={styles.grid}>
        <Link href={"/problem"} className={styles.card}>
          <h2>
            Problems <span>-&gt;</span>
          </h2>
          <p>There are many problems. Find problem and solve it.</p>
        </Link>

        <Link href={"/submission"} className={styles.card}>
          <h2>
            Submissions <span>-&gt;</span>
          </h2>
          <p>You can find all user&#39;s submissions.</p>
        </Link>

        <Link href={"/addProblem"} className={styles.card}>
          <h2>
            Add Problem <span>-&gt;</span>
          </h2>
          <p>Make your own problem and upload to us.</p>
        </Link>

        <Link href={"/userInfo"} className={styles.card}>
          <h2>
            User Info <span>-&gt;</span>
          </h2>
          <p>Check your submission data and solved/unsolved problems.</p>
        </Link>
      </div>
    </main>
  );
}
