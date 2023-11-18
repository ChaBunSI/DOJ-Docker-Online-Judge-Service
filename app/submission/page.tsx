import Link from "next/link";
import styles from "../page.module.css";
import pStyles from "../problem.module.css";
import Image from "next/image";
import { SubmitDataInterface, axiosGroup, getLanguage } from "@/global";

export default async function Submission() {
  const {
    data: { data: submitDataList },
  }: {
    data: { data: SubmitDataInterface[] };
  } = await axiosGroup.default.get(
    "/submission_service/submissions?target=all"
  );
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
            {submitDataList.map((item) => (
              <Link
                href={"/submission/" + item.id}
                key={item.id}
                className={pStyles.problem_block}
              >
                <h2>
                  Submission #{item.id} (Problem #{item.problem_id})
                </h2>
                <p>
                  Submitted At: {new Date(item.created_time).toLocaleString()}
                </p>
                <p>Program Language: {getLanguage(item.language_code)}</p>
                <p
                  className={
                    item.judge_status === 0
                      ? ""
                      : item.judge_status === 1
                      ? pStyles.ac
                      : pStyles.wa
                  }
                >
                  Result: {item.judge_description}{" "}
                  {item.judge_status === 1 && `(Time: 255ms, Mem: 999TB)`}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
