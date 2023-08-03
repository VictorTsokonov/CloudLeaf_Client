import React, { useState } from "react";
import styles from "./envForm.module.css"; // Change this to your actual path

function EnvVariablesForm({ onSave }) {
  const [variables, setVariables] = useState([]);

  const handleSave = () => {
    console.log(variables);
    // onSave(variables);
  };

  const addVariable = () => {
    setVariables([...variables, { key: "", value: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newVars = [...variables];
    newVars[index][field] = value;
    setVariables(newVars);
  };

  return (
    <div className={styles.configureContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={addVariable}>
          Create env var
        </button>
        <button className={styles.button} onClick={handleSave}>
          Save
        </button>
      </div>
      <div className={styles.configureContent}>
        {variables.map((variable, index) => (
          <div key={index} className={styles.variableContainer}>
            <input
              className={styles.input}
              placeholder="Key"
              value={variable.key}
              onChange={(e) => handleChange(index, "key", e.target.value)}
            />
            <input
              className={styles.input}
              placeholder="Value"
              value={variable.value}
              onChange={(e) => handleChange(index, "value", e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EnvVariablesForm;
