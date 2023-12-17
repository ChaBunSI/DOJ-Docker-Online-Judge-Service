import Link from "next/link";
import styles from "../../page.module.css";
import pStyles from "../../problem.module.css";
import Image from "next/image";
import { BASE_URL, ProblemDataInterface } from "@/global";
import LatexRenderer from "@/app/LatexRenderer";

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
            <h2>Stats</h2>
            <p>
              Correct: {problemData.solve_num}, Wrong: {problemData.wrong_num},
              Correction Rate:{" "}
              {problemData.solve_num + problemData.wrong_num == 0
                ? "0"
                : (
                    (problemData.solve_num * 100) /
                    (problemData.solve_num + problemData.wrong_num)
                  ).toFixed(0)}
              %
            </p>
            <h2>Description</h2>
            <p>
              <LatexRenderer>{problemData.content}</LatexRenderer>
            </p>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Limitation</h2>
            <p>
              시간 제한: {problemData.time_limited}ms, 메모리 제한:{" "}
              {problemData.memory_limited}MB
            </p>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Input</h2>
            <p>
              <LatexRenderer>{problemData.input_description}</LatexRenderer>
            </p>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Output</h2>
            <p>
              <LatexRenderer>{problemData.output_description}</LatexRenderer>
            </p>
          </div>
          <div className={pStyles.problem_ioblock}>
            <div className={pStyles.problem_chunk}>
              <h2>Input Example</h2>
              <textarea readOnly value={problemData.testCaseList[0].input} />
            </div>
            <div className={pStyles.problem_chunk}>
              <h2>Output Example</h2>
              <textarea readOnly value={problemData.testCaseList[0].output} />
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
