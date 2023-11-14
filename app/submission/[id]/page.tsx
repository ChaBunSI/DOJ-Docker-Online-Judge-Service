import Link from "next/link";
import styles from "../../page.module.css";
import pStyles from "../../problem.module.css";
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
          <div className={pStyles.problem_header}>
            <Link href={"/submission"} className={pStyles.arrow}>
              &lt;-
            </Link>
            <h1>Submission ID / Problem Id / User Id</h1>
            <div></div>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Submit Code</h2>
            <textarea readOnly>
              {`1 2\npen apple\npen pineapple\napplepen pineapplepen
                `}
            </textarea>
            <p>Submitted At: 2023/11/14 10:19</p>
            <p>Code Info: Spanish (123 B)</p>
            <p className={pStyles.ac}>Result: AC (Time: 255ms, Mem: 999TB)</p>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
