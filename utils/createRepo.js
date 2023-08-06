import { API_BASE_URL } from '@/config'
async function createRepos(userID, repos) {
  const results = []
  const promises = []

  repos.forEach((repo) => {
    const { full_name, clone_url, ssh_url } = repo
    const promise = fetch(
      `${API_BASE_URL}/api/repos?userID=${userID}&repoName=${full_name}&cloneUrl=${clone_url}&sshUrl=${ssh_url}&status=Not Deployed`,
      {
        method: 'POST',
      }
    ).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    })

    promises.push(promise)
  })

  await Promise.all(promises).then((responses) => {
    responses.forEach((repo) => {
      results.push(repo)
    })
  })

  return results
}
export default createRepos

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
