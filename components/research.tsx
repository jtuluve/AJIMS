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
                <Table formState={formState} type="researchPublications" column={7} header_row={["Title", "Journal Name", "Quartile", "Index", "DOI", "Authorship", "Uploads"]} keys={["title", "journalName", "quartile", "index", "doi", "authorship", "uploadUrl"]} formStatusMethod={changeFormState} />
                    
                <a className="name3">II. Grants</a>
                <Table formState={formState} type="researchGrants" column={6} header_row={["Title","Agency","Utilization Certificate", "Recieved", "Amount Category", "Uploads"]} keys={["title","agency","utCert","recieved","amountCategory","uploadUrl"]} formStatusMethod={changeFormState} />

                <a className="name3">III. Books</a>
                <Table formState={formState} type="researchBooks" column={7} header_row={["Authorship", "Category", "Title", "Year of Publication","Acknowledgement","Book Details","Uploads"]} keys={["authorship","category","title","year","Certificate","bookdetails","UploadUrl"]} formStatusMethod={changeFormState} />
                
                <a className="name3">IV. Guidance</a>
                <Table formState={formState} type="researchGuidance"column={5} header_row={["Category","Title","Synopis","Thesis","Report"]} keys={["category","title","synopsis","thesis","report"]} formStatusMethod={changeFormState} />
                
                <a className="name3">V. Conferences</a>
                <Table formState={formState} type="researchConferences" column={5} header_row={["Category", "Conference Name", "Year", "Type", "Place of Conference"]} keys={["category","Confname", "year", "type", "place"]} formStatusMethod={changeFormState} />
            </div>
        </div>
    </>
    )
}
