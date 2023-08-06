import styles from './Repos.module.css'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useUserData } from '@/contexts/UserDataContext'
import Dashboard from '@/components/dashboard'
import DatabaseCard from '@/components/databaseCard'
import { API_BASE_URL } from '@/config'
function Databases() {
  const { userData } = useUserData()
  const [databases, setDatabases] = useState([])

  const getDbParameters = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/ssm/parameters?githubName=${userData.login}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const parameters = await response.json()
      console.log(`DB Parameters for ${userData.login}:`, parameters)
      setDatabases(parameters)
    } catch (error) {
      console.error('Error fetching DB parameters:', error)
    }
  }, [userData.login])

  useEffect(() => {
    // Immediately invoke the function
    getDbParameters()

    // Set an interval to run the function every 5 seconds
    const intervalId = setInterval(() => {
      getDbParameters()
    }, 5000) // 5000 milliseconds (5 seconds)

    // Return a cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(intervalId)
    }

    // Include getDbParameters in the dependency array to ensure that the effect is updated if it changes
  }, [getDbParameters])

  return (
    <div className={styles.main}>
      <Dashboard userData={userData} />
      <div className={styles.page}>
        <div className={styles.table}>
          <div className={styles.header}>
            <h1>
              <Image
                src='/repo.svg'
                alt='Repository Icon'
                width={20}
                height={20}
                className={styles.repoImg}
              />
              Databases
            </h1>
          </div>
          {databases.map((database, index) => (
            <DatabaseCard
              key={index}
              databaseName={database.databaseName}
              connectionUrl={database.connectionUrl}
              username={database.username}
              port={database.port}
              githubName={userData.login}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Databases
