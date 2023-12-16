"use client";

import Link from "next/link";
import styles from "../../page.module.css";
import pStyles from "../../problem.module.css";
import Image from "next/image";
import {
  BASE_URL,
  RealTimeInfoInterface,
  SubmitDataInterface,
  getLanguage,
  getSubmitResult,
} from "@/global";
import ViewEditor from "./ViewEditor";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Submission({ params: { id } }: any) {
  const [loading, setLoading] = useState(true);
  const [submitData, setSubmitData] = useState<
    SubmitDataInterface | undefined
  >();
  const socket = useRef<Socket>();

  useEffect(() => {
    (async () => {
      const { data: submitData }: { data: SubmitDataInterface } = await (
        await fetch(`${BASE_URL}/submission_service/submit_detail/${id}`, {
          cache: "no-cache",
        })
      ).json();
      setLoading(false);
      setSubmitData(submitData);

      if (submitData.judge_status !== 0) {
        return;
      }

      const waitingList = [submitData.id];

      socket.current = io("wss://api.goodpose.shop", {
        path: "/rt_service/socket.io",
      });
      // socket.current = io("ws://localhost:5000", {
      //   path: "/socket.io",
      // });

      socket.current.on("connect", () => {
        socket.current?.emit("requestSubmitList", waitingList);
      });

      socket.current.on("newInfo", (data: RealTimeInfoInterface) => {
        setSubmitData((prev) => {
          if (prev) {
            const newSubmitData: SubmitDataInterface = { ...prev };
            if (data.mem_used) {
              newSubmitData.time_used = data.time_used;
              newSubmitData.memory_used = data.mem_used;
              newSubmitData.tc_cur = 0;
              newSubmitData.tc_total = 0;
              newSubmitData.judge_status = 1;
              newSubmitData.judge_description = "Accepted";

              return newSubmitData;
            }

            if (data.result === 1) {
              newSubmitData.tc_cur = data.tc_cur;
              newSubmitData.tc_total = data.tc_total;
            } else {
              newSubmitData.tc_cur = 0;
              newSubmitData.tc_total = 0;
              newSubmitData.judge_status = data.result;
              newSubmitData.judge_description = "Wrong Answer";
            }
            return newSubmitData;
          }

          return prev;
        });
      });

      return () => {
        socket.current?.disconnect();
      };
    })();
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
          {loading && <p>Loading...</p>}
          {submitData !== undefined && (
            <>
              <div className={pStyles.problem_header}>
                <Link href={"/submission"} className={pStyles.arrow}>
                  &lt;-
                </Link>
                <h1>
                  Submission #{submitData.id}&nbsp;
                  <Link href={`/problem/${submitData.problem_id}`}>
                    (Problem #{submitData.problem_id})
                  </Link>
                </h1>
                <div></div>
              </div>
              <div className={pStyles.problem_chunk}>
                <h2>Submit Code</h2>
                <ViewEditor submitData={submitData} />
                <p>
                  Submitted At:{" "}
                  {new Date(submitData.created_time).toLocaleString()}
                </p>
                <p>Program Language: {getLanguage(submitData.language_code)}</p>
                <p
                  className={
                    submitData.judge_status === 0
                      ? ""
                      : submitData.judge_status === 1
                      ? pStyles.ac
                      : pStyles.wa
                  }
                >
                  Result:{" "}
                  {submitData.tc_cur
                    ? `Judging... (${(
                        (submitData.tc_cur / submitData.tc_total) *
                        100
                      ).toFixed(0)}%)`
                    : `${getSubmitResult(submitData.judge_status)}`}
                  {submitData.judge_status === 1 &&
                    ` ( Time: ${submitData.time_used} ms, Mem: ${submitData.memory_used} KB )`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <div></div>
    </main>
  );
}
