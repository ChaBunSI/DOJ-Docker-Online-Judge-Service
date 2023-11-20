"use client";

import pStyles from "../problem.module.css";
import { useTextArea } from "@/hook/useTextArea";
import { fetchGroup } from "@/global";
import { useRouter } from "next/navigation";
import { useInput } from "@/hook/useInput";

export default function AddProblemForm() {
  const router = useRouter();
  const [title, onTitleChange] = useInput("");
  const [description, onDescriptionChange] = useTextArea("");
  const [inputDescription, onInputDescriptionChange] = useTextArea("");
  const [outputDescription, onOutputDescriptionChange] = useTextArea("");
  const [timeLimit, onTimeLimitChange] = useInput("");
  const [memoryLimit, onMemoryLimitChange] = useInput("");
  const [testCaseJson, onTestCaseJsonChange] = useTextArea("");

  return (
    <div className={pStyles.problem_wrapper}>
      <div className={pStyles.problem_header}>
        <div></div>
        <h1>Add Problem</h1>
        <div></div>
      </div>
      <div className={pStyles.problem_chunk}>
        <h2>Title</h2>
        <input
          placeholder="Write Problem Title"
          onChange={onTitleChange}
        ></input>
      </div>
      <div className={pStyles.problem_chunk}>
        <h2>Description</h2>
        <textarea
          placeholder="Write Problem Description"
          onChange={onDescriptionChange}
        ></textarea>
      </div>
      <div className={pStyles.problem_ioblock}>
        <div className={pStyles.problem_chunk}>
          <h2>Input Description</h2>
          <textarea
            placeholder="Write Problem Input Description"
            onChange={onInputDescriptionChange}
          ></textarea>
        </div>
        <div className={pStyles.problem_chunk}>
          <h2>Output Description</h2>
          <textarea
            placeholder="Write Problem Output Description"
            onChange={onOutputDescriptionChange}
          ></textarea>
        </div>
      </div>
      <div className={pStyles.problem_ioblock}>
        <div className={pStyles.problem_chunk}>
          <h2>Time Limit (ms)</h2>
          <input
            placeholder="Write Problem Time Limit"
            onChange={onTimeLimitChange}
          ></input>
        </div>
        <div className={pStyles.problem_chunk}>
          <h2>Memory Limit (MB)</h2>
          <input
            placeholder="Write Problem Memory Limit"
            onChange={onMemoryLimitChange}
          ></input>
        </div>
      </div>
      <div className={pStyles.problem_chunk}>
        <h2>Test Cases (JSON)</h2>
        <textarea
          placeholder="Write Problem Test Cases"
          onChange={onTestCaseJsonChange}
        ></textarea>
      </div>
      <button
        className={pStyles.submit_button}
        onClick={async () => {
          if (
            title === "" ||
            description === "" ||
            inputDescription === "" ||
            outputDescription === "" ||
            testCaseJson === ""
          ) {
            alert("Please fill all the fields");
            return;
          }
          if (Number.isNaN(timeLimit) || Number.isNaN(memoryLimit)) {
            alert("Please fill time and memory limit with numbers");
            return;
          }
          try {
            const testCaseList: { input: string; output: string }[] =
              JSON.parse(testCaseJson);
            if (testCaseList.length === 0) {
              throw new Error("Please fill at least one test case");
            }
            testCaseList.forEach((testCase) => {
              if (!testCase.input || !testCase.output) {
                throw new Error("Please fill test case with JSON format");
              }
            });
          } catch (e) {
            alert("Please fill test case with JSON format");
            return;
          }

          try {
            const { data } = await fetchGroup.api.post(
              "/problem_service/problem",
              {
                title,
                content: description,
                input_description: inputDescription,
                output_description: outputDescription,
                time_limited: Number(timeLimit),
                memory_limited: Number(memoryLimit),
                testCaseBodyList: JSON.parse(testCaseJson),
              }
            );

            alert("Add Problem Success");
            router.push("/problem/" + data.id);
          } catch (e) {
            alert("Please sign in first.");
            return;
          }
        }}
      >
        Add Problem
      </button>
    </div>
  );
}
