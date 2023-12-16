import Link from "next/link";
import styles from "../../page.module.css";
import pStyles from "../../problem.module.css";
import uStyles from "../user.module.css";
import Image from "next/image";
import {
  BASE_URL,
  UserInfoInterfase as UserInfoInterface,
  UserStatInfoInterface,
} from "@/global";
import { Fragment } from "react";

export default async function UserInfo({ params: { id } }: any) {
  const { data: userStatData }: { data: UserStatInfoInterface } = await (
    await fetch(`${BASE_URL}/submission_service/user-submission-stats/${id}`, {
      cache: "no-cache",
    })
  ).json();

  const data: UserInfoInterface = await (
    await fetch(`${BASE_URL}/auth/user/${id}`, {
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
          <h1>
            User Info - {data.name} (#{data.id})
          </h1>
          <div className={pStyles.problem_list}></div>
        </div>
      </div>
      <div className={uStyles.userinfo_wrapper}>
        <div className={uStyles.stat_list}>
          <div className={uStyles.stat_list_item}>
            <h2>Solved Problems</h2>
            <p>{userStatData.success_problems.length}</p>
          </div>
          <div className={uStyles.stat_list_item}>
            <h2>Not Solved Problems</h2>
            <p>{userStatData.fail_problems.length}</p>
          </div>
          <div className={uStyles.stat_list_item}>
            <h2>Success Submission</h2>
            <p>{userStatData.success_count}</p>
          </div>
          <div className={uStyles.stat_list_item}>
            <h2>Failed Submission</h2>
            <p>{userStatData.total_count - userStatData.success_count}</p>
          </div>
          <div className={uStyles.stat_list_item}>
            <h2>Success Rate</h2>
            <p>
              {(
                (userStatData.success_count / userStatData.total_count) *
                100
              ).toFixed(2)}
              %
            </p>
          </div>
        </div>
      </div>
      <div className={uStyles.problem_status_list}>
        <div className={uStyles.problem_status}>
          <h2>Solved Problems</h2>
          {userStatData.success_problems.map((item) => (
            <Fragment key={item}>
              <Link href={`/problem/${item}`}>{item}</Link>{" "}
            </Fragment>
          ))}
        </div>
        <div className={uStyles.problem_status}>
          <h2>Not Solved Problems</h2>
          {userStatData.fail_problems.map((item) => (
            <Fragment key={item}>
              <Link href={`/problem/${item}`}>{item}</Link>{" "}
            </Fragment>
          ))}
        </div>
      </div>
    </main>
  );
}
