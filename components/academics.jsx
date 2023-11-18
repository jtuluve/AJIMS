export default function Academics() {
    return (
        <>
            <div id="academics" className="hidden-section">
                <a className="name2">Academics</a>
                <hr />
                <div className="tables">
                    <table className="tableContainer scoreTable">
                        <thead>
                            <tr>
                                <th>Final Score</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    25
                                </td>
                                <td>
                                    A+
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a className="name3">Teaching</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th>Hours</th>
                                <th>Clinical class hours/ practicals</th>
                                <th>Student Feedback</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="number" defaultValue={20} />
                                </td>
                                <td>
                                    <input type="number" defaultValue={10} />
                                </td>
                                <td>
                                    <input type="number" defaultValue={12} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="submit" defaultValue="update" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div>
                        <input type="submit" defaultValue="print" />
                        <input type="file" name="" id="" />
                    </div>
                </div>
                
            </div>

        </>
    )
}