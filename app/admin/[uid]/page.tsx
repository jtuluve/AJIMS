"use client";
import { useState, useEffect } from "react";
import { useAdminData } from "@/components/adminContext";

const UserDetail = ({ params }) => {
	const { uid } = params;
	const { allUsers } = useAdminData();
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (allUsers.length > 0) {
			const fetchedUser = allUsers.find((unitUser) => unitUser.uid === uid);
			setUser(fetchedUser);
		}
	}, [allUsers, uid]);

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="user-detail">
			<h1>User Details</h1>
			<p><strong>Name:</strong> {user.name}</p>
			<p><strong>Email:</strong> {user.email}</p>
			<p><strong>Department:</strong> {user.department}</p>
			<p><strong>Designation:</strong> {user.designation}</p>
			<h2>Appraisal Details</h2>
			<div>
				<h3>Research</h3>
				<p><strong>Score:</strong> {user.appraisal?.research?.score?.score}</p>
				<p><strong>Category:</strong> {user.appraisal?.research?.score?.category}</p>
				{user.appraisal?.research?.publications?.map((publication, index) => (
					<div key={index}>
						<h4>Publication {index + 1}</h4>
						<p><strong>Title:</strong> {publication?.title}</p>
						<p><strong>Journal Name:</strong> {publication?.journalName}</p>
						<p><strong>Quartile:</strong> {publication?.quartile}</p>
						<p><strong>Index:</strong> {publication?.index}</p>
						<p><strong>DOI:</strong> {publication?.doi}</p>
						<p><strong>Authorship:</strong> {publication?.authorship}</p>
						<p><strong>Upload URL:</strong> <a href={publication?.uploadUrl} download>View upload document</a></p>
						<p><strong>Author:</strong> {publication?.author}</p>
						<p><strong>Volume:</strong> {publication?.volume}</p>
						<p><strong>Issue:</strong> {publication?.issue}</p>
						<p><strong>Year:</strong> {publication?.year}</p>
						<p><strong>Page Number:</strong> {publication?.pageNo}</p>
					</div>
				))}
			</div>
			<div>
				<h3>Academics</h3>
				<p><strong>Score:</strong> {user.appraisal?.academics?.score?.score}</p>
				<p><strong>Category:</strong> {user.appraisal?.academics?.score?.category}</p>
				<p><strong>Teaching Hours:</strong> {user.appraisal?.academics?.teaching?.hours}</p>
				<p><strong>Clinical Hours:</strong> {user.appraisal?.academics?.teaching?.clinicalHours}</p>
				<p><strong>Students Feedback:</strong> {user.appraisal?.academics?.teaching?.studentsFeedback}</p>
			</div>
			<div>
				<h3>Professional</h3>
				<p><strong>Score:</strong> {user.appraisal?.professional?.score?.score}</p>
				<p><strong>Category:</strong> {user.appraisal?.professional?.score?.category}</p>
				<p><strong>Clinical Duty Patients:</strong> {user.appraisal?.professional?.clinicalDuty?.patients}</p>
				<p><strong>Post Held Category:</strong> {user.appraisal?.professional?.postHeld?.category}</p>
			</div>
		</div>
	);
};

export default UserDetail;
