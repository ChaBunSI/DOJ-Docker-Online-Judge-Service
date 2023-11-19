import Link from "next/link";
import styles from "../page.module.css";
import pStyles from "../problem.module.css";
import Image from "next/image";
import { SubmitDataInterface, getLanguage } from "@/global";

export default async function AddProblem() {
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
          <div className={pStyles.problem_list}></div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
