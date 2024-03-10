import { useEffect, useRef, useState } from "react";
import Table from "./table";
import Form from "./form";
import { getRetrieveFunction } from "@/lib/mongoose/serverActions";

import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../app/firebase";
import { updateProfessionalFileUrl } from "@/lib/mongoose/functions";

export default function Professional() {
	const [formState, setFormState]: [
		formState: { type?; _id? },
		setFormState: any
	] = useState({ type: "", _id: "" });

	function changeFormState(state) {
		setFormState(state);
	}

	const [fileUrl, setFileUrl] = useState("");
	const fileRef = useRef(null);

	useEffect(() => {
		async function getDataAny() {
			const getFileUrl = await getRetrieveFunction("professionalFileUrl");
			// console.log(getFileUrl);
			const fileUrl = await getFileUrl?.();
			// console.log(fileUrl);
			setFileUrl(fileUrl);
		}
		getDataAny();
	}, []);

	// file upload
	const [file, setFile] = useState(undefined);
	const [filePerc, setFilePerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(false);

	useEffect(() => {
		if (file) {
			setFileUrl("");
			handleFileUpload(file);
		}
	}, [file]);

	const handleFileUpload = (file) => {
		const storage = getStorage(app);
		const fileName = new Date().getTime() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				// console.log(progress);
				setFilePerc(Math.round(progress));
			},
			(error) => {
				console.log(error);
				setFileUploadError(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					setFileUrl(downloadURL);
					// console.log(downloadURL);
					await updateProfessionalFileUrl(downloadURL);
				});
			}
		);
	};

	return (
		<>
			<div id="professional" className="hidden-section">
				{formState.type && (
					<Form
						formStatusUpdate={changeFormState}
						type={formState.type}
						_id={formState._id}
					/>
				)}
				<a className="name2">Professional</a>
				<hr />
				<div id="print-section" className="tables">
					<a className="name3">Clinical Duty</a>
					<Table
						header_row={["No. of Patients"]}
						keys={["patients"]}
						column={1}
						type="professionalClinicalDuty"
						formState={formState}
						formStatusMethod={changeFormState}
					/>

					<a className="name3">Post Held</a>
					<Table
						type="professionalPostHeld"
						header_row={["Category"]}
						keys={["category"]}
						column={1}
						formState={formState}
						formStatusMethod={changeFormState}
					/>

					<a className="name3">Exam Duties</a>
					<Table
						type="professionalExamDuties"
						header_row={["Category 1", "Category 2"]}
						keys={["category1", "category2"]}
						column={2}
						formState={formState}
						formStatusMethod={changeFormState}
					/>

					<a className="name3">Coordinator Duty</a>
					<Table
						type="professionalCoordinatorDuty"
						header_row={["Category"]}
						keys={["category"]}
						column={1}
						formState={formState}
						formStatusMethod={changeFormState}
					/>

					<a className="name3">Committee</a>
					<Table
						type="professionalCommittee"
						header_row={["Designation", "Committee Name"]}
						keys={["designation", "committeeName"]}
						column={2}
						formState={formState}
						formStatusMethod={changeFormState}
					/>

					<a className="name3">Conferences/workshop/CME conducted</a>
					<Table
						type="professionalConference"
						header_row={["Designation", "Credit Points"]}
						keys={["designation", "creditPoints"]}
						column={2}
						formState={formState}
						formStatusMethod={changeFormState}
					/>
					<a className="name3">Guest Lectures</a>
					<Table
						type="professionalGuestLectures"
						header_row={["Number", "Category"]}
						keys={["number", "category"]}
						column={2}
						formState={formState}
						formStatusMethod={changeFormState}
					/>

					<div className="btn-container" id="hiddenButton">
						<button
							type="button"
							className="print-button"
							onClick={() => {
								const userName = document.getElementById("getName").innerText;
								const parentElement = document.getElementById("professional");
								const h2 = document.createElement("h2");
								h2.innerText = userName;
								parentElement.insertBefore(h2, parentElement.firstChild);
								document.getElementById("professionalSignatures").style.display = "flex";
								document.getElementById("onPrintHidden").hidden = true;
								window.print();
								document.getElementById("onPrintHidden").hidden = false;
								document.getElementById("professionalSignatures").style.display = "none";
								parentElement.removeChild(h2);
							}}
						>
							<span className="print-icon">print</span>
						</button>

						<button
							onClick={() => {
								fileRef && fileRef.current.click();
							}}
							className="upload-button"
						>
							{fileUrl ? "Reupload File" : "Upload File"}
						</button>

						<input
							hidden
							type="file"
							accept="*/*"
							name=""
							id=""
							ref={fileRef}
							onChange={(e) => setFile(e.target.files[0])}
							defaultValue={fileUrl || ""}
						/>
						<p>
							{fileUploadError ? (
								<span style={{ color: "white" }}>Error in file uplaod</span>
							) : filePerc > 0 && filePerc < 100 ? (
								<span
									style={{ color: "white" }}
								>{`Uploading ${filePerc}%...`}</span>
							) : filePerc === 100 && fileUrl ? (
								<span style={{ color: "white" }}>
									File Succesfully uploaded
								</span>
							) : (
								""
							)}
						</p>
					</div>

					<section id="professionalSignatures" style={{ display: "none" }}>
						<div style={{ color: "#131D38" }}>Applicant</div>
						<div style={{ color: "#131D38" }}>H.O.D</div>
					</section>
				</div>
			</div>
		</>
	);

}
