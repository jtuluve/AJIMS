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
                    <Table type="researchPublications" column={6} header_row={["Title","Journal Name","Year", "Quartile","Authorship","Uploads"]} keys={["title","journalName","year","quartile","authorship","uploadUrl"]} values={userData?.appraisal?.research?.publications}/>
                    
                    <a className="name3">II. Grants</a>
                    <Table type="researchGrants" column={6} header_row={["Title", "Agency", "Recieved", "Amount Category", "Start year", "Uploads"]} keys={["title", "agency", "recieved", "amountCategory","startYear","uploadUrl"]} values={userData?.appraisal?.research?.grants}/>

                    <a className="name3">III. Books</a>
                    <Table  type="researchBooks"column={5} header_row={["Title","Authorship", "Category","Year","Uploads"]} keys={["title","authorship","category","year","uploadUrl"]}  values={userData?.appraisal?.research?.books}/>
                    
                    <a className="name3">IV. Guidance</a>
                    <Table type="researchGuidance" column={5} header_row={["Category", "Student Name", "Title", "Start date", "Funded"]} keys={["category", "studentDetails", "title", "startDate","fundedStatus"]}  values={userData?.appraisal?.research?.guidance}/>
                    
                    <a className="name3">V. Conferences</a>
                    <Table type="researchConferences" column={4} header_row={["Year", "Conference Name", "Category", "Type"]} keys={["year","confName", "category","typeC"]}  values={userData?.appraisal?.research?.conferences}/>
                    
                    <a className="name3">V. Patents</a>
                    <Table type="researchPatents" column={6} header_row={["Patent Country", "Patent Number", "Patent Type", "Patent Certificate", "Title", "Date"]} keys={["patentCountry", "patentNumber", "patentType","patentcert","title","date"]}  values={userData?.appraisal?.research?.patents}/>
                    
                </div>
            </div>
      </>
    )
}