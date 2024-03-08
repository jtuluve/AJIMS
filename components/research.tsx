import { useEffect, useState } from "react"
import Table from "./table"
import Form from "@comp/form"
export default function Research() {
    const [formState, setFormState]: [formState: ({ type?, _id? }), setFormState:any] = useState({type:"",_id:""});
    
    function changeFormState(state) {
        setFormState(state);
    }
    
    return (
        <>
            <div id="research" className="hidden-section">
                {
                    formState.type &&
                        <Form formStatusUpdate={changeFormState} type={formState.type||""} _id={formState._id?.toString?.()||""}/>
                }
                <a className="name2">Research</a>
                <hr />
                <div className="tables">
                    <a className="name3">I. Publications</a>
                    <Table formState={formState} type="researchPublications"column={7} header_row={["Title","Journal Name", "Quartile", "Index", "DOI","Authorship","Uploads"]} keys={["title","journalName","quartile","index","doi","authorship","uploadUrl"]} formStatusMethod={changeFormState} />
                    
                    <a className="name3">II. Grants</a>
                    <Table formState={formState} type="researchGrants" column={5} header_row={["Title","Applied", "Recieved", "Amount Category", "Uploads"]} keys={["title","applied","recieved","amountCategory","uploadUrl"]} formStatusMethod={changeFormState} />

                    <a className="name3">III. Books</a>
                    <Table formState={formState} type="researchBooks"column={2} header_row={["Authorship", "Category"]} keys={["authorship","category"]} formStatusMethod={changeFormState} />
                    
                    <a className="name3">IV. Guidance</a>
                    <Table formState={formState} type="researchGuidance"column={2} header_row={["Category", "Number"]} keys={["category","number"]} formStatusMethod={changeFormState} />
                    {/* <table className="tableContainer">
                        <thead>
                            <tr>
                                <th style={{ minWidth: "3ch" }}>Sr. No.</th>
                                <th>Category</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <select name="Category" id="Category">
                                        <option value="">UG</option>
                                        <option value="">PG</option>
                                        <option value="">PHD</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <select name="Category" id="Category">
                                        <option value="">UG</option>
                                        <option value="">PG</option>
                                        <option value="">PHD</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="number" />
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
                    </table> */}
                    <a className="name3">V. Conferences</a>
                    <Table formState={formState} type="researchConferences"column={2} header_row={["Category", "Number"]} keys={["category","number"]} formStatusMethod={changeFormState} />
                    {/* <table className="tableContainer">
                        <thead>
                            <tr>
                                <th style={{ minWidth: "3ch" }}>Sr. No.</th>
                                <th>Category</th>
                                <th>Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <select name="Category" id="Category">
                                        <option value="">National</option>
                                        <option value="">International</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="number" />
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <select name="Category" id="Category">
                                        <option value="">National</option>
                                        <option value="">International</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="number" />
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
                    </table> */}
                </div>
            </div>
        </>
    )
}
