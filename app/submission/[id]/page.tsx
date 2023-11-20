import Link from "next/link";
import styles from "../../page.module.css";
import pStyles from "../../problem.module.css";
import Image from "next/image";
import { BASE_URL, SubmitDataInterface, getLanguage } from "@/global";

export default async function Submission({ params: { id } }: any) {
  const { data: submitData }: { data: SubmitDataInterface } = await (
    await fetch(`${BASE_URL}/submission_service/submit_detail/${id}`, {
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
        <div className={pStyles.problem_wrapper}>
          <div className={pStyles.problem_header}>
            <Link href={"/submission"} className={pStyles.arrow}>
              &lt;-
            </Link>
            <h1>
              Submission #{submitData.id}&nbsp;
              <Link href={`/problem/${submitData.problem_id}`}>
                (Problem #{submitData.problem_id})
              </Link>
            </h1>
            <div></div>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Submit Code</h2>
            <textarea readOnly value={submitData.source}></textarea>
            <p>
              Submitted At: {new Date(submitData.created_time).toLocaleString()}
            </p>
            <p>Program Language: {getLanguage(submitData.language_code)}</p>
            <p
              className={
                submitData.judge_status === 0
                  ? ""
                  : submitData.judge_status === 1
                  ? pStyles.ac
                  : pStyles.wa
              }
            >
              Result: {submitData.judge_description}{" "}
              {submitData.judge_status === 1 && `(Time: 255ms, Mem: 999TB)`}
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
