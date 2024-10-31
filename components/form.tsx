"use client";

import { getInput } from "@/lib/formFunctions";
import { handleUpsertAny } from "@/lib/mongoose/serverActions";
import styles from "@css/form.module.css";
import tableStyles from "@css/table.module.css";
import { CSSProperties, ChangeEvent, startTransition, useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../app/firebase";
import { useFormStateContext } from "./formstateContext";
import { useUserData } from "./UserDataContext";
import { getUserObject } from "@/lib/mongoose/functions";
import { FileState } from "@/lib/mongoose/interface";

interface OtherInput {
	type: string;
	name: string;
	label?: string;
	required: boolean;
	default?: string;
	placeholder?: string;
	tooltip?: string;
	properties?: Record<any,any>;
};
interface SelectInput {
	type: "select";
	name: string;
	label?: string;
	required: boolean;
	default?: string;
	options: Array<{ label?: string; value: string }>;
	placeholder?: string;
	tooltip?: object;
};

type Input = SelectInput | TableInput | OtherInput;

interface TableInput {
	type: "table";
	name: string;
	label?: string;
	required: boolean;
	default?: string;
	inputs: Input[];
	placeholder?: string;
	tooltip?: object;
}

export default function Form({
	wrapperStyle,
	formStyle,
	title
}: {
	wrapperStyle?: CSSProperties;
	formStyle?: CSSProperties;
	title?: string;
}) {
	const { formState, setFormState } = useFormStateContext();
	const {setUserData} = useUserData();
	let formData = formState?.data;

  useEffect(()=>{
    (async()=>{
      setUserData(await getUserObject())
    })()
  },[formState])
	
	const [inputs, setInputs] = useState<{ status?: string; inputs?: Array<Input> }>({
		status: "loading",
	});
	const [formStatus, setFormStatus] = useState<{
		error: boolean;
		status: "none" | "submitted" | "submitting" | "error";
	}>({
		error: false,
		status: "none",
	});
	
	// tootip
	const [isTooltipVisible, setIsTooltipVisible] = useState(false);
	
	// file upload
	const [files, setFiles] = useState<Record<any, FileState>>({});
	const [filePerc, setFilePerc] = useState(0);
	const [fileUploadError, setFileUploadError] = useState(false);

	//submit button state
	const [canSubmit, setCanSubmit] = useState(false);

	//profile photo states
	const [profilePhoto, setProfilePhoto] = useState(undefined);
	const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
	const photoRef = useRef(null);

	//table input state
	const [tableData, setTableData] = useState<Record<string, Array<any>>>({});

	//All effects
	useEffect(() => {
		if (profilePhoto) {
			setProfilePhotoUrl("");
			handleFileUpload(profilePhoto, "profileUrl");
		}
	}, [profilePhoto]);

	useEffect(()=>{
		let canSubmit = true;
		if(!profilePhotoUrl) canSubmit = false;
		Object.keys(files)?.forEach(name=>{ if(files[name].required && !(files[name].url)) canSubmit = false });
		Object.keys(tableData)?.forEach(name=>{
			let tableInput = inputs?.inputs?.find(e=>e.name===name);
			if(!tableInput) return;
			tableData[name].forEach(data => {
				(tableInput as TableInput).inputs?.forEach(input=>{ if(input.required && !(data[input.name])) canSubmit = false })
			});
		})
		setCanSubmit(canSubmit);
	},[files, tableData, profilePhotoUrl])

	useEffect(() => {
		setFilePerc(0);
		setFileUploadError(false);
		setInputs({status:"loading"})
		setCanSubmit(true)
		setTableData({})
		setFiles({})
		if(formState.type)
		(async () => {
			try {
				const inputs = await getInput(formState?.type);
				if (!(formData?.profileUrl)) {
					setProfilePhotoUrl("user.png");
				}
				else setProfilePhotoUrl(formData?.profileUrl);
				setInputs({ status: "loaded", inputs });
				let a = inputs?.filter?.((e) => e.type === "file" && e.name !== "profileUrl");
				if (a?.length !== 0) setCanSubmit(false);
				a?.forEach( e=>setFiles( (prev)=>({ ...prev, [e.name]:{ name:e.name, required: e.required, url: formData?.[e.name] }}) ) );
				a = inputs.filter(e=>e.type==="table");
				a.forEach(e=>setTableData((prev)=>({ ...prev, [e.name]:formData?.[e.name]||[] })));
			} catch (e) {
				setInputs({ status: "error" });
				console.error(e);
			}
		})();
	}, [formState?.type, formState?._id]);
		
	const handleFileUpload = (file, name, percSet?) => {
		setCanSubmit(false);
		const storage = getStorage(app);
		const fileName = Date.now() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);
		
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				if (name === "profileUrl") {
					setFilePerc(Math.round(progress));
				} else {
					percSet(Math.round(progress));
				}
			},
			(error) => {
				console.log(error);
				percSet(-1);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					if (name === "profileUrl") {
						setFiles((prevFiles) => ({
							...prevFiles,
							[name]: { ...file[name], url: downloadURL, message: "Uploaded" }
						}));
						setProfilePhotoUrl(downloadURL);
					} else {
						setFiles((prevFiles) => ({
							...prevFiles,
							[name]: { ...file[name], url: downloadURL, message: "Uploaded" }
						}));
					}
				});
			}
		);
	};

	if (!(formState?.type)) return <></>;
	if (inputs?.status === "loading" || !(inputs?.inputs))
		return (
			<p style={{ color: wrapperStyle?.["color"] || "white" }}>Loading form...</p>
		);
		
	if (inputs?.status === "error" || formStatus?.error)
	return (
		<>
			<p style={{ color: wrapperStyle?.["color"] || "white" }}>
				Error... Please try again later.
			</p>
			<button
				className={styles.cancel}
				onClick={(e) => {
					e.preventDefault();
					setFormState({});
					setInputs({});
				}}
			>
				CLOSE
			</button>
		</>
	);

	return (
		<div className={styles.formWrapper} style={wrapperStyle}>
			<form
				style={formStyle}
				onSubmit={(e) => {
					e.preventDefault();
					const formData = new FormData(e.currentTarget);
					Object.keys(files).forEach(filename=>{
						formData.set(filename, files[filename].url);
					})
					Object.keys(tableData).forEach(tableName=>{
						formData.set(tableName, JSON.stringify(tableData[tableName]));
					})
					
					profilePhotoUrl && formData.append("profileUrl", profilePhotoUrl);
					setFormStatus({ status: "submitting", error: false });
					startTransition(() => {
						handleUpsertAny(formData)
							.then(() => {
								setFormStatus({ status: "submitted", error: false });
								setFormState({submitted: true});
							})
							.catch(() => {
								setFormStatus({ status: "submitted", error: true });
								setFormState({});
							});
					});
				}}
			>
				<h2 className={styles.title}>{title || "Submit Form"}</h2>
				<span>
					{formState?._id && <input type="hidden" name="_id" value={formState?._id || ""} />}
					<input type="hidden" name="type" value={formState?.type} />
				</span>
				{inputs?.inputs?.map((e) => {	
					return (
						<span key={(e.name || e.label || Math.random()) + "Key"}>
							<b>
								<div className={styles.quartileContainer}>
									<label htmlFor={e.name || e.label}>
										{(e.label || e.placeholder || e.name) + (e.required?' *':'')}
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
											<p>{e.tooltip && e.tooltip['four']}</p>
										</div>
									) : null}
								</div>
							</b>
							{e.type === "select" ? (
								<SelectComponent
									name={e.name}
									options={(e as SelectInput).options}
									defaultValue={
										formData?.[e.name] || formData?.[e.label] || e.default || ""
									}
									placeholder={(e as SelectInput).placeholder}
									onChange={(event)=>{
									if(formData?.[e.name]) formData[e.name] = event.target.value;
									if(formData?.[e.label]) formData[e.label] = event.target.value;
									e.default = event.target.value;
									}}
								/>
							) : e.type === "file" && e.name === "profileUrl" ? (
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
											onChange={(e) => {
												setProfilePhoto(e.target.files[0]);
											}}
											name={e.name}
											placeholder={(e as OtherInput).placeholder || " "}
											required={e.required || false}
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
												<span style={{ color: wrapperStyle?.["color"] || "white" }}>
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
								<FileInput color={wrapperStyle?.["color"] || "white"} input={e} handleFileUpload={handleFileUpload} url={formData?.[e.name]}/>
							) : e.type === "table" ? ( 
								<InputTable tableName={e.name} setTables={setTableData} inputs={(e as TableInput).inputs}  setCanSubmit={setCanSubmit} values={tableData?.[e.name]||[]}/>
							) : (
								<input
									type={e.type || "text"}
									name={e.name}
									placeholder={(e as OtherInput).placeholder || " "}
									required={e.required || false}
									defaultValue={
										e.type==="date"? formData?.[e.name]?.slice(0, 10) || e.default || "" : formData?.[e.name] || e.default || ""
									}
									{...((e as OtherInput)?.properties)}
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
							!canSubmit ? true : false
						}
						style={{
							opacity: !canSubmit ? 0.3 : 1,
						}}
						value={
							formStatus.status === "submitting" ? "SUBMITTING.." : "SUBMIT"
						}
					/>
					<button
						className={styles.cancel}
						onClick={(e) => {
							e.preventDefault();
							setFormState({});
							setInputs({})
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

function SelectComponent({
	options,
	name,
	defaultValue,
	onChange,
	onLoad
}: {
	options: Array<{ label?: string; value: string }> | Array<string>;
	name: string;
	defaultValue: string;
	placeholder: string;
	onChange: (event: any) => void;
	onLoad?: () => void;
}) {

	useEffect(()=>{
		onLoad?.();
	},[])
	if (typeof options[0] == "string") {
		return (
			<select name={name} onChange={onChange} onLoad={onLoad} defaultValue={defaultValue} title="Select an option">
			{options.map((option) => (
				<option key={option} value={option}>
					{option}
				</option>
			))}
		</select>
	);
}

return (
	<select name={name} defaultValue={defaultValue || ""} title="Select an option">
		{options.map((option) => (
			<option key={option.value} value={option.value}>
				{option.label || option.value}
			</option>
		))}
	</select>
);
}


function FileInput({ input, handleFileUpload, url, color }){
	const [perc, setPerc] = useState(0);

	return(
	<div>
		<input
			type="file"
			accept="*/*"
			onChange={(event) => handleFileUpload(event.target.files[0], input.name, setPerc)}
			name={input.name}
			placeholder={input.placeholder || " "}
		/>
		{url && <a href={url}>view current file</a>}
		<p>
			{perc===-1 ? (
				<span style={{ color: color || "white" }}>
					Upload failed. Please, check your internet and try uploading the file again.
				</span>
			) : perc > 0 && perc < 100 ? (
				<span
					style={{ color: color || "white" }}
				>{`Uploading ${perc}%...`}</span>
			) : perc === 100 ? (
				<span style={{ color: color || "white" }}>
					File Succesfully uploaded
				</span>
			) : (
				""
			)}
		</p>
	</div>
	)
}


function InputTable({ tableName, inputs, setTables, values, setCanSubmit }:{ tableName:string, inputs: Input[], setTables: (v)=>void, values:Array<any>, setCanSubmit: (v)=>void }){
	const handleFileUpload = (file, name, percSet?, value?) => {
		setCanSubmit(false);
		const storage = getStorage(app);
		const fileName = Date.now() + file.name;
		const storageRef = ref(storage, fileName);
		const uploadTask = uploadBytesResumable(storageRef, file);
		
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					percSet(Math.round(progress));
			},
			(error) => {
				console.log(error);
				percSet(-1);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					if(value)
						value[name] = downloadURL;
					setTables((prev)=>({...prev}));
				});
			}
		);
	};
	
	return (
		<div className={tableStyles["table"]} style={{overflow:"auto"}}>
			<div
				className={tableStyles["table-header"]}
				style={{
					gridTemplateColumns: `repeat(${inputs.length}, calc(100%/${inputs.length} - 50px/${inputs.length})) 50px`,
				}}
			>
				{inputs.map((input: any) => (
					<h4 key={input.name} style={{fontSize:"small"}}>{input.label + (input.required ? " *" : "")}</h4>
				))}
			</div>
			{values.map?.((value: any, index) => (
				<div
					key={index} 
					className={tableStyles["table-row"]}
					style={{
						gridTemplateColumns: `repeat(${inputs.length}, calc(100%/${inputs.length} - 50px/${inputs.length})) 50px`,
					}}
				>
					{inputs.map((input: any) => (
						<span style={{minWidth:"25px"}}>
							{input.type === "file" ? (
								<FileInput
									color={"gray"}
									handleFileUpload={(file, name, percSet)=>handleFileUpload(file, name, percSet, value)}
									input={input}
									url={value[input.name]}
								/>
							) : input.type === "select" ? (
								<SelectComponent
									name={input.name}
									options={input.options}
									defaultValue={
										value?.[input.name] ||
										value?.[input.label] ||
										input.default ||
										""
									}
									placeholder={input.placeholder}
									onChange={(event) => {
										value[input.name] = event.target.value;
										setTables((prev)=>({...prev, ...values}));
									}}
									onLoad={() => {
										value[input.name] = value?.[input.name] || value?.[input.label] || input.default || "";
										setTables((prev)=>({...prev, ...values}));
									}}
								/>
							) : (
								<input
									type={input.type || "text"}
									name={input.name}
									placeholder={input.placeholder || " "}
									required={input.required || false}
									defaultValue={
										input.type==="date"? value?.[input.name]?.slice(0, 10) || input.default || "" : value?.[input.name] || input.default || ""
									}
									onChange={(event) => {
										value[input.name] = event.target.value;
										setTables((prev)=>({...prev, ...values}));
									}}
									{...input.properties}
								/>
							)}
						</span>
					))}
					<span>
						<button
							className={tableStyles["remove"]}
							onClick={(e) => {
								e.preventDefault();
								setTables((prev) => ({
									...prev,
									[tableName]: [
										...prev[tableName].slice(0, index),
										...prev[tableName].slice(index + 1),
									],
								}));
							}}
						>
							<i className="material-symbols-outlined">delete</i>
						</button>
					</span>
				</div>
			))}
			<div className={tableStyles["addRowBtnDiv"]}>
				<button
					style={{ gridColumn: `${Math.round(inputs.length / 2)}` }}
					onClick={(e) => {
						e.preventDefault();
						setTables((prev) => ({
							...prev,
							[tableName]: [...prev[tableName], {}],
						}));
					}}
				>
					Add
				</button>
			</div>
		</div>
	);
}