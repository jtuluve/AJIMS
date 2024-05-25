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
		<div>
			<h1>Faculty Details</h1>
			<div>
				<p>Research score</p>
				<p><strong>Score:</strong> {user.appraisal?.research?.score?.score}</p>
				<p><strong>Category:</strong> {user.appraisal?.research?.score?.category}</p>
				<p>Academics score</p>
				<p><strong>Score:</strong> {user.appraisal?.academics?.score?.score}</p>
				<p><strong>Category:</strong> {user.appraisal?.academics?.score?.category}</p>
				<p>Professional score</p>
				<p><strong>Score:</strong> {user.appraisal?.professional?.score?.score}</p>
				<p><strong>Category:</strong> {user.appraisal?.professional?.score?.category}</p>
			</div>
			<p><strong>Name of the Faculty:</strong> {user?.profile?.name}</p>
			<p><strong>Age & Date of birth:</strong>{user?.profile?.age} Years, {user?.profile?.dob}</p>
			<p><strong>Profile Photo:</strong> <a href={user?.profile?.profilephoto} download>View upload document</a></p>
			<p><strong>Aadhar No:</strong> {user?.profile?.aadharNo}</p>
			<p><strong>Passport No:</strong> {user?.profile?.passportNo}</p>
			<p><strong>Phone no:</strong> {user?.profile?.phoneNo}</p>
			<p><strong>Date of joining:</strong> {user?.profile?.dateOfJoining}</p>
			<p><strong>Attachment:</strong> <a href={user?.profile?.attachment} download>View upload document</a></p>
			<p><strong>Email:</strong> {user.email}</p>
			<p><strong>Department:</strong> {user?.profile?.department}</p>
			<p><strong>Designation:</strong> {user?.profile?.designation}</p>
			<p><strong>Residencial Adderss:</strong> {user?.profile?.residentialAddress}</p>
			<p><strong>KMC Registration No:</strong> {user?.profile?.kmcRegistrationNo}</p>
			<p><strong>Educational Qualification:</strong> {user?.profile?.educationalQualification}</p>
			<p><strong>Experience:</strong> {user?.profile?.experience}</p>
		</div>
		<h2>Appraisal Details</h2>
		<div>
			<h3>Research</h3>
			<h4>Publication details</h4>
			{user.appraisal?.research?.publications?.map((publication, index) => (
				<div key={index}>
					<h4>Publication {index + 1}</h4>
					<p><strong>Title:</strong> {publication?.title}</p>
					<p><strong>Author:</strong> {publication?.author}</p>
					<p><strong>Journal Name:</strong> {publication?.journalName}</p>
					<p><strong>Volume:</strong> {publication?.volume}</p>
					<p><strong>Issue:</strong> {publication?.issue}</p>
					<p><strong>Page No</strong> {publication?.pageNo}</p>
					<p><strong>Year:</strong> {publication?.year}</p>
					<p><strong>Quartile:</strong> {publication?.quartile}</p>
					<p><strong>Index:</strong> {publication?.index}</p>
					<p><strong>Category:</strong> {publication?.CategoryP}</p>
					<p><strong>Post held:</strong> {publication?.postheld}</p>
					<p><strong>DOI:</strong> {publication?.doi}</p>
					<p><strong>Authorship:</strong> {publication?.authorship}</p>
					<p><strong>Upload URL:</strong> <a href={publication?.uploadUrl} download>View upload document</a></p>
				</div>
			))}
			<h4>Grant details</h4>
			{user.appraisal?.research?.grants?.map((grant, index) => (
				<div key={index}>
					<h4>Grant {index + 1}</h4>
					<p><strong>Title:</strong> {grant?.title}</p>
					<p><strong>Agency:</strong> {grant?.agency}</p>
					<p><strong>Start year:</strong> {grant?.startyear}</p>
					<p><strong>End year:</strong> {grant?.endyear}</p>
					<p><strong>Received:</strong> {grant?.recieved}</p>
					<p><strong>Utilization Certificate:</strong> {grant?.utCert}</p>
					<p><strong>Work Published:</strong> {grant?.workpub}</p>
					<p><strong>Amount Category:</strong> {grant?.amountCategory}</p>
					<p><strong>Upload URL:</strong> <a href={grant?.file} download>View upload document</a></p>
				</div>
			))}
			<h4>Books details</h4>
			{user.appraisal?.research?.books?.length > 0 ? (
				user.appraisal.research.books.map((books, index) => (
				<div key={index}>
					<h4>Book {index + 1}</h4>
					<p><strong>Authorship:</strong> {books?.authorship}</p>
					<p><strong>Category:</strong> {books?.category}</p>
					<p><strong>Title:</strong> {books?.title}</p>
					<p><strong>Year:</strong> {books?.year}</p>
					<p><strong>Certificate:</strong> <a href={books?.Certificate} download>View upload document</a></p>
					<p><strong>Book details:</strong> {books?.bookdetails}</p>
					<p><strong>Upload URL:</strong> <a href={books?.uploadUrl} download>View upload document</a></p>
				</div>
				))
			) : (
				<p>No books available.</p>
			)}
			<h4>Guidance details</h4>
			{user.appraisal?.research?.guidance?.map((guidance, index) => (
				<div key={index}>
					<h4>guidance {index + 1}</h4>
					<p><strong>Category:</strong> {guidance?.category}</p>
					<p><strong>Student Details:</strong> {guidance?.studentdetails}</p>
					<p><strong>Uploaded file:</strong> <a href={guidance?.studentupload} download>View upload document</a></p>
					<p><strong>Start date:</strong> {guidance?.startdate}</p>
					<p><strong>End date:</strong> {guidance?.enddate}</p>
					<p><strong>Name:</strong> {guidance?.name}</p>
					<p><strong>Title:</strong> {guidance?.title}</p>
					<p><strong>Publish Status:</strong> {guidance?.publishstatus}</p>
					<p><strong>Year:</strong> {guidance?.year}</p>
					<p><strong>Amount:</strong> {guidance?.Amount}</p>
					<p><strong>Grant Name:</strong> {guidance?.GrantName}</p>
					<p><strong>Funded Status:</strong> {guidance?.FundedStatus}</p>
					<p><strong>Agency Name:</strong> {guidance?.AgencyName}</p>
					<p><strong>Synopsis:</strong> <a href={guidance?.synopsis} download>View upload document</a></p>
					<p><strong>Thesis:</strong> <a href={guidance?.thesis} download>View upload document</a></p>
					<p><strong>Report:</strong> <a href={guidance?.report} download>View upload document</a></p>
				</div>
			))}
			<h4>Conferences details</h4>
			{user.appraisal?.research?.conferences?.map((conferences, index) => (
				<div key={index}>
					<h4>conference {index + 1}</h4>
					<p><strong>Category:</strong> {conferences?.category}</p>
					<p><strong>Conference Name:</strong> {conferences?.confname}</p>
					<p><strong>Year:</strong> {conferences?.year}</p>
					<p><strong>Details:</strong> {conferences?.details}</p>
					<p><strong>Conference type:</strong> {conferences?.type}</p>
					<p><strong>Place of the conference:</strong> {conferences?.place}</p>
					<p><strong>Awards:</strong> {conferences?.awards}</p>
					<p><strong>Awards Description:</strong> {conferences?.description}</p>
					<p><strong>Attachment:</strong> <a href={conferences?.Attachment} download>View upload document</a></p>
				</div>
			))}
		</div>
		<div>
			<h3>Academics</h3>
			<h4>Teaching</h4>
			{user.appraisal?.academics?.teaching ? (
				<div>
					<p><strong>Teaching Hours:</strong> {user.appraisal?.academics?.teaching?.hours}</p>
					<p><strong>Attachment:</strong> <a href={user.appraisal?.academics?.teaching?.hourupload} download>View upload document</a></p>
					<p><strong>Clinical Hours:</strong> {user.appraisal?.academics?.teaching?.clinicalHours}</p>
					<p><strong>Attachment:</strong> <a href={user.appraisal?.academics?.teaching?.clinicalHoursupload} download>View upload document</a></p>
					<p><strong>Students Feedback:</strong> {user.appraisal?.academics?.teaching?.studentsFeedback}</p>
					<p><strong>Attachment:</strong> <a href={user.appraisal?.academics?.teaching?.studentsFeedbackupload} download>View upload document</a></p>
					<p><strong>Resource material:</strong> {user.appraisal?.academics?.teaching?.resourceMaterial}</p>
					<p><strong>Attachment:</strong> <a href={user.appraisal?.academics?.teaching?.resourceMaterialupload} download>View upload document</a></p>
					<p><strong>Public Awareness Writeup:</strong> {user.appraisal?.academics?.teaching?.publicAwarenessWriteup}</p>
					<p><strong>Attachment:</strong> <a href={user.appraisal?.academics?.teaching?.publicAwarenessWriteupupload} download>View upload document</a></p>
					<p><strong>CC:</strong> {user.appraisal?.academics?.teaching?.cc}</p>
					<p><strong>Attachment:</strong> <a href={user.appraisal?.academics?.teaching?.ccupload} download>View upload document</a></p>
				</div>
			) : (
				<p>No teaching data available</p>
			)}
		</div>
		<div>
			<h3>Professional</h3>
				<h4>Clinical Duty</h4>
				{user.appraisal?.professional?.clinicalDuty ? (
					<div>
						<p><strong>Number of patients:</strong> {user.appraisal?.professional?.clinicalDuty?.Patients}</p>
						<p><strong>Minor Procedures:</strong> {user.appraisal?.professional?.clinicalDuty?.minorProcedures}</p>
						<p><strong>Major Procedures:</strong> {user.appraisal?.professional?.clinicalDuty?.majorProcedures}</p>
						<p><strong>Clinical Duty File:</strong> <a href={user.appraisal?.professional?.clinicalDuty?.clinicalDutyFile} download>View upload document</a></p>
					</div>
				) : (
					<p>No clinical duty data available</p>
				)}
				<h4>Post held</h4>
				{user.appraisal?.professional?.postHeld ? (
					<div>
						<p><strong>Category:</strong> {user.appraisal?.professional?.postHeld?.category}</p>
						<p><strong>Post held File:</strong> <a href={user.appraisal?.professional?.postHeld?.postHeldFile} download>View upload document</a></p>
					</div>
				) : (
					<p>No teaching data available</p>
				)}
				<h4>Exam Duties</h4>
				{user.appraisal?.professional?.examDuties?.map((examDuties, index) => (
					<div key={index+1}>
						<p><strong>Category 1:</strong> {examDuties?.category1}</p>
						<p><strong>Category 2:</strong> {examDuties?.category2}</p>
						<p><strong>Exam duty File:</strong> <a href={examDuties?.examDutyFile} download>View upload document</a></p>
					</div>
				))}
				<h4>Coordinator Duties</h4>
				{user.appraisal?.professional?.coordinatorDuty ? (
					<div>
						<p><strong>Category:</strong> {user?.appraisal?.professional?.coordinatorDuty?.category}</p>
						<p><strong>Coordinator duty File:</strong> <a href={user?.appraisal?.professional?.coordinatorDuty?.coordinatorDutyFile} download>View upload document</a></p>
					</div>
				) : (
					<p>No coordinator duties available</p>
				)}
				<h4>Committee Duties</h4>
				{user.appraisal?.professional?.committee?.map((committee, index) => (
					<div key={index+1}>
						<p><strong>Committe Name:</strong> {committee?.committeeName}</p>
						<p><strong>Destination:</strong> {committee?.destination}</p>
						<p><strong>Committee File:</strong> <a href={committee?.committeeFile} download>View upload document</a></p>
					</div>
				))}
				<h4>Conferences</h4>
				{user.appraisal?.professional?.conference?.map((conference, index) => (
					<div key={index+1}>
						<p><strong>Designation:</strong> {conference?.designation}</p>
						<p><strong>Credit Points:</strong> {conference?.creditPoints}</p>
						<p><strong>Conference File:</strong> <a href={conference?.conferenceFile} download>View upload document</a></p>
					</div>
				))}
				<h4>Guest Lectures</h4>
				{user.appraisal?.professional?.guestLectures?.map((guestLectures, index) => (
					<div key={index+1}>
						<p><strong>Number:</strong> {guestLectures?.number}</p>
						<p><strong>Category:</strong> {guestLectures?.category}</p>
						<p><strong>Guest Lecture File:</strong> <a href={guestLectures?.guestLecturesFile} download>View upload document</a></p>
					</div>
				))}
		</div>
	</div>
	);
};

export default UserDetail;
