import styles from "./RepoCard.module.css";
import { useState } from "react";
import deployRepo from "../utils/deployRepo";
import checkStatus from "../utils/checkStatus";

function RepoCard({ name, cloneUrl, sshUrl, deployHandler, fullName }) {
  const [disabled, setDisabled] = useState(false);
  const [ip, setIp] = useState("");
  const [status, setStatus] = useState("");

  async function DeployHandler() {
    setStatus("Deploying...");
    // console.log("Name of repo: ", fullName);
    // console.log("Clone URL: ", cloneUrl);
    // console.log("SSH URL: ", sshUrl);
    setDisabled(true);

    const status = await deployRepo(fullName, cloneUrl, sshUrl);
    console.log("DEPLOYING >>>");
    console.log(status);
    deployHandler(fullName, cloneUrl, sshUrl);

    if (status.length !== 0) {
      // console.log("Status FETCHING: ", status[0]);
      const info = await checkStatus(status[0]); // status[0] is the deployment id + ":8080" is the port
      console.log("INFO >>>");
      console.log(info);
      setIp(info[0]);

      setDisabled(false);
      // console.log(disabled);
      setStatus("Deployed");
    } else {
      setStatus("Deployed");
    }
  }
  return (
    <div className={styles.table}>
      <div className={styles.container}>
        <li className={styles.info}>{name}</li>
        <li className={styles.info}>ip: {ip}</li>
        <li className={styles.info}>status: {status}</li>
        <button
          className={styles.button}
          onClick={DeployHandler}
          disabled={disabled}
        >
          Deploy
        </button>
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
