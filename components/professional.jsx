export default function Professional() {
    return (
        <>
            <div id="professional" className="hidden-section">
                
                <a className="name2">Professional</a>
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
                    <a className="name3">Clinical Duty</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th>No. of patients</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="number" defaultValue={20} />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="submit" defaultValue="update" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a className="name3">Post Held</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select name="facultyTitle">
                                        <option value="Lecturer">Lecturer</option>
                                        <option value="Assistant Professor">Assistant Professor</option>
                                        <option value="Associate Professor">Associate Professor</option>
                                        <option value="Professor">Professor</option>
                                        <option value="HOD">HOD (Head of Department)</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="submit" defaultValue="update" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a className="name3">Exam Duties</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th>Category 1</th>
                                <th>Category 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select name="category1">
                                        <option value="Invigilator/Room Supervisor">
                                            Invigilator/Room Supervisor
                                        </option>
                                        <option value="Deputy Chief Superintendent">
                                            Deputy Chief Superintendent
                                        </option>
                                        <option value="Chief Superintendent">Chief Superintendent</option>
                                        <option value="Nil">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="category2">
                                        <option value="Internal">Internal</option>
                                        <option value="External">External</option>
                                        <option value="Nil">Nil</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="category1">
                                        <option value="Invigilator/Room Supervisor">
                                            Invigilator/Room Supervisor
                                        </option>
                                        <option value="Deputy Chief Superintendent">
                                            Deputy Chief Superintendent
                                        </option>
                                        <option value="Chief Superintendent">Chief Superintendent</option>
                                        <option value="Nil">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="category2">
                                        <option value="Internal">Internal</option>
                                        <option value="External">External</option>
                                        <option value="Nil">Nil</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="button" defaultValue="add" />
                                </td>
                                <td>
                                    <input type="submit" defaultValue="update" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a className="name3">Committee</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th>Designation</th>
                                <th>Committee Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select name="designation">
                                        <option value="Member">Member</option>
                                        <option value="Coordinator">Coordinator</option>
                                        <option value="Head">Head</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" defaultValue="real committe" />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="designation">
                                        <option value="Member">Member</option>
                                        <option value="Coordinator">Coordinator</option>
                                        <option value="Head">Head</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="button" defaultValue="add" />
                                </td>
                                <td>
                                    <input type="submit" defaultValue="update" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a className="name3">Conferences/workshop/CME conducted</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th>Designation</th>
                                <th>Credit Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <select name="designation">
                                        <option value="Member">Member</option>
                                        <option value="Coordinator">Coordinator</option>
                                        <option value="Head">Head</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="creditPoints">
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <select name="designation">
                                        <option value="Member">Member</option>
                                        <option value="Coordinator">Coordinator</option>
                                        <option value="Head">Head</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="creditPoints">
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="button" defaultValue="add" />
                                </td>
                                <td>
                                    <input type="submit" defaultValue="update" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <a className="name3">Guest Lectures</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="number" name="" id="" />
                                </td>
                                <td>
                                    <select name="category2">
                                        <option value="Internal" defaultValue>
                                            Internal
                                        </option>
                                        <option value="Nil">Nil</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <input type="number" name="" id="" />
                                </td>
                                <td>
                                    <select name="category2">
                                        <option value="External" defaultValue>
                                            External
                                        </option>
                                        <option value="Nil">Nil</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <td>
                                    <input type="submit" defaultValue="update" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>

        </>
    )
}