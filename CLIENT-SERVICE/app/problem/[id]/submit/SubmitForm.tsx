"use client";

import Link from "next/link";
import pStyles from "../../../problem.module.css";
import { ChangeEvent, useState } from "react";
import { INIT_CODE_LIST, ProblemDataInterface, fetchGroup } from "@/global";
import { useRouter } from "next/navigation";
import { Editor } from "@monaco-editor/react";
import toast from "react-hot-toast";

export default function SubmitForm({
  problemData,
}: {
  problemData: ProblemDataInterface;
}) {
  const router = useRouter();
  const [language, setLanguage] = useState(0);
  const [code, setCode] = useState(INIT_CODE_LIST[language]);
  const onLanguageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const langNum = Number(e.target.value);
    setCode(INIT_CODE_LIST[langNum]);
    setLanguage(langNum);
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
        <Editor
          height="250px"
          theme="vs-dark"
          language={
            language === 0
              ? "cpp"
              : language === 1
              ? "cpp"
              : language === 2
              ? "java"
              : "python"
          }
          onChange={(value) => {
            setCode(value || "");
          }}
          value={code}
          options={
            {
              // readOnly: true,
              // minimap: {
              //   enabled: false,
              // },
              // autoIndent: true,
            }
          }
        />
      </div>
      <div className={pStyles.problem_chunk}>
        <h2>Language</h2>
        <div className={pStyles.submit_language_list}>
          <input
            type="radio"
            name="language"
            value="0"
            checked={language === 0}
            onChange={onLanguageChange}
            id="c"
            readOnly
          />
          <label htmlFor="c">C11</label>
          <input
            type="radio"
            name="language"
            value="1"
            checked={language === 1}
            onChange={onLanguageChange}
            id="cpp"
            readOnly
          />
          <label htmlFor="cpp">C++20</label>
          <input
            type="radio"
            name="language"
            value="2"
            checked={language === 2}
            onChange={onLanguageChange}
            id="java"
            readOnly
          />
          <label htmlFor="java">Java 17</label>
          <input
            type="radio"
            name="language"
            value="3"
            checked={language === 3}
            onChange={onLanguageChange}
            id="python"
            readOnly
          />
          <label htmlFor="python">Python 3.10.9</label>
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
              router.push("/submission/" + data.data.id);
              toast.success("Submit Success");
            } catch {
              toast.error("Please Login");
            }
          }}
        >
          제출
        </button>
      </div>
    </div>
  );
}
