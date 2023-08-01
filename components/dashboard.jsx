import styles from "./dashboard.module.css";
import Image from "next/image";

import { useRouter } from "next/router";
import Link from "next/link";

function Dashboard({ userData }) {
  // <- Accept userData as props
  const router = useRouter();

  function LogoutHandler() {
    localStorage.removeItem("accessToken");
    router.push("/login");
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.user}>
        {userData.avatar_url ? (
          <Image
            src={userData.avatar_url}
            alt="User Name"
            width={2000}
            height={2000}
            className={styles.userImage}
            priority
          />
        ) : null}
        <h2 className={styles.userName}>{userData.login}</h2>
      </div>
      <nav className={styles.nav}>
        <Link className={styles.navLink} href="/dbconfigure">
          Create Database
        </Link>
        <Link className={styles.navLink} href="/databases">
          Databases
        </Link>
        <Link className={styles.navLink} href="/repos">
          Repositories
        </Link>
        <a className={styles.navLink} href="/info">
          Info
        </a>
      </nav>
      <button className={styles.logoutButton} onClick={LogoutHandler}>
        Log out
      </button>
    </div>
  );
}

export default Dashboard;
