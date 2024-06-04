"use client";

import { useState, useEffect } from "react";
import { useAdminData } from "@/components/adminContext";
import '@css/admin[uid].css'
import "@css/admin.css";
import { UserDocument } from "@/lib/mongoose/interface";

const UserDetail = ({ params }) => {
	const { uid } = params;
	const { allUsers } = useAdminData();
	const [user, setUser] = useState<UserDocument|null>(null);

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
					<p><strong>Name of the Faculty:</strong> {user?.profile?.name}</p>
					<p><strong>Age & Date of birth:</strong>{user?.profile?.age} years, {user?.profile?.dob}</p>
					<p><strong>Name of the college:</strong> {user?.profile?.collegeName}</p>
					<p><strong>Present Designation:</strong> {user?.profile?.designation}</p>
					<div className="designation-section">
                            <p><strong>Appointment order:</strong> Certified copy of order at this institute attached: {user?.profile?.appointmentorderstatus}</p>
                            <p><strong>Department:</strong> {user?.profile?.department}</p>
                            <p><strong>College/ Institute:</strong> {user?.profile?.institutename}</p>
                            <p><strong>City/ District:</strong> {user?.profile?.cityname}</p>
                            <p><strong>Appointment:</strong></p>
                            <div className="appointment-section">
                                <p><strong>Regular/ Contractual/ Ad-hoc basis:</strong> {user?.profile?.appointmenttype1}</p>
                                <p><strong>Full time/ Part time:</strong> {user?.profile?.appointmenttype2}</p>
                                <p><strong>With Private practice/ Without Private practice:</strong> {user?.profile?.appointmenttype3}</p>
                            </div>
                            <p><strong>Date of appearance in last MCI/ NMC assessment:</strong></p>
                            <div className="date-section">
                                <p><strong>UG/ PG/ Any other:</strong> {user?.profile?.ugpgname}</p>
                                <p><strong>Name of College:</strong> {user?.profile?.college}</p>
                                <p><strong>Whether appeared and accepted at the same College:</strong> {user?.profile?.sameclgacpt}</p>
                                <p><strong>Whether appeared and accepted at the same designation:</strong> {user?.profile?.samedestacpt}</p>
                                <p><strong>Whether retired from Government Medical College:</strong> {user?.profile?.retiredstatus}</p>
                                <p><strong>If yes, designation at the time of retirement:</strong> {user?.profile?.retiredestination}</p>
                            </div>
                        </div>
						<p><strong>Copy of Proof of Residence submitted and original verified:</strong>{user?.profile?.residenceproofstatus}</p>
						<p><strong>Residence proof file:</strong><a href={user?.profile?.residenceproof} download>View upload document</a></p>
						<p><strong>ORC Id number:</strong>{user?.profile?.orcIdNo}</p>
						<p><strong>Office telephone with STD code:</strong>{user?.profile?.officeTel}</p>
						<p><strong>Residence telephone with STD code:</strong>{user?.profile?.residenceTel}</p>
						<p><strong>Date of joining the present institution:</strong>{user?.profile?.dateOfJoining}</p>
						<p><strong>Joining report file:</strong><a href={user?.profile?.joiningreport} download>View upload document</a></p>
                		<p><strong>Joining report verified the present/ attached</strong>{user?.profile?.joiningstatus}</p>
						<p><strong>Joining letter file:</strong><a href={user?.profile?.joiningletter} download>View upload document</a></p>
						<p>
							<strong>
								Have you attended the Basic Course Workshop(BCME), Curriculum Implementation Support
								Programme (CISP - i/ii/iii), Advanced Course in Medical Education (ACME) for training in MET:
							</strong>
							
						</p>
						<div className="workshopattened-section">
							{user?.profile?.appearance?.status}
							<p><strong>a. at MCI/NMC Regional MET Centre:</strong>{user?.profile?.appearance?.center}</p>
							<p><strong>b. at your college under Regional/ Nodal observership :</strong>{user?.profile?.appearance?.observership}</p>
							<p><strong>c. Any other MET certificates may be attached :</strong>{user?.profile?.appearance?.certs}</p>
								<p><strong>Uploaded file:</strong><a href={user?.profile?.upload} download>View upload document</a></p>
						</div>
						<div className="margin-body">
						<p><strong>Experience:</strong></p>
						{user?.profile?.experience && user?.profile?.experience.length > 0 ? (
							user?.profile?.experience.map((experience, index) => (
							<div key={index}>
								<p><strong>Designation:</strong> {experience.designation}</p>
								<p><strong>Department:</strong> {experience.department}</p>
								<p><strong>Institution:</strong> {experience.institution}</p>
								<p><strong>From:</strong> {experience.from ? new Date(experience.from).toLocaleDateString() : 'N/A'}</p>
								<p><strong>To:</strong> {experience.to ? new Date(experience.to).toLocaleDateString() : 'N/A'}</p>
								<p><strong>Total Duration:</strong> {experience.total}</p>
							</div>
							))
						) : (
							<p>No experience information available.</p>
						)}
						<p><strong>Aadhar No:</strong> {user?.profile?.aadharNo}</p>
					</div>
					<p><strong>Residencial Adderss:</strong> {user?.profile?.residentialAddress}</p>
					<p><strong>Permanent:</strong>{user?.profile?.perAddress}</p>
					<p><strong>Aadhar No:</strong> {user?.profile?.aadharNo}</p>
					<p><strong>Contact Details:</strong></p>
					<div className="margin-body">
						<p><strong>Phone no:</strong> {user?.profile?.phoneNo}</p>
						<p><strong>Email address:</strong> {user.email}</p>	
					</div>
					<p><strong>Date of joining:</strong> {user?.profile?.dateOfJoining}</p>
					<p><strong>Joining Letter:</strong><a href={user?.profile?.joiningletter} download>View upload document</a></p>
					<p><strong>Educational Qualifications</strong></p>
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
					<div className="edu-section">
                        <p><strong>a. MD/ MS subject:</strong>{user?.profile?.mdmssubject}</p>{/**varaible needed */}
                        <p><strong>b. DM/ Mch subject:</strong>{user?.profile?.dmmchsubject}</p>{/**varaible needed */}
                        <p><strong>c. PhD subject:</strong>{user?.profile?.phdsubject}</p>{/**varaible needed */}
                    </div>
					<p><strong>Passport No:</strong> {user?.profile?.passportNo}</p>
					<p><strong>KMC Registration No:</strong> {user?.profile?.kmcRegistrationNo}</p>		
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
									<td><a href={teaching.hourUpload} download>View upload document</a></td>
									<td>{teaching.clinicalHours}</td>
									<td><a href={teaching.clinicalHoursUpload} download>View upload document</a></td>
									<td>{teaching.studentsFeedback}</td>
									<td><a href={teaching.studentsFeedbackUpload} download>View upload document</a></td>
									<td>{teaching.resourceMaterial}</td>
									<td><a href={teaching.resourceMaterialUpload} download>View upload document</a></td>
									<td>{teaching.publicAwarenessWriteup}</td>
									<td><a href={teaching.publicAwarenessWriteupUpload} download>View upload document</a></td>
									<td>{teaching.cc}</td>
									<td><a href={teaching.ccUpload} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
        		</table>
				) : (
					<p>No teaching data available</p>
				)}
			</div>
			<p><strong>Publication details:</strong></p>
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
									<td>{publication?.category}</td>
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
			<p><strong>Grant details:</strong></p>
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
									<td>{grant?.startYear}</td>
									<td>{grant?.endYear}</td>
									<td>{grant?.recieved}</td>
									<td>{grant?.utCert}</td>
									<td>{grant?.workPub}</td>
									<td>{grant?.amountCategory}</td>
									<td><a href={grant?.uploadUrl} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No grant data available</p>
				)}
			</div>
			<p><strong>Books details:</strong></p>
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
									<td><a href={books?.certificate} download>View upload document</a></td>
									<td>{books?.bookDetails}</td>
									<td><a href={books?.uploadUrl} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No books available.</p>
				)}
			</div>
			<p><strong>Guidance details:</strong></p>
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
									<td>{guidance?.studentDetails}</td>
									<td><a href={guidance?.studentUpload} download>View upload document</a></td>
									<td>{guidance?.startDate.toLocaleDateString()}</td>
									<td>{guidance?.endDate.toLocaleDateString()}</td>
									<td>{guidance?.name}</td>
									<td>{guidance?.title}</td>
									<td>{guidance?.publishStatus}</td>
									<td>{guidance?.year}</td>
									<td>{guidance?.amount}</td>
									<td>{guidance?.grantName}</td>
									<td>{guidance?.fundedStatus}</td>
									<td>{guidance?.agencyName}</td>
									<td><a href={guidance?.synopsisUrl} download>View upload document</a></td>
									<td><a href={guidance?.thesisUrl} download>View upload document</a></td>
									<td><a href={guidance?.reportUrl} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No guidance data available</p>
				)}
			</div>
			<p><strong>Conferences details:</strong></p>
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
									<td>{conference?.confName}</td>
									<td>{conference?.year}</td>
									<td>{conference?.details}</td>
									<td>{conference?.type}</td>
									<td>{conference?.place}</td>
									<td>{conference?.awards}</td>
									<td>{conference?.description}</td>
									<td><a href={conference?.attachment} download>View upload document</a></td>
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
				<p><strong>Clinical Duty</strong></p>
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
									<td>{user.appraisal?.professional?.clinicalDuty?.patients}</td>
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
				<p><strong>Post held</strong></p>
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
				<p><strong>Exam Duties</strong></p>
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
				<p><strong>Coordinator Duties</strong></p>
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
									<td><a href={user?.appraisal?.professional?.coordinatorDutyFile} download>View upload document</a></td>
								</tr>
							</tbody>
						</table>
					) : (
						<p>No coordinator duties available</p>
					)}
				</div>
				<p><strong>Committee Duties</strong></p>
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
										<td>{committee?.designation}</td>
										<td><a href={committee?.committeeFile} download>View upload document</a></td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No committee data available</p>
					)}
				</div>
				<p><strong>Conferences</strong></p>
				<div className="conferences-body">
					{user.appraisal?.professional?.conferences?.length > 0 ? (
						<table>
							<thead>
								<tr>
									<th>Designation</th><th>Credit Points</th><th>Conference File</th>
								</tr>
							</thead>
							<tbody>
								{user.appraisal.professional.conferences.map((conference, index) => (
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
				<p><strong>Guest Lectures</strong></p>
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
