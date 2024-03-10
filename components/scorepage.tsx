import Table from "./table";

export default function Scorepage() {
  return (
    <div id="scorepage" className="hidden-section">
      <a className="name2">Score</a>
      <hr />
      <h3 className="name3">Research score</h3>
      <Table type="researchScore" column={2} header_row={["Score","Category"]} keys={["score","category"]}/>
      <h3 className="name3">Academics score</h3>
      <Table type="academicsScore" column={2} header_row={["Score","Category"]} keys={["score","category"]}/>
      <h3 className="name3">Professional score</h3>
      <Table type="professionalScore" column={2} header_row={["Score","Category"]} keys={["score","category"]}/>
      <h3 className="name3">Overall score</h3>
      <Table type="overallScore" column={2} header_row={["Score","Category"]} keys={["score","category"]}/>
    </div>
  );
}
