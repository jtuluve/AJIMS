import { useState } from "react";
import Form from "./form";
import Table from "./table";

export default function Academics() {
	const [formState, setFormState]: [
		formState: { type?; _id? },
		setFormState: any
	] = useState({ type: "", _id: "" });

	function changeFormState(state) {
		setFormState(state);
	}
	return (
		<>
			<div id="academics" className="hidden-section">
				{formState.type && (
					<Form
						formState={formState}
						formStatusUpdate={changeFormState}
						type={formState.type || ""}
						_id={formState._id?.toString?.()}
					/>
				)}
				<a className="name2">Academics</a>
				<hr />
				<div id="print-section" className="tables">
					<a className="name3">Teaching</a>
					<Table
						column={3}
						type="academicsTeaching"
						header_row={[
							"Hours",
							"Clinical class hours/ practicals",
							"Student Feedback",
						]}
						keys={["hours", "clinicalHours", "studentsFeedback"]}
						formStatusMethod={changeFormState}
					/>
					<div id="hiddenButton">
						<button
							type="button"
							className="print-button"
							onClick={() => {
								document.getElementById("onPrintHidden").hidden = true;
								document.getElementById("signatures").style.display = "flex";
								window.print();
								document.getElementById("onPrintHidden").hidden = false;
								document.getElementById("signatures").style.display = "none";
							}}
						>
							<span className="print-icon">print</span>
						</button>
						<input type="file" name="" id="" />
					</div>
					<section id="signatures" style={{ display: "none" }}>
						<div style={{ color: "#131D38" }}>Signature 1</div>
						<div style={{ color: "#131D38" }}>Signature 2</div>
					</section>
				</div>
			</div>
		</>
	);
}
