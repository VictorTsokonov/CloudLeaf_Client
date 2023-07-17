import styles from './login.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

const CLIENT_ID = '8d31bb758da8b00ca5e2'
export default function Login() {
  //   const router = useRouter();
  useEffect(() => {
    console.log(CLIENT_ID)
  }, [])

  function loginHandler() {
    console.log(CLIENT_ID)
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`
    )
    // window.location.assign
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.imageContainer}>
        <Image
          src='/GithubWallpaper.jpeg'
          alt='Logo'
          // layout='responsive'
          layout='fill'
          objectFit='cover'
          priority
        />
      </div>
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          {/* Changed here */}
          <button
            className={styles.authButton}
            onClick={loginHandler}
          >
            Login with GitHub{' '}
            <Image
              src='/github-logo.png'
              alt='Repository Icon'
              width={20}
              height={20}
              className={styles.repoImg}
            />
          </button>
          <button className={styles.authButton}>
            Login with GitLab{' '}
            <Image
              src='/gitlab.png'
              alt='Repository Icon'
              width={20}
              height={20}
              className={styles.repoImg}
            />
          </button>
          <button className={styles.authButton}>
            Login with Bitbucket{' '}
            <Image
              src='/bitbucket-logo.png'
              alt='Repository Icon'
              width={20}
              height={20}
              className={styles.repoImg}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
