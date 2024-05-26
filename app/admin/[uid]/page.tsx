"use client";

import { useState, useEffect } from "react";
import { useAdminData } from "@/components/adminContext";
import '@css/hehe.css'
import "@css/admin.css";

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
	<div className="amdminpage">
		<div className="titlebar">
				<a className="web-name">AJIMS Employment Management</a>
				<a
					title="home"
					className="material-symbols-outlined logout"
					href="/admin"
				>
					logout
				</a>
		</div>
		<div className="user-detail">
		<div>
			<h1>Faculty Details</h1>
			<div className="scores-container">
				<div className="score-card">
					<p>Research score</p>
					<p><strong>Score:</strong> {user.appraisal?.research?.score?.score}</p>
					<p><strong>Category:</strong> {user.appraisal?.research?.score?.category}</p>
				</div>
				<div className="score-card">
					<p>Academics score</p>
					<p><strong>Score:</strong> {user.appraisal?.academics?.score?.score}</p>
					<p><strong>Category:</strong> {user.appraisal?.academics?.score?.category}</p>
				</div>
				<div className="score-card">
					<p>Professional score</p>
					<p><strong>Score:</strong> {user.appraisal?.professional?.score?.score}</p>
					<p><strong>Category:</strong> {user.appraisal?.professional?.score?.category}</p>
				</div>
			</div>
			<div className="profile-container">
				<div className="basic-info">
					<p><strong>1. Name of the Faculty:</strong> {user?.profile?.name}</p>
					<p><strong>2. Age & Date of birth:</strong>{user?.profile?.age} years, {user?.profile?.dob}</p>
					<p><strong>3. Designation:</strong> {user?.profile?.designation}</p>
					<div className="margin-body">
						<p><strong>a. Appointment order:</strong> <a href={user?.profile?.attachment} download>View upload document</a></p>
						<p><strong>b. Department:</strong> {user?.profile?.department}</p><p><strong>d. Aadhar No:</strong> {user?.profile?.aadharNo}</p>
						<p><strong>c. Experience:</strong> {user?.profile?.experience}</p>
					</div>
					<p><strong>4. Residencial Adderss:</strong> {user?.profile?.residentialAddress}</p>
					<p><strong>5. Aadhar No:</strong> {user?.profile?.aadharNo}</p>
					<p><strong>6. Contact Details:</strong></p>
					<div className="margin-body">
						<p><strong>a. Phone no:</strong> {user?.profile?.phoneNo}</p>
						<p><strong>b. Email address:</strong> {user.email}</p>	
					</div>
					<p><strong>7. Date of joining:</strong> {user?.profile?.dateOfJoining}</p>
					<p><strong>8. Joining Letter:</strong><a href={user?.profile?.joiningletter} download>View upload document</a></p>
					<p><strong>9. Educational Qualification:</strong> {user?.profile?.educationalQualification}</p>	
					<p><strong>10. Passport No:</strong> {user?.profile?.passportNo}</p>
					<p><strong>11. KMC Registration No:</strong> {user?.profile?.kmcRegistrationNo}</p>		
				</div>
				<div className="profile-photo">
					<img
						src={user?.profileUrl}
						alt="upload profile url"
						height={120}
						width={100}
					/>
				</div>
			</div>			
		</div>
		<div className="research-body">
			<div className="teaching-hours-body">
				<p><strong>12. Teaching data:</strong></p>
				{user.appraisal?.academics?.teachingArray && user.appraisal.academics.teachingArray.length > 0 ? (
					user.appraisal.academics.teachingArray.map((teaching, index) => (
						<div key={index}>
							<p><strong>Teaching Hours:</strong> {teaching.hours}</p>
							<p><strong>Attachment:</strong> <a href={teaching.hourupload} download>View upload document</a></p>
							<p><strong>Clinical Hours:</strong> {teaching.clinicalHours}</p>
							<p><strong>Attachment:</strong> <a href={teaching.clinicalHoursupload} download>View upload document</a></p>
							<p><strong>Students Feedback:</strong> {teaching.studentsFeedback}</p>
							<p><strong>Attachment:</strong> <a href={teaching.studentsFeedbackupload} download>View upload document</a></p>
							<p><strong>Resource material:</strong> {teaching.resourceMaterial}</p>
							<p><strong>Attachment:</strong> <a href={teaching.resourceMaterialupload} download>View upload document</a></p>
							<p><strong>Public Awareness Writeup:</strong> {teaching.publicAwarenessWriteup}</p>
							<p><strong>Attachment:</strong> <a href={teaching.publicAwarenessWriteupupload} download>View upload document</a></p>
							<p><strong>CC:</strong> {teaching.cc}</p>
							<p><strong>Attachment:</strong> <a href={teaching.ccupload} download>View upload document</a></p>
						</div>
					))
				) : (
					<p>No teaching data available</p>
				)}
			</div>
			<p><strong>13. Publication details:</strong></p>
			<div className="publication-body">
				{user.appraisal?.research?.publications?.length > 0 ? (
					user.appraisal.research.publications.map((publication, index) => (
						<div key={index}>
							<h4>Publication {index + 1}</h4>
							<p><strong>Title:</strong> {publication?.title}</p>
							<p><strong>Author:</strong> {publication?.author}</p>
							<p><strong>Journal Name:</strong> {publication?.journalName}</p>
							<p><strong>Volume:</strong> {publication?.volume}</p>
							<p><strong>Issue:</strong> {publication?.issue}</p>
							<p><strong>Page No:</strong> {publication?.pageNo}</p>
							<p><strong>Year:</strong> {publication?.year}</p>
							<p><strong>Quartile:</strong> {publication?.quartile}</p>
							<p><strong>Index:</strong> {publication?.index}</p>
							<p><strong>Category:</strong> {publication?.CategoryP}</p>
							<p><strong>Post held:</strong> {publication?.postheld}</p>
							<p><strong>DOI:</strong> {publication?.doi}</p>
							<p><strong>Authorship:</strong> {publication?.authorship}</p>
							<p><strong>Upload URL:</strong> <a href={publication?.uploadUrl} download>View upload document</a></p>
						</div>
					))
				) : (
					<p>No publication data available</p>
				)}
			</div>			
			<p><strong>14. Grant details:</strong></p>
			<div className="grant-body">
				{user.appraisal?.research?.grants?.length > 0 ? (
					user.appraisal.research.grants.map((grant, index) => (
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
					))
				) : (
					<p>No grant data available</p>
				)}
			</div>
			<p><strong>15. Books details:</strong></p>
			<div className="books-details">
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
			</div>
			<p><strong>16. Guidance details:</strong></p>
			<div className="guidance-body">
				{user.appraisal?.research?.guidance?.length > 0 ? (
					user.appraisal.research.guidance.map((guidance, index) => (
						<div key={index}>
							<h4>Guidance {index + 1}</h4>
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
					))
				) : (
					<p>No guidance data available</p>
				)}
			</div>
			<p><strong>17. Conferences details:</strong></p>
			<div className="conference-details">
				{user.appraisal?.research?.conferences?.length > 0 ? (
					user.appraisal.research.conferences.map((conference, index) => (
						<div key={index}>
							<h4>Conference {index + 1}</h4>
							<p><strong>Category:</strong> {conference?.category}</p>
							<p><strong>Conference Name:</strong> {conference?.confname}</p>
							<p><strong>Year:</strong> {conference?.year}</p>
							<p><strong>Details:</strong> {conference?.details}</p>
							<p><strong>Conference type:</strong> {conference?.type}</p>
							<p><strong>Place of the conference:</strong> {conference?.place}</p>
							<p><strong>Awards:</strong> {conference?.awards}</p>
							<p><strong>Awards Description:</strong> {conference?.description}</p>
							<p><strong>Attachment:</strong> <a href={conference?.Attachment} download>View upload document</a></p>
						</div>
					))
				) : (
					<p>No conference data available</p>
				)}
			</div>
		</div>		
		<div className="professional-body">
				<p><strong>18. Clinical Duty</strong></p>
				<div className="clinical-duty-body">
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
				</div>
				<p><strong>19. Post held</strong></p>
				<div className="post-held-body">
					{user.appraisal?.professional?.postHeld ? (
						<div>
							<p><strong>Category:</strong> {user.appraisal?.professional?.postHeld?.category}</p>
							<p><strong>Post held File:</strong> <a href={user.appraisal?.professional?.postHeld?.postHeldFile} download>View upload document</a></p>
						</div>
					) : (
						<p>No teaching data available</p>
					)}
				</div>
				<p><strong>20. Exam Duties</strong></p>
				<div className="exam-duties-body">
					{user.appraisal?.professional?.examDuties?.map((examDuties, index) => (
						<div key={index+1}>
							<p><strong>Category 1:</strong> {examDuties?.category1}</p>
							<p><strong>Category 2:</strong> {examDuties?.category2}</p>
							<p><strong>Exam duty File:</strong> <a href={examDuties?.examDutyFile} download>View upload document</a></p>
						</div>
					))}
				</div>
				<p><strong>21. Coordinator Duties</strong></p>
				<div className="coordinator-duties-body">
					{user.appraisal?.professional?.coordinatorDuty ? (
						<div>
							<p><strong>Category:</strong> {user?.appraisal?.professional?.coordinatorDuty?.category}</p>
							<p><strong>Coordinator duty File:</strong> <a href={user?.appraisal?.professional?.coordinatorDuty?.coordinatorDutyFile} download>View upload document</a></p>
						</div>
					) : (
						<p>No coordinator duties available</p>
					)}
				</div>
				<p><strong>22. Committee Duties</strong></p>
				<div className="committe-duties-body">
					{user.appraisal?.professional?.committee?.length > 0 ? (
						user.appraisal.professional.committee.map((committee, index) => (
							<div key={index}>
								<p><strong>Committee Name:</strong> {committee?.committeeName}</p>
								<p><strong>Destination:</strong> {committee?.destination}</p>
								<p><strong>Committee File:</strong> <a href={committee?.committeeFile} download>View upload document</a></p>
							</div>
						))
					) : (
						<p>No committee data available</p>
					)}
				</div>
				<p><strong>23. Conferences</strong></p>
				<div className="conferences-body">
					{user.appraisal?.professional?.conference?.length > 0 ? (
						user.appraisal.professional.conference.map((conference, index) => (
							<div key={index}>
								<p><strong>Designation:</strong> {conference?.designation}</p>
								<p><strong>Credit Points:</strong> {conference?.creditPoints}</p>
								<p><strong>Conference File:</strong> <a href={conference?.conferenceFile} download>View upload document</a></p>
							</div>
						))
					) : (
						<p>No conference data available</p>
					)}
				</div>
				<p><strong>24. Guest Lectures</strong></p>
				<div className="guest-lectures-body">
					{user.appraisal?.professional?.guestLectures?.length > 0 ? (
						user.appraisal.professional.guestLectures.map((guestLectures, index) => (
							<div key={index}>
								<p><strong>Number:</strong> {guestLectures?.number}</p>
								<p><strong>Category:</strong> {guestLectures?.category}</p>
								<p><strong>Guest Lecture File:</strong> <a href={guestLectures?.guestLecturesFile} download>View upload document</a></p>
							</div>
						))
					) : (
						<p>No guest lectures data available</p>
					)}
				</div>

		</div>
	</div>
	</div>
	);
};

export default UserDetail;
