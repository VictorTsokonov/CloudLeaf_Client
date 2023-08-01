import React, { createContext, useState, useContext } from "react";

// This creates a new context. Context provides a way to pass data through
// the component tree without having to pass props down manually at every level.
const RepoContext = createContext();

// This is a React component that takes children as a prop. It provides the repos
// state and the setRepos function to any component it wraps.
export function RepoProvider({ children }) {
  const [repos, setRepos] = useState([]);
  const value = { repos, setRepos };

  return <RepoContext.Provider value={value}>{children}</RepoContext.Provider>;
}

// Custom hook that shorthands the process of calling useContext to consume our RepoContext
export function useRepoContext() {
  const context = useContext(RepoContext);
  if (context === undefined) {
    throw new Error("useRepoContext must be used within a RepoProvider");
  }
  return context;
}
