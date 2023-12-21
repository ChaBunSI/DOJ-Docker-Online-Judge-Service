import Link from "next/link";
import styles from "../../../page.module.css";
import pStyles from "../../../problem.module.css";
import Image from "next/image";
import { BASE_URL, ProblemDataInterface, fetchGroup } from "@/global";
import SubmitForm from "./SubmitForm";

export default async function ProblemSubmission({ params: { id } }: any) {
  const problemData: ProblemDataInterface = await (
    await fetch(`${BASE_URL}/problem_service/problem/${id}`, {
      cache: "no-cache",
    })
  ).json();

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
        <SubmitForm problemData={problemData} />
      </div>
    </main>
  );
}
