import styles from "@css/menu.module.css"

export default function Menu() {
    return (
        <>
            <div className={styles.menu}>
                <img src="user.png" alt="" className={styles.profileImg}/>
                    <span className={styles.name}>Username</span>
                    <div className={styles.menuOptions}>
                        <a className={styles.active}>Your Profile</a>
                        <a className={styles.active}>Research</a>
                        <a className={styles.active}>Academics</a>
                        <a className={styles.active}>Professional</a>
                        <a className={styles.logout}>Logout</a>
                    </div>
            </div>

        </>
    )
}

exports.Menu = Menu