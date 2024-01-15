import { useEffect, useState } from "react"
import Table from "./table"
import { getResearchPublications } from "@/lib/mongoose/functions";
import Form from "@comp/form"
import { revalidatePath } from "next/cache";
export default function Research() {
    const [formData, setFormData]: [formData: { type?, _id? }, setFormData:any] = useState({});
    
    function changeFormState(state) {
        setFormData(state);
        console.log(state);
    }

    return (
        <>
            <div id="research" className="hidden-section">
                {
                    Object.keys(formData).length !== 0
                        ?
                        <Form formStatusUpdate={changeFormState} type={formData.type||""} _id={formData._id?.toString?.()}/>
                        :
                        <></>
                }
                <a className="name2">Research</a>
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
                    <a className="name3">I. Publications</a>
                    <Table type="researchPublications"column={7} header_row={["Title","Journal Name", "Quartile", "Index", "DOI","Authorship","Uploads"]} keys={["title","journalName","quartile","index","doi","authorship","uploadUrl"]} formStatusMethod={changeFormState} />
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th style={{ minWidth: "3ch" }}>Sr. No.</th>
                                <th>Title</th>
                                <th>Journal Name</th>
                                <th>Quartile</th>
                                <th>Index</th>
                                <th>DOI</th>
                                <th>Authorship</th>
                                <th>Uploads</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <input type="text" defaultValue="The real title" />
                                </td>
                                <td>
                                    <input type="text" defaultValue="The real Journal" />
                                </td>
                                <td>
                                    <select name="quartile" id="quartile">
                                        <option value="">Q1</option>
                                        <option value="">
                                            Q2
                                        </option>
                                        <option value="">Q3</option>
                                        <option value="">Q4</option>
                                        <option value="">No quartile</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="index" required>
                                        <option value="Medline" aria-readonly>
                                            Medline
                                        </option>
                                        <option value="Pubmed">Pubmed</option>
                                        <option value="CSCI">CSCI</option>
                                        <option value="SCI">SCI</option>
                                        <option value="DC">DC</option>
                                        <option value="Expanded Embase">Expanded Embase</option>
                                        <option value="Scopus">
                                            Scopus
                                        </option>
                                        <option value="DoAJ">DoAJ</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" defaultValue="The real DOI" />
                                </td>
                                <td>
                                    <select name="category" aria-readonly>
                                        <option value="First">First</option>
                                        <option value="Correspondant">Correspondant</option>
                                        <option value="Second">Second</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="file" name="" id="" />
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <input type="text" required />
                                </td>
                                <td>
                                    <input type="text" required />
                                </td>
                                <td>
                                    <select name="quartile" id="quartile">
                                        <option value="">Q1</option>
                                        <option value="">Q2</option>
                                        <option value="">Q3</option>
                                        <option value="">Q4</option>
                                        <option value="">No quartile</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="index" required>
                                        <option value="Medline">Medline</option>
                                        <option value="Pubmed">Pubmed</option>
                                        <option value="CSCI">CSCI</option>
                                        <option value="SCI">SCI</option>
                                        <option value="DC">DC</option>
                                        <option value="Expanded Embase">Expanded Embase</option>
                                        <option value="Scopus">Scopus</option>
                                        <option value="DoAJ">DoAJ</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="text" />
                                </td>
                                <td>
                                    <select name="category">
                                        <option value="First">First</option>
                                        <option value="Correspondant">Correspondant</option>
                                        <option value="Second">Second</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="file" name="" id="" />
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
                    <a className="name3">II. Grants</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th style={{ minWidth: "3ch" }}>Sr. No.</th>
                                <th>Title</th>
                                <th>Applied</th>
                                <th>Recieved</th>
                                <th>Amount Catogory</th>
                                <th>Uploads</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <input type="text" defaultValue="The real title" />
                                </td>
                                <td>
                                    <input type="number" defaultValue="2" />
                                </td>
                                <td>
                                    <input type="number" defaultValue="3" />
                                </td>
                                <td>
                                    <select name="Amount Category" id="Amount Category">
                                        <option value="">upto 1 lakh</option>
                                        <option value="" >
                                            1 - 5 lakhs
                                        </option>
                                        <option value="">5 - 10 lakhs</option>
                                        <option value="">10 - 30 lakhs</option>
                                        <option value=""> &gt; 30 lakhs</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="file" name="" id="" />
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <input type="text" defaultValue="The real title" />
                                </td>
                                <td>
                                    <input type="number" defaultValue="2" />
                                </td>
                                <td>
                                    <input type="number" defaultValue="2" />
                                </td>
                                <td>
                                    <select name="Amount Category" id="Amount Category">
                                        <option value="">upto 1 lakh</option>
                                        <option value="" >
                                            1 - 5 lakhs
                                        </option>
                                        <option value="">5 - 10 lakhs</option>
                                        <option value="">10 - 30 lakhs</option>
                                        <option value=""> &gt; 30 lakhs</option>
                                        <option value="">Nil</option>
                                    </select>
                                </td>
                                <td>
                                    <input type="file" name="" id="" />
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
                    <a className="name3">III. Books</a>
                    <table className="tableContainer">
                        <thead>
                            <tr>
                                <th style={{ minWidth: "3ch" }}>Sr. No.</th>
                                <th>Authorship</th>
                                <th>Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>
                                    <select name="Authorship" id="Authorship">
                                        <option value="">Nil</option>
                                        <option value="">Chapter</option>
                                        <option value="">Book</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="Category" id="Category">
                                        <option value="">Nil</option>
                                        <option value="">National</option>
                                        <option value="">International</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>
                                    <select name="Authorship" id="Authorship">
                                        <option value="">Nil</option>
                                        <option value="">Chapter</option>
                                        <option value="">Book</option>
                                    </select>
                                </td>
                                <td>
                                    <select name="Category" id="Category">
                                        <option value="">Nil</option>
                                        <option value="">National</option>
                                        <option value="">International</option>
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
                    <a className="name3">IV. Guidance</a>
                    <table className="tableContainer">
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
                    </table>
                    <a className="name3">V. Conferences</a>
                    <table className="tableContainer">
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
                    </table>
                </div>
            </div>
        </>
    )
}