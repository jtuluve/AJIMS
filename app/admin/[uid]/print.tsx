"use client";

import { useState, useEffect } from "react";
import { useAdminData } from "@/components/adminContext";
import '@css/print[uid].css'
import "@css/admin.css";

const PrintDetails = ({ params }) => {

    const { uid } = params;
    const { allUsers } = useAdminData();
    const [user, setUser] = useState(null);

    const internationalCount = user?.appraisal?.research?.publications?.filter(
        (publication: any) => publication.category === 'International'
    ).length;

    const nationalCount = user?.appraisal?.research?.publications?.filter(
        (publication: any) => publication.category === 'National'
    ).length;

    const stateInstitutionalCount = user?.appraisal?.research?.publications?.filter(
        (publication: any) => publication.category === 'State/Institutional'
    ).length;
    const booksPublished = user?.appraisal?.books?.length || 0;
    let totalChapters = 0;
    user?.appraisal?.books?.forEach((book: any) => {
        totalChapters += book.chapters.length;
    });


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
        <div className="page-container">
            <div className="page1">
                <center><h1>Factulty/ SR/ Tutor/ Demonstrator Declaration Form</h1></center>
                <p><strong>Name of the college: </strong>nameofcollege</p>{/**Variable needed*/}
                <table>
                    <thead>
                        <th>Submission date:</th>
                        <th>_ _/_ _/_ _</th>
                    </thead>
                </table>
                <div className="smalltext">
                    <p>
                        <strong>Note:</strong>
                        It is the responsibility of the Dean to ensure that the submitted Declaration form 
                        is ONLY of a Faculty member who is working as a full-time employee of the college
                    </p>
                </div>
                <div>
                    <p><strong>1. Name of Faculty:</strong>{user?.profile?.name}</p>
                    <p><strong>2. Age & Date of birth:</strong>{user?.profile?.age} years, {user?.profile?.dob}</p>
                    <p><strong>3. Present Designation:</strong>{user?.profile?.designation}</p>
                    <div className="designation-section">
                        <p><strong>a. Appointment order:</strong>Certified copy of order at this institue attached:  appontmentorderstatus</p>{/**Variable needed*/}
                        <p><strong>b. Department:</strong> {user?.profile?.department}</p>
                        <p><strong>c. College/ Institute:</strong>institutename</p>{/**Variable needed*/}
                        <p><strong>d. City/ District:</strong>cityname</p>{/**Variable needed*/}
                        <p><strong>e. Appointment: </strong>appointmentstatus</p>{/**Variable needed*/}
                        <p><strong>f. Date of appearance in last MCI/ NMC assessment: </strong></p>{/**Object declaration needed*/}
                        <div className="date-section">
                            <p><strong>i. UG/ PG/ Any other: </strong>ugpgdate</p>
                            <p><strong>ii. Name of College:</strong></p>
                            <p><strong>iii. Whether appeared and accepted at the same College:</strong></p>
                            <p><strong>iv. Whether appeared and accepted at the same designation:</strong></p>
                            <p><strong>v. Whether retired from Government Medical College:</strong></p>
                            <p><strong>vi. If yes, designation at the time of retirement:</strong></p>
                        </div>
                        <section id="signatures">
                            <div style={{ color: "#131D38" }}>Signature of the Faculty</div>
                            <div style={{ color: "#131D38" }}>Signature & Seal of the Dean</div>
                        </section>
                    </div>
                </div>
            </div>  

            <div className="page2">
                <p><strong>4. Complete Residential Address of the employee:</strong></p>
                <div className="address-section">
                    <p><strong>a. Present:</strong>presentaddress</p>{/**varaible needed */}
                    <p><strong>b. Permanent:</strong>presentaddress</p>{/**varaible needed */}
                </div>
                <p><strong>5. Copy of Proof of Residence submitted and original verified:</strong>Yes/No</p>{/**variable needed */}
                <div className="smalltext">
                    <p>
                        (Only copies of Passport/ Aadhar card/ Voter ID/ Electricty bill/ Landline Phone bill will be considered)
                    </p>
                </div>
                <p><strong>6. Contact details:</strong></p>
                <div className="contact-section">
                    <p><strong>a. Office telephone with STD code:</strong>officetel</p>{/**varaible needed */}
                    <p><strong>b. Residence telephone with STD code:</strong>residencetel</p>{/**varaible needed */}
                    <p><strong>c. Mobile Phone Number: </strong>{user?.profile?.phoneNo}</p>
                    <p><strong>d. Email address:</strong> {user.email}</p>
                </div>
                <p><strong>7. Date of joining the present institution:</strong>{user?.profile?.dateOfJoining}</p>
                <p><strong>8. Joining report verified the present/ attached</strong>Yes/ No</p>{/**varaible needed */}
                <p>
                    <strong>
                        9. Have you attended the Basic Course Workshop(BCME), Curriculum Implementation Support
                        Programme (CISP - i/ii/iii), Advanced Course in Medical Education (ACME) for training in MET:
                    </strong>
                    Yes/No
                </p>{/**varaible needed */}
                <div className="smalltext">
                    <p>
                        (If Yes, provide certificate/s)
                    </p>
                </div>
                <div className="workshopattened-section">
                    <p><strong>a. at MCI/NMC Regional MET Centre:</strong>Yes/No</p>{/**varaible needed */}
                    <p><strong>b. at your college under Regional/ Nodal observership :</strong>Yes/No</p>{/**varaible needed */}
                    <p><strong>c. Any other MET certificates may be attached :</strong>Yes/No</p>{/**varaible needed */}
                </div>
                <p><strong>10. Educational Qualifications</strong></p>
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
                    <p><strong>a. MD/ MS subject:</strong>mdmssubject</p>{/**varaible needed */}
                    <p><strong>b. DM/ Mch subject:</strong>mdmchsubject</p>{/**varaible needed */}
                    <p><strong>c. PhD subject:</strong>phdsubject</p>{/**varaible needed */}
                </div>
                <div className="smalltext">
                    <p>
                        <strong>Note:</strong>
                        For PG & Post PG qualifications, Particulars of Registation of Additional Qualification certificates
                        are to be furnished for them to be accepted. Strike out whichever section is not applicable 
                    </p>
                </div>                
            </div>

            <div className="page3">
                <p><strong>11. Copies of educational qualifications:</strong></p>  
                <div className="qualifications-section">
                    <p><strong>a. Copies of MBBS & PG Degree Certificates verified and attached:</strong>Yes/ No</p>{/**Variable needed!*/}
                    <p><strong>b. Copies of MBBS & PG Degree Registation verified and attached:</strong>Yes/ No</p>{/**Variable needed!*/}
                </div> 
                <p><strong>12. Details of Teaching experience till date:</strong></p>
                <div className="teaching-section">
                    <table>
                        <thead>
                            <tr>
                                <th>Designation</th><th>Department</th><th>Institution</th>
                                <th>From</th><th>To</th><th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.appraisal?.academics?.teaching?.map((experience, index) => (
                                <tr key={index}>
                                    <td>{experience.designation}</td>
                                    <td>{experience.department}</td>
                                    <td>{experience.institution}</td>
                                    <td>{experience.from}</td>
                                    <td>{experience.to}</td>
                                    <td>{experience.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p>
                    <strong>
                        13. Have you been considered in UG/ PG, MCI/ NMC inspection at any other 
                        medical college ina teaching or administrative capacity during last 3 years. 
                        If yes, please give details:
                    </strong>
                </p>{/**object creation needed */}
                <div className="consideration-section">
                    <table>
                        <thead>
                            <th>Designation</th><th>Subject</th><th>College</th><th>Dates</th>
                        </thead>
                        <tbody>
                         map   
                        </tbody>
                    </table>
                </div>
                <p>
                    <strong>14. Number of lectures/ small group teachings/ self-directed learning sessions/ clinics/ etc
                        taken and topics covered in last academic year (attach additional sheet, if required)
                    </strong>
                </p>{/**object creation needed! */}
                <div className="number section">
                    <table>
                        <thead>
                            <th>Designation</th><th>Date</th><th>Lecture/ SGT/ Clinic/ others</th><th>Topic</th>
                        </thead>
                        <tbody>
                            map
                        </tbody>
                    </table>
                </div>
            </div> 

            <div className="page4">
                <p><strong>15. Details of employment before joining the present institution:</strong></p>{/**object declaration needed*/}
                <div className="details-section">
                    <p><strong>a. Name of College/ Institution:</strong></p>
                    <p><strong>b. Designation:</strong>       <strong>Date on which relieved:</strong></p>
                    <p><strong>c. Reason for being relieved: </strong></p>
                    <p><strong>d. Relieving order issued by previous institution verified and attached:</strong>Yes/No</p>
                </div>
                <p><strong>16. PAN Card Number:</strong>pancardnumber</p>{/**variable needed*/}
                <p><strong>17. Aadhar Card Number:</strong>{user?.profile?.aadharNo}</p>
                <p><strong>18. I have drawn total emoluments from this college in the current financial year as under:</strong></p>{/**object creation needed*/}
                <div className="enoluments-section">
                    <table>
                        <thead>
                            <tr><th>Month/Year</th><th>Amount Received</th><th>TDS</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Jan/</td><td></td><td></td></tr>
                            <tr><td>Feb/</td><td></td><td></td></tr>
                            <tr><td>March/</td><td></td><td></td></tr>
                            <tr><td>April/</td><td></td><td></td></tr>
                            <tr><td>May/</td><td></td><td></td></tr>
                            <tr><td>June/</td><td></td><td></td></tr>
                            <tr><td>July/</td><td></td><td></td></tr>
                            <tr><td>August/</td><td></td><td></td></tr>
                            <tr><td>September/</td><td></td><td></td></tr>
                            <tr><td>October/</td><td></td><td></td></tr>
                            <tr><td>November/</td><td></td><td></td></tr>
                            <tr><td>December/</td><td></td><td></td></tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>19. Number of Research articles in Indexed Journals:</strong></p>
                <div className="research-section">
                    <p><strong>a. International Journals: </strong>{internationalCount || 0}</p>
                    <p><strong>b. National Journals: </strong>{nationalCount || 0}</p>
                    <p><strong>c. State/Institutional Journals: </strong>{stateInstitutionalCount || 0}</p>
                </div>
                <p><strong>20. Details of other publications:</strong></p>
                <div className='publication-section'>
                    <p><strong>a. Number of Books published: </strong>{booksPublished || 0}</p>
                    <p><strong>b. Number of Chapters in books: </strong>{totalChapters || 0}</p>
                </div>
            </div>

            <div className="page5">
                <p><strong>21. Any other information/ achievements/ patents:</strong>achievementsection</p>{/**Variable needed*/}
                <p><strong>22. Oral presentations: in zonal conference:</strong></p>{/**object varification needed*/}
                <div className="conference-details">
                    <table>
                        <thead>
                            <th>State conference:</th>
                            <th>National conference:</th>
                            <th>International conference:</th>
                        </thead>
                        <tbody>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tbody>
                    </table>
                </div>
                <p><strong>23. Poster presentations: in zonal/ State/ National/ International Conference.</strong></p>{/**object varification needed*/}
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
                <p><strong>24. Awards/ prizes:</strong></p>{/**awards object/variable needed*/}
                <div className="awards-section">
                    
                </div>
            </div>        
        </div>
    );
};

export default PrintDetails;
