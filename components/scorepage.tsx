import { useUserData } from "./UserDataContext";
import Table from "./table";

export default function Scorepage() {
  const {userData} = useUserData();
  if(!userData) return <p style={{color:"white"}}>Failed to load data. Please, signout and signin again.</p>
  return (
    <div id="scorepage" className="hidden-section">
      <a className="name2">Score</a>
      <hr />
      <h3 className="name3">Research score</h3>
      <Table type="researchScore" column={2} header_row={["Score","Category"]} keys={["score","category"]} values={userData?.appraisal?.research?.score} readOnly/>
      <h3 className="name3">Academics score</h3>
      <Table type="academicsScore" column={2} header_row={["Score","Category"]} keys={["score","category"]} values={userData?.appraisal?.research?.score} readOnly/>
      <h3 className="name3">Professional score</h3>
      <Table type="professionalScore" column={2} header_row={["Score","Category"]} keys={["score","category"]} values={userData?.appraisal?.research?.score} readOnly/>
      <h3 className="name3">Overall score</h3>
      <Table type="overallScore" column={2} header_row={["Score","Category"]} keys={["score","category"]} values={userData?.appraisal?.research?.score} readOnly/>
    </div>
  );
}
