import Link from "next/link";
import styles from "../page.module.css";
import pStyles from "../problem.module.css";
import Image from "next/image";
import { BASE_URL, ProblemListItemDataInterface } from "@/global";
import LatexRenderer from "../LatexRenderer";

export default async function Problems() {
  const problemData: ProblemListItemDataInterface[] = await (
    await fetch(`${BASE_URL}/problem_service/problem/all`, {
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
          <h1>Problems</h1>
          <div className={pStyles.problem_list}>
            {problemData.map((item) => (
              <Link
                href={"/problem/" + item.id}
                key={item.id}
                className={pStyles.problem_block}
              >
                <h2>
                  {item.title} #{item.id} (Correction Rate:{" "}
                  {item.solve_num + item.wrong_num == 0
                    ? "0"
                    : (
                        (item.solve_num * 100) /
                        (item.solve_num + item.wrong_num)
                      ).toFixed(0)}
                  %)
                </h2>
                <style>
                  {`p.show{white-space: nowrap; overflow: hidden;
                  text-overflow: ellipsis;}`}
                </style>
                <p className="show">
                  <LatexRenderer>{item.content}</LatexRenderer>
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
