"use client";

import Link from "next/link";
import styles from "../../../page.module.css";
import pStyles from "../../../problem.module.css";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Problem() {
  const { id } = useParams();
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
            <Link href={"/problem/" + id} className={pStyles.arrow}>
              &lt;-
            </Link>
            <h1>Submit For Problem Name</h1>
            <div></div>
          </div>
          <div className={pStyles.problem_chunk}>
            <h2>Submit Code</h2>
            <textarea placeholder="Write Down Your Code"></textarea>
          </div>
          {/* make radio button for language selection */}
          <div className={pStyles.problem_chunk}>
            <h2>Language</h2>
            <div className={pStyles.problem_ioblock}>
              <input
                type="radio"
                name="language"
                value="spanish"
                checked
                readOnly
              />
              <label>Spanish</label>
              <input type="radio" name="language" value="cpp" readOnly />
              <label>C++</label>
              <input type="radio" name="language" value="java" readOnly />
              <label>Java</label>
              <input type="radio" name="language" value="python" readOnly />
              <label>Python</label>
            </div>
            <button className={pStyles.submit_button}>제출</button>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
