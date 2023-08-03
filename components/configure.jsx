import { useState } from "react";

import styles from "./configure.module.css";

import deployRepo from "@/utils/deployRepo";

function Configure({ fullName, cloneUrl, sshUrl, setConfiguration }) {
  const [port, setPort] = useState("");
  const [selected, setSelected] = useState([]);
  const [variables, setVariables] = useState([]); // Add this line
  const name = fullName.split("/")[1];

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
    // Convert variables array into a map
    const environments = Object.fromEntries(
      variables.map(({ key, value }) => [key, value])
    );

    // Call deployRepo with the new environments map
    deployRepo(fullName, cloneUrl, sshUrl, port, selected, environments);
    setConfiguration({ isConfiguting: false, cloneUrl, sshUrl, fullName });
  }

  // ...

  function BackHandler() {
    console.log(fullName, cloneUrl, sshUrl, port, selected, variables);
    setConfiguration({ isConfiguting: false, cloneUrl, sshUrl, fullName });
  }
  const addVariable = () => {
    setVariables([...variables, { key: "", value: "" }]);
  };

  const handleChangeVariable = (index, field, value) => {
    const newVars = [...variables];
    newVars[index][field] = value;
    setVariables(newVars);
  };

  const deleteVariable = (index) => {
    const newVars = [...variables];
    newVars.splice(index, 1);
    setVariables(newVars);
  };

  return (
    <div className={styles.configureContainer}>
      <div className={styles.configureContent}>
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
        </div>
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
        {/* Add this part for env variables */}
        <div className={styles.category}>
          <label className={styles.label}>Environment Variables:</label>
          <div>
            <button className={styles.buttonEnv} onClick={addVariable}>
              add environment variable
            </button>
            {variables.map((variable, index) => (
              <div className={styles.envDiv} key={index}>
                <div className={styles.inputContainer}>
                  <input
                    className={styles.input}
                    placeholder="Key"
                    value={variable.key}
                    onChange={(e) =>
                      handleChangeVariable(index, "key", e.target.value)
                    }
                  />
                  <input
                    className={styles.input}
                    placeholder="Value"
                    value={variable.value}
                    onChange={(e) =>
                      handleChangeVariable(index, "value", e.target.value)
                    }
                  />
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteVariable(index)}
                  >
                    x
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
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
