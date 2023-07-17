import styles from "./Repos.module.css";
import Image from "next/image";

import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import createUser from "@/utils/createUser";
import createRepos from "@/utils/createRepo";

import Dashboard from "@/components/dashboard";
import RepoCard from "@/components/RepoCard";

function Repos() {
  const [repos, setRepos] = useState([]);
  const [shouldRender, setShouldRender] = useState(false);
  const [userData, setUserData] = useState({}); // <- New state to store user data

  const getRepos = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/vnd.github+json",
    };
    if (!accessToken) {
      console.log("no access token found");
    } else if (accessToken) {
      try {
        const response = await fetch(
          "https://api.github.com/user/repos?type=owner",
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        setRepos(data);

        // Fetch user data here
        const responseUser = await fetch("https://api.github.com/user", {
          headers,
        });

        if (!responseUser.ok) {
          throw new Error(`HTTP error! status: ${responseUser.status}`);
        }

        const dataUser = await responseUser.json();
        // console.log(dataUser);
        setUserData(dataUser);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, []);

  const getAccessToken = useCallback(async (code) => {
    const response = await fetch(
      "http://localhost:8080/getAccessToken?code=" + code,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.access_token) {
      localStorage.setItem("accessToken", data.access_token);
      setShouldRender(true);
    }
  }, []);

  // useEffect(() => {
  //   console.log(typeof window);
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const codeParams = urlParams.get("code");
  //   const fetchRepos = async () => {
  //     if (!localStorage.getItem("accessToken")) {
  //       await getAccessToken(codeParams);
  //     }
  //     await getRepos();
  //     setShouldRender(true);
  //   };

  //   const accessToken = localStorage.getItem("accessToken");
  //   let user_res;

  //   fetchRepos().then(() => {
  //     createUser(userData.login, accessToken).then((user) => {
  //       console.log(user); // Handle user data here
  //       user_res = user;
  //     });
  //   });

  //   // CREATE IN DATABASE !!!
  // }, [getAccessToken, getRepos]);

  // useEffect(() => {
  //   const fetchRepos = async () => {
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const codeParams = urlParams.get("code");

  //     if (!localStorage.getItem("accessToken")) {
  //       await getAccessToken(codeParams);
  //     }

  //     const accessToken = localStorage.getItem("accessToken");

  //     await getRepos();
  //     setShouldRender(true);

  //     if (accessToken && userData.login) {
  //       createUser(userData.login, accessToken)
  //         .then((user) => {
  //           console.log(user);
  //         })
  //         .catch((error) => {
  //           console.error("Error creating user:", error);
  //         });
  //     }
  //   };

  //   fetchRepos();
  // }, [getAccessToken, getRepos, userData.login]);

  // First useEffect for getting access token and fetching repos
  useEffect(() => {
    const fetchRepos = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParams = urlParams.get("code");

      if (!localStorage.getItem("accessToken")) {
        await getAccessToken(codeParams);
      }

      await getRepos();
      setShouldRender(true);
    };

    fetchRepos();
  }, [getAccessToken, getRepos]);

  // Second useEffect for creating the user
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken && userData.login) {
      createUser(userData.login, accessToken)
        .then((user) => {
          console.log(user);
          return createRepos(user.user_id, repos); // Call createRepos function with user_id and reposData
        })
        .then((repos) => {
          console.log(repos); // Array of created repos
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [userData.login, repos]); // Include reposData in the dependency list if its value can change in the component

  function DeployHandler(name, cloneUrl, sshUrl, url, permissions) {
    // the function should expect some information about the repo
    console.log("Deploy!");
  }

  return (
    <div className={styles.main}>
      {shouldRender && <Dashboard userData={userData} />}
      {/* Pass userData as props */}
      <div className={styles.page}>
        <div className={styles.table}>
          <div className={styles.header}>
            {/* Header */}
            <h1>
              <Image
                src="/repo.svg"
                alt="Repository Icon"
                width={20}
                height={20}
                className={styles.repoImg}
              />
              Repositories
            </h1>
          </div>
          {/* Table */}
          {repos.map((repo) => (
            <RepoCard
              key={repo.id}
              name={repo.name}
              cloneUrl={repo.clone_url}
              sshUrl={repo.ssh_url}
              deployHandler={DeployHandler}
            />
          ))}
        </div>
      </div>
      <div className={styles.emptySpace}></div>
    </div>
  );
}

export default Repos;
