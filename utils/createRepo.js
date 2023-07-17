// user_id
// other info
// list of repos
// http://localhost:8080/api/repos?userID=f34c13ed-cd5a-4f6b-b1d2-db3a522af2f9&repoName=VerySmartGuy&cloneUrl=testCloneUrl&sshUrl=WhatIsSSHha
// for every repo get repoName, cloneUrl, sshUrl
async function createRepos(userID, repos) {
  const results = [];
  const promises = [];

  repos.forEach((repo) => {
    const { name, clone_url, ssh_url } = repo;
    const promise = fetch(
      `http://localhost:8080/api/repos?userID=${userID}&repoName=${name}&cloneUrl=${clone_url}&sshUrl=${ssh_url}`,
      {
        method: "POST",
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    });

    promises.push(promise);
  });

  await Promise.all(promises).then((responses) => {
    responses.forEach((repo) => {
      results.push(repo);
    });
  });

  return results;
}
export default createRepos;

// Usage:
// const userID = 'uuid1';
// const repos = [
//     { name: 'repo1', cloneUrl: 'clone1', sshUrl: 'ssh1' },
//     { name: 'repo2', cloneUrl: 'clone2', sshUrl: 'ssh2' },
//     ...
// ];
// createRepos(userID, repos)
//     .then(res => console.log(res))
//     .catch(e => console.error(e));

// Usage:
// const repos = [
//     { userID: 'uuid1', repoName: 'repo1', cloneUrl: 'clone1', sshUrl: 'ssh1' },
//     { userID: 'uuid2', repoName: 'repo2', cloneUrl: 'clone2', sshUrl: 'ssh2' },
//     ...
// ];
// createRepos(repos)
//     .then(res => console.log(res))
//     .catch(e => console.error(e));
