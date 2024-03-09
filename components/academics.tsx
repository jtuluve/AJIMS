import { useEffect, useRef, useState } from "react";
import Form from "./form";
import Table from "./table";
import { getRetrieveFunction } from "@/lib/mongoose/serverActions";
import { updateAcademicsFileUrl } from "@/lib/mongoose/functions";

import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../app/firebase";

export default function Academics() {
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
			const getFileUrl = await getRetrieveFunction("academicsFileUrl");
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
					console.log(downloadURL);
					await updateAcademicsFileUrl(fileUrl);
				});
			}
		);
	};

	return (
		<>
			<div id="academics" className="hidden-section">
				{formState.type && (
					<Form
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
					<div className="btn-container" id="hiddenButton">
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
					<section id="signatures" style={{ display: "none" }}>
						<div style={{ color: "#131D38" }}>Applicant</div>
						<div style={{ color: "#131D38" }}>H.O.D</div>
					</section>
				</div>
			</div>
		</>
	);
}
