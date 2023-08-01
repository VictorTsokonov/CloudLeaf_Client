import styles from "./databaseCard.module.css";
import { useEffect, useState } from "react";
import deployRepo from "../utils/deployRepo";
import checkStatus from "../utils/checkStatus";
import Link from "next/link";

function DatabaseCard({
  cloneUrl,
  sshUrl,
  fullName,
  repoStatus,
  repoIp,
  setConfiguration,
}) {
  const [disabled, setDisabled] = useState(false);
  const [ip, setIp] = useState(repoIp);
  const [status, setStatus] = useState(repoStatus);
  const name = fullName.split("/")[1];

  async function terminateHandler() {
    console.log("TERMINATE");
    await fetch(`http://localhost:8080/api/deploy/${ip}`, {
      method: "DELETE",
    });
    setIp("");
    setStatus("Terminated");
    setDisabled(false);
  }

  function ConfigurationHandler() {
    setConfiguration({
      isConfiguring: true,
      cloneUrl: cloneUrl,
      sshUrl: sshUrl,
      fullName: fullName,
    });
    setDisabled(true);
  }

  return (
    <div className={styles.table}>
      <div className={styles.container}>
        <li className={styles.info}>{name}</li>
        {status === "Deployed" ? (
          <button className={styles.buttonTer} onClick={terminateHandler}>
            Remove Database
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={ConfigurationHandler}
            disabled={status === "Deploying..."}
          >
            Add Database
          </button>
        )}
      </div>
    </div>
  );
}

export default DatabaseCard;
