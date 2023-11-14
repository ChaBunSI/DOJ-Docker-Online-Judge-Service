import Link from "next/link";
import styles from "../../page.module.css";
import pStyles from "../../problem.module.css";
import Image from "next/image";
import { useEffect } from "react";

export default function Problem() {
  useEffect(() => {
    console.log("hello");
  }, []);
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
            <h1>Problem Name</h1>
            <Link href={"/submission"}>Submit</Link>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Description</h2>
            <p>
              두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을
              작성하시오.
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
              <textarea readOnly>
                {`1 2\npen apple\npen pineapple\napplepen pineapplepen
                `}
              </textarea>
            </div>
            <div className={pStyles.problem_chunk}>
              <h2>Output</h2>
              <textarea readOnly>
                {`3\napplepen\npineapplepen\npenpineappleapplepen`}
              </textarea>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
