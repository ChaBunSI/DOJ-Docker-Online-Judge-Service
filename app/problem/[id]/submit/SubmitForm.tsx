"use client";

import Link from "next/link";
import pStyles from "../../../problem.module.css";
import { ChangeEvent, useState } from "react";
import { useTextArea } from "@/hook/useTextArea";
import { ProblemDataInterface, fetchGroup } from "@/global";
import { useRouter } from "next/navigation";

export default function SubmitForm({
  problemData,
}: {
  problemData: ProblemDataInterface;
}) {
  const router = useRouter();
  const [code, onCodeChange] = useTextArea("");
  const [language, setLanguage] = useState(0);
  const onLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLanguage(Number(e.target.value));
  };

  return (
    <div className={pStyles.problem_wrapper}>
      <div className={pStyles.problem_header}>
        <Link href={"/problem/" + problemData.id} className={pStyles.arrow}>
          &lt;-
        </Link>
        <h1>
          Submit - {problemData.title} #{problemData.id}
        </h1>
        <div></div>
      </div>
      <div className={pStyles.problem_chunk}>
        <h2>Submit Code</h2>
        <textarea
          placeholder="Write Down Your Code"
          onChange={onCodeChange}
        ></textarea>
      </div>
      <div className={pStyles.problem_chunk}>
        <h2>Language</h2>
        <div className={pStyles.problem_ioblock}>
          <input
            type="radio"
            name="language"
            value="0"
            checked={language === 0}
            onChange={onLanguageChange}
            id="c"
            readOnly
          />
          <label htmlFor="c">C</label>
          <input
            type="radio"
            name="language"
            value="1"
            checked={language === 1}
            onChange={onLanguageChange}
            id="cpp"
            readOnly
          />
          <label htmlFor="cpp">C++</label>
          <input
            type="radio"
            name="language"
            value="2"
            checked={language === 2}
            onChange={onLanguageChange}
            id="java"
            readOnly
          />
          <label htmlFor="java">Java</label>
          <input
            type="radio"
            name="language"
            value="3"
            checked={language === 3}
            onChange={onLanguageChange}
            id="python"
            readOnly
          />
          <label htmlFor="python">Python</label>
        </div>
        <button
          className={pStyles.submit_button}
          onClick={async () => {
            try {
              const { data } = await fetchGroup.api.post(
                "/submission_service/submit/" + problemData.id,
                {
                  language,
                  source: code,
                }
              );
              alert("제출 성공");

              router.push("/submission/" + data.data.id);
            } catch {
              alert("제출 실패");
            }
          }}
        >
          제출
        </button>
      </div>
    </div>
  );
}
