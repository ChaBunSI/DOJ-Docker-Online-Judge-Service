import Link from "next/link";
import styles from "../page.module.css";
import pStyles from "../problem.module.css";
import Image from "next/image";
import AddProblemForm from "./AddProblemForm";

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
        <AddProblemForm />
      </div>
      <div></div>
    </main>
  );
}
