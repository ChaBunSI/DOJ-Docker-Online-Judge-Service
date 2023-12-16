import Link from "next/link";
import styles from "../page.module.css";
import pStyles from "../problem.module.css";
import uStyles from "./user.module.css";
import Image from "next/image";
import { BASE_URL, UserInfoInterfase } from "@/global";

export default async function UserInfo() {
  const data: UserInfoInterfase[] = await (
    await fetch(`${BASE_URL}/auth/user`, {
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
          <h1>User Info</h1>
          <div className={pStyles.problem_list}>
            {data.map((item) => (
              <Link
                className={pStyles.problem_block}
                key={item.id}
                href={`/userInfo/${item.id}`}
              >
                <h2>
                  {item.name} (#{item.id})
                </h2>
                <p>email: {item.email}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
