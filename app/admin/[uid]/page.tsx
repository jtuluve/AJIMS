"use client";

import { useState, useEffect } from "react";
import { useAdminData } from "@/components/adminContext";
import '@css/admin[uid].css'
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
						<p><strong>b. Department:</strong> {user?.profile?.department}</p>
						<p><strong>c. Experience:</strong></p>
						{user?.profile?.experience && user?.profile?.experience.length > 0 ? (
							user?.profile?.experience.map((exp, index) => (
							<div key={index}>
								<p><strong>Designation:</strong> {exp.designation}</p>
								<p><strong>Department:</strong> {exp.department}</p>
								<p><strong>Institution:</strong> {exp.institution}</p>
								<p><strong>From:</strong> {exp.from ? new Date(exp.from).toLocaleDateString() : 'N/A'}</p>
								<p><strong>To:</strong> {exp.to ? new Date(exp.to).toLocaleDateString() : 'N/A'}</p>
								<p><strong>Total Duration:</strong> {exp.total}</p>
							</div>
							))
						) : (
							<p>No experience information available.</p>
						)}
						<p><strong>d. Aadhar No:</strong> {user?.profile?.aadharNo}</p>
					</div>
					<p><strong>4. Residencial Adderss:</strong> {user?.profile?.residentialAddress}</p>
					<p><strong>5. Aadhar No:</strong> {user?.profile?.aadharNo}</p>
					<p><strong>6. Contact Details:</strong></p>
					<div className="margin-body">
						<p><strong>a. Phone no:</strong> {user?.profile?.phoneNo}</p>
						<p><strong>b. Email address:</strong> {user.email}</p>	
					</div>
					<p><strong>7. Date of joining:</strong> {user?.profile?.dateOfJoining}</p>
					<p><strong>8. Joining Letter:</strong><a href={user?.profile?.joiningLetter} download>View upload document</a></p>
					<p><strong>9. Educational Qualifications</strong></p>
					<div className="education-section">
					<table>
						<thead>
						<tr>
							<th>Degree</th><th>Year</th><th>College Name</th>
							<th>Registration Number with Date</th><th>Medical Council Name</th>
						</tr>
						</thead>
						<tbody>
							{user?.profile?.educationalQualification?.map((educationalQualification, index) => (
							<tr key={index}>
							<td>{educationalQualification.degree}</td>
							<td>{educationalQualification.year}</td>
							<td>{educationalQualification.collegeName}</td>
							<td>{educationalQualification.regNumWithDate}</td>
							<td>{educationalQualification.medicalCouncilName}</td>
							</tr>
						))}
						</tbody>
					</table>
					</div>
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
    			{user.appraisal?.academics?.teaching && user.appraisal.academics.teaching.length > 0 ? (
        			<table>
            			<thead>
                			<tr>
                    			<th>Teaching Hours</th><th>Attachment</th><th>Clinical Hours</th>
								<th>Attachment</th><th>Students Feedback</th><th>Attachment</th>
                    			<th>Resource material</th><th>Attachment</th><th>Public Awareness Writeup</th>
								<th>Attachment</th><th>CC</th><th>Attachment</th>
                			</tr>
            			</thead>
						<tbody>
							{user.appraisal.academics.teaching.map((teaching, index) => (
								<tr key={index}>
									<td>{teaching.hours}</td>
									<td><a href={teaching.hourupload} download>View upload document</a></td>
									<td>{teaching.clinicalHours}</td>
									<td><a href={teaching.clinicalHoursupload} download>View upload document</a></td>
									<td>{teaching.studentsFeedback}</td>
									<td><a href={teaching.studentsFeedbackupload} download>View upload document</a></td>
									<td>{teaching.resourceMaterial}</td>
									<td><a href={teaching.resourceMaterialupload} download>View upload document</a></td>
									<td>{teaching.publicAwarenessWriteup}</td>
									<td><a href={teaching.publicAwarenessWriteupupload} download>View upload document</a></td>
									<td>{teaching.cc}</td>
									<td><a href={teaching.ccupload} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
        		</table>
				) : (
					<p>No teaching data available</p>
				)}
			</div>
			<p><strong>13. Publication details:</strong></p>
			<div className="publication-body">
				{user.appraisal?.research?.publications?.length > 0 ? (
					<table>
						<thead>
						<tr>
							<th>Title</th><th>Author</th><th>Journal Name</th>
							<th>Volume</th><th>Issue</th><th>Page No</th>
							<th>Year</th><th>Quartile</th><th>Index</th>
							<th>Category</th><th>Post held</th><th>DOI</th>
							<th>Authorship</th><th>Upload URL</th>
						</tr>
						</thead>
						<tbody>
							{user.appraisal.research.publications.map((publication, index) => (
								<tr key={index}>
									<td>{publication?.title}</td>
									<td>{publication?.author}</td>
									<td>{publication?.journalName}</td>
									<td>{publication?.volume}</td>
									<td>{publication?.issue}</td>
									<td>{publication?.pageNo}</td>
									<td>{publication?.year}</td>
									<td>{publication?.quartile}</td>
									<td>{publication?.index}</td>
									<td>{publication?.CategoryP}</td>
									<td>{publication?.postheld}</td>
									<td>{publication?.doi}</td>
									<td>{publication?.authorship}</td>
									<td><a href={publication?.uploadUrl} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No publication data available</p>
				)}
			</div>
			<p><strong>14. Grant details:</strong></p>
			<div className="grant-body">
				{user.appraisal?.research?.grants?.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>Title</th><th>Agency</th><th>Start year</th><th>End year</th>
								<th>Received</th><th>Utilization Certificate</th>
								<th>Work Published</th><th>Amount Category</th><th>Upload URL</th>
							</tr>
						</thead>
						<tbody>
							{user.appraisal.research.grants.map((grant, index) => (
								<tr key={index}>
									<td>{grant?.title}</td>
									<td>{grant?.agency}</td>
									<td>{grant?.startyear}</td>
									<td>{grant?.endyear}</td>
									<td>{grant?.recieved}</td>
									<td>{grant?.utCert}</td>
									<td>{grant?.workpub}</td>
									<td>{grant?.amountCategory}</td>
									<td><a href={grant?.file} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No grant data available</p>
				)}
			</div>
			<p><strong>15. Books details:</strong></p>
			<div className="books-details">
				{user.appraisal?.research?.books?.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>Authorship</th><th>Category</th><th>Title</th><th>Year</th>
								<th>Certificate</th><th>Book details</th><th>Upload URL</th>
							</tr>
						</thead>
						<tbody>
							{user.appraisal.research.books.map((books, index) => (
								<tr key={index}>
									<td>{books?.authorship}</td>
									<td>{books?.category}</td>
									<td>{books?.title}</td>
									<td>{books?.year}</td>
									<td><a href={books?.Certificate} download>View upload document</a></td>
									<td>{books?.bookdetails}</td>
									<td><a href={books?.uploadUrl} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No books available.</p>
				)}
			</div>
			<p><strong>16. Guidance details:</strong></p>
			<div className="guidance-body">
				{user.appraisal?.research?.guidance?.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>Category</th><th>Student Details</th><th>Uploaded file</th>
								<th>Start date</th><th>End date</th><th>Name</th>
								<th>Title</th><th>Publish Status</th><th>Year</th>
								<th>Amount</th><th>Grant Name</th><th>Funded Status</th><th>Agency Name</th>
								<th>Synopsis</th><th>Thesis</th><th>Report</th>
							</tr>
						</thead>
						<tbody>
							{user.appraisal.research.guidance.map((guidance, index) => (
								<tr key={index}>
									<td>{guidance?.category}</td>
									<td>{guidance?.studentdetails}</td>
									<td><a href={guidance?.studentupload} download>View upload document</a></td>
									<td>{guidance?.startdate}</td>
									<td>{guidance?.enddate}</td>
									<td>{guidance?.name}</td>
									<td>{guidance?.title}</td>
									<td>{guidance?.publishstatus}</td>
									<td>{guidance?.year}</td>
									<td>{guidance?.Amount}</td>
									<td>{guidance?.GrantName}</td>
									<td>{guidance?.FundedStatus}</td>
									<td>{guidance?.AgencyName}</td>
									<td><a href={guidance?.synopsis} download>View upload document</a></td>
									<td><a href={guidance?.thesis} download>View upload document</a></td>
									<td><a href={guidance?.report} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No guidance data available</p>
				)}
			</div>
			<p><strong>17. Conferences details:</strong></p>
			<div className="conference-details">
				{user.appraisal?.research?.conferences?.length > 0 ? (
					<table>
						<thead>
							<tr>
								<th>Category</th><th>Conference Name</th><th>Year</th>
								<th>Details</th><th>Conference type</th><th>Place of the conference</th>
								<th>Awards</th><th>Awards Description</th><th>Attachment</th>
							</tr>
						</thead>
						<tbody>
							{user.appraisal.research.conferences.map((conference, index) => (
								<tr key={index}>
									<td>{conference?.category}</td>
									<td>{conference?.confname}</td>
									<td>{conference?.year}</td>
									<td>{conference?.details}</td>
									<td>{conference?.type}</td>
									<td>{conference?.place}</td>
									<td>{conference?.awards}</td>
									<td>{conference?.description}</td>
									<td><a href={conference?.Attachment} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No conference data available</p>
				)}
			</div>
		</div>		
		<div className="professional-body">
				<p><strong>18. Clinical Duty</strong></p>
				<div className="clinical-duty-body">
					{user.appraisal?.professional?.clinicalDuty ? (
						<table>
							<thead>
								<tr>
									<th>Number of patients</th><th>Minor Procedures</th>
									<th>Major Procedures</th><th>Clinical Duty File</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{user.appraisal?.professional?.clinicalDuty?.Patients}</td>
									<td>{user.appraisal?.professional?.clinicalDuty?.minorProcedures}</td>
									<td>{user.appraisal?.professional?.clinicalDuty?.majorProcedures}</td>
									<td><a href={user.appraisal?.professional?.clinicalDuty?.clinicalDutyFile} download>View upload document</a></td>
								</tr>
							</tbody>
						</table>
					) : (
						<p>No clinical duty data available</p>
					)}
				</div>
				<p><strong>19. Post held</strong></p>
				<div className="post-held-body">
					{user.appraisal?.professional?.postHeld ? (
						<table>
							<thead>
								<tr>
									<th>Category</th><th>Post held File</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{user.appraisal?.professional?.postHeld?.category}</td>
									<td><a href={user.appraisal?.professional?.postHeld?.postHeldFile} download>View upload document</a></td>
								</tr>
							</tbody>
						</table>
					) : (
						<p>No post held data available</p>
					)}
				</div>
				<p><strong>20. Exam Duties</strong></p>
				<div className="exam-duties-body">
					{user.appraisal?.professional?.examDuties?.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Category 1</th><th>Category 2</th><th>Exam Duty File</th>
								</tr>
							</thead>
							<tbody>
								{user.appraisal.professional.examDuties.map((examDuties, index) => (
									<tr key={index + 1}>
										<td>{examDuties?.category1}</td>
										<td>{examDuties?.category2}</td>
										<td><a href={examDuties?.examDutyFile} download>View upload document</a></td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No exam duties data available</p>
					)}
				</div>
				<p><strong>21. Coordinator Duties</strong></p>
				<div className="coordinator-duties-body">
					{user.appraisal?.professional?.coordinatorDuty ? (
						<table>
							<thead>
								<tr>
									<th>Category</th><th>Coordinator duty File</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{user?.appraisal?.professional?.coordinatorDuty?.category}</td>
									<td><a href={user?.appraisal?.professional?.coordinatorDuty?.coordinatorDutyFile} download>View upload document</a></td>
								</tr>
							</tbody>
						</table>
					) : (
						<p>No coordinator duties available</p>
					)}
				</div>
				<p><strong>22. Committee Duties</strong></p>
				<div className="committe-duties-body">
					{user.appraisal?.professional?.committee?.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Committee Name</th><th>Destination</th><th>Committee File</th>
								</tr>
							</thead>
							<tbody>
								{user.appraisal.professional.committee.map((committee, index) => (
									<tr key={index}>
										<td>{committee?.committeeName}</td>
										<td>{committee?.destination}</td>
										<td><a href={committee?.committeeFile} download>View upload document</a></td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No committee data available</p>
					)}
				</div>
				<p><strong>23. Conferences</strong></p>
				<div className="conferences-body">
					{user.appraisal?.professional?.conference?.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Designation</th><th>Credit Points</th><th>Conference File</th>
								</tr>
							</thead>
							<tbody>
								{user.appraisal.professional.conference.map((conference, index) => (
									<tr key={index}>
										<td>{conference?.designation}</td>
										<td>{conference?.creditPoints}</td>
										<td><a href={conference?.conferenceFile} download>View upload document</a></td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No conference data available</p>
					)}
				</div>
				<p><strong>24. Guest Lectures</strong></p>
				<div className="guest-lectures-body">
					{user.appraisal?.professional?.guestLectures?.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Number</th><th>Category</th><th>Guest Lecture File</th>
								</tr>
							</thead>
							<tbody>
								{user.appraisal.professional.guestLectures.map((guestLectures, index) => (
									<tr key={index}>
										<td>{guestLectures?.number}</td>
										<td>{guestLectures?.category}</td>
										<td><a href={guestLectures?.guestLecturesFile} download>View upload document</a></td>
									</tr>
								))}
							</tbody>
						</table>
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
