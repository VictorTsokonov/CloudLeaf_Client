import styles from "./RepoCard.module.css";

function RepoCard({ name, cloneUrl, sshUrl, deployHandler, fullName }) {
  function DeployHandler() {
    console.log("Name of repo: ", fullName);
    console.log("Clone URL: ", cloneUrl);
    console.log("SSH URL: ", sshUrl);
    deployHandler(fullName, cloneUrl, sshUrl);
  }
  return (
    <div className={styles.table}>
      <div className={styles.container}>
        <li className={styles.info}>{name}</li>
        <li className={styles.info}>ip: </li>
        <li className={styles.info}>status</li>
        <button className={styles.button} onClick={DeployHandler}>
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
