import Image from 'next/image'
import styles from '@css/page.module.css'

export default function Home() {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.loginContainer}>
          <form action="/action_page.php">
            <label htmlFor="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" required />

            <label htmlFor="password"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="password" required />

            <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </>
  )
}
