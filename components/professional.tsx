import { useState } from "react";
import Table from "./table";
import Form from "./form";

export default function Professional() {
  const [formState, setFormState]: [
    formState: { type?; _id? },
    setFormState: any
  ] = useState({ type: "", _id: "" });

  function changeFormState(state) {
    setFormState(state);
  }

  return (
    <>
      <div id="professional" className="hidden-section">
        {formState.type&&<Form formStatusUpdate={changeFormState} type={formState.type} _id={formState._id}/>}
        <a className="name2">Professional</a>
        <hr />
        <div className="tables">
          
          <a className="name3">Clinical Duty</a>
          <Table header_row={["No. of Patients"]} keys={["patients"]} column={1} type="professionalClinicalDuty" formState={formState} formStatusMethod={changeFormState}/>
          
          <a className="name3">Post Held</a>
          <Table type="professionalPostHeld" header_row={["Category"]} keys={["category"]} column={1} formState={formState} formStatusMethod={changeFormState}/>

          <a className="name3">Exam Duties</a>
          <Table type="professionalExamDuties" header_row={["Category 1","Category 2"]} keys={["category1","category2"]} column={2} formState={formState} formStatusMethod={changeFormState}/>
          
          <a className="name3">Coordinator Duty</a>
          <Table type="professionalCoordinatorDuty" header_row={["Category"]} keys={["category"]} column={1} formState={formState} formStatusMethod={changeFormState}/>

          <a className="name3">Committee</a>
          <Table type="professionalCommittee" header_row={["Designation","Committee Name"]} keys={["designation","committeeName"]} column={2} formState={formState} formStatusMethod={changeFormState}/>
          
          <a className="name3">Conferences/workshop/CME conducted</a>
          <Table type="professionalConference" header_row={["Designation","Credit Points"]} keys={["designation","creditPoints"]} column={2} formState={formState} formStatusMethod={changeFormState}/>
          <a className="name3">Guest Lectures</a>
          <Table type="professionalGuestLectures" header_row={["Number","Category"]} keys={["number","category"]} column={2} formState={formState} formStatusMethod={changeFormState}/>
        </div>
      </div>
    </>
  );
}
