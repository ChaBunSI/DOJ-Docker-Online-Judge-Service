import Image from "next/image";
import styles from "./app/page.module.css";
import Link from "next/link";

export default function LoadingPage() {
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
        <div className={styles.description_auth}></div>
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

      <div className={styles.grid}></div>
      <div className={styles.loading} />
    </main>
  );
}
