import Table from "./table";

export default function scorepage() {
  return (
    <div>
      <a className="name2">Score</a>
      <hr />
      <a href="" className="name3">Research score</a>
      {/* <Table type="researchScore" column={2} header_row={["Score","Category"]} keys={["score","category"]}/> */}
      <a href="" className="name3">Academics score</a>
      <table className="tableContainer scoreTable">
        <thead>
          <tr>
            <th>Final Score</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>25</td>
            <td>A+</td>
          </tr>
        </tbody>
      </table>
      <a href="" className="name3">Professional score</a>
      <table className="tableContainer scoreTable">
        <thead>
          <tr>
            <th>Final Score</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>25</td>
            <td>A+</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
