"use client";
import { useEffect, useRef, useState } from "react";
import Table from "./table";
import { getRetrieveFunction } from "@/lib/mongoose/serverActions";
import { deleteAcademicsFileUrl, updateAcademicsFileUrl } from "@/lib/mongoose/functions";

import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../app/firebase";
import { useUserData} from "./UserDataContext";

export default function Academics() {
	const {userData} = useUserData();
	const [fileUrl, setFileUrl] = useState("");
	const fileRef = useRef(null);
	
	useEffect(() => {
		async function getDataAny() {
      setFileUrl(undefined)
			const getFileUrl = await getRetrieveFunction("academicsFileUrl");
			// console.log(getFileUrl);
			const fileUrl = await getFileUrl?.();
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
					await updateAcademicsFileUrl(downloadURL);
				});
			}
			);
		};
		
		if(!userData) return <p style={{color:"white"}}>Failed to load data. Please, signout and signin again.</p>
		
		return (
		<>
			<div id="academics" className="hidden-section">
				<a className="name2">Academics</a>
				<hr />
				<div id="print-section" className="tables">
					<a className="name3">Teaching</a>
					<Table
						column={6}
						type="academicsTeaching"
						header_row={[
							"Hours",
							"Clinical class hours/ practicals",
							"Student Feedback",
							"Resource Material",
							"Public Awareness Writeup",
							"CC"
						]}
						keys={["hours", "clinicalHours", "studentsFeedback", "resourceMaterial","publicAwarenessWriteup","cc"]}
						values={userData?.appraisal?.academics?.teaching}
					/>
					<div className="btn-container" id="hiddenButton">
						<button
							type="button"
							className="print-button"
							onClick={() => {
								const userName = document.getElementById("getName").innerText;
								const parentElement = document.getElementById("academics");
								const h2 = document.createElement("h2");
								h2.innerText = userName;
								parentElement.insertBefore(h2, parentElement.firstChild);
								document.getElementById("onPrintHidden").hidden = true;
								document.getElementById("signatures").style.display = "flex";
								window.print();
								document.getElementById("onPrintHidden").hidden = false;
								document.getElementById("signatures").style.display = "none";
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
                    await deleteAcademicsFileUrl()
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
								<span style={{ color: "red" }}>Error in file uplaod</span>
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
						<div style={{ color: "#131D38", marginRight: "10px" }}>Applicant</div>
						<div style={{ color: "#131D38", marginLeft: "10px" }}>H.O.D</div>
					</section>
				</div>
			</div>
		</>
	);
}
