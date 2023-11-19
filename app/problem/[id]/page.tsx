import Link from "next/link";
import styles from "../../page.module.css";
import pStyles from "../../problem.module.css";
import Image from "next/image";
import { BASE_URL, ProblemDataInterface, fetchGroup } from "@/global";

export default async function Problem({ params: { id } }: any) {
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
        <div className={pStyles.problem_wrapper}>
          <div className={pStyles.problem_header}>
            <Link href={"/problem"} className={pStyles.arrow}>
              &lt;-
            </Link>
            <h1>
              {problemData.title} #{problemData.id}
            </h1>
            <Link href={"/problem/" + id + "/submit"}>Submit</Link>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Description</h2>
            <p>{problemData.content}</p>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Limitation</h2>
            <p>
              시간 제한: {problemData.time_limited}초, 메모리 제한:{" "}
              {problemData.memory_limited}MB
            </p>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Input</h2>
            <p>첫째 줄에 A와 B가 주어진다.</p>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Output</h2>
            <p>첫째 줄에 A+B를 출력한다.</p>
          </div>
          <div className={pStyles.problem_ioblock}>
            <div className={pStyles.problem_chunk}>
              <h2>Input Example</h2>
              <textarea
                readOnly
                value={problemData.testCaseList[0].input}
              ></textarea>
            </div>
            <div className={pStyles.problem_chunk}>
              <h2>Output</h2>
              <textarea
                readOnly
                value={problemData.testCaseList[0].output}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
