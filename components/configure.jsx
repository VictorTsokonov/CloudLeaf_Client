import { useState } from "react";

import styles from "./configure.module.css";

import deployRepo from "@/utils/deployRepo";

function Configure({ fullName, cloneUrl, sshUrl, onDeploy, setConfiguration }) {
  const [port, setPort] = useState("");
  const [selected, setSelected] = useState([]);
  const name = fullName.split("/")[1];
  const handleDeploy = () => {
    onDeploy({ fullName, cloneUrl, sshUrl, port, dependencies: selected });
  };

  const dependencies = {
    languages: [
      "Java",
      //  "C++",
      //   "JavaScript",
      //   "Python",
      //    "Ruby",
      //     "Go",
      //      "PHP"
    ],
    packageManagers: [
      "npm",
      // "Yarn",
      // "pip",
      // "Maven",
      // "Gradle",
      // "RubyGems",
      // "Bundler",
    ],
    // frameworks: [
    //   "Node.js",
    //   "React",
    //   "Next.js",
    //   "Spring",
    //   "Express",
    //   "Django",
    //   "Flask",
    // ],
    // databases: [
    //   "MySQL",
    //   "PostgreSQL",
    //   "SQLite",
    //   "MongoDB",
    //   "Cassandra",
    //   "Redis",
    // ],
    // webServers: ["Apache", "Nginx", "IIS"],
    // otherTools: ["Docker", "Kubernetes", "Jenkins"],
  };

  const deps = { dependencies: ["java", "npm"] };

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelected([...selected, e.target.value]);
    } else {
      setSelected(selected.filter((item) => item !== e.target.value));
    }
  };

  async function DeployHandler() {
    fetch(
      `http://localhost:8080/api/repos/status?repoName=${fullName}&status=Deploying...`,
      {
        method: "PUT",
      }
    );
    deployRepo(fullName, cloneUrl, sshUrl, port, selected);
    setConfiguration({ isConfiguting: false, cloneUrl, sshUrl, fullName });
  }

  function BackHandler() {
    console.log(fullName, cloneUrl, sshUrl, port, selected);
    setConfiguration({ isConfiguting: false, cloneUrl, sshUrl, fullName });
  }

  return (
    <div className={styles.configureContainer}>
      <div className={styles.configureContent}>
        <h1 className={styles.header}>Configure {name}</h1>
        <label className={styles.label}>
          Port:
          <input
            className={styles.input}
            type="text"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </label>
        {Object.keys(deps).map((category) => (
          <div key={category} className={styles.category}>
            <label className={styles.label}>{category}:</label>
            <div className={styles.dependenciesSubContainer}>
              <div className={styles.gridContainer}>
                {deps[category].map((dependency, index) => (
                  <div key={index} className={styles.dependencyItem}>
                    <label>
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        value={dependency}
                        onChange={handleChange}
                      />
                      {dependency}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={BackHandler}>
          Back
        </button>
        <button className={styles.button} onClick={DeployHandler}>
          Deploy
        </button>
      </div>
    </div>
  );
}

export default Configure;
