import styles from "./databaseCard.module.css";
import deleteRDSDatabase from "@/utils/deleteRDSDatabase";

function DatabaseCard({
  databaseName,
  connectionUrl,
  username,
  port,
  githubName,
}) {
  return (
    <div className={styles.table}>
      <div className={styles.container}>
        <li className={styles.info}>
          <div>
            <h4 className={styles.params}>Database Name:</h4>{" "}
            <span className={styles.info}>{databaseName}</span>
          </div>
          <div>
            <h4 className={styles.params}>Connection URL:</h4>{" "}
            <span className={styles.info}>{connectionUrl}</span>
          </div>
          <div>
            <h4 className={styles.params}>Username:</h4>{" "}
            <span className={styles.info}>{username}</span>
          </div>
          <div>
            <h4 className={styles.params}>Port:</h4>{" "}
            <span className={styles.info}>{port}</span>
          </div>
        </li>
        <button
          className={styles.deleteButton}
          onClick={() => {
            deleteRDSDatabase(githubName, databaseName);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default DatabaseCard;
