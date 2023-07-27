import { useState } from "react";
import { useRouter } from "next/router";

import styles from "./configure.module.css";

const Configure = () => {
  const router = useRouter();
  const { fullName, cloneUrl, sshUrl } = router.query;
  const [port, setPort] = useState("");
  const [language, setLanguage] = useState("");

  const handleDeploy = async () => {
    // Send the POST request to your backend API
    const response = await fetch(`http://localhost:8080/api/deploy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullName, cloneUrl, sshUrl, port, language }),
    });

    if (response.ok) {
      // If the request was successful, redirect back to /repos
      router.push("/repos");
    } else {
      // Handle error
    }
  };

  return (
    <div>
      <h1 className={styles.header}>Configure your application</h1>
      <label>
        Port:
        <input
          type="number"
          value={port}
          onChange={(e) => setPort(e.target.value)}
        />
      </label>
      <label>
        Language/Framework:
        <input
          type="text"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </label>
      <button onClick={handleDeploy}>Deploy</button>
    </div>
  );
};

export default Configure;
