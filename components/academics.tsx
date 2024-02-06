import { useState } from "react";
import Form from "./form";
import Table from "./table";

export default function Academics() {
    const [formState, setFormState]: [formState: { type?, _id? }, setFormState:any] = useState({type:"",_id:""});
    
    function changeFormState(state) {
        setFormState(state);
    }
    return (
        <>
            <div id="academics" className="hidden-section">
            {
                    formState.type &&
                        <Form formState={formState} formStatusUpdate={changeFormState} type={formState.type||""} _id={formState._id?.toString?.()}/>
                }
                <a className="name2">Academics</a>
                <hr />
                <div className="tables">
                    <a className="name3">Teaching</a>
                    <Table column={3} type="academicsTeaching" header_row={["Hours", "Clinical class hours/ practicals","Student Feedback"] } keys={["hours","clinicalHours","studentsFeedback"]}/>
                    <div>
                        <input type="submit" defaultValue="print" />
                        <input type="file" name="" id="" />
                    </div>
                </div>
                
            </div>

        </>
    )
}