import Link from "next/link";
import styles from "../../../page.module.css";
import pStyles from "../../../problem.module.css";
import Image from "next/image";
import { ProblemDataInterface, axiosGroup } from "@/global";
import SubmitForm from "./SubmitForm";

export default async function ProblemSubmission({ params: { id } }: any) {
  const {
    data: problemData,
  }: {
    data: ProblemDataInterface;
  } = await axiosGroup.api.get("/problem_service/problem/" + id);

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
