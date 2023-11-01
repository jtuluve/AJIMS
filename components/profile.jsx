export default function Profile() {
    return (
        <>
            <div id="yourProfile" className="hidden-section">
                <a className="name2">Your Profile</a>
                <hr />
                <div className="profileform">
                    <form action="profile.php" method="post">
                        <label htmlFor="Name">
                            <b>Name</b>
                        </label>
                        <input type="text" placeholder="Enter Name" name="name" required="" />
                        <label htmlFor="Designation">
                            <b>Designation</b>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Designation"
                            name="designation"
                            required=""
                        />
                        <label htmlFor="Department">
                            <b>Department</b>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Department"
                            name="department"
                            required=""
                        />
                        <input type="submit" />
                    </form>
                </div>
            </div>

        </>
    )
}