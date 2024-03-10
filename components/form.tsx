"use client";
import { getDataAny } from "@/lib/mongoose/serverActions";
import { getInput } from "@/lib/formFunctions";
import { handleUpsertAny } from "@/lib/mongoose/serverActions";
import styles from "@css/form.module.css";
import { CSSProperties, startTransition, useEffect, useRef, useState } from "react";

import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { app } from "../app/firebase";
import { getProfile } from "@/lib/mongoose/functions";

type otherInput = {
	type: string;
	name: string;
	label?: string;
	required: boolean;
	default?: string;
	placeholder?: string;
	tooltip?: string;
};
type selectInput = {
	type: "select";
	name: string;
	label?: string;
	required: boolean;
	default?: string;
	options: Array<{ label?: string; value: string }>;
	placeholder: string;
	tooltip?: object;
};

type input = selectInput | otherInput;

export default function Form({
	formStatusUpdate,
	type,
	_id,
	wrapperStyle,
	formStyle,
	title
}: {
	formStatusUpdate: (status: any) => void;
	type: string;
	_id?: string;
	wrapperStyle?: CSSProperties;
	formStyle?: CSSProperties;
	title?:string;
}) {
	
	//Cannot create form without type
	if (!type) return <></>;

	const [inputs, setInputs] = useState<{ status?: string; inputs?: input[] }>({
		status: "loading",
	});
	const [formData, setFormData] = useState<any>({});
	const [formStatus, setFormStatus]: [
		FormStatus: {
			error: boolean;
			status: "none" | "submitted" | "submitting" | "error";
		},
		setFormStatus: any
	] = useState({
		error: false,
		status: "none",
	});

	// tootip
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);

	// form upload
	const [file, setFile] = useState(undefined);
	const [filePerc, setFilePerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(false);
	const [uploadUrl, setUploadUrl] = useState("");
	const [fileExists, setFileExists] = useState(false);
	// let uploadUrl: string = ''
	// console.log(uploadUrl)

	// console.log(file)

	useEffect(() => {
		if (file) {
			setUploadUrl("");
			handleFileUpload(file, type);
		}
	}, [file]);

	// upload profile picture
	const [profilePhoto, setProfilePhoto] = useState(undefined);

	const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

	const photoRef = useRef(null);

	useEffect(() => {
		if (profilePhoto) {
			setProfilePhotoUrl("");
			handleFileUpload(profilePhoto, type);
		}
	}, [profilePhoto]);

	const handleFileUpload = (file, type) => {
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
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					// console.log(downloadURL)
					if (type === "profile") {
						setProfilePhotoUrl(downloadURL);
					} else {
						setUploadUrl(downloadURL);
					}
				});
			}
		);
	};

	///////////////////////////////////////////////////////////////////

	useEffect(() => {
		(async () => {
			try {
				const inputs = await getInput(type);
				if (_id) {
					setFormData({ loading: true });
					let formData = await getDataAny(type, _id);
					setFormData(formData);
					setUploadUrl(formData.uploadUrl);
					
					setProfilePhotoUrl(formData.profileUrl);
					
					if (!formData.profileUrl) {
						setProfilePhotoUrl("user.png");
					}
				} else setFormData({ loading: false });
				setInputs({ status: "loaded", inputs });
				let a = inputs?.filter?.((e) => e.type === "file");
				if (a?.length > 0) setFileExists(true);
			} catch (e) {
				setInputs({ status: "error" });
				console.error(e);
			}
		})();
	}, [type, _id || ""]);

	/* Select component */
	function SelectComponent({
		options,
		name,
		defaultValue,
		placeholder,
	}: {
		options: Array<{ label?: string; value: string }> | Array<string>;
		name: string;
		defaultValue: string;
		placeholder: string;
	}) {
		if (typeof options[0] == "string") {
			return (
				<select  name={name} defaultValue={defaultValue || ""}>
					{options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			);
		}

		return (
			<select name={name} defaultValue={defaultValue || ""}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label || option.value}
					</option>
				))}
			</select>
		);
	}


	if (inputs.status === "loading" || formData.loading === true)
		return (
			<p style={{ color: wrapperStyle?.["color"] || "white" }}>Loading form...</p>
		);

	if (inputs.status === "error")
		return (
			<p style={{ color: wrapperStyle?.["color"] || "white" }}>
				Error... Please try again later.
			</p>
		);

	return (
		<div className={styles.formWrapper} style={wrapperStyle}>
			<form
				style={formStyle}
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					uploadUrl && formData.append("uploadUrl", uploadUrl) 
					profilePhotoUrl && formData.append("profileUrl", profilePhotoUrl);
					// const data = Object.fromEntries(formData)
					// console.log(data)

					// const newData = { ...data, uploadUrl }
					// console.log(newData)
					// console.log(data)
					// console.log(uploadUrl)

					setFormStatus({ status: "submitting" });
					startTransition(() => {
						handleUpsertAny(formData)
							.then(() => {
								setFormStatus({ status: "submitted", error: false });
								formStatusUpdate({});
							})
							.catch(() => {
								setFormStatus({ status: "submitted", error: true });
								formStatusUpdate({});
							});
					});
				}}
			>
				<h2 className={styles.title}>{title || "Submit Form"}</h2>
				<span>
					{_id && <input type="hidden" name="_id" value={_id || ""} />}
					<input type="hidden" name="type" value={type} />
				</span>
				{inputs?.inputs?.map((e) => {
					console.log(e.tooltip && e.tooltip['one']);
					
					return (
						<span key={(e.name || e.label || Math.random()) + "Key"}>
							<b>
								<div className={styles.quartileContainer}>
									<label htmlFor={e.name || e.label}>
										{ e.label || e.placeholder || e.name}
									</label>
									
									{e.tooltip ? (
										<button
											type="button"
											onClick={() => {
												setIsTooltipVisible(!isTooltipVisible);
											}}
										>
											i
										</button>
									) : null}
									{e.tooltip && isTooltipVisible ? (
										<div className={styles.quartileTooltip}>
											<p>{e.tooltip && e.tooltip['one']}</p>
											<p>{e.tooltip && e.tooltip['two']}</p>
											<p>{e.tooltip && e.tooltip['three']}</p>
											<p>{e.tooltip && e.tooltip['one']}</p>
										</div>
									) : null}
								</div>
							</b>
							{e.type === "select" ? (
								<SelectComponent
									name={e.name}
									options={(e as selectInput).options}
									defaultValue={
										formData?.[e.name] || formData?.[e.label] || e.default || ""
									}
									placeholder={(e as selectInput).placeholder}
								/>
							) : e.type === "file" && e.name === "profilePhoto" ? (
								<section
									style={{
										display: "flex",
										flexDirection: "column",
										width: "220px",
										justifyContent: "center",
										alignItems: "center",
										marginBlock: "1rem",
									}}
								>
									<figure
										style={{
											borderWidth: "1px",
											borderStyle: "solid",
											borderColor: "lightgray",
											borderRadius: "1rem",
											width: "min-content",
											display: "flex",
											justifyContent: "center",
											alignItems: "center",
											overflow: "hidden",
											margin: 0,
										}}
									>
										<img
											src={profilePhotoUrl}
											alt="profile"
											width={200}
											height={200}
											style={{ objectFit: "cover" }}
										/>
									</figure>
									<div>
										<input
											hidden
											ref={photoRef}
											type="file"
											accept="image/*"
											onLoad={() => setFileExists(true)}
											onChange={(e) => {
												// setFile(e.target.files[0])
												// console.log(e.target.files[0])
												setProfilePhoto(e.target.files[0]);
											}}
											name={e.name}
											placeholder={(e as otherInput).placeholder || " "}
											required={e.required || false}
											defaultValue={
												formData?.[e.name] ||
												formData?.[e.label] ||
												e.default ||
												""
											}
										/>
										<p style={{ textAlign: "center" }}>
											{fileUploadError ? (
												<span style={{ color: "white" }}>
													Error in profilePhoto uplaod
												</span>
											) : filePerc > 0 && filePerc < 100 ? (
												<span
													style={{ color: "white" }}
												>{`Uploading ${filePerc}%...`}</span>
											) : filePerc === 100 ? (
												<span style={{ color: "white" }}>
													Profile Photo Succesfully uploaded
												</span>
											) : (
												""
											)}
										</p>
									</div>
									<button
										type="button"
										style={{
											width: "90%",
											padding: ".4rem",
											border: "none",
											borderRadius: ".4rem",
											fontWeight: "bold",
										}}
										onClick={() => photoRef.current.click()}
									>
										CHANGE
									</button>
								</section>
							) : e.type === "file" ? (
								<div>
									<input
										type="file"
										accept="*/*"
										onChange={(e) => {
											setFile(e.target.files[0]);
											// console.log(e.target.files[0])
										}}
										name={e.name}
										placeholder={(e as otherInput).placeholder || " "}
										required={e.required || false}
										defaultValue={
											formData?.[e.name] ||
											formData?.[e.label] ||
											e.default ||
											""
										}
									/>
									<p>
										{fileUploadError ? (
											<span style={{ color: "white" }}>
												Error in file uplaod
											</span>
										) : filePerc > 0 && filePerc < 100 ? (
											<span
												style={{ color: "white" }}
											>{`Uploading ${filePerc}%...`}</span>
										) : filePerc === 100 ? (
											<span style={{ color: "white" }}>
												File Succesfully uploaded
											</span>
										) : (
											""
										)}
									</p>
								</div>
							) : (
								<input
									type={e.type || "text"}
									name={e.name}
									placeholder={(e as otherInput).placeholder || " "}
									required={e.required || false}
									defaultValue={
										formData?.[e.name] || e.default || formData?.[e.label] || ""
									}
								/>
							)}
						</span>
					);
				})}
				<span>
					<input
						className={styles.submit}
						type="submit"
						disabled={
							fileExists && !(profilePhotoUrl || uploadUrl) ? true : false
						}
						style={{
							opacity: fileExists && !(profilePhotoUrl || uploadUrl) ? 0.3 : 1,
						}}
						value={
							formStatus.status === "submitting" ? "SUBMITTING.." : "SUBMIT"
						}
					/>

					<button
						className={styles.cancel}
						onClick={(e) => {
							e.preventDefault();
							formStatusUpdate({});
						}}
						style={{ marginLeft: "10px" }}
					>
						CANCEL
					</button>
				</span>
			</form>
			
		</div>
	);
}
