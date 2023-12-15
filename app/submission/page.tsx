"use client";

import Link from "next/link";
import styles from "../page.module.css";
import pStyles from "../problem.module.css";
import Image from "next/image";
import {
  BASE_URL,
  RealTimeInfoInterface,
  SubmitDataInterface,
  getLanguage,
} from "@/global";
import { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";

export default function Submission() {
  const [loading, setLoading] = useState(true);
  const [submitData, setSubmitData] = useState<SubmitDataInterface[]>([]);
  const socket = useRef<Socket>();

  useEffect(() => {
    (async () => {
      const { data }: { data: SubmitDataInterface[] } = await (
        await fetch(`${BASE_URL}/submission_service/submissions?target=all`, {
          cache: "no-cache",
        })
      ).json();
      setLoading(false);
      setSubmitData(data);
      const waitingList = data
        .filter((item) => {
          return item.judge_status === 0;
        })
        .map((i) => i.id);

      socket.current = io("wss://api.goodpose.shop", {
        path: "/rt_service/socket.io",
      });

      socket.current.on("connect", () => {
        socket.current?.emit("requestSubmitList", waitingList);
      });

      socket.current.on("newInfo", (data: RealTimeInfoInterface) => {
        setSubmitData((prev) => {
          const newSubmitData = [...prev];

          const index = newSubmitData.findIndex((item) => item.id === data.id);

          if (data.time_used && data.memory_used) {
            newSubmitData[index].time_used = data.time_used;
            newSubmitData[index].memory_used = data.memory_used;
            newSubmitData[index].tc_cur = 0;
            newSubmitData[index].tc_total = 0;
            newSubmitData[index].judge_status = 1;
            newSubmitData[index].judge_description = "Accepted";

            return newSubmitData;
          }

          if (data.result === 1) {
            newSubmitData[index].tc_cur = data.tc_cur;
            newSubmitData[index].tc_total = data.tc_total;
          } else {
            newSubmitData[index].tc_cur = 0;
            newSubmitData[index].tc_total = 0;
            newSubmitData[index].judge_status = data.result;
            newSubmitData[index].judge_description = "Wrong Answer";
          }

          return newSubmitData;
        });
      });
    })();

    return () => {
      socket.current?.disconnect();
    };
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
          <h1>Submissions</h1>
          <div className={pStyles.problem_list}>
            {loading && <p>Loading...</p>}
            {submitData.map((item) => (
              <Link
                href={"/submission/" + item.id}
                key={item.id}
                className={pStyles.problem_block}
              >
                <h2>
                  Submission #{item.id} (Problem #{item.problem_id})
                </h2>
                <p>
                  Submitted At: {new Date(item.created_time).toLocaleString()}
                </p>
                <p>Program Language: {getLanguage(item.language_code)}</p>
                <p
                  className={
                    item.judge_status === 0
                      ? ""
                      : item.judge_status === 1
                      ? pStyles.ac
                      : pStyles.wa
                  }
                >
                  Result:{" "}
                  {item.tc_cur
                    ? `Judging... (${(
                        (item.tc_cur / item.tc_total) *
                        100
                      ).toFixed(0)}%)`
                    : `${item.judge_description}`}
                  {item.judge_status === 1 &&
                    ` ( Time: ${item.time_used} ms, Mem: ${item.memory_used} KB )`}
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
