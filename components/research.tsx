import Table from "./table"
import { useUserData } from "./UserDataContext";
export default function Research() {
    const {userData} = useUserData();
    if(!userData) return <p style={{color:"white"}}>Failed to load data. Please, signout and signin again.</p>

    
    return (
        <>
            <div id="research" className="hidden-section">
                <a className="name2">Research</a>
                <hr />
                <div className="tables">
                    <a className="name3">I. Publications</a>
                    <Table type="researchPublications" column={7} header_row={["Title","Journal Name", "Quartile", "Index", "DOI","Authorship","Uploads"]} keys={["title","journalName","quartile","index","doi","authorship","uploadUrl"]} values={userData?.appraisal?.research?.publications}/>
                    
                    <a className="name3">II. Grants</a>
                    <Table type="researchGrants" column={5} header_row={["Title","Agency", "Recieved", "Amount Category", "Uploads"]} keys={["title","agency","recieved","amountCategory","uploadUrl"]} values={userData?.appraisal?.research?.grants}/>

                    <a className="name3">III. Books</a>
                    <Table  type="researchBooks"column={2} header_row={["Authorship", "Category"]} keys={["authorship","category"]}  values={userData?.appraisal?.research?.books}/>
                    
                    <a className="name3">IV. Guidance</a>
                    <Table type="researchGuidance"column={2} header_row={["Category", "Number"]} keys={["category","number"]}  values={userData?.appraisal?.research?.guidance}/>
                    
                    <a className="name3">V. Conferences</a>
                    <Table type="researchConferences"column={2} header_row={["Category", "Number"]} keys={["category","number"]}  values={userData?.appraisal?.research?.conferences}/>
                    
                </div>
            </div>
        </>
    )
}
