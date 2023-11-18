import Link from "next/link";
import styles from "../page.module.css";
import pStyles from "../problem.module.css";
import Image from "next/image";
import { ProblemListItemDataInterface, axiosGroup } from "@/global";

export default async function Problems() {
  const {
    data: problemData,
  }: {
    data: ProblemListItemDataInterface[];
  } = await axiosGroup.default.get("/problem_service/problem/all");
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
                  {item.title} #{item.id}
                </h2>
                <p>Problem Description</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
