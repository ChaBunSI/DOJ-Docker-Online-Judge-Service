import Link from "next/link";
import styles from "../page.module.css";
import pStyles from "../problem.module.css";
import Image from "next/image";

export default function Submission() {
  return (
    <main className={pStyles.main}>
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
        <div className={pStyles.problem_wrapper}>
          <h1>Submissions</h1>
          <div className={pStyles.problem_list}>
            {[1, 2, 3].map((i) => (
              <Link
                href={"/submission/" + i}
                key={i}
                className={pStyles.problem_block}
              >
                <h2>Submission Id / Problem / UserID </h2>
                <p>Submitted At: 2023/11/14 10:19</p>
                <p>Code Info: Spanish (123 B)</p>
                <p className={pStyles.ac}>
                  Result: AC (Time: 255ms, Mem: 999TB)
                </p>
                <p className={pStyles.wa}>Result: WA! Sanz</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
