import { API_BASE_URL } from '@/config'
import styles from './RepoCard.module.css'
import { useEffect, useState } from 'react'
import Link from 'next/link'

function RepoCard({
  cloneUrl,
  sshUrl,
  fullName,
  repoStatus,
  repoIp,
  setConfiguration,
}) {
  const [disabled, setDisabled] = useState(false)
  const [ip, setIp] = useState(repoIp)
  const [status, setStatus] = useState(repoStatus)
  const name = fullName.split('/')[1]

  async function terminateHandler() {
    console.log('TERMINATE')
    await fetch(`${API_BASE_URL}/api/deploy/${ip}`, {
      method: 'DELETE',
    })
    setIp('')
    setStatus('Terminated')
    setDisabled(false)
  }

  function ConfigurationHandler() {
    setConfiguration({
      isConfiguring: true,
      cloneUrl: cloneUrl,
      sshUrl: sshUrl,
      fullName: fullName,
    })
    setDisabled(true)
  }

  return (
    <div className={styles.table}>
      <div className={styles.container}>
        <li className={styles.info}>{name}</li>
        <li className={styles.info}>
          ip: <Link href={`http://${ip}`}>{ip}</Link>
        </li>
        <li className={styles.info}>status: {status}</li>
        {status === 'Deployed' ? (
          <button
            className={styles.buttonTer}
            onClick={terminateHandler}
          >
            Terminate
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={ConfigurationHandler}
            disabled={status === 'Deploying...'}
          >
            Configure
          </button>
        )}
      </div>
    </div>
  )
}

export default RepoCard
// key={repo.id}
//               name={repo.name}
//               cloneUrl={repo.clone_url}
//               sshUrl={repo.ssh_url}
//               url={repo.url}
//               permissions={repo.permissions}
//               deployHandler={DeployHandler}
