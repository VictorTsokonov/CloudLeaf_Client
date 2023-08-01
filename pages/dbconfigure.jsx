import { useReducer, useState } from "react";

import styles from "./dbconfigure.module.css";
import Router from "next/router";
import { useUserData } from "@/contexts/UserDataContext";
import deployRepo from "@/utils/deployRepo";

function DbConfigure() {
  const { userData, setUserData } = useUserData(); // <- Use the hook
  const [database, setDatabase] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [selected, setSelected] = useState("");

  const deps = { Databases: ["PostgreSQL", "Redis", "MySQL"] };

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  async function createHandler() {
    // Make sure all necessary fields are filled out
    if (!database || !username || !password || !selected) {
      alert("Please fill out all the fields.");
      return;
    }

    // Create the payload
    const payload = {
      githubname: userData.login,
      databaseName: database,
      username: username,
      password: password,
      type: selected,
    };

    // Send the POST request
    try {
      const response = await fetch("http://localhost:8080/api/createDatabase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Check if the request was successful
      if (response.ok) {
        alert("Database created successfully.");
      } else {
        const errorData = await response.json();
        alert(`Failed to create database: ${errorData.error}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("Failed to create database. Please try again.");
    }
    Router.back();
  }

  function BackHandler() {
    console.log(username, password, database, selected, userData.login);
    Router.back();
  }

  return (
    <div className={styles.configureContainer}>
      <div className={styles.configureContent}>
        {Object.keys(deps).map((category) => (
          <div key={category} className={styles.category}>
            <label className={styles.label}>{category}:</label>
            <div className={styles.dependenciesSubContainer}>
              <div className={styles.gridContainer}>
                {deps[category].map((dependency, index) => (
                  <div key={index} className={styles.dependencyItem}>
                    <label>
                      <input
                        type="radio"
                        className={styles.checkbox}
                        value={dependency}
                        checked={selected === dependency}
                        onChange={handleChange}
                      />
                      {dependency}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {selected && <div>Selected: {selected}</div>}
          </div>
        ))}
        <label className={styles.label}>
          Database:
          <input
            className={styles.input}
            type="text"
            value={database}
            onChange={(e) => setDatabase(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Username:
          <input
            className={styles.input}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Password:
          <input
            className={styles.input}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={BackHandler}>
          Back
        </button>
        <button className={styles.button} onClick={createHandler}>
          Create
        </button>
      </div>
    </div>
  );
}

export default DbConfigure;
