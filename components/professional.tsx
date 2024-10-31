"use client";

import { useEffect, useRef, useState } from "react";
import Table from "./table";
import { getRetrieveFunction } from "@/lib/mongoose/serverActions";
import { getDownloadURL, getStorage, ref,uploadBytesResumable } from "firebase/storage";
import { app } from "../app/firebase";
import { deleteProfessionalFileUrl, updateProfessionalFileUrl } from "@/lib/mongoose/functions";
import { useUserData } from "./UserDataContext";

export default function Professional() {
	const { userData } = useUserData();
	const [fileUrl, setFileUrl] = useState("");
	const fileRef = useRef(null);
	
	useEffect(() => {
		async function getDataAny() {
      setFileUrl(undefined)
			const getFileUrl = await getRetrieveFunction("professionalFileUrl");
			const fileUrl = await getFileUrl?.();
			setFileUrl(fileUrl);
		}
		getDataAny();
	}, []);

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
				setFilePerc(Math.round(progress));
			},
			(error) => {
				console.log(error);
				setFileUploadError(true);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					setFileUrl(downloadURL);
					await updateProfessionalFileUrl(downloadURL);
				});
			}
		);
	};

	return (
		<>
			<div id="professional" className="hidden-section">
				<a className="name2">Professional</a>
				<hr />
				<div id="print-section" className="tables">
					<a className="name3">Clinical Duty</a>
					<Table
						header_row={[
							"No. of Patients",
							"Minor Procedures",
							"Major Procedures",
							"Uploads",
						]}
						keys={[
							"patients",
							"minorProcedures",
							"majorProcedures",
							"clinicalDutyFile",
						]}
						column={4}
						type="professionalClinicalDuty"
						values={userData?.appraisal?.professional?.clinicalDuty}
					/>

					<a className="name3">Post Held</a>
					<Table
						type="professionalPostHeld"
						header_row={["Category", "Uplolads"]}
						keys={["category", "postHeldFile"]}
						column={2}
						values={userData?.appraisal?.professional?.postHeld}
					/>

					<a className="name3">Exam Duties</a>
					<Table
						type="professionalExamDuties"
						header_row={["Category 1", "Category 2", "Uploads"]}
						keys={["category1", "category2", "examDutyFile"]}
						column={3}
						values={userData?.appraisal?.professional?.examDuties}
					/>

					<a className="name3">Coordinator Duty</a>
					<Table
						type="professionalCoordinatorDuty"
						header_row={["Category", "Uploads"]}
						keys={["category", "coordinatorDutyFile"]}
						column={2}
						values={userData?.appraisal?.professional?.coordinatorDuty}
					/>

					<a className="name3">Committee</a>
					<Table
						type="professionalCommittee"
						header_row={["Designation", "Committee Name", "Uploads"]}
						keys={["designation", "committeeName", "committeeFile"]}
						column={3}
						values={userData?.appraisal?.professional?.committee}
					/>

					<a className="name3">Conferences/workshop/CME conducted</a>
					<Table
						type="professionalConference"
						header_row={["Designation", "Credit Points", "Uploads"]}
						keys={["designation", "creditPoints", "conferenceFile"]}
						column={3}
						values={userData?.appraisal?.professional?.conferences}
					/>
					
					<a className="name3">Guest Lectures</a>
					<Table
						type="professionalGuestLectures"
						header_row={["Title", "Category", "Uploads"]}
						keys={["title", "category", "guestLecturesFile"]}
						column={3}
						values={userData?.appraisal?.professional?.guestLectures}
					/>

					<a className="name3">Achievements</a>
					<Table
						type="professionalAchievements"
						header_row={["Serial No", "year", "information"]}
						keys={["serialNo", "year", "information"]}
						column={3}
						values={userData?.appraisal?.professional?.achievements}
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
								document.getElementById(
									"professionalSignatures"
								).style.display = "flex";
								document.getElementById("onPrintHidden").hidden = true;
								window.print();
								document.getElementById("onPrintHidden").hidden = false;
								document.getElementById(
									"professionalSignatures"
								).style.display = "none";
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
              				disabled={fileUrl === undefined}
						>
							{fileUrl ? "Reupload File" : fileUrl === undefined ? "Loading..." : "Upload File"}
						</button>

						{fileUrl &&
						<button
							className="delete-button"
							onClick={async () => {
								await deleteProfessionalFileUrl()
								setFileUrl("")
							}}
						>
							Delete file
						</button>
						}

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
