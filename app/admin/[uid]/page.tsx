"use client";

import { useState, useEffect, useRef } from "react";
import { useAdminData } from "@/components/adminContext";
import '@css/admin[uid].css'
import "@css/admin.css";
import { UserDocument } from "@/lib/mongoose/interface";
import PrintDetails from "./print";
import Link from "next/link";

const UserDetail = ({ params }) => {
	const { uid } = params;
	const { allUsers } = useAdminData();
	const [user, setUser] = useState<UserDocument|null>(null);
  const printRef = useRef<HTMLDivElement>(null);

	const dob = user?.profile?.dob ? new Date(user.profile.dob) : null;
	const dateOfJoining = user?.profile?.dateOfJoining ? new Date(user?.profile?.dateOfJoining) : null;
	

	useEffect(() => {
		if (allUsers.length > 0) {
			const fetchedUser = allUsers.find((unitUser) => unitUser.uid === uid);
			setUser(fetchedUser);
		}
	}, [allUsers, uid]);

	if (!user) {
		return <div>Loading...</div>;
	}
  
  const handlePrint = () => {
      const printContent = printRef.current.innerHTML
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContent;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
  };

	return (
	<div className="amdminpage">
		<div className="titlebar">
				<a className="web-name">AJIMS Employment Management</a>
				<Link
					title="home"
					className="material-symbols-outlined logout"
					href="/admin"
				>
					logout
				</Link>
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
      <center>
        <button 
          className="print-btn"
          onClick={handlePrint}
        >
          Print
        </button>
      </center>
			<div className="profile-container">
				<div className="basic-info">
					<p><strong>Name of the Faculty:</strong> {user?.profile?.name}</p>
							<p>
								<strong>Age & Date of birth:</strong>
								{user?.profile?.age} years,
								{dob ? dob.toLocaleDateString() : 'Invalid Date'}
							</p>
					<p><strong>Name of the college:</strong> {user?.profile?.college}</p>
					<p><strong>Present Designation:</strong> {user?.profile?.designation}</p>
					<div className="designation-section">
                            <p><strong>Appointment order:</strong> Certified copy of order at this institute attached: {user?.profile?.appointmentOrderStatus}</p>
							<p><strong>Appointment order:</strong><a href={user?.profile?.attachment} download>View upload document</a></p>
                            <p><strong>Department:</strong> {user?.profile?.department}</p>
                            <p><strong>College/ Institute:</strong> {user?.profile?.instituteName}</p>
                            <p><strong>City/ District:</strong> {user?.profile?.cityName}</p>
                            <p><strong>Appointment:</strong></p>
                            <div className="appointment-section">
                                <p><strong>Regular/ Contractual/ Ad-hoc basis:</strong> {user?.profile?.appointmentType1}</p>
                                <p><strong>Full time/ Part time:</strong> {user?.profile?.appointmentType2}</p>
                                <p><strong>With Private practice/ Without Private practice:</strong> {user?.profile?.appointmentType3}</p>
                            </div>
                            <p><strong>Date of appearance in last MCI/ NMC assessment:</strong></p>
                            <div className="date-section">
                                <p><strong>UG/ PG/ Any other:</strong> {user?.profile?.ugpgName}</p>
                                <p><strong>Name of College:</strong> {user?.profile?.college}</p>
                                <p><strong>Whether appeared and accepted at the same College:</strong> {user?.profile?.sameClgAcpt}</p>
                                <p><strong>Whether appeared and accepted at the same designation:</strong> {user?.profile?.sameDestAcpt}</p>
                                <p><strong>Whether retired from Government Medical College:</strong> {user?.profile?.retiredStatus}</p>
                                <p><strong>If yes, designation at the time of retirement:</strong> {user?.profile?.retireDestination}</p>
                            </div>
                        </div>
						<p><strong>Copy of Proof of Residence submitted and original verified:</strong>{user?.profile?.residenceProofStatus}</p>
						<p><strong>Residence proof file:</strong><a href={user?.profile?.residenceProof} download>View upload document</a></p>
						<p><strong>ORC Id number:</strong>{user?.profile?.orcIdNo}</p>
						<p><strong>Office telephone with STD code:</strong>{user?.profile?.officeTel}</p>
						<p><strong>Residence telephone with STD code:</strong>{user?.profile?.residenceTel}</p>
						<p>
							<strong>Date of joining the present institution:</strong>
							{dateOfJoining ? dateOfJoining.toLocaleDateString() : 'Invalid Date'}
						</p>
						<p><strong>Joining report file:</strong><a href={user?.profile?.joiningReport} download>View upload document</a></p>
                		<p><strong>Joining report verified the present/ attached</strong>{user?.profile?.joiningStatus}</p>
						<p><strong>Joining letter file:</strong><a href={user?.profile?.joiningLetter} download>View upload document</a></p>
						<p>
							<strong>
								Have you attended the Basic Course Workshop(BCME), Curriculum Implementation Support
								Programme (CISP - i/ii/iii), Advanced Course in Medical Education (ACME) for training in MET:
							</strong>
						</p>
						<div className="workshopattened-section">
							{user?.profile?.appearance?.length > 0 ? (
							user.profile.appearance.map((appearance, index) => (
								<div key={index}>
								<p><strong>Status:</strong> {appearance.status}</p>
								<p><strong>a. at MCI/NMC Regional MET Centre:</strong> {appearance.center}</p>
								<p><strong>b. at your college under Regional/ Nodal observership:</strong> {appearance.observership}</p>
								<p><strong>c. Any other MET certificates may be attached:</strong> {appearance.certs}</p>
									<p><strong>Uploads:</strong><a href={appearance?.upload} download>View upload document</a></p>
								</div>
							))
							) : (
							<p>No appearances to show.</p>
							)}
						</div>
						<p>
							<strong>
								Have you been considered in UG/ PG, MCI/ NMC inspection at any other 
								medical college ina teaching or administrative capacity during last 3 years. 
								If yes, please give details:
							</strong>
							</p>{/**object creation needed */}
						<table>
							<thead>
								<tr>
									<th>Designtion</th><th>Subject</th><th>College</th><th>Dates</th>
								</tr>
							</thead>
							<tbody>
								{user?.profile?.inspectionDetails?.length > 0 ? (
									user?.profile?.inspectionDetails?.map((item, index) => (
										<tr key={index}>
											<td>{item.designation}</td>
											<td>{item.subject}</td>
											<td>{item.college}</td>
											<td>{item.dates}</td>
										</tr>
									))
								) : (
									<tr>
										<td colSpan={4}>No data available</td>
									</tr>
								)}
							</tbody>
						</table>
						<p><strong>Details of employment before joining the present institution:</strong></p>
						<div className="details-section">
							{user?.profile?.details && user.profile.details.length > 0 ? (
								user.profile.details.map((details, index) => (
									<div key={index}>
										<p><strong>a. Name of College/ Institution:</strong> {details.name}</p>
										<p><strong>b. Designation:</strong> {details.designation} <strong>Date on which relieved:</strong> {details.date ? new Date(details.date).toLocaleDateString() : 'Invalid Date'}</p>
										<p><strong>c. Reason for being relieved:</strong> {details.relieveReason}</p>
										<p><strong>d. Relieving order issued by previous institution verified and attached:</strong> {details.verification}</p>
										<p><strong>d. Relieving order issued by previous institution attached file:</strong> <a href={details.verificationFile} download>View upload document</a></p>
									</div>
								))
							) : (
								<p>No data available</p>
							)}
						</div>
						<p>
							<strong>Number of lectures/ small group teachings/ self-directed learning sessions/ clinics/ etc
								taken and topics covered in last academic year (attach additional sheet, if required)
							</strong>
						</p>{/**object creation needed! */}
						<div className="number section">
							<table>
								<thead>
									<th>Designation</th><th>Date</th><th>Lecture/ SGT/ Clinic/ others</th><th>Topic</th>
								</thead>
								<tbody>
									{user?.profile?.numberOfLectures?.length > 0 ? (
									user?.profile?.numberOfLectures?.map((numberOfLectures, index) => (
										<tr key={index}>
											<td>{index}</td>
											<td>{numberOfLectures.date ? numberOfLectures.date.toLocaleDateString() : 'Invalid Date'}</td>
											<td>{numberOfLectures.type}</td>
											<td>{numberOfLectures.topic}</td>
										</tr>
									))
									) : (
									<tr>
										<td colSpan={4}>No data available</td>
									</tr>
								)}
								</tbody>
							</table>
						</div>
						<div className="margin-body">
						<p><strong>Experience:</strong></p>
						{user?.profile?.experience && user?.profile?.experience.length > 0 ? (
							user?.profile?.experience.map((experience, index) => (
							<div key={index}>
								<p><strong>Designation:</strong> {experience.designation}</p>
								<p><strong>Department:</strong> {experience.departmentE}</p>
								<p><strong>Institution:</strong> {experience.institution}</p>
								<p><strong>From:</strong> {experience.from ? new Date(experience.from).toLocaleDateString() : 'N/A'}</p>
								<p><strong>To:</strong> {experience.to ? new Date(experience.to).toLocaleDateString() : 'N/A'}</p>
								<p><strong>Total Duration:</strong> {experience.total}</p>
							</div>
							))
						) : (
							<tr>
                                <td colSpan={6}>No data available</td>
                            </tr>
						)}
						<p><strong>Aadhar No:</strong> {user?.profile?.aadharNo}</p>
						<p><strong>PAN Card Number:</strong>{user?.profile?.panNo}</p>{/**variable needed*/}
					</div>
					<p><strong>Residencial Adderss:</strong> {user?.profile?.residentialAddress}</p>
					<p><strong>Permanent:</strong>{user?.profile?.perAddress}</p>
					<p><strong>Aadhar No:</strong> {user?.profile?.aadharNo}</p>
					<p><strong>Contact Details:</strong></p>
					<div className="margin-body">
						<p><strong>Phone no:</strong> {user?.profile?.phoneNo}</p>
						<p><strong>Email address:</strong>{user?.profile?.emailaddress}</p>	
					</div>
					<p><strong>Date of joining:</strong> {dateOfJoining ? dateOfJoining.toLocaleDateString() : 'N/A'}</p>
					<p><strong>Joining Letter:</strong><a href={user?.profile?.joiningLetter} download>View upload document</a></p>
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
						{user?.profile?.educationalQualification?.length > 0 ? (
							user.profile.educationalQualification.map((educationalQualification, index) => (
								<tr key={index}>
									<td>{educationalQualification.degree}</td>
									<td>{educationalQualification.year}</td>
									<td>{educationalQualification.collegeName}</td>
									<td>{educationalQualification.regNumWithDate}</td>
									<td>{educationalQualification.medicalCouncilName}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5}>No data available</td>
							</tr>
						)}
					</tbody>
					</table>
					</div>
					<div className="edu-section">
                        <p><strong>MD/ MS subject:</strong>{user?.profile?.mdmsSubject}</p>{/**varaible needed */}
                        <p><strong>DM/ Mch subject:</strong>{user?.profile?.dmmchSubject}</p>{/**varaible needed */}
                        <p><strong>PhD subject:</strong>{user?.profile?.phdSubject}</p>{/**varaible needed */}
                    </div>
					<p><strong>Passport No:</strong> {user?.profile?.passportNo}</p>
					<p><strong>KMC Registration No:</strong> {user?.profile?.kmcRegistrationNo}</p>		
				</div>
				<div className="profile-photo">
					<img
            src={(user?.profileUrl === '' || user?.profileUrl === 'user.png') ? '/user.png' : user.profileUrl}
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
			<p><strong>Copies of educational qualifications:</strong></p>  
                <div className="qualifications-section">
                    <p><strong>Copies of MBBS & PG Degree Certificates verified and attached:</strong>{user?.profile?.certUpload}</p>{/**Variable needed!*/}
					<p><strong>Copies of MBBS & PG Degree Certificates verified and attached:</strong>{user?.profile?.certStatus}</p>{/**Variable needed!*/}
                    <p><strong>Copies of MBBS & PG Degree Registation verified and attached:</strong>{user?.profile?.regUpload}</p>{/**Variable needed!*/}
					<p><strong>Copies of MBBS & PG Degree Registation verified and attached:</strong>{user?.profile?.regStatus}</p>{/**Variable needed!*/}
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
			<p><strong>I have drawn total emoluments from this college in the current financial year as under:</strong></p>{/**object creation needed*/}
            <div className="enoluments-section">
                <table>
                    <thead>
                        <tr><th>Month/Year</th><th>Amount Received</th><th>TDS</th></tr>
                    </thead>
                    <tbody>
                        {user?.profile?.emoluments?.length > 0 ? (
                            user?.profile?.emoluments?.map((emoluments, index) => (
                                <tr key={index}>
                                    <td>{emoluments.month}/{emoluments.year}</td>
                                    <td>{emoluments.amount}</td>
                                    <td>{emoluments.tds}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No emoluments data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
			<div className="achievements-section">
                <table>
                    <thead>
                        <tr>
                            <th>Serial No</th><th>Year</th><th>Information</th>
                        </tr>
                    </thead>
                    <tbody>
                        {user?.appraisal?.professional?.achievements?.length > 0 ? (
                            user.appraisal?.professional?.achievements.map((achievements, index) => (
                                <tr key={index}>
                                    <td>{achievements.serialNo}</td>
                                    <td>{achievements.year}</td>
                                    <td>{achievements.information}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}>No achievements data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
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
									<td><a href={grant?.utCert} download>View upload document</a></td>
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
								<th>Category</th><th>Student Details</th><th>Student Course</th><th>Uploaded file</th>
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
									<td>{guidance?.studentCourse}</td>
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
									<td><a href={conference?.certificateUpload} download>View upload document</a></td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No conference data available</p>
				)}
			</div>
			</div>	
				<p><strong>Any other information/ achievements/ patents:</strong></p>
				<div className="patent-section">
					<table>
						<thead>
							<tr>
								<th>Patent Country</th><th>Patent Number</th><th>Type</th><th>Title</th><th>Date</th><th>Details of the inventor</th>
							</tr>
						</thead>
						<tbody>
							{user?.appraisal?.research?.patents?.length > 0 ? (
								user?.appraisal?.research?.patents?.map((patent, index) => (
									<tr key={index}>
										<td>{patent.patentCountry}</td>
										<td>{patent.patentNumber}</td>
										<td>{patent.patentType}</td>
										<td>{patent.title}</td>
										<td>{patent.date ? patent.date.toLocaleDateString() : 'Invalid Date'}</td>
										<td>
											{patent.detailsOfInventors && patent.detailsOfInventors.length > 0 ? (
												<table>
													<thead>
														<tr>
															<th>Number</th><th>Name</th><th>Institute</th>
														</tr>
													</thead>
													<tbody>
														{patent.detailsOfInventors.map((detailsOfInventors, i) => (
															<tr key={i}>
																<td>{detailsOfInventors.number}</td>
																<td>{detailsOfInventors.name}</td>
																<td>{detailsOfInventors.institute}</td>
															</tr>
														))}
													</tbody>
												</table>
											) : (
												<tr>
													<td colSpan={5}>No inventor information available</td>
												</tr>
											)}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan={5}>No Patent information available</td>
								</tr>
							)}
						</tbody>
					</table>
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
									<th>Conference Name</th><th>Designation</th><th>Credit Points</th><th>Attendie Details</th><th>Conference File</th>
								</tr>
							</thead>
							<tbody>
								{user?.appraisal?.professional?.conferences.map((conferences, index) => (
									<tr key={index}>
										<td>{conferences?.conferenceName}</td>
										<td>{conferences?.designation}</td>
										<td>{conferences?.creditPoints}</td>
										<td>{conferences?.attendieDetails}</td>
										<td><a href={conferences?.conferenceFile} download>View upload document</a></td>
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
									<th>Title</th><th>Category</th><th>Guest Lecture File</th>
								</tr>
							</thead>
							<tbody>
								{user.appraisal.professional.guestLectures.map((guestLectures, index) => (
									<tr key={index}>
										<td>{guestLectures?.title}</td>
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
    <div
      ref={printRef}
      style={{display: "none"}}
    >
      <PrintDetails params={params}/> 
    </div>
  </div>
	)
};

export default UserDetail;
