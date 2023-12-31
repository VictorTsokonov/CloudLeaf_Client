import styles from './Repos.module.css'
import Image from 'next/image'
import { API_BASE_URL } from '@/config'
import { useCallback, useEffect, useState } from 'react'
import createUser from '@/utils/createUser'
import createRepos from '@/utils/createRepo'
import Configure from '@/components/configure'
import { useRepoContext } from '@/contexts/RepoContext'
import { useUserData } from '@/contexts/UserDataContext'
import Dashboard from '@/components/dashboard'
import RepoCard from '@/components/RepoCard'

function Repos() {
  const { userData, setUserData } = useUserData()
  const { repos, setRepos } = useRepoContext()
  const [shouldRender, setShouldRender] = useState(false)
  const [configuration, setConfiguration] = useState({
    isConfiguring: false,
    cloneUrl: null,
    sshUrl: null,
    fullName: null,
  })

  const getRepos = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken')
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/vnd.github+json',
    }
    if (!accessToken) {
      console.log('no access token found')
    } else if (accessToken) {
      try {
        // Fetch user data from GitHub
        const responseUser = await fetch('https://api.github.com/user', {
          headers,
        })
        if (!responseUser.ok) {
          throw new Error(`HTTP error! status: ${responseUser.status}`)
        }
        const dataUser = await responseUser.json()
        setUserData(dataUser)

        // Create user in the backend
        const user = await createUser(dataUser.login, accessToken)
        console.log(user)

        // Fetch user data from backend to get the user_id
        const responseBackendUser = await fetch(
          `${API_BASE_URL}/api/users/token/${accessToken}`
        )
        if (!responseBackendUser.ok) {
          throw new Error(`HTTP error! status: ${responseBackendUser.status}`)
        }
        const dataBackendUser = await responseBackendUser.json()

        // Fetch repos from backend
        const responseRepos = await fetch(
          `${API_BASE_URL}/api/repos/user/${dataUser.login}`
        )
        if (!responseRepos.ok) {
          throw new Error(`HTTP error! status: ${responseRepos.status}`)
        }

        let dataRepos = await responseRepos.json()
        if (!dataRepos.length) {
          // Fetch repos from GitHub if no repos found in backend
          const responseGithubRepos = await fetch(
            'https://api.github.com/user/repos?type=owner',
            {
              headers,
            }
          )

          if (!responseGithubRepos.ok) {
            throw new Error(`HTTP error! status: ${responseGithubRepos.status}`)
          }

          const dataGithubRepos = await responseGithubRepos.json()

          // Create repos in backend using the user_id from backend
          dataRepos = await createRepos(
            dataBackendUser.user_id,
            dataGithubRepos
          )
        }

        console.log(dataRepos) // Array of created repos

        setRepos(dataRepos)

        setShouldRender(false)
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }, [])

  const getAccessToken = useCallback(async (code) => {
    const response = await fetch(
      `${API_BASE_URL}/getAccessToken?code=` + code,
      {
        method: 'GET',
      }
    )
    const data = await response.json()
    console.log(data)
    if (data.access_token) {
      localStorage.setItem('accessToken', data.access_token)
      setShouldRender(true)
    }
  }, [])

  useEffect(() => {
    const fetchRepos = async () => {
      const queryString = window.location.search
      const urlParams = new URLSearchParams(queryString)
      const codeParams = urlParams.get('code')

      if (!localStorage.getItem('accessToken')) {
        await getAccessToken(codeParams)
      }

      await getRepos()
      setShouldRender(true)
    }

    // Fetch immediately and then set the interval
    fetchRepos()
    const intervalId = setInterval(fetchRepos, 5000) // every 5 seconds
    // Clear interval on component unmount
    return () => {
      clearInterval(intervalId)
    }
  }, [getAccessToken, getRepos])

  // useEffect(() => {
  //   setShouldRender(true);
  // }, [repos]);

  return (
    <div className={styles.main}>
      {shouldRender && <Dashboard userData={userData} />}
      {/* Pass userData as props */}
      {!configuration.isConfiguring ? (
        <div className={styles.table}>
          <div className={styles.header}>
            {/* Header */}
            <h1>
              <Image
                src='/repo.svg'
                alt='Repository Icon'
                width={20}
                height={20}
                className={styles.repoImg}
              />
              Repositories
            </h1>
          </div>
          <div className={styles.page}>
            {/* Table */}
            {repos.map((repo) => (
              <RepoCard
                key={repo.repoId}
                cloneUrl={repo.cloneUrl}
                sshUrl={repo.sshUrl}
                fullName={repo.repoName}
                repoStatus={repo.status}
                repoIp={repo.ec2PublicIp}
                setConfiguration={setConfiguration}
              />
            ))}
          </div>
        </div>
      ) : (
        <Configure
          setConfiguration={setConfiguration}
          cloneUrl={configuration.cloneUrl}
          sshUrl={configuration.sshUrl}
          fullName={configuration.fullName}
        />
      )}
    </div>
  )
}

export default Repos
