

export default function Menu() {
    return (
        <>
            <div className="menu" style={{ width: "30%" }}>
                <img src="user.png" alt="" className="profileImg" />
                <span className="name">Username</span>
                <div className="menuOptions">
                    <a className="active" href="#yourProfile">
                        Your Profile
                    </a>
                    <a className="active" href="#research">
                        Research
                    </a>
                    <a className="active" href="#academics">
                        Academics
                    </a>
                    <a className="active" href="#professional">
                        Professional
                    </a>
                    <a className="logout">Logout</a>
                </div>
            </div>


        </>
    )
}

exports.Menu = Menu