import styles from "./RepoCard.module.css";
import { useEffect, useState } from "react";
import deployRepo from "../utils/deployRepo";
import checkStatus from "../utils/checkStatus";
import Link from "next/link";

function RepoCard({
  cloneUrl,
  sshUrl,
  deployHandler,
  fullName,
  repoStatus,
  repoIp,
}) {
  const [disabled, setDisabled] = useState(false);
  const [ip, setIp] = useState(repoIp);
  const [id, setId] = useState();
  const [status, setStatus] = useState(repoStatus);

  const name = fullName.split("/")[1];

  async function DeployHandler() {
    setStatus("Deploying...");
    setDisabled(true);
    await fetch(
      `http://localhost:8080/api/repos/status?repoName=${fullName}&status=Deploying...`,
      {
        method: "PUT",
      }
    );

    const info = await deployRepo(fullName, cloneUrl, sshUrl);
    console.log("DEPLOYING >>>");
    console.log(info);

    if (info.length !== 0) {
      console.log("INFO >>>");
      console.log(info);
      setIp(info[0]);
      setId(info[1]);
      console.log(info);
      // await fetch(
      //   `http://localhost:8080/api/repos/ipaddress?repoName=${fullName}&ipAddress=${info[0]}`,
      //   {
      //     method: "PUT",
      //   }
      // );

      setStatus("Deployed");
      // await fetch(
      //   `http://localhost:8080/api/repos/status?repoName=${fullName}&status=Deployed`,
      //   {
      //     method: "PUT",
      //   }
      // );
      setDisabled(false);
    } else {
      setStatus("Deployed");
      // await fetch(
      //   `http://localhost:8080/api/repos/status?repoName=${fullName}&status=Deployed`,
      //   {
      //     method: "PUT",
      //   }
      // );
      console.log("SOMETHING WRONG HAPPENED");
    }
    setDisabled(false);
  }

  async function terminateHandler() {
    console.log("TERMINATE");
    await fetch(`http://localhost:8080/api/deploy/${ip}`, {
      method: "DELETE",
    });
    setIp("");
    setId("");
    setStatus("Terminated");
  }

  return (
    <div className={styles.table}>
      <div className={styles.container}>
        <li className={styles.info}>{name}</li>
        <li className={styles.info}>
          ip: <Link href={`http://${ip}`}>{ip}</Link>
        </li>
        <li className={styles.info}>status: {status}</li>
        {status === "Deployed" ? (
          <button
            className={styles.buttonTer}
            onClick={terminateHandler}
            disabled={disabled}
          >
            Terminate
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={DeployHandler}
            disabled={disabled}
          >
            Deploy
          </button>
        )}
      </div>
    </div>
  );
}

export default RepoCard;
// key={repo.id}
//               name={repo.name}
//               cloneUrl={repo.clone_url}
//               sshUrl={repo.ssh_url}
//               url={repo.url}
//               permissions={repo.permissions}
//               deployHandler={DeployHandler}
